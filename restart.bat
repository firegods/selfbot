@echo off
title Selfbot
color 2b
pm2 restart bot.js --name Selfbot
goto restart
