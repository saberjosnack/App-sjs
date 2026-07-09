@echo off
rem ============================================
rem  SJS POS - تشغيل بطباعة فورية بدون نوافذ
rem  عدل السطر التالي بعد الرفع: حط رابطك بدل العنوان
rem ============================================
set URL=https://saberjosnack.github.io/sjs-pos/
start "" chrome --kiosk-printing --app=%URL%
if errorlevel 1 start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --kiosk-printing --app=%URL%
