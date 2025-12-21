# 🚀 Setup Guide - Installing Node.js on Windows

## Step 1: Install Node.js

You need to install Node.js (which includes npm) first. Follow these steps:

### Option A: Download from Official Website (Recommended)

1. **Visit Node.js website:**
   - Go to: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation wizard
   - ✅ **IMPORTANT:** Make sure to check "Add to PATH" option during installation
   - Click "Install" and wait for installation to complete
   - Click "Finish"

3. **Verify Installation:**
   - Close and reopen your PowerShell/Command Prompt
   - Run these commands to verify:
   ```powershell
   node --version
   npm --version
   ```
   - You should see version numbers (e.g., v20.10.0 and 10.2.3)

### Option B: Using Chocolatey (If you have it)

If you have Chocolatey package manager installed:
```powershell
choco install nodejs-lts
```

### Option C: Using Winget (Windows 11/10)

```powershell
winget install OpenJS.NodeJS.LTS
```

## Step 2: Restart Your Terminal

After installing Node.js:
1. **Close** your current PowerShell window
2. **Open a new** PowerShell window
3. Navigate back to your project:
   ```powershell
   cd C:\Users\sachi\OneDrive\Desktop\project
   ```

## Step 3: Verify Node.js is Working

Run these commands to confirm:
```powershell
node --version
npm --version
```

Both should show version numbers.

## Step 4: Install Project Dependencies

Once Node.js is installed, run:
```powershell
npm run install-all
```

This will install all dependencies for:
- Root project
- Backend server
- Frontend React app

## Step 5: Set Up MongoDB

1. Go to `backend` folder
2. Create a `.env` file with your MongoDB connection string

## Step 6: Run the Project

```powershell
npm run dev
```

## Troubleshooting

### If npm is still not recognized after installation:

1. **Check if Node.js is in PATH:**
   - Press `Win + R`
   - Type: `sysdm.cpl` and press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "System variables", find "Path"
   - Check if these are included:
     - `C:\Program Files\nodejs\`
     - `C:\Users\YourUsername\AppData\Roaming\npm`
   - If not, add them manually

2. **Restart your computer** after adding to PATH

3. **Use full path temporarily:**
   ```powershell
   "C:\Program Files\nodejs\npm.cmd" --version
   ```

### Alternative: Use nvm-windows (Node Version Manager)

If you want to manage multiple Node.js versions:
1. Download from: https://github.com/coreybutler/nvm-windows/releases
2. Install nvm-windows
3. Then install Node.js:
   ```powershell
   nvm install lts
   nvm use lts
   ```

## Need Help?

- Node.js Documentation: https://nodejs.org/en/docs/
- npm Documentation: https://docs.npmjs.com/


