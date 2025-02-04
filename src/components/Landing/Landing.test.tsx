import { render, screen } from "@testing-library/react";
import Landing from "./Landing";

describe("<Landing />", () => {

  beforeEach(() => {
    render(<Landing />);
  })
  
  it("displays title", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect.assertions(1);
  });

  it("displays logo", () => {
    expect(screen.getByAltText("Lithia & Driveway Logo")).toBeInTheDocument();
    expect.assertions(1);
  });

  it("displays blurb", () => {
    expect(screen.getByText(/^Lithia Motors wants to/)).toBeInTheDocument();
  });

  it("displays CTA", () => {
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });
});
