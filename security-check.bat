@echo off
echo 🔒 Security Check: Scanning for sensitive files...

:: Check for .env files
echo Checking for .env files...
for /r %%i in (.env) do (
    if exist "%%i" (
        echo ❌ WARNING: .env file found at %%i
        echo Make sure this is in .gitignore
    )
)

:: Check if .gitignore exists
if exist ".gitignore" (
    echo ✅ .gitignore file exists
) else (
    echo ❌ WARNING: No .gitignore file found!
)

:: Check for potential secret files
echo Checking for potential secret files...
if exist "*.key" echo ❌ WARNING: .key files found
if exist "*.pem" echo ❌ WARNING: .pem files found
if exist "*secret*" echo ❌ WARNING: Files with 'secret' in name found

:: Basic check for hardcoded patterns in JavaScript files
echo 🔍 Checking for potential hardcoded secrets...
findstr /S /I "mongodb://" *.js *.jsx 2>nul && echo ❌ WARNING: Potential MongoDB connection string found
findstr /S /I "sk_test_" *.js *.jsx 2>nul && echo ❌ WARNING: Potential Stripe secret key found
findstr /S /I "sk_live_" *.js *.jsx 2>nul && echo ❌ WARNING: Potential Stripe live secret key found

echo.
echo 🔒 Security check complete!
echo If any warnings were shown above, please fix them before committing to GitHub.
echo.
echo To run a more thorough check, install Git Bash and run security-check.sh
pause
