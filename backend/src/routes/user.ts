import { Router, Request, Response } from 'express';

export const userRouter = Router();

// In-memory store (Phase 2: replace with database)
const profiles = new Map<string, { topics: string[] }>();

// POST /api/user/profile
userRouter.post('/profile', (req: Request, res: Response) => {
  const { id, topics } = req.body;

  if (!id || !topics) {
    res.status(400).json({ error: 'id and topics are required' });
    return;
  }

  profiles.set(id, { topics });
  res.status(201).json({ id, topics });
});

// GET /api/user/profile/:id
userRouter.get('/profile/:id', (req: Request, res: Response) => {
  const profile = profiles.get(req.params.id as string);

  if (!profile) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }

  res.json({ id: req.params.id, ...profile });
});
