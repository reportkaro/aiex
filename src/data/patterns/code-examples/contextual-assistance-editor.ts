import { CodeExample } from '../types';

export const contextualAssistanceEditorExample: CodeExample = {
  title: 'Contextual Code Editor Assistance',
  description: 'A React component that provides contextual code suggestions based on the current editor state',
  language: 'typescript',
  componentId: 'contextual-assistance-editor',
  code: `import React, { useState, useEffect } from 'react';
import { useEditor } from '@monaco-editor/react';

interface ContextualAssistanceProps {
  onSuggestion: (suggestion: string) => void;
}

export const ContextualAssistance: React.FC<ContextualAssistanceProps> = ({ onSuggestion }) => {
  const editor = useEditor();
  const [context, setContext] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!editor) return;

    const updateContext = () => {
      const selection = editor.getSelection();
      const model = editor.getModel();
      
      if (selection && model) {
        const text = model.getValueInRange(selection);
        setContext(text);
        analyzeContext(text);
      }
    };

    editor.onDidChangeCursorPosition(updateContext);
    editor.onDidChangeModelContent(updateContext);

    return () => {
      editor.dispose();
    };
  }, [editor]);

  const analyzeContext = async (text: string) => {
    try {
      const response = await fetch('/api/analyze-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error analyzing context:', error);
    }
  };

  return (
    <div className="contextual-assistance">
      {suggestions.length > 0 && (
        <div className="suggestions-panel">
          <h3>Suggestions</h3>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button onClick={() => onSuggestion(suggestion)}>
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};`
}; 