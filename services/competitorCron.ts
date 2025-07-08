import { scrapeCompetitor } from './competitorMonitor';

export async function runDailyScrape(urls: string[]) {
  const results = [];
  for (const url of urls) {
    try {
      const snap = await scrapeCompetitor(url);
      results.push(snap);
    } catch (err) {
      console.error('Failed to scrape', url, err);
    }
  }
  return results;
}

