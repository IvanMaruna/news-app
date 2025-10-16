import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { COLORS } from "../constants/colors";

interface MeasurementInputProps {
  id: string;
  label: string;
  subLabel: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  step?: string;
}

const MeasurementInput: React.FC<MeasurementInputProps> = ({
  id,
  label,
  subLabel,
  error,
  register,
  step,
}) => (
  <FormControl isInvalid={!!error}>
    <FormLabel htmlFor={id} fontWeight="bold" fontSize="16px">
      {label}
    </FormLabel>
    <FormHelperText fontWeight="normal" fontSize="14px" mb="12px">
      {subLabel}
    </FormHelperText>
    <Input
      id={id}
      type="number"
      step={step}
      bg={COLORS.lightPurple}
      borderRadius={0}
      {...register}
      focusBorderColor={COLORS.mediumGray}
    />
    <FormErrorMessage>{error?.message}</FormErrorMessage>
  </FormControl>
);

export default MeasurementInput;
