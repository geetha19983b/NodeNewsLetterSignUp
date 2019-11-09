const express = require("express");
const app=express();
const request=require("request");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var emailAddr=req.body.emailAddr;
  var data = {
    members:[
      {
        email_address:emailAddr,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
   var options = {
     url:"https://us5.api.mailchimp.com/3.0/lists/f39d304b8a",
     method:"POST",
     headers:{
       "Authorization":"angela1 c53a7fd7017fcf96d73f098a36df50e7-us5"
     },
     body:jsonData
   };
   request(options,function(error,response,body){
     if(error)
     {
       res.sendFile(__dirname + "/failure.html");
     }
     else
     {
       if(response.statusCode === 200)
       {
         res.sendFile(__dirname +"/success.html");
       }
       else
       {
         res.sendFile(__dirname +"/failure.html");
       }
     }
   });
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function() {
//app.listen(3000,function() {
  console.log("Server is running on port 3000");

});
//api key
// c53a7fd7017fcf96d73f098a36df50e7-us5
//audience
//f39d304b8a
