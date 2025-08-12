import { getPostData, getAllPostSlugs } from "@/lib/posts";
import BlogPostClient from "@/components/BlogPostClient";
import { notFound } from 'next/navigation';
import { Metadata } from "next";

// This function generates the page title and metadata
export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const postData = await getPostData(slug);
  if (!postData) {
    return { title: 'Post Not Found' };
  }
  return {
    title: postData.title,
    description: postData.excerpt || 'A blog post by Rahul Raj.',
  };
}

// This function tells Next.js which slugs to pre-render
export async function generateStaticParams() {
  const paths = await getAllPostSlugs();
  return paths.map(p => ({ slug: p.params.slug }));
}

// This is the main server component for the page
export default async function PostPage({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  if (!postData) {
    notFound();
  }

  // Ensure that postData.mdxSource and postData.mdxSource.compiledSource
  // are defined to prevent errors. This is handled by the getPostData
  // function, but this extra check can prevent unexpected issues.
  if (!postData.mdxSource) {
    console.error(`MDX source not found for slug: ${params.slug}`);
    notFound();
  }

  return (
    <div className="graph-paper-bg">
      <BlogPostClient initialPostData={postData} />
    </div>
  );
}
