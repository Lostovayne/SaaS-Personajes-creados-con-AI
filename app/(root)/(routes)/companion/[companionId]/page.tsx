import prismadb from '@/lib/prismadb';
import { RedirectToSignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { CompanionForm } from './components/companion-form';

interface CompanionIdPagProps {
	params: {
		companionId: string;
	};
}

const CompanionIdPage = async ({ params }: CompanionIdPagProps) => {
	// TODO: Check Subscription
	const { userId } = auth();

	if (!userId) {
		return RedirectToSignIn({
			redirectUrl: '/',
		});
	}

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.companionId,
			userId,
		},
	});

	const categories = await prismadb.category.findMany();

	return (
		<CompanionForm
			initialData={companion}
			categories={categories}
		/>
	);
};
export default CompanionIdPage;
