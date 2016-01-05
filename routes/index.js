var propertyReader = require('properties-reader');
var util = require('util');

var appJs = require('../app.js');

/* GET home page. */
appJs.app.route('/').get(function(req, res) {
    var name;
    var surname;
    var age;
    var uuid;

    // Invocation to person microservice
    appJs.restClient.get(
        {
            "path": "/microservice-person"
        },
        function(err, reqRemote, resRemote, data){
            if (err) {
                util.log(util.format("Error invoking person microservice " + err));
                name = "Unknown";
                surname = "Unknown";
                age = "Unknown";
                uuid = "Unknown";
            } else {
                util.log(util.format("Successfully invoked person microservice at %s%s", appJs.restClient.url.host, reqRemote.path));
                name = data.name;
                surname = data.surname;
                age = data.age;
                uuid = data.uuid;
            }

            res.render("index", {
                "name": name,
                "age": age,
                "surname": surname,
                "uuid": uuid
            });
        }
    );
});

appJs.app.route('/health').get(function(req,res){
    util.log(util.format("Health endpoint called"));

    res.set("Content-Type","application/json");
    res.status(200).send({
        "status":"UP"
    });
});
