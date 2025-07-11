# SalesFlow AI

SalesFlow AI is an AI-powered sales intelligence platform for B2B SaaS companies.
This project is built with Next.js 14, TypeScript, Tailwind CSS and Supabase.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `app/` - Next.js App Router
- `components/` - Reusable React components
- `lib/` - Utility functions and API clients
- `hooks/` - Custom React hooks
- `types/` - TypeScript type definitions
- `services/` - Business logic and API integrations
- `prisma/` - Database schema and migrations
- `tests/` - Test files

## Environment Variables

Copy `.env.example` to `.env` and provide values for all variables before running the app.


## Email Automation

This project includes an email automation system powered by Resend and OpenAI. Templates and sequences can be managed via `/api/templates` and `/api/sequences`. Performance metrics are available from `/api/tracking` and webhooks from Resend are handled at `/api/webhooks/resend`.

## Billing with Stripe

Pricing plans are defined in Stripe and exposed via the `/pricing` page. Checkout sessions are created with `/api/billing/checkout` and customers can manage their subscriptions in the portal via `/api/billing/portal`. Webhook events from Stripe are received at `/api/webhooks/stripe` and should be configured with the signing secret from `STRIPE_WEBHOOK_SECRET`.

## Testing

Run unit, integration and E2E tests:

```bash
npm test        # unit and integration tests
npm run test:e2e  # Playwright E2E tests
```

## Deployment

GitHub Actions runs tests on every PR and pushes to Vercel when changes land on `main`.
Preview deployments are created for pull requests.

## Monitoring

Sentry is used for error tracking. Initialize monitoring with `initMonitoring()` in your server entrypoint.
Vercel Analytics provides performance and user metrics.

## Rollback and Secrets

Environment variables are managed via `.env` files and GitHub Secrets. Rotate API keys regularly and redeploy.
In case of failed deployments, redeploy the previous stable commit from Vercel dashboard.
