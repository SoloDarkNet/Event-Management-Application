import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const GetEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h3>All Events</h3>
        <Link to="/create-event" className="btn btn-primary">
          Add Event
        </Link>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>{event.date}</td>
              <td>{event.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetEvents;
