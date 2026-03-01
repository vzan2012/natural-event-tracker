import { Tooltip } from "@/components/ui/tooltip";
import { Button, CloseButton, Dialog, List, Portal } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import classes from "./MapModal.module.css";

import { EVENT_CATEGORY } from "@/utils/eventCategories";

const MapModal = ({ eventData }) => {
  const categoryName = eventData.categories[0].id;
  const iconName = EVENT_CATEGORY[categoryName].iconName;

  const colorName = EVENT_CATEGORY[categoryName].color;
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
      <Tooltip content={title}>
        <Dialog.Trigger asChild>
          <Button variant="link">
            <Icon
              icon={iconName}
              color={colorName}
              className={classes["map-location-icon"]}
              fontSize={"30px"}
            />
          </Button>
        </Dialog.Trigger>
      </Tooltip>
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
