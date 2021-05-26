import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Form from 'react-bootstrap/Form';
import LabeledInput from '../../molecules/LabeledInput';
import Button from '../../atoms/Button';

const formSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Formato inválido')
    .required('Campo obrigatório'),
  password: Yup.string()
    .trim()
    .min(6, 'Mínimo de 6 caracteres')
    .max(100, 'Máximo de 100 caracteres')
    .required('Campo obrigatório'),
});

const LoginForm = ({ handleLoginUser }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      handleLoginUser(values);
    },
    validationSchema: formSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <LabeledInput
        controlId="loginFormEmail"
        label="User Email"
        type="text"
        name="email"
        value={formik.values.email}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        error={formik.errors.email}
        touched={formik.touched.email}
      />

      <LabeledInput
        controlId="loginFormEmail"
        label="User Password"
        type="password"
        name="password"
        value={formik.values.password}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        error={formik.errors.password}
        touched={formik.touched.password}
      />

      <Button
        variant="primary"
        type="submit"
        size="lg"
        // isLoading={}
      >
        Entrar
      </Button>
    </Form>
  );
};

export default LoginForm;
