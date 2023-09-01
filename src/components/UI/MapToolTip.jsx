import { Tooltip } from "@chakra-ui/react";

const MapToolTip = ({ children, ...props }) => (
  <Tooltip {...props}>{children}</Tooltip>
);

export default MapToolTip;
