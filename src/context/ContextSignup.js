import { useEffect, useState } from 'react';

function ContextSignup() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contextEmail, setContextEmail] = useState('');
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [register, setRegister] = useState(null);
  const [userId, setUserId] = useState('');
  const [signupData, setSignupData] = useState({});

  const MIN_LENGTH_PASSWORD = 1;

  const emailCheck = contextEmail.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const passwordCheck = password.length >= MIN_LENGTH_PASSWORD;
  const confirmPasswordCheck = confirmPassword === password;

  useEffect(() => {
    setDisabled(!(emailCheck && passwordCheck && confirmPasswordCheck));
  }, [password, contextEmail, confirmPassword]);

  const contextSignupObject = {
    setContextEmail,
    contextEmail,
    setPassword,
    password,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    disabled,
    register,
    setRegister,
    signupData,
    setSignupData,
    userId,
    setUserId,
  };

  return contextSignupObject;
}

export default ContextSignup;
