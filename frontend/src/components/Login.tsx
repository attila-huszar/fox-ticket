import { useContext, useMemo, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Spacer,
} from '@nextui-org/react';
import { postLogin } from '@api/postLogin';
import { validateEmail, validatePassword } from '@utils/inputFieldValidators';
import { InputField, LoggedInUser } from '@interfaces/user';
import { toast } from 'react-toastify';
import { UserContext } from './App';
import { UserContextInterface } from '@interfaces/user';
import { EyeSlashFilledIcon } from '@assets/svg/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@assets/svg/EyeFilledIcon';

export default function Login() {
  const { user, setUser } = useContext<UserContextInterface>(UserContext);
  console.log(user);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);

  // Input field helpers
  const emailHelper: InputField = useMemo(() => {
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

  const passHelper: InputField = useMemo(() => {
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

  const loginHandler = async () => {
    if (!email) {
      setShakeEmail(true);
      emailHelper.color = 'danger';
      emailHelper.text = 'Please enter your email address';
    } else if (!validateEmail(email)) {
      setShakeEmail(true);
      emailHelper.color = 'danger';
    }
    if (!password) {
      setShakePassword(true);
      passHelper.color = 'danger';
      passHelper.text = 'Please enter your password';
    } else if (!validatePassword(password)) {
      setShakePassword(true);
      passHelper.color = 'danger';
    }
    setTimeout(() => setShakeEmail(false), 750);
    setTimeout(() => setShakePassword(false), 750);

    try {
      const response: LoggedInUser = (await postLogin({
        email,
        password,
      })) as LoggedInUser;

      if (response) {
        const verified = response.isVerified;
        if (verified) {
          localStorage.setItem('name', response.name);
          localStorage.setItem('email', response.email);
          localStorage.setItem('token', response.token);
          localStorage.setItem('admin', String(response.isAdmin));
          setUser!({
            name: response.name,
            email: response.email,
            token: response.token,
            isAdmin: response.isAdmin,
          });
          notifyLoggedIn();
        } else {
          notifyNotVerified();
        }
        onClose();
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        const errors = [];
        errors.push(error.message.split(';'));

        for (let i = 0; i < errors.length; i++) {
          setShakeEmail(true);
          setShakePassword(true);
          emailHelper.color = 'danger';
          passHelper.color = 'danger';
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

  // const closeModalHandler = () => {
  //   setLoginModalVisible(false);
  //   setEmail('');
  //   setPassword('');
  // };

  // Notifications
  const notifyLoggedIn = () =>
    toast.success(`Successful login. Welcome to Fox Ticket, ${user.name}!`);

  const notifyNotVerified = () =>
    toast.warn('Please verify your email address before logging in.');

  return (
    <>
      <Button
        className="hover:[box-shadow:0_4px_14px_0_var(--nextui-colors-hoverShadow)]"
        color="secondary"
        onPress={onOpen}>
        Login
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
        closeButton
        aria-labelledby="login form">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>Welcome to&nbsp; </p>
                <p>
                  <strong>Fox</strong>Ticket
                </p>
              </ModalHeader>
              <hr
                style={{
                  color: '#f2f2f2',
                  height: 5,
                }}
              />
              <ModalBody>
                <Spacer y={2} />
                <Input
                  className={shakeEmail ? 'shake' : ''}
                  onChange={e => setEmail(e.target.value)}
                  required
                  color={emailHelper.color}
                  errorMessage={emailHelper.text}
                  placeholder="Email"
                  fullWidth
                  size="lg"
                />
                <Spacer y={1.5} />
                <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={togglePassVisibility}>
                      {isPassVisible ? (
                        <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      ) : (
                        <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
                      )}
                    </button>
                  }
                  type={isPassVisible ? 'text' : 'password'}
                  className={shakePassword ? 'shake' : ''}
                  onChange={e => setPassword(e.target.value)}
                  required
                  color={passHelper.color}
                  errorMessage={passHelper.text}
                  fullWidth
                  size="lg"
                />
                <Spacer y={2} />
                <div className="justify-between">
                  <Checkbox color="secondary">
                    <p>Remember me</p>
                  </Checkbox>
                  <p>Forgot password?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={loginHandler}>
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
