"use client";
import React from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm, SubmitHandler, set } from "react-hook-form";
import LocationSelect from "../inputs/LocationSelect";
import Map from "../Map";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cars } from "../Car";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  // INFO = 2,
  Images = 2,
  Car = 3,
  Proof = 4,
  Description = 5,
  Price = 6,
}
const RentModal = () => {
  const router = useRouter();
  const RentModal = useRentModal();
  const [step, setStep] = React.useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      locationValue: null,
      locationLat: null,
      locationLong: null,
      imageSrc: "",
      imageProof: "",
      carType: "",
      price: 1,
      deliveryPrice: 1,
      title: "",
      description: "",
    },
  });
  const category = watch("category");
  const carType = watch("carType");
  const locationValue = watch("locationValue");
  const imageSrc = watch("imageSrc");
  const imageProof = watch("imageProof");
  const locationLatValue = watch("locationLat");
  const locationLongValue = watch("locationLong");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const handleLatitudeChange = (lat: number | null) => {
    setValue("locationLat", lat);
  };

  const handleLongitudeChange = (lng: number | null) => {
    setValue("locationLong", lng);
  };
  const onBack = () => {
    setStep(step - 1);
  };
  const onNext = () => {
    setStep(step + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    if (step !== STEPS.Price) {
      return onNext();
    }
    setIsLoading(true);
    // Extract only the address part (label) from the location object
    const modifiedData = {
      ...data,
      locationValue: data.locationValue?.label,
      locationLat: data.locationLat,
      locationLong: data.locationLong,
    };
    axios
      .post("/api/listings", modifiedData)
      .then(() => {
        toast.success("Listing created");
        router.refresh();
        reset;
        setStep(STEPS.CATEGORY);
        RentModal.onClose();
      })
      .catch((err) => {
        toast.error("error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = React.useMemo(() => {
    if (step === STEPS.Price) {
      return "CREATE";
    }
    return "NEXT";
  }, [step]);
  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "BACK";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What type of space do you have?"
        subtitle="Select a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your space located?"
          subtitle="Enter a location"
        />
        <LocationSelect
          value={locationValue}
          onChange={(value) => setCustomValue("locationValue", value)}
          onLatitudeChange={handleLatitudeChange}
          onLongitudeChange={handleLongitudeChange}
        />

        <Map />
      </div>
    );
  }
  // if (step === STEPS.INFO) {
  //   bodyContent = (
  //     <div className="flex f;ex-col gap-8">
  //       <Heading
  //         title="What type of space do you have?"
  //         subtitle="Select a category"
  //       />
  //     </div>
  //   );
  // }

  if (step === STEPS.Images) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add images" subtitle="Upload images of your space" />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }
  if (step === STEPS.Car) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Do you have a car to offer delivery and pickup?"
          subtitle="Select an option"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {cars.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(carType) => setCustomValue("carType", carType)}
                selected={carType === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (step === STEPS.Proof) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Verify property ownership"
          subtitle="Upload proof that you own any property or veichles"
        />
        <ImageUpload
          value={imageProof}
          onChange={(value) => setCustomValue("imageProof", value)}
        />
      </div>
    );
  }
  if (step === STEPS.Description) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe your space"
          subtitle="Tell guests what you love about your space"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  if (step === STEPS.Price) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Price" subtitle="Set a price per day for your space" />

        <Input
          id="price"
          label=" Daily price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        {carType !== "No delivery / pickup" && (
          <>
            <hr />
            <Heading
              title=""
              subtitle="Set your price to deliver items and pickup items"
            />

            <Input
              id="deliveryPrice"
              label=" Delivery / pickup price"
              formatPrice
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </>
        )}
      </div>
    );
  }

  return (
    <Modal
      isOpen={RentModal.isOpen}
      onClose={RentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="List your space"
      body={bodyContent}
    />
  );
};

export default RentModal;
