"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define the type for a single post
type PostData = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
};

// This component receives the fetched post data as a prop
export default function BlogListClient({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-screen-xl mx-auto bg-white p-8 sm:p-12 shadow-lg rounded-2xl border-4 border-neutral-700 border-b-[12px]"
    >
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold font-raleway text-neutral-800 whitespace-nowrap">
            Things to Read
          </h1>
          <div className="w-full h-[2px] bg-neutral-800"></div>
        </div>
        
        <div className="grid gap-12 mt-8">
          {allPostsData.map(({ slug, date, title, excerpt, thumbnail }) => (
            <article key={slug} className="grid md:grid-cols-3 gap-8 items-center border-t border-gray-400 pt-12">
              <Link href={`/blog/${slug}`} className="md:col-span-1 group block">
                <div className="overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={thumbnail}
                    alt={`Thumbnail for ${title}`}
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
              </Link>
              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-gray-500 font-firacode">
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h2 className="mt-2 text-2xl font-bold font-raleway text-neutral-800">
                  <Link href={`/blog/${slug}`} className="hover:text-[#6d6dff] transition-colors duration-300">
                    {title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-700">
                  {excerpt}
                </p>
                <div className="mt-6">
                  <Link href={`/blog/${slug}`} className="btn px-2 py-1.5 border-2 border-neutral-700 rounded-sm font-semibold">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
    </motion.div>
  );
}