const Transfer = require('../../../models/Transfer');

const getAll = (req, res) => {
    Transfer.find({"sender": "Stefan"}, (err, docs) =>{
        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "transfer": docs
                }
            });
        }
    });
}

const create = (req, res, next) => {
    console.log(req.body);

    let transfer = new Transfer();
    transfer.sender = req.body.sender;
    transfer.recipient = req.body.recipient;
    transfer.message = req.body.message;
    transfer.amount = req.body.amount;
    transfer.save((err, doc) =>{
        if(err){
            res.json({
                "status":"error",
                "message":"could not save this transfer item"
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