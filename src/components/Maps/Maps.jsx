import {
  Box,
  CircularProgress,
  SimpleGrid,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import classes from "./Maps.module.css";

import { useQuery } from "@tanstack/react-query";
import * as _ from "lodash";
import { Map, Overlay, ZoomControl } from "pigeon-maps";
import { lazy, Suspense } from "react";
import { fetchEventsData } from "../../utils/http";

const MapModal = lazy(() => import("./MapModal/MapModal"));

const currentDate = new Date();

const formatEventsData = (eventsData) => {
  return _.chain(eventsData)
    .map((event) => ({
      ...event,
      geometry: event.geometry.filter(
        (todayEvent) =>
          currentDate.toISOString().split("T")[0] >=
          todayEvent.date.split("T")[0]
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

  if (!isLoading) {
    latestEvents = formatEventsData(eventsData);
  }

  if (latestEvents) {
    markers = latestEvents.map((event, index) => {
      const coordinates = [
        event.geometry.coordinates[1],
        event.geometry.coordinates[0],
      ];

      return (
        <Overlay key={index} anchor={[...coordinates]} offset={[0, 0]}>
          <Suspense fallback={<SkeletonCircle size="30px" />}>
            <MapModal eventData={event} />
          </Suspense>
        </Overlay>
      );
    });
  }

  return (
    <SimpleGrid className={classes["map-section"]}>
      {/* Show Error Block  */}
      {isError && (
        <Box className={classes.messagesBox}>
          <Text color="red" textAlign="center">
            {error.message}
          </Text>
        </Box>
      )}
      {/* Maps Block */}
      <Box className={classes.maps}>
        {isLoading ? (
          <Box className={classes.mapsloader}>
            <CircularProgress isIndeterminate />
          </Box>
        ) : (
          <Map defaultCenter={[50.879, 4.6997]} defaultZoom={3}>
            <ZoomControl />
            {markers}
          </Map>
        )}
      </Box>
    </SimpleGrid>
  );
};

export default Maps;
