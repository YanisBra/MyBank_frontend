import MockAdapter from "axios-mock-adapter";
import api from "../services/api";
import {
  fetchOperations,
  createOperation,
  updateOperation,
  deleteOperation,
} from "../services/operationsService";

const mock = new MockAdapter(api);

describe("operationsService", () => {
  afterEach(() => mock.reset());

  test("fetchOperations returns operations list", async () => {
    mock.onGet("/operations").reply(200, {
      member: [{ id: 1, label: "Test", amount: 100 }],
    });

    const data = await fetchOperations();
    expect(data).toHaveLength(1);
    expect(data[0].label).toBe("Test");
  });

  test("createOperation sends correct data", async () => {
    const payload = { label: "New", amount: 50 };
    mock.onPost("/operations").reply(201, payload);

    const response = await createOperation(payload);
    expect(response.label).toBe("New");
  });

  test("updateOperation sends patch request", async () => {
    const updatedData = { amount: 200 };
    mock.onPatch("/operations/1").reply(200, updatedData);

    const response = await updateOperation(1, updatedData);
    expect(response.amount).toBe(200);
  });

  test("deleteOperation sends delete request", async () => {
    mock.onDelete("/operations/1").reply(204);

    await expect(deleteOperation(1)).resolves.toBeUndefined();
  });
});
