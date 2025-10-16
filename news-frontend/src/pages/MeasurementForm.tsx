import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { calculateNews } from "../libs/api";
import { Measurement, FormValues } from "../types/newsTypes";
import MeasurementInput from "../components/MeasurementInput";
import { COLORS } from "../constants/colors";
import FormButton from "../components/FormButton";

const MeasurementForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const [score, setScore] = useState<number | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setScore(null);
    try {
      const measurements: Measurement[] = [
        { type: "TEMP", value: values.temp },
        { type: "HR", value: values.hr },
        { type: "RR", value: values.rr },
      ];

      const data = await calculateNews({ measurements });
      if (Object.keys(data.errors).length > 0) {
        Object.entries(data.errors).forEach(([field, message]) => {
          setError(field as keyof FormValues, { message });
        });
        setServerError("Please correct the highlighted errors.");
      }
      setScore(data.score);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred";
      setServerError(message);
    }
  };

  const onReset = () => {
    reset();
    setScore(null);
    setServerError(null);
  };

  return (
    <Card variant="outline" maxW="404px" w="100%" border="none">
      <Heading mb={6} size="lg">
        NEWS score calculator
      </Heading>
      <CardBody padding={0}>
        <VStack
          as="form"
          align="stretch"
          spacing="40px"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <MeasurementInput
            id="temp"
            label="Body Temperature"
            subLabel="Degrees Celsius"
            error={errors.temp}
            step="0.1"
            register={register("temp", {
              required: "Temperature is required",
              valueAsNumber: true,
            })}
          />

          <MeasurementInput
            id="hr"
            label="Heart Rate"
            subLabel="Beats per minute"
            error={errors.hr}
            register={register("hr", {
              required: "Heart rate is required",
              valueAsNumber: true,
            })}
          />

          <MeasurementInput
            id="rr"
            label="Respiratory Rate"
            subLabel="Breaths per minute"
            error={errors.rr}
            register={register("rr", {
              required: "Respiratory rate is required",
              valueAsNumber: true,
            })}
          />

          <HStack spacing="12px">
            <FormButton
              type="submit"
              variant="primary"
              isDisabled={isSubmitting}
            >
              {isSubmitting ? "Calculating..." : "Calculate NEWS score"}
            </FormButton>

            <FormButton
              variant="secondary"
              onClick={onReset}
              isDisabled={isSubmitting}
            >
              Reset form
            </FormButton>
          </HStack>

          {serverError && (
            <Box>
              <Text fontSize="sm" color={COLORS.red} data-testid="server-error">
                {serverError}
              </Text>
            </Box>
          )}

          {score !== null && !serverError && (
            <Box
              padding="16px"
              bg={COLORS.lightPurple}
              borderRadius="10px"
              borderWidth="1px"
              borderColor={COLORS.mediumPurple}
              role="status"
              aria-live="polite"
            >
              <Text fontSize="20px" data-testid="news-score">
                News score:
                <Text as="span" fontWeight="bold" ml="5px">
                  {score}
                </Text>
              </Text>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default MeasurementForm;
