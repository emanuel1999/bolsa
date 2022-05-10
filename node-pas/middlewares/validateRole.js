const esAdminRol = (req, res, next) => {
  if (!req.userAuth) {
    return res.status(500).json({
      msg: "Se desea verificar el rol sin validar el token primero",
    });
  }
  const {roleId, email} = req.userAuth;

  if (roleId !== 1) {
    return res.status(401).json({
      msg: `${email} no puede hacer esto ya que no es un administrador`,
    });
  }
  next();
};

module.exports = {esAdminRol};
