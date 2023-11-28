"use client";
import React from "react";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { error } from "console";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    axios
      .post("/api/register", data)
      .then((res) => {
        toast.success("Account created");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((err) => {
        toast.error("ooops");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const toggle = React.useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);
  // Add your form JSX here
  const bodyContent = (
    <div className="flex flex-col gap-4">
      {" "}
      <Heading title="welcome" subtitle="create an account to continue" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FaGoogle}
        onClick={() => signIn("google")}
      />
      <div className="justify-center flex flex-row items-center gap-2">
        <div>ALready have an account?</div>
        <div
          onClick={toggle}
          className="text-black cursor-pointer hover:underline"
        >
          Log in
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
