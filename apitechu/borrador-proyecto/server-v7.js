var express = require('express');  // Añadimos librería express
var app = express();
var port= process.env.PORT || 3000; // Abrimos puerto donde escuchará mi app
var bodyParser = require('body-parser'); // Permite enviar datos en el body
app.use(bodyParser.json());

var baseMLabURL = 'https://api.mlab.com/api/1/databases/apitechuelb5ed/collections/';
var mLabAPIkey = "apiKey=NQCR6_EMDAdqyM6VEWg3scF_k32uwvHF"; /* Esto lo haríamos a través de un archivo de properties
 y no aqui en el código por seguridad */
var requestJson = require('request-json');

app.listen(port);
console.log("API escuchando en el puerto " + port);
/* Definimos ruta en la que va a responder nuestra API (nuestro punto de entrada) */
app.get("/apitechu/v1",
  function(req, res) {
    console.log("GET /apitechu/v2");
    //res.send("Respuesta...");
    res.send({"msg" : "Hola desde apitechu"}); // devolvemos un JSON
  }
);

app.get("/apitechu/v2/users",
  function(req, res) {
    console.log("GET /apitechu/v2/users");
    // Creamos la URL base de la petición
    var httpClient = requestJson.createClient(baseMLabURL);
    console.log("Cliente HTTP creado");

    httpClient.get("user?" + mLabAPIkey,
      function(err, resMLab, body) { /* body = array JSON con la respuesta */
        //console.log(err);
        //console.log(resMLab);
        /* resMLab respuesta completa del get anterior */
        /* Si la petición devuelve código 400 o mayor entonces err = TRUE */
        var response = !err ? body : {
          "msg" : "Error obteniendo usuarios"
        }
        res.send(response);
        /* Hacemos el send aquí por el scope de la función */
      }
    )
  }
);


app.get("/apitechu/v2/users/:id",
  function(req, res) {
    console.log("GET /apitechu/v2/users/:id");

    var id = req.params.id;
    var query = 'q={"id":' + id + '}';

    var httpClient = requestJson.createClient(baseMLabURL);
    console.log("Cliente HTTP creado");

    httpClient.get("user?" + query + "&" + mLabAPIkey,
      function(err, resMLab, body) {
        var response = {};
        if(err) {
            response = {
              "msg" : "Error obteniendo usuario."
            }
            res.status(500);
        } else {
          if(body.length > 0) {
            response = body;
            // console.log(response[0].email);
          } else {
            response = {
              "msg" : "Usuario no encontrado"
            };
            res.status(404);
          }
        }
        res.send(response);
        console.log(response[0].email);
      }
    )
  }
);


// GET de accounts

app.get("/apitechu/v2/users/:id/accounts",
  function(req, res) {
    console.log("GET /apitechu/v2/users/:id/accounts");

    var id = req.params.id;
    var query = 'q={"user_id":' + id + '}';

    var httpClient = requestJson.createClient(baseMLabURL);
    console.log("Cliente HTTP creado");
    console.log("query: " + query);

    httpClient.get("account?" + query + "&" + mLabAPIkey,
      function(err, resMLab, body) {
        var response = {};
        if(err) {
            response = {
              "msg" : "Error obteniendo cuentas."
            }
            res.status(500);
        } else {
          if(body.length > 0) {
            response = body[0]; // sólo una cuenta, provisionalmente
            // hasta que usemos dom-repeat
          } else {
            response = {
              "msg" : "Usuario sin cuentas."
            };
            res.status(404);
          }
        }
        res.send(response);
      }
    )
  }
);




/* Hacer LOGIN pasando credenciales en el body */
app.post("/apitechu/v2/login",
  function(req, res) {
    console.log("POST /apitechu/v2/login");
    console.log(req.body.email);
    console.log(req.body.password);
    var email = req.body.email;
    var password = req.body.password;
    var query = 'q={"email": "' + email + '", "password":"' + password + '"}';
    var putBody = '{"$set":{"logged":true}}'; /* $ mLab */
    var httpClient = requestJson.createClient(baseMLabURL);
    //console.log("user?" + query + "&" + mLabAPIkey);

    httpClient.get("user?" + query + "&" + mLabAPIkey,
     function(err, resM, body) {
      if (!err) {
        if (body.length == 1) // Login ok
        {
          let response = body;
          console.log("Login successfull!");
          console.log(response[0]);
          httpClient = requestJson.createClient(baseMLabURL);
          var putBody = '{"$set":{"logged":true}}'
          httpClient.put("user?" + query + "&" + mLabAPIkey, JSON.parse(putBody),
            function(errP, resP, bodyP) {
              res.send({"login":"ok", "id":body[0].id,
                        "nombre":body[0].nombre,
                         "apellidos":body[0].apellidos})
          })
        }
        else {
          res.status(404).send('Usuario no encontrado')
        }
      }
    })
  }
)

/* Hacer LOGOUT pasando credenciales en el body */
app.post("/apitechu/v2/logout",
  function(req, res) {
    console.log("POST /apitechu/v2/logout");
    console.log(req.body.email);
    console.log(req.body.password);
    var email = req.body.email;
    var password = req.body.password;
    var query = 'q={"email": "' + email + '", "password":"' + password + '"}';
    var putBody = '{"$unset":{"logged":""}}'; /* $ mLab */
    var httpClient = requestJson.createClient(baseMLabURL);
    //console.log("user?" + query + "&" + mLabAPIkey);

    httpClient.get("user?" + query + "&" + mLabAPIkey,
     function(err, resM, body) {
      if (!err) {
        if (body.length == 1) // Logout ok
        {
          let response = body;
          console.log("Logout successfull!");
          console.log(response[0]);
          httpClient = requestJson.createClient(baseMLabURL);
          var putBody = '{"$unset":{"logged":""}}';
          httpClient.put("user?" + query + "&" + mLabAPIkey, JSON.parse(putBody),
            function(errP, resP, bodyP) {
              res.send({"logout":"ok", "id":body[0].id,
                        "nombre":body[0].nombre,
                         "apellidos":body[0].apellidos})
          })
        }
        else {
          res.status(404).send('Usuario no encontrado')
        }
      }
    })
  }
)

app.post("/apitechu/v2/users",
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

app.delete("/apitechu/v2/users/:id",
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
