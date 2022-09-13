const BlogModel = require("../../Models/Blog/Blog.model")

const BlogController = {
    getAllBlog: async (req, res) => {
        try {
            const blogList = await BlogModel.find()
            return res.status(200).json({
                success: true,
                blogList
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    getSingleBlog: async (req, res) => {
        try {
            const blog = await BlogModel.findOne({ blog_page_name: req.params.id })
            return res.status(200).json({
                success: true,
                blog
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    addNewBlog: async (req, res) => {
        try {
            const { blog_page_name, description, title } = req.body

            await BlogModel.create({ title, blog_page_name, description })
            return res.status(200).json({
                success: true,
                message: "New blog created successfully. "
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    editBlog: async (req, res) => {
        try {
            const { id } = req.params
            const { description, title } = req.body

            await BlogModel.findOneAndUpdate({ blog_page_name: id }, { title, description })
            return res.status(200).json({
                success: true,
                message: "Blog updated successfully. "
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const { id } = req.params
            await BlogModel.findOneAndDelete({ blog_page_name: id })
            return res.status(200).json({
                success: true,
                message: "Successfully deleted"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }

}

module.exports = BlogController