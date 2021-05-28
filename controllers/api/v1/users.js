const User = require('../../../models/User');

const getAll = (req, res) => {
    User.find( (err, docs) => {
        if(err) {
            res.json({
                "status": "error",
                "message": err
            })
        }
        else{
            res.json({
                "status": "success",
                "data": {
                    "users": docs
                }
            });
        }
    });
}

const getUserById = (req, res) => {
    User.findById(req.params.id, (err, docs) => {
        if(err) {
            res.json({
                "status": "error",
                "message": err
            })
        }
        else{
            res.json({
                "status": "success",
                "username": docs.username,
                "ppname": docs.ppname,
                "firstname": docs.firstname,
                "lastname": docs.lastname,
                "coins": docs.coins
            });
        }
    })
}

module.exports.getAll = getAll;
module.exports.getUserById = getUserById;