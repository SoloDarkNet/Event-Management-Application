const db = require("../database");

exports.createEvent = (req, res) => {
  const { name, location, date, capacity } = req.body;

  db.run(
    `
        INSERT INTO events (name, location, date, capacity) VALUES (?,?,?,?)`,
    [name, location, date, capacity],
    function (e) {
      if (e) {
        res.status(400).json({ message: "Error creating event" });
      } else {
        res.json({ message: "Event created successfully" });
      }
    },
  );
};

exports.getEvents = (req, res) => {
  db.all(
    `
        SELECT * FROM events`,
    [],
    function (e, events) {
      if (e) {
        res.status(400).json({ message: "Error fetching events" });
      } else {
        res.json(events);
      }
    },
  );
};
