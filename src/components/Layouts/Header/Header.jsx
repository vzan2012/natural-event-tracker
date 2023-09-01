import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import classes from "./Header.module.css";

const Header = ({ title }) => (
  <SimpleGrid w="100%" className={classes["header-section"]}>
    <Box>
      <Heading as="h1" size="md" textAlign="center">
        {title}
      </Heading>
    </Box>
  </SimpleGrid>
);

export default Header;
