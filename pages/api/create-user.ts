import { NextApiRequest, NextApiResponse } from 'next';
import API_URL from '../utils'; // Adjust the path as needed

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('%c⧭', 'color: #733d00', 'baop', req.body);
    console.log('%c⧭', 'color: #00e600', 'api url', API_URL);
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log('%c⧭', 'color: #00bf00', data);
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
