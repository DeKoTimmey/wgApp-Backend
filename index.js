var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));

var liste = [];
var lights = [false,false,false,false];

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



app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
