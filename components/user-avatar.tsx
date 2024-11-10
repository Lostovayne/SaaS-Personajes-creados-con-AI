import { useUser } from '@clerk/nextjs';
import { FC, ReactElement } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';

const UserAvatar: FC = (): ReactElement => {
	const { user } = useUser();

	return (
		<Avatar>
			<AvatarImage src={user?.imageUrl!} />
		</Avatar>
	);
};

export default UserAvatar;
