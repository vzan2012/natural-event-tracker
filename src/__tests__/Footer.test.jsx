import Footer from "@/components/Layouts/Footer/Footer";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./testUtils";

describe("Footer Component", () => {
  let url = "https://github.com/vzan2012",
    username = "vzan2012";

  it("Render the Author Name and GitHub Link", () => {
    renderWithProviders(<Footer url={url} username={username} />);
    const link = screen.getByRole("link", { name: username });
    expect(link).toHaveAttribute("href", url);
    expect(screen.getByText(/Created by user/i)).toBeInTheDocument();
  });
});
