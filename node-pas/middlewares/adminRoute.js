const adminRoute=async (req,res,next)=>{
    const userLogged=req.session.userLogged
    if (!userLogged||userLogged.roleId!=1) {
        let response={
            status:403,
            statusMessage:'No tiene permiso para realizar esta operación'
        }    
        return res.status(403).json(response)
    } else {
        return next()
    }
}

module.exports=adminRoute