import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

export const loader = async ({ request }: LoaderArgs) => {
	console.log({ request });
	return json({ msg: 'hello' });
};

export const action = async ({ request, params, context }: ActionArgs) => {
	const body = await request.formData();
	const test = body.get('test');

	console.log(test);
	return json({ msg: 'hello', request, params, context });
};

export const Jokes = () => {
	return <div>Jokes</div>;
};
