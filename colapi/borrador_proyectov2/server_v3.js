var express = require('express');
var bodyParser = require('body-parser');
var requestJSON = require('request-json');
var app = express();
var port = process.env.PORT || 3000;
var usersFile = require('./users.json');
var URLbase = "/colapi/v3/";

var baseMLabURL = 'https://api.mlab.com/api/1/databases/apitechuelb5ed/collections/';
var mLabAPIKey = 'apiKey=NQCR6_EMDAdqyM6VEWg3scF_k32uwvHF';

app.listen(port, function(){
  console.log("API colapi escuchando en el puerto " + port + "...");
});

app.use(bodyParser.json());

// GET users
app.get(URLbase + 'users',
  function(req, res) {
    console.log("GET /colapi/v3/users");
    var httpClient = requestJSON.createClient(baseMLabURL);
    console.log("Cliente mLab creado correctamente");

    httpClient.get('user?' + mLabAPIKey,
      function(err, resMLab, body) {
        // console.log(err);
        // console.log(resMLab);
        var response = !err ? body : {"msg":"Error obteniendo usuarios."};
        res.send(response);
      });
});

// Petición GET con mLab
app.get(URLbase + 'users/:id',
  function (req, res) {
    console.log("GET /colapi/v3/users/:id");
    console.log(req.params.id);

    var httpClient = requestJSON.createClient(baseMLabURL);
    var id = req.params.id;
    var mLabQuery = 'q={"id":' + id + '}';
    httpClient.get('user?' + mLabQuery + '&' + mLabAPIKey,
      function(err, respMLab, body) {
        var response = {};
        if(err) {
          response = {"msg" : "Error obteniendo usuario."};
        } else {
          response = body;
        }
        res.send(response[0].email);
      });
});

// Petición GET con Query String (req.query)
app.get(URLbase + 'users',
  function(req, res) {
    console.log("GET con query string.");
    console.log(req.query.id);
    console.log(req.query.country);
    res.send(usersFile[pos - 1]);
    respuesta.send({"msg" : "GET con query string"});
});

// Petición POST (reg.body)
app.post(URLbase + 'users',
  function(req, res) {
    var newID = usersFile.length + 1;
    var newUser = {
      "id" : newID,
      "first_name" : req.body.first_name,
      "last_name" : req.body.last_name,
      "email" : req.body.email,
      "country" : req.body.country
    };
    usersFile.push(newUser);
    console.log(usersFile);
    res.send({"msg" : "Usuario creado correctamente: ", newUser});
  });


// PUT
app.put(URLbase + 'users/:id',
   function(req, res){
     console.log("PUT /colapi/v2/users/:id");
     var idBuscar = req.params.id;
     var updateUser = req.body;
     var encontrado = false;
     for(i = 0; (i < usersFile.length) && !encontrado; i++) {
       console.log(usersFile[i].id);
       if(usersFile[i].id == idBuscar) {
         encontrado = true;
         res.send({"msg" : "Usuario actualizado correctamente.", updateUser});
       }
     }
     if(!encontrado) {
       res.send({"msg" : "Usuario no encontrado.", updateUser});
     }
   });

// DELETE
app.delete(URLbase + 'users/:id',
  function(req, res) {

    const id = req.params.id-1;
    const reg = usersFile[id];

    if(undefined != reg){
      usersFile.splice(id,1);
      res.send(204);
   } else
     res.send(404);
});

// LOGIN - users.json
app.post(URLbase + 'login',
  function(request, response) {
    console.log("POST /apicol/v2/login");
    console.log(request.body.email);
    console.log(request.body.password);
    var user = request.body.email;
    var pass = request.body.password;
    for(us of usersFile) {
      if(us.email == user) {
        if(us.password == pass) {
          us.logged = true;
          writeUserDataToFile(usersFile);
          console.log("Login correcto!");
          response.send({"msg" : "Login correcto.", "idUsuario" : us.id, "logged" : "true"});
        } else {
          console.log("Login incorrecto.");
          response.send({"msg" : "Login incorrecto."});
        }
      }
    }
});

// LOGOUT - users.json
app.post(URLbase + 'logout',
  function(request, response) {
    console.log("POST /apicol/v2/logout");
    var userId = request.body.id;
    for(us of usersFile) {
      if(us.id == userId) {
        if(us.logged) {
          delete us.logged; // borramos propiedad 'logged'
          writeUserDataToFile(usersFile);
          console.log("Logout correcto!");
          response.send({"msg" : "Logout correcto.", "idUsuario" : us.id});
        } else {
          console.log("Logout incorrecto.");
          response.send({"msg" : "Logout incorrecto."});
        }
      }  us.logged = true
    }
});

function writeUserDataToFile(data) {
  var fs = require('fs');
  var jsonUserData = JSON.stringify(data);

  fs.writeFile("./users.json", jsonUserData, "utf8",
   function(err) { //función manejadora para gestionar errores de escritura
     if(err) {
       console.log(err);
     } else {
       console.log("Datos escritos en 'users.json'.");
     }
   })
}
