import { Router, Request, Response } from 'express';

export const summaryRouter = Router();

// POST /api/summary
// Body: { articleUrl: string, articleText: string }
summaryRouter.post('/', async (req: Request, res: Response) => {
  const { articleUrl, articleText } = req.body;

  if (!articleUrl && !articleText) {
    res.status(400).json({ error: 'articleUrl or articleText is required' });
    return;
  }

  // Phase 2: call summaryService.generateSummary(articleText)
  res.json({
    summary: 'Summary generation coming in Phase 2.',
    articleUrl,
  });
});
