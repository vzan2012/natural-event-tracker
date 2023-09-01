import { Box, Link, SimpleGrid } from "@chakra-ui/react";
import classes from "./Footer.module.css";

const Footer = ({ url, username }) => (
  <SimpleGrid w="100%" className={classes["footer-section"]} textAlign="center">
    <Box>
      <span>
        Created by user -{" "}
        <Link href={url} isExternal>
          {username}
        </Link>
      </span>
    </Box>
  </SimpleGrid>
);

export default Footer;
