import React, { useState } from "react";

interface ReturnsType<T, K> {
  formData: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: K;
}

interface FormType {
  email: string;
  password: string;
  passwordConfirm?: string;
  username?: string;
}

interface validateType {
  emailValidate: (email: string) => boolean;
  passwordValidate: (password: string) => boolean;
  passwordConfirmValidate: (password: string, passwordConfirm: string) => boolean;
  userNameValidate: (username: string) => boolean;
}

function useForm<T extends FormType, V extends validateType, K>(
  initialState: T,
  submitCallback: (formData: T) => void,
  validation?: V
): ReturnsType<T, K> {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({} as K);
  const [, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "email") {
      setErrors({
        ...errors,
        email: validation?.emailValidate(e.target.value),
      });
    }

    if (e.target.name === "password") {
      setErrors({
        ...errors,
        password: validation?.passwordValidate(e.target.value),
      });
    }

    if (e.target.name === "passwordConfirm") {
      setErrors({
        ...errors,
        passwordConfirm: validation?.passwordConfirmValidate(formData.password, e.target.value),
      });
    }

    if (e.target.name === "username") {
      setErrors({
        ...errors,
        username: validation?.userNameValidate(e.target.value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    submitCallback(formData);
    setIsLoading(false);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
  };
}

export default useForm;
