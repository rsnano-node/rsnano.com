export { loadBlogPost, loadAllBlogPosts } from './loader';
import * as path from 'path';

export const BLOG_POST_FILE_EXTENSION = '.md';
export const BLOG_POST_PATH = path.resolve('blog/posts/');
