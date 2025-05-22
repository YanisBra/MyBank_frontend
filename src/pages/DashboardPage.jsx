
// import { useEffect, useState } from "react";
// import {
//   fetchOperations,
//   createOperation,
//   updateOperation,
//   deleteOperation,
// } from "../services/operationsService";
// import { fetchCategories } from "../services/categoriesService";
// import Navbar from "../components/Navbar";
// import { Modal, Button, Form } from "react-bootstrap";

// const DashboardPage = () => {
//   const [operations, setOperations] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("create");
//   const [selectedOperation, setSelectedOperation] = useState(null);
//   const [formData, setFormData] = useState({
//     label: "",
//     amount: "",
//     category: "",
//   });
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const ops = await fetchOperations();
//         setOperations(ops);
//         setBalance(ops.reduce((sum, op) => sum + op.amount, 0));

//         const cats = await fetchCategories();
//         setCategories(cats);
//       } catch (error) {
//         console.error("Error loading data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOpenCreateModal = () => {
//     setModalType("create");
//     setFormData({ label: "", amount: "", category: "" });
//     setShowModal(true);
//   };

//   const handleOpenEditModal = (operation) => {
//     setModalType("edit");
//     setSelectedOperation(operation);
//     setFormData({
//       label: operation.label,
//       amount: operation.amount,
//       category: operation.category?.id || "",
//     });
//     setShowModal(true);
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       label: formData.label,
//       amount: parseFloat(formData.amount),
//       category: formData.category
//         ? `/api/categories/${formData.category}`
//         : null,
//     };

//     try {
//       if (modalType === "create") {
//         await createOperation(payload);
//       } else if (modalType === "edit" && selectedOperation) {
//         await updateOperation(selectedOperation.id, payload);
//       }

//       const updatedOps = await fetchOperations();
//       setOperations(updatedOps);
//       setBalance(updatedOps.reduce((sum, op) => sum + op.amount, 0));
//       setShowModal(false);
//     } catch (error) {
//       console.error("Operation failed", error);
//     }
//   };

//   const handleDelete = async (operationId) => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete this operation?"
//     );
//     if (!confirm) return;

//     try {
//       await deleteOperation(operationId);
//       const updatedOps = await fetchOperations();
//       setOperations(updatedOps);
//       setBalance(updatedOps.reduce((sum, op) => sum + op.amount, 0));
//     } catch (error) {
//       console.error("Failed to delete operation", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <h2 className="mb-4 text-center">Your Latest Operations</h2>

//         <div className="text-center mb-4">
//           <h3>
//             Balance:{" "}
//             <span className={balance >= 0 ? "text-success" : "text-danger"}>
//               {balance.toFixed(2)} €
//             </span>
//           </h3>
//           <Button variant="primary" onClick={handleOpenCreateModal}>
//             Add Operation
//           </Button>
//         </div>

//         {operations.length === 0 ? (
//           <div className="alert alert-info text-center">No operations yet.</div>
//         ) : (
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Label</th>
//                 <th>Amount</th>
//                 <th>Date</th>
//                 {/* <th>Category</th> */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {operations.map((op) => (
//                 <tr key={op.id}>
//                   <td>{op.label}</td>
//                   <td>{op.amount} €</td>
//                   <td>{new Date(op.datetime).toLocaleDateString()}</td>
//                   {/* <td>{op.category || "N/A"}</td> */}
//                   <td>
//                     <Button
//                       variant="outline-primary"
//                       size="sm"
//                       onClick={() => handleOpenEditModal(op)}
//                       className="me-2"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="outline-danger"
//                       size="sm"
//                       onClick={() => handleDelete(op.id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {modalType === "create" ? "Add Operation" : "Edit Operation"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Label</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="label"
//                 value={formData.label}
//                 onChange={handleFormChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 step="0.01"
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleFormChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Category (optional)</Form.Label>
//               <Form.Select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleFormChange}
//               >
//                 <option value="">No category</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.title}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             {modalType === "create" ? "Add" : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default DashboardPage;

import { useEffect, useState } from "react";
import {
  fetchOperations,
  createOperation,
  updateOperation,
  deleteOperation,
} from "../services/operationsService";
import { fetchCategories } from "../services/categoriesService";
import Navbar from "../components/Navbar";
import { Modal, Button, Form, Badge } from "react-bootstrap";

const DashboardPage = () => {
  const [operations, setOperations] = useState([]);
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    amount: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ops = await fetchOperations();
        setOperations(ops);
        setBalance(ops.reduce((sum, op) => sum + op.amount, 0));

        const cats = await fetchCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenCreateModal = () => {
    setModalType("create");
    setFormData({ label: "", amount: "", category: "" });
    setSelectedOperation(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (operation) => {
    setModalType("edit");
    setSelectedOperation(operation);
    setFormData({
      label: operation.label,
      amount: operation.amount,
      category: operation.category?.id || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    const payload = {
      label: formData.label,
      amount: parseFloat(formData.amount),
      category: formData.category
        ? `/api/categories/${formData.category}`
        : null,
    };

    try {
      if (modalType === "create") {
        await createOperation(payload);
      } else if (modalType === "edit" && selectedOperation) {
        await updateOperation(selectedOperation.id, payload);
      }

      const updatedOps = await fetchOperations();
      setOperations(updatedOps);
      setBalance(updatedOps.reduce((sum, op) => sum + op.amount, 0));
      setShowModal(false);
    } catch (error) {
      console.error("Operation failed", error);
    }
  };

  const handleDelete = async (operationId) => {
    if (!window.confirm("Are you sure you want to delete this operation?"))
      return;

    try {
      await deleteOperation(operationId);
      const updatedOps = await fetchOperations();
      setOperations(updatedOps);
      setBalance(updatedOps.reduce((sum, op) => sum + op.amount, 0));
    } catch (error) {
      console.error("Failed to delete operation", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Your Latest Operations</h2>

        <div className="text-center mb-4">
          <h3>
            Balance:{" "}
            <span className={balance >= 0 ? "text-success" : "text-danger"}>
              {balance.toFixed(2)} €
            </span>
          </h3>
          <Button variant="primary" onClick={handleOpenCreateModal}>
            Add Operation
          </Button>
        </div>

        {operations.length === 0 ? (
          <div className="alert alert-info text-center">No operations yet.</div>
        ) : (
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Label</th>
                <th>Amount</th>
                {/* <th>Category</th> */}
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {operations.map((op) => (
                <tr key={op.id}>
                  <td>{op.label}</td>
                  <td
                    className={op.amount < 0 ? "text-danger" : "text-success"}
                  >
                    {op.amount.toFixed(2)} €
                  </td>
                  {/* <td>
                    {op.category ? (
                      <Badge bg="secondary">{op.category.title}</Badge>
                    ) : (
                      <span className="text-muted">None</span>
                    )}
                  </td> */}
                  <td>{new Date(op.datetime).toLocaleDateString("fr-FR")}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenEditModal(op)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(op.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "create" ? "Add Operation" : "Edit Operation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                name="label"
                value={formData.label}
                onChange={handleFormChange}
                placeholder="e.g. Rent, Groceries..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleFormChange}
                placeholder="e.g. -50.00 or 120.00"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category (optional)</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button variant="outline-primary" onClick={handleSubmit}>
            {modalType === "create" ? "Add" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardPage;
