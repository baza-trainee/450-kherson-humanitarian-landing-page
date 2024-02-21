import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
	const serializedCookie = cookie.serialize('token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		maxAge: -1,
		sameSite: 'strict',
		path: '/',
	});
	res.setHeader('Set-Cookie', serializedCookie);
	res.status(200).json({ success: true });
}
