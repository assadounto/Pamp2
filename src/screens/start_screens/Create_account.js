import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Alert, Linking, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, Input, Icon, CheckBox } from '@rneui/base';
import { Image } from 'react-native';
import { backendURL } from '../../services/http';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../Common_styles';
import { register, setUser, setuser } from '../../redux/user';

import axios from 'axios';

import Header from './header';
import PhoneInput from 'react-native-phone-number-input';
import { horizontalScale, verticalScale, moderateScale } from '../../Dimensions';
import { FontFamily } from '../../GlobalStyles';
const Register = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [receivePushNotifications, setReceivePushNotifications] =
    useState(false);

  const onSubmit = async values => {
    register({ user: values });
  };


  const register = async (values) => {
    // console.log(values)

    dispatch(setuser(values.user))
    setLoading(true)
    try {
      const { data } = await axios.post(backendURL + '/user/signup', values);
      console.log(data);
      dispatch(setUser({ ...values.user, id: data.id }))
      if (data.message === 'exist') {
        Alert.alert('Error', 'Account already Exist. Please login')
      }
      else if (data?.message === 'created') {
        dispatch(setUser({ ...values.user, id: data.id }))
        navigation.replace('VerifyEmail', { scope: '' });
      }




      setLoading(false)
    } catch (error) {
      console.log(error.response.data);
      Alert.alert('Error', error.response.data.errors[0])
      // Use error.response.data to get the error response data
      setLoading(false);
    }
  }


  return (
    <>
      <Header
        main={'Create Account'}
        sub={'Please fill in form to continue'}
      />
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
          name: '',
          phone: '',
        }}
        onSubmit={values => {
          onSubmit(values);
        }}
        validate={values => {
          const errors = {};

          if (!values.email) {

            errors.email = 'Email is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          }

          if (!values.username) {
            errors.username = 'First name is required';
          }

          if (!values.name) {

            errors.name = 'Last name is required';
          }




          return errors;
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <ScrollView

            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={[styles.container, { marginTop: verticalScale(10), marginBottom: verticalScale(120) }]}>


              <View>
                <TextInput

                  placeholderTextColor={theme.colors.placeholder}
                  placeholder="First Name"
                  style={[styles.textInput]}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  errorMessage={touched.username && errors.username}
                />

                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor={theme.colors.placeholder}
                  style={[styles.textInput]}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  errorMessage={touched.name && errors.name}
                />



                <TextInput
                  placeholderTextColor={theme.colors.placeholder}
                  placeholder="Email"
                  style={[styles.textInput]}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errorMessage={touched.email && errors.email}
                  keyboardType="email-address"
                />
                <View>
                  <TextInput
                    placeholderTextColor={theme.colors.placeholder}
                    placeholder="Password"
                    style={[styles.textInput]}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    errorMessage={touched.password && errors.password}
                    secureTextEntry={!showPassword}

                  />
                  <PhoneInput
                    placeholderTextColor={theme.colors.placeholder}

                    textContainerStyle={{ marginHorizontal: 10, backgroundColor: theme.colors.slate, }}
                    //ref={phoneInput}
                    //defaultValue={value}
                    containerStyle={[Platform.OS === 'ios' ? styles.textInput : { borderRadius: 20, backgroundColor: '#EFEFEF', alignSelf: 'center', marginBottom: verticalScale(22), height: verticalScale(75) }]}
                    defaultCode="GH"
                    codeTextStyle={{ color: theme.colors.lg, fontWeight: 'bold', fontFamily: FontFamily.sourceSansProBold }}
                    layout="second"
                    //onChangeText={}

                    onChangeFormattedText={handleChange('phone')}
                    placeholder="Phone Number"

                  />
                  <View style={{ position: 'absolute', top: verticalScale(20), right: horizontalScale(30) }}>
                    <Icon

                      name={showPassword ? 'eye' : 'eye-off'}
                      type="ionicon"
                      onPress={() => setShowPassword(!showPassword)}
                      color='#BBB9BC'
                    />
                  </View>

                </View>
              </View>
              <View style={styles.t6}>
                <CheckBox
                containerStyle={{backgroundColor:theme.colors.background}}
                  uncheckedIcon={<Image
                    resizeMode='contain'
                    style={{ width: 22, height: 22 }}
                    source={require('../../../assets/rectangle1063.png')}
                  />}
                  checkedIcon={
                    <Image
                      style={{ width: 22, height: 22 }}
                      resizeMode='contain'
                      source={require('../../../assets/group2210.png')}
                    />
                  }
                  title={
                    <Text style={[{color:theme.colors.dg}, styles.terms]}>
                      I agree to the{' '}
                      <Text onPress={() => Linking.openURL("https://www.trypamp.com/privacy-policy")} style={[{color:theme.colors.lg}, styles.bold]}>
                        Privacy Policy
                      </Text>{' '}
                      and{' '}
                      <Text onPress={() => Linking.openURL("https://www.trypamp.com/terms-of-use")} style={[{ color: theme.colors.lg }, styles.bold]}>
                        Terms of Use
                      </Text>{' '}
                      <Text onPress={() => Linking.openURL("https://www.trypamp.com/terms-of-service")} style={[{ color: theme.colors.lg }, styles.bold]}>
                        Terms of Service
                      </Text>
                    </Text>
                  }
                  checked={agreedToTerms}
                  onPress={() => setAgreedToTerms(!agreedToTerms)}
                />

              </View>
              <View style={styles.t6}>
                <CheckBox
                  containerStyle={{ backgroundColor: theme.colors.background }}

                  title={
                    <Text style={[{ color: theme.colors.dg }, styles.terms]}>
                      {" I agree to receive marketing notifications with offers and  news"}
                    </Text>
                  }
                  uncheckedIcon={<Image
                    resizeMode='contain'
                    style={{ width: 22, height: 22 }}
                    source={require('../../../assets/rectangle1063.png')}
                  />}
                  checkedIcon={
                    <Image
                      style={{ width: 22, height: 22 }}
                      resizeMode='contain'
                      source={require('../../../assets/group2210.png')}
                    />
                  }
                  checked={receivePushNotifications}
                  onPress={() =>
                    setReceivePushNotifications(!receivePushNotifications)
                  }
                />
              </View>


              <Button
                titleStyle={styles.tbtn}
                title="Sign Up"
                onPress={handleSubmit}
                buttonStyle={[styles.button, { marginTop: verticalScale(10) }]}
                loading={loading}
                disabled={!agreedToTerms}
              />

            </View>

          </ScrollView>
        )}

      </Formik>



    </>
  );
};

