'use strict'

var requestJson = require('request-json');
const config=require('../config');
const url=config.mlab_host+config.mlab_db+'collections/';

//GET ALL MOVIEENTS
function getMovieents(request,response){
    var client = requestJson.createClient(url);
    const queryName='f={"_id":0}&';
    client.get(config.mlab_collection_movieent+'?'+queryName+config.mlab_key, function(err, res, body) {
    response.send(body);
    });
}

//GET MOVIEENT BY ID
function getMovieent(request,response){
    var client = requestJson.createClient(url);
    const queryName='q={"idcuenta":"'+request.params.id+'"}&';
    client.get(config.mlab_collection_movieent+'?'+queryName+config.mlab_key, function(err, res, body) {
    var respuesta=body[0];
    response.send(respuesta);
    });
}

module.exports={
  getMovieents,
  getMovieent
};
