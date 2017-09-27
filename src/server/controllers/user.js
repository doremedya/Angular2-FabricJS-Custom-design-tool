var moment = require('moment');
var bcrypt = require('bcrypt');
var User = require("../models/user");

module.exports = {
    create(req, res) {
        User.findOne({email: req.body.email}, function(error, user) {
            if (user){
                res.send({
                    status: 500,
                    success: false,
                    message: "this email already exists"
                })
            } else{
                var user = new User({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 12),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    website: req.body.website,
                    photo: req.body.photo,
                    cellPhone: req.body.cellPhone,
                    telePhone: req.body.telePhone,
                    breNumber: req.body.breNumber,
                    fax: req.body.fax,
                    created_at:  moment().format('MMM D, YYYY'),
                    updated_at:  moment().format('MMM D, YYYY')
                })
                user.save(function(err, result) {
                    if(err) {
                        res.send({
                            status: 500,
                            success: false,
                            message: "create error",
                            error: err
                        })
                    } else {
                        res.send({
                            status: 200,
                            success: true,
                            message: "create success",
                            data: result
                        })
                    }                
                })
            }
        });
    },
    list(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send({
                    success: false,
                    status: 500,
                    error: err
                })
            }            
            else {
                res.send({
                    success: true,
                    status: 200,
                    data: users
                })
            }  
        });
    },
    update(req, res) {
        User.findById(req.params.userId, function(err, user){
            if(err) {            
                res.send({
                    status: 500,
                    success: false,
                    message: "Server Error"
                }) 
            } else {
                if(user) {
                    user.email = req.body.email
                    user.password = bcrypt.hashSync(req.body.password, 12)
                    user.firstName = req.body.firstName
                    user.lastName = req.body.lastName
                    user.photo = req.body.photo
                    user.cellPhone = req.body.cellPhone
                    user.telePhone = req.body.telePhone
                    user.breNumber = req.body.breNumber
                    user.fax = req.body.fax
                    user.website = req.body.website
                    user.updated_at = moment().format('MMM D, YYYY')
                    user.save(function(error, data) {
                        if(error) {
                            console.log(error)
                            res.send({
                                status: 500,
                                success: false,
                                message: "update fail",
                                error: error
                            })
                        } else {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Update success",
                                data: data
                            })
                        }
                    })
                } else {
                    res.send({
                        status: 404,
                        success: false,
                        message: "Not found"
                    }) 
                }
            }
        });
    },
    remove(req, res) {
        User.findByIdAndRemove(req.params.userId, function(err, data){
            if(err) {
                res.send({
                    status: 500,
                    error: err,
                    success: false
                })
            } else {
                if(data) {
                    res.send({
                        status: 200,
                        success: true,
                        message: "delete success"
                    })
                } else {
                    res.send({
                        status: 404,
                        success: false,
                        message: "Not found"
                    })
                }
            }
        });
    },
    getOne(req, res) {
        User.findById(req.params.userId, function(err, user){
            if(err) {
                console.log(err)
                res.send({
                    status: 500,
                    success: false,
                    message: "Server Error"
                }) 
            } else {
                if(user) {
                    res.send({
                        status: 200,
                        success: true,
                        message: "get Success",
                        data: user
                    })
                } else {
                    res.send({
                        status: 404,
                        success: true,
                        message: "not found",
                        data: []
                    })
                }
            }
        });
    }
}