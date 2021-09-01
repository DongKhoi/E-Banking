let controller={};
let models=require('../models');
let User=models.User;

controller.createUser=async(user)=>{
    return await User.create(user);
};

controller.getUserByEmail= async(email)=>{
    return await User.findOne({
        where:{email: email}
    });
};

controller.getUserById= async(Id)=>{
    return await User.findOne({
        where:{id:Id}
    });
};

// controller.updateUser=async(user)=>{
//     return await User.update({user},{
//         where:{id:id}
//     });
// };
module.exports=controller;