import { useEffect, useState } from "react";
import { fetchOperations, createOperation, updateOperation, deleteOperation } from "../services/operationsService";
import Navbar from "../components/Navbar";

const OperationsPage = () => {
  const [operations, setOperations] = useState([]);
  const [newOperation, setNewOperation] = useState({
    label: "",
    amount: "",
    category: "",
  });
  const [editingOperationId, setEditingOperationId] = useState(null);
  const [editOperationData, setEditOperationData] = useState({
    label: "",
    amount: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOperation((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOperation = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newOperation,
        amount: parseFloat(newOperation.amount),
        category: `/api/categories/${newOperation.category}`,
      };
      await createOperation(payload);
      const updated = await fetchOperations();
      setOperations(updated);
      setNewOperation({ label: "", amount: "", category: "" });
    } catch (error) {
      console.error("Failed to create operation:", error);
    }
  };

  const startEditOperation = (operation) => {
    setEditingOperationId(operation.id);
    setEditOperationData({
      label: operation.label,
      amount: operation.amount,
      category: operation.category?.id || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditOperationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (id) => {
    try {
      const payload = {
        label: editOperationData.label,
        amount: parseFloat(editOperationData.amount),
        category: `/api/categories/${editOperationData.category}`,
      };
      await updateOperation(id, payload);
      const updated = await fetchOperations();
      setOperations(updated);
      setEditingOperationId(null);
    } catch (error) {
      console.error("Failed to update operation:", error);
    }
  };

  const handleDeleteOperation = async (id) => {
    try {
      await deleteOperation(id);
      const updated = await fetchOperations();
      setOperations(updated);
    } catch (error) {
      console.error("Failed to delete operation:", error);
    }
  };

  useEffect(() => {
    const loadOperations = async () => {
      try {
        const data = await fetchOperations();
        setOperations(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadOperations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Your Operations</h2>

        <form onSubmit={handleAddOperation} className="row g-2 mb-4">
          <div className="col-md-4">
            <input
              type="text"
              name="label"
              className="form-control"
              placeholder="Label"
              value={newOperation.label}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              step="0.01"
              name="amount"
              className="form-control"
              placeholder="Amount"
              value={newOperation.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category ID"
              value={newOperation.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Add</button>
          </div>
        </form>

        {operations.length === 0 ? (
          <div className="alert alert-info text-center">No operations yet.</div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Label</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {operations.map((operation) => (
                <tr key={operation.id}>
                  {editingOperationId === operation.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="label"
                          value={editOperationData.label}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="amount"
                          value={editOperationData.amount}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td>{new Date(operation.datetime).toLocaleDateString()}</td>
                      <td>
                        <input
                          type="text"
                          name="category"
                          value={editOperationData.category}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleSaveEdit(operation.id)}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingOperationId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{operation.label}</td>
                      <td>{operation.amount} €</td>
                      <td>{new Date(operation.datetime).toLocaleDateString()}</td>
                      <td>{operation.category}</td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => startEditOperation(operation)}>Edit</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteOperation(operation.id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default OperationsPage;
