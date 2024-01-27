const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Configure MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  port: 808, // Change to your MySQL port
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

app.use(bodyParser.json());
app.use(express.static("docs"));

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

// Example of improved error handling in updateRecord and deleteRecord routes
app.post("/updateRecord", (req, res) => {
  const tableName = req.query.table;
  const data = req.body;

  const query = `UPDATE ${tableName} SET ? WHERE ${tableName}ID = ?`;

  db.query(query, [data, data[`${tableName}ID`]], (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.json({ message: "Record updated successfully" });
    }
  });
});

app.post("/deleteRecord", (req, res) => {
  const tableName = req.query.table;
  const data = req.body;

  const query = `DELETE FROM ${tableName} WHERE ${tableName}ID = ?`;

  db.query(query, [data[`${tableName}ID`]], (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.json({ message: "Record deleted successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
