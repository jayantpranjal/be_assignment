import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
        title: {
        type: String,
        required: true,
        },
        description: {
        type: String,
        required: true,
        },
        user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;

