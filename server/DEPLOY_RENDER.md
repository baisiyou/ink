# 将后端部署到 Render（免费）

Render 是一个现代化的云平台，提供免费的 Node.js 托管服务。

## 🎯 为什么选择 Render？

- ✅ **完全免费**（Hobby 计划）
- ✅ 支持 Node.js
- ✅ 自动 HTTPS
- ✅ 自动部署（连接 GitHub）
- ✅ 简单易用

## 📋 部署前准备

### 1. 确保后端代码已准备好

检查以下文件存在：
- ✅ `server/package.json`
- ✅ `server/server.js`
- ✅ `server/.gitignore`

### 2. 准备 GitHub 仓库

```bash
# 在项目根目录
git init
git add .
git commit -m "Initial commit"
git branch -M main

# 创建 GitHub 仓库后
git remote add origin https://github.com/yourusername/ink.git
git push -u origin main
```

## 🚀 部署步骤

### 步骤 1: 注册 Render 账号

1. 访问：https://render.com
2. 点击 "Get Started for Free"
3. 选择 "Sign up with GitHub"（推荐，更简单）
4. 授权 Render 访问您的 GitHub 账户

### 步骤 2: 创建新的 Web Service

1. 登录后，点击 **"New +"** 按钮
2. 选择 **"Web Service"**

### 步骤 3: 连接 GitHub 仓库

1. 在 "Connect a repository" 中：
   - 选择您的 GitHub 账户
   - 搜索并选择 `ink` 仓库
   - 点击 "Connect"

### 步骤 4: 配置服务设置

填写以下信息：

#### 基本设置：
- **Name**: `baisiyou-ink-api` (或您喜欢的名字)
- **Environment**: `Node`
- **Region**: `Singapore` 或离您最近的区域
- **Branch**: `main`

#### 构建和启动命令：
- **Build Command**: 
  ```bash
  cd server && npm install
  ```
  
- **Start Command**: 
  ```bash
  cd server && node server.js
  ```

#### 其他设置：
- **Instance Type**: `Free` (免费)
- **Auto-Deploy**: `Yes` (自动部署)

### 步骤 5: 环境变量（可选）

如果需要自定义端口或其他配置，可以添加环境变量：
- 点击 **"Advanced"**
- 添加环境变量：
  - `PORT`: `10000` (Render 会自动设置，一般不需要)

### 步骤 6: 创建服务

1. 点击 **"Create Web Service"**
2. 等待构建和部署（约 2-5 分钟）

### 步骤 7: 获取后端 URL

部署成功后，您会看到：
- **URL**: `https://baisiyou-ink-api.onrender.com` (示例)

**重要**: 记下这个 URL，稍后需要更新前端配置。

## 🔧 更新前端配置

部署后端后，需要修改前端代码以使用新的后端地址。

### 方法 1: 直接修改 api-client.js（推荐）

编辑 `api-client.js`:

```javascript
// 生产环境：使用 Render 后端
const API_BASE_URL = 'https://your-app-name.onrender.com/api';

// 或开发环境：使用本地后端
// const API_BASE_URL = 'http://localhost:3000/api';
```

### 方法 2: 使用环境检测

更智能的方式，自动检测环境：

```javascript
// api-client.js
const API_BASE_URL = 
  window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'  // 本地开发
    : 'https://your-app-name.onrender.com/api';  // 生产环境
```

## 📝 Render 注意事项

### 免费 tier 限制：

1. **休眠机制**
   - 15 分钟无活动后自动休眠
   - 首次访问需要等待几秒唤醒
   - 这是免费的代价，可以接受

2. **文件存储**
   - 免费 tier 的文件系统是**临时的**
   - 应用重启后，`server/data/` 中的数据可能会丢失
   - 如果需要持久化存储，考虑使用数据库

3. **资源限制**
   - CPU 和内存有限制
   - 对于小型应用足够使用

## 🔍 测试部署

1. **检查服务器状态**
   ```bash
   curl https://your-app-name.onrender.com/api/health
   ```

2. **测试注册**
   ```bash
   curl -X POST https://your-app-name.onrender.com/api/register \
     -H "Content-Type: application/json" \
     -d '{"username":"test","email":"test@example.com","password":"123456"}'
   ```

3. **在前端测试**
   - 部署前端到 GitHub Pages
   - 更新 `api-client.js` 中的 API 地址
   - 测试注册和留言功能

## 🔄 自动部署

Render 已连接 GitHub，所以：
- 每次 `git push` 到 `main` 分支
- Render 会自动重新构建和部署
- 无需手动操作

## 📊 查看日志

在 Render Dashboard 中：
- 点击您的服务
- 选择 **"Logs"** 标签
- 可以查看实时日志和错误信息

## 🆘 常见问题

### Q: 部署失败怎么办？
A: 检查构建日志，常见原因：
   - `package.json` 路径错误
   - 构建命令错误
   - Node.js 版本不兼容

### Q: 后端 URL 是什么格式？
A: `https://your-service-name.onrender.com`

### Q: 如何重启服务？
A: 在 Dashboard 中点击 **"Manual Deploy"** → **"Clear build cache & deploy"**

### Q: 数据会丢失吗？
A: 免费 tier 的文件系统是临时的，重启可能丢失。如需持久化，考虑使用数据库。

## ✅ 部署检查清单

- [ ] Render 账号已创建
- [ ] GitHub 仓库已连接
- [ ] Web Service 已创建
- [ ] 构建和启动命令已配置
- [ ] 服务已成功部署
- [ ] 后端 URL 已获取
- [ ] 前端 `api-client.js` 已更新
- [ ] 测试注册功能
- [ ] 测试留言功能

## 🎉 完成！

部署成功后，您的网站架构：
- **前端**: GitHub Pages (`https://yourusername.github.io/ink/`)
- **后端**: Render (`https://your-app.onrender.com`)

两者通过 API 通信，完整功能就绪！

