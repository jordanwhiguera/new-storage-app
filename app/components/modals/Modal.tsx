"use client";
import React, { useCallback } from "react";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = React.useState(isOpen);
  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  const handleOnClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);
  if (!isOpen) {
    return null;
  }

  return (
    // layer 1
    <div>
      {/* layer 2 */}
      <div className=" items-center flex justify-center overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        {/* layer 3 */}
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto">
          {/* Content layer 1*/}
          <div
            className={`
          translate 
          duration-300
           h-full 
           ${showModal ? "translate-y-0" : "translate-y-full"}
           ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            {/* content  layer 2 */}
            <div className="translate h-full md:h-auto lg:h-auto border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* header layer 1*/}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                {/* button layer 1 */}
                <button
                  onClick={handleOnClose}
                  className="p-1 border-0 hover:opacity-70 translation absolute left-9"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {/* same level */}
                <div className="text-lg">{title}</div>
              </div>
              {/* body */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className=" flex flex-row itemms-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                  <div
                    className="text-neutral-500
                  text-center
                  mt-4
                  font-light"
                  ></div>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
