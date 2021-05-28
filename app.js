const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiTransfersRouter = require('./routes/api/v1/transfers');
const apiTransferRouter = require('./routes/api/v1/transfer');
const apiLeaderboardRouter = require('./routes/api/v1/leaderboard');
const passport = require('./passport/passport');
const config =require('config');
const { MongoClient } = require("mongodb");
const Express = require("express");
const BodyParser = require("body-parser");
const mongodb = require("mongodb");


const app = express();

//autocomplete code


const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(config.get('Database.conn'), {useNewUrlParser: true, useUnifiedTopology: true});


const client = mongodb.MongoClient.connect('mongodb+srv://pepeNodejs:JveOjfDtSChrDZ5F@cluster0.mxvxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' );
const conn = mongoose.createConnection().setClient(await client);

conn.getClient(); // MongoClient { ... }


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));


app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/leaderboard', apiLeaderboardRouter);
app.use('/api/v1/transfers', passport.authenticate('jwt', {session: false}), apiTransfersRouter);
app.use('/api/v1/transfer', apiTransferRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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

let collection = getAll();

app.get("/search", async (request, response) =>{
  try{
    let result = await collection.aggregate([
      {
        "$search": {
          "autocomplete":{
            "query": `${request.query.term}`,
            "path": "ppname",
            "fuzzy": {
              "maxEdits": 2
            }
          }
        }
      }
    ]).toArray();
    response.send(result);
  }catch(e){
    response.status(500).send({message: e.message});
  }
})

// app.listen("3001", async ()=>{
//   try{
//     await client.connect();
//     collection = client.db("myFirstDatabase").collection("users");
//   }catch (e){
//     console.error(e);
//   }
// });


module.exports = app;
