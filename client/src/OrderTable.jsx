import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const priorityColors = {
  Standard: "text-gray-600",
  Priority: "text-yellow-600",
  Urgent: "text-red-600",
};

export default function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/requests");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/requests/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete the order.");
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">ORDER ID</th>
            <th className="px-4 py-2">ITEM NAME</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">AMOUNT</th>
            <th className="px-4 py-2">PRIORITY</th>
            <th className="px-4 py-2">PROJECT NAME</th>
            <th className="px-4 py-2">DATE</th>
            <th className="px-4 py-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order._id || idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{order._id?.slice(-6)}</td>
              <td className="px-4 py-2">{order.item}</td>
              <td className="px-4 py-2">{order.desc}</td>
              <td className="px-4 py-2">{order.amount}</td>
              <td className="px-4 py-2">
                <span className={`text-xs font-medium ${priorityColors[order.priority] || "text-black"}`}>
                  {order.priority}
                </span>
              </td>
              <td className="px-4 py-2">{order.project}</td>
              <td className="px-4 py-2">{order.date}</td>
              <td className="px-4 py-2">
                <div className="flex items-center space-x-4">
<Link to={"/update/" + order.id}>  
                    <button className="text-blue-600 hover:underline">✏️</button>
                  </Link>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(order.id)}
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
