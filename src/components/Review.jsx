import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import Button from './Button';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()    
    .required('ownerName is required'),
    repositoryName: yup
    .string()
    .required('repositoryName is required'),
    rating: yup
    .number()
    .min(0)
    .max(100)
    .required('rating is required'),
    text: yup
    .string()
});

const ReviewForm = ({ onSubmit }) => {
  return(
    <View>
      <FormikTextInput name="ownerName" placeholder="ownerName" />
      <FormikTextInput name="repositoryName" placeholder="repositoryName" />
      <FormikTextInput name="rating" placeholder="rating" />
      <FormikTextInput name="text" placeholder="text" multiline/>
      <Button testID="signInSubmit" onPress={onSubmit} style='primary'>Submit</Button>
    </View>
  );
};


const Review = () => {
  const [ mutate ] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const onSubmit = async values => {
    const response = await mutate({ variables: {
      "ownerName": values.ownerName,
      "repositoryName": values.repositoryName,
      "rating": parseInt(values.rating),
      "text": values.text
    } });
    history.push(`/${response.data.createReview.repositoryId}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {
        ({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />
      }
    </Formik>
  );
};

export default Review;