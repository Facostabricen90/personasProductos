const fs = require("fs");
const path = require("path");
const moment = require("moment");

exports.pagePerson = async (req, res) => {
  // Obtener las constantes desde el archivo .env
  const ageInDays = parseInt(process.env.EDAD_REQUIRED, 10);
  const personFilePath = path.join(
    __dirname,
    "../..",
    process.env.PERSON_ROUTE
  );
  const accessFilePath = path.join(
    __dirname,
    "../..",
    process.env.ACCESS_ROUTE
  );

  // Leer el archivo JSON de personas
  fs.readFile(personFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    let persons = JSON.parse(data).persons.filter(
      (person) => person.age * 365 > ageInDays
    );

    if (req.query.filterDisable) {
      persons = JSON.parse(data).persons;
    }

    // Leer el archivo JSON de accesos
    fs.readFile(accessFilePath, "utf8", (err, accessData) => {
      if (err) {
        console.error("Error reading access JSON file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Parsear y agregar nuevo acceso
      const accessList = JSON.parse(accessData).access_list;
      const newAccess = moment().format("YYYY/MM/DD HH:mm");
      accessList.push(newAccess);

      // Guardar el archivo JSON de accesos actualizado
      fs.writeFile(
        accessFilePath,
        JSON.stringify({ access_list: accessList }, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing access JSON file:", err);
            res.status(500).send("Internal Server Error");
            return;
          }

          // Renderizar la vista con los datos
          const locals = {
            title: "PersonJs",
            description: "Free Person User Management System",
            persons: persons,
          };

          res.render("person/person", locals);
        }
      );
    });
  });
};
