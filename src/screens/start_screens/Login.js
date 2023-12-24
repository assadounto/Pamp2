import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {Button, Input, Icon, CheckBox, BottomSheet} from '@rneui/base';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Color, FontFamily} from '../../GlobalStyles';
import {styles} from '../../Common_styles';
import { setUser } from '../../redux/user';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { backendURL } from '../../services/http';
import { loginUser } from '../../redux/user';
import { useGetPhoneConfirmMutation } from '../../redux/authapi';
import Phone_pop from '../../../components/PhoneInput';
import Blur from './Blur';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [errorMessage,setError]= useState('')
  const [id,setId]=useState()
  const [visible,setVisible]=useState(false)
 const [loading,setLoading]= useState(false)
 const [getPhoneConfirm]= useGetPhoneConfirmMutation()
  const onSubmit = async values => {
   login(values)

  };


  const login=async(values)=>{
  setLoading(true)
  

    try {
      const {data} = await axios.post(backendURL+'/user/login', {user:values});
        // Handle success
        setUseGoogle(values)
        setId(data.user.id)
        console.log(data)
         dispatch(setUser({...values,id: data.user.id}))
       if(!data.user.phone) {
        setVisible(true)
        setLoading(false)
        return
       }
       dispatch(setUser({...values,id: data.user.id}))

        setLoading(false)
        
        if(data.email_confirmed && data.phone_confirmed){
            dispatch(loginUser(data))
        }


       else if (data.email_confirmed && !data.phone_confirmed){
        dispatch(setUser({...values,id: data.user.id}))
      
          getPhoneConfirm({
            scope: 'user',
            id: data.user.id
          })
          navigation.navigate('VerifyNumber');
   
         
        }
        else if (!data.email_confirmed && data.phone_confirmed){
          
          navigation.navigate('VerifyEmail',{next: 'noti'});
        }
        else{
          navigation.navigate('VerifyEmail');
        }
      } catch (error) {
        // Handle error
        alert('Invalid email or password')
        setLoading(false)
        console.log(error)
      }
  }


  const register=async(values)=>{
    console.log('j')
    setLoading(true)
    try {
      const {data} = await axios.post(backendURL+'/user/signup', values);
     console.log(data,useGoogle)
      
    if(data.message==='exist' || data.message==='created' ){
      login(
        {email: values.user.email,
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
    webClientId:
      '772716520012-ichh7fr2ps938dj0hsa5l2v4hh76iqd7.apps.googleusercontent.com',
    offlineAccess: true,
    iosClientId:'772716520012-1rdo1akce15utlpd0md2c9q2p8qq36je.apps.googleusercontent.com'
  });

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
    
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

   
    }catch (error) {
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

  return (
  
      <><View style={[{alignItems:'center', backgroundColor: 'white', flex: 1 }]}>
      <Text style={[styles.t1, { marginTop: 100 }]}>Welcome</Text>
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
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            }
            return errors;
          } }>
          {({
            handleChange, handleBlur, handleSubmit, values, touched, errors,
          }) => (
            <View style={styles.input}>
              <Input
                placeholder="Email"
                inputContainerStyle={[styles.textInput,{marginBottom:5}]}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={(touched.email && errors.email) || errorMessage} />

              <Input
                placeholder="Password"
                inputContainerStyle={[styles.textInput]}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={touched.password && errors.password}
                secureTextEntry={!showPassword}
                rightIcon={<Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  type="ionicon"
                  onPress={() => setShowPassword(!showPassword)}
                  color='#BBB9BC' />} />

              <Text
                style={[styles.forgot,{marginTop:-10}]}
                onPress={() => navigation.navigate('ForgotPassword')}>
                Forgot Password
              </Text>

              <TouchableOpacity>
                <Button
                  title="Sign in"
                  onPress={handleSubmit}
                  loading={loading}
                  buttonStyle={styles.button} />
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <TouchableOpacity
          style={[
            styles.press,
            {
              marginTop: 10,
              elevation: 3,
              shadowOpacity: 0.2,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 4 },
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

        <Pressable>

          <Text
            style={[styles.t3, { marginTop: 20 }]}
            onPress={() => navigation.navigate('Register')}>
            Don't have an account?
            <Text style={styles.t4}> Sign Up</Text>
          </Text>

        </Pressable>
      </ScrollView>

    </View>
    
        <Phone_pop login={login} googledata={useGoogle} modal={visible} id={id} setcancel={setVisible}/>
     {
visible&&  <Blur />
     }  
     </>

  );
};
export default Login;
