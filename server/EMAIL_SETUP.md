# 📧 邮件通知配置指南

网站现在支持邮件通知功能。当有新用户注册或新留言时，会自动发送邮件通知到您指定的邮箱。

## 📋 需要配置的信息

在 `server/.env` 文件中配置以下信息：

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=your-notification-email@example.com
```

## 🔧 配置步骤

### 1. 创建 `.env` 文件

在 `server` 目录下创建 `.env` 文件：

```bash
cd server
cp .env.example .env
# 或手动创建
touch .env
```

### 2. 配置邮件服务

#### Gmail（推荐）

**步骤：**

1. **启用两步验证**
   - 访问：https://myaccount.google.com/security
   - 启用"两步验证"

2. **生成应用专用密码**
   - 访问：https://myaccount.google.com/apppasswords
   - 选择"邮件"和"其他（自定义名称）"
   - 输入名称（如：Baisiyou Ink）
   - 点击"生成"
   - 复制生成的16位密码

3. **配置 `.env` 文件**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=你的16位应用专用密码
   NOTIFICATION_EMAIL=your-notification-email@gmail.com
   ```

**重要**: 使用应用专用密码，不是 Gmail 的普通登录密码！

#### Outlook / Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
NOTIFICATION_EMAIL=your-notification-email@outlook.com
```

#### QQ 邮箱

```env
SMTP_HOST=smtp.qq.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-qq-number@qq.com
SMTP_PASS=你的授权码
NOTIFICATION_EMAIL=your-notification-email@qq.com
```

**QQ 邮箱获取授权码：**
1. 登录 QQ 邮箱
2. 设置 → 账户
3. 开启 SMTP 服务
4. 生成授权码
5. 使用授权码作为密码

#### 163 邮箱

```env
SMTP_HOST=smtp.163.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@163.com
SMTP_PASS=你的授权码
NOTIFICATION_EMAIL=your-notification-email@163.com
```

### 3. 重启服务器

配置完成后，重启服务器：

```bash
cd server
npm start
```

如果配置正确，会看到：
```
✅ Email service ready
📧 Email notifications: Enabled
```

## 📨 邮件通知内容

### 新用户注册通知

**邮件主题**: `新用户注册 - [用户名]`

**邮件内容包含：**
- 用户名
- 邮箱地址
- 注册时间

### 新留言通知

**邮件主题**: `新留言 - 来自 [用户名]`

**邮件内容包含：**
- 留言人用户名
- 留言人邮箱
- 留言时间
- 留言完整内容

## ✅ 测试邮件功能

1. **检查服务器日志**
   - 启动服务器后，检查是否有 "✅ Email service ready"
   - 如果没有，检查 `.env` 配置

2. **测试注册**
   - 在网站上注册一个新用户
   - 检查是否收到邮件

3. **测试留言**
   - 登录并发表留言
   - 检查是否收到邮件

## ❌ 故障排除

### 邮件发送失败

**检查清单：**
- [ ] `.env` 文件是否存在
- [ ] 所有配置项是否已填写
- [ ] SMTP 服务器地址是否正确
- [ ] 端口是否正确（587 或 465）
- [ ] 密码是否正确（Gmail 需要使用应用专用密码）
- [ ] 防火墙是否允许 SMTP 连接

### 常见错误

**"Invalid login"**
- 检查 `SMTP_USER` 和 `SMTP_PASS` 是否正确
- Gmail 用户确保使用应用专用密码

**"Connection timeout"**
- 检查 `SMTP_HOST` 和 `SMTP_PORT` 是否正确
- 检查网络连接

**"Email service not configured"**
- 确保 `.env` 文件存在且所有配置项已填写

### 查看日志

服务器会在控制台输出邮件发送状态：
- `✅ Email sent successfully` - 发送成功
- `❌ Failed to send email` - 发送失败（查看错误信息）

## 🔒 安全提示

1. **不要提交 `.env` 到 Git**
   - `.env` 已添加到 `.gitignore`
   - 包含敏感信息（密码）

2. **使用应用专用密码**
   - 不要使用邮箱的普通登录密码
   - 使用应用专用密码更安全

3. **定期更换密码**
   - 建议定期更换 SMTP 密码

## 📝 注意事项

- 邮件通知是可选的
- 如果不配置邮件，服务器仍会正常工作，只是不会发送邮件
- 数据仍会保存到文本文件中
- 邮件发送失败不会影响数据保存

## 🎉 完成

配置完成后，每次有新用户注册或新留言时，您都会收到邮件通知！

