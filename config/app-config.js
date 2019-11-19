const dotenv = require('dotenv');
dotenv.config();
const expressConfig = require('./express-config');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("../config/database"); 
const redis = require('redis')
var jwt = require("jsonwebtoken");
class AppConfig{
	
	constructor(app){
		dotenv.config();
		this.app = app;
	}

	includeConfig() {
		this.app.use(bodyParser.json({ limit: "50mb" }));
		this.app.use(
		bodyParser.urlencoded({
			limit: "50mb",
			extended: true,
			parameterLimit: 1000000
		})
		);
		// this.app.use(function(req, res, next) {
		// 	let err = new Error("Not Found");
		// 	err.status = 404;
		// 	next(err);
		//   });
		  // handle errors
		//   this.app.use(function(err, req, res, next) {
		// 	res.json({ error: "the error is" + err });
		  
		// 	if (err.status === 404) res.status(404).json({ message: "Not found" });
		// 	else res.status(500).json({ message: "Something looks wrong :( !!!" });
		//   });
		this.app.set("secretKey", "nodeRestApi"); // jwt secret token
        this.app.use(
        	cors()
        );        
		new expressConfig(this.app);
	}
}
module.exports = AppConfig;