app.post('/v3/usuarios', 
	function(req, res) {
  		clienteMlab = requestJson.createClient(urlMlabRaiz + "/usuarios?" + apiKey)
  		clienteMlab.post('', req.body,
  		 function(err, resM, body) {
    		res.send(body)
  	})
})


app.put('/v3/usuarios/:id', 
	function(req, res) {
  		clienteMlab = requestJson.createClient(urlMlabRaiz + "/usuarios")
  		var cambio = '{"$set":' + JSON.stringify(req.body) + '}'
  		clienteMlab.put('?q={"idusuario": ' + req.params.id + '}&' + apiKey, JSON.parse(cambio),
    		function(err, resM, body) {
    			res.send(body)
  			})
})