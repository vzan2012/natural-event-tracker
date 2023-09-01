export const fetchEventsData = async ({ fetchURL, controller }) => {
  const response = await fetch(fetchURL, {
    signal: controller,
  });
  const { events } = await response.json();

  return events;
};
