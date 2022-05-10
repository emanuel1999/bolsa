const db=require("../models/index")

const testimonialsControler={
    list: async (query)=>{
        const testimonials=await db.testimonial.findAndCountAll({
            raw:true,
            attributes:['id','name','image','content'],
            limit:10,
            offset:query
        })
        return testimonials
    },
    create: async (testimonial)=>{
        const testimonialCreated= await db.testimonial.create(testimonial)
        return testimonialCreated
    },
    findByPk: async (id)=>{
        const testimonial= await db.testimonial.findByPk(id)
        return testimonial
    },
    update: async (data,id)=>{
        const testimonialUpdate= await db.testimonial.update(data,{where:{id:id}})
        return testimonialUpdate
    },
    destroy:async(id)=>{
        const countRowDestroy= await db.testimonial.destroy({where:{id:id}})
        return countRowDestroy
    }

}

module.exports=testimonialsControler