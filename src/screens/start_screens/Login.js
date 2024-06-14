import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import { Button, Icon, CheckBox, BottomSheet } from '@rneui/base';
import { Input } from '@rneui/themed';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation, // <-- corrected import here
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';



import { horizontalScale, verticalScale, moderateScale } from '../../Dimensions';
import { Color, FontFamily } from '../../GlobalStyles';
import CheckBoxComponent from '../../../components/Checkbox';
import { colors, styles } from '../../Common_styles';
import { setRemember, setUser } from '../../redux/user';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { backendURL } from '../../services/http';
import { loginUser } from '../../redux/user';
import { useGetPhoneConfirmMutation } from '../../redux/authapi';
import Phone_pop from '../../../components/PhoneInput';
import Blur from './Blur';
import Bottom from '../../../components/bottomsheet';
const Login = ({ navigation }) => {
  const next = useSelector(state => state.user.next)

  const dispatch = useDispatch();
  const remember = useSelector(state => state.user.remember)
  const [password, setPass] = useState(remember.password)
  const [email, setMail] = useState(remember.email)

  const [errorMessage, setError] = useState('')
  const [id, setId] = useState()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [getPhoneConfirm] = useGetPhoneConfirmMutation()
  const onSubmit = async values => {
    // 
    if (remember.state) {
      dispatch(setRemember(values))

    }
    setTimeout(() => {
      login(values)
    }, 500)
    console.log(remember, values)
  };
  console.log(remember)

  const handleRemember = (values) => {
    dispatch(setRemember({ state: !remember.state }));

    // If "Remember me" is unchecked, clear the Formik initial values
    if (remember.state) {
      values.password = ''
      setPass('');
      dispatch(setRemember({ email: '', password: '' }));

    }
  };



  const handleShow = () => {
    if (remember.state) {
      return
    }
    setShowPassword(!showPassword)
  }
  const login = async (values) => {
    setLoading(true)


    try {
      const { data } = await axios.post(backendURL + '/user/login', { user: values });
      // Handle success
      setUseGoogle(values)
      setId(data.user.id)
      console.log(data)
      dispatch(setUser({ ...values, id: data.user.id }))
      if (!data.user.phone) {
        setVisible(true)
        setLoading(false)
        return
      }
      dispatch(setUser({ ...values, id: data.user.id }))

      setLoading(false)

      if (data.email_confirmed && data.phone_confirmed) {
        dispatch(loginUser(data))
        if (next && next == 'Favourites') {

          // navigation.goBack()
          navigation.navigate('main')

        }


        else {

          navigation.replace(next)
        }
      }


      else if (data.email_confirmed && !data.phone_confirmed) {
        dispatch(setUser({ ...values, id: data.user.id }))

        getPhoneConfirm({
          scope: 'user',
          id: data.user.id
        })
        navigation.replace('VerifyNumber');


      }
      else if (!data.email_confirmed && data.phone_confirmed) {

        navigation.replace('VerifyEmail', { next: 'noti' });
      }
      else {
        navigation.replace('VerifyEmail');
      }
    } catch (error) {
      // Handle error
      alert('Invalid email or password')
      setLoading(false)
      console.log(error)
    }
  }



  async function onAppleButtonPress() {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // Get required information or set default values
      const userEmail = appleAuthRequestResponse.email || '';
      const userPassword = appleAuthRequestResponse.user || '';
      const userFamilyName = appleAuthRequestResponse.fullName?.familyName || '';
      const userGivenName = appleAuthRequestResponse.fullName?.givenName || '';

      // Check if essential information is present
      if (!userEmail || !userPassword || !userFamilyName || !userGivenName) {
        // Display an alert or handle the error as needed
        alert('Error: Unable to retrieve required information from Apple Sign In.');
        return;
      }
      setUseGoogle({  // Update useGoogle state with Google sign-in result
        email: userEmail,
        password: userPassword,
        // Add other properties as needed
      });
      // Proceed with registration or other actions
      register({
        user: {
          email: userEmail,
          password: userPassword,
          provider: 'apple',
          name: userFamilyName,
          username: userGivenName,
        },
      });

      // Log the entire appleAuthRequestResponse
      console.log('Apple Auth Response:', appleAuthRequestResponse);

      // Rest of your code...
    } catch (error) {
      console.error('Error during Apple Sign In:', error);
    }
  }


  const register = async (values) => {
    console.log('j')
    setLoading(true)
    try {
      const { data } = await axios.post(backendURL + '/user/signup', values);
      console.log(data, useGoogle)

      if (data.message === 'exist' || data.message === 'created') {
        login(
          {
            email: values.user.email,
            password: values.user.password
          })
      }
      setLoading(true)
    } catch (error) {
      // Handle error
      console.log(error)
    }
  }



  const [showPassword, setShowPassword] = React.useState(false);
  const [useGoogle, setUseGoogle] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  GoogleSignin.configure({

    webClientId: Platform.OS === 'ios' ? '772716520012-1rdo1akce15utlpd0md2c9q2p8qq36je.apps.googleusercontent.com' : '772772796235-if95s392sfalr9k203fvpgrmqqvt24h7.apps.googleusercontent.com',
    offlineAccess: true,
    iosClientId: '772716520012-1rdo1akce15utlpd0md2c9q2p8qq36je.apps.googleusercontent.com'
  });

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log(result)
      setUseGoogle({  // Update useGoogle state with Google sign-in result
        email: result.user.email,
        password: result.user.id,
        // Add other properties as needed
      });
      register({
        user: {
          email: result.user.email,
          password: result.user.id,
          provider: 'google',
          image: result.user.photo,
          name: result.user.name,
          username: result.user.givenName,
        },
      });


    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow

      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }

  };


  const { theme } = useTheme();
  const styles = useStyles();
  return (

    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
        style={{ flex: 1 }}
      >
        <View style={[{ alignItems: 'center', backgroundColor: 'white', flex: 1 }]}>
          <Pressable style={styles.x} onPress={() => navigation.goBack()}>
            <Icon
              type='ionicon'
              name='close-outline'
              color={colors.dg.color}
              size={30}
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../assets/x5.png')}
            />
          </Pressable>
          <Text style={[styles.t1, { marginTop: verticalScale(40) }]}>Login or sign up</Text>
          <Text style={styles.t2}>Create an account or log in to book and manage appointments </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {
              Platform.OS == 'ios' && <TouchableOpacity
                style={[
                  styles.press,
                  {
                    marginTop: verticalScale(20),
                    borderColor: '#BBB9BC',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center', // Center vertically
                  },
                ]}
                onPress={onAppleButtonPress}
              >
                <Icon
                  style={styles.image}
                  name='logo-apple'
                  type='ionicon' />
                <Text style={styles.t5}>Continue with Apple</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity
              style={[
                styles.press,
                {
                  marginTop: verticalScale(10),

                  borderColor: '#BBB9BC',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center', // Center vertically
                },
              ]}
              onPress={GoogleSingUp}
            >
              <Image
                style={styles.image}
                resizeMode="cover"
                source={require('../../../assets/google.png')} />
              <Text style={styles.t5}>Continue with Google</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 30, display: 'flex', flexDirection: 'row', }}>
              <View style={{ flex: 1, height: 0.5, backgroundColor: '#BBB9BC' }} />
              <Text style={{ marginHorizontal: 5, color: '#BBB9BC', }} >OR</Text>
              <View style={{ flex: 1, height: 0.5, backgroundColor: '#BBB9BC' }} />

            </View>
            <Formik
              initialValues={{
                email: email,
                password: password,
              }}
              onSubmit={values => onSubmit(values)}
              validate={values => {
                const errors = {}
                if (!values.email) {
                  errors.email = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Invalid email address';
                }
                if (!values.password) {
                  errors.password = 'Password is required';
                }
                return errors;
              }}>
              {({
                resetForm,
                handleChange, handleBlur, handleSubmit, values, touched, errors,
              }) => (
                <View style={styles.input}>
                  <Input
                    placeholder="Email"
                    inputStyle={{
                      color: colors.dg.color,
                      fontSize: moderateScale(14),
                    }

                    }
                    inputContainerStyle={[styles.textInput, { marginBottom: verticalScale(5), borderColor: colors.dg2.color, backgroundColor: 'white' }]}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    errorMessage={(touched.email && errors.email) || errorMessage} />

                  <Input
                    placeholder="Password"
                    inputContainerStyle={[styles.textInput, { borderColor: colors.dg2.color, backgroundColor: 'white', marginBottom: 0 }]}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    inputStyle={{
                      color: colors.dg.color,
                      fontSize: moderateScale(14),
                    }}
                    errorMessage={touched.password && errors.password}
                    secureTextEntry={!showPassword || remember.state}
                    rightIcon={<Icon
                      name={showPassword ? 'eye' : 'eye-off'}
                      type="ionicon"
                      onPress={handleShow}

                      color='#BBB9BC' />} />

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginHorizontal: 15, marginBottom: verticalScale(10), }}>
                    <CheckBoxComponent color='#BBB9BC' state={remember.state} height={verticalScale(22)} onPress={() => handleRemember(values)} width={horizontalScale(22)} title={'Remember me'} />

                    <Text
                      style={[styles.forgot]}
                      onPress={() => navigation.navigate('ForgotPassword')}>
                      Forgot Password?
                    </Text>

                  </View>


                  <Button
                    title="Sign in"
                    onPress={handleSubmit}
                    loading={loading}
                    titleStyle={styles.tbtn}
                    buttonStyle={styles.button} />

                </View>
              )}
            </Formik>



            <Pressable>

              <Text
                style={[styles.t3, { fontWeight: 'bold', marginTop: verticalScale(10), marginBottom: verticalScale(170) }]}
                onPress={() => navigation.replace('Register')}>
                Don't have an account?
                <Text style={styles.t4}> Sign Up</Text>
              </Text>

            </Pressable>
          </ScrollView>

        </View>
      </KeyboardAvoidingView>
      <Phone_pop login={login} googledata={useGoogle} modal={visible} id={id} setcancel={setVisible} />
      {
        visible && <Blur />
      }
    </>

  );
};
export default Login;



