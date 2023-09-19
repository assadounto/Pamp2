import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import {Button, Input, Icon, CheckBox} from '@rneui/base';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Color, FontFamily} from '../../GlobalStyles';
import {colors, styles} from '../../Common_styles';
import {login, register} from '../../redux/user';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import backendURL from '../../services/http';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, errorMessage, createError, userToken, success} = useSelector(
    state => state.user,
  );
  const onSubmit = async values => {
 console.log(values,'j')
 dispatch(login({user: values}));
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [useGoogle, setUseGoogle] = React.useState({});
  //const [isLoading, setIsLoading] = React.useState(false);
  GoogleSignin.configure({
    webClientId:
      '772716520012-ichh7fr2ps938dj0hsa5l2v4hh76iqd7.apps.googleusercontent.com',
    offlineAccess: true,
    iosClientId:'772716520012-1rdo1akce15utlpd0md2c9q2p8qq36je.apps.googleusercontent.com'
  });
  React.useEffect(() => {
    (createError === 'exist' || success === true) &&
      
      dispatch(login({user: useGoogle}));
    
  }, [createError, dispatch, useGoogle, success, userToken]);
console.log(createError,success,errorMessage)
  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(result => {
       console.log(result)
        setUseGoogle({
          email: result.user.email,
          password: result.user.id,
        });
        dispatch(
          register({
            user: {
              email: result.user.email,
              password: result.user.id,
              provider: 'google',
              image: result.user.photo,
              name: result.user.name,
              username: result.user.givenName,
            },
          }),
        );
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('User cancelled the login flow !');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
       console.log(error)
      }
    }
  };

  return (
  
      <View style={[styles.container, styles.mt100]}>
        <Text style={styles.t1}>Welcome</Text>
        <Text style={styles.t2}>Please sign into your account</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={values => onSubmit(values)}
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
              <View style={styles.input}>
                 <Text style={[{textAlign:'center',color: colors.dg2.color, marginBottom:10}]} >{(touched.email && errors.email) || errorMessage || errors.password}</Text>
                <TextInput
                  placeholder="Email"
                  style={[styles.textInput]}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errorMessage={(touched.email && errors.email) || errorMessage}
                />
                <View>
     
                 
             <TextInput
                  placeholder="Password"
                 style={[styles.textInput,{paddingRight:60}]}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  errorMessage={touched.password && errors.password}
                  secureTextEntry={!showPassword}
                 
                />
                <View  style={{position:'absolute',top:20,right:30}}>
                <Icon
                    
                      name={showPassword ? 'eye' : 'eye-off'}
                      type="ionicon"
                      onPress={() => setShowPassword(!showPassword)}
                      color='#BBB9BC'
                    />
                </View>
                  
                </View>
                

                <Text
                  style={styles.forgot}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  Forgot Password
                </Text>

               
                  <Button
                  titleStyle={{fontFamily:FontFamily.sourceSansProRegular,fontSize:14}}
                    title="Sign in"
                    onPress={handleSubmit}
                    loading={loading}
                    buttonStyle={styles.button}
                  />

<TouchableOpacity
  style={[
    styles.press,
    {
      // Add drop shadow styles here
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3, // Adjust the height to control the shadow's vertical position
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3, // For Android
      alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically
    },
  ]}
  onPress={GoogleSingUp}
>
  <Image
    style={styles.image}
    resizeMode="cover"
    source={require('../../../assets/google.png')}
  />
  <Text style={styles.t5}>Continue with Google</Text>
</TouchableOpacity>

        
              </View>
            )}
          </Formik>

          <TouchableOpacity  style={{marginTop:50}} onPress={() => navigation.navigate('Register')}>
         
              <Text
                style={[styles.t3,{marginBottom:20}]}
               >
                Don't have an account?
                <Text style={styles.t4}> Sign Up</Text>
              </Text>
            
          </TouchableOpacity>
        </ScrollView>
      </View>

  );
};
export default Login;
