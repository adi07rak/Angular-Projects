const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const router =express.Router();
const bodyParser = require("body-parser");
const jwt =require("jsonwebtoken");
const winston = require("winston");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
  origin:"http://localhost:4200"
})); 

winston.add(winston.transports.File,{filename:"./log/logfile.log"});

const db_connect = config.get("db.conn_url");
mongoose.connect(db_connect,{useNewUrlParser:true})
.then(()=>{
    winston.log("info","Database connected!!");
})
.catch((ex)=>{
    winston.log("error",ex.message);
});
var Schema = mongoose.Schema;
var userSchema = new Schema({
    uname : {type:String, unique:true, lowercase:true,required:true},
    password : {type:String, required:true},
    fname : {type:String, required:true},
    lname : {type:String, required:true},
    phone : {type:String, required:true},
    gen : {type:String, required:true}
});
var userModel = mongoose.model('user',userSchema);
app.post("/signup",(req,res)=>{
    //console.log(req.body);
    var um = new userModel();
    um.uname = req.body.uname;
    um.password = req.body.password;
    um.fname = req.body.fname;
    um.lname = req.body.lname;
    um.phone = req.body.phone;
    um.gen = req.body.gen;
    //console.log(um);
    um.save((err,data)=>{
      if(err){
        res.send("error");
        //console.log(err);
        
      }
      else{
        res.status(200).send(data);
      }
    })
  });

app.post("/auth",async (req,res)=>{
  var login = req.body;
  
  var result1 = await userModel.find({uname:login.uname,password:login.password});
  if (result1.length==1){
      var res_user = result1[0].fname;
      var token = jwt.sign({"username":res_user},'iambatman',{expiresIn : '1h'});
      res.status(200).send({
        isLoggedIn:true,
        token:token
      });
  }else{
      res.send({
        isLoggedIn:false,
      });
    }
}); 

app.use((req, res, next)=>{
  var token = req.body.token || req.query.token || req.headers.token;
  //console.log("this is my token first");
  //console.log(token);
    if(!token){
    // console.log("token not fount");
      res.send("_");
    }
    else{
      jwt.verify(token,'iambatman',(err,decoded)=>{
        if(!err){
          //console.log(decoded);
          username = decoded.username;
          next();
        }
        else{
          res.send("Invalid");
      }
    });
  }
});
  


var postSchema = new Schema({
    fname : {type:String},
    p_title : {type:String},
    p_body : {type:String},
    p_imp :[String]
    //p_u_like:{type:Boolean}
});
var postModel = mongoose.model("posts",postSchema);
app.post("/createpost",(req,res)=>{
    //console.log(req.body);
    var pm = new postModel();
    pm.fname = username;
    pm.p_title = req.body.p_title;
    pm.p_body = req.body.p_body;
    pm.p_imp = [];
    //pm.p_u_like = false;
    winston.log("info",pm);
    pm.save((err,data)=>{
        if(err){res.send("error");
      winston.log("error","no good");
      }else{res.send({mes:"done"});
    winston.log("info","everything fine.");
    }
    });
});

var commentSchema = new Schema({
    
    p_id : {type:String,required:true},
    fname : {type:String,required:true},
    c_body : {type:String,required:true}
});
var commentModel = mongoose.model("comments",commentSchema);

app.post("/createcomment",(req,res)=>{
    //console.log(req.body);
    var cm = new commentModel();
    
    cm.p_id = req.body.p_id;
    cm.fname = username;
    cm.c_body = req.body.c_body;
    //console.log(cm);
    
    cm.save((err,data)=>{
        if(err){res.status(403).send({res:"yoo"});}
        else{res.status(200).send({res:data});}
    });
});



app.get("/get_post",async (req,res)=>{
    try{
      const result = await postModel.find();
      res.status(200).send(result);
    }catch{
      res.status(403).send(ex.message);
    }
    
});

app.post("/like", (req,res)=>{
  
  
  postModel.find({_id:req.body._id,p_imp:username}).then((data,err)=>{
      if(data.length==0){
        
        postModel.updateOne({_id:req.body._id},{ $push: {p_imp:username } }).then((err,data)=>{
          //postModel.updateOne({_id:req.body._id},{p_u_like:true}).then();
          res.status(200).send({res: data});
         
          
        });
        
      }else{
        
        postModel.updateOne({_id:req.body._id},{$pull :{p_imp:username}}).then((err,data)=>{
          //postModel.updateOne({_id:req.body._id},{p_u_like:false}).then();
          res.status(200).send({res:data});
          
        });
        const lk =false;
        
      }
  });
}); 

app.post("/delete",async (req,res)=>{
  try{
    const result = await postModel.deleteOne({_id:req.body._id});
    res.status(200).send(result);
  }catch(ex){
    res.send(403).send(ex.message);
  }
  //console.log(req.body._id);
  
});

app.get("/getuname", (req,res)=>{
  try{
    const result = username;
    winston.log("info",result);
    
    res.status(200).send({res:result});
  }catch(ex){
    res.status(403).send(ex.message);
  }
});

app.post("/show_comments",async (req,res)=>{
  //console.log(req.body);
  try{
    const result = await commentModel.find({p_id:req.body._id});
    //console.log(result);
    res.status(200).send({res:result});
    
  }catch(ex){
    res.status(403).send({res:ex.message});
  }
  
  
});

app.post("/edit_post",async (req,res)=>{
  try{
    const result = await postModel.updateOne({_id:req.body._id},{p_title:req.body.p_title,p_body:req.body.p_body});
    res.status(200).send({res:result});

  }catch(ex){
    res.status(403).send(ex.message);
  }
  
});

app.post("/get_detail",async (req,res)=>{
  try{
    const result= await postModel.find({_id:req.body._id});
    res.status(200).send({res:result});
  }catch(ex){
    res.status(403).send(ex.message);
  }
});

app.listen(3000,()=>{
    winston.log("info","server is running @loacalhost: 3000");
    
});