const useStyles = makeStyles((theme) => ({
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

    alignSelf: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: horizontalScale(23),
    borderWidth: 1,
    borderColor: '#FAFAFA',
    fontFamily: FontFamily.sourceSansProRegular
  },
  t1: {
    fontSize: moderateScale(26),
    color: '#00463C',
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
    color: '#00463C',
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

    marginTop: -20,
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
    backgroundColor: '#F9F9F9',
    marginTop: verticalScale(30),
  },

  P1: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: moderateScale(18),
    color: '#00463C'
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
    backgroundColor: '#ffff',
    width: '90%',
    alignSelf: 'center',
  },
  EI: {
    width: '90%',
    alignSelf: 'center',
    borderColor: '#86D694',
    paddingHorizontal: horizontalScale(10),
    borderWidth: horizontalScale(1),
    borderRadius: horizontalScale(10),
    marginBottom: verticalScale(20),
    height: verticalScale(42),
    color: "#86D694"
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
    backgroundColor: 'white',
    borderRadius: horizontalScale(20),
    height: verticalScale(34),
    padding: horizontalScale(8),
    marginBottom: verticalScale(30),
    borderColor: '#B0EBBD',
    borderWidth: 1,
    marginHorizontal: horizontalScale(7)

  },

  selected: {
    backgroundColor: '#86D694',
    borderRadius: horizontalScale(20),
    color: 'white',
    height: verticalScale(34),
    padding: horizontalScale(8),
    marginBottom: verticalScale(20),
    marginHorizontal: horizontalScale(7)
  },

  x: {
    alignSelf: 'flex-end',
    marginRight: horizontalScale(20),
    marginTop: verticalScale(30)

  }
}));

