// Dependencies
var mongoose  = require('mongoose');
var applicant = require('../models/applicant');
// App routes
module.exports = function() {
    return {
        /*
         * Get route to retrieve all the applicants.
         */
        getAll : function(req, res){
            //Query the DB and if no errors, send all the applicants
            var query = applicant.find({});
            query.exec(function(err, applicants){
                if(err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({ "message" : err.message}));
                }
                else{
                //If no errors, send them back to the client
                res.setHeader('Content-Type', 'application/json');
                res.json(applicants);
                }
            });
        },
        /*
         * Post route to save a new applicant into the DB.
         */
        post: function(req, res){
            //Creates a new applicant
            var newApplicant = new applicant(req.body);
            //Save it into the DB.
            newApplicant.save(function(err){
                 if(err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({ "message" : err.message}));
                }
                else{
                //If no errors, send it back to the client
                res.setHeader('Content-Type', 'application/json');
                res.json(req.body);
                }
            });
        },
        /*
         * Get a single applicant based on id.
         */
        getOne: function(req, res){
            applicant.findById(req.params.id, function(err, applicant){
                 if(err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ "message" : err.message}));
                }
                //If no errors, send it back to the client
                res.setHeader('Content-Type', 'application/json');
                res.json(applicant);
            });     
        },
         /*
         * Get a Next applicant based on id.
         */
        getNext: function(req, res){
            //db.posts.find({_id: {$gt: curId}}).sort({_id: 1 }).limit(1)
            applicant
                .find({_id: {$gt: req.params.id}})
                .sort({_id: 1 })
                .limit(1)
                .exec(function(err, applicants) {
                    if(err) {
                        console.log("1err : " , err.message);
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ "message" : err.message}));
                    }
                    if(applicants.length){
                        console.log("1suc");
                        res.setHeader('Content-Type', 'application/json');
                        res.json(applicants);
                    }
                    else{
                        applicant
                        .find()
                        .sort({_id: 1 })
                        .limit(1)
                        .exec(function(err, applicant) {
                            if(err) {
                                console.log("2err");
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({ "message" : err.message}));
                            }
                            else{
                                console.log("2suc");
                                res.setHeader('Content-Type', 'application/json');
                                res.json(applicant);
                                console.log(applicant);
                            }
                        });     
                    }
             
                });
         },
        /*
         * Get a Previous applicant based on id.
         */
        getPrev: function(req, res){
            applicant
                .find({_id: {$lt: req.params.id}})
                .sort({_id: -1 })
                .limit(1)
                .exec(function(err, applicants) {
                    if(err) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ "message" : err.message}));
                    }

                    if(applicants.length){
                        res.setHeader('Content-Type', 'application/json');
                        res.json(applicants);
                    }
                    else{
                        applicant
                        .find()
                        .sort({_id: -1 })
                        .limit(1)
                        .exec(function(err, applicant) {
                            if(err) {
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({ "message" : err.message}));
                            }
                            else{
                                res.setHeader('Content-Type', 'application/json');
                                res.json(applicant);
                            }
                        });     
                    }    
                });

         },
        /*
         * Get a Previous applicant based on id.
         */
        updateStatus: function(req, res){
          console.log('id : ',req.params.id, ' status : ',req.body);
          applicant.update({ _id: req.params.id }, { $set: { status: req.body.status }}, function(err, applicant){
                 if(err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ "message" : err.message}));
                }
                //If no errors, send it back to the client
                res.setHeader('Content-Type', 'application/json');
                res.json(applicant);
            });     
        },       
    }
};  