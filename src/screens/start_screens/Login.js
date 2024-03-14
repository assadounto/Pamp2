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
import {Formik} from 'formik';
import {Button, Icon, CheckBox, BottomSheet} from '@rneui/base';
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



import { horizontalScale,verticalScale,moderateScale } from '../../Dimensions';
import {Color, FontFamily} from '../../GlobalStyles';
import CheckBoxComponent from '../../../components/Checkbox';
import {colors, styles} from '../../Common_styles';
import {setRemember, setUser } from '../../redux/user';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { backendURL } from '../../services/http';
import { loginUser } from '../../redux/user';
import { useGetPhoneConfirmMutation } from '../../redux/authapi';
import Phone_pop from '../../../components/PhoneInput';
import Blur from './Blur';
import Bottom from '../../../components/bottomsheet';
const Login = ({navigation}) => {
  const next= useSelector(state=>state.user.next)

  const dispatch = useDispatch();
  const remember= useSelector(state=>state.user.remember)
  const [password,setPass]=useState(remember.password)
    const [email,setMail]=useState(remember.email)

  const [errorMessage,setError]= useState('')
  const [id,setId]=useState()
  const [visible,setVisible]=useState(false)
 const [loading,setLoading]= useState(false)
 const [getPhoneConfirm]= useGetPhoneConfirmMutation()
 const onSubmit = async values => {
  // 
  if(remember.state) {
    dispatch(setRemember(values))

  }
  setTimeout(()=>{
    login(values)
  },500)
    console.log(remember,values)
  };
  console.log(remember)

  const handleRemember = (values) => {
    dispatch(setRemember({  state: !remember.state }));

    // If "Remember me" is unchecked, clear the Formik initial values
    if (remember.state) {
     values.password=''
      setPass('');
      dispatch(setRemember({ email:  '', password: ''}));

    }
  };
  

  
  const handleShow=()=>{
    if (remember.state){
      return
    }
    setShowPassword(!showPassword)
  }
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
            if(next && next=='Favourites'){
     
             // navigation.goBack()
               navigation.navigate('main')
             
            }

            
            else{

              navigation.replace(next)
            }
       }


       else if (data.email_confirmed && !data.phone_confirmed){
        dispatch(setUser({...values,id: data.user.id}))
      
          getPhoneConfirm({
            scope: 'user',
            id: data.user.id
          })
          navigation.replace('VerifyNumber');
   
         
        }
        else if (!data.email_confirmed && data.phone_confirmed){
          
          navigation.replace('VerifyEmail',{next: 'noti'});
        }
        else{
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
        email:userEmail,
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

    webClientId: Platform.OS === 'ios' ? '772716520012-1rdo1akce15utlpd0md2c9q2p8qq36je.apps.googleusercontent.com' : '772772796235-if95s392sfalr9k203fvpgrmqqvt24h7.apps.googleusercontent.com',
    offlineAccess: true,
    iosClientId:'772716520012-1rdo1akce15utlpd0md2c9q2p8qq36je.apps.googleusercontent.com'
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
  
      <>
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
      style={{ flex: 1 }}
    >
      <View style={[{alignItems:'center', backgroundColor: 'white', flex: 1 }]}>
      <Pressable style={styles2.x} onPress={() => navigation.goBack()}>
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
            Platform.OS=='ios' && <TouchableOpacity
            style={[
              styles.press,
              {
                marginTop: verticalScale(20),
                borderColor:'#BBB9BC',
                borderWidth:1,
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
            
              borderColor:'#BBB9BC',
              borderWidth:1,
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
        <View style={{alignItems:'center',width:'90%', alignSelf:'center', marginTop:30, display:'flex',flexDirection:'row',}}>
          <View style={{flex:1,height:0.5,backgroundColor:'#BBB9BC'}}/>
          <Text style={{marginHorizontal:5,  color: '#BBB9BC',}} >OR</Text>
          <View style={{flex:1,height:0.5,backgroundColor:'#BBB9BC'}}/>

        </View>
        <Formik
          initialValues={{
            email:  email,
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
          } }>
          {({
            resetForm,
            handleChange, handleBlur, handleSubmit, values, touched, errors,
          }) => (
            <View style={styles.input}>
              <Input
                placeholder="Email"
                inputStyle={{
                  color:colors.dg.color,
                  fontSize:moderateScale(14),
                }
              
                }
                inputContainerStyle={[styles.textInput,{marginBottom:verticalScale(5),borderColor:colors.dg2.color,backgroundColor:'white'}]}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={(touched.email && errors.email) || errorMessage} />

              <Input
                placeholder="Password"
                inputContainerStyle={[styles.textInput,{borderColor:colors.dg2.color,backgroundColor:'white',marginBottom:0}]}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                inputStyle={{
                  color:colors.dg.color,
                  fontSize:moderateScale(14),
                }}
                errorMessage={touched.password && errors.password}
                secureTextEntry={!showPassword  || remember.state}
                rightIcon={<Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  type="ionicon"
                  onPress={handleShow}

                  color='#BBB9BC' />} />

<View style={{display:'flex',flexDirection:'row', justifyContent:'center',marginHorizontal:15,    marginBottom: verticalScale(10),}}>
                <CheckBoxComponent color='#BBB9BC' state={remember.state} height={verticalScale(22)} onPress={()=>handleRemember(values)} width={horizontalScale(22)} title={'Remember me'}/>

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
            style={[styles.t3, {fontWeight:'bold' ,marginTop: verticalScale(10) ,marginBottom:verticalScale(170)}]}
            onPress={() => navigation.replace('Register')}>
            Don't have an account?
            <Text style={styles.t4}> Sign Up</Text>
          </Text>

        </Pressable>
      </ScrollView>

    </View>
    </KeyboardAvoidingView>
        <Phone_pop login={login} googledata={useGoogle} modal={visible} id={id} setcancel={setVisible}/>
     {
visible&&  <Blur />
     }  
     </>

  );
};
export default Login;





const styles2 = StyleSheet.create({
  
  x: {
 alignSelf:'flex-end',
marginRight:horizontalScale(20),
marginTop:verticalScale(30)

}});