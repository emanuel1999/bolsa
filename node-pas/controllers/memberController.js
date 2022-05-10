"use strict";
const {Member} = require("../models");

const getMembers = async (req, res) => {
  let {page, size, prevPage} = req.query;

  try {
    const data = await db.Member.findAll({
      limit: size,
      offset: page > 1 ? (page - 1) * size : 0,
    });

    if (data.length <= 0) {
      return res.status(404).json({
        success: true,
        message: "No members found",
        page: page,
        previousPage: prevPage,
      });
    }

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
      page: page,
      nextPage: data.length < 10 ? "none" : page + 1,
      previousPage: prevPage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createMembers = async (req, res) => {
  const {body} = req;
  try {
    const member = new Member(body);
    await member.save();
    return res.status(200).json({msg: "successful creation"});
  } catch (error) {
    return res.status(500).json({
      msg: `error in the creation of member`,
      error,
    });
  }
};

const updateMember = async (req, res) => {
  const {id} = req.params;
  const member = await db.Member.findByPk(id);

  if (member) {
    try {
      const {name, facebookUrl, linkedinUrl, description} = req.body;
      const image = req.file ? req.file.filename : member.image;

      const data = await db.Member.update(
        {
          name,
          facebookUrl,
          linkedinUrl,
          image,
          description,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Member updated successfully",
        data: await db.Member.findByPk(id),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "Member not found",
    });
  }
};

const deleteMember = async (req, res) => {
  const {id} = req.params;
  const member = await db.Member.findByPk(id);

  if (member) {
    try {
      await db.Member.destroy({
        where: {id},
      });
      return res.status(200).json({
        success: true,
        message: "Member deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "Member not found",
    });
  }
};

module.exports = {
  getMembers,
  updateMember,
  deleteMember,
  createMembers,
};
