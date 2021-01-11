import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from './FormikTextInput.jsx';
import Button from './Button.jsx';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn.js';
import { useHistory } from 'react-router-native';

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
  const [ signIn ] = useSignIn();
  const history = useHistory();

  const onSubmit = async values => {
    signIn(values);
    history.push('/');
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