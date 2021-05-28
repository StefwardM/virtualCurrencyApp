const Transfer = require('../../../models/Transfer');
const User = require('../../../models/User');

const getAllByPpName = (req, res) => {
    Transfer.find({$or:[{"sender": req.user.ppname}, {"recipient": req.user.ppname}]}, (err, docs) => {
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "transfers": docs
                },
                "ppname": req.user.ppname
            });
        }
    });
}

const getTransferById = (req, res) => {
    Transfer.findById(req.params.id, (err, docs) => {
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
                    "transfers": docs
                }
            });
        }
    })
}

const create = (req, res) => {
    let senderUsername = req.user.ppname;
    let transfer = new Transfer();
    transfer.sender = senderUsername;
    transfer.recipient = req.body.recipient;
    transfer.message = req.body.message;
    transfer.amount = req.body.amount;
    transfer.reason = req.body.reason;
    User.findOne({ppname: senderUsername}, {"coins": 1}, (err, doc) => {
        if(err){
            res.json({
                "status": "Error",
                "message": "User doesn't exist."
            })
        }
        else{
            let coins = doc.coins;
            let amount = req.body.amount;
            if((amount > 0) && (coins >= amount)) {
                transfer.save((err, doc) => {
                    if (err) {
                        res.json({
                            "status": "error",
                            "message": "Could not save this transfer - not enough coins in balance!"
                        });
                    }
                    else {
                        User.findOneAndUpdate({ppname: senderUsername}, {$inc: {coins: parseInt(`-${amount}`)}}, {returnNewDocument: true, useFindAndModify: false}, (err) => {
                            if (err) {
                                res.json({
                                    "status": "error",
                                    "message": "Could not save this transfer - Something went wrong with updating the users coins (sender)"
                                });
                            }
                            else {
                                User.findOneAndUpdate({ppname: req.body.recipient}, {$inc: {coins: parseInt(amount)}}, {returnNewDocument: true, useFindAndModify: false}, (err) => {
                                    if (err) {
                                        res.json({
                                            "status": "error",
                                            "message": "Could not save this transfer - Something went wrong with updating the users coins (recipient)"
                                        });
                                    }
                                })
                            }
                        })
                        res.json({
                            "status": "success",
                            "data": {
                                "transfer": doc
                            }
                        });
                    }
                })
            }
        }
    })
}

module.exports.getTransferById = getTransferById;
module.exports.getAll = getAllByPpName;
module.exports.create = create;