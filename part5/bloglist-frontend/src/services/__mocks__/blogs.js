const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'titleTest',
    author: 'authorTest',
    url: 'urlTest',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'userTest',
      name: 'nameTest'
    }
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }