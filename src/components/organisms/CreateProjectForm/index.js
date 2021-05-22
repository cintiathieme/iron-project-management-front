import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Form from 'react-bootstrap/Form';
import LabeledInput from '../../molecules/LabeledInput';
import Button from '../../atoms/Button';

const formSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Mínimo de 3 caracteres')
    .max(100, 'Máximo de 100 caracteres')
    .required('Campo obrigatório'),
  description: Yup.string()
    .trim()
    .min(10, 'Mínimo de 10 caracteres')
    .max(300, 'Máximo de 300 caracteres')
    .required('Campo obrigatório'),
});

const CreateProjectForm = ({ handleCreateProject, isLoading }) => {
  const {
    values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched,
  } = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: async values => {
      await handleCreateProject(values); // chamo a funcão recebida via props passando os valores digitados no FORM

      // reset dos campos do formulário
      setFieldValue('name', '');
      setFieldValue('description', '');
      setFieldTouched('name', false);
      setFieldTouched('description', false);
    },
    validationSchema: formSchema,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <LabeledInput
        controlId="createProjectFormName"
        label="Project Name"
        type="text"
        name="name"
        value={values.name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />

      <LabeledInput
        controlId="createProjectFormDescription"
        label="Project Description"
        type="text"
        name="description"
        value={values.description}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.description}
        touched={touched.description}
      />

      <Button
        variant="primary"
        type="submit"
        size="lg"
        isLoading={isLoading}
      >
        Criar Projeto
      </Button>
    </Form>
  );

};

export default CreateProjectForm;
