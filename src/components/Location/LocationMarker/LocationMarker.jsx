import { Box } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const LocationMarker = ({ onClick }) => {

   const iconNameSet = {
    drought: "",
    dustHaze: "",
    earthquakes: "",
    floods: "",
    landslides: "",
    manmade: "",
    seaLakeIce: "", 
    severeStorms: "", 
    snow: "",
    tempExtremes: "", 
    volcanoes: "",
    waterColor: "",
    wildfires: ""
   }

  return <Box onClick={onClick}>
    <Icon icon={} /> 
  </Box>;
};

export default LocationMarker;
