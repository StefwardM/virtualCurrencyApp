const Transfer = require('../../../models/Transfer');

const getHistory = (req, res) => {
    Transfer.find((err, docs) => {
        if(err) {
            res.json({
                "status": "error",
                "message": "There is not history available."
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

module.exports.getHistory = getHistory;