/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import BlogPost from "./blog.model";

const createBlogIntoDB = async ({ title, content, author }: { title: string; content: string; author: string; }) => {

    const blog = await BlogPost.create({ title, content, author });

    const populatedBlog = await BlogPost.findById(blog._id).populate("author", "name email");

    return populatedBlog;
};


const getAllBlogsFromDB = async (query: any) => {
    const { search, sortBy, sortOrder, filter } = query;
    const searchQuery: any = {};
    if (search) {
        searchQuery.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }
    if (filter) {
        searchQuery.author = filter;
    }
    const sortOptions: any = {};
    if (sortBy) {
        sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }
    const blogs = await BlogPost.find(searchQuery).populate("author", "name email").sort(sortOptions);
    return blogs;
};

const updateBlogInDB = async (id: string, payload: { title: string, content: string }) => {
    console.log(id);

    const blog = await BlogPost.findById(id);

    if (!blog) {
        throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
    }
    blog.title = payload.title || blog.title;
    blog.content = payload.content || blog.content;

    await blog.save();

    return blog;
};
const deleteBlogInDB = async (id: string) => {
    const blog = await BlogPost.findById(id);

    if (!blog) {
        throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
    }
    await BlogPost.deleteOne({ _id: id });

    return;
};
export const BlogServices = {
    createBlogIntoDB,
    updateBlogInDB,
    deleteBlogInDB,
    getAllBlogsFromDB,
}
