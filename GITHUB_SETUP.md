# 📦 Git & GitHub Setup Guide

## Quick Start: Push Your Project to GitHub

### Step 1: Initialize Git Repository

If you haven't initialized Git yet:

```bash
git init
```

### Step 2: Configure Git (First Time Only)

Set your name and email for Git commits:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Review Files to Commit

Check what will be committed:

```bash
git status
```

**Important**: Make sure `.env` files are NOT listed (they should be in `.gitignore`)

### Step 4: Add Files to Git

Add all project files:

```bash
git add .
```

### Step 5: Create First Commit

```bash
git commit -m "Initial commit: Medical Appointment Booking System"
```

### Step 6: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `medical-appointment-system` (or your preferred name)
   - **Description**: Medical Appointment Booking System - MERN Stack
   - **Visibility**: Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click **"Create repository"**

### Step 7: Connect Local Repo to GitHub

Copy your repository URL from GitHub (it will look like this):
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Then run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Example** (replace with your actual details):
```bash
git remote add origin https://github.com/johnsmith/medical-appointment-system.git
git branch -M main
git push -u origin main
```

### Step 8: Verify on GitHub

1. Refresh your GitHub repository page
2. You should see all your project files
3. Verify `.env` files are NOT visible (they should be ignored)

---

## ✅ Verification Checklist

After pushing to GitHub, verify:
- [ ] All source code files are visible
- [ ] `package.json` files are present
- [ ] Documentation files (`.md` files) are visible
- [ ] `.env` files are NOT visible (check both `backend/.env` and `frontend/.env`)
- [ ] `.gitignore` files are present and working

---

## 🔐 Security Check

**CRITICAL**: Ensure these files are NOT in your GitHub repository:
- ❌ `backend/.env`
- ❌ `frontend/.env`
- ❌ Any file containing passwords, API keys, or secrets

If you accidentally committed `.env` files:

### Remove Committed .env Files

```bash
# Remove from Git but keep locally
git rm --cached backend/.env
git rm --cached frontend/.env

# Commit the removal
git commit -m "Remove .env files from repository"

# Push changes
git push origin main
```

---

## 🔄 Making Changes and Updating

After making changes to your code:

```bash
# Check what changed
git status

# Add changes
git add .

# Commit with descriptive message
git commit -m "Add new feature: appointment reminders"

# Push to GitHub
git push origin main
```

**Note**: Render and Vercel will automatically redeploy when you push to GitHub!

---

## 🌿 Working with Branches (Optional)

For feature development:

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push branch to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub
# Merge when ready
```

---

## 📂 What Should Be in `.gitignore`

Your `.gitignore` files should contain:

### Backend `.gitignore`:
```
node_modules/
.env
.env.local
.DS_Store
*.log
.vscode/
coverage/
dist/
build/
```

### Frontend `.gitignore`:
```
# dependencies
node_modules/
/.pnp
.pnp.js

# testing
/coverage

# production
/dist
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
```

---

## 🚨 Common Git Issues

### Issue: "remote origin already exists"

**Solution**:
```bash
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Issue: "Updates were rejected because the remote contains work"

**Solution** (if you just created the repo):
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Issue: Authentication failed

**Solutions**:
1. **Use Personal Access Token** (recommended):
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with `repo` scope
   - Use token as password when pushing

2. **Use SSH** (alternative):
   ```bash
   # Generate SSH key
   ssh-keygen -t ed25519 -C "your.email@example.com"
   
   # Add SSH key to GitHub
   # Go to GitHub Settings → SSH and GPG keys → New SSH key
   # Copy your public key: type > ~/.ssh/id_ed25519.pub
   
   # Change remote to SSH
   git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

---

## 📝 Good Commit Message Examples

✅ Good:
```bash
git commit -m "Add patient appointment cancellation feature"
git commit -m "Fix: Resolve login authentication bug"
git commit -m "Update: Improve doctor search performance"
git commit -m "Docs: Add deployment instructions"
```

❌ Bad:
```bash
git commit -m "changes"
git commit -m "fix bug"
git commit -m "update"
```

---

## 🎯 Next Steps After GitHub Setup

1. ✅ Verify repository on GitHub
2. 📦 Continue with **MongoDB Atlas setup** (see `DEPLOYMENT_CHECKLIST.md`)
3. 🚀 Deploy backend to **Render**
4. 🌐 Deploy frontend to **Vercel**
5. ✨ Test live application

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Ready to deploy?** Once your code is on GitHub, continue with the `DEPLOYMENT_CHECKLIST.md`! 🚀
