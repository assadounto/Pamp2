const fs = require('fs');
const path = require('path');

const folderPath = './src/screens/home_screens'; /// Adjust this path to your components folder
const importStatement = "import { useTheme } from '@rneui/themed';"; // Adjust as needed

fs.readdirSync(folderPath).forEach(file => {
    const filePath = path.join(folderPath, file);

    // Check if it's a JavaScript or TypeScript file
    if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
            let data = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Check if the import statement already exists to avoid duplicates
            if (!data.includes(importStatement)) {
                // Insert import statement at the top
                data = `${importStatement}\n${data}`;
                modified = true;
            }

            // Check if `const styles = useStyles();` is already present
            if (!data.includes('const { theme} = useTheme();')) {
                // Find the last occurrence of `return (` to insert `const styles = useStyles();` before it
                const returnIndex = data.lastIndexOf('return (');
                if (returnIndex !== -1) {
                    const stylesLine = 'const { theme} = useTheme();';
                    data = `${data.slice(0, returnIndex)}${stylesLine}\n${data.slice(returnIndex)}`;
                    modified = true;
                } else {
                    console.log(`No return statement found in ${file}`);
                }
            }


            // Write modified data back to file if any changes were made
            if (modified) {
                fs.writeFileSync(filePath, data, 'utf8');
                console.log(`Imports and styles updated in ${file}`);
            } else {
                console.log(`No changes needed in ${file}`);
            }
        } catch (err) {
            console.error(`Error reading or writing ${file}: ${err.message}`);
        }
    }
});

console.log('Import addition and styles update process completed.');
