const authHandler = require('./../../handlers/auth-handler');
const chatHandler = require('./../../handlers/chat-handler');
const validator = require('../../utils/validator');
const {requireApiKey} = require('../../middlewares/apiRequest');
class Routes{
    constructor(app){
        this.app = app;
    }
    appRoutes(){
        this.app.post('/register',requireApiKey, authHandler.Create);
        this.app.post('/login',requireApiKey, authHandler.authenticate);
        this.app.post('/start',requireApiKey,chatHandler.startChat);
        this.app.get('/profiles',requireApiKey, validator.validateUser, authHandler.getProfiles);
    }
    routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;