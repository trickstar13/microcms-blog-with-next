import RSS from 'rss';
import { config } from '../site.config';
import { BlogService } from './BlogService';

export async function generateFeedXml(): Promise<string> {
  const feed = new RSS({
    title: config.siteMeta.title,
    description: config.siteMeta.description,
    site_url: config.baseUrl,
    feed_url: '/pages/feed',
    language: 'ja',
  });

  const blogs = await new BlogService().getAllBlogs();
  blogs.contents.forEach((blog) => {
    feed.item({
      title: blog.title,
      description: blog.description,
      date: new Date(blog.createdAt),
      url: `${config.baseUrl}/${blog.id}`,
    });
  });

  return feed.xml();
}
