import { CodeExample } from '../../types';

// The build script will inject the real code string here
import { contextualAssistanceDemoCode } from './_code/contextual-assistance-demo';

export const codeExamples: CodeExample[] = [
  {
    title: "Smart Text Editor with Contextual Suggestions",
    description: "This React component implements a text editor that offers contextual suggestions based on what the user is typing. It uses a debounce function to prevent too many API calls and maintains clear user control over accepting suggestions.",
    language: "tsx",
    componentId: "contextual-assistance-editor",
    code: contextualAssistanceDemoCode
  }
]; 