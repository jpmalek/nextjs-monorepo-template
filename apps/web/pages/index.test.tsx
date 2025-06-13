import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./index.page";
import { describe, it, expect, vi } from "vitest";

describe("Home Component", () => {
  it('should render the text "Hello from Web"', () => {
    render(<Home />);
    expect(screen.getByText("Hello from Web")).toBeInTheDocument();
  });
});
