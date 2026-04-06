import Anthropic from '@anthropic-ai/sdk';

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}

export async function generateSummary(articleText: string): Promise<string> {
  if (!articleText || articleText.trim().length < 50) {
    return 'Article text too short to summarize.';
  }

  // Truncate very long articles to stay within token limits
  const truncated = articleText.slice(0, 4000);

  const response = await getClient().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 200,
    system:
      'You are a news summarizer. Summarize the following news article in exactly 3 concise bullet points. Each bullet should be one sentence. Focus on the key facts and why they matter. Use bullet characters (•) to start each point. Do not include any preamble.',
    messages: [
      {
        role: 'user',
        content: truncated,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  return textBlock ? textBlock.text : 'Unable to generate summary.';
}
