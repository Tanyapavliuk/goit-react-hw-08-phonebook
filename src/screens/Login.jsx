import { Formik, Field } from 'formik';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useLoginUserMutation } from '../redux/userRTKQuery';
import { setUserInfo, setToken } from 'redux/sliceUser';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Flex align="center" justify="center" h="70vh">
      <Box
        bg="white"
        rounded="md"
        className="py-5 px-10 w-11/12 md:w-3/4 lg:w-4/12"
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, actions) => {
            const { data } = await login(values);

            dispatch(setToken(data.token));
            dispatch(setUserInfo(data.user));
            actions.resetForm();
            navigate('/contacts');
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="flushed"
                    focusBorderColor="#0b5301"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="flushed"
                    focusBorderColor="#0b5301"
                    validate={value => {
                      let error;

                      if (value.length < 6) {
                        error = 'Password must contain at least 6 characters';
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-600/90 to-lime-900/90 hover:from-yellow-700 hover:to-lime-950  rounded-md py-3 px-20 text-lg text-white"
                >
                  Login
                </button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Login;
