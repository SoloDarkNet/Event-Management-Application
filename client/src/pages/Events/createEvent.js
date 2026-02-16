import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    capacity: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/events", form);
      alert(res.data.message);
      navigate("/events");
    } catch (err) {
      alert("Error creating event");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Create Event</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Event Name"
          onChange={handleChange}
        />
        <input
          name="location"
          className="form-control mb-2"
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="form-control mb-2"
          onChange={handleChange}
        />
        <input
          type="number"
          name="capacity"
          className="form-control mb-2"
          placeholder="Capacity"
          onChange={handleChange}
        />
        <button className="btn btn-success">Create</button>
      </form>
    </div>
  );
};

export default CreateEvent;
