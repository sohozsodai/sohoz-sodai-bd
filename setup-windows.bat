@echo off
copy .env.example .env >nul 2>&1
call npm install
call npx prisma db push
call npm run db:seed
echo.
echo Setup complete. Edit .env and set ADMIN_PASSWORD and AUTH_SECRET, then run: npm run dev
pause
