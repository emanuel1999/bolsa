const db = require("../models");
const {Slide} = require("../models");

const getAllSlide = async (req, res) => {
  const slides = await Slide.findAll();
  res.status(200).json({slides});
};

const getSlideById = async (req, res) => {
  const {id} = req.params;
  const slides = await Slide.findByPk(id);
  res.status(200).json({slides});
};

const createSlide = async (req, res) => {
  const {body} = req;
  try {
    const slide = new Slide(body);
    await slide.save();
    return res.status(200).json({msg: "Slide creado con exito!"});
  } catch (error) {
    return res.status(500).json({
      msg: `El Slide no pudo ser creado`,
    });
  }
};
const putSlide = async (req, res) => {
  const {body} = req;
  const {id} = req.params;
  try {
    const slide = await Slide.findByPk(id);
    await slide.update(body);
    return res.status(200).json({
      msg: "Slide actualizado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el DBA",
    });
  }
};

const deleteSlide = async (req, res) => {
  const {id} = req.params;
  try {
    await Slide.destroy({
      where: {
        id,
      },
    });

    return res.json({msg: `Slide con ID : ${id} Borrado con exito`});
  } catch (error) {
    return res
      .status(500)
      .json({msg: `No se pudo eliminar Slide con ID ${id} `});
  }
};

module.exports = {
  getAllSlide,
  getSlideById,
  createSlide,
  putSlide,
  deleteSlide,
};
