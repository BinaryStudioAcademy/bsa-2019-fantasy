import { useState } from 'react';
import validator from 'validator';

const useValidation = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordlValid] = useState<boolean>(true);

  const nameChanged = (name: string) => {
    setName(name);
    setIsNameValid(true);
  };

  const emailChanged = (email: string) => {
    setEmail(email);
    setIsEmailValid(true);
  };

  const passwordChanged = (password: string) => {
    setPassword(password);
    setIsPasswordlValid(true);
  };

  const validateEmail = () => {
    const isEmailValid = validator.isEmail(email);
    setIsEmailValid(isEmailValid);
    return isEmailValid;
  };

  const validatePassword = () => {
    const isPasswordValid = validator.isByteLength(password, { min: 8, max: undefined });
    setIsPasswordlValid(isPasswordValid);
    return isPasswordValid;
  };

  const validateName = () => {
    const isNameValid = validator.isByteLength(name, { min: 5, max: undefined });
    setIsNameValid(isNameValid);
    return isNameValid;
  };

  return {
    name,
    email,
    password,
    isNameValid,
    isEmailValid,
    isPasswordValid,
    nameChanged,
    emailChanged,
    passwordChanged,
    validateEmail,
    validatePassword,
    validateName,
  };
};

export default useValidation;
