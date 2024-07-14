// Dashboard.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../pages/Dashboard";

jest.mock("@apollo/client", () => ({
  gql: jest.fn(), 
  useQuery: jest.fn(() => ({
    data: {
      episodes: {
        info: {
          count: 10, 
        },
      },
      characters: {
        info: {
          count: 20, 
        },
      },
    },
  })),
}));

describe("Dashboard Component", () => {
  test("renders Dashboard component", () => {
    render(<Dashboard />);
    expect(screen.getByText("Test JagaHQ")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter by name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Filter by episode")
    ).toBeInTheDocument();
  });

  test("filters data by name", () => {
    render(<Dashboard />);
    const filterNameInput = screen.getByPlaceholderText("Filter by name");
    fireEvent.change(filterNameInput, { target: { value: "Episode" } });
    expect(filterNameInput).toHaveValue("Episode");
  });

  test("filters data by episode", () => {
    render(<Dashboard />);
    const filterEpisodeInput = screen.getByPlaceholderText("Filter by episode");
    fireEvent.change(filterEpisodeInput, { target: { value: "1" } });
    expect(filterEpisodeInput).toHaveValue("1");
  });
});
