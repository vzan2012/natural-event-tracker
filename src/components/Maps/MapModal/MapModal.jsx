import { Button, Portal, Dialog, CloseButton, List } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import classes from "./MapModal.module.css";

const MapModal = ({ eventData }) => {
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

  const formattedEventDate = new Date(eventDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Tooltip content={title}>
          <Button variant="link">
            <Icon
              icon={iconName}
              color={colorName}
              className={classes["map-location-icon"]}
              fontSize={"30px"}
            />
          </Button>
        </Tooltip>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <List.Root className={classes.customlist}>
                <List.Item>
                  <strong>Coordinates</strong> : [{coordinates[0].toFixed(2)},{" "}
                  {coordinates[1].toFixed(2)}]
                </List.Item>
                <List.Item>
                  <strong>Category Title</strong> : {categories[0].title}
                </List.Item>
                <List.Item>
                  <strong>Date</strong> : {formattedEventDate}
                </List.Item>
              </List.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button colorScheme="teal" size="sm">
                  Close
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default MapModal;
