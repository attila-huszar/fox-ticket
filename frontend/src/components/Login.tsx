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
import { InputField, LoggedInUser } from '../interfaces/user';
import { toast } from 'react-toastify';
import { UserContext } from './App';
import { UserContextInterface } from '../interfaces/user';

export default function Login() {
  const { currentUser, setCurrentUser } =
    useContext<UserContextInterface>(UserContext);

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  // Input field helpers
  const emailHelper: InputField = React.useMemo(() => {
    if (!email)
      return {
        text: '',
        color: 'default',
      };
    const isValid = validateEmail(email);

    return {
      text: isValid ? 'Valid email' : 'Please enter a valid email address',
      color: isValid ? 'success' : 'warning',
    };
  }, [email]);

  const passHelper: InputField = React.useMemo(() => {
    if (!password)
      return {
        text: '',
        color: 'default',
      };
    const isValidPass = validatePassword(password);

    return {
      text: isValidPass
        ? 'Valid password'
        : 'Please enter minimum eight characters',
      color: isValidPass ? 'success' : 'warning',
    };
  }, [password]);

  // Handlers
  let response: LoggedInUser;

  const loginHandler = async () => {
    if (!email) {
      setShakeEmail(true);
      emailHelper.color = 'error';
      emailHelper.text = 'Please enter your email address';
    } else if (!validateEmail(email)) {
      setShakeEmail(true);
      emailHelper.color = 'error';
    }
    if (!password) {
      setShakePassword(true);
      passHelper.color = 'error';
      passHelper.text = 'Please enter your password';
    } else if (!validatePassword(password)) {
      setShakePassword(true);
      passHelper.color = 'error';
    }
    setTimeout(() => setShakeEmail(false), 750);
    setTimeout(() => setShakePassword(false), 750);

    try {
      response = await postLogin({ email, password });

      if (response) {
        const verified = response.isVerified;
        if (verified) {
          localStorage.setItem('name', response.name);
          localStorage.setItem('email', response.email);
          localStorage.setItem('token', response.token);
          localStorage.setItem('admin', String(response.isAdmin));
          setCurrentUser({
            name: response.name,
            email: response.email,
            token: response.token,
            isAdmin: response.isAdmin,
          });
          notifyLoggedIn();
        } else {
          notifyNotVerified();
        }
        setLoginModalVisible(false);
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        const errors = [];
        errors.push(error.message.split(';'));

        for (let i = 0; i < errors.length; i++) {
          setShakeEmail(true);
          setShakePassword(true);
          emailHelper.color = 'error';
          passHelper.color = 'error';
          emailHelper.text = errors[0][i];
          passHelper.text = errors[0][i];
          setTimeout(() => {
            setShakeEmail(false);
            setShakePassword(false);
          }, 750);
        }
      }
    }
  };

  const closeModalHandler = () => {
    setLoginModalVisible(false);
    setEmail('');
    setPassword('');
  };

  // Notifications
  const notifyLoggedIn = () =>
    toast.success(`Successful login. Welcome to Fox Ticket, ${response.name}!`);

  const notifyNotVerified = () =>
    toast.warn('Please verify your email address before logging in.');

  return (
    <>
      <Button
        css={{
          fontSize: '1rem',
          '&:hover, &:focus': {
            boxShadow: '0 4px 14px 0 var(--nextui-colors-hoverShadow)',
          },
        }}
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
          <Text size={26}>Welcome to&nbsp; </Text>
          <Text
            size={28}
            css={{
              textGradient: '45deg, $blue600 -20%, $pink600 50%',
              letterSpacing: '$wide',
            }}
          >
            <strong>Fox</strong>Ticket
          </Text>
        </Modal.Header>
        <hr
          style={{
            color: '#f2f2f2',
            height: 5,
          }}
        />
        <Modal.Body>
          <Spacer y={0.2} />
          <Input
            className={shakeEmail ? 'shake' : ''}
            onChange={e => setEmail(e.target.value)}
            required
            bordered
            status={emailHelper.color}
            color={emailHelper.color}
            helperColor={emailHelper.color}
            helperText={emailHelper.text}
            labelPlaceholder="Email"
            fullWidth
            size="lg"
          />
          <Spacer y={1.5} />
          <Input.Password
            className={shakePassword ? 'shake' : ''}
            onChange={e => setPassword(e.target.value)}
            required
            bordered
            status={passHelper.color}
            color={passHelper.color}
            helperColor={passHelper.color}
            helperText={passHelper.text}
            type="password"
            labelPlaceholder="Password"
            fullWidth
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
