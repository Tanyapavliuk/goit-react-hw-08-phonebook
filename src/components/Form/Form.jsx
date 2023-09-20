import * as formik from 'formik';
import * as yup from 'yup';

import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import {
  useAddNewContactMutation,
  useGetAllContactsQuery,
} from 'redux/sliceContact';
import { useState } from 'react';
import { Alert } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';

// const phoneRegExp =
//   /^[\]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;

const mySchema = yup.object().shape({
  nameUser: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: yup
    .string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
});

const FormContact = () => {
  const { Formik } = formik;
  const [showAlert, setShowAlert] = useState(false);
  const [newContact] = useAddNewContactMutation();
  const { data, refetch } = useGetAllContactsQuery();

  const handlerSubmit = (values, actions) => {
    const { nameUser: name, phone } = values;

    const isInContacts = data.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.number === phone
    );
    if (isInContacts) {
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 3000);
      actions.resetForm();
      return;
    }
    setShowAlert(false);
    newContact({ name, number: phone });

    actions.resetForm();
    refetch();
  };

  return (
    <>
      <Formik
        initialValues={{
          nameUser: '',
          phone: '',
        }}
        validationSchema={mySchema}
        onSubmit={handlerSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <FloatingLabel controlId="nameUser" label="Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={values.nameUser}
                onChange={handleChange}
                isValid={touched.nameUser && !errors.nameUser}
                aria-describedby="Name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="phone" label="Phone" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Phone"
                value={values.phone}
                onChange={handleChange}
                isValid={touched.phone && !errors.phone}
                aria-describedby="Phone"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>

            <button
              type="submit"
              className="flex items-center gap-x-2 py-3 px-5 rounded-md bg-gradient-to-r from-yellow-600/90 to-lime-900/90 hover:from-yellow-600 hover:to-lime-900 transition-all  text-white font-medium text-lg"
            >
              <PhoneIcon />
              Add contact
            </button>
          </Form>
        )}
      </Formik>
      {showAlert && (
        <div className="fixed top-1">
          <Alert status="warning">
            <PhoneIcon />
            This contact is already in the contact list
          </Alert>
        </div>
      )}
    </>
  );
};

export default FormContact;
