'use client';

import ChatForm from '@/components/chat-form';
import ChatHeader from '@/components/chat-header';
import type { ChatMessageProps } from '@/components/chat-message';
import ChatMessages from '@/components/chat-messages';
import type { Companion, Message } from '@prisma/client';
import { useCompletion } from 'ai/react';
import { useRouter } from 'next/navigation';
import { FC, useState, type FormEvent } from 'react';

interface ChatClientProps {
	companion: Companion & {
		Message: Message[];
		_count: {
			Message: number;
		};
	};
}

const ChatClient: FC<ChatClientProps> = ({ companion }: ChatClientProps) => {
	const router = useRouter();
	const [messages, setMessages] = useState<ChatMessageProps[]>(companion.Message);

	const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
		api: `/api/companion/${companion.id}`,
		onFinish(prompt, completion) {
			const systemMessage: ChatMessageProps = {
				role: 'system',
				content: completion,
			};

			setMessages((current) => [...current, systemMessage]);
			setInput('');

			router.refresh();
		},
	});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		const userMessage: ChatMessageProps = {
			role: 'user',
			content: input,
		};

		setMessages((current) => [...current, userMessage]);
		handleSubmit(e);
	};

	return (
		<div className='flex flex-col  h-screen p-4 '>
			<ChatHeader companion={companion} />
			<ChatMessages
				companion={companion}
				isLoading={isLoading}
				messages={messages}
			/>
			<ChatForm
				isLoading={isLoading}
				input={input}
				handleInputChange={handleInputChange}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default ChatClient;
