# SalesFlow AI - AI-Powered Sales Intelligence Platform

## Project Context
This is a B2B SaaS application built with Next.js 14 (App Router), TypeScript, Supabase, and Tailwind CSS. It provides AI-powered sales intelligence and automation for B2B SaaS companies.

## Architecture
- `/app/` - Next.js 14 app directory structure
- `/components/` - Reusable React components
- `/lib/` - Utility functions and API clients
- `/hooks/` - Custom React hooks
- `/types/` - TypeScript type definitions
- `/services/` - Business logic and API integrations
- `/prisma/` - Database schema and migrations
- `/tests/` - Test files using Jest and React Testing Library

## Core Features
1. **Competitor Intelligence**: Real-time monitoring of competitor websites, pricing, and features
2. **Lead Scoring**: AI-powered lead qualification using intent signals
3. **Outreach Automation**: Multi-channel sequences (email, LinkedIn, calls)
4. **Conversation Intelligence**: Call recording and AI analysis
5. **Predictive Analytics**: Deal forecasting and pipeline insights

## Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: Supabase (PostgreSQL)
- **AI/ML**: OpenAI API, Anthropic Claude API
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Email**: Resend
- **Monitoring**: Vercel Analytics, Sentry
- **Testing**: Jest, React Testing Library, Playwright

## Coding Standards
- Use TypeScript with strict mode enabled
- Follow ESLint configuration with Airbnb style guide
- Use Prettier for consistent formatting
- Component names should be PascalCase
- Function names should be camelCase
- Use functional components with hooks
- Implement proper error boundaries
- Use Zod for runtime validation
- Follow REST API conventions for endpoints

## Database Schema Guidelines
- Use UUID for all primary keys
- Include created_at and updated_at timestamps
- Implement soft deletes with deleted_at field
- Use snake_case for column names
- Create proper indexes for query optimization
- Implement Row Level Security (RLS) policies

## Security Requirements
- Never expose API keys in client-side code
- Use environment variables for all secrets
- Implement proper CORS policies
- Validate all user inputs with Zod
- Sanitize data before database operations
- Use Supabase RLS for data access control
- Implement rate limiting on API endpoints

## Testing Requirements
- Write unit tests for all utility functions
- Create integration tests for API endpoints
- Implement E2E tests for critical user flows
- Maintain minimum 80% code coverage
- Use describe/it structure for test organization
- Mock external API calls in tests

## Development Workflow
- Create feature branches from `main`
- Use conventional commit messages (feat:, fix:, chore:)
- Run `npm run lint` and `npm run test` before committing
- Ensure all tests pass before creating PR
- Include screenshots for UI changes
- Update documentation for new features

## API Design Principles
- Follow RESTful conventions
- Use proper HTTP status codes
- Include pagination for list endpoints
- Implement proper error handling
- Return consistent response formats
- Document all endpoints with OpenAPI

## Performance Guidelines
- Implement proper caching strategies
- Use React Server Components where possible
- Optimize images with next/image
- Implement lazy loading for heavy components
- Use database connection pooling
- Minimize client-side JavaScript bundle

## Monitoring and Logging
- Log all errors to Sentry
- Track user events with Vercel Analytics
- Monitor API response times
- Set up alerts for critical errors
- Implement proper error boundaries

## Deployment
- Deploy to Vercel with preview deployments
- Use GitHub Actions for CI/CD
- Run tests before deployment
- Implement proper environment management
- Use feature flags for gradual rollouts

## Special Instructions
- When implementing AI features, always handle rate limits gracefully
- Implement proper retry logic for external API calls
- Cache AI responses when appropriate to reduce costs
- Use streaming responses for better UX with AI features
- Always validate webhook payloads from Stripe
- Implement proper cleanup for background jobs
- Use queue system for heavy processing tasks

## Pull Request Guidelines
- Include clear description of changes
- Reference issue numbers when applicable
- Add screenshots for UI changes
- Ensure all tests pass
- Request review from at least one team member
- Update changelog for user-facing changes

## Environment Variables Structure
```
# Database
DATABASE_URL=
DIRECT_URL=

# Authentication
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI Services
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Email
RESEND_API_KEY=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
SENTRY_DSN=

# App Config
NEXT_PUBLIC_APP_URL=
```