import React from "react";
import { Container } from "@chakra-ui/react";
import MeasurementForm from "./pages/MeasurementForm";

const App: React.FC = () => (
  <Container maxW="lg" py={10}>
    <MeasurementForm />
  </Container>
);

export default App;
