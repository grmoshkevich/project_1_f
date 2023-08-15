import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('%c⧭', 'color: #f200e2', {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization ?? '',
      });
    try {
    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization ?? '',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log('%c⧭', 'color: #731d1d', data);
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
