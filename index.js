var express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const passport = require("passport");
const users = require("./routes/api/users");



app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));

var liste = [];
var massages = [];
var lights = [false,false,false,false];


const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


  // Passport middleware
  app.use(passport.initialize());
  // Passport config
  require("./config/passport")(passport);
  // Routes
  app.use("/api/users", users);



/*--------------------------------------------------------------------------------------------*/
/*-----------------------------------------LIGHTS---------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/

app.get('/lights', function (req, res) {
  res.json({
    success: true,
    lightStates: lights
  })
});

app.post('/toggleLights', function (req, res) {
  const postBody = req.body;// {index: 1}

  lights[postBody.lightStates] = !lights[postBody.lightStates];

  res.json({
    success: true
  });
});


/*--------------------------------------------------------------------------------------------*/
/*-----------------------------------------TODOS---------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/

app.get('/todos', function (req, res) {
  res.json({
    success: true,
    list: liste
  })
});

app.post('/add', function (req, res) {
  const postBody = req.body; // {title: "wäsche", user: "tim"}
  console.log(postBody);


  liste.push({
    title: postBody.title,
    user: postBody.user,
    date: Number(new Date()),
    checked: false
  });

  res.json({
    success: true
  });
});

app.post('/toggleTodo', function (req, res) {
  const postBody = req.body;// {index: 1}
  console.log(postBody);

  liste[postBody.index].checked = !liste[postBody.index].checked;

  res.json({
    success: true
  });
});

app.post('/remove', function (req, res) {
  const postBody = req.body;// {index: 1}
  console.log(postBody);


  liste.splice(postBody.index, 1);

  res.json({
    success: true
  });
});

app.post('/removeAllChecked', function (req, res) {
  const postBody = req.body;// {index: 1}
  console.log(postBody);
  liste = liste.filter((val)=>{return val.checked == false;})
res.json({
  success: true
});

});

/*--------------------------------------------------------------------------------------------*/
/*-----------------------------------------CHAT---------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/


app.get('/massages', function (req, res) {
  res.json({
    success: true,
    massageList: massages
  })
});

app.post('/addMassage', function (req, res) {
  const postBody = req.body; // {title: "wäsche", user: "tim"}
  console.log(postBody);


  massages.push({
    content: postBody.content,
    user: postBody.user,
    time: postBody.time
  });

  res.json({
    success: true
  });
});


/*--------------------------------------------------------------------------------------------*/
/*-----------------------------------------LISTENER---------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/


app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
