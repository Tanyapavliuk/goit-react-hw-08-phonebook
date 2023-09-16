import { useDispatch, useSelector } from 'react-redux';
import { addContanct } from 'redux/sliceContact';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as formik from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import MyAlert from 'components/Alert/Alert';
import { FloatingLabel } from 'react-bootstrap';

const phoneRegExp =
  /^[\]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;

const mySchema = yup.object().shape({
  nameUser: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
});

const FormContact = () => {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.contacts);

  const [show, setShow] = useState(false);

  const handlerSubmit = (values, actions) => {
    setShow(false);
    const { nameUser, phone } = values;

    const inArray = contacts.some(
      contact =>
        contact.name.toLowerCase() === nameUser.toLowerCase() &&
        contact.phone === Number(phone)
    );

    if (inArray) {
      setShow(true);
      actions.resetForm();
      return;
    }

    dispatch(addContanct({ name: nameUser, phone }));
    actions.resetForm();
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

            <Button variant="outline-success" type="submit" size="lg">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {show && <MyAlert show={show} shangeShow={setShow} />}
    </>
  );
};

export default FormContact;

//   <Form className="w-60 flex flex-col gap-5">
//     <Field
//       name="nameUser"
//       type="text"
//       placeholder="Name"
//       className="py-2 px-1 outline outline-offset-2 outline-1"
//     />
//     {errors.nameUser && touched.nameUser ? (
//       <div>{errors.nameUser}</div>
//     ) : null}
//     <Field
//       name="phone"
//       type="number"
//       placeholder="380 000 000 000"
//       className="py-2 px-1 outline outline-offset-2 outline-1"
//     />
//     {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
//     <button
//       type="submit"
//       className="py-2 px-2 border-solid border-2 border-indigo-600 hover:bg-indigo-100"
//     >
//       Submit
//     </button>
//   </Form>
// )}
