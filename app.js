const express = require('express');
const app = express();
const path = require('path');
const createError = require('http-errors');
require('dotenv').config();

/* Server */
app.listen(process.env.PORT||3000, ()=>{
  console.log('http://127.0.0.1:' + process.env.PORT);
});

/* Setting */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.locals.pretty = true;

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/', express.static(path.join(__dirname, './public')));

/* Router */
const boardRouter = require('./routes/board');
app.use('/board', boardRouter);

/* 예외처리 */
app.use((req, res, next)=>{
  // next('message');
  next(createError(404));
})
app.use((err, req, res, next)=>{
  // res.send(err);
  // res.send(err.message + err.status);
  // locals > view engine 이 갖고있는 전역변수
  res.locals.message = err.message;
  res.locals.status = (err.status || 500) + "error";
  res.render('error');
})