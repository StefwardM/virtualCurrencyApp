const Transfer = require('../../../models/Transfer');

const getAll = (req, res) => {

    Transfer.find({"sender": req.user._id}, (err, docs) => {
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "transfers": docs

                }
            });
        }
    });

}


const create = (req, res) => {
    console.log(req.body);

    let transfer = new Transfer();
    transfer.sender = req.body.sender;
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

        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "transfer": doc
                }
            });
        }
    })


}

module.exports.getAll = getAll;
module.exports.create = create;