import React from "react";
import { TextField , Box} from "@mui/material";
import { Controller } from "react-hook-form";

function DateSelectionStep({ register, errors }) {
  return (
    <div>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        label="Start Date"
        fullWidth
        type="date"
        {...register("startDate")}
        error={!!errors.startDate}
        helperText={errors.startDate?.message}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        fullWidth
        type="date"
        {...register("endDate")}
        error={!!errors.endDate}
        helperText={errors.endDate?.message}
        InputLabelProps={{ shrink: true }}
      />
      </Box>
    </div>
  );
}

export default DateSelectionStep;
