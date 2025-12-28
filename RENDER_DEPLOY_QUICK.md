# 🚀 Render 快速部署指南

## 步骤 1: 在 Render 创建 Web Service

1. 访问 https://render.com 并登录（使用 GitHub 账号）
2. 点击 **"New +"** → **"Web Service"**
3. 连接 GitHub 仓库：`baisiyou/ink`
4. 配置如下：

### 基本设置
- **Name**: `baisiyou-ink-api`
- **Environment**: `Node`
- **Region**: `Singapore`（或离您最近的区域）
- **Branch**: `main`

### 构建和启动命令
- **Build Command**: 
  ```bash
  cd server && npm install
  ```
  
- **Start Command**: 
  ```bash
  cd server && node server.js
  ```

### 其他设置
- **Instance Type**: `Free`
- **Auto-Deploy**: `Yes`

## 步骤 2: 配置环境变量（可选）

如果需要邮件通知功能，在 Render Dashboard 中添加环境变量：

1. 进入服务设置 → **"Environment"**
2. 添加以下变量：
   - `SMTP_HOST`: 您的 SMTP 服务器（如 `smtp.gmail.com`）
   - `SMTP_PORT`: `587`
   - `SMTP_SECURE`: `false`
   - `SMTP_USER`: 您的邮箱地址
   - `SMTP_PASS`: 您的邮箱应用密码
   - `NOTIFICATION_EMAIL`: 接收通知的邮箱地址

**注意**: 如果不配置邮件，注册和留言功能仍然可以正常工作，只是不会发送邮件通知。

## 步骤 3: 部署并获取 URL

1. 点击 **"Create Web Service"**
2. 等待 2-5 分钟完成部署
3. 部署成功后，记下您的服务 URL，例如：
   ```
   https://baisiyou-ink-api.onrender.com
   ```

## 步骤 4: 更新前端 API 地址

部署完成后，需要更新 `api-client.js` 文件：

1. 打开 `api-client.js`
2. 找到第 12 行，将 `https://your-app-name.onrender.com/api` 替换为您的实际 Render URL
3. 例如：
   ```javascript
   return 'https://baisiyou-ink-api.onrender.com/api';
   ```
4. 提交并推送到 GitHub：
   ```bash
   git add api-client.js
   git commit -m "Update API URL for Render deployment"
   git push
   ```

## 步骤 5: 测试

1. 访问您的网站：https://baisiyou.github.io/ink/
2. 测试注册功能
3. 测试留言功能
4. 检查 Render 日志确认一切正常

## ✅ 完成！

现在您的网站架构：
- **前端**: GitHub Pages → https://baisiyou.github.io/ink/
- **后端**: Render → https://your-app.onrender.com

## 📝 注意事项

1. **免费 tier 休眠**: Render 免费服务在 15 分钟无活动后会休眠，首次访问需要几秒唤醒
2. **数据持久化**: 免费 tier 的文件系统是临时的，重启可能丢失数据。如需持久化，考虑使用数据库
3. **自动部署**: 每次推送到 GitHub，Render 会自动重新部署

## 🆘 遇到问题？

查看详细文档：`server/DEPLOY_RENDER.md`

