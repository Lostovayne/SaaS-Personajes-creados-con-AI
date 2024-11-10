import { Companion } from '@prisma/client';
import Image from 'next/image';

import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { Card, CardFooter, CardHeader } from './ui/card';

interface CompanionProps {
	// Prop types here
	data: (Companion & {
		_count: {
			Message: number;
		};
	})[];
}

const Companions: FC<CompanionProps> = ({ data }: CompanionProps): ReactElement => {
	if (data.length === 0) {
		return (
			<div className='pt-10 flex flex-col items-center justify-center space-y-3'>
				<div className='relative size-60'>
					<Image
						fill
						className='grayscale'
						alt='Empty'
						src='/empty.png'
					/>
				</div>
				<p className='text-sm text-muted-foreground'>No companions found</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 pb-10'>
			{data.map((item) => (
				<Card
					key={item.id}
					className='bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0 '>
					<Link href={`/chat/${item.id}`}>
						<CardHeader className='flex items-center justify-center text-center text-muted-foreground'>
							<div className='relative size-40 '>
								<Image
									fill
									className='rounded-xl object-cover'
									alt='Companion'
									src={item.src}
									priority
								/>
							</div>
							<p className='font-bold'>{item.name}</p>
							<p className='text-xs'>{item.description}</p>
						</CardHeader>
						<CardFooter className='flex items-center justify-between text-xs text-muted-foreground'>
							<p className='capitalize'>@{item.userName}</p>
							<div className='flex items-center'>
								<MessageSquare className='size-3 mr-1' />
								{item._count.Message}
							</div>
						</CardFooter>
					</Link>
				</Card>
			))}
		</div>
	);
};

export default Companions;
