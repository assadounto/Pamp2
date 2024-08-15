import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import React from 'react';
import { Button } from '@rneui/base';
import { StyleSheet, View, Keyboard, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';

const Save = ({ name, handlePress, disabled, loading }) => {
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} // Adjust this offset based on your needs
    >
      <View style={styles.safeArea}>

        <View style={[styles.buttonContainer, keyboardVisible && styles.keyboardVisible]}>
          <Button
            disabled={disabled}
            disabledStyle={{backgroundColor:theme.colors.btnDisabled}}
            titleStyle={styles.title}
            title={name}
            buttonStyle={styles.button}
            onPress={handlePress}
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,


  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.card,
  },
  buttonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor:theme.colors.background,
    shadowColor: theme.colors.white,
    shadowOpacity: 0,
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 0 },
     // Add a white background
  },

  keyboardVisible: {
    // Adjust this value based on your needs
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 20,

  },
  title: {
    fontFamily: FontFamily.sourceSansProBold,
    fontSize: 15,
  },
  button: {
    width: 184,
    height: 54,
    borderRadius: 25,
    backgroundColor: theme.colors.lgb,
    shadowColor: theme.colors.lgb,
    shadowOpacity: 0,
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 0 },
  },
}));

export default Save;
