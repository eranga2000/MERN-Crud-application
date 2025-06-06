import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

 function UpdateOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing order by id to prefill the form
    axios.get(`http://localhost:3000/api/requests/${id}`)
      .then((res) => {
console.log("Fetched order:", res.data);  // 
setOrder(res.data)})
      .catch((err) => {
        console.error("Failed to load order:", err);
        console.log("Route param ID:${order.id}");

        alert("Failed to load order.${id}"+id);
      });
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(`http://localhost:3000/api/requests/${id}`, updatedData);
      alert("Order updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update the order.");
    }
  };

  return (
    <div>


      {order ? (
        <TaskForm initialData={order} onSubmit={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default UpdateOrder;