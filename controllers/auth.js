const User = require('../models/User');

const signup = async (req, res, next) => {
    let username = req.body.username; // UI of postman
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let coins = 100;

    if(username.includes("@student.thomasmore.be")) {
        const user = new User({
            username: username,
            firstname: firstname,
            lastname: lastname,
            coins: coins
        });

        await user.setPassword(password);
        await user.save().then(result => {
            res.json({
                "status": "success"
            })
        }).catch(error => {
            res.json({
                "status": "error"
            })
        });
    } else {
        throw "email must include @student.thomasmore.be";
    }

};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        res.json({
            "status": "success",
            "data": {
                "user": result
            }
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
};

module.exports.signup = signup;
module.exports.login = login;