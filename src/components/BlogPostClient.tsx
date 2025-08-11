"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion} from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { CustomH2, CustomP, CustomUl, CustomLi, CustomA, CustomBlockquote, CustomHr } from '@/components/MdxComponents';
import { FiArrowRight, FiShare2, FiHeart, FiEye } from 'react-icons/fi';

const components = { h2: CustomH2, p: CustomP, ul: CustomUl, li: CustomLi, a: CustomA, blockquote: CustomBlockquote, hr: CustomHr };

type PostData = {
  slug: string;
  title: string;
  date: string;
  mdxSource: MDXRemoteSerializeResult;
  thumbnail: string;
  author?: string;
  views: number;
  likes: number;
};

export default function BlogPostClient({ initialPostData }: { initialPostData: PostData }) {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(initialPostData.likes);
  const [views, setViews] = useState(initialPostData.views);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const slug = initialPostData.slug;
    const likedKey = `liked_${slug}`;

    if (localStorage.getItem(likedKey) === 'true') {
      setUserHasLiked(true);
    }
    
    const incrementView = async () => {
      const response = await fetch(`/api/views/${slug}`, { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setViews(data.views);
      }
    };
    
    incrementView();
  }, [initialPostData.slug]);

  const handleLike = async () => {
    const slug = initialPostData.slug;
    const likedKey = `liked_${slug}`;
    const newLikedState = !userHasLiked;

    setIsLiking(true);
    setUserHasLiked(newLikedState);
    setLikes(prevLikes => newLikedState ? prevLikes + 1 : prevLikes - 1);

    if (newLikedState) {
      localStorage.setItem(likedKey, 'true');
      await fetch(`/api/likes/${slug}`, { method: 'POST' });
    } else {
      localStorage.removeItem(likedKey);
      await fetch(`/api/likes/${slug}`, { method: 'DELETE' });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto p-6 sm:p-10 bg-white shadow-lg rounded-2xl border-4 border-neutral-700 border-b-[12px] font-sans"
      >
        <header className="flex flex-col items-center gap-6 mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold font-raleway text-neutral-800">
            {initialPostData.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-neutral-500 font-firacode text-sm">
            <span className="whitespace-nowrap">
              📅 {new Date(initialPostData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="whitespace-nowrap">✍️ {initialPostData.author || "Unknown Author"}</span>
            <span className="hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <FiEye />
              <span>{views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2">
              <FiHeart className={`${userHasLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likes.toLocaleString()} likes</span>
            </div>
          </div>
          <div className="w-full aspect-video relative overflow-hidden rounded-lg shadow-md">
            <Image
              src={initialPostData.thumbnail}
              alt={`Thumbnail for ${initialPostData.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        <hr className="my-8 border-neutral-200" />
        <article className='text-justify'>
          <MDXRemote {...initialPostData.mdxSource} components={components} />
        </article>
        
        <div className="border-t-2 border-neutral-400 pt-8 mt-12">
          <h3 className='mb-4 text-lg font-semibold text-neutral-800'>Enjoyed the read? Share it or take a look at my portfolio:</h3>
          <div className="flex flex-wrap items-center gap-4">
            <motion.button 
              onClick={handleLike}
              className='px-4 py-2 border-2 border-pink-500 rounded-sm font-semibold bg-white text-pink-500 transition-all duration-300 ease-out hover:bg-pink-500 hover:text-white flex items-center justify-center gap-2 cursor-pointer'
              animate={isLiking ? "liked" : "unliked"}
              onAnimationComplete={() => setIsLiking(false)}
            >
              <motion.span
                variants={{ liked: { scale: [1, 1.5, 1], rotate: [0, -15, 15, 0] }, unliked: { scale: 1, rotate: 0 } }}
                transition={{ duration: 0.4 }}
              >
                <FiHeart className={`${userHasLiked ? 'fill-current' : ''}`} />
              </motion.span>
              {userHasLiked ? 'Liked!' : 'Like Post'}
            </motion.button>
            <button 
              onClick={handleCopy}
              className='px-4 py-2 border-2 border-neutral-700 rounded-sm font-semibold w-36 text-center bg-white text-neutral-800 transition-all duration-300 ease-out hover:bg-neutral-800 hover:text-white hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
            >
              {copied ? 'Link Copied!' : (
                <> Share Post <FiShare2 /> </>
              )}
            </button>
            <Link href='/'>
              <button 
                className='px-4 py-2 border-2 border-neutral-700 rounded-sm font-semibold bg-white text-neutral-800 transition-all duration-300 ease-out hover:bg-neutral-800 hover:text-white hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer'
              >
                Explore <FiArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}