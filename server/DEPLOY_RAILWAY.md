# 将后端部署到 Railway（免费额度）

Railway 是另一个优秀的云平台，也提供免费额度。

## 🎯 Railway vs Render

| 特性 | Railway | Render |
|------|---------|--------|
| 免费额度 | $5/月 | 完全免费 |
| 休眠机制 | 无 | 有（15分钟） |
| 易用性 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 文件持久化 | ✅ | ❌（免费 tier）|

## 📋 部署步骤

### 步骤 1: 注册 Railway

1. 访问：https://railway.app
2. 点击 "Start a New Project"
3. 选择 "Login with GitHub"

### 步骤 2: 创建新项目

1. 点击 **"New Project"**
2. 选择 **"Deploy from GitHub repo"**
3. 选择您的 `ink` 仓库

### 步骤 3: 配置服务

1. Railway 会自动检测到 `package.json`
2. 需要修改根目录为 `server`：
   - 点击服务设置
   - **Root Directory**: `server`
   - **Start Command**: `node server.js`
   - **Build Command**: `npm install`

### 步骤 4: 获取 URL

部署成功后，Railway 会自动生成一个 URL：
- 格式：`https://your-app.up.railway.app`

### 步骤 5: 配置环境变量（可选）

如果需要自定义配置：
- 点击 **"Variables"**
- 添加环境变量（如 `PORT`）

## 🔧 更新前端

同样需要更新 `api-client.js`:

```javascript
const API_BASE_URL = 'https://your-app.up.railway.app/api';
```

## 💡 建议

对于这个项目，**Render 更简单易用**，推荐使用 Render。

但如果需要更好的文件持久化或更多资源，Railway 是个好选择。

