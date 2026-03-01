const fs = require('fs');
const path = require('path');

function replaceLucideRecursively(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceLucideRecursively(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Handle specific case in ModelCard.tsx: import * as Icons from 'lucide-react';
            if (content.includes("import * as Icons from 'lucide-react'") || content.includes('from "lucide-react"')) {
                if (fullPath.endsWith('ModelCard.tsx')) {
                    // we will handle ModelCard separately
                    continue;
                }
            }

            // Regular replacements: import { X, Y } from 'lucide-react'
            const regex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g;
            let dirty = false;
            content = content.replace(regex, (match, p1) => {
                dirty = true;
                const imports = p1.split(',').map(s => s.trim()).filter(Boolean);
                const newImports = imports.map(imp => {
                    // if it already has an alias `X as Y`, we need to handle that, but typically it is just `X`
                    if (imp.includes(' as ')) {
                        const parts = imp.split(' as ');
                        return `Lu${parts[0].trim()} as ${parts[1].trim()}`;
                    } else {
                        // Special cases from lucide
                        return `Lu${imp} as ${imp}`;
                    }
                });
                return `import { ${newImports.join(', ')} } from 'react-icons/lu'`;
            });

            if (dirty) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceLucideRecursively(path.join(__dirname, 'src'));
