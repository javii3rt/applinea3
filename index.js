const sql = require("mssql");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

const dbConfig = {
  user: "Adminuser",
  password: "adminprueba123*",
  server: "sr-sqlserverlinea03.database.windows.net",
  database: "lineasql",
};

// Middleware para agregar encabezados CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Función para obtener los resultados de una consulta a la base de datos
const getQueryResult = async (query) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(query);
    await sql.close();
    return result.recordset;
  } catch (err) {
    console.error("Error de consulta:", err);
    throw new Error("Error al consultar la base de datos");
  }
};

// Endpoint para obtener todos los usuarios
app.get("/users", async (req, res) => {
  try {
    const queryResult = await getQueryResult("SELECT * FROM Users");
    res.send(queryResult);
  } catch (err) {
    res.status(500).send("Error al obtener los usuarios");
  }
});

// Endpoint para obtener todos los alumnos
app.get("/students", async (req, res) => {
  try {
    const queryResult = await getQueryResult("SELECT * FROM Alumno");
    res.send(queryResult);
  } catch (err) {
    res.status(500).send("Error al obtener los alumnos");
  }
});

app.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto " + PORT);
});
