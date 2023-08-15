import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('%c⧭', 'color: #733d00', 'baop', req.body);
    const response = await fetch('http://localhost:3000/users', {
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
