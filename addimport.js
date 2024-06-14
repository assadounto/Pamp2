// addImports.js
const fs = require('fs');
const path = require('path');

const folderPath = './src/components'; // Adjust this path to your components folder
const importStatement = "import { ComponentName } from './ComponentPath';"; // Adjust as needed

fs.readdirSync(folderPath).forEach(file => {
    const filePath = path.join(folderPath, file);

    // Check if it's a JavaScript or TypeScript file
    if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
            let data = fs.readFileSync(filePath, 'utf8');
            // Check if the import statement already exists to avoid duplicates
            if (!data.includes(importStatement)) {
                // Insert import statement at the top
                data = `${importStatement}\n${data}`;
                fs.writeFileSync(filePath, data, 'utf8');
                console.log(`Import added to ${file}`);
            } else {
                console.log(`Import already exists in ${file}`);
            }
        } catch (err) {
            console.error(`Error reading or writing ${file}: ${err.message}`);
        }
    }
});

console.log('Import addition process completed.');
