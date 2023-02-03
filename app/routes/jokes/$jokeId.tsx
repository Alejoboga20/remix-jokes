import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { db } from '~/utils/db.server';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { JokeDisplay } from '~/components/joke';
import { getUserId } from '~/utils/session.server';

export const loader = async ({ params, request }: LoaderArgs) => {
	const userId = await getUserId(request);
	const joke = await db.joke.findUnique({
		where: { id: params.jokeId },
	});
	if (!joke) {
		throw new Response('What a joke! Not found.', {
			status: 404,
		});
	}
	return json({
		joke,
		isOwner: userId === joke.jokesterId,
	});
};

export const ErrorBoundary = () => {
	const { jokeId } = useParams();

	return (
		<div className='error-container'>{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
	);
};

const JokeRoute = () => {
	const data = useLoaderData<typeof loader>();

	return <JokeDisplay isOwner={data.isOwner} joke={data.joke} />;
};

export default JokeRoute;
