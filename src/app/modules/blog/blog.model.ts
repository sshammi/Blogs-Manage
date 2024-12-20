import { model, Schema } from 'mongoose'; // Assuming the interface is in the 'interfaces' folder
import { TBlogPost } from './blog.interface';

const blogPostSchema = new Schema<TBlogPost>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isPublished: {
    type: Boolean,
    default: true, 
  },
},
{
    timestamps: true,
    versionKey:false,
}
);

const BlogPost = model<TBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;
