
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, date, number } from "yup";
import PersonalInfoStep from "./PersonalInfoStep";
import VehicleSelectionStep from "./VehicleSelectionStep";
import DateSelectionStep from "./DateSelectionStep";
import api from "../utils/api";


const schema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),

  numberOfWheels: number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(originalValue)
    )
    .typeError("Number of wheels must be a number")
    .required("Number of wheels is required"),

  vehicleType: string().required("Vehicle type is required"),

  startDate: date()
    .transform((value, originalValue) => new Date(originalValue))
    .typeError("Start date is invalid")
    .required("Start date is required"),

  endDate: date()
    .transform((value, originalValue) => new Date(originalValue))
    .typeError("End date is invalid")
    .required("End date is required"),
});

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  // const onSubmit = async (data) => {
  //   try {
  //     await api.post("/booking", {
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       vehicleTypeId: data.vehicleType, // changed from vehicleModel to vehicleType
  //       // startDate: data.startDate,
  //       // endDate: data.endDate,
  //       start_date: new Date(data.startDate).toISOString(),
  //     end_date: new Date(data.endDate).toISOString(),
  //     });
  //     navigate("/thank-you");
  //   } catch (error) {
  //     console.error("Error submitting booking:", error);
  //   }
  // };



const onSubmit = async (data) => {
  // Simulate user_id (e.g., if guest)
  const user_id = Math.floor(new Date().getTime() / 1000);
  
  const vehicle_id = parseInt(data.vehicleType, 10); 

  if (isNaN(vehicle_id)) {
    console.error("Invalid vehicle ID");
    return;
  }


  try {
    await api.post("/booking", {
      user_id: user_id,  // Send simulated user ID for now
      vehicle_id: vehicle_id,  // Send selected vehicle ID
      start_date: new Date(data.startDate).toISOString(),
      end_date: new Date(data.endDate).toISOString(),
    });
    navigate("/thank-you");
  } catch (error) {
    console.error("Error submitting booking:", error);
  }
};


  const nextStep = async () => {
    let valid = false;

    // ✅ Removed vehicleModel validation
    if (currentStep === 1) {
      valid = await trigger(["firstName", "lastName"]);
    } else if (currentStep === 2) {
      valid = await trigger(["numberOfWheels", "vehicleType"]);
    } else if (currentStep === 3) {
      valid = await trigger(["startDate", "endDate"]);
    }

    if (valid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="container mx-auto p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {currentStep === 1 && (
          <PersonalInfoStep register={register} errors={errors} />
        )}

        {currentStep === 2 && (
          <VehicleSelectionStep control={control} errors={errors} setValue={setValue} />
        )}

        {currentStep === 3 && (
          <DateSelectionStep register={register} errors={errors} />
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button variant="outlined" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < 3 && (
            <Button variant="contained" onClick={nextStep}>
              Next
            </Button>
          )}
          {currentStep === 3 && (
            <Button variant="contained" type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MultiStepForm;






