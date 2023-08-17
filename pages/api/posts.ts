// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import API_URL from '../utils'; // Adjust the path as needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(`${API_URL}/posts/for-user`, {
      headers: {
        "accepts": "application/json",
        'Authorization': req.headers.authorization ?? '',
      }
    }); // Replace with your actual backend API URL
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
