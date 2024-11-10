import { FC, ReactElement } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';

interface BotAvatarProps {
	src: string;
}

const BotAvatar: FC<BotAvatarProps> = ({ src }): ReactElement => {
	return (
		<Avatar>
			<AvatarImage
				src={src}
				className='object-cover'
			/>
		</Avatar>
	);
};

export default BotAvatar;
