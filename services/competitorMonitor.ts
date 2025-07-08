export interface CompetitorSnapshot {
  url: string;
  html: string;
  pricing: string[];
  features: string[];
  marketingMessages: string[];
  screenshotPath?: string;
  capturedAt: Date;
}

export async function scrapeCompetitor(url: string): Promise<CompetitorSnapshot> {
  const res = await fetch(url);
  const html = await res.text();
  const pricing = extractPricing(html);
  const features = extractFeatures(html);
  const marketingMessages = extractMarketing(html);
  return {
    url,
    html,
    pricing,
    features,
    marketingMessages,
    capturedAt: new Date(),
  };
}

export function detectChanges(oldSnap: CompetitorSnapshot, newSnap: CompetitorSnapshot) {
  const changes: Record<string, unknown> = {};
  if (JSON.stringify(oldSnap.pricing) !== JSON.stringify(newSnap.pricing)) {
    changes.pricing = { before: oldSnap.pricing, after: newSnap.pricing };
  }
  if (JSON.stringify(oldSnap.features) !== JSON.stringify(newSnap.features)) {
    changes.features = { before: oldSnap.features, after: newSnap.features };
  }
  if (JSON.stringify(oldSnap.marketingMessages) !== JSON.stringify(newSnap.marketingMessages)) {
    changes.marketingMessages = {
      before: oldSnap.marketingMessages,
      after: newSnap.marketingMessages,
    };
  }
  return changes;
}

function extractPricing(html: string): string[] {
  const priceRegex = /\$\d+(?:\.\d{2})?/g;
  return html.match(priceRegex) || [];
}

function extractFeatures(html: string): string[] {
  const featureRegex = /<li[^>]*>(.*?)<\/li>/g;
  const features: string[] = [];
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = featureRegex.exec(html))) {
    features.push(match[1]);
  }
  return features;
}

function extractMarketing(html: string): string[] {
  const headings = html.match(/<h\d[^>]*>(.*?)<\/h\d>/g) || [];
  return headings.map((h) => h.replace(/<[^>]+>/g, ''));
}

