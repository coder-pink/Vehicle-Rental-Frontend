
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Divider,
} from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import api from "../utils/api";

function VehicleSelectionStep({ control, errors }) {
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const numberOfWheels = useWatch({ control, name: "numberOfWheels" });

  useEffect(() => {
    if (!numberOfWheels) return;

    const fetchVehicleTypes = async () => {
      try {
        const { data } = await api.get(`/vehicle-types?wheels=${numberOfWheels}`);
        // Remove duplicates just in case
        const uniqueTypes = Array.from(new Map(data.map(type => [type.id, type])).values());
        setVehicleTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
      }
    };

    fetchVehicleTypes();
  }, [numberOfWheels]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Number of Wheels */}
      <FormControl component="fieldset" error={!!errors.numberOfWheels}>
        <FormLabel component="legend">Number of Wheels</FormLabel>
        <Controller
          name="numberOfWheels"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" />
              <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" />
            </RadioGroup>
          )}
        />
        <FormHelperText>{errors.numberOfWheels?.message}</FormHelperText>
      </FormControl>

      <Divider />

      {/* Vehicle Type */}
      {vehicleTypes.length > 0 && (
        <FormControl component="fieldset" error={!!errors.vehicleType}>
          <FormLabel component="legend">Vehicle Type</FormLabel>
          <Controller
            name="vehicleType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RadioGroup {...field}>
                {vehicleTypes.map((type) => (
                  <FormControlLabel
                    key={type.id}
                    value={String(type.id)}
                    control={<Radio />}
                    label={type.name}
                  />
                ))}
              </RadioGroup>
            )}
          />
          <FormHelperText>{errors.vehicleType?.message}</FormHelperText>
        </FormControl>
      )}
    </Box>
  );
}

export default VehicleSelectionStep;
