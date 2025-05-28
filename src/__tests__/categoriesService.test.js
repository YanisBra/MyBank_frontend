import MockAdapter from "axios-mock-adapter";
import api from "../services/api";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoriesService";

const mock = new MockAdapter(api);

describe("categoriesService", () => {
  afterEach(() => {
    mock.reset();
  });

  test("fetchCategories returns categories list", async () => {
    const mockData = {
      member: [{ id: 1, name: "Category 1" }],
    };
    mock.onGet("/categories").reply(200, mockData);

    const data = await fetchCategories();
    expect(data).toHaveLength(1);
    expect(data[0].name).toBe("Category 1");
  });

  test("createCategory sends correct data and returns created category", async () => {
    const newCategory = { name: "New Category" };
    mock
      .onPost("/categories", newCategory)
      .reply(201, { id: 2, ...newCategory });

    const response = await createCategory(newCategory);
    expect(response.name).toBe("New Category");
    expect(response.id).toBe(2);
  });

  test("updateCategory sends patch request and returns updated data", async () => {
    const updatedData = { name: "Updated Category" };
    mock.onPatch("/categories/1", updatedData).reply(200, updatedData);

    const response = await updateCategory(1, updatedData);
    expect(response.name).toBe("Updated Category");
  });

  test("deleteCategory sends delete request", async () => {
    mock.onDelete("/categories/1").reply(204);

    await expect(deleteCategory(1)).resolves.toBeUndefined();
  });
});
