const mysql = require('mysql');

let JDBCconnection = null;

const getConnection = ()=>{
     if(JDBCconnection == null)
     {
         JDBCconnection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     }
     else
     {
         return JDBCconnection
     }

     return JDBCconnection
}

const verifyAccount = (username) =>{
    return new Promise(function(resolve,reject) { 
  
    var connection = mysql.createConnection({
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'davidsilva',
        database: 'artemisLunarMission'
    });
 
    
    connection.connect()
    
    connection.query('SELECT hashpassword as password FROM loginDetails WHERE username=?',[username], function (error, results, fields) {
        if (error){ reject(error) };
        resolve(results);
        });
    
    connection.end();
            
    });
   
  }

  const createAccount = (username,password,email) =>{
    return new Promise(function(resolve,reject) { 
  
    var connection = mysql.createConnection({
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'davidsilva',
        database: 'artemisLunarMission'
    });
 
    
    connection.connect()

    // Create buffer object, specifying utf8 as encoding
    let bufferObj = Buffer.from(password, "utf8");
  
    // Encode the Buffer as a base64 string
    let base64String = bufferObj.toString("base64");


    connection.query('INSERT INTO loginDetails (username,email,hashpassword,token) VALUES (?,?,?,null)',[username,email,base64String], function (error, results, fields) {
        if (error){ console.log(error);reject(false) };
        resolve(true);
        });
    
    connection.end();
            
    });
   
  }


  const getUserPosts =(username)=>{

    return new Promise(function(resolve,reject) { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect()
        
        connection.query('SELECT id as id,subject as subject,context as context,access as access,username as username,email as email,files as files, postTime as postTime FROM posts WHERE username=?',[username], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        connection.end();
                
        });

  }

  const getPublicPosts =(username)=>{

    return new Promise(function(resolve,reject) { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect()
        
        connection.query('SELECT id as id, subject as subject,context as context,access as access,username as username,email as email,files as files, postTime as postTime FROM posts WHERE access="Public" order by postTime',[username], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        connection.end();
                
        });

  }


  const getPostsById =(id,username)=>{

    return new Promise(function(resolve,reject) { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect()
        
        connection.query('SELECT subject as subject,context as context,access as access,username as username,email as email,files as files, postTime as postTime FROM posts WHERE username=? and id=?',[username,id], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        connection.end();
                
        });

  }

  const updatePosts = (data)=>{
        console.log(data);
    return new Promise(function(resolve,reject) { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect()
        
        connection.query('UPDATE posts SET subject = ?, context=?, access=?, files=? ,postTime=? WHERE username = ? and id = ?',[data.subject,data.context,data.access,data.files,data.postTime,data.username,data.id], function (error, results, fields) {
            if (error){ 
                console.log(error);
                reject(false) };
            resolve(true);
            });
        
        connection.end();
                
        });


  }

  const savePosts = (data) =>{
    return new Promise(function(resolve,reject) { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect()
        
        connection.query('INSERT INTO posts (subject,context,access,username,email,files,postTime) VALUES(?,?,?,?,?,?,?)',[data.subject,data.context,data.access,data.username,data.email,data.files,data.postTime], function (error, results, fields) {
            if (error){ 
                console.log(error);
                reject(false) };
            resolve(true);
            });
        
        connection.end();
                
        });
  }

  const  getPublicPostsById = (id) =>{
    return new Promise(function(resolve,reject) { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect()
        
        connection.query('SELECT subject as subject,context as context,access as access,username as username,email as email,files as files, postTime as postTime FROM posts WHERE access="Public" and id=?',[id], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        connection.end();
                
        });

  }

  const getEmail = (username) =>{
    return new Promise(function(resolve,reject) { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect()
        
        connection.query('SELECT email as email FROM loginDetails WHERE username=?',[username], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        connection.end();
                
        });
  }

  const getSharedIds = (email) =>{
    return new Promise(function(resolve,reject) { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect()
        
        connection.query('SELECT shareLogIds FROM loginDetails WHERE email=?',[email], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        connection.end();
                
        });
  }

  function shareTheLog(email,id)
  {
    return new Promise(async (resolve,reject)=> { 
        
        let tempIds = '';

        const getIds = await getSharedIds(email);

        tempIds = getIds[0].shareLogIds;

        if(tempIds == null)
        {
            tempIds = id
        }
        else
        {
            tempIds = tempIds + "," + id;
        }

        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect()
        
        connection.query('UPDATE loginDetails SET shareLogIds= ? WHERE email=?',[tempIds,email], function (error, results, fields) {
            if (error){ reject(false) };
            resolve(true);
            });
        
        connection.end();
                
        });
  }

  const getSharedIdsByUsername = (username) =>{
    return new Promise((resolve,reject)=> { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect();
        
        connection.query('SELECT shareLogIds FROM loginDetails WHERE username = ?',[username], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        connection.end();
                
        });
   
  }

  const getAllPosts = () =>{
    return new Promise((resolve,reject)=> { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect();
        
        connection.query('SELECT subject as subject,context as context,access as access,username as username,email as email,files as files, postTime as postTime, id as id FROM posts', function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        connection.end();
                
        });
  }

const getSharedPostsById = (id) =>{
    return new Promise((resolve,reject)=> { 
  
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'davidsilva',
            database: 'artemisLunarMission'
        });
     
        
        connection.connect();
        
        connection.query('SELECT subject as subject,context as context,access as access,username as username,email as email,files as files, postTime as postTime, id as id FROM posts where id = ?',[id] ,function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        connection.end();
                
        });
  }

module.exports={verifyAccount,createAccount,getUserPosts,getPublicPosts,getPostsById,updatePosts,savePosts,getPublicPostsById,getEmail,getSharedIds,shareTheLog,getSharedIdsByUsername,getAllPosts,getSharedPostsById}