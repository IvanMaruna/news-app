import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { COLORS } from "../constants/colors";

interface CustomButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const FormButton: React.FC<CustomButtonProps> = ({
  variant = "primary",
  children,
  ...rest
}) => {
  const variantStyles = {
    primary: {
      bg: COLORS.mediumPurple,
      color: COLORS.white,
      _hover: { bg: COLORS.mediumPurpleHover },
    },
    secondary: {
      bg: COLORS.lightPurple,
      _hover: { bg: COLORS.lightPurpleHover },
    },
  };

  return (
    <Button
      height="40px"
      borderRadius="40px"
      fontSize="16px"
      fontWeight="400"
      lineHeight="24px"
      {...variantStyles[variant]}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FormButton;
