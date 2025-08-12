import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';

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
      { 
        $inc: { views: 1 },
        $setOnInsert: { slug: slug, likes: 0 } 
      },
      { 
        returnDocument: 'after',
        upsert: true
      }
    );

    // --- Start of Fix ---
    // The updated document is the result itself, not result.value
    const updatedPost = result;
    // --- End of Fix ---

    if (updatedPost) {
      return NextResponse.json({ views: updatedPost.views || 1 });
    } else {
      console.error('MongoDB operation failed: Document not found or created.');
      return NextResponse.json({ message: 'Could not update or create post' }, { status: 500 });
    }
  } catch (e: any) {
    console.error('--- FATAL API ERROR ---');
    console.error(e);
    return NextResponse.json({ message: 'Internal Server Error', error: e.message }, { status: 500 });
  }
}