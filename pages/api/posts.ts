// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import API_URL from '../../utils/constants'; // Adjust the path as needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const accessToken = req.headers.authorization;
    console.log('%c⧭', 'color: #00bf00', 'accessToken', accessToken);
    console.log('%c⧭', 'color: #0088cc', `${API_URL}/posts/${Boolean(accessToken) ? 'for-user' : 'public'}`);
    const response = await fetch(`${API_URL}/posts/${Boolean(accessToken) ? 'for-user' : 'public'}`, {
      headers: {
        "accepts": "application/json",
        'Authorization': req.headers.authorization ?? '',
      }
    });

    console.log('%c⧭', 'color: #00e600', 'yoo', response.url);
    const data = await response.json();
    console.log('%c⧭', 'color: #ff0000', data);

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    res.status(200).json(data);
  } catch (error) {
    console.log('%c⧭', 'color: #00a3cc', 'yooo');
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
}
