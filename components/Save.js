import React from 'react';
import {Button } from '@rneui/base';
import {StyleSheet, View, Keyboard} from 'react-native';
import {colors} from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';

const Save = ({name, handlePress, loading}) => {
  const [key, setKeyboardShow] = React.useState(false);
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShow(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <>
      {!key && (
        <View style={styles2.cont}>
          <Button
          
          titleStyle={styles2.title}
            title={name}
            // containerStyle={}
            buttonStyle={styles2.button}
            onPress={handlePress}
            loading={loading}
          />
        </View>
      )}
    </>
  );
};

const styles2 = StyleSheet.create({
  title:{
    fontFamily:FontFamily.sourceSansProBold,
    fontSize:15
  },
  cont: {
    top:'90%',
    position: 'absolute',
    height:200,
    alignSelf: 'center',
    backgroundColor: '#ffff',
    width: '100%',
    marginBottom: 0,
  },
  button: {
    width: 184,
    height: 54,
    //margin: 'auto',
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: colors.dg2.color,
    shadowColor: colors.dg2.color,
    shadowOpacity: 0,
    shadowRadius: 5,
    shadowOffset: {width: 5, height: 0},
  },
});

export default Save;
