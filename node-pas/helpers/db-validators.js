const {Slide} = require("../models");

const existeSlidePorID = async (id) => {
  const existeSlide = await Slide.findOne({where: {id, deletedAt: null}});
  if (!existeSlide) {
    throw new Error(`Slide con ID:${id} no existe`);
  }
};

module.exports = {existeSlidePorID};
