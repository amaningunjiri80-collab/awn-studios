$env:Path = "$env:LOCALAPPDATA\node\node-v24.18.0-win-x64;$env:LOCALAPPDATA;$env:Path"
$project = "C:\Users\valer\OneDrive\Documents\New OpenCode Project\awn-studios"

# Start dev server if not running
$portCheck = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if (-not ($portCheck | Where-Object { $_.State -eq "Listen" })) {
    Start-Process -WindowStyle Hidden -FilePath "npm.cmd" -ArgumentList "run dev" -WorkingDirectory $project
    Start-Sleep -Seconds 10
}

# Start cloudflared tunnel
$cf = "$env:LOCALAPPDATA\cloudflared.exe"
if (-not (Get-Process -Name "cloudflared" -ErrorAction SilentlyContinue)) {
    Start-Process -WindowStyle Hidden -FilePath $cf -ArgumentList "tunnel --url http://localhost:3000"
    Start-Sleep -Seconds 10
}

Write-Output "Tunnel URL:"
Select-String -Pattern "https://[a-z-]+\.trycloudflare\.com" -Path "$env:TEMP\cf-out.txt" -ErrorAction SilentlyContinue | ForEach-Object { $_.Matches.Value } | Select-Object -First 1
