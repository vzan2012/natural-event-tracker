import { Box, SimpleGrid } from "@chakra-ui/react";
import classes from "./Maps.module.css";

import LocationMarker from "../Location/LocationMarker/LocationMarker";

import { fetchEventsData } from "../../utils/http";
import { useQuery } from "@tanstack/react-query";
import * as _ from "lodash";
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps";
import { Icon } from "@iconify/react";

const currentDate = new Date();

const formatEventsData = (eventsData) => {
  return _.chain(eventsData)
    .map((event) => ({
      ...event,
      geometry: event.geometry.filter(
        (todayEvent) =>
          todayEvent.date.split("T")[0] ===
          currentDate.toISOString().split("T")[0]
      ),
    }))
    .filter((event) => event.geometry.length !== 0)
    .map((event) => ({
      ...event,
      geometry: _.chain(event.geometry).last().value(),
    }))
    .value();
};

const Maps = ({ sourceObject }) => {
  let latestEvents, markers;
  const { fetchURL, controller } = sourceObject;
  const {
    data: eventsData,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      fetchEventsData({
        fetchURL: `${fetchURL}/events`,
        controller,
      }),
  });

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

  console.log("DATA - S");

  if (!isLoading) {
    latestEvents = formatEventsData(eventsData);
    console.log(latestEvents);
  }

  if (latestEvents) {
    markers = latestEvents.map((event, index) => {
      console.log(event.geometry.coordinates[1]);
      console.log(event.geometry.coordinates[0]);
      console.log(event.categories[0].id);
      return (
        <Overlay
          key={index}
          anchor={[
            event.geometry.coordinates[1],
            event.geometry.coordinates[0],
          ]}
          offset={[0, 0]}
        >
          <Icon
            icon={iconNameSet[event.categories[0].id].name}
            color={iconNameSet[event.categories[0].id].color}
            className="map-location-icon"
            fontSize={"30px"}
          />
        </Overlay>
      );
    });
  }
  console.log(markers);
  console.log("DATA - E");

  return (
    <SimpleGrid className={classes["map-section"]}>
      <Box className={classes.maps}>
        <Map defaultCenter={[50.879, 4.6997]} defaultZoom={3}>
          <ZoomControl />
          {markers}
        </Map>
      </Box>
    </SimpleGrid>
  );
};

export default Maps;
