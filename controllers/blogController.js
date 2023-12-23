import asyncHandler from 'express-async-handler'
import Blog from '../models/blogModel.js'

// @desc    Fetch all Blogs
// @route   GET /api/Blogs
// @access  Private
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({
    user: req.user._id,
  })
  res.json(blogs)
})

// @desc    Fetch single Blog
// @route   GET /api/Blogs/:id
// @access  Private
const getBlogById = asyncHandler(async (req, res) => {
  // console.log(req.params.id)
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Delete a Blog
// @route   DELETE /api/Blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    if(blog.user.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('Not authorized')
    }
    await Blog.deleteOne()
    res.json({ message: 'Blog removed' })
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Create a Blog
// @route   POST /api/Blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {

  console.log(req.body)
  const {_id, title, description} = req.body;

  const blog = await Blog.create({
    _id,
    title,
    description,
    user: req.user._id,
  })

  if(blog) {
    res.status(201).json({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
    })
  }
  else {
    res.status(400)
    throw new Error('Invalid Blog data')
  }
})

// @desc    Update a Blog
// @route   PUT /api/Blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if(blog){
    if(blog.user.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('Not authorized')
    }
    else{
      blog.title = req.body.title || blog.title
      blog.description = req.body.description || blog.description

      const updatedBlog = await blog.save()

      res.json({
        _id: updatedBlog._id,
        title: updatedBlog.title,
        description: updatedBlog.description,
      })
    }
  }
  else{
    res.status(404)
    throw new Error('Blog not found')
  }
})


export {
    getBlogs,
    getBlogById,
    deleteBlog,
    createBlog,
    updateBlog,
};
