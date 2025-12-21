# 🔧 Fix PATH Permanently (So npm works in all terminals)

## Quick Fix (Current Session Only)

If you just need to use npm right now in this terminal, run:
```powershell
$env:PATH = $env:PATH + ";C:\Program Files\nodejs"
```

Or run the script:
```powershell
.\fix-path.ps1
```

## Permanent Fix (Recommended)

To make npm work in ALL new PowerShell/Command Prompt windows:

### Method 1: Using GUI (Easiest)

1. Press `Win + R` (Windows key + R)
2. Type: `sysdm.cpl` and press Enter
3. Click the **"Advanced"** tab
4. Click **"Environment Variables"** button (at the bottom)
5. Under **"System variables"** (bottom section), find and select **"Path"**
6. Click **"Edit"** button
7. Click **"New"** button
8. Type exactly: `C:\Program Files\nodejs`
9. Click **"OK"** on all windows
10. **Close ALL terminal/PowerShell windows**
11. **Open a NEW PowerShell window**
12. Test: `npm --version`

### Method 2: Using PowerShell (Run as Administrator)

1. Right-click on PowerShell → **"Run as Administrator"**
2. Run this command:
   ```powershell
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\nodejs", [EnvironmentVariableTarget]::Machine)
   ```
3. Close and reopen PowerShell
4. Test: `npm --version`

### Method 3: Using Command Prompt (Run as Administrator)

1. Right-click Command Prompt → **"Run as Administrator"**
2. Run:
   ```cmd
   setx PATH "%PATH%;C:\Program Files\nodejs" /M
   ```
3. Close and reopen Command Prompt
4. Test: `npm --version`

---

## Verify It Works

After making the change, open a NEW terminal and run:
```powershell
node --version
npm --version
```

Both should show version numbers without errors.

---

## Note

The fix I applied earlier only works for your current PowerShell session. 
After you close this terminal, you'll need to either:
- Apply the permanent fix above, OR
- Run the fix-path.ps1 script each time you open a new terminal


