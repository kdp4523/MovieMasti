#!/bin/bash

# Script to check for sensitive files before git commit
# Run this script before pushing to GitHub

echo "🔒 Security Check: Scanning for sensitive files..."

# Check for .env files
if find . -name ".env" -not -path "./node_modules/*" | grep -q .; then
    echo "❌ WARNING: .env files found!"
    find . -name ".env" -not -path "./node_modules/*"
    echo "Make sure these are in .gitignore"
else
    echo "✅ No .env files found in tracked directories"
fi

# Check for common secret files
SECRET_PATTERNS=(
    "*.key"
    "*.pem"
    "*secret*"
    "*config/production*"
    "*firebase-config*"
    "*serviceAccountKey*"
)

found_secrets=false
for pattern in "${SECRET_PATTERNS[@]}"; do
    if find . -name "$pattern" -not -path "./node_modules/*" | grep -q .; then
        echo "❌ WARNING: Potential secret files found matching pattern: $pattern"
        find . -name "$pattern" -not -path "./node_modules/*"
        found_secrets=true
    fi
done

if [ "$found_secrets" = false ]; then
    echo "✅ No obvious secret files found"
fi

# Check if .gitignore exists
if [ -f ".gitignore" ]; then
    echo "✅ .gitignore file exists"
else
    echo "❌ WARNING: No .gitignore file found!"
fi

# Check for hardcoded secrets in common files
echo "🔍 Checking for hardcoded secrets in source files..."

HARDCODED_PATTERNS=(
    "mongodb://.*:.*@"
    "sk_test_"
    "sk_live_"
    "pk_test_"
    "pk_live_"
    "Bearer [A-Za-z0-9]"
    "password.*=.*['\"][^'\"]{8}"
)

found_hardcoded=false
for pattern in "${HARDCODED_PATTERNS[@]}"; do
    if grep -r -E "$pattern" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --exclude-dir=node_modules . 2>/dev/null | grep -q .; then
        echo "❌ WARNING: Potential hardcoded secret found!"
        grep -r -E "$pattern" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --exclude-dir=node_modules . 2>/dev/null
        found_hardcoded=true
    fi
done

if [ "$found_hardcoded" = false ]; then
    echo "✅ No hardcoded secrets found in source files"
fi

echo ""
echo "🔒 Security check complete!"
echo "If any warnings were shown above, please fix them before committing to GitHub."
