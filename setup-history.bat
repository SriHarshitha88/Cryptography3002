@echo off
git checkout --orphan new-history
git add package.json package-lock.json tsconfig*.json vite.config.ts eslint.config.js postcss.config.js tailwind.config.ts components.json
git commit -m "chore: Initialize project with modern tech stack (Vite + React + TypeScript)"
git add src/components/ui/
git commit -m "feat(ui): Set up shadcn/ui component library with custom theme"
git add src/utils/cipherUtils.ts
git commit -m "feat(core): Implement classical cipher algorithms with TypeScript"
git add src/context/CipherContext.tsx
git commit -m "feat(state): Add cipher context provider with encryption/decryption logic"
git add src/pages/
git commit -m "feat(routing): Add page components and implement React Router setup"
git add .
git commit -m "docs: Update documentation and finalize project structure"
git branch -D main
git branch -m main
git push -f origin main 