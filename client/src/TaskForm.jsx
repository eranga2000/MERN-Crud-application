import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TaskForm({ initialData , onSubmit }) {
  const [formData, setFormData] = useState({
    itemName: "",
    projectName: "",
    description: "",
    link: "",
    dueDate: "",
    priority: "Medium",
    amount: "",
  });

  const navigate = useNavigate();

  // Load initial data into form when editing
  useEffect(() => {
    if (initialData ) {
     
      setFormData({
        itemName: initialData.item || "",
        projectName: initialData.project || "xx",
        description: initialData.desc || "",
        link: initialData.link || "",
        dueDate: initialData.date ? initialData.date.split("T")[0] : "", // to handle ISO dates
        priority: initialData.priority || "Medium",
        amount: initialData.amount || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      item: formData.itemName,
      desc: formData.description,
      amount: formData.amount,
      priority: formData.priority,
      project: formData.projectName,
      date: formData.dueDate,
      link: formData.link,
    };

    if (onSubmit) {
      // For update: delegate submission to parent handler
      await onSubmit(payload);
    } else {
      // Default: create a new record (POST)
      try {
        const response = await axios.post("http://localhost:3000/api/requests", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Submitted successfully:", response.data);
        navigate("/"); // Redirect to home page
      } catch (error) {
        console.error("Submission failed:", error);
        alert("Failed to submit request." + error.message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold mb-4">
          {initialData ? "Update Request" : "Send a request"}
        </h1>


        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Development board"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="example project"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link (if available)
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="amount"
            >
              Amount:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="amount"
              name="amount"
              placeholder="number or quantity"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 ease-in-out"
        >
          {initialData ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
