# 网站部署指南

## GitHub Pages 部署（仅前端）

GitHub Pages **只能托管静态网站**，所以只能部署前端部分。

### 步骤

1. **准备前端文件**
   - 确保 `index.html`、`styles.css`、`script.js`、`i18n.js`、`api-client.js` 都在根目录
   - 确保 `public/` 目录包含所有图片资源

2. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `main` 分支
   - Folder 选择 `/ (root)`
   - 保存

4. **访问网站**
   - URL: `https://yourusername.github.io/your-repo/`

### ⚠️ 注意事项

- 前端可以正常显示和工作
- 但**后端 API 功能无法使用**（因为 GitHub Pages 不支持 Node.js）
- 注册和留言功能会失败，因为没有后端服务器

---

## 完整部署方案（前端 + 后端）

### 方案 A: 前端 GitHub Pages + 后端免费托管

#### 后端部署选项：

**1. Render（推荐，免费）**
- 网址：https://render.com
- 支持 Node.js，免费 tier 可用
- 步骤：
  1. 注册账号
  2. 新建 Web Service
  3. 连接 GitHub 仓库
  4. 设置：
     - Build Command: `cd server && npm install`
     - Start Command: `cd server && npm start`
  5. 获取后端 URL（如：`https://your-app.onrender.com`）

**2. Railway（免费额度）**
- 网址：https://railway.app
- 类似 Render，也支持 Node.js

**3. Vercel / Netlify Functions**
- 需要将后端改为 Serverless Functions
- 比较复杂，不推荐

#### 修改前端 API 地址

部署后端后，需要修改前端 `api-client.js` 中的 API 地址：

```javascript
const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
```

---

### 方案 B: 全栈平台部署（前端 + 后端一起）

**1. Vercel**
- 支持静态网站 + Serverless Functions
- 需要重构后端代码

**2. Netlify**
- 类似 Vercel
- 支持静态网站 + Netlify Functions

**3. Heroku（不再免费）**
- 可以部署全栈应用
- 但需要付费

---

## 推荐部署方案

### 🎯 最佳方案：前端 GitHub Pages + 后端 Render

1. **前端部署到 GitHub Pages**
   - 免费、快速、稳定
   - URL: `https://yourusername.github.io/ink/`

2. **后端部署到 Render**
   - 免费 tier 可用
   - 自动部署
   - URL: `https://your-app.onrender.com`

3. **修改前端配置**
   - 更新 `api-client.js` 中的 `API_BASE_URL`

---

## 简化方案：纯静态版本（无后端）

如果您只需要展示网站，不需要注册/留言功能：

1. **移除后端依赖**
   - 删除 `server/` 目录
   - 删除 `api-client.js`
   - 修改 `script.js`，移除 API 调用

2. **直接部署到 GitHub Pages**
   - 所有功能正常（除了注册/留言）

---

## 文件部署检查清单

### GitHub Pages 需要的文件：
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `script.js`
- ✅ `i18n.js`
- ✅ `api-client.js`（如果使用后端）
- ✅ `public/` 目录
- ✅ `README.md`
- ❌ `server/` 目录（不需要，GitHub Pages 无法运行）

### 需要添加到 .gitignore：
- `server/node_modules/`
- `server/data/`
- `server/.env`

---

## 快速开始（GitHub Pages）

```bash
# 1. 在项目根目录
git init

# 2. 创建 .gitignore（如果还没有）
echo "server/node_modules/" >> .gitignore
echo "server/data/" >> .gitignore
echo "server/.env" >> .gitignore

# 3. 添加文件
git add .
git commit -m "Initial commit"

# 4. 连接到 GitHub
git remote add origin https://github.com/yourusername/ink.git
git push -u origin main

# 5. 在 GitHub 上启用 Pages
# Settings → Pages → Source: main branch
```

---

## 注意事项

1. **CORS 问题**
   - 后端需要配置 CORS 允许 GitHub Pages 域名访问
   - 已在 `server.js` 中使用 `app.use(cors())`

2. **API 地址**
   - 生产环境需要修改 `api-client.js` 中的 `API_BASE_URL`
   - 可以使用环境变量或配置文件

3. **HTTPS**
   - GitHub Pages 和 Render 都使用 HTTPS
   - 确保后端也使用 HTTPS（免费平台自动提供）

4. **文件存储**
   - Render 的免费 tier 文件系统是临时的
   - 重启后数据可能丢失
   - 如需持久化，考虑使用数据库（MongoDB Atlas 免费版）

