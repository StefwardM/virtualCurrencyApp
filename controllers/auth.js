const User = require('../models/User');
const passport = require('../passport/passport');

const signup = async (req, res, next) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;

    const user = new User({firstname: firstname, lastname: lastname});
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
};

const login = async  (req, res, next) => {
    const user = await User.authenticate()(req.body.firstname, req.body.lastname, req.body.password)
        .then(result => {
            res.json({
                "status": "success",
                "data": {
                    "user": result
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