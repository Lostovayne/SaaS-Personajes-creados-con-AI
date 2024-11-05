import prismadb from '@/lib/prismadb';
import { RedirectToSignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { FC, ReactElement } from 'react';
import ChatClient from './components/client';

interface ChatIdPageProps {
	params: {
		chatId: string;
	};
}

const ChatIdPage: FC<ChatIdPageProps> = async ({ params }: ChatIdPageProps): Promise<ReactElement | null> => {
	const { userId } = auth();

	if (!userId) {
		return RedirectToSignIn({
			redirectUrl: '/',
		});
	}

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.chatId,
		},
		include: {
			Message: {
				orderBy: {
					createdAt: 'asc',
				},
				where: {
					userId,
				},
			},
			_count: {
				select: {
					Message: true!,
				},
			},
		},
	});

	if (!companion) {
		return redirect('/');
	}

	return <ChatClient companion={companion} />;
};

export default ChatIdPage;
