'use strict';
const db = require('../models');


const activitiesController = {
    getActivities: async (req,res)=>{
        try {
            const data = await db.Activity.findAll();
            return res.status(200).json(data);
        } catch (error) {
           res.status(400).json("error getting activities"+ error)
        }   
    },
    postActivities: async (req,res)=>{        
        const { name, content, image } = req.body;        
        try {
            const data = await db.Activity.create({name, content, image});
            return res.status(200).json(data);
        } catch (error) {
           res.status(400).json("error creating activity"+ error)
        }   
    },
    updateActivity: async (req,res)=>{        
        const idToUpdate = req.params.id;
        const { name,content,image } = req.body;

        try {
            const data = await db.Activity.findByPk(idToUpdate);     
            
             await data.update({
                 name,
                content,
                 image                   
             });
            
               
            return res.status(200).json(data);
        } catch (error) {
           res.status(400).json("error creating activity"+ error)
        }   
    }
}

module.exports = activitiesController;