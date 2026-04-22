import { Router, Request, Response, NextFunction } from 'express';
import { fetchByTopics } from '../services/newsService';

export const newsRouter = Router();

// GET /api/news?topics=ai,crypto&page=1&pageSize=20
newsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topicsParam = req.query.topics as string;
    const topics = topicsParam ? topicsParam.split(',').filter(Boolean) : [];
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const result = await fetchByTopics(topics, page, pageSize);

    // Transform to the shape the frontend expects
    const articles = result.articles.map((a, i) => ({
      id: `${page}-${i}-${Date.now()}`,
      title: a.title,
      description: a.description || '',
      source: a.source.name,
      author: a.author,
      url: a.url,
      imageUrl: a.urlToImage,
      publishedAt: a.publishedAt,
      summary: null, // Client can request summaries separately
      topics,
    }));

    res.json({
      articles,
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(result.totalResults / pageSize),
        totalResults: result.totalResults,
      },
    });
  } catch (err) {
    next(err);
  }
});
