const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');
const config = require('config');

const signup = async (req, res, next) => {
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;
    let ppname = req.body.ppname;
    let coins = 100;

    let mail = ppname.split("@");

    if(mail[1] === "student.thomasmore.be" || mail[1] === "thomasmore.be") {
        const user = new User({username: username, firstname: firstname, lastname: lastname, ppname: ppname, coins: coins});
        await user.setPassword(password);
        await user.save().then(result => {
            console.log(result._id, result.username, result.firstname, result.lastname);
            let token = jwt.sign({
                uid: result._id,
                username: result.username,
                firstname: result.firstname,
                lastname: result.lastname,
                ppname: result.ppname
            }, config.get('jwt.secret'));
            res.json({
                "status": "success",
                "data": {
                    "token": token
                }
            })
        }).catch(error => {
            res.json({
                "status": "error"
            })
        });
    }
    else {
        res.json({
            "status": "error",
            "message":"You need an email from Thomas more to register."
        })
    }
};


const login = async  (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password)
        .then(result => {
            if (!result.user){
                return res.json({
                    "status": "failed",
                    "message": "Login failed"
                })
            }

            let token = jwt.sign({
                uid: result.user._id,
                username: result.user.username
            }, config.get('jwt.secret'));

            return res.json({
                "status": "success",
                "data": {
                    "token": token,
                    "id": result.user._id
                }
            });
        }).catch(error => {
            res.json({
                "status": "error",
                "message": error
            });
        });
};

module.exports.signup = signup;
module.exports.login = login;