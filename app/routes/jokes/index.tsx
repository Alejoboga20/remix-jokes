import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const loader = async () => {
	const count = await db.joke.count();
	const randomRowNumber = Math.floor(Math.random() * count);
	const [randomJoke] = await db.joke.findMany({
		take: 1,
		skip: randomRowNumber,
	});

	return json({ randomJoke });
};

export const ErrorBoundary = () => {
	return <div className='error-container'>I did a whoopsies.</div>;
};

const JokesIndexRoute = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<p>Here's a random joke:</p>
			<p>{data.randomJoke.content}</p>
			<Link to={data.randomJoke.id}>"{data.randomJoke.name}" Permalink</Link>
		</div>
	);
};

export default JokesIndexRoute;
