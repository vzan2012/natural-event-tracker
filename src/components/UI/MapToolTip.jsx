import { Tooltip } from "@chakra-ui/react";

const MapToolTip = ({ children, ...props }) => {
  return <Tooltip {...props}>{children}</Tooltip>;
};

export default MapToolTip;
