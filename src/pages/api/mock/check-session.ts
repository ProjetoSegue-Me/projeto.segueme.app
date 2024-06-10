import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from './sessionStorage';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { sessionId } = req.body;

    if (sessionId && getSession(sessionId) && getSession(sessionId)! > Date.now()) {
      return res.status(200).json({ isValid: true });
    }

    return res.status(200).json({ isValid: false });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};