export default Register;

export const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  mt100: {
    marginTop: verticalScale(100),
  },
  mt10: {
    marginTop: verticalScale(10),
  },
  mb20: {
    marginBottom: verticalScale(20),
  },
  textInput: {
    marginBottom: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    fontSize: moderateScale(14),
    width: horizontalScale(330),
    height: verticalScale(63),
    margin: 0,
    color: theme.colors.dg,
    alignSelf: 'center',
    backgroundColor: theme.colors.slate,
    borderRadius: horizontalScale(23),
    borderWidth: 1,
    borderColor: theme.colors.slate,
    fontFamily: FontFamily.sourceSansProRegular
  },
  t1: {
    fontSize: moderateScale(26),
    color: theme.colors.dg,
    marginBottom: 10,
    fontFamily: FontFamily.sourceSansProBold,
  },
  tbtn: {
    fontFamily: FontFamily.sourceSansProBold
  },
  t2: {
    fontSize: moderateScale(16),
    color: '#BBB9BC',
    textAlign: 'center',
    width: '60%',
    marginBottom: 10,
    fontFamily: FontFamily.sourceSansProRegular,
  },
  t3: {
    fontSize: moderateScale(15),
    color: theme.colors.dg,
    fontFamily: FontFamily.sourceSansProRegular,
    marginTop: verticalScale(-20),
    alignSelf: 'center',
  },
  t4: {
    fontSize: moderateScale(14),
    color: '#B0EBBD',
    fontFamily: FontFamily.sourceSansProBold,
    marginTop: verticalScale(20),
    alignSelf: 'center',
  },
  t5: {
    fontSize: moderateScale(14),
    color: '#000000',
    fontFamily: FontFamily.sourceSansProRegular,
    marginLeft: horizontalScale(20),
    alignSelf: 'center',
  },
  t6: {
    backgroundColor: theme.colors.background,
    marginTop: -17,
    width: '85%'


  },
  m1: {
    margin: horizontalScale(10),
  },
  terms: {
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
    fontFamily: FontFamily.sourceSansProRegular
  },
  check: {
    width: horizontalScale(18),
    height: verticalScale(18),
    resizeMode: 'center',
  },
  checkc: {
    width: horizontalScale(23),
    height: verticalScale(23),
    padding: horizontalScale(3),
    backgroundColor: '#B0EBBD',
    borderRadius: horizontalScale(5),
    alignItems: 'center',
    ustifyContent: 'center',
  },
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
  scroll: {
    backgroundColor: 'white',
  },
  input: {
    marginTop: verticalScale(20),
  },
  input2: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {

    alignSelf: 'center',
  },
  press: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#DEDCDC',
    backgroundColor: 'white',
    borderRadius: horizontalScale(23),
    width: horizontalScale(300),
    height: verticalScale(71),
    alignSelf: 'center',
  },
  forgot: {
    color: '#BBB9BC',
    fontSize: moderateScale(14),
    marginTop: verticalScale(17),

    textAlign: 'right'
  },
  bold: {
    fontWeight: 'bold',
  },
  head: {
    alignItems: 'center',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(20),
    backgroundColor: 'white',
    marginBottomColor: 'white',
  },
  fs25: {
    fontSize: moderateScale(26),
  },
  fs18: {
    fontSize: moderateScale(18),
    width: moderateScale(230),
  },
  tc: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    fontFamily: FontFamily.sourceSansProRegular
  },

  resethead: {
    width: '80%',
  },
  pop: {
    marginTop: verticalScale(300),
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    padding: horizontalScale(10),

  },

  pop2: {
    position: 'absolute',
    bottom: verticalScale(40),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    padding: horizontalScale(40),
    alignContent: 'center',

    width: '95%',
    height: verticalScale(250),
  },
  popimg: {
    resizeMode: 'center',
  },
  tac: {
    textAlign: 'center',
  },
  f1: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: moderateScale(25),
  },
  Pmain: {
    borderRadius: horizontalScale(40),
    paddingHorizontal: horizontalScale(30),
    backgroundColor: '#ffff',
    width: '90%',
    alignSelf: 'center',
    marginBottom: verticalScale(30),
  },
  Pcont: {
    backgroundColor: theme.colors.slate,
    marginTop: verticalScale(30),
  },

  P1: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: moderateScale(18),
    color: theme.colors.dg
  },
  P2: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: moderateScale(15),
  },
  Pmargin: {
    marginBottom: horizontalScale(20),
  },
  Da: {
    padding: horizontalScale(10),
    marginBottom: verticalScale(50),
    height: verticalScale(60),
  },
  EP: {
    backgroundColor: theme.colors.background,
    width: '90%',
    alignSelf: 'center',
  },
  EI: {
    width: '90%',
    alignSelf: 'center',
    borderColor: theme.colors.linkBorder,
    paddingHorizontal: horizontalScale(10),
    borderWidth: horizontalScale(1),
    borderRadius: horizontalScale(10),
    marginBottom: verticalScale(20),
    height: verticalScale(42),
    color: theme.colors.dg
  },
  St1: {
    fontFamily: FontFamily.sourceSansProBold,
    fontSize: moderateScale(26),
    color: '#86D694',
    marginTop: verticalScale(60),
    marginLeft: horizontalScale(20),
    paddingBottom: verticalScale(10)
  },
  option: {
    fontSize: moderateScale(13),
    fontFamily: FontFamily.sourceSansProRegular,
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: theme.colors.card,
    borderRadius: horizontalScale(20),
    height: verticalScale(34),
    padding: horizontalScale(8),
    marginBottom: verticalScale(30),
    borderColor: theme.colors.lg,
    borderWidth: 1,
    marginHorizontal: horizontalScale(7)

  },

  selected: {
    backgroundColor: theme.colors.lgb,
    borderRadius: horizontalScale(20),
    color: 'white',
    height: verticalScale(34),
    padding: horizontalScale(8),
    marginBottom: verticalScale(20),
    marginHorizontal: horizontalScale(7)
  },
}));
