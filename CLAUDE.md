# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marginalia is a Next.js music platform that allows users to create playlists with "margin notes" - annotations on songs within playlists. The application supports user authentication, artist profiles, song uploads, and social features like following and commenting.

## Technology Stack

- **Frontend**: Next.js 15.4.4 with React 19.1.0
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom implementation with bcrypt hashing
- **File Storage**: Vercel Blob storage for audio files and cover images
- **TypeScript**: Configured but with `strict: false`

## Development Commands

Since there are no npm scripts defined in package.json, use standard Next.js commands:

```bash
# Development server
npx next dev

# Build for production  
npx next build

# Start production server
npx next start

# TypeScript type checking
npx tsc --noEmit

# Database operations
npx prisma generate     # Generate Prisma client
npx prisma db push      # Push schema changes to database
npx prisma studio       # Open Prisma Studio GUI
```

## Database Architecture

The application uses a comprehensive PostgreSQL schema defined in `prisma/schema.prisma` with the following key models:

- **User**: Core user accounts with optional artist profiles
- **Artist**: Extended profile for music creators
- **Song**: Audio files with metadata and file URLs
- **Playlist**: User-created collections of songs
- **PlaylistSong**: Junction table linking songs to playlists with ordering
- **MarginNote**: The core feature - annotations on songs within specific playlists
- **Follow**: Social following system for users and artists
- **Like/Comment**: Social engagement features
- **Activity**: User activity tracking
- **Report**: Content moderation system

## Key Features

### Margin Notes System
The unique feature is margin notes (`MarginNote` model) that are attached to `PlaylistSong` entries, allowing users to annotate specific songs within the context of specific playlists.

### Authentication Flow
- Custom auth implementation in `services/api/auth.js`
- Validation rules in `services/validation/authValidation.js` 
- Password strength checking in `hooks/usePasswordStrength.js`
- Currently only signup is implemented

## Application Structure

### App Router Structure
```
app/
├── (auth)/          # Auth routes (login, signup, reset-password)
├── (main)/          # Main app routes (discover, feed, library, settings)  
├── api/             # API routes (auth, playlists, songs, users)
├── artist/          # Artist-specific pages
├── playlist/        # Playlist pages
└── profile/         # User profile pages
```

### Key Directories
- `lib/`: Utility libraries (auth, db, utils) - currently empty
- `services/`: API services and validation logic
- `hooks/`: React hooks (password strength)
- `public/assets/`: Static assets

## Development Notes

- TypeScript is configured but with `strict: false`, so type checking may be lenient
- No linting or formatting tools are configured
- The project uses CSS files for styling (base-styles.css)
- Database URL should be set in environment variable `DATABASE_URL`
- API base URL defaults to `http://localhost:3001` but can be overridden with `NEXT_PUBLIC_API_URL`

## Authentication & Security

- Passwords are hashed with bcrypt
- CSRF token placeholder exists but is not implemented
- Username validation allows letters, numbers, and underscores
- Password minimum length is 8 characters
- User profiles can be marked as private