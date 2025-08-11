import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';

// This function specifically handles POST requests
export async function POST(
  request: NextRequest, 
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    
    const result = await db.collection('blogs').findOneAndUpdate(
      { slug: slug },
      { $inc: { views: 1 } },
      { returnDocument: 'after', upsert: true }
    );

    const updatedPost = result?.value;

    if (updatedPost) {
      return NextResponse.json({ views: updatedPost.views });
    } else {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}