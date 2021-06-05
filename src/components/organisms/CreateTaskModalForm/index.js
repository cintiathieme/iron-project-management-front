import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from 'react-bootstrap/Modal';
import Button from '../../atoms/Button';
import LabeledInput from '../../molecules/LabeledInput';

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

const CreateTaskModalForm = ({ createNewTask }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: async values => {
      setIsLoading(true);
      await createNewTask(values);

      closeModal();
      setIsLoading(false);
    },
    validationSchema: formSchema,
  });

  const closeModal = () => {
    setFieldValue('name', '');
    setFieldValue('description', '');
    setFieldTouched('name', false);
    setFieldTouched('description', false);

    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Create new Task
      </Button>

      <Modal show={show} onHide={closeModal}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LabeledInput
              controlId="createTaskFormName"
              label="Task Name"
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
            />

            <LabeledInput
              controlId="createTaskFormDescription"
              label="Task Description"
              type="text"
              name="description"
              value={values.description}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.description}
              touched={touched.description}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" isLoading={isLoading} onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" isLoading={isLoading} type="submit">
              Create Task
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default CreateTaskModalForm;
