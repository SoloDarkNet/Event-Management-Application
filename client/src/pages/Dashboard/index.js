import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      getEvents(token);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getEvents = async () => {
    const result = await fetch("http://localhost:5000/api/events", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await result.json();
    console.log(data);
    setEvents(data);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <span className="navbar-brand fw-bold">🎉 Event Dashboard</span>
          <Link to="/events" className="btn btn-light">
            Get Events
          </Link>
          <Link to="/create-event" className="btn btn-light mx-2">
            Create Event
          </Link>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="card-title">Welcome back 👋</h4>
            <p className="card-text text-muted">
              Manage your events and registrations here.
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card text-center shadow-sm border-0">
              <div className="card-body">
                <h5 className="text-primary">🎟 Total Events</h5>
                <h2>12</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-center shadow-sm border-0">
              <div className="card-body">
                <h5 className="text-success">📅 Upcoming</h5>
                <h2>5</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-center shadow-sm border-0">
              <div className="card-body">
                <h5 className="text-danger">⏳ Past Events</h5>
                <h2>7</h2>
              </div>
            </div>
          </div>
        </div>

        <h5 className="mb-3">My Registered Events</h5>

        <div className="row">
          {events.map((event) => (
            <div key={event.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Tech Conference {event.name}</h5>
                  <p className="card-text text-muted">📍 {event.location}</p>
                  <p className="card-text text-muted">📅 {event.date}</p>
                  <button className="btn btn-outline-primary w-100">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
