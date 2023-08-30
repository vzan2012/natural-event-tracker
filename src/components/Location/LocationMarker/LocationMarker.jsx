import { Box } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const LocationMarker = ({ category, onClick }) => {
  const iconNameSet = {
    drought: {
      name: "carbon:drought",
      color: "#333",
    },
    dustHaze: {
      name: "ri:haze-2-line",
      color: "#5D4037",
    },
    earthquakes: {
      name: "ri:earthquake-line",
      color: "#FF5252",
    },
    floods: {
      name: "ic:outline-flood",
      color: "#3f51b5",
    },
    landslides: {
      name: "mdi:landslide",
      color: "#212121",
    },
    manmade: {
      name: "game-icons:human-target",
      color: "#ff5722",
    },
    seaLakeIce: {
      name: "game-icons:frozen-orb",
      color: "#448aff",
    },
    severeStorms: {
      name: "wi:wu-chancetstorms",
      color: "#FF5722",
    },
    snow: {
      name: "wpf:snow",
      color: "#448aff",
    },
    tempExtremes: {
      name: "iconoir:temperature-high",
      color: "#E91E63",
    },
    volcanoes: {
      name: "fa6-solid:volcano",
      color: "#d32f2f",
    },
    waterColor: {
      name: "material-symbols:water-ph-outline",
      color: "#009688",
    },
    wildfires: {
      name: "mdi:fire-alert",
      color: "#FF5722",
    },
  };

  return (
    <Box onClick={onClick}>
      <Icon
        icon={iconNameSet[category].name}
        color={iconNameSet[category].color}
        className="map-location-icon"
      />
    </Box>
  );
};

export default LocationMarker;
