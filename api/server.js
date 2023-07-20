  const express = require("express");
  const mongoose = require("mongoose");
  const path = require('path');
  const jwt = require("jsonwebtoken");
  const Cliente = require("./models/client");
  const auth = require("./middleware/auth");
  require("dotenv").config();
  const cors = require("cors");

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());


  //Connectar a la base MongoDB
  const db = process.env.MONGO_URL;

  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch(error => console.log(error));



  // GET random
  app.get("/number", (req,res) => {
    return res.status(200).json({
      numero: "1",
      numero2: "2"
    })
  }

  )

  // Con un nombre y apellido recibo token. POST /token
  app.post("/token", (req, res) => {
    const { nombre, apellido } = req.body;

    if (!nombre || !apellido) {
      return res.status(400).json({ msg: "Se necesita apellido y nombre para obtener un token" });
    }

    jwt.sign(
      { id: nombre },
      process.env.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) return res.status(400).json({ msg: "No pudimos generar el token" });
        res.json({
          token,
          cliente: {
            nombre: nombre,
            apellido: apellido
          }
        });
      }
    )
  });


  // Recibo aprobado/rechazado en base al cuit. POST /aprobacion
  app.post("/aprobacion", (req, res) => {
    const { nombre, apellido, cuit } = req.body;
    console.log(req.body);
    if (!nombre || !apellido || !cuit) {
      return res.status(400).json({ msg: "Se necesita apellido y nombre para obtener un token" });
    }

    if (cuit == "20376294170") {
      return res.status(200).json({
        estado: "aprobado",
        cliente: {
          nombre: nombre,
          apellido: apellido
        }
      })
    } else {
      return res.status(400).json({
        estado: "rechazado",
        cliente: {
          nombre: nombre,
          apellido: apellido
        }
      })
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
