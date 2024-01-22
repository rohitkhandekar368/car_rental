const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Configure MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  port: 808,
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "car_rental",
});

db.connect((err) => {
  if (err) {
    console.error("Unable to connect to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Define API endpoints

// Get attributes of a table
app.get("/getAttributes", (req, res) => {
  const tableName = req.query.table;
  const query = `SHOW COLUMNS FROM ${tableName}`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching attributes:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const attributes = result.map((row) => row.Field);
      res.json({ attributes });
    }
  });
});

// Insert a record into a table
app.post("/insertRecord", (req, res) => {
  const tableName = req.query.table;
  const data = req.body;

  const query = `INSERT INTO ${tableName} SET ?`;

  db.query(query, data, (err) => {
    if (err) {
      console.error("Error inserting record:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Record inserted successfully" });
    }
  });
});

// Get records from a table
app.get("/getRecords", (req, res) => {
  const tableName = req.query.table;
  const query = `SELECT * FROM ${tableName}`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching records:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const records = result;
      res.json({ records });
    }
  });
});

// Update a record in a table
app.post("/updateRecord", (req, res) => {
  const tableName = req.query.table;
  const data = req.body;

  const query = `UPDATE ${tableName} SET ? WHERE ${tableName}ID = ?`;

  db.query(query, [data, data[`${tableName}ID`]], (err) => {
    if (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Record updated successfully" });
    }
  });
});

// Delete a record from a table
app.post("/deleteRecord", (req, res) => {
  const tableName = req.query.table;
  const data = req.body;

  const query = `DELETE FROM ${tableName} WHERE ${tableName}ID = ?`;

  db.query(query, [data[`${tableName}ID`]], (err) => {
    if (err) {
      console.error("Error deleting record:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Record deleted successfully" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
