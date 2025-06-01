const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../src/components/examples/ContextualAssistanceDemo.tsx');
const destPath = path.join(__dirname, '../src/data/patterns/patterns/contextual-assistance/_code/contextual-assistance-demo.js');

function escapeForTemplateLiteral(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
}

fs.readFile(sourcePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read source file:', err);
    process.exit(1);
  }
  const codeString = escapeForTemplateLiteral(data);
  const output = `export const contextualAssistanceDemoCode = \`
${codeString}
\`;\n`;
  fs.writeFile(destPath, output, 'utf8', (err) => {
    if (err) {
      console.error('Failed to write destination file:', err);
      process.exit(1);
    }
    console.log('Injected ContextualAssistanceDemo code successfully!');
  });
}); 