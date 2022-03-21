const Blog = require("./blog");
const User = require("./user");
const UserBlogs = require("./user_blogs");

User.hasMany(Blog);
Blog.belongsTo(User);
// Blog.sync({ alter: true })
// User.sync({ alter: true })

User.belongsToMany(Blog, { through: UserBlogs, as: "readings" });
Blog.belongsToMany(User, { through: UserBlogs });
User.hasMany(UserBlogs);
UserBlogs.belongsTo(User);
Blog.hasMany(UserBlogs, { as: "readinglists"});
UserBlogs.belongsTo(Blog);
module.exports = {
  Blog,
  User,
  UserBlogs,
};
