const _ = require('lodash')

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.length === 0 
  ? 0 
  : blogs.reduce(reducer, 0);
};

const favouriteBlog = blogs => {
  let fave = blogs[0];
  const faveBlog = blogs =>
    blogs.forEach(blog => {
      if (blog.likes > fave.likes) {
        fave = blog;
      }
    });
  faveBlog(blogs);
  return blogs.length === 0 
  ? 0 
  : fave;
};

const mostBlogs = blogs => {
  const record = {
    author: "",
    blogs: 0
  };
  const most = () =>
    blogs.forEach(blog => {
      let blogCount = _.filter(blogs, ["author", blog.author]).length
      if (blogCount > record.blogs) {
        record.author = blog.author;
        record.blogs = blogCount;
      }
    });
  most();
  return record;
};

const mostLikes = blogs => {
  const record = {
    author: "",
    likes: 0
  }
  const most = () =>
    blogs.forEach(blog => {
      let authorLikes = totalLikes(_.filter(blogs, ["author", blog.author]))
      if (authorLikes > record.likes) {
        record.author = blog.author;
        record.likes = authorLikes
      }
    });
  most();
  return record;

}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
