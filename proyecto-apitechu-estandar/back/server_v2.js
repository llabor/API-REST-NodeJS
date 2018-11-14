var express = require('express');
var bodyParser=require('body-parser');
var app = express();
var port=process.env.PORT || 3001;
var uri="/colapi/V3/";
var usersFile=require("./users.json");
var baseMLabUrl="https://api.mlab.com/api/1/databases/colapidb_jdcc/collections/";
var fs = require('fs');
var requestJSON = require('request-json');
var apikeyMLab="apiKey=dFSi-QFxcmtOVzv7fMb_YyhBWYaNsAqT";
var queryString='f={"_id":0}&';
var newID=0;


app.use(bodyParser.json());
app.listen(port);
console.log("Escuchando por:"+ port );


//Method GET with params MLab users
app.get(uri + "users",
  function (req, res) {
    console.log("GET/colapi/v3/user");
    var httpClient = requestJSON.createClient(baseMLabUrl);
    console.log("cliente http mlab creado")
    httpClient.get('user?' + queryString + apikeyMLab,
      function(error, respuestaMLab, body){
        console.log(apikeyMLab);
        console.log('error '+ error);
        console.log('respuestaMLab '+respuestaMLab);
        //console.log('body '+body);
        //var respuesta = body;
        var respuesta = {};
        respuesta = !error ? body : {"msg":"error al recuperar usuarios de mlab"};
        res.send(respuesta);
        newID=body.length;
        console.log("newID:"+ newID);
      });
});

//Method GET with params MLab account
app.get(uri + "account",
  function (req, res) {
    console.log("GET/colapi/v3/account");
    var httpClient = requestJSON.createClient(baseMLabUrl);
    console.log("cliente http mlab creado")
    httpClient.get('account?' + queryString + apikeyMLab,
      function(error, respuestaMLab, body){
        console.log('error '+ error);
        console.log('respuestaMLab '+respuestaMLab);
        //console.log('body '+body);
        //var respuesta = body;
        var respuesta = {};
        respuesta = !error ? body : {"msg":"error al recuperar cuentas de mlab"};
        res.send(respuesta);
      });
});

//Method GET with params MLab movement
app.get(uri + "movement",
  function (req, res) {
    console.log("GET/colapi/v3/movement");
    var httpClient = requestJSON.createClient(baseMLabUrl);
    console.log("cliente http mlab creado")
    httpClient.get('movement?' + queryString + apikeyMLab,
      function(error, respuestaMLab, body){
        console.log('error '+ error);
      console.log('respuestaMLab '+respuestaMLab);
        //console.log('body '+body);
        //var respuesta = body;
        var respuesta = {};
        respuesta = !error ? body : {"msg":"error al recuperar movimientos de mlab"};
        res.send(respuesta);
      });
});


//Method GET with params MLab users with ID
app.get(uri + "users/:id",
  function (req, res) {
    console.log("GET/colapi/v3/users/:id");
    console.log("request.params.id: "+req.params.id);
    var id=req.params.id;
    var queryStringID='q={"id":' + id + '}&';
    var httpClient = requestJSON.createClient(baseMLabUrl);
    httpClient.get('user?' + queryString + queryStringID + apikeyMLab,
      function(error, respuestaMLab, body){
        console.log('error '+ error);
        console.log('respuestaMLab '+respuestaMLab);
        //console.log('body '+body);
        //var respuesta = body;
        var respuesta = {};
        respuesta = !error ? body[0]   : {"msg":"usuario con ese ID no encontrado"};
        res.send(respuesta);
      });
});

//Method GET with params MLab users and accounts with ID
app.get(uri + "users/:id/account",
function (req, res) {
  console.log("GET/colapi/v3/account/:id");
  console.log("request.params.id: "+req.params.id);
  var id=req.params.id;
  var queryStringID='q={"user_id":' + id + '}&';
  var httpClient = requestJSON.createClient(baseMLabUrl);
  httpClient.get('account?' + queryString + queryStringID + apikeyMLab,
    function(error, respuestaMLab, body){
      console.log('error '+ error);
      console.log('respuestaMLab '+respuestaMLab);
      console.log('body '+body);
      //var respuesta = body;
      var respuesta = {};
      respuesta = !error ? body   : {"msg":"usuario con ese ID no encontrado"};
      res.send(respuesta);
    });
});

//Method GET with params MLab users and movements with ID
app.get(uri + "users/account/:ida/movement",
function (req, res) {
  console.log("GET/colapi/v3/users/account/:id/movement");
  var ida=req.params.ida;
  var queryStringIDA='q={"idcuenta":' + ida + '}&';
  var httpClient = requestJSON.createClient(baseMLabUrl);
  httpClient.get('movement?' + queryString +  queryStringIDA + apikeyMLab,
    function(error, respuestaMLab, body){
      console.log(baseMLabUrl +'movement?'+ queryString+queryStringIDA+apikeyMLab);
      //var respuesta = body;
      var respuesta = {};
      respuesta = !error ? body   : {"msg":"usuario con ese ID no encontrado"};
      res.send(respuesta);
    });
})
//Method GET with params MLab account with ID
app.get(uri + "account/:id",
  function (req, res) {
    console.log("GET/colapi/v3/account/:id");
    console.log("request.params.id: "+req.params.id);
    var id=req.params.id;
    var queryStringID='q={"IBAN":"' + id + '"}&';
    var httpClient = requestJSON.createClient(baseMLabUrl);
    httpClient.get('account?' + queryString + queryStringID + apikeyMLab,
      function(error, respuestaMLab, body){
        console.log('error '+ error);
        console.log('respuestaMLab '+respuestaMLab);
        console.log('body '+body);
        //var respuesta = body;
        var respuesta = {};
        respuesta = !error ? body[0]   : {"msg":"usuario con ese ID no encontrado"};
        res.send(respuesta);
      });
});


