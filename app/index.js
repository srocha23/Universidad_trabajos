const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "proyecto_db"
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conexión exitosa con la base de datos MySQL");
});

app.get("/", (req, res) => {
  res.send("Aplicación Node.js funcionando correctamente con Docker");
});

app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error consultando usuarios" });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
