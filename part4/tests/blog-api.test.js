const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blogs => blogs.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(users => users.toJSON());
};

const initialBlogs = [
  {
    title: "title",
    author: "author",
    url: "url",
    likes: 1
  },
  {
    title: "titteli",
    author: "kirjoittaja",
    url: "osoite",
    likes: 5
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("correct amount of blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length);
});

test("blog identifier is id", async () => {
  const response = await api.get("/api/blogs");
  for (let blog of response.body) {
    expect(blog.id).toBeDefined();
  }
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "title",
    author: "author",
    url: "url",
    likes: "1"
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map(r => r.title);

  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(titles).toContain("title");
});

test("likes is se to 0 if it's not given a value", async () => {
  const newBlog = {
    title: "nolikes",
    author: "aii",
    url: "urli"
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(response.body[response.body.length - 1].likes).toBe(0);
});

test("400 Bad request if title and url is empty", async () => {
  const newBlog = {
    author: "nocontent"
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await blogsInDb();

  expect(blogsAtEnd.length).toBe(initialBlogs.length - 1);

  const titles = blogsAtEnd.map(r => r.title);

  expect(titles).not.toContain(blogToDelete.title);
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "root", password: "sekret" });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("trying to create an invalid user responds 400", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "nopassword",
      name: "Matti Luukkainen"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).not.toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
