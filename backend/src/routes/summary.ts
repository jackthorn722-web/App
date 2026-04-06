import { Router, Request, Response, NextFunction } from 'express';
import { generateSummary } from '../services/summaryService';

export const summaryRouter = Router();

// POST /api/summary
// Body: { articleUrl: string, articleText: string }
summaryRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { articleUrl, articleText } = req.body;

    if (!articleText) {
      res.status(400).json({ error: 'articleText is required' });
      return;
    }

    const summary = await generateSummary(articleText);

    res.json({
      summary,
      articleUrl,
    });
  } catch (err) {
    next(err);
  }
});
