import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from './FormikTextInput.jsx';
import Button from './Button.jsx';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn.js';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations.js';

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)    
    .required('Username is required'),
    password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
    passwordAgain: yup
    .string()
    .min(5)
    .max(50)
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return(
    <View>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" secureTextEntry />
      <FormikTextInput name="passwordAgain" placeholder="passwordAgain" secureTextEntry />
      <Button onPress={onSubmit} style='primary'>Submit</Button>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {
        ({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />
      }
    </Formik>
  );
};

const SignUp = () => {
  const { signIn } = useSignIn();
  const [ mutate ] = useMutation(CREATE_USER);
  const history = useHistory();

  const onSubmit = async values => {
    await mutate({ variables: { username: values.username, password: values.password }});
    await signIn(values);
    history.push('/');
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;