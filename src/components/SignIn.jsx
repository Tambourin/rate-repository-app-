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
      <FormikTextInput testID="signUsername" name="username" placeholder="username" />
      <FormikTextInput testID="signPassword" name="password" placeholder="password" secureTextEntry />
      <Button testID="signInSubmit" onPress={onSubmit} style='primary'>Submit</Button>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {
        ({ handleSubmit }) => <SigninForm onSubmit={handleSubmit} />
      }
    </Formik>
  );
};

const SignIn = () => {
  const { signIn } = useSignIn();
  const history = useHistory();

  const onSubmit = async values => {
    await signIn(values);
    history.push('/');
  };
  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;