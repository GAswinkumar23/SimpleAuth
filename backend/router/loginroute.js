const express = require('express');
const loginrouter = express.Router();
const login=require("../controlsfunction/login");
const test=require("../controlsfunction/test");

loginrouter.post('/',login);
loginrouter.get('/',test);
module.exports=loginrouter;