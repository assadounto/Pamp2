const fs = require('fs');
const path = require('path');

// Load configuration
const config = JSON.parse(fs.readFileSync('script.json', 'utf8'));

const componentTemplate = (name) => `
import React from 'react';
import { View, Text } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';

const ${name} = () => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>${name} Component</Text>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.primary,
  },
}));

export default ${name};
`;

const screenTemplate = (name) => `
import React from 'react';
import { View, Text } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';

const ${name} = () => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>${name} Screen</Text>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.primary,
  },
}));

export default ${name};
`;

const createFile = (name, type) => {
    const directoryPath = path.join(__dirname, type === 'screen' ? config.screensPath : config.componentsPath);
    const filePath = path.join(directoryPath, `${name}.js`);

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    const content = type === 'screen' ? screenTemplate(name) : componentTemplate(name);

    fs.writeFileSync(filePath, content.trim(), 'utf8');

    console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} '${name}' created successfully at ${filePath}`);
};

const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node createComponent.js <ComponentName> <type>');
    process.exit(1);
}

const [name, type] = args;

if (!['component', 'screen'].includes(type)) {
    console.error("Type must be either 'component' or 'screen'");
    process.exit(1);
}

createFile(name, type);
