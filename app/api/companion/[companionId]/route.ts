import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { companionId: string } }) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, categoryId, seed, instructions } = body;

    if (!params.companionId) {
      return new NextResponse('ComapinionId is required', { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!src || !name || !description || !categoryId || !seed || !instructions) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // TODO: check for subscription

    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
      },
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
    console.log('[COMPANION_PATCH] Error creating companion', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
}
