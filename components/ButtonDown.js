import React from 'react';
import { View, Text } from 'react-native';
import { makeStyles,Button, useTheme } from '@rneui/themed';
import { FontFamily } from '../GlobalStyles';

const ButtonDown = ({handleSubmit,title,loading,disabled}) => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Button
      loading={loading}
      disabled={disabled}
        titleStyle={styles.text}
        title={title}
        buttonStyle={styles.button}
        onPress={handleSubmit} />   
         </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 }, 
    position: 'absolute',
     top: '90%',
      alignSelf: 'center',
       backgroundColor: theme.colors.background,
        height: 250, width: '100%' 
      },
  text: { fontFamily: FontFamily.sourceSansProBold },
  button:{
    
  width: 184,
  height: 54,
  marginTop: 10,
  alignSelf: 'center',
  borderRadius: 25,
  backgroundColor: theme.colors.lgb,
  shadowColor: theme.colors.lgb, shadowOpacity: 0., shadowRadius: 5, shadowOffset: { width: 5, height: 0 }
}
}));

export default ButtonDown;

