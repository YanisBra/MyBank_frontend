
// import { useEffect, useState } from "react";
// import {
//   fetchCategories,
//   updateCategory,
//   deleteCategory,
//   createCategory,
// } from "../services/categoriesService";
// import { fetchOperations } from "../services/operationsService";
// import Navbar from "../components/Navbar";

// const CategoriesPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [operations, setOperations] = useState([]);
//   const [editingCategoryId, setEditingCategoryId] = useState(null);
//   const [newTitle, setNewTitle] = useState("");
//   const [newCategory, setNewCategory] = useState("");

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const cats = await fetchCategories();
//         const ops = await fetchOperations();
//         setCategories(cats);
//         setOperations(ops);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     loadData();
//   }, []);

//   const handleEdit = (category) => {
//     setEditingCategoryId(category.id);
//     setNewTitle(category.title);
//   };

//   const handleSave = async (id) => {
//     try {
//       await updateCategory(id, { title: newTitle });
//       const cats = await fetchCategories();
//       setCategories(cats);
//       setEditingCategoryId(null);
//       setNewTitle("");
//     } catch (error) {
//       console.error("Failed to update category:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteCategory(id);
//       setCategories(categories.filter((cat) => cat.id !== id));
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//     }
//   };

//   const getCategoryIdFromUrl = (url) => {
//     if (!url) return null;
//     const parts = url.split("/");
//     return Number(parts[parts.length - 1]);
//   };

//   // Regroupement des opérations par catégorie
//   const groupedCategories = categories.map((category) => ({
//     ...category,
//     operations: operations.filter(
//       (op) => getCategoryIdFromUrl(op.category) === category.id
//     ),
//   }));

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <h2 className="mb-4 text-center">Your Categories</h2>

//         <form
//           className="d-flex mb-4 justify-content-center"
//           onSubmit={async (e) => {
//             e.preventDefault();
//             if (!newCategory.trim()) return;
//             try {
//               await createCategory({ title: newCategory });
//               const cats = await fetchCategories();
//               setCategories(cats);
//               setNewCategory("");
//             } catch (error) {
//               console.error("Failed to create category:", error);
//             }
//           }}
//         >
//           <input
//             type="text"
//             className="form-control w-50 me-2"
//             placeholder="New category title"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//           />
//           <button type="submit" className="btn btn-primary">
//             Add
//           </button>
//         </form>

//         {groupedCategories.length === 0 ? (
//           <div className="alert alert-info text-center">No categories yet.</div>
//         ) : (
//           <ul className="list-group">
//             {groupedCategories.map((category) => (
//               <li
//                 key={category.id}
//                 className="list-group-item d-flex flex-column"
//               >
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   {editingCategoryId === category.id ? (
//                     <>
//                       <input
//                         type="text"
//                         value={newTitle}
//                         onChange={(e) => setNewTitle(e.target.value)}
//                         className="form-control me-2"
//                       />
//                       <button
//                         className="btn btn-success me-2"
//                         onClick={() => handleSave(category.id)}
//                       >
//                         Save
//                       </button>
//                       <button
//                         className="btn btn-secondary"
//                         onClick={() => setEditingCategoryId(null)}
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <span>{category.title}</span>
//                       <div>
//                         <button
//                           className="btn btn-sm btn-outline-primary me-2"
//                           onClick={() => handleEdit(category)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => handleDelete(category.id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 {/* Liste des opérations sous chaque catégorie */}
//                 {category.operations.length > 0 ? (
//                   <ul className="list-group">
//                     {category.operations.map((op) => (
//                       <li key={op.id} className="list-group-item">
//                         {op.label} — {op.amount}€ —{" "}
//                         {new Date(op.datetime).toLocaleDateString()}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-muted">No operations in this category</p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default CategoriesPage;

import { useEffect, useState } from "react";
import {
  fetchCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../services/categoriesService";
import { fetchOperations } from "../services/operationsService";
import Navbar from "../components/Navbar";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [operations, setOperations] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await fetchCategories();
        const ops = await fetchOperations();
        setCategories(cats);
        setOperations(ops);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const handleEdit = (category) => {
    setEditingCategoryId(category.id);
    setNewTitle(category.title);
  };

  const handleSave = async (id) => {
    try {
      await updateCategory(id, { title: newTitle });
      const cats = await fetchCategories();
      setCategories(cats);
      setEditingCategoryId(null);
      setNewTitle("");
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const getCategoryIdFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split("/");
    return Number(parts[parts.length - 1]);
  };

  const groupedCategories = categories.map((category) => ({
    ...category,
    operations: operations.filter(
      (op) => getCategoryIdFromUrl(op.category) === category.id
    ),
  }));

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Your Categories</h2>

        <form
          className="d-flex mb-4 justify-content-center"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!newCategory.trim()) return;
            try {
              await createCategory({ title: newCategory });
              const cats = await fetchCategories();
              setCategories(cats);
              setNewCategory("");
            } catch (error) {
              console.error("Failed to create category:", error);
            }
          }}
        >
          <input
            type="text"
            className="form-control w-50 me-2"
            placeholder="New category title"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>

        {groupedCategories.length === 0 ? (
          <div className="alert alert-info text-center fst-italic">
            No categories yet.
          </div>
        ) : (
          <div className="row g-4">
            {groupedCategories.map((category) => (
              <div key={category.id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      {editingCategoryId === category.id ? (
                        <>
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="form-control me-2"
                          />
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleSave(category.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setEditingCategoryId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <h5 className="card-title mb-0">{category.title}</h5>
                          <div>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEdit(category)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(category.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    <hr />

                    {category.operations.length > 0 ? (
                      <ul
                        className="list-group list-group-flush flex-grow-1 overflow-auto"
                        style={{ maxHeight: "200px" }}
                      >
                        {category.operations.map((op) => (
                          <li
                            key={op.id}
                            className="list-group-item d-flex justify-content-between align-items-center py-2"
                          >
                            <div>
                              <strong>{op.label}</strong>
                              <div className="text-muted small">
                                {new Date(op.datetime).toLocaleDateString()}
                              </div>
                            </div>
                            <span
                              className={`badge rounded-pill ${
                                op.amount < 0 ? "bg-danger" : "bg-primary"
                              }`}
                            >
                              {op.amount}€
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted fst-italic mb-0">
                        No operations in this category
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
