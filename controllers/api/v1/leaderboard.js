const Leaderboard = require('../../../models/Leaderboard');

const getLeaderboard = (req, res) => {
    Leaderboard.find().sort({"coins": req.user.coins}).toArray (err, res) => {
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

module.exports.getLeaderboard = getLeaderboard();
