import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

// Mock global atob untuk decode JWT payload di test
beforeAll(() => {
  global.atob = (input) => {
    if (input === "userPayload") {
      return JSON.stringify({ role: "user" });
    }
    if (input === "adminPayload") {
      return JSON.stringify({ role: "admin" });
    }
    return JSON.stringify({});
  };
});

// Bersihkan localStorage sebelum tiap test
beforeEach(() => {
  localStorage.clear();
});

test("renders Finenice brand name", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  const brand = screen.getByText(/Finenice/i);
  expect(brand).toBeInTheDocument();
});

test("shows Login and Register links when not logged in", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Register/i)).toBeInTheDocument();
});

test("shows Logout button when user is logged in", () => {
  localStorage.setItem("token", "header.userPayload.signature");
  localStorage.setItem("role", "user");

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});

test("shows Checkout and Transactions links for user role", () => {
  localStorage.setItem("token", "header.userPayload.signature");
  localStorage.setItem("role", "user");

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
  expect(screen.getByText(/Transactions/i)).toBeInTheDocument();
});

test("shows All Transactions link for admin role", () => {
  localStorage.setItem("token", "header.adminPayload.signature");
  localStorage.setItem("role", "admin");

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/All Transactions/i)).toBeInTheDocument();
});
