import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import clientPromise from './mongodb';
// import { ObjectId } from 'mongodb';

// Helper function to connect to the DB and get the collection
async function getPostsCollection() {
  const client = await clientPromise;
  const db = client.db("portfolio");
  return db.collection("blogs");
}

// 🔹 Get all posts sorted by date
export async function getSortedPostsData() {
  const postsCollection = await getPostsCollection();
  const posts = await postsCollection
    .find({})
    .sort({ date: -1 }) // Sort newest first
    .toArray();

  // We need to serialize the data because MongoDB returns complex objects
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: new Date(post.date).toISOString(),
    author: post.author || null,
    excerpt: post.excerpt || '',
    thumbnail: post.thumbnail,
  }));
}

// 🔹 Get all slugs for dynamic routes
export async function getAllPostSlugs() {
  const postsCollection = await getPostsCollection();
  const posts = await postsCollection.find({}, { projection: { slug: 1 } }).toArray();

  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}

// 🔹 Get single post data with MDX
export async function getPostData(slug: string) {
  const postsCollection = await getPostsCollection();
  const post = await postsCollection.findOne({ slug });

  if (!post) {
    return null;
  }

  // Use gray-matter to parse the frontmatter from the full MDX content string
  const matterResult = matter(post.mdxContent);

  // Serialize the main content for MDX rendering
  const mdxSource = await serialize(matterResult.content);

  // Ensure all required fields from the database are returned
  return {
    slug: post.slug,
    title: post.title,
    author: post.author || null,
    thumbnail: post.thumbnail,
    excerpt: post.excerpt || '',
    mdxSource,
    date: new Date(post.date).toISOString(),
    views: post.views || 0,
    likes: post.likes || 0,
  };
}