var mocha = require('mocha');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

/* should = aserción */
var should = chai.should();

/* Crear una suite de tests unitarios que tiene función manejadora */
describe('First test suite',
  function() {
    it('Test that DuckDuckGo works',
      function(done) { // aquí hacemos la petición al API
        chai.request('http://www.duckduckgo.com')
         .get('/')
         .end(
           function(err, res) { // 'res' es la respuesta al 'get' anterior
             console.log("Request has ended");
             console.log(err);
             //console.log(res); sólo para probar test la primera vez
             res.should.have.status(200);  // Aserción para comprobar que petición
             // se realizó correctamente
             // Además deberíamos probar con status 500 para comprobar expected vs actual con:
             // res.should.have.status(500);
             // VER WEB REFERENCIA: Chai Assertion Library
    console.log("POST /apitechu/v1/users");
             done(); /* en contextos asíncronos, señal que indica que ha terminado la función
              y así el framework empieza a comprobar las aserciones */
           }
         )
      }
    )
  }
);


/* Crear OTRA suite de tests unitarios que tiene función manejadora */
describe('Test de API Tech U',
  function() {
    it('Prueba que la API funciona correctamente',
      function(done) { // aquí hacemos la petición al API
        chai.request('http://localhost:3000')
         .get('/apitechu/v1')
         .end(
           function(err, res) { // 'res' es la respuesta al 'get' anterior
             console.log("Request has ended");
             console.log(err);
             res.should.have.status(200); // una aserción
             res.body.msg.should.be.eql("Hola desde apitechu"); // otra aserción
             // "Hola desde apitechu" ver línea 15 de server-v4.js
             done();
             /* NOTA: PARA COMPROBAR ESTA ASERCIÓN HAY QUE LANZAR NUESTRA APITECHU
             npm start
             node server-v4.js */
           }
         )
      }
    ),
    // Otro test unitario de la suite
    it('Prueba que la API devuelve una lista de usuarios correctos',
      function(done) { // aquí hacemos la petición al API
        chai.request('http://localhost:3000')
         .get('/apitechu/v1/users')
         .end(
           function(err, res) { // 'res' es la respuesta al 'get' anterior
             console.log("Request has ended");
             //console.log(err);
             res.should.have.status(200); // una aserción
             res.body.should.be.a("array"); // comprobamos que nos devuelve
             // un array

             for(user of res.body) {
               user.should.have.property('email');
               user.should.have.property('password');

             }
             done();
           }
         )
      }
    )
  }
);
