import { useEffect, useState } from "react";
import api from "../services/api"; // 
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await api.get("/operations");
        const data = response.data;

        if (Array.isArray(data.member)) {
          setOperations(data.member);
        } else {
          console.error("Expected array in 'member', got:", data);
          setOperations([]);
        }
      } catch (error) {
        console.error("Failed to fetch operations:", error);
        setOperations([]);
      }
    };

    fetchOperations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Your Latest Operations</h2>

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
              {operations.map((op) => (
                <tr key={op.id}>
                  <td>{op.label}</td>
                  <td>{op.amount} €</td>
                  <td>{new Date(op.datetime).toLocaleDateString()}</td>
                  <td>{op.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
