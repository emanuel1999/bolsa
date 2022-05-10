const db = require("../models");

const usersRepositories = {
  findOne: async function (data) {
    const user = await db.User.findOne(data)
    return user;
  },
};

module.exports = usersRepositories;
