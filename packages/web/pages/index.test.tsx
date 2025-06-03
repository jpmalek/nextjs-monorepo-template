import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./index";
import { describe, it, expect, vi } from "vitest";

describe("Home Component", () => {
  it('should render the text "Hello from Web"', () => {
    render(<Home />);
    expect(screen.getByText("Hello from Web")).toBeInTheDocument();
  });

  it("should alert when clicked", () => {
    window.alert = vi.fn();
    render(<Home />);
    fireEvent.click(screen.getByText("Hello from Web"));
    expect(window.alert).toHaveBeenCalledWith("Hello from Web");
  });
});
