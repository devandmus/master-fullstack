const express = require('express');
const router = express.Router();
const validator = require('../helpers/validator');
const data = require('../data/employees.json');



// 1. GET http://localhost:8000/api/employees
// Devolverá un array JSON con el contenido del fichero "employees.json" que se adjunta al enunciado.

//2. GET http://localhost:8000/api/employees?page=1
//  Devolverá los primeros 2 empleados. Del elemento 0 al elemento 1 del listado

// 3. GET http://localhost:8000/api/employees?page=2
// Devolverá del elemento 2 al elemento 3 del listado

// 4. GET http://localhost:8000/api/employees?page=N
// Devolverá del elemento (2 * (N - 1)) al (2 * (N - 1)) + 1.

// 6. GET http://localhost:8000/api/employees?user=true
// Devolverá listado de employees con privileges == "user"

// 8. GET http://localhost:8000/api/employees?badges=black
// Devolverá listado de employees que incluya "black" en el atributo "badges"
router.get('/employees', (req, res, next) => {
  if('page' in req.query) {
    const page = parseInt(req.query.page);
    if(page === 1)
      return res.json(data.slice(0, 2));
    if(page === 2)
      return res.json(data.slice(1, 3));
    return res.json(data.slice(
      (2 * (page - 1)),
      (2 * (page - 1)) + 1
    ));
  }
  else if('user' in req.query && req.query.user === 'true') {
    const filteredByUser = data.filter(entry => entry.privileges === "user");
    return res.json(filteredByUser);
  }
  else if('badges' in req.query && req.query.badges === 'black') {
    const filteredByBadge = data.filter(entry => entry.badges.includes('black'));
    return res.json(filteredByBadge);
  }
  return res.json(data);
});



// 5. GET http://localhost:8000/api/employees/oldest
// Devolverá el objeto individual correspondiente al empleado con más edad. En caso de existir más de uno, se devolverá la
// primera ocurrencia
router.get('/employees/oldest', (req, res, next) => {
  const orderedData = data.sort((a, b) => {
    if(a.age > b.age)
      return -1;
    if(a.age < b.age)
      return 1
    return 0;
  });
  const oldest = orderedData[0];
  return res.json(oldest);
});



// 9. GET http://localhost:8000/api/employees/NAME
// Devolverá objeto employee cuyo nombre sea igual a NAME. NAME puede tomar diferentes valores:
// Sue, Bob, etc.
// Si no se encuentra el usuario con name == NAME se devolvera status 404 con el siguiente contenido:
// {"code": "not_found"}
router.get('/employees/:name', (req, res, next) => {
  const name = req.params.name.toLowerCase();
  const getByName = data.find(entry => entry.name.toLowerCase() === name);
  if(getByName)
    return res.json(getByName);
  return res
    .status(404)
    .json({"code": "not_found"})
});



// 6. POST http://localhost:8000/api/employees
// Añadirá un elemento al listado en memoria del programa (se perderá cada vez que se reinicie).
// Se validará que el body de la petición cumpla el mismo formato JSON que el resto de empleados.
// Si no cumpliera dicha validación, se devolverá status 400 con el siguiente contenido:
//
// {"code": "bad_request"}
router.post('/employees', (req, res, next) => {
  const payload = req.body;
  const isValid = new validator
    .EmployeeValidator(payload)
    .isValid();
  if(isValid) {
    // aquí estoy inyectando en el proceso los datos para cumplir con la
    // solicitud del enunciado, que se guarden hasta que se mata el programa
    if(process.data)
      process.data.push(payload)
    else process.data = [payload, ...data]
    return res.json({
      dynamicTotalEntries: process.data.length,
      dynamicData: process.data,
    })
  }
  return res
    .status(400)
    .json({"code": "bad_request"});
});


module.exports = router;
