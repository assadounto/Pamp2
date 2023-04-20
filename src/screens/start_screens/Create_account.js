import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {Button, Input, Icon, CheckBox} from '@rneui/base';
import {Image} from 'react-native';

import {Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles, colors} from '../../Common_styles';
import {register, setuser} from '../../redux/user';

import Header from './header';
const Register = ({navigation}) => {
  const {errorMessage, loading} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [receivePushNotifications, setReceivePushNotifications] =
    useState(false);


  const onSubmit = async values => {
   dispatch(register({user: {
    email:values.email,
    phone: '+233'+ values.phone.substr(1),
    username: values.username,
    password: values.password
   }}));
    dispatch(setuser({
    email:values.email,
    phone: '+233'+ values.phone.substr(1),
    password: values.password
    }));

    console.log(values);
    navigation.navigate('VerifyEmail');
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

            if (!values.phone) {
              errors.phone = 'Phone number is required';
            } else if (!/^[0-9]{10}$/i.test(values.phone)) {
              errors.phone = 'Invalid phone number';
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
            <View style={[styles.container,{marginTop:20,marginBottom:20}]}>
              <Header
                main={'Create New Account'}
                sub={'Please fill in form to continue'}
              />
              <View>
                <Input
                  placeholder="First Name"
                  inputContainerStyle={[styles.textInput]}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  errorMessage={touched.username && errors.username}
                />

                <Input
                  placeholder="Last Name"
                  inputContainerStyle={[[styles.textInput]]}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  errorMessage={touched.name && errors.name}
                />

                <Input
                  placeholder="Phone Number"
                  inputContainerStyle={[[styles.textInput]]}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  errorMessage={touched.phone && errors.phone}
                  keyboardType="phone-pad"
                />

                <Input
                  placeholder="Email"
                  inputContainerStyle={[styles.textInput]}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errorMessage={touched.email && errors.email}
                  keyboardType="email-address"
                />

                <Input
                  placeholder="Password"
                  inputContainerStyle={[styles.textInput,{marginBottom:-20}]}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  errorMessage={touched.password && errors.password}
                  secureTextEntry={!showPassword}
                  rightIcon={
                    <Icon
                      name={showPassword ? 'eye' : 'eye-off'}
                      type="ionicon"
                      onPress={() => setShowPassword(!showPassword)}
                      color={'#BBB9BC'}
                    />
                  }
                />
              </View>
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
                    <Text style={[colors.dg, styles.terms]}>
                      I agree to the{' '}
                      <Text style={[colors.lg, styles.bold]}>
                        Terms of Service
                      </Text>{' '}
                      and{' '}
                      <Text style={[colors.lg, styles.bold]}>
                        Privacy Policy
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
                      I agree to receive marketing notifications with offers and
                      news
                    </Text>
                  }
                  checkedIcon={
                    <View style={styles.checkc}>
                      <Image
                        source={require('../../../assets/check3.png')}
                        style={styles.check}
                      />
                    </View>
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
