import { Box, SimpleGrid } from "@chakra-ui/react";
import classes from "./Maps.module.css";

import GoogleMapReact from "google-map-react";

const Maps = () => {
  const defaultMapProps = {
    zoom: 6,
    center: {
      lat: 10.99,
      lng: 77.01,
    },
  };
  return (
    <SimpleGrid className={classes["map-section"]}>
      <Box className={classes.maps}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          center={defaultMapProps.center}
          zoom={defaultMapProps.zoom}
        ></GoogleMapReact>
      </Box>
    </SimpleGrid>
  );
};

export default Maps;
