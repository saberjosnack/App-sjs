@echo off
title SJS Print Agent
rem ============================================
rem  وكيل طباعة SJS — شغّله وخليه فاتح بالخلفية
rem  (حط اختصار له بمجلد Startup ليشتغل تلقائيًا مع الويندوز)
rem ============================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0SJS-Print-Agent.ps1"
pause
