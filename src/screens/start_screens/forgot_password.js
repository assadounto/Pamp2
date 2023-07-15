import React from 'react';
import Header from './header';
import {Text, View, TouchableOpacity} from 'react-native';
import {Input, Button} from '@rneui/base';
import {Formik} from 'formik';
import {styles} from '../../Common_styles';

const ForgotPassword = ({navigation}) => {
  const onSubmit = async values => {
   
    navigation.navigate('ResetPassword')
  };
  return (
    <>
      <Header main={'Find Your Pamp Account'} />
      <Formik
        initialValues={{
          email: '',
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
          <View style={styles.input2}>
            <Input
              placeholder="Email"
              inputContainerStyle={[styles.textInput,styles.tc]}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMessage={touched.email && errors.email}
              errorMessageStyle={styles.fs25}
            />
            <TouchableOpacity>
              <Button
                title="Search"
                onPress={handleSubmit}
                //loading={isLoading}
                buttonStyle={styles.button}
              />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;
