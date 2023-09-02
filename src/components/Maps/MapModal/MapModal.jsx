import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

import { Icon } from "@iconify/react";
import classes from "./MapModal.module.css";

const MapModal = ({ eventData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const categoryName = eventData.categories[0].id;
  const iconName = iconNameSet[categoryName].name;

  const colorName = iconNameSet[categoryName].color;
  const {
    title,
    geometry: { date: eventDate, coordinates },
    categories,
  } = eventData;

  return (
    <>
      <Button variant="link" onClick={onOpen}>
        <Icon
          icon={iconName}
          color={colorName}
          className={classes["map-location-icon"]}
          fontSize={"30px"}
        />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            <strong>{title}</strong>
          </ModalHeader>
          <ModalBody>
            <UnorderedList className={classes.customlist}>
              <ListItem>
                <strong>Coordinates</strong> : [{coordinates[0]},{" "}
                {coordinates[1]}]
              </ListItem>
              <ListItem>
                <strong>Category Title</strong> : {categories[0].title}
              </ListItem>
              <ListItem>
                <strong>Date</strong> : {eventDate.toString().split("T")[0]}
              </ListItem>
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" size="sm" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MapModal;
