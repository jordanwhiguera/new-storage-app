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
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  const toggle = React.useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  // Add your form JSX here
  const bodyContent = (
    <div className="flex flex-col gap-4">
      {" "}
      <Heading title="Welcome" subtitle="Log in to your account" />
      {/* <Input
        id="email"
        label="Email"
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
      /> */}
      <div className="mt-3">
        <Button
          label="Continue with Google"
          icon={FaGoogle}
          onClick={() => signIn("google")}
        />
      </div>
    </div>
  );

  // const footerContent = (
  //   <div className="flex flex-col gap-4 mt-3">
  //     <hr />
  //     <Button
  //       outline
  //       label="Continue with Google"
  //       icon={FaGoogle}
  //       onClick={() => signIn("google")}
  //     />
  //     <div className="justify-center flex flex-row items-center gap-2">
  //       <div>new?</div>
  //       <div
  //         onClick={toggle}
  //         className="text-black cursor-pointer hover:underline"
  //       >
  //         create account
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      // actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default LoginModal;
