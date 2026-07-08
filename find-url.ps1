try {
  $metrics = Invoke-WebRequest -Uri "http://127.0.0.1:20241/metrics" -UseBasicParsing -TimeoutSec 5
  $url = $metrics.Content -replace '(?s).*(https://[a-z-]+\.trycloudflare\.com).*', '$1'
  Write-Host "Current tunnel URL: $url" -ForegroundColor Green
} catch {
  Write-Host "Tunnel not running. Check if cloudflared is started." -ForegroundColor Red
}
Read-Host "Press Enter to exit"
