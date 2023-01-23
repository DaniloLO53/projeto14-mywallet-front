import { useState } from 'react';

function ContextSignup() {
  const initialUserInfos = {
    password: '',
    confirmPassword: '',
    contextEmail: '',
    name: '',
    signupData: '',
    userId: '',
  };
  const [userInfos, setUserInfos] = useState(initialUserInfos);

  const contextSignupObject = {
    userInfos,
    setUserInfos,
  };

  return contextSignupObject;
}

export default ContextSignup;
