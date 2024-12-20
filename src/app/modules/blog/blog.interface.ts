import { ObjectId } from 'mongodb';

export interface TBlogPost {
  title: string;
  content: string;
  author: ObjectId;
  isPublished: boolean;
}
