import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { horizontalScale,verticalScale,moderateScale } from '../../Dimensions';
import BHeader from '../../../components/BHeader';
import { Text, View, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Input, Button, CheckBox, ListItem, Icon } from '@rneui/base';
import CheckBoxComponent from '../../../components/Checkbox';
import { colors } from '../../Common_styles';
import Save from '../../../components/Save';
import { styles as styles2 } from '../../Common_styles';
import { useLazyForgotAccountQuery } from '../../redux/authapi';
import { FontFamily } from '../../GlobalStyles';
const ResetPassword = ({ route, navigation }) => {
  const [forgotAccount, { data, isError }] = useLazyForgotAccountQuery()
  const { info } = route.params

  const [email, setEmail] = useState(false)
  const [phone, setPhone] = useState(false)
  const [option, SetOption] = useState('')
  const handleEmailCheckboxChange = () => {
    setEmail(!email);
    setPhone(false);
    if (email == false) {
      SetOption('email')
    } else {
      SetOption('')
    }

  };

  const handlePhoneCheckboxChange = () => {
    setPhone(!phone);
    setEmail(false);

    if (phone == false) {
      SetOption('phone')
    } else {
      SetOption('')
    }
  };

  const handlePress = () => {
    console.log({
      method: option,
      email: info.email
    })
    forgotAccount({
      method: option,
      email: info.email
    })
    navigation.navigate('ResetAccount', {
      datas: {
        method: option,
        email: info.email,

      }
    })
  }
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <>
      <View style={{ marginTop: Platform.OS === 'ios' ? 40 : 0 }}>
        <BHeader
          color={theme.colors.dg}
          title={'How do you want to reset password?'}
        />
        <Text style={{ paddingHorizontal: 50, marginTop: -20, color: theme.colors.dg, fontFamily: FontFamily.sourceSansProRegular, fontSize: 14 }}>{"We found the following information associated with your account"}</Text>
      </View>

      <View style={styles.mt50}>
        <ListItem
          containerStyle={[styles.cont]}
        >

          <CheckBoxComponent card={false} containerWidth={50} onPress={handleEmailCheckboxChange} state={email} />
          <ListItem.Content>
            <ListItem.Title style={colors.dg2}>Email a confirmation code to
            </ListItem.Title>
            <ListItem.Title style={colors.dg2}>{info.email}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {info.phone &&
          <ListItem
            containerStyle={[styles.cont, styles.none]}
          >

            <CheckBoxComponent card={false} containerWidth={50} onPress={handlePhoneCheckboxChange} state={phone} />
            <ListItem.Content>
              <ListItem.Title style={colors.dg2}>Text a confirmation code to
              </ListItem.Title>
              <ListItem.Title style={colors.dg2}>phone number ending with {info.phone.slice(-3)}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        }
        <Button
          title="Send"
          onPress={handlePress}
          buttonStyle={[styles.button, { marginTop: 80 }]}
        />
      </View>
    </>
  );
};
export default ResetPassword;
const useStyles = makeStyles((theme) => ({
  button: {
    width: horizontalScale(330),
    height: verticalScale(71),
    backgroundColor: '#86D694',
    borderWidth: horizontalScale(1),
    borderColor: '#86D694',
    marginBottom: verticalScale(10),
    alignSelf: 'center',
    borderRadius: horizontalScale(23),
  },
  cont: {
    backgroundColor: theme.colors.background,
    width: '90%',
    alignSelf: 'center',
    borderColor: theme.colors.linkBorder,
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  text1: {
    color: '#B0EBBD'
  },
  none: {
    borderTopWidth: 0
  },
  mt50: {
    marginTop: 50
  }
}))