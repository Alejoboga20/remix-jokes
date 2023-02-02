import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import stylesUrl from '~/styles/jokes.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

const JokesRoute = () => {
	return (
		<div>
			<h1>J🤪kes App</h1>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default JokesRoute;
