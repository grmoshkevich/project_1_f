import { NextApiRequest, NextApiResponse } from 'next';
import API_URL from '../../utils/constants'; // Adjust the path as needed

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};