@echo off
cd /d E:\Setto-webdesign
echo === Git Status ===
git status
echo.
echo === Git Commit ===
git add .
git commit -m "Update redesign"
echo.
echo === Git Push ===
git push origin master
echo.
echo === Vercel Deploy ===
npx vercel deploy --prod --yes
echo.
echo === Done ===