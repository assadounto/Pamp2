import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TextInput,Alert,Linking} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {Button, Input, Icon, CheckBox} from '@rneui/base';
import {Image} from 'react-native';
import { backendURL } from '../../services/http';
import {Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles, colors} from '../../Common_styles';
import {register, setUser, setuser} from '../../redux/user';

import axios from 'axios';

import Header from './header';
import PhoneInput from 'react-native-phone-number-input';
const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading,setLoading]= useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [receivePushNotifications, setReceivePushNotifications] =
    useState(false);

    const onSubmit = async values => {
      register({user: values});
    };
  
  
    const register=async(values)=>{
     // console.log(values)
      dispatch(setuser(values.user))
      setLoading(true)
      try {
        const {data} = await axios.post(backendURL+'/user/signup', values);
        console.log(data);
         dispatch(setUser({...values.user,id:data.id}))
    if(data.message==='exist'){
           Alert.alert('Error','Account already Exist. Please login')
        }
        else if (data?.message==='created'){
          dispatch(setUser({...values.user,id:data.id}))
          navigation.navigate('VerifyEmail',{scope:''});
        }
        
        
        
  
        setLoading(false)
        } catch (error) {
          console.log(error.response.data);
          Alert.alert('Error',error.response.data.errors[0])
          // Use error.response.data to get the error response data
          setLoading(false);
        }
    }

  return (
    <>
     <Header
                main={'Create New Account'}
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
            <View style={[styles.container,{marginTop:10,marginBottom:20}]}>
              
         
              <View>
                <TextInput
                
                placeholderTextColor={'#BBB9BC'}
                  placeholder="First Name"
                 style={[styles.textInput]}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  errorMessage={touched.username && errors.username}
                />

                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor={'#BBB9BC'}
                  style={[styles.textInput]}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  errorMessage={touched.name && errors.name}
                />
                 <PhoneInput
                    placeholderTextColor={'#BBB9BC'}
                  
                 textContainerStyle={{marginHorizontal:10, backgroundColor: '#EFEFEF',}}
            //ref={phoneInput}
            //defaultValue={value}
            containerStyle={[[styles.textInput,{alignSelf:'center',marginBottom:22}]]}
            defaultCode="GH"
           codeTextStyle={{color:colors.lg.color}}
            layout="second"
            //onChangeText={}
            
            onChangeFormattedText={handleChange('phone')}
            placeholder="Phone Number"
           
          />
           

                <TextInput
                   placeholderTextColor={'#BBB9BC'}
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
                   placeholderTextColor={'#BBB9BC'}
                  placeholder="Password"
                  style={[styles.textInput]}
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
              </View>
              <View style={styles.t6}>
                <CheckBox
                  uncheckedIcon={<Image
                    resizeMode='contain'
                    style={{width:33,height:33}}
                      source={require('../../../assets/rectangle1063.png')}
                       />}
                  checkedIcon={
                    <Image
                    style={{width:33,height:33}}
                    resizeMode='contain'
                      source={require('../../../assets/group2210.png')}
                       />
                  }
                  title={
                    <Text style={[colors.dg, styles.terms]}>
                      I agree to the{' '}
                      <Text onPress={()=> Linking.openURL("https://www.trypamp.com/privacy-policy")} style={[colors.lg, styles.bold]}>
                         Privacy Policy
                      </Text>{' '}
                      and{' '}
                      <Text onPress={()=> Linking.openURL("https://www.trypamp.com/terms-of-use")}  style={[colors.lg, styles.bold]}>
                        Terms of Use
                      </Text>{' '}
                      <Text onPress={()=> Linking.openURL("https://www.trypamp.com/terms-of-service")} style={[colors.lg, styles.bold]}>
                       Terms of Service
                      </Text>
                    </Text>
                  }
                  checked={agreedToTerms}
                  onPress={() => setAgreedToTerms(!agreedToTerms)}
                />
                 <CheckBox
                  title={
                    <Text style={[colors.dg, styles.terms]}>
               {" I agree to receive marketing notifications with \n offers and  news"}
                    </Text>
                  }
                  uncheckedIcon={<Image
                    resizeMode='contain'
                    style={{width:33,height:33}}
                      source={require('../../../assets/rectangle1063.png')}
                       />}
                  checkedIcon={
                    <Image
                    style={{width:33,height:33}}
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
                title="Sign Up"
                onPress={handleSubmit}
                buttonStyle={[styles.button, {marginTop:20}]}
                loading={loading}
                disabled={!agreedToTerms}
              />
            
            </View>
            <Text
          style={[styles.t3,{marginBottom:70}]}
          onPress={() => navigation.navigate('login')}>
          Have an account?
          <Text  style={[colors.lg]}> Login</Text>
        </Text>
            </ScrollView> 
          )}
             
        </Formik>

       
   
    </>
  );
};

export default Register;
