import { useEffect, useState } from 'react';

function ContextSignup() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [signupData, setSignupData] = useState({});

  const MIN_LENGTH_PASSWORD = 1;

  const emailCheck = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const passwordCheck = password.length >= MIN_LENGTH_PASSWORD;
  const confirmPasswordCheck = confirmPassword === password;

  useEffect(() => {
    setDisabled(!(emailCheck && passwordCheck && confirmPasswordCheck));
  }, [password, email, confirmPassword]);

  const contextSignupObject = {
    setEmail,
    email,
    setPassword,
    password,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    disabled,
    signupData,
    setSignupData,
  };

  return contextSignupObject;
}

export default ContextSignup;
