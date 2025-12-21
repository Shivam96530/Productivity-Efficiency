# 🔧 How to Install Node.js on Windows - Step by Step

## Method 1: Official Installer (Easiest)

### Step 1: Download Node.js
1. Open your web browser
2. Go to: **https://nodejs.org/**
3. You'll see two green buttons:
   - **LTS** (Recommended) - This is the stable version
   - **Current** - Latest features
4. Click **"LTS"** button to download
5. The file will be named something like: `node-v20.10.0-x64.msi`

### Step 2: Install Node.js
1. **Double-click** the downloaded `.msi` file
2. Click **"Next"** on the welcome screen
3. **Accept** the license agreement → Click **"Next"**
4. **IMPORTANT:** On the "Custom Setup" screen:
   - Make sure **"Add to PATH"** is checked ✅
   - If you see it unchecked, check it!
5. Click **"Next"** → **"Next"** → **"Install"**
6. Wait for installation (may take 1-2 minutes)
7. Click **"Finish"**

### Step 3: Restart Your Terminal
1. **Close** your PowerShell window completely
2. **Open a NEW PowerShell window**
3. Navigate to your project:
   ```powershell
   cd C:\Users\sachi\OneDrive\Desktop\project
   ```

### Step 4: Verify Installation
Run these commands:
```powershell
node --version
npm --version
```

You should see version numbers like:
```
v20.10.0
10.2.3
```

---

## Method 2: Using Winget (Windows 11/10)

If you have Windows 11 or Windows 10 with winget:

1. Open PowerShell as Administrator:
   - Right-click on PowerShell
   - Select "Run as Administrator"

2. Run this command:
   ```powershell
   winget install OpenJS.NodeJS.LTS
   ```

3. Close and reopen PowerShell

4. Verify:
   ```powershell
   node --version
   npm --version
   ```

---

## Method 3: Manual PATH Configuration

If Node.js is installed but not recognized:

### Check if Node.js is installed:
1. Open File Explorer
2. Go to: `C:\Program Files\nodejs\`
3. Check if `node.exe` exists there

### Add to PATH manually:
1. Press `Win + R`
2. Type: `sysdm.cpl` and press Enter
3. Click **"Advanced"** tab
4. Click **"Environment Variables"** button
5. Under **"System variables"**, find and select **"Path"**
6. Click **"Edit"**
7. Click **"New"**
8. Add this path: `C:\Program Files\nodejs\`
9. Click **"OK"** on all windows
10. **Restart your computer** (or at least close all terminal windows)

---

## Method 4: Using Chocolatey (If you have it)

1. Open PowerShell as Administrator
2. Run:
   ```powershell
   choco install nodejs-lts
   ```
3. Close and reopen PowerShell

---

## Common Issues & Solutions

### Issue 1: "npm is not recognized" after installing Node.js
**Solution:**
- Close ALL terminal/PowerShell windows
- Open a NEW PowerShell window
- Try again

### Issue 2: Node.js installed but still not found
**Solution:**
- Restart your computer
- Or manually add to PATH (see Method 3 above)

### Issue 3: Permission errors
**Solution:**
- Right-click PowerShell → "Run as Administrator"
- Try installation again

### Issue 4: Installation stuck
**Solution:**
- Close the installer
- Restart your computer
- Try installing again

---

## After Installation - Next Steps

Once Node.js is installed and working:

1. **Verify it works:**
   ```powershell
   node --version
   npm --version
   ```

2. **Install project dependencies:**
   ```powershell
   cd C:\Users\sachi\OneDrive\Desktop\project
   npm run install-all
   ```

3. **Set up MongoDB** (see README.md)

4. **Run the project:**
   ```powershell
   npm run dev
   ```

---

## Still Having Issues?

1. **Check Node.js installation:**
   - Go to: `C:\Program Files\nodejs\`
   - If folder doesn't exist, Node.js is not installed

2. **Check PATH:**
   ```powershell
   $env:PATH
   ```
   Look for `nodejs` in the output

3. **Try full path:**
   ```powershell
   "C:\Program Files\nodejs\node.exe" --version
   ```
   If this works, PATH is the issue

4. **Reinstall Node.js:**
   - Uninstall from Control Panel → Programs
   - Download fresh installer from nodejs.org
   - Install again with "Add to PATH" checked

---

## Quick Download Links

- **Node.js LTS (Recommended):** https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi
- **Node.js Website:** https://nodejs.org/

---

**Need more help?** Check the official Node.js documentation: https://nodejs.org/en/docs/