//Method GET with params MLab movement with ID
app.get(uri + "movement/:id",
  function (req, res) {
    console.log("GET/colapi/v3/movement/:id");
    console.log("request.params.id: "+req.params.id);
    var id=req.params.id;
    var queryStringID='q={"idcuenta":' + id + '}&';
    var httpClient = requestJSON.createClient(baseMLabUrl);
    httpClient.get('movement?' + queryString + queryStringID + apikeyMLab,
      function(error, respuestaMLab, body){
        console.log('error '+ error);
        console.log('respuestaMLab '+respuestaMLab);
        console.log('body '+body);
        //var respuesta = body;
        var respuesta = {};
        respuesta = !error ? body[0]   : {"msg":"usuario con ese ID no encontrado"};
        res.send(respuesta);
      });
});

//POST of user
app.post(uri + "users",
 function(req, res) {
  var  clienteMlab = requestJSON.createClient(baseMLabUrl);
  clienteMlab.get('user?'+ apikeyMLab ,
  function(error, respuestaMLab , body) {
      newID=body.length+1;
      console.log("newID:" + newID);
      var newUser = {
        "id" : newID+1,
        "first_name" : req.body.first_name,
        "last_name" : req.body.last_name,
        "email" : req.body.email,
        "password" : req.body.password
      };
      clienteMlab.post(baseMLabUrl + "user?" + apikeyMLab, newUser ,
       function(error, respuestaMLab, body) {
        res.send(body);
     });
  });
});

//PUT of user
app.put(uri + 'users/:id',
function(req, res) {
var  clienteMlab = requestJSON.createClient(baseMLabUrl);
 clienteMlab.get('user?'+ apikeyMLab ,
 function(error, respuestaMLab , body) {
   console.log("newID:" + newID);
     newID=body.length+1;
     var cambio = '{"$set":' + JSON.stringify(req.body) + '}';
     clienteMlab.put(baseMLabUrl + 'user?q={"id": ' + newID + '}&' + apikeyMLab, JSON.parse(cambio),
      function(error, respuestaMLab, body) {
        console.log("body:"+ body);
       res.send(body);
     });
 });
});

//DELETE user with id
app.delete(uri + "users/:id",
  function(req, res){
    console.log("entra al DELETE");
    console.log("request.params.id: "+req.params.id);
    var id=req.params.id;
    var queryStringID='q={"id":' + id + '}&';
    console.log(baseMLabUrl + 'user?' + queryStringID + apikeyMLab);
    var httpClient = requestJSON.createClient(baseMLabUrl);
    httpClient.get('user?' +  queryStringID + apikeyMLab,
      function(error, respuestaMLab, body){
        var respuesta = body[0];
        console.log("body delete:"+ respuesta);
        httpClient.delete(baseMLabUrl + "user/"+ respuesta._id.$oid +'?'+ apikeyMLab,
          function(error, respuestaMLab,body){
            res.send(body);
        });
      });
  });

//Method POST login
app.post(uri + "login",
  function (req, res){
    console.log("POST /colapi/v3/login");
    var email= req.body.email;
    var pass= req.body.password;
    var queryStringEmail='q={"email":"' + email + '"}&';
    var queryStringpass='q={"password":' + pass + '}&';
    var  clienteMlab = requestJSON.createClient(baseMLabUrl);
    clienteMlab.get('user?'+ queryStringEmail+apikeyMLab ,
    function(error, respuestaMLab , body) {
      console.log("entro al body:" + body );
      var respuesta = body[0];
      console.log(respuesta);
      if(respuesta!=undefined){
          if (respuesta.password == pass) {
            console.log("Login Correcto");
            var session={"logged":true};
            var login = '{"$set":' + JSON.stringify(session) + '}';
            console.log(baseMLabUrl+'?q={"id": ' + respuesta.id + '}&' + apikeyMLab);
            clienteMlab.put('user?q={"id": ' + respuesta.id + '}&' + apikeyMLab, JSON.parse(login),
             function(errorP, respuestaMLabP, bodyP) {
              res.send(body[0]);
            });
          }
          else {
            res.send({"msg":"contraseña incorrecta"});
          }
      }else{
        console.log("Email Incorrecto");
        res.send({"msg": "email Incorrecto"});
      }
    });
});


//Method POST logout
app.post(uri + "logout",
  function (req, res){
    console.log("POST /colapi/v3/logout");
    var email= req.body.email;
    var queryStringEmail='q={"email":"' + email + '"}&';
    var  clienteMlab = requestJSON.createClient(baseMLabUrl);
    clienteMlab.get('user?'+ queryStringEmail+apikeyMLab ,
    function(error, respuestaMLab , body) {
      console.log("entro al get");
      var respuesta = body[0];
      console.log(respuesta);
      if(respuesta!=undefined){
            console.log("logout Correcto");
            var session={"logged":true};
            var logout = '{"$unset":' + JSON.stringify(session) + '}';
            console.log(logout);
            clienteMlab.put('user?q={"id": ' + respuesta.id + '}&' + apikeyMLab, JSON.parse(logout),
             function(errorP, respuestaMLabP, bodyP) {
              res.send(body[0]);
              //res.send({"msg": "logout Exitoso"});
            });
      }else{
        console.log("Error en logout");
        res.send({"msg": "Error en logout"});
      }
    });
});
