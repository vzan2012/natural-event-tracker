import { fetchEventsData } from "@/utils/http";
import { it } from "vitest";

describe("Fetch Events Data from API", () => {
  const fetchURL = "https://test.com/events";
  const controller = new AbortController().signal;
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Fetch Events Data successfully", async () => {
    const mockEvents = [
      {
        id: "EVENT_ID",
        title: "EVENT_TITLE",
      },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          events: mockEvents,
        }),
    });

    const resultData = await fetchEventsData({
      fetchURL,
      controller,
    });

    expect(resultData).toEqual(mockEvents);
  });

  it("Throw Error - when the response is not ok", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    });

    await expect(fetchEventsData({ fetchURL, controller })).rejects.toThrow(
      "Something went wrong, please try again later !!!",
    );
  });
});
