var express = require('express');  // Añadimos librería express
var app = express();
var port= process.env.PORT || 3000; // Abrimos puerto donde escuchará mi app
var bodyParser = require('body-parser'); // Permite enviar datos en el body
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
);  // OJO REVISAR ESTE ; VER ABAJO TB

app.get("/apitechu/v1/users",
  function(req, res) {
    console.log("GET /apitechu/v1/users");
  // res.sendFile('./usuarios.json'); // DEPRECATED
    res.sendFile('users.json', {root: __dirname})
    //__dirname es el directorio actual donde se ejecuta la app
  }
);

app.post("/apitechu/v1/login",
  function(request, response) {
    console.log("POST /apitechu/v1/login");
    console.log(request.body.email);
    console.log(request.body.password);
    var users = require('./users.json');
    var user = request.body.email;
    var pass = request.body.password;
    for(us of users) {
      if(us.email == user) {
        if(us.password == pass) {
          us.logged = true;
          writeUserDataToFile(users);
          console.log("Login correcto!");
          response.send({"msg" : "Login correcto.", "idUsuario" : us.id, "logged" : "true"});
        } else {
          console.log("Login incorrecto.");
          response.send({"msg" : "Login incorrecto."});
        }
      }
    }
  }
)

app.post("/apitechu/v1/logout",
  function(request, response) {
    console.log("POST /apitechu/v1/logout");
    var users = require('./users.json');
    var userId = request.body.id;
    for(us of users) {
      if(us.id == userId) {
        if(us.logged) {
          delete us.logged; // borramos propiedad 'logged'
          writeUserDataToFile(users);
          console.log("Logout correcto!");
          response.send({"msg" : "Logout correcto.", "idUsuario" : us.id});
        } else {
          console.log("Logout incorrecto.");
          response.send({"msg" : "Logout incorrecto."});
        }
      }
    }
  }
)

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

    var users = require('./users.json');
    var msg = "Usuario creado!";
    users.push(newUser);
    writeUserDataToFile(users);
    res.send({"msg" : msg});
  }
)

app.delete("/apitechu/v1/users/:id",
  function(req, res) {
    console.log("DELETE /apitechu/v1/users/:id");
    console.log(req.params);
    console.log(req.params.id);
    var users = require('./users.json');
  //  console.log(users.length)
    users.splice(req.params.id - 1, 1);
  //  console.log(users.length)
    writeUserDataToFile(users);
    console.log("Usuario borrado");
    res.send({"msg" : "Usuario borrado"});
  }
)

function writeUserDataToFile(data) {
  var fs = require('fs');
  var jsonUserData = JSON.stringify(data);

  fs.writeFile("./users.json", jsonUserData, "utf8",
   function(err) { //función manejadora para gestionar errores de escritura
     if(err) {
       console.log(err);
     } else {
       console.log("Datos escritos en archivo.");
     }
   }
 )
}
