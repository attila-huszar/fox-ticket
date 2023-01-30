import React, { useContext, useState } from 'react';
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Spacer,
} from '@nextui-org/react';
import { postLogin } from '../api/postLogin';
import {
  validateEmail,
  validatePassword,
} from '../helpers/inputFieldValidators';
import { InputField } from '../interfaces/user';
import { toast } from 'react-toastify';
import { UserContext } from './App';
import { UserContextInterface } from '../interfaces/user';

export default function Login() {
  const { currentUser, setCurrentUser } =
    useContext<UserContextInterface>(UserContext);

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const helperEmail: InputField = React.useMemo(() => {
    if (!email)
      return {
        text: '',
        color: 'default',
      };
    const isValid = validateEmail(email);

    return {
      text: isValid ? 'Valid email' : 'Enter a valid email',
      color: isValid ? 'success' : 'warning',
    };
  }, [email]);

  const helperPass: InputField = React.useMemo(() => {
    if (!password)
      return {
        text: '',
        color: 'default',
      };
    const isValidPass = validatePassword(password);

    return {
      text: isValidPass
        ? 'Valid password'
        : 'Minimum eight characters, at least one letter and one number',
      color: isValidPass ? 'success' : 'warning',
    };
  }, [password]);

  const closeModalHandler = () => {
    setLoginModalVisible(false);
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const notifyNotVerified = () =>
    toast.warn('Please verify your email address before logging in.');

  const loginHandler = async () => {
    try {
      const response = await postLogin({ email, password });

      if (response) {
        const verified = response.isVerified;
        if (verified) {
          localStorage.setItem('name', response.name);
          localStorage.setItem('email', response.email);
          localStorage.setItem('token', response.token);
          localStorage.setItem('admin', response.isAdmin);
          setCurrentUser({
            name: response.name,
            email: response.email,
            token: response.token,
            isAdmin: response.isAdmin,
          });
        } else {
          notifyNotVerified();
        }
      }
      setLoginModalVisible(false);
      setErrorMessage('');
      return response;
    } catch (error) {
      if (error instanceof Error) {
        const errors = [];
        errors.push(error.message.split(';'));

        for (let i = 0; i < errors.length; i++) {
          setErrorMessage(errors[0][i]);
        }
      }
    }
  };

  return (
    <>
      <Button
        style={{ fontSize: '1rem' }}
        auto
        color="secondary"
        shadow
        onPress={() => setLoginModalVisible(true)}
      >
        Login
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="login form"
        open={loginModalVisible}
        onClose={closeModalHandler}
      >
        <Modal.Header>
          <Text size={18}>
            Welcome to{' '}
            <Text
              b
              size={18}
              css={{
                textGradient: '45deg, $blue600 -20%, $pink600 50%',
              }}
            >
              Fox Ticket
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.2} />
          <Input
            onChange={e => setEmail(e.target.value)}
            required
            bordered
            status={helperEmail.color}
            color={helperEmail.color}
            helperColor={helperEmail.color}
            helperText={helperEmail.text}
            fullWidth
            labelPlaceholder="Email"
            size="lg"
          />
          <Spacer y={1.5} />
          <Input.Password
            onChange={e => setPassword(e.target.value)}
            required
            bordered
            status={helperPass.color}
            color={helperPass.color}
            helperColor={helperPass.color}
            helperText={helperPass.text}
            type="password"
            labelPlaceholder="Password"
            size="lg"
          />
          <Spacer y={0.2} />
          <Row justify="space-between">
            <Checkbox color="secondary">
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Text color="error">{errorMessage}</Text>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeModalHandler}>
            Close
          </Button>
          <Button auto onPress={loginHandler} color="gradient">
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
