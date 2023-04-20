import React, {useState, useEffect} from 'react';
import Header from './header';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Input, Button, CheckBox} from '@rneui/base';
import {Formik} from 'formik';
import {styles, colors} from '../../Common_styles';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  return (
    <>
      <Header
        main={'How do you want to reset password?'} sub={'We found the following information'}
      />
      <View style={styles.t6}>
        <CheckBox
          checkedIcon={
            <View style={styles.checkc}>
              <Image
                source={require('../../../assets/check3.png')}
                style={styles.check}
              />
            </View>
          }
          title={
            <>
              <Text style={[colors.lg, styles.bold]}>Terms of Service</Text>
              <Text style={[colors.lg, styles.bold]}>Privacy Policy</Text>
            </>
          }
          checked={agreedToTerms}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
        />
      </View>
    </>
  );
};
export default ResetPassword;
