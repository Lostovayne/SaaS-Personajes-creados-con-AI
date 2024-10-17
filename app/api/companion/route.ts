import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, categoryId, seed, instructions } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!src || !name || !description || !categoryId || !seed || !instructions) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // TODO: check for subscription

    const companion = await prismadb.companion.create({
      data: {
        userId: user.id,
        src,
        userName: user.firstName,
        name,
        description,
        categoryId,
        seed,
        instructions,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('[COMPANION] Error creating companion', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
}
