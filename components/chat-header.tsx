'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@clerk/nextjs';
import type { Companion, Message } from '@prisma/client';
import axios from 'axios';
import { ChevronLeft, Edit, MessageSquare, MoreVertical, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, ReactElement } from 'react';
import { toast } from 'sonner';
import BotAvatar from './bot-avatar';

interface ChatHeaderProps {
	companion: Companion & {
		Message: Message[];
		_count: {
			Message: number;
		};
	};
}

const ChatHeader: FC<ChatHeaderProps> = ({ companion }): ReactElement => {
	const router = useRouter();
	const { user } = useUser();

	const onDelete = async () => {
		try {
			await axios.delete(`/api/companion/${companion.id}`);
			toast.success('Successfully deleted companion');
			router.refresh();
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	return (
		<div className='flex w-full justify-between items-center border-b border-primary/10 pb-4'>
			<div className='flex gap-x-2 items-center'>
				<Button
					onClick={() => router.back()}
					size={'icon'}
					variant={'ghost'}>
					<ChevronLeft className='size-8' />
				</Button>
				<BotAvatar src={companion.src} />
				<div className='flex flex-col gap-y-1'>
					<div className='flex items-center gap-x-2'>
						<p className='font-bold'>{companion.name}</p>
						<div className='flex items-center text-xs text-muted-foreground  '>
							<MessageSquare className='size-3 mr-1' />
							{companion._count.Message}
						</div>
					</div>
					<p className='text-xs text-muted-foreground'>Created by {companion.userName}</p>
				</div>
			</div>
			{user?.id === companion.userId && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant={'secondary'}
							size={'icon'}>
							<MoreVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem onClick={() => router.push(`/companion/${companion.id}`)}>
							<Edit className='size-4 mr-2' />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onDelete}>
							<Trash className='size-4 mr-2' />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
};

export default ChatHeader;
