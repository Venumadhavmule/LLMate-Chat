const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.ts') || file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('e:/LLMate/llmate-chat/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix unused React
    content = content.replace(/^import\s+React(,\s*{[^}]+})?\s+from\s+['"]react['"];?\r?\n/m, (match, p1) => {
        if (p1) {
            return `import ${p1.replace(/^,\s*/, '')} from 'react';\n`;
        }
        return '';
    });
    
    // Fix type imports for custom types
    content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]([^'"]*types\/[^'"]+|[^'"]*store\/[^'"]+|[^'"]*api\/[^'"]+)['"]/g, (match, p1, p2) => {
        // If it's already type or importing actual code, be careful.
        // We know what's a type: Message, Attachment, Conversation, ModelConfig, ProviderInfoDto, etc.
        const typeNames = ['Message', 'Attachment', 'Conversation', 'ModelConfig', 'ProviderInfoDto', 'SavedPrompt', 'UserSettings', 'ModelParameters', 'InputMode', 'ModelCapability', 'ChatRequestDto', 'ChatResponseDto', 'EmbeddingRequestDto', 'EmbeddingResponseDto', 'StreamChunk'];
        
        let hasType = false;
        typeNames.forEach(t => {
            if (p1.includes(t)) hasType = true;
        });

        // But what if it imports a store (useChatStore)?
        if (hasType && !match.includes('type {') && !p1.includes('use')) {
            return match.replace(`import {`, `import type {`);
        }
        return match;
    });

    fs.writeFileSync(file, content, 'utf8');
});
console.log('Fixed bulk errors');
