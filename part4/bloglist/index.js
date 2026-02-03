const express = require('express');
const mongoose = require('mongoose');

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

const mongodbURI =
  'mongodb+srv://ulathi:xwdOTyXw1EJAh7W6@phonebook.9tkgcfz.mongodb.net/blogsApp?retryWrites=true&w=majority&appName=phonebook';

mongoose
  .connect(mongodbURI, { family: 4 })
  .then(() => console.log('connected to db'))
  .catch(error => console.log(error));

app.use(express.json());

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then(allBlogs => res.status(200).json(allBlogs));
});

app.post('/api/blogs', (req, res) => {
  const blogContent = req.body;
  const newBlog = new Blog(blogContent);

  newBlog
    .save()
    .then(currentBlog => res.status(201).json(currentBlog))
    .catch(error => console.log(error));
});

const PORT = 3003;

app.listen(PORT, error => {
  if (error) throw error;
});
