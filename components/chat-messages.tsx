'use client';

import type { Companion } from '@prisma/client';
import { ElementRef, FC, ReactElement, useEffect, useRef, useState } from 'react';
import ChatMessage, { type ChatMessageProps } from './chat-message';

interface ChatMessagesProps {
	companion: Companion;
	isLoading: boolean;
	messages: ChatMessageProps[];
}

const ChatMessages: FC<ChatMessagesProps> = ({ companion, isLoading, messages }): ReactElement => {
	const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);
	const scrollRef = useRef<ElementRef<'div'>>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFakeLoading(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages.length]);

	return (
		<div className='flex-1 overflow-y-auto pr-4'>
			<ChatMessage
				isLoading={fakeLoading}
				src={companion.src}
				role='system'
				content={`Hola, soy ${companion.name}, ${companion.description}`}
			/>
			{messages.map(({ content, role, src }) => {
				return (
					<ChatMessage
						key={content}
						role={role}
						content={content}
						src={src}
					/>
				);
			})}
			{isLoading && (
				<ChatMessage
					isLoading={isLoading}
					src={companion.src}
					role='system'
					content='Cargando...'
				/>
			)}
			<div ref={scrollRef} />
		</div>
	);
};

export default ChatMessages;
