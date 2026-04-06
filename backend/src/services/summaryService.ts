// Phase 2: Implement Claude API summarization
//
// Will use @anthropic-ai/sdk with:
// - Model: claude-sonnet-4-6 (fast + capable)
// - System prompt: "Summarize the following news article in exactly 3 concise
//   bullet points. Focus on the key facts and why they matter."
// - Max tokens: 200

export async function generateSummary(articleText: string): Promise<string> {
  // Stub — returns placeholder
  return 'Summary generation will be implemented in Phase 2 using the Claude API.';
}
