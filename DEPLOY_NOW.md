# 🚀 快速部署指南

## 方案选择

### 选项 1: 仅前端（GitHub Pages）- 推荐新手
- ✅ 最简单
- ✅ 完全免费
- ❌ 后端功能不可用（注册/留言不会保存到服务器）

### 选项 2: 前端 + 后端（完整功能）
- ✅ 完整功能
- ✅ 注册/留言会保存并发送邮件
- 需要：GitHub Pages + Render/Railway

---

## 📋 部署前检查清单

- [ ] 所有代码已保存
- [ ] `.gitignore` 已配置（排除敏感文件）
- [ ] `server/.env` 不会提交到 Git
- [ ] 测试过网站功能

---

## 🎯 选项 1: 仅前端部署到 GitHub Pages

### 步骤：

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 仓库名：`baisiyou-ink`（或其他名字）
   - 选择 Public 或 Private
   - 不要初始化 README、.gitignore 或 license

2. **初始化 Git 并推送**
   ```bash
   cd /Users/zrb/Documents/ink
   git init
   git add .
   git commit -m "Initial commit: Baisiyou Ink website"
   git branch -M main
   git remote add origin https://github.com/yourusername/baisiyou-ink.git
   git push -u origin main
   ```

3. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source: 选择 `main` 分支
   - Folder: 选择 `/ (root)`
   - 点击 Save

4. **访问网站**
   - URL: `https://yourusername.github.io/baisiyou-ink/`

---

## 🎯 选项 2: 完整部署（前端 + 后端）

### 第一步：部署前端到 GitHub Pages

按照"选项 1"的步骤 1-4 部署前端。

### 第二步：部署后端到 Render

1. **确保代码已推送到 GitHub**

2. **在 Render 部署后端**
   - 访问：https://render.com
   - 注册/登录（使用 GitHub）
   - 点击 "New +" → "Web Service"
   - 选择您的仓库
   - 配置：
     - **Name**: `baisiyou-ink-api`
     - **Environment**: `Node`
     - **Build Command**: `cd server && npm install`
     - **Start Command**: `cd server && node server.js`
     - **Instance Type**: `Free`
   - 添加环境变量（Settings → Environment）：
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=baisiyou@gmail.com
     SMTP_PASS=bgrs eroa yarn yzch
     NOTIFICATION_EMAIL=baisiyou@gmail.com
     ```
   - 点击 "Create Web Service"

3. **等待部署完成**
   - 获取后端 URL（如：`https://baisiyou-ink-api.onrender.com`）

4. **更新前端 API 地址**
   - 编辑 `api-client.js`
   - 将 `your-app-name.onrender.com` 替换为实际的 Render URL
   - 提交并推送到 GitHub
   - GitHub Pages 会自动更新

---

## 📝 详细步骤

### 1. 准备 Git 仓库

```bash
cd /Users/zrb/Documents/ink

# 初始化 Git（如果还没有）
git init

# 检查 .gitignore 是否包含敏感文件
cat .gitignore

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Baisiyou Ink website"
```

### 2. 连接到 GitHub

```bash
# 替换 yourusername 和 repository-name 为实际值
git remote add origin https://github.com/yourusername/repository-name.git
git branch -M main
git push -u origin main
```

### 3. 验证部署

- 前端：访问 `https://yourusername.github.io/repository-name/`
- 后端：访问 `https://your-app.onrender.com/api/health`

---

## ⚠️ 重要提示

1. **不要提交 `.env` 文件**
   - 已添加到 `.gitignore`
   - 部署到 Render 时在环境变量中配置

2. **不要提交 `server/data/` 目录**
   - 已添加到 `.gitignore`

3. **后端环境变量**
   - 在 Render Dashboard 中配置
   - 不要硬编码在代码中

---

## 🆘 需要帮助？

如果遇到问题：
1. 检查 Git 状态：`git status`
2. 查看部署日志（GitHub Pages 或 Render）
3. 检查浏览器控制台错误
4. 检查后端健康检查：`/api/health`

