# .env 文件配置检查清单

## ✅ 正确的 .env 文件格式

```env
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=your-notification-email@example.com
```

## 📋 配置项说明

### 第1行：PORT
```env
PORT=3000
```
- **必需**: 服务器端口
- **默认**: 3000
- **格式**: 纯数字

### 第2行：SMTP_HOST
```env
SMTP_HOST=smtp.gmail.com
```
- **必需**: SMTP 服务器地址
- **Gmail**: `smtp.gmail.com`
- **Outlook**: `smtp-mail.outlook.com`
- **QQ邮箱**: `smtp.qq.com`

### 第3行：SMTP_PORT
```env
SMTP_PORT=587
```
- **必需**: SMTP 端口
- **常用**: 587 或 465
- **Gmail**: 587
- **QQ邮箱**: 587 或 465

### 第4行：SMTP_SECURE
```env
SMTP_SECURE=false
```
- **必需**: 是否使用 SSL/TLS
- **587端口**: `false`
- **465端口**: `true`
- **格式**: 字符串 `true` 或 `false`

### 第5行：SMTP_USER
```env
SMTP_USER=your-email@gmail.com
```
- **必需**: 发送邮件的邮箱地址
- **格式**: 完整邮箱地址
- **Gmail**: `yourname@gmail.com`

### 第6行：SMTP_PASS
```env
SMTP_PASS=your-app-password
```
- **必需**: 邮箱密码或应用专用密码
- **Gmail**: 必须使用应用专用密码（16位）
- **其他邮箱**: 使用普通密码或授权码

### 第7行：NOTIFICATION_EMAIL
```env
NOTIFICATION_EMAIL=your-notification-email@example.com
```
- **必需**: 接收通知的邮箱地址
- **格式**: 完整邮箱地址
- 所有通知邮件都会发送到这个地址

## ✅ 检查清单

- [ ] 所有7行都已填写（不能为空）
- [ ] 没有多余的空格
- [ ] 等号前后没有空格（错误：`PORT = 3000`，正确：`PORT=3000`）
- [ ] 邮箱地址格式正确
- [ ] Gmail 使用的是应用专用密码，不是普通密码
- [ ] SMTP_SECURE 是字符串 `true` 或 `false`（不是布尔值）

## ❌ 常见错误

### 错误1：等号前后有空格
```env
# ❌ 错误
SMTP_HOST = smtp.gmail.com

# ✅ 正确
SMTP_HOST=smtp.gmail.com
```

### 错误2：缺少引号（邮箱地址中有特殊字符时）
```env
# 一般不需要引号，但如果有空格或特殊字符，可以用引号
SMTP_USER="your email@gmail.com"
```

### 错误3：SMTP_SECURE 值错误
```env
# ❌ 错误（数字）
SMTP_SECURE=0

# ❌ 错误（大小写混合）
SMTP_SECURE=False

# ✅ 正确（小写字符串）
SMTP_SECURE=false
```

### 错误4：Gmail 使用普通密码
```env
# ❌ 错误 - 使用 Gmail 登录密码
SMTP_PASS=mypassword123

# ✅ 正确 - 使用应用专用密码（16位）
SMTP_PASS=abcd efgh ijkl mnop
```

## 🔍 验证配置

创建 `.env` 文件后，启动服务器检查：

```bash
cd server
npm start
```

**如果配置正确，会看到：**
```
✅ Email service ready
📧 Email notifications: Enabled
```

**如果配置错误，会看到：**
```
⚠️  Email service not configured
```
或
```
❌ Email service error: [错误信息]
```

## 📝 创建 .env 文件

```bash
cd server
cp .env.example .env
# 然后编辑 .env 文件，填入您的实际配置
```

