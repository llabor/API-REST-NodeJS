'use strict'

const requestJson = require('request-json');
const service =require('../services');
const config=require('../config');
const url=config.mlab_host+config.mlab_db+'collections/';

//POST LOGIN USER
function login(request,response){

    //VALIDATE INPUT
    request.checkBody("email", "Enter a valid email address.").isEmail();
    request.checkBody('password', 'passwords must be at least 5 chars long and contain one number').isLength({ min: 5 }).matches(/\d/);
    var errors = request.validationErrors();
    if (errors) {response.status(400).send(errors);return;}

    var client = requestJson.createClient(url);
    const queryName='q={"email":"'+request.body.email+'"}&';
    client.get(config.mlab_collection_user+'?'+queryName+config.mlab_key, function(err, res, body) {
    var respuesta=body[0];
    if(undefined!=respuesta){
        if(request.body.password==respuesta.password){
          var data = {
            "session" : true
          };
          var change = '{"$set":' + JSON.stringify(data) + '}';
          client.put(config.mlab_collection_user+'?q={"id": ' + respuesta.id + '}&' + config.mlab_key, JSON.parse(change), function(errP, resP, bodyP) {
          response.status(200).send({token:service.createToken(respuesta.id)});
          })
        }else{
          response.send(404,{"msg":"Password incorrecta"});
        }
      }else{
      response.send(404,{"msg":"Email incorrecto"});
    }
  });
}

//POST LOGOUT USER
function logout(request,response){

    //VALIDATE INPUT
    request.checkBody("email", "Enter a valid email address.").isEmail();
    var errors = request.validationErrors();
    if (errors) {response.status(400).send(errors);return;}

    var client = requestJson.createClient(url);
    const queryName='q={"email":"'+request.body.email+'"}&';
    client.get(config.mlab_collection_user+'?'+queryName+config.mlab_key, function(err, res, body) {
    var respuesta=body[0];
      if(undefined!=respuesta){
            var data = {
              "session" : false
            };
            var change = '{"$unset":' + JSON.stringify(data) + '}';
            client.put(config.mlab_collection_user+'?q={"id": ' + respuesta.id + '}&' + config.mlab_key, JSON.parse(change), function(errP, resP, bodyP) {
            response.send(201,{"msg":"LogOut correcto"})
            })
      }else{
        response.send(404,{"msg":"Email incorrecto"});
      }
    });
}





module.exports={
  login,
  logout
};
