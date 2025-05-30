const fs = require('fs/promises');
const path = require('path');
const { Pattern } = require('../types');

const PATTERNS_DIR = path.join(__dirname, '../patterns');

// Helper function to get category based on pattern name
function getCategory(patternName: string): string {
  const categoryMap: Record<string, string> = {
    'human-in-the-loop': 'AI Governance',
    'progressive-disclosure': 'Information Architecture',
    'contextual-assistance': 'User Experience',
    'conversational-ui': 'User Experience',
    'transparent-feedback': 'User Experience',
    'adaptive-interfaces': 'User Experience',
    'multimodal-interaction': 'User Experience',
    'explainable-ai': 'AI Governance',
    'responsible-ai-design': 'AI Governance',
    'error-recovery': 'Error Handling',
    'collaborative-ai': 'AI Governance',
    'ambient-intelligence': 'AI Governance',
    'safe-exploration': 'User Experience',
    'guided-learning': 'User Experience'
  };
  return categoryMap[patternName] || 'General';
}

// Helper function to get tags based on pattern name
function getTags(patternName: string, category: string): string[] {
  const baseTags = [category];
  const patternSpecificTags: Record<string, string[]> = {
    'human-in-the-loop': ['Quality Control', 'Human Oversight', 'Safety'],
    'progressive-disclosure': ['Information Architecture', 'Usability', 'Cognitive Load'],
    'contextual-assistance': ['Help System', 'Proactive Assistance', 'User Guidance'],
    'conversational-ui': ['Natural Language', 'Dialogue', 'Interaction'],
    'transparent-feedback': ['User Feedback', 'System Status', 'Clarity'],
    'adaptive-interfaces': ['Personalization', 'User Adaptation', 'Dynamic UI'],
    'multimodal-interaction': ['Multiple Inputs', 'Accessibility', 'Flexible Interaction'],
    'explainable-ai': ['Transparency', 'Trust', 'Understanding'],
    'responsible-ai-design': ['Ethics', 'Fairness', 'Accountability'],
    'error-recovery': ['Error Handling', 'User Support', 'Resilience'],
    'collaborative-ai': ['Human-AI Collaboration', 'Teamwork', 'Cooperation'],
    'ambient-intelligence': ['Background Processing', 'Context Awareness', 'Subtle Interaction'],
    'safe-exploration': ['User Safety', 'Risk Management', 'Learning'],
    'guided-learning': ['Education', 'Onboarding', 'Skill Development']
  };
  return [...baseTags, ...(patternSpecificTags[patternName] || [])];
}

// Helper function to generate overview based on description
function generateOverview(description: string): string {
  return `${description} This pattern focuses on creating a more effective and user-friendly experience by addressing specific challenges in the interaction between users and AI systems.`;
}

// Helper function to generate whenToUse based on problem
function generateWhenToUse(problem: string): string[] {
  return [
    `When ${problem.toLowerCase().replace(/\.$/, '')}`,
    'When user experience and system effectiveness need improvement',
    'When dealing with complex user interactions',
    'When aiming to enhance user understanding and control'
  ];
}

// Helper function to generate benefits based on solution
function generateBenefits(solution: string): string[] {
  return [
    'Improved user experience and satisfaction',
    'Enhanced system effectiveness and reliability',
    'Better user understanding and control',
    'More efficient and intuitive interactions'
  ];
}

async function fixPatternFile(filePath: string) {
  try {
    // Read the file
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Extract the pattern name from the file path
    const patternName = path.basename(path.dirname(filePath));
    const category = getCategory(patternName);
    const tags = getTags(patternName, category);

    // Create the fixed pattern content
    const fixedContent = `import { Pattern } from '../../types';
import { examples } from './examples';
import { guidelines } from './guidelines';
import { considerations } from './considerations';
import { codeExamples } from './code-examples';

export const ${patternName.replace(/-/g, '')}: Pattern = {
  id: "${patternName}",
  title: "${patternName.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}",
  slug: "${patternName}",
  description: "${content.match(/description: "([^"]+)"/)?.[1] || ''}",
  category: "${category}",
  content: {
    problem: "${content.match(/problem: "([^"]+)"/)?.[1] || ''}",
    solution: "${content.match(/solution: "([^"]+)"/)?.[1] || ''}",
    overview: "${generateOverview(content.match(/description: "([^"]+)"/)?.[1] || '')}",
    whenToUse: ${JSON.stringify(generateWhenToUse(content.match(/problem: "([^"]+)"/)?.[1] || ''))},
    benefits: ${JSON.stringify(generateBenefits(content.match(/solution: "([^"]+)"/)?.[1] || ''))},
    examples,
    guidelines,
    considerations,
    relatedPatterns: ${content.match(/relatedPatterns: \[([^\]]+)\]/)?.[1] || '[]'},
    codeExamples
  },
  tags: ${JSON.stringify(tags)}
};`;

    // Write the fixed content back to the file
    await fs.writeFile(filePath, fixedContent, 'utf-8');
    console.log(`Fixed ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error);
  }
}

async function fixAllPatterns() {
  try {
    // Get all pattern directories
    const patternDirs = await fs.readdir(PATTERNS_DIR);
    
    // Process each pattern directory
    for (const dir of patternDirs) {
      const indexPath = path.join(PATTERNS_DIR, dir, 'index.ts');
      try {
        await fs.access(indexPath);
        await fixPatternFile(indexPath);
      } catch (error) {
        console.error(`Skipping ${indexPath}: File not found`);
      }
    }
    
    console.log('All patterns have been fixed!');
  } catch (error) {
    console.error('Error fixing patterns:', error);
  }
}

// Run the script
fixAllPatterns(); 