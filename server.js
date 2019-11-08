var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hr');
var Schema = mongoose.Schema;

userSchema = new Schema( {
  companyname: String,
  profile:String,
  requirements:String,
  position:Number,
  agent:String

}),
UserData = mongoose.model('requirements', userSchema);

module.exports = UserData;

userSchema = new Schema( {
  companyname: String,
  companyaddress:String,
  phonenumber:Number,
  pincode:Number,
  companytype:String

}),
User = mongoose.model('company', userSchema);

module.exports = User;



app.set('assest', path.join(__dirname, 'assest'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/assest'));


app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/get-data', function(req, res) {
  //User.find()
    //  .then(function(doc) {
      //  /*res.render('index.html', {items: doc});*/
        //res.json(doc);
      //});
      User.find({})
      .then(function(result){
            console.log(result + "jjj")
          res.json(result);
          // console.log(result);
  }).catch((e)=>{
    console.log(e)
    res.send(e)
  });

});

app.post('/insert', function(req, res) {
  var item = {
    companyname: req.body.companyname,
    companyaddress: req.body.companyaddress,
    phonenumber: req.body.phonenumber,
    pincode:req.body.pincode,
    companytype:req.body.companytype
  };

  var data = new User(item);
  data.save(function(err, data){
    if(err){
      console.log(err);

    }else{
        console.log(JSON.stringify(data));
        console.log('Success');
        
        
    }
      
      });

  res.redirect('/');
});

app.post('/update', function(req, res) {
  var id = req.body.id;

  User.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.companyname = req.body.companyname;
    doc.companyaddress = req.body.companyaddress;
    doc.phonenumber = req.body.phonenumber;
    doc.pincode = req.body.pincode;
    doc.companytype = req.body.companytype;
    doc.save(function(err, data){
        console.log(JSON.stringify(data))
      });
  })
  res.redirect('/');
});

app.post('/delete', function(req, res, next) {
  var id = req.body.id;
  User.findByIdAndRemove(id).exec();
  res.redirect('/');
});

app.get('/get-data-requirement', function(req, res) {
  //User.find()
    //  .then(function(doc) {
      //  /*res.render('index.html', {items: doc});*/
        //res.json(doc);
      //});
      UserData.find({})
        .then(function(result){
            console.log(result)
            res.json(result);
            // console.log(result);
          }).catch((e)=>{
            console.log(e)
            res.send(e)
          });

});

app.get('/get-company', function(req, res) {
  //User.find()
    //  .then(function(doc) {
      //  /*res.render('index.html', {items: doc});*/
        //res.json(doc);
      //});
      User.find({})
        .then(function(result){
            console.log(result)
            res.json(result);
            // console.log(result);
          }).catch((e)=>{
            console.log(e)
            res.send(e)
          });

});
app.post('/insert-requirement', function(req, res) {
  var item = {
    companyname: req.body.companyname,
    profile: req.body.profile,
    requirements: req.body.requirements,
    position:req.body.position,
    agent:req.body.agent
  };

  var data = new UserData(item);
  data.save(function(err, data){
        console.log(JSON.stringify(data))
      });
      res.redirect('/');
});

app.post('/update-requirement', function(req, res) {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.companyname = req.body.companyname;
    doc.profile = req.body.profile;
    doc.requirements = req.body.requirements;
    doc.position = req.body.position;
    doc.agent = req.body.agent;
    doc.save();
  })
  res.redirect('/');
});

app.post('/delete-requirement', function(req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

app.get('/get-data-dashboard/:id', function(req, res) {
  console.log("here" + req.params.id)
  //User.find()
    //  .then(function(doc) {
      //  /*res.render('index.html', {items: doc});*/
        //res.json(doc);
      //});
      UserData.find({"companyname":req.params.id})
        .then(function(result){
          console.log(result)
          for(let i=0;i<result.length;i++){
            if(result[i].companyname===req.body.companyname)
              console.log(result)
           
          }
           res.json(result);
            
            // console.log(result);
          }).catch((e)=>{
            console.log(e)
            res.send(e)
          });

});




app.listen(3000, function () {
  console.log('Express app listening on port 3000');
}); 




