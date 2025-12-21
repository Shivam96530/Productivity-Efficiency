# Quick fix script to add Node.js to PATH for current session
# Run this in PowerShell if npm is not recognized

$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    $env:PATH = $env:PATH + ";$nodePath"
    Write-Host "✅ Node.js added to PATH for this session" -ForegroundColor Green
    Write-Host "Node version: $(node --version)" -ForegroundColor Green
    Write-Host "npm version: $(npm --version)" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found at $nodePath" -ForegroundColor Red
}


