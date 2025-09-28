# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The Gully Cricket App is a Next.js application for managing cricket tournaments, matches, and detailed ball-by-ball scoring. It uses a modern TypeScript stack with Drizzle ORM and Turso database for comprehensive cricket match management.

## Development Commands

### Core Development
```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Database Operations
```bash
# Generate database migrations
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Push schema changes directly to database
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio

# Drop all database tables
pnpm db:drop

# Introspect existing database
pnpm db:introspect
```

## Architecture Overview

### Database Schema
The application uses a complex relational schema designed for comprehensive cricket statistics:

- **Core Entities**: `players`, `teams`, `tournaments`, `matches`
- **Match Details**: `innings`, `balls` (ball-by-ball tracking)
- **Relationships**: `teamPlayers`, `tournamentTeams`
- **Statistics**: `playerMatchPerformance`, `playerTournamentStats`, `playerCareerStats`

### Key Features
- Ball-by-ball scoring with complete cricket rules
- Multiple dismissal types: bold, caught, run out, stumped, LBW, boundary out
- Extras tracking: wides, no balls, byes, leg byes
- Comprehensive player and team statistics
- Tournament management with different formats (T5, T6, T7, T8, T10, T12, T20, ODI)

### Technology Stack

- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **UI Components**: Radix UI primitives with custom styling
- **Database**: Turso (SQLite) with Drizzle ORM
- **State Management**: Zustand for client state
- **Forms**: React Hook Form with Zod validation
- **Actions**: Next-Safe-Action for server actions
- **Package Manager**: pnpm with specific overrides for React types

## Project Structure

```
├── actions/           # Server actions for database operations
├── app/              # Next.js app router (pages and layouts)
├── components/       # Reusable React components
│   ├── ui/          # Base UI components (shadcn/ui style)
│   └── *.tsx        # Feature-specific components
├── data/            # Data access layer and queries
├── db/              # Database configuration and schema
│   ├── schema.ts    # Drizzle schema definitions
│   ├── relations.ts # Database relationship definitions
│   └── index.ts     # Database client setup
├── lib/             # Utility functions and configurations
├── providers/       # React context providers
├── schema/          # Zod validation schemas
└── types/           # TypeScript type definitions
```

## Database Configuration

The app uses Turso (SQLite) as the database with connection configured via environment variables:
- `TURSO_CONNECTION_URL` - Database connection URL
- `TURSO_AUTH_TOKEN` - Authentication token

Environment variables should be defined in `.env.local` file.

## Development Guidelines

### Database Changes
- Always run `pnpm db:generate` after modifying `db/schema.ts`
- Use `pnpm db:push` for development, `pnpm db:migrate` for production
- Database relationships are defined in `db/relations.ts` - update when adding new tables

### Component Development
- UI components follow shadcn/ui patterns with Radix UI primitives
- Use the `@/*` path alias for imports
- Components use Tailwind CSS with custom utility classes
- Form components integrate with React Hook Form and Zod validation

### Server Actions
- All server actions should use `next-safe-action` for type safety
- Database operations go through the configured Drizzle client in `db/index.ts`
- Actions follow the pattern in `actions/` directory

### Cricket Business Logic
- Ball scoring follows specific cricket rules implemented in `components/score-a-ball.tsx`
- Dismissal types have complex interactions (e.g., wide balls clear certain dismissals)
- Statistics are automatically calculated and stored in performance tables

## Testing Commands

Currently no test framework is configured. To add testing:

```bash
# Install Jest and testing libraries
pnpm add -D jest @testing-library/react @testing-library/jest-dom

# Add test script to package.json
# "test": "jest"
```

## Important Notes

- The app uses React 19 with specific type overrides in pnpm configuration
- Turbopack is enabled for faster development builds
- The scoring system implements complex cricket rules - refer to `features.md` for specific behaviors
- Database schema supports multiple cricket formats and comprehensive statistics tracking
- UI follows a dark theme by default with system theme detection