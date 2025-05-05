import api from "./api";

export const fetchOperations = async () => {
  const response = await api.get("/operations");
  return response.data.member;
};

export const createOperation = async (operationData) => {
  try {
    const response = await api.post("/operations", operationData, {
      headers: {
        "Content-Type": "application/ld+json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create operation:", error);
    throw error;
  }
};


export const updateOperation = async (id, updatedData) => {
  const response = await api.patch(`/operations/${id}`, updatedData, {
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
  });
  return response.data;
};

export const deleteOperation = async (id) => {
  await api.delete(`/operations/${id}`);
};