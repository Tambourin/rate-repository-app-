import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from './FormikTextInput.jsx';
import Button from './Button.jsx';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()    
    .required('Username is required'),
    password: yup
    .string()
    .required('Password is required'),
});

const SigninForm = ({ onSubmit }) => {
  return(
    <View>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" secureTextEntry />
      <Button onPress={onSubmit} style='primary'>Submit</Button>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {
        ({ handleSubmit }) => <SigninForm onSubmit={handleSubmit} />
      }
    </Formik>
  
  );
};

export default SignIn;