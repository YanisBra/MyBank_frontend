import api from "./api";

export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data.member;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("/categories", categoryData, {
      headers: {
        "Content-Type": "application/ld+json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create category:", error);
    throw error;
  }
};

export const updateCategory = async (id, updatedData) => {
  try {
    const response = await api.patch(`/categories/${id}`, updatedData, {
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update category with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {
    console.error(`Failed to delete category with ID ${id}:`, error);
    throw error;
  }
};
