# Baisiyou Ink API Server

后端服务器，用于保存注册和留言信息到文本文件，并发送邮件通知。

## 功能

- ✅ 保存用户注册信息到 `data/registrations.txt`
- ✅ 保存留言信息到 `data/comments.txt`
- ✅ **发送邮件通知**（注册、登录、留言时）
- ✅ 纯文本文件存储，易于查看和备份

## 安装步骤

1. **安装依赖**
   ```bash
   cd server
   npm install
   ```

2. **配置邮件（可选但推荐）**
   
   创建 `.env` 文件并配置邮件设置：
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   NOTIFICATION_EMAIL=your-notification-email@example.com
   ```
   
   详细配置请查看 [EMAIL_SETUP.md](./EMAIL_SETUP.md)

3. **启动服务器**
   ```bash
   npm start
   # 或开发模式（自动重启）
   npm run dev
   ```

## 数据存储

所有数据保存在 `server/data/` 目录：
- `registrations.txt` - 用户注册信息
- `comments.txt` - 留言信息

文件格式为 JSON，每条记录包含时间戳，便于查看和搜索。

### 文件格式示例

**registrations.txt:**
```
[2025-12-28 14:30:00]
{
  "username": "user123",
  "email": "user@example.com",
  "password": "***hidden***",
  "timestamp": "2025-12-28T06:30:00.000Z"
}
================================================================================
```

**comments.txt:**
```
[2025-12-28 14:35:00]
{
  "username": "user123",
  "email": "user@example.com",
  "message": "这是一条留言",
  "timestamp": "2025-12-28T06:35:00.000Z"
}
================================================================================
```

## API 端点

- `GET /` - 服务器信息
- `POST /api/register` - 保存注册信息并发送邮件通知
- `POST /api/login` - 发送登录通知邮件
- `POST /api/comment` - 保存留言信息并发送邮件通知
- `GET /api/health` - 健康检查

## 📧 邮件通知

当以下事件发生时，会自动发送邮件到 `NOTIFICATION_EMAIL`：

1. **新用户注册** - 包含用户名、邮箱、注册时间
2. **用户登录** - 包含用户名、邮箱、登录时间
3. **新留言** - 包含留言人、留言内容、时间

详细配置请查看 [EMAIL_SETUP.md](./EMAIL_SETUP.md)

## 使用方法

服务器启动后，前端会自动将注册和留言信息发送到服务器保存。

### 手动测试

**测试注册：**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"123456"}'
```

**测试留言：**
```bash
curl -X POST http://localhost:3000/api/comment \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","message":"测试留言"}'
```

## 注意事项

- 密码不会保存到文件（显示为 `***hidden***`）
- `data/` 目录会自动创建
- `data/` 目录已添加到 `.gitignore`，不会被提交到 Git
- 所有数据都是追加到文件，不会覆盖历史记录
- **邮件通知是可选的**，如果不配置 SMTP，服务器仍会正常工作，只是不会发送邮件
- 数据仍会保存到文本文件中，即使邮件发送失败

## 查看数据

直接打开文件查看：
```bash
cat server/data/registrations.txt
cat server/data/comments.txt
```

或在文本编辑器中打开 `server/data/` 目录中的文件。