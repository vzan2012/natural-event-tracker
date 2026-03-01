import {
  Box,
  ProgressCircle,
  SimpleGrid,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import classes from "./Maps.module.css";

import { useQuery } from "@tanstack/react-query";
import * as _ from "lodash";
import { Map, Overlay, ZoomControl } from "pigeon-maps";
import {
  lazy,
  Suspense,
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
import useSupercluster from "use-supercluster";
import { EVENT_CATEGORY } from "../../utils/eventCategories";
import { fetchEventsData } from "../../utils/http";

const MapModal = lazy(() => import("./MapModal/MapModal"));

const currentDate = new Date();
const DEFAULT_CENTER = [50.879, 4.6997];
const DEFAULT_ZOOM = 3;

/**
 * Get Dominant Category By Categories
 *
 * @param {*} categories
 * @returns {*}
 */
const getDominantCategory = (categories) => {
  let dominantCategory = "wildfires";
  let maxCount = 0;

  for (const category in categories) {
    if (categories[category] > maxCount) {
      maxCount = categories[category];
      dominantCategory = category;
    }
  }

  return EVENT_CATEGORY[dominantCategory].color;
};

/**
 * Format Events Data
 *
 * @param {*} eventsData
 * @returns {*}
 */
const formatEventsData = (eventsData) => {
  return _.chain(eventsData)
    .map((event) => ({
      ...event,
      geometry: event.geometry.filter(
        (todayEvent) =>
          currentDate.toISOString().split("T")[0] >=
          todayEvent.date.split("T")[0],
      ),
    }))
    .filter((event) => event.geometry.length !== 0)
    .map((event) => ({
      ...event,
      geometry: _.chain(event.geometry).last().value(),
    }))
    .value();
};

/**
 * SuperCluster Options
 *
 * @type {{ radius: number; maxZoom: number; map: ({ category }: { category: any; }) => { categories: { [x: number]: number; }; }; reduce: (accumlator: any, properties: any) => void; }}
 */
const SUPERCLUSTER_OPTIONS = {
  radius: 60,
  maxZoom: 16,
  map: ({ category }) => ({ categories: { [category]: 1 } }),
  reduce: (accumlator, properties) => {
    accumlator.categories = accumlator.categories || {};
    for (const category in properties.categories) {
      accumlator.categories[category] =
        (accumlator.categories[category] || 0) +
        properties.categories[category];
    }
  },
};

/**
 * Maps Component
 *
 * @param {{ sourceObject: any; }} data
 * @param {*} data.sourceObject
 * @returns {*}
 */
const Maps = ({ sourceObject }) => {
  let latestEvents, markers;
  const { fetchURL, controller } = sourceObject;
  const [navCenter, setNavCenter] = useState(null);
  const [navZoom, setNavZoom] = useState(null);

  const [clusterView, setClusterView] = useState({
    bounds: null,
    zoom: DEFAULT_ZOOM,
  });

  const deferredClusterView = useDeferredValue(clusterView);

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

  const runUpdatesRef = useRef(
    _.debounce((newZoom, newBounds) => {
      setClusterView({
        zoom: newZoom,
        bounds: [
          newBounds.sw[0],
          newBounds.sw[1],
          newBounds.ne[0],
          newBounds.ne[1],
        ],
      });
    }, 150),
  );

  const handleBoundsChange = useCallback(
    ({ zoom: newZoom, bounds: newBounds }) => {
      setNavCenter(null);
      setNavZoom(null);
      runUpdatesRef.current(newZoom, newBounds);
    },
    [],
  );

  latestEvents = useMemo(() => {
    if (isLoading || isError || !eventsData) return [];
    return formatEventsData(eventsData);
  }, [eventsData, isLoading, isError]);

  const points = useMemo(() => {
    return latestEvents.map((event) => ({
      type: "Feature",
      properties: {
        cluster: false,
        eventId: event.id,
        eventData: {
          ...event,
        },
        category: event.categories[0].id,
      },
      geometry: {
        type: "Point",
        coordinates: [
          event.geometry.coordinates[0],
          event.geometry.coordinates[1],
        ],
      },
    }));
  }, [latestEvents]);

  const superClusterBounds = useMemo(() => {
    if (!deferredClusterView.bounds) return null;
    const [southLat, westLong, northLat, eastLong] = deferredClusterView.bounds;
    return [westLong, southLat, eastLong, northLat];
  }, [deferredClusterView.bounds]);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: superClusterBounds,
    zoom: Math.round(deferredClusterView.zoom),
    options: SUPERCLUSTER_OPTIONS,
  });

  const mapOverlays = useMemo(() => {
    return clusters.map((cluster) => {
      const [longtitude, latitude] = cluster.geometry.coordinates;
      const {
        cluster: isCluster,
        point_count: pointCount,
        eventData,
        categories: clusterCategories,
      } = cluster.properties;

      const anchor = [latitude, longtitude];

      if (isCluster) {
        const dominantCategoryColor = getDominantCategory(clusterCategories);
        const dynamicClusterStyle = {
          backgroundColor: dominantCategoryColor,
        };

        return (
          <Overlay
            key={`cluster-${cluster.id}`}
            anchor={anchor}
            offset={[15, 15]}
          >
            <div
              className={classes["cluster-style"]}
              style={dynamicClusterStyle}
              onClick={() => {
                const expansionZoom = supercluster.getClusterExpansionZoom(
                  cluster.id,
                );
                setNavZoom(Math.min(expansionZoom, 20));
                setNavCenter(anchor);
              }}
            >
              {pointCount}
            </div>
          </Overlay>
        );
      }

      return (
        <Overlay key={`event-${eventData.id}`} anchor={anchor} offset={[0, 0]}>
          <Suspense fallback={<SkeletonCircle size="30px" />}>
            <MapModal eventData={eventData} />
          </Suspense>
        </Overlay>
      );
    });
  }, [clusters, supercluster]);

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
            {/* <CircularProgress isIndeterminate /> */}
            <ProgressCircle.Root value={null} size="sm">
              <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range />
              </ProgressCircle.Circle>
            </ProgressCircle.Root>
          </Box>
        ) : (
          <Map
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            animateMaxScreens={0}
            {...(navCenter !== null && { center: navCenter })}
            {...(navZoom !== null && { zoom: navZoom })}
            onBoundsChanged={handleBoundsChange}
          >
            <ZoomControl />
            {mapOverlays}
          </Map>
        )}
      </Box>
    </SimpleGrid>
  );
};

export default Maps;
