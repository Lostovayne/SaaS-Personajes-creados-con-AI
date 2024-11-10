'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatRequestOptions } from 'ai';
import { SendHorizonal } from 'lucide-react';
import { FC, ReactElement } from 'react';

interface ChatFormProps {
	isLoading: boolean;
	input: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
}

const ChatForm: FC<ChatFormProps> = ({ isLoading, input, handleInputChange, onSubmit }): ReactElement => {
	return (
		<form
			onSubmit={onSubmit}
			className='border-t border-primary/10 py-4 flex items-center gap-x-2'>
			<Input
				disabled={isLoading}
				value={input}
				onChange={handleInputChange}
				placeholder='Type a message'
				className='rounded-lg bg-primary/10'
			/>
			<Button
				disabled={isLoading}
				variant={'ghost'}>
				<SendHorizonal className='text-primary size-6' />
			</Button>
		</form>
	);
};

export default ChatForm;
