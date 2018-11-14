'use strict'

const express = require('express');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const config = require('./config');
const api = require('./routes');

const app=express();
app.use(validator());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(config.URLbase,api);


module.exports=app;
