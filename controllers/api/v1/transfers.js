const Transfer = require('../../../models/Transfer');

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
    transfer.save((err, doc) => {
       if (err) {
           res.json({
               "status": "error",
               "message": "Could not save this transfer"
           });
       }
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "transfer": doc
                }

            });
        }
    })
}

// module.exports.getHistory = getHistory;
module.exports.getTransferById = getTransferById;
module.exports.getAll = getAllByPpName;
module.exports.create = create;