import React from "react";
import { TextField, Box, Typography } from "@mui/material";


function PersonalInfoStep({ register, errors }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h6" fontWeight={600}>
        Personal Information
      </Typography>

      <TextField
        label="First Name"
        fullWidth
        variant="outlined"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        label="Last Name"
        fullWidth
        variant="outlined"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
    </Box>
  );
}

export default PersonalInfoStep;
