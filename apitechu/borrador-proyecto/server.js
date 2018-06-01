var express = require('express');  // Añadimos librería express
var app = express();
var port = process.env.PORT || 3000; // Abrimos puerto donde escuchará mi app
/*
whatever is in the environment variable PORT, or 3000 if there's nothing there.
So you pass that to app.listen and that makes your server be able to accept
a parameter from the environment what port to listen on.
*/
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
    console.log(req.headers);
    console.log(req.headers.first_name);
    console.log(req.headers.last_name);
    console.log(req.headers.country);

    var newUser = {
      "first_name" : req.headers.first_name,
      "last_name" : req.headers.last_name,
      "country" : req.headers.country
    };

    var users = require('./usuarios.json');
    users.push(newUser);

    var fs = require('fs');
    var jsonUserData = JSON.stringify(users);
    fs.writeFile("./usuarios-2.json", jsonUserData, "utf8",
     function(err) { //función manejadora para gestionar errores de escritura
       if(err) {
         var msg = "Error al escribir fichero usuarios";
         console.log(msg);
       } else {
         var msg = "Usuario persistido";
         console.log(msg);
       }
       res.send({"msg" : msg});
     }
   )
  //  console.log("Usuario añadido con éxito");
  }
)

// Primera versión del proceso DELETE
app.delete("/apitechu/v1/users",
  function(req, res) {
    console.log("DELETE /apitechu/v1/users");
  }
)
