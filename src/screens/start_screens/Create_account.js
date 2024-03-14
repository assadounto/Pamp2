import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TextInput,Alert,Linking, Platform} from 'react-native';
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
import { horizontalScale, verticalScale } from '../../Dimensions';
import { FontFamily } from '../../GlobalStyles';
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
          navigation.replace('VerifyEmail',{scope:''});
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
            <View style={[styles.container,{marginTop:verticalScale(10),marginBottom:verticalScale(120)}]}>
              
         
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
                 <PhoneInput
                    placeholderTextColor={'#BBB9BC'}
                  
                 textContainerStyle={{marginHorizontal:10, backgroundColor: '#FAFAFA',}}
            //ref={phoneInput}
            //defaultValue={value}
            containerStyle={[Platform.OS==='ios'? styles.textInput:{borderRadius:20,  backgroundColor: '#EFEFEF',alignSelf:'center',marginBottom:verticalScale(22),height:verticalScale(75)}]}
            defaultCode="GH"
           codeTextStyle={{color:colors.dg2.color,fontWeight:'bold', fontFamily:FontFamily.sourceSansProBold}}
            layout="second"
            //onChangeText={}
            
            onChangeFormattedText={handleChange('phone')}
            placeholder="Phone Number"
           
          />
                 <View  style={{position:'absolute',top:verticalScale(20),right:horizontalScale(30)}}>
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
                    style={{width:22,height:22}}
                      source={require('../../../assets/rectangle1063.png')}
                       />}
                  checkedIcon={
                    <Image
                    style={{width:22,height:22}}
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

              </View>
           <View style={styles.t6}>
           <CheckBox
                  title={
                    <Text style={[colors.dg, styles.terms]}>
               {" I agree to receive marketing notifications with offers and  news"}
                    </Text>
                  }
                  uncheckedIcon={<Image
                    resizeMode='contain'
                    style={{width:22,height:22}}
                      source={require('../../../assets/rectangle1063.png')}
                       />}
                  checkedIcon={
                    <Image
                    style={{width:22,height:22}}
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
                buttonStyle={[styles.button, {marginTop:verticalScale(10)}]}
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
