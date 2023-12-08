import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {Button, Input, Icon, CheckBox} from '@rneui/base';
import {Image} from 'react-native';

import {Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles, colors} from '../../Common_styles';
import {register, setuser} from '../../redux/user';

import Header from './header';
import PhoneInput from 'react-native-phone-number-input';
const Register = ({navigation}) => {
  const {errorMessage, loading} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [receivePushNotifications, setReceivePushNotifications] =
    useState(false);


  const onSubmit = async values => {
   dispatch(register(
   {user: {
    email:values.email,
    name: values.name,
    phone: values.phone,
    username: values.username,
    password: values.password
   }}
  
   ));
    dispatch(setuser({
    email:values.email,
    phone: values.phone,
    password: values.password
    }));

   
    navigation.navigate('VerifyEmail',{scope:''});
  };

  return (
    <>
      <ScrollView
        style={styles.scroll}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
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
            <View style={[styles.container,{marginTop:10,marginBottom:20}]}>
              <Header
                main={'Create New Account'}
                sub={'Please fill in form to continue'}
              />
              <View>
                <TextInput
                autoFocus
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
                {/* <Input
                  placeholder="Phone Number"
                  inputContainerStyle={[[styles.textInput]]}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  errorMessage={touched.phone && errors.phone}
                  keyboardType="phone-pad"
                /> */}

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
                      <Text style={[colors.lg, styles.bold]}>
                         Privacy Policy
                      </Text>{' '}
                      and{' '}
                      <Text style={[colors.lg, styles.bold]}>
                        Terms of Use
                      </Text>{' '}
                      <Text style={[colors.lg, styles.bold]}>
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
              <View style={styles.t6}>
               
              </View>
              <Button
                title="Sign Up"
                onPress={handleSubmit}
                buttonStyle={[styles.button, {marginTop:20}]}
                loading={loading}
                disabled={!agreedToTerms}
              />
            </View>
          )}
        </Formik>

        <Text
          style={[styles.t3]}
          onPress={() => navigation.navigate('Login')}>
          Have an account?
          <Text style={[colors.lg]}> Login</Text>
        </Text>
      </ScrollView>
    </>
  );
};

export default Register;
