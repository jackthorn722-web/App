import { Router, Request, Response } from 'express';

export const newsRouter = Router();

// GET /api/news?topics=ai,crypto&page=1&pageSize=20
newsRouter.get('/', async (req: Request, res: Response) => {
  const topics = (req.query.topics as string)?.split(',') || [];
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 20;

  // Phase 2: call newsService.fetchByTopics(topics, page, pageSize)
  res.json({
    articles: [],
    pagination: {
      page,
      pageSize,
      totalPages: 0,
      totalResults: 0,
    },
    topics,
  });
});
