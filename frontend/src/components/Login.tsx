import React, { useState } from 'react';
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Spacer,
} from '@nextui-org/react';
import { fetchLogin } from '../api/fetchRegister';
import { validateEmail, validatePassword  } from '../helpers/inputFieldValidators';

export default function Login() {
  const [visLogin, setVisLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  interface help {
    text: string;
    color:
      | 'success'
      | 'warning'
      | 'default'
      | 'primary'
      | 'secondary'
      | 'error'
      | undefined;
  }

  const helperEmail: help = React.useMemo(() => {
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

  const helperPass: help = React.useMemo(() => {
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

  const LoginBtnHandler = () => setVisLogin(true);

  const closeHandler = () => {
    setVisLogin(false);
    setEmail('');
    setPassword('');
  };

  const loginHandler = async () => {
      try {
        await fetchLogin({ email, password });
      } catch (error) {
        if (error instanceof Error) {
          const errors = [];
          errors.push(error.message.split(';'));

          for (let i = 0; i < errors.length; i++) {
            setErrorMessage(errors[0][i]);
          }
          setVisLogin(true);
          return;
        }
      }
      setErrorMessage('');
      //setToken(token);
      setVisLogin(false);
  };

  return (
    <div>
      <Button
        style={{ fontSize: '1rem' }}
        auto
        color="secondary"
        shadow
        onPress={LoginBtnHandler}
      >
        Login
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="login form"
        open={visLogin}
        onClose={closeHandler}
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
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={loginHandler} color="gradient">
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
