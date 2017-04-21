@echo off
color 0a
title substitute bot
:top
echo ***************************************************************
echo.
echo options
echo.
echo ***************************************************************
echo.
echo [1] start the bot
echo.
echo [e] Exit
echo.
echo ***************************************************************
echo Enter 1 or e depending on what you want to do:
echo.
set /p choice=
echo.
echo ***************************************************************
if %choice%==1 goto choice

if %choice%==e (
exit
)


:choice
echo Connecting....
CMD /k node Self.js
::if you want a batch file like this then check out https://github.com/RScodes/DiscordBot-Startup-Batch-files for batch files for multiple api's
PAUSE
