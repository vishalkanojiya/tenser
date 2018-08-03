var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
	next();
});

var r = require('rethinkdbdash')({
    port: 28015,
    host: 'localhost',
    db: 'test'
})
app.post('/HelloWorld',function(req, res){
    console.log("Message Get", req.query)
    r.table('user')
    .insert(req.body)
    .run()
    .then(function (response){
        console.log('Success', response);
        res.send(response)
    })
    .error(function (err){
        console.log('error occurred', err);
        res.send(err)
    })  
})
app.get('/HelloWorld',function(req,res){
console.log("Message gotiot", req.query)
r.table('user').run().then(function(result){
    res.send(result)
})
.error(function (err){
    res.send(err)
})

})
app.post('/data', function (req, res) {
  console.log("Message Post",req.query, req.body)
  r.table("tenserdata")
     .insert(req.body)
     .run()
     .then(function (response) {
      console.log('Success ', response)
      res.send(response)
    })
    .error(function (err) {
      console.log('error occurred ', err)
      res.send(err)
    })
});
app.get('/data', function(req,res) {
  console.log("Message GET", req.query);
  r.table('tenserdata').run().then(function(result){
    res.send(result)
  })
  .error(function(err){
    console.log('error occured',err);
    res.send(err)
  })
});

app.get('/data/:id', function(req,res) {
  console.log("Message GET", req.query);
  r.table('tenserdata').get(req.params.id).run().then(function(result){
    res.send(result)
  })
  .error(function(err){
    console.log('error occured',err);
    res.send(err)
  })
});
app.delete('/data/:id', function (req,res) {
  console.log("Message Delete", req.query, req.params);
  r.table('tenserdata').get(req.params.id)
  .delete()
  .run()
   .then(function (response) {
     console.log('Success', response);
     res.send(response)     
  })
  .error(function (err) {
    console.log('error occured', err);
    res.send(err)
  })
});

app.put("/data/:id", function (req, res) {
  console.log("Message PUT", req.query,req.params)
  r.table("tenserdata").get(req.params.id)
   .update(req.body)
   .run()
   .then(function (response) {
    console.log('Success ', response);
    res.send(response)
  })
  .error(function (err) {
    console.log('error occurred ', err);
    res.send(err)
  })
});
app.patch("/data/:id", function (req, res) {
  console.log("Message PATCH")
  r.table("tenserdata").get(req.params.id)
   .update(req.body)
   .run()
   .then(function (response) {
    console.log('Success ', response);
    res.send(response)
  })
  .error(function (err) {
    console.log('error occurred ', err);
    res.send(err)
  })
});
app.listen(3000)
