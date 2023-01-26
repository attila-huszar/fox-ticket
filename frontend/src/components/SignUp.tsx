import React, { useState } from 'react';
import { Modal, Input, Button, Text, Spacer } from '@nextui-org/react';
import fetchRegister from '../api/fetchRegister';
import { toast } from 'react-toastify';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../helpers/inputFieldValidators';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const validateMatch = (value: string) => {
    if (value === password) return true;
  };

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

  const helperName: help = React.useMemo(() => {
    if (!name)
      return {
        text: '',
        color: 'default',
      };
    const isValid = validateName(name);

    return {
      text: isValid ? 'Valid name' : 'Enter a valid name',
      color: isValid ? 'success' : 'warning',
    };
  }, [name]);

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

  const helperPassConf: help = React.useMemo(() => {
    if (!passwordConf)
      return {
        text: '',
        color: 'default',
      };
    const isValidPass = validateMatch(passwordConf);

    return {
      text: isValidPass ? 'Passwords Match' : 'Passwords Not Matching',
      color: isValidPass ? 'success' : 'warning',
    };
  }, [passwordConf]);

  const signUpHandler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConf('');
  };

  let useremail: string;

  const notify = () =>
    toast.success(
      `${useremail} successfully signed up! Please, verify your email address.`,
      {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      }
    );

  const handleSignUp = async () => {
    if (password === passwordConf) {
      try {
        useremail = await fetchRegister({ name, email, password });
      } catch (error) {
        if (error instanceof Error) {
          const errors = [];
          errors.push(error.message.split(';'));

          for (let i = 0; i < errors.length; i++) {
            setErrorMessage(errors[0][i]);
          }
          setVisible(true);
          return;
        }
      }
      setErrorMessage('');
      //setToken(token);
      setVisible(false);
      notify();
    } else {
      setErrorMessage('Password does not match');
    }
  };

  return (
    <div>
      <Button
        style={{ fontSize: '1rem' }}
        auto
        color="gradient"
        shadow
        onPress={signUpHandler}
      >
        Sign Up
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="signup form"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="signup form" size={18}>
            Please sign up with your email address
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0.2} />
          <Input
            onChange={e => setName(e.target.value)}
            required
            bordered
            status={helperName.color}
            color={helperName.color}
            helperColor={helperName.color}
            helperText={helperName.text}
            fullWidth
            labelPlaceholder="Name"
            size="lg"
          />
          <Spacer y={1.5} />
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
          <Spacer y={1.5} />
          <Input.Password
            onChange={e => setPasswordConf(e.target.value)}
            labelPlaceholder="Confirm Password"
            width="350px"
            required
            bordered
            status={helperPassConf.color}
            color={helperPassConf.color}
            helperColor={helperPassConf.color}
            helperText={helperPassConf.text}
            type="password"
            size="lg"
          />
          <Spacer y={0.2} />
        </Modal.Body>
        <Text color="error">{errorMessage}</Text>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={handleSignUp} color="gradient">
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
