import Header from "@/components/Layouts/Header/Header";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./testUtils";

describe("Header Component", () => {
  let headerTitle = "Natural Event Tracker";

  it("Render the Header component with the title", () => {
    renderWithProviders(<Header title={headerTitle} />);
    expect(screen.getByText(headerTitle)).toBeInTheDocument();
  });
});
