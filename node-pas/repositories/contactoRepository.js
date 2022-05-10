'use strict';
const db= require('../models');

const updateContacto= async (data,id)=>{
    const updateData= await db.Contacto.update({
        facebook:data.facebook,
        instagram:data.instagram,
        linkedin:data.linkedin
        
    },{
        where:{
          id:id,
        }
    });
    
    return updateData
}

module.exports={updateContacto};