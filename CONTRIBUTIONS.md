# Contributing to SAFARA

This guide will help you get started with the development workflow and best practices.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [CI/CD Pipeline](#cicd-pipeline)

---

## Getting Started

### Prerequisites

- **pnpm**: v8.10.0 or higher
- **Git**: Latest version

### Installation

1. **Clone the repository**

   ```bash
   git git@github.com:Safara-Magazine/safara-app.git
   cd safara-app
   ```

2. **Install pnpm** (if not already installed)

   ```bash
   npm install -g pnpm
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

   The app should now be running at [http://localhost:3000](http://localhost:3000)

---

## Development Workflow

### Available Scripts

```bash
# Start development server
pnpm run dev

# Run linting
pnpm run lint

# Fix linting issues automatically
pnpm lint:fix

# Run type checking
pnpm type-check

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests (if configured)
pnpm test
```

### Creating a New Branch

Always create a new branch for your work. Use descriptive branch names that follow this convention:

```bash
# Feature branches
git checkout -b feature/user-authentication
git checkout -b feature/payment-integration

# Bug fix branches
git checkout -b fix/login-validation
git checkout -b fix/mobile-responsive-issue

# Hotfix branches (for urgent production fixes)
git checkout -b hotfix/security-patch

# Chore/maintenance branches
git checkout -b chore/update-dependencies
git checkout -b chore/refactor-api-service
```

**Branch Naming Convention:**

- `feature/` - New features or enhancements
- `fix/` - Bug fixes
- `hotfix/` - Urgent production fixes
- `chore/` - Maintenance tasks, refactoring, dependency updates
- `docs/` - Documentation updates

---

## Code Standards

### TypeScript Guidelines

- **Define types explicitly**: Avoid using `any` type
- **Use interfaces for objects**: Prefer `interface` over `type` for object shapes
- **Export types**: Export types that are used across multiple files

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// ❌ Bad
const user: any = { ... };
```

### Next.js Best Practices

- **Use App Router** (if using Next.js 13+)
- **Server Components by default**: Only use Client Components when needed
- **Dynamic imports**: Use for heavy components to improve performance
- **Image optimization**: Always use `next/image` for images
- **Metadata API**: Use for SEO optimization

---

## File Naming Conventions

## General Rules

- Use **clear and descriptive names** that reflect the file’s purpose.
- Use **lowercase and dot-separated words** (e.g., `component.footer.tsx`).
- Avoid abbreviations unless they are widely understood.

## Prefix by Purpose

Each file should be **prefixed by its functional category**.  
This helps developers quickly identify a file’s purpose within the project.

| **Prefix**    | **Purpose / Description**                                             | **Example Filename**                           |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------- |
| `component.`  | UI components (React components, layouts, reusable elements).         | `component.footer.tsx`, `component.navbar.tsx` |
| `layout.`     | Page or section layouts.                                              | `layout.dashboard.tsx`, `layout.auth.tsx`      |
| `page.`       | Next.js route files (optional naming for clarity).                    | `page.login.tsx`, `page.profile.tsx`           |
| `hook.`       | Custom React hooks.                                                   | `hook.useAuth.ts`, `hook.useDebounce.ts`       |
| `lib.`        | Utility functions, helpers, or shared logic.                          | `lib.fetchUser.ts`, `lib.formatDate.ts`        |
| `config.`     | Configuration files (API endpoints, constants, environment settings). | `config.api.ts`, `config.theme.ts`             |
| `store.`      | State management files (Zustand, Redux, etc.).                        | `store.user.ts`, `store.cart.ts`               |
| `query.`      | TanStack Query functions or key definitions.                          | `query.user.ts`, `query.posts.ts`              |
| `schema.`     | Type or validation schemas (e.g., Zod, Yup).                          | `schema.user.ts`, `schema.form.ts`             |
| `type.`       | TypeScript type or interface definitions.                             | `type.user.ts`, `type.api.ts`                  |
| `animation.`  | GSAP or motion animation logic.                                       | `animation.hero.ts`, `animation.menu.ts`       |
| `icon.`       | Custom icon components or Lucide wrappers.                            | `icon.logo.tsx`, `icon.menu.tsx`               |
| `style.`      | CSS Modules, Tailwind extensions, or styled components.               | `style.button.module.css`, `style.theme.ts`    |
| `test.`       | Unit or integration test files.                                       | `test.user.spec.ts`, `test.api.test.ts`        |
| `mock.`       | Mock data or API responses for testing/dev.                           | `mock.user.ts`, `mock.products.ts`             |
| `service.`    | API interaction logic or backend integration.                         | `service.auth.ts`, `service.stripe.ts`         |
| `context.`    | React context definitions and providers.                              | `context.theme.tsx`, `context.auth.tsx`        |
| `middleware.` | Server-side logic or API middleware.                                  | `middleware.auth.ts`, `middleware.logger.ts`   |

---

## Example Project Structure

```

/app
/dashboard
component.header.tsx
component.sidebar.tsx
layout.dashboard.tsx
store.dashboard.ts
lib.fetchData.ts
query.dashboard.ts
animation.cards.ts
style.dashboard.module.css

```

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for clear and consistent commit messages.

### Commit Message Format

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without changing functionality
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates
- **ci**: CI/CD configuration changes
- **build**: Build system or external dependency changes

### Examples

```bash
# Feature
git commit -m "feat(auth): add social login with Google OAuth"

# Bug fix
git commit -m "fix(payment): resolve checkout page crash on mobile"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactoring
git commit -m "refactor(api): simplify user service logic"

# Performance
git commit -m "perf(images): implement lazy loading for gallery"

# With body and footer
git commit -m "fix(auth): prevent duplicate user registration

```

### Commit Message Best Practices

- **Use imperative mood**: "add feature" not "added feature"
- **Keep subject line under 72 characters**
- **Capitalize the subject line**
- **No period at the end of subject**
- **Separate subject from body with blank line**
- **Use body to explain what and why, not how**
- **Reference issues and PRs in footer**

---

## Pull Request Process

### Before Creating a PR

1. **Ensure your branch is up to date**

   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   # Or merge if preferred: git merge main
   ```

2. **Run all checks locally**
   ```bash
   pnpm lint          # Check for linting errors
   pnpm type-check    # Check for TypeScript errors
   pnpm build         # Ensure production build works
   ```

### Creating a Pull Request

1. **Push your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**

   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Choose base branch: `main` or `staging`

3. **Fill out the PR template**

   ```markdown
   ## Description

   Brief description of what this PR does

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Changes Made

   - List key changes
   - Be specific about what was modified

   ## Screenshots (if applicable)

   Add screenshots for UI changes

   ## Related Issues

   Closes #123
   ```

### PR Best Practices

- **Keep PRs small and focused**: One feature/fix per PR
- **Write descriptive titles**: Use conventional commit format
- **Provide context**: Explain why the change is needed
- **Add screenshots**: For UI changes, always include before/after screenshots
- **Request reviews**: Tag relevant team members
- **Respond to feedback**: Address all review comments
- **Keep it updated**: Resolve merge conflicts promptly

### PR Title Format

```
feat(auth): implement two-factor authentication
fix(ui): resolve mobile menu overflow issue
docs(contributing): add commit message guidelines
```

---

## CI/CD Pipeline

Our CI/CD pipeline runs automatically on every pull request to `main` and `staging` branches.

### What the CI Pipeline Checks

1. **Linting**: Ensures code follows our style guidelines
2. **Type Checking**: Verifies TypeScript types are correct
3. **Build**: Ensures the project builds successfully

### CI Workflow File

The workflow is defined in `.github/workflows/ci.yml`:

### If CI Fails

1. **Check the Actions tab** on GitHub to see error details
2. **Run the same commands locally** to reproduce the error
   ```bash
   pnpm lint
   pnpm build
   ```
3. **Fix the issues** and push new commits
4. **CI will automatically re-run** on new commits

### Branch Protection Rules

- **`main` branch**: Requires PR reviews and passing CI checks
- **`staging` branch**: Requires passing CI checks
- **Direct pushes**: Not allowed to protected branches

---

## Code Review Guidelines

---

## Getting Help

- **Documentation**: Check the project wiki
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Team Chat**: Reach out on Slack/Discord (if applicable)

---

---

## Thank You! 🎉
