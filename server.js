const express = require("express");
const bodyParser = require("body-parser");
const { request, response } = require('express');
const { verifyAccount, createAccount, getUserPosts, getPostsById, updatePosts, savePosts, getPublicPosts, getPublicPostsById, getEmail, getSharedIds, shareTheLog, getSharedLogs, getSharedIdsByUsername, getAllPosts, getSharedPostsById } = require("./backend");
const app = express();
var formidable = require('formidable');
var fs = require('fs');
const path = require('path')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.post("/loginChecks",(request,response)=>{

    verifyAccount(request.body.username).then((data)=>{

        if(data.length == 0)
        {
            response.send(false);
        }

        let returnedPassword= data[0].password;

        let bufferObj = Buffer.from(returnedPassword, "base64");
        // Encode the Buffer as a utf8 string
        let decodedString = bufferObj.toString("utf8");
        

        if(decodedString === request.body.password)
        {
            response.send(true);
        }
        else
        {
            response.send(false);
        }
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/createAccount",(request,response)=>{

    createAccount(request.body.username,request.body.password,request.body.email).then((data)=>{

        if(data)
        {
            response.send(true);
        }
        else
        {
            response.send(false);
        }

        
    }).catch((err)=>{
        console.log(err);
    })
})


app.post("/userPosts",(request,response)=>{

    getUserPosts(request.body.username).then((data)=>{
            response.send(data);
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/getPostById",(request,response)=>{

    getPostsById(request.body.id,request.body.username).then((data)=>{
            response.send(data);
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/uploadFile",(request,response)=>{

    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      var oldpath = files.upload.path;
      var newpath =  path.join(__dirname + '/data/')+ files.upload.name;
      fs.readFile(oldpath, function (err, data) {
        if (err) {response.send(false);}
        // console.log('File read!');
        // console.log(data);
        // console.log(files.upload.name);
        // Write the file
        fs.writeFile(newpath, data, function (err) {
        if (err) {response.send(false);};
        response.send(true);
        });

        });

        if(err)
        {
            response.send(false);
        }
    })
})

app.post("/updatePosts",(request,response)=>{
    console.log("Comes into update api");
    updatePosts(request.body).then((data)=>{
        console.log("Update was successful");
        response.send(data);
}).catch((err)=>{
    console.log(err);
})

})

app.post("/savePosts",(request,response)=>{
    console.log("Comes into save api");
    savePosts(request.body).then((data)=>{
        console.log("save action was successful");
        response.send(data);
}).catch((err)=>{
    console.log(err);
})

})

app.get("/getPublicPosts",(request,response)=>{
    getPublicPosts().then((data)=>{
        response.send(data);
    }).catch(err=>{
        console.log(err);
    })
})

app.post("/getPublicPostsById",(request,response)=>{
    getPublicPostsById(request.body.id).then(data =>{
        response.send(data);
    }).catch( err =>{
        console.log(err);
    })
})

app.get("/downloadFiles",(request,response) =>{
   
    var file = __dirname + '/data/'+ request.query.name;
    response.setHeader('Content-disposition', 'attachment; filename=' + file);
    response.download(file);
    
})

app.post("/getEmail",(request,response)=>{
    getEmail(request.body.username).then( data =>{
        response.send(data);
    }).catch(err =>{
        console.log(err);
    })
})

app.post("/getIds",(request,response)=>{
    getSharedIds(request.body.email).then( data =>{
        response.send(data);
    }).catch(err =>{
        console.log(err);
    })
})

app.post("/shareLogs",(request,response)=>{
    shareTheLog(request.body.email,request.body.id).then( data =>{
        response.send(data);
    }).catch(err =>{
        console.log(err);
    })
})

app.post("/profileSharedLogIds",(request,response)=>{
    getSharedIdsByUsername(request.body.username).then( data =>{
        response.send(data);
    }).catch(err =>{
        console.log(err);
    })
})

app.post("/getSharedById",(request,response)=>{
    getSharedPostsById(request.body.id).then( data =>{
        response.send(data);
    }).catch(err =>{
        console.log(err);
    })
})

app.get("/getAllPosts",(request,response)=>{
    getAllPosts().then( data =>{
        response.send(data);
    }).catch(err =>{
        console.log(err);
    })
})



app.listen(9798,()=>{
    console.log("Server is up!")
});