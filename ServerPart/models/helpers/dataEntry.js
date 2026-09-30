module.exports=function (user,reqBody) {
    user.name = reqBody.name;
        if(reqBody.email)
        user.email = reqBody.email;
        if(reqBody.username)
        user.username = reqBody.username;
        if(reqBody.phoneNumber)
        user.phoneNumber = reqBody.phoneNumber;
        if(reqBody.age)
        user.age = reqBody.age;
        if(reqBody.gender)
        user.gender = reqBody.gender;
        // if(reqBody.tempAddress || reqBody.permAddress)
        //     user.address = {
        //     tempAddress: typeof (reqBody.tempAddress) === 'string' && reqBody.tempAddress.split(','),
        //     permAddress : reqBody.permAddress,
        // }
    if (reqBody.tempAddress) {
        typeof (reqBody.tempAddress) === 'string' ? user.address.tempAddress = reqBody.tempAddress.split(',') : user.address.tempAddress = null;
        }
        if (reqBody.permAddress)
        user.address.permAddress=reqBody.permAddress
        if(reqBody.status)
        user.status = reqBody.status;
        if(reqBody.dob)
        user.dob = reqBody.dob;
        if(reqBody.role)
        user.role = reqBody.role;
        if(reqBody.password)
        user.password = reqBody.password;
    
}