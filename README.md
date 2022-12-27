### Getting started (Dev)

1. Run `yarn install` to generate `node_modules/` with dependencies.
2. Populate `@app/webapp/.env` (check with `.env.example` in the same directory)
3. Run `yarn dev` from the root to start:
   - Sanity headless CMS
   - Next app

### Infrastructure

The monorepo is implemented with yarn workspaces and
turborepo. All modules are found in the `@app/` directory.

### Deployment
Hosting is handled by Vercel. Vercel hooks into pushes to the remote master
branch and builds the new code and serves it to the internet.
