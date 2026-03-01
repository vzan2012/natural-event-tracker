import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render } from "@testing-library/react";

const renderWithProviders = (ui) =>
  render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);

export { renderWithProviders };
