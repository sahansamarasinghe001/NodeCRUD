var userDB = require('../model/model');

//create and save new user
exports.create = (req,res)=>{
   
    //validate
    if(!req.body){
        return res.status(400).send({message :"Content cannot be empty"});
        
    }

    //new user
    const user = new userDB({
      
        name : req.body.Name,
        email: req.body.Email,
        gender: req.body.Gender,
        status: req.body.Status
  
    });

    //save user in the database.
    user.save(user).then(data =>{ //res.send(data)
    
     res.redirect("/add-user");
    }).catch(err=>{
        res.status(500).send({ message: err.message || "Some error occured" });
    });



}

//retrieve and return all users || single user
exports.find = (req,res)=>{

    if(req.query.id){

        const id = req.query.id;
        userDB.findById(id).then(data=>{ 
            if(!data){
             
                res.status(404).send({ message:"User not found"})
            }else{
                res.send(data)
            }
        }).catch(err=>{
        res.status(500).send({ message: err.message || "Some error occured in finding User" });
        });
    }else{
        
        userDB.find().then( user=>{res.send(user)}).catch(err=> res.status(500).send({message : err.message || "error in retrieving"}))
    }

 
}

//update user
exports.update = (req,res)=>{

    //validate
    if(!req.body){
        return res.status(400).send({message :"Data update cannot be empty"});
        
    }

    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(400).send({message :"cannot update user"});
        }else{
            res.send(data)
        }

    })
    .catch(err=>{
        res.status(500).send({ message: err.message || "Some error occured in Updating" });
    });
 

}

//delete user with specified user id
exports.delete = (req,res)=>{

    const id = req.params.id;
    
    userDB.findByIdAndDelete(id).then( data=>{

        if(!data){
            res.status(404).send({message :"cannot Delete user"});
        }
        else{
            res.send({
                message: "User Deleted successfully"
            })
        }

    }).catch(err=>{
        res.status(500).send({ message: err.message || "Some error occured in Deleting" });
    });

}