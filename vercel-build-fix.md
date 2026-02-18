# Fix Vercel Build Errors

The build is failing because old files from the `src/` directory are still in git.

## Quick Fix - Run these commands:

```bash
# Remove src directory from git tracking
git rm -r src/

# Remove .eslintrc.cjs if it exists in git
git rm .eslintrc.cjs 2>/dev/null || echo ".eslintrc.cjs not in git"

# Commit the removal
git commit -m "Remove old src directory and eslintrc.cjs"

# Push to trigger new Vercel build
git push
```

## Alternative: If files don't exist locally but are in git

```bash
# Check what's in git
git ls-files | grep -E "(src/|\.eslintrc\.cjs)"

# Remove from git (but keep locally if needed)
git rm --cached -r src/ 2>/dev/null
git rm --cached .eslintrc.cjs 2>/dev/null

# Commit
git commit -m "Remove old files from git tracking"
git push
```

## Verify the fix

After pushing, Vercel should rebuild successfully. The configs are already updated to ignore these files.

