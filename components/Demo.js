import { useThemeMode,Button } from '@rneui/themed';

function Demo() {
    const { mode, setMode } = useThemeMode();

    return <Button onPress={() => setMode('dark')} title={mode} />;
}

export default Demo