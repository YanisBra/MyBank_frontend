import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import DashboardPage from "../pages/DashboardPage";
import * as operationsService from "../services/operationsService";
import * as categoriesService from "../services/categoriesService";
import { MemoryRouter } from "react-router-dom";

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

vi.mock("../services/operationsService");
vi.mock("../services/categoriesService");

describe("DashboardPage", () => {
  beforeEach(() => {
    operationsService.fetchOperations.mockResolvedValue([
      {
        label: "Test Op",
        amount: 100,
      },
    ]);
    categoriesService.fetchCategories.mockResolvedValue([]);
  });

  test("displays operations and balance", async () => {
    renderWithRouter(<DashboardPage />);

    expect(await screen.findByText("Test Op")).toBeTruthy();
    const amountElements = screen.getAllByText(/100.00 €/);
    expect(amountElements.length).toBeGreaterThan(0);
  });

  test("opens create modal", async () => {
    renderWithRouter(<DashboardPage />);

    const openButtons = await screen.findAllByRole("button", {
      name: /Add Operation/i,
    });
    fireEvent.click(openButtons[0]);

    const dialog = await screen.findByRole("dialog");
    const modalTitle = within(dialog).getByText("Add Operation");
    expect(modalTitle).to.exist;
  });
  

  test("submits new operation", async () => {
    operationsService.createOperation.mockResolvedValue({});
    operationsService.fetchOperations.mockResolvedValueOnce([]); 

    renderWithRouter(<DashboardPage />);
    fireEvent.click(await screen.findByText("Add Operation"));

    fireEvent.change(screen.getByPlaceholderText(/Rent, Groceries/), {
      target: { name: "label", value: "Test Add" },
    });
    fireEvent.change(screen.getByPlaceholderText(/-50.00 or 120.00/), {
      target: { name: "amount", value: "99.99" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(operationsService.createOperation).toHaveBeenCalled();
    });
  });
});
