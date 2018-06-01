var express = require('express');  // Añadimos librería express
var app = express();
var port= process.env.PORT || 3000; // Abrimos puerto donde escuchará mi app
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(port);
console.log("API escuchando en el puerto " + port);

/* Definimos ruta en la que va a responder nuestra API (nuestro punto de entrada) */
app.get("/apitechu/v1",
  function(req, res) {
    console.log("GET /apitechu/v1");
    //res.send("Respuesta...");
    res.send({"msg" : "Hola desde apitechu"}); // devolvemos un JSON
  }
);

app.get("/apitechu/v1/users",
  function(req, res) {
    console.log("GET /apitechu/v1/users");
  // res.sendFile('./usuarios.json'); // DEPRECATED
    res.sendFile('usuarios.json', {root: __dirname})
    //__dirname es el directorio actual donde se ejecuta la app
  }
);


app.post("/apitechu/v1/users",
  function(req, res) {
    console.log("POST /apitechu/v1/users");
    console.log(req.body.first_name);
    console.log(req.body.last_name);
    console.log(req.body.country);

    var newUser = {
      "first_name" : req.body.first_name,
      "last_name" : req.body.last_name,
      "country" : req.body.country
    };

    var users = require('./usuarios.json');
    var msg = "Usuario creado exitosamente!";
    users.push(newUser);
    writeUserDataToFile(users);

    res.send({"msg" : msg});
  }
)

/*
app.post("/apitechu/v1/monstruo/:p1/:p2",
  function(req, res) {
    console.log("Paramétros"),
    console.log(req.params);

    console.log("Query String");
    console.log(req.query);

    console.log("Body");
    console.log(req.body);

    console.log("Headers");
    console.log(req.headers);
  }
) */


app.delete("/apitechu/v1/users/:id",
  function(req, res) {
    console.log("DELETE /apitechu/v1/users/:id");
    console.log(req.params);
    console.log(req.params.id);
    var users = require('./usuarios.json');
    console.log(users.length)
    users.splice(req.params.id - 1, 1);
    console.log(users.length)
    writeUserDataToFile(users);
    console.log("Usuario borrado");
    res.send({"msg" : "Usuario borrado"});
  }
)

function writeUserDataToFile(data) {
  var fs = require('fs');
  var jsonUserData = JSON.stringify(data);

  fs.writeFile("./usuarios.json", jsonUserData, "utf8",
   function(err) { //función manejadora para gestionar errores de escritura
     if(err) {
       console.log(err);
     } else {
       console.log("Datos escritos en archivo.");
     }
   }
 )
}
