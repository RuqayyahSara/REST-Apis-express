const express = require("express");
const config=require("config");

// importing files
const dbConnect = require("./dbConnect");
const Form=require("./models/Form");

// setup express
const app = express();

// setup port
const port = process.env.PORT || config.get("port");

// middlewares
app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));


// GET request - Read by Id
app.get("/:id", (req,res)=>{
    Form.find({email:req.params.id} ,(err,data)=>{
        if(err){
            res.status(404).send("Cannot retrive data"); 
        }
        res.json(data);
    });
});

// GET request - Read all
app.get("/", (req,res)=>{
    Form.find({} ,(err,data)=>{
        if(err){
            res.status(404).send("Cannot retrive data"); 
        }
        res.json(data);
    });
});


// POST request - Create
app.post("/login",(req,res)=>{
    var newForm = new Form(req.body);
    newForm.save((err)=>{
        if(err){
            res.status(404).send("Error in saving to database");
        }
        res.json(newForm);        
    });
});


// PUT request - Update by passing Id
app.put("/:id",(req,res)=>{
    Form.findById(req.params.id , (err,newForm)=>{
        if(err)
            throw err;
    newForm.email = req.body.email;
    newForm.password = req.body.password;
    newForm.save((err)=>{
        if(err){
            res.status(404).send("Error in updating database");
        }
        res.json(newForm);
          });
        });     
});


// DELETE request - Delete by passing Id 
app.delete("/:id",(req,res)=>{
    Form.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            throw err;
        }
        res.send("Data has been successfully deleted.");
    });
});

// DELETE request - Delete all
app.delete("/",(req,res)=>{
    Form.remove({}, (err)=>{
        if(err){
            throw err;
        }
        res.send("Data has been successfully deleted.");
    });
});

app.listen(port,(err)=>{
    if(err)
    throw err;
    console.log(`Connected to server on port ${port}`);
})