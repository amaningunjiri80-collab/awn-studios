@echo off
powershell -Command "foreach ($p in @(20241,60478,20240,20242)) { try { $m = Invoke-WebRequest -Uri \"http://127.0.0.1:$p/metrics\" -UseBasicParsing -TimeoutSec 2; $u = [regex]::Match($m.Content, 'https://[a-z-]+\.trycloudflare\.com').Value; if ($u) { Write-Host 'Current URL:' -NoNewline; Write-Host $u -ForegroundColor Green; exit } } catch {} }; Write-Host 'Tunnel not running.' -ForegroundColor Red"
pause
