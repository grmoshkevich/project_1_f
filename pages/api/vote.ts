import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('%c⧭', 'color: #007300', req.body);
  try {
    console.log('%c⧭', 'color: #731d6d', 'vzxc');
    const response = await fetch(`http://localhost:3000/votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization ?? '',
      },
      body: JSON.stringify(req.body),
    });
    console.log('%c⧭', 'color: #731d6d', '2134321');

    const data = await response.text();
    console.log('%c⧭', 'color: #731d6d', '2134321');
    // console.log('%c⧭', 'color: #006dcc', '444', data);
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
