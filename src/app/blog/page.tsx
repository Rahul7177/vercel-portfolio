import { getSortedPostsData } from '../../../lib/posts';
import BlogListClient from '@/components/BlogListClient';
import { Metadata } from 'next';

// Add metadata for the main blog page
export const metadata: Metadata = {
  title: 'Blog | Rahul Raj',
  description: 'A collection of thoughts and articles from Rahul Raj.',
};

// This is a Server Component, so it can be async
export default async function BlogIndexPage() {
  // Fetch all posts, not just one
  const allPostsData = await getSortedPostsData();

  return (
    <div className='graph-paper-bg'>
      <main className="py-24 px-4">
        {/* Render the client component for the LIST of posts */}
        <BlogListClient allPostsData={allPostsData} />
      </main>
    </div>
  );
}