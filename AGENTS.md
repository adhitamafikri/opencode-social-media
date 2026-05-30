# Opencode Social Media

## Project Overview

This is a small demo project that supports my sharing session material on Opencode

## Features

> This is a simple demo social media app, inspired by instagram and twitter.

- Authn and Authz
- Profile
  - View my profile
  - Update profile
  - Update profile cover image
  - View other user profile
- Feed/Posts
  - See all posts
  - See my posts
  - See a specific post
  - Create new post
  - Update a post
  - Remove a post
  - See specific user's posts
- Comments & Interactions
  - Get comments of a post
  - Post a new comment to a post
  - Update a comment on a post
  - Remove a comment from a post
  - Like a post
  - Like a comment
- Bookmarks & Social Connections
  - Get bookmarked posts
  - Bookmark a post
  - Follow a user
  - Get list of followers
  - Get list of followings

## Tech Stacks

### Frontend

- `bun 1.3`: runtime and package manager
- `vite`: build tool
- `typescript`: provides type-safety to the codebase
- `vue 3`: framework for building the user interface
- `vue router 5`: managing client-side routing on the app
- `tailwindcss`: utility-first CSS framework for easy styling
- `daisy-ui`: tailwindcss plugin, provides convenience in writing component styles based on TailwindCSS, lesser class names on the template
- `axios`: handling async requests, especially API calls
- `@tanstack/vue-query`: handling the loading, error, data, caching, polling for the async states/API calls

### Backend - API

> Using free API from `https://freeapi.app/`

#### Auth API Endpoints

> Curated endpoints from: `https://freeapi.app/docs#tag/authentication`

**Authentication & Authorization**

- POST /users/register
- POST /users/login
- POST /users/logout
- POST /users/refresh-token

**User Profile**

- GET /users/current-user
- PATCH /users/avatar

#### Social Media API Endpoints

> Curated endpoints from: `https://freeapi.app/docs#tag/social-media`

**Profile Management**

- GET /social-media/profile — View own profile
- PATCH /social-media/profile — Update profile details
- PATCH /social-media/profile/cover-image — Update cover image
- GET /social-media/profile/u/{username} — View user profile by username

**Posts Management**

- GET /social-media/posts — Retrieve all posts
- POST /social-media/posts — Create a new post
- GET /social-media/posts/{postId} — Get a specific post
- PATCH /social-media/posts/{postId} — Update a post
- DELETE /social-media/posts/{postId} — Delete a post
- GET /social-media/posts/get/my — Get authenticated user's posts
- GET /social-media/posts/get/u/{username} — Get posts by username
<!-- - GET /social-media/posts/get/t/{tag} — Get posts by tag -->

**Comments & Interactions**

- GET /social-media/comments/post/{postId} — Get comments for a post
- POST /social-media/comments/post/{postId} — Add a comment to a post
- PATCH /social-media/comments/{commentId} — Update a comment
- DELETE /social-media/comments/{commentId} — Delete a comment
- POST /social-media/like/post/{postId} — Like a post
- POST /social-media/like/comment/{commentId} — Like a comment

**Bookmarks & Social Connections**

- GET /social-media/bookmarks — View bookmarked posts
- POST /social-media/bookmarks/{postId} — Bookmark a post
- POST /social-media/follow/{toBeFollowedUserId} — Follow a user
- GET /social-media/follow/list/followers/{username} — List followers
- GET /social-media/follow/list/following/{username} — List following

## Dummy Users

> For testing and simulation purpose, I've selected several users to use when simulating or testing the app

1. name: Joseph Evans, username: angryzebra337, password: otis
2. name: Cäcilia Lemoine, username: beautifulrabbit185, password: bigtime
3. name: Terra Clark, username: smallladybug901, password: elway7
4. name: Dibach Gocko, username: heavysnake675, password: wowwow
5. name: Tanja Španović, username: greentiger564, password: calgary

## Guiding Principles

### Workspace Knowlege Artifacts

Knowledge and working materials in this workspace are organized by purpose. Use the correct top-level directory based on the intended audience and lifespan of the artifact.

- **Notes**
  - Purpose: agent-authored working notes for codebase exploration, bug investigations, root cause analysis, execution summaries, and research artifacts primarily meant to support ongoing engineering work.
  - Located in the workspace root.
  - Directory: `notes/`
  - Structure: date-first.
  - Naming:
    - Each note must be a Markdown file named `YYYY-MM-DD-note-title.md`.

- **Plans**
  - Purpose: technical implementation plans for features, bug fixes, refactors, and enhancements.
  - Located in the workspace root.
  - Directory: `plans/`
  - Structure: date-scoped.
  - Preferred layout:
    - `plans/YYYY-MM-DD/<topic>/...`
    - `plans/YYYY-MM-DD/<descriptive-file>.md`
  - Naming:
    - Use descriptive lowercase kebab-case names inside the dated folder.
    - Files inside a dated folder do not need to repeat the date in the filename.

- **Prompts**
  - Purpose: prompt bundles, prompt iterations, and prompt-supporting assets such as images or reference materials.
  - Located in the workspace root.
  - Directory: `prompts/`
  - Structure: date-scoped.
  - Preferred layout:
    - `prompts/YYYY-MM-DD/<topic>/...`
    - `prompts/YYYY-MM-DD/<descriptive-file>.md`
  - Naming:
    - Use descriptive lowercase kebab-case names inside the dated folder.
    - Supporting images and related assets may live beside the Markdown files when directly related.

- **General Rules**
  - NEVER ASSUME DATE. Execute `date +%Y-%m-%d` to get the correct date in `YYYY-MM-DD` format.
  - Markdown documents should use proper Markdown formatting.
  - Prefer lowercase kebab-case names for directories and files.
  - Avoid titles that are only numbers.
  - Keep docs topic-first and keep notes/plans/prompts date-first.

### Working with Frontend Codebase

This section contains the comprehensive principles for the Agent to work on the codebase properly

#### Vue Instance

TBD

#### Managing Client-Side Routing

TBD

#### Vue Component

TBD

#### Component Styling with TailwindCSS and DaisyUI

TBD

#### Vue Composables/Hooks

TBD

#### Working with Git

TBD

#### Working with Git Pull Requests

TBD

#### Working with Git Worktree

TBD

#### Parallel Workflow with Git Worktree

TBD
