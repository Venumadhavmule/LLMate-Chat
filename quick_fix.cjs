const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/^import React(,\s*{[^}]+})?\s+from\s+['"]react['"];?\r?\n/gm, (m, p1) => {
      if (p1) {
          return `import ${p1.replace(/^,\s*/, '')} from 'react';\n`;
      }
      return '';
  });
  content = content.replace(/import React from 'react';\r?\n/g, ''); 
  content = "import React from 'react';\n" + content;
  fs.writeFileSync(file, content, 'utf8');
}

fix('e:/LLMate/llmate-chat/src/components/ui/Button.tsx');
fix('e:/LLMate/llmate-chat/src/components/ui/Input.tsx');
fix('e:/LLMate/llmate-chat/src/components/chat/MessageItem.tsx');
fix('e:/LLMate/llmate-chat/src/components/sidebar/ConversationItem.tsx');

let sendBtn = fs.readFileSync('e:/LLMate/llmate-chat/src/components/input/SendButton.tsx', 'utf8');
sendBtn = sendBtn.replace(/setGenerationStatus/g, 'stopGeneration');
sendBtn = sendBtn.replace(/stopGeneration\('idle'\)/g, 'stopGeneration()');
sendBtn = sendBtn.replace(/stopGeneration\(false\)/g, 'stopGeneration()');
fs.writeFileSync('e:/LLMate/llmate-chat/src/components/input/SendButton.tsx', sendBtn, 'utf8');
