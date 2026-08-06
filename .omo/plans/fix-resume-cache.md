# Fix: Stale Resume PDF Cache

## Problem
`public/resume.pdf` is served at a static URL with no content hash. Browsers and CDNs cache the old version even after the file is replaced.

## Changes (3 files)

### 1. Rename the PDF
- Rename `public/resume.pdf` → `public/resume-2026.pdf`

### 2. Update the link reference
- **File:** `src/config/site.ts` (line 61)
- Change `href: '/resume.pdf'` → `href: '/resume-2026.pdf'`

### 3. Add cache-busting headers
- **File:** `next.config.ts`
- Add a `headers()` config that sets `Cache-Control: public, max-age=0, must-revalidate` for `/resume-2026.pdf`

## Verification
- Run `npm run build` — should succeed with no errors
- Open the site and click the Resume link — should download the new PDF
- Check browser DevTools > Network tab: the PDF response should show `must-revalidate` in cache headers
