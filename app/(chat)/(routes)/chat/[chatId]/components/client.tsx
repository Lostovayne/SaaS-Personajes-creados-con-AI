'use client';

import ChatHeader from '@/components/chat-header';
import type { Companion, Message } from '@prisma/client';
import { FC, ReactElement } from 'react';

interface ChatClientProps {
	companion: Companion & {
		Message: Message[];
		_count: {
			Message: number;
		};
	};
}

const ChatClient: FC<ChatClientProps> = ({ companion }: ChatClientProps): ReactElement => {
	return (
		<div className='flex flex-col h-full p-4 space-y-2'>
			<ChatHeader companion={companion} />
		</div>
	);
};

export default ChatClient;
