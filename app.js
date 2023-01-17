const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');


const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", function(req, res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const emailid=req.body.email;
    

    const data={
        members: [
{
    email_address:emailid,
    status:"subscribed",
    merge_fields:{
        FNAME:firstname,
        LNAME: lastname,
    }
}
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us12.api.mailchimp.com/3.0/lists/0714bf9844";

    const options={
        method: "POST",
        auth:"prince12:0b7f18b642c23a64d5aab6977b186908-us12"
    }

    const request=https.request(url, options, function(response){

        if(response.statusCode==200){
           res.sendfile(__dirname+"/success.html")
        }
        else{
            res.sendfile(__dirname+"/failure.html")
        }
          response.on("data", function(data){
            console.log(JSON.parse(data));
          })
    })

    request.write(jsonData);
    request.end();
   
})

app.listen(process.env.PORT, function(){
    console.log("The server is on || 3000");
})
//api key
// 0b7f18b642c23a64d5aab6977b186908-us12

//list id
//0714bf9844