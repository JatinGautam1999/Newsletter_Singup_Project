

const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));
app.post("/" , function(req , res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data ={
    members: [
      {
        email_address : email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME : lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/c08500815c";

  const options = {
    method: "POST",
    auth: "jatin1:a2dd40c876c08a9d48f6857dc378e8ed-us6"
  };
  const request = https.request(url , options , function(response){
    if(response.statusCode == 200){
      res.sendFile(__dirname + "/success.html");
    }

    else {
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data" , function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.get("/" , function(request , response){
  response.sendFile(__dirname + "/signup.html");
});
//For Failure Function
app.post("/failure" , function (req , res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000 , function(){
  console.log("Server has started at port 3000");
});



//API Key
//a2dd40c876c08a9d48f6857dc378e8ed-us6

//LIST ID
//c08500815c
