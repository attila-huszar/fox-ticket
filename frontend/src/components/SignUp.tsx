import React, { useState } from 'react';
import { Modal, Input, Button, Text, Spacer } from '@nextui-org/react';
import { postRegister } from '../api/postRegister';
import { toast } from 'react-toastify';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateMatch,
} from '../helpers/inputFieldValidators';
import '../styles/inputFieldHelper.css';
import 'react-toastify/dist/ReactToastify.css';
import { InputField } from '../interfaces/user';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [shakeName, setShakeName] = useState(false);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const [shakePasswordConf, setShakePasswordConf] = useState(false);

  // Input field helpers
  const nameHelper: InputField = React.useMemo(() => {
    if (!name)
      return {
        text: '',
        color: 'default',
      };
    const isValid = validateName(name);

    return {
      text: isValid
        ? `Nice to meet you ${name}!`
        : 'Please only use common formats',
      color: isValid ? 'success' : 'warning',
    };
  }, [name]);

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

  const passConfHelper: InputField = React.useMemo(() => {
    if (!passwordConf)
      return {
        text: '',
        color: 'default',
      };

    const isValidPass = validatePassword(passwordConf);
    const isMatching = validateMatch(password, passwordConf);

    return {
      text: isMatching ? 'Passwords match' : 'Passwords not matching',
      color: isValidPass && isMatching ? 'success' : 'warning',
    };
  }, [password, passwordConf]);

  // Handlers
  const handleSignUp = async () => {
    if (name.length === 0) {
      setShakeName(true);
      nameHelper.color = 'error';
      nameHelper.text = 'Please fill this field';
    }
    if (email.length === 0) {
      setShakeEmail(true);
      emailHelper.color = 'error';
      emailHelper.text = 'Please fill this field';
    }
    if (password.length === 0) {
      setShakePassword(true);
      passHelper.color = 'error';
      passHelper.text = 'Please fill this field';
    }
    if (passwordConf.length === 0) {
      setShakePasswordConf(true);
      passConfHelper.color = 'error';
      passConfHelper.text = 'Please fill this field';
    }
    if (validateName(name) === false) {
      setShakeName(true);
      nameHelper.color = 'error';
    }
    if (validateEmail(email) === false) {
      setShakeEmail(true);
      emailHelper.color = 'error';
    }
    if (validatePassword(password) === false) {
      setShakePassword(true);
      passHelper.color = 'error';
    }
    if (validateMatch(password, passwordConf) === false) {
      setShakePasswordConf(true);
      passConfHelper.color = 'error';
    }

    setTimeout(() => setShakeName(false), 750);
    setTimeout(() => setShakeEmail(false), 750);
    setTimeout(() => setShakePassword(false), 750);
    setTimeout(() => setShakePasswordConf(false), 750);

    if (
      validateName(name) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateMatch(password, passwordConf)
    ) {
      try {
        await postRegister({ name, email, password });
        setModalVisible(false);
        notifySignUp();
      } catch (error: any) {
        if (error.message.includes('Account already exists')) {
          setShakeEmail(true);
          emailHelper.color = 'error';
          emailHelper.text = error.message.replace('Validation error: ', '');
          setTimeout(() => setShakeEmail(false), 750);
        }
      }
    }
  };

  const closeModalHandler = () => {
    setModalVisible(false);
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConf('');
  };

  // Notifications
  const notifySignUp = () =>
    toast.success(
      `${email} successfully signed up! Please, verify your email address!`
    );

  return (
    <div>
      <Button
        css={{
          fontSize: '1rem',
          '&:hover, &:focus': {
            boxShadow: '0 4px 14px 0 var(--nextui-colors-hoverShadow)',
          },
        }}
        auto
        color="gradient"
        shadow
        onPress={() => setModalVisible(true)}
      >
        Sign Up
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="signup form"
        open={modalVisible}
        onClose={closeModalHandler}
      >
        <Modal.Header>
          <Text id="signup form" size={18}>
            Please sign up with your email address
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
            className={shakeName ? 'shake' : ''}
            onChange={e => setName(e.target.value)}
            required
            bordered
            status={nameHelper.color}
            color={nameHelper.color}
            helperColor={nameHelper.color}
            helperText={nameHelper.text}
            labelPlaceholder="Name"
            fullWidth
            size="lg"
          />
          <Spacer y={1.5} />
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
          <Spacer y={1.5} />
          <Input.Password
            className={shakePasswordConf ? 'shake' : ''}
            onChange={e => setPasswordConf(e.target.value)}
            labelPlaceholder="Confirm Password"
            required
            bordered
            status={passConfHelper.color}
            color={passConfHelper.color}
            helperColor={passConfHelper.color}
            helperText={passConfHelper.text}
            type="password"
            fullWidth
            size="lg"
          />
          <Spacer y={0.2} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeModalHandler}>
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
