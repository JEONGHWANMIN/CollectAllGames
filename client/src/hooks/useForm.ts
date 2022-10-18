import React, { useState } from "react";

interface ReturnsType<T> {
  formData: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLDivElement>) => void;
}

function useForm<T>(initialState: T): ReturnsType<T> {
  const [formData, setFormData] = useState(initialState);
  const [, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    setIsLoading(false);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
