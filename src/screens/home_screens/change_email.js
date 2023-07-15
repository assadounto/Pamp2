import React from 'react';
import Header from '../start_screens/header';
import {Text, View, TouchableOpacity} from 'react-native';
import {Input, Button} from '@rneui/base';
import {Formik} from 'formik';
import {styles} from '../../Common_styles';

const Change_email = ({navigation}) => {
  const onSubmit = async values => {
   
    navigation.navigate('ResetPassword')
  };
  return (
    <>
      <Header main={'Change Email'} />
      <Formik
        initialValues={{
          email: '',
          new_email:''
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
              placeholder="Current Email Address"
              inputContainerStyle={[styles.textInput,styles.tc]}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMessage={touched.email && errors.email}
              errorMessageStyle={styles.fs25}
            />
            <Input
              placeholder="New Email Address"
              inputContainerStyle={[styles.textInput,styles.tc]}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMessage={touched.email && errors.email}
              errorMessageStyle={styles.fs25}
            />
            <Input
              placeholder="Confirm Email Address"
              inputContainerStyle={[styles.textInput,styles.tc]}
              onChangeText={handleChange('confirm_email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMessage={touched.email && errors.email}
              errorMessageStyle={styles.fs25}
            />
            <TouchableOpacity>
              <Button
                title="Save"
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

export default Change_email;
