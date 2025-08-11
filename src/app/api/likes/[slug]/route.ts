import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';

// A shared function to handle database updates
async function updateLikes(slug: string, incrementValue: number) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    
    const result = await db.collection('blogs').findOneAndUpdate(
      { slug: slug },
      { $inc: { likes: incrementValue } },
      { returnDocument: 'after', upsert: true }
    );

    const updatedPost = result?.value;

    if (updatedPost) {
      return NextResponse.json({ likes: updatedPost.likes });
    } else {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

// Handles POST requests (liking a post)
export async function POST(
  request: NextRequest, 
  { params }: { params: { slug: string } }
) {
  return updateLikes(params.slug, 1);
}

// Handles DELETE requests (unliking a post)
export async function DELETE(
  request: NextRequest, 
  { params }: { params: { slug: string } }
) {
  return updateLikes(params.slug, -1);
}