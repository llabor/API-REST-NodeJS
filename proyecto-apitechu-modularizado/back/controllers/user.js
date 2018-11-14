'use strict'

var requestJson = require('request-json');
const config=require('../config');
const url=config.mlab_host+config.mlab_db+'collections/';
var generate_id=0;

//GET ALL USERS
function getUsers(request,response){
    var client = requestJson.createClient(url);
    const queryName='f={"_id":0}&';
    client.get(config.mlab_collection_user+'?'+queryName+config.mlab_key, function(err, res, body) {
    generate_id=body.length;
    response.send(body);
  });
}

//GET USER BY ID
function getUser(request,response){

    //VALIDATE INPUT
    request.checkParams("id", "ID is wrong").isInt();
    var errors = request.validationErrors();
    if (errors) {response.status(400).send(errors);return;}

    var client = requestJson.createClient(url);
    const queryName='q={"id":'+request.params.id+'}&';
    client.get(config.mlab_collection_user+'?'+queryName+config.mlab_key, function(err, res, body) {
    var respuesta=body[0];
    if(undefined==respuesta)
    response.status(404).send({message:"Usuario no Existe"});
    else
    response.send(respuesta);
  });
}

//GET ALL ACCOUNT USER BY ID
function getUserAccounts(request,response){
    var client = requestJson.createClient(url);
    const queryName='q={"user_id":'+request.params.id+'}&';
    client.get(config.mlab_collection_account+'?'+queryName+config.mlab_key, function(err, res, body) {
    var respuesta=body;
    response.send(respuesta);
  });
}

//GET ACCOUNT USER BY ID AND IBAN
function getUserAccount(request,response){

    //VALIDATE INPUT
    request.checkParams("id", "ID is wrong").isInt();
    var errors = request.validationErrors();
    if (errors) {response.status(400).send(errors);return;}

    var client = requestJson.createClient(url);
    const queryName='q={"user_id":'+request.params.id+',"IBAN":"'+request.params.IBAN+'"}&';
    client.get(config.mlab_collection_account+'?'+queryName+config.mlab_key, function(err, res, body) {
    var respuesta=body[0];
    response.send(respuesta);
  });
};

//GET MOVIEENTS USER BY ID AND IBAN
function getUserAccountMovs(request,response){
   var client = requestJson.createClient(url);
   const queryName='q={"idcuenta":"'+request.params.IBAN+'"}&';
   client.get(config.mlab_collection_movieent+'?'+queryName+config.mlab_key, function(err, res, body) {
   var respuesta=body[0];
   response.send(respuesta);
 });
};

//GET MOVIEENT USER BY ID AND IBAN
function getUserAccountMov(request,response){
    var client = requestJson.createClient(url);
    const queryName='q={"idcuenta":"'+request.params.IBAN+'","movimientos.idmov":'+request.params.id_mov+'}&';
    client.get(config.mlab_collection_movieent+'?'+queryName+config.mlab_key, function(err, res, body) {
    var respuesta=body[0];
    response.send(respuesta);
    });
};

//POST USER
function saveUser(request,response){

      //VALIDATE INPUT
      request.checkBody("first_name", "first_name is not Empty").notEmpty();
      request.checkBody("last_name", "last_name is not Empty").notEmpty();
      request.checkBody("email", "Enter a valid email address.").isEmail();
      request.checkBody('password', 'passwords must be at least 5 chars long and contain one number').isLength({ min: 5 }).matches(/\d/);

      var errors = request.validationErrors();
      if (errors) {response.status(400).send(errors);return;}

      var data = {
      "id" : generate_id+1,
      "first_name" : request.body.first_name,
      "last_name" : request.body.last_name,
      "email" : request.body.email,
      "password" : request.body.password
    };
    var client = requestJson.createClient(url);
    client.post(config.mlab_collection_user+'?'+config.mlab_key, data, function(err, res, body) {
    if(err)console.log(err);
    response.send(body);
    });
};

//PUT USER
function updateUser(request,response){

    request.checkBody("first_name", "first_name is not Empty").notEmpty();
    request.checkBody("last_name", "last_name is not Empty").notEmpty();
    request.checkBody("email", "Enter a valid email address.").isEmail();

    var errors = request.validationErrors();
    if (errors) {response.status(400).send(errors);return;}

    var clienteMlab = requestJson.createClient(url);
    var cambio = '{"$set":' + JSON.stringify(request.body) + '}';
    clienteMlab.put(config.mlab_collection_user+'?q={"id": ' + request.params.id + '}&' + config.mlab_key, JSON.parse(cambio), function(err, resM, body) {
    response.send(body);
    });
};

//DELETE USER
function removeUser(request,response){

    //VALIDATE INPUT
    request.checkParams("id", "ID is wrong").isInt();
    var errors = request.validationErrors();
    if (errors) {response.status(400).send(errors);return;}

     var client = requestJson.createClient(url);
     const queryName='q={"id":'+request.params.id+'}&';
     client.get(config.mlab_collection_user+'?'+queryName+config.mlab_key, function(err, res, body) {
     var respuesta=body[0];
     client.delete(config.mlab_collection_user+'/'+respuesta._id.$oid+'?'+config.mlab_key, function(errD, resD, bodyD) {
     if(errD)console.log(errD);
     response.send(bodyD);
      });
     });
};


module.exports={
  getUsers,
  getUser,
  getUserAccounts,
  getUserAccount,
  getUserAccountMovs,
  getUserAccountMov,
  saveUser,
  updateUser,
  removeUser
};
