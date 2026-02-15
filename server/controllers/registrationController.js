const db = require("../database");

exports.registerForEvent = (req, res) => {
  const { userId, eventId } = req.body;

  db.get(
    `
        SELECT capacity FROM events WHERE id = ?`,
    [eventId],
    (e, event) => {
      if (!event) {
        return res.status(400).json({ message: "Event not found" });
      }
    },
  );

  db.get(
    `
            select count(*) as count from registrations where event_id = ?`,
    [eventId],
    (e, result) => {
      if (result.count >= event.capacity) {
        return res.status(400).json({ message: "Event is full" });
      }
    },
  );

  db.run(
    `
        INSERT INTO registrations (user_id, event_id) VALUES (?,?)`,
    [userId, eventId],
    function (e) {
      if (e) {
        res.status(400).json({ message: "Error registering for event" });
      } else {
        res.json({ message: "Successfully registered for event" });
      }
    },
  );
};
