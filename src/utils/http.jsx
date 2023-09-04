export const fetchEventsData = async ({ fetchURL, controller }) => {
  const response = await fetch(fetchURL, {
    signal: controller,
  });

  if (!response.ok) {
    throw new Error("Something went wrong, please try again later !!!");
  }

  const { events } = await response.json();

  return events;
};
