const User = require('../../../models/User');

const getLeaderboard = (req, res) => {
    let sortCoins = {coins: "descending"};
    User.find( (err, docs) => {
        if(err) {
            res.json({
                "status": "error",
                "message": "There is no leaderboard available"
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
    }).sort(sortCoins);
}

module.exports.getLeaderboard = getLeaderboard;
