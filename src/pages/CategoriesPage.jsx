import { useEffect, useState } from "react";
import { fetchCategories, updateCategory, deleteCategory, createCategory } from "../services/categoriesService";
import Navbar from "../components/Navbar";


const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  const handleEdit = (category) => {
    setEditingCategoryId(category.id);
    setNewTitle(category.title);
  };

  const handleSave = async (id) => {
    try {
      await updateCategory(id, { title: newTitle });
      const data = await fetchCategories();
      setCategories(data);
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
              const data = await fetchCategories();
              setCategories(data);
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
          <button type="submit" className="btn btn-primary">Add</button>
        </form>

        {categories.length === 0 ? (
          <div className="alert alert-info text-center">No categories yet.</div>
        ) : (
          <ul className="list-group">
            {categories.map((category) => (
              <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                {editingCategoryId === category.id ? (
                  <>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="form-control me-2"
                    />
                    <button className="btn btn-success me-2" onClick={() => handleSave(category.id)}>Save</button>
                    <button className="btn btn-secondary" onClick={() => setEditingCategoryId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{category.title}</span>
                    <div>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(category)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(category.id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
