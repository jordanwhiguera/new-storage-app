"use client";
import React from "react";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  return <div>RegisterModal</div>;
};

export default RegisterModal;
