# 📧 Render 邮件配置指南

## 问题诊断

通过健康检查 API，我们发现邮件服务未配置：
```json
{
  "emailConfigured": false
}
```

## 🔧 在 Render 配置邮件

### 步骤 1: 进入 Render Dashboard

1. 访问 https://dashboard.render.com
2. 登录您的账号
3. 找到您的服务：`ink` 或 `ink-th4e`
4. 点击服务名称进入详情页

### 步骤 2: 添加环境变量

1. 在服务详情页，点击左侧菜单的 **"Environment"**（环境变量）
2. 点击 **"Add Environment Variable"**（添加环境变量）
3. 逐个添加以下变量：

#### 必需的环境变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `SMTP_HOST` | SMTP 服务器地址 | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP 端口 | `587` |
| `SMTP_SECURE` | 是否使用 SSL/TLS | `false`（Gmail 使用 587 时）或 `true`（使用 465 时）|
| `SMTP_USER` | 发送邮件的邮箱地址 | `your-email@gmail.com` |
| `SMTP_PASS` | 邮箱应用密码（不是普通密码）| `xxxxxxxxxxxx` |
| `NOTIFICATION_EMAIL` | 接收通知的邮箱地址 | `notification@example.com` |

### 步骤 3: 获取邮箱应用密码

#### Gmail 设置步骤：

1. 登录您的 Gmail 账号
2. 访问：https://myaccount.google.com/apppasswords
3. 如果没有开启两步验证，需要先开启
4. 选择 "邮件" 和 "其他（自定义名称）"
5. 输入名称：`Render Baisiyou Ink`
6. 点击 "生成"
7. 复制生成的 16 位密码（格式：`xxxx xxxx xxxx xxxx`）
8. 在 Render 中粘贴这个密码（可以去掉空格）

#### QQ 邮箱设置步骤：

1. 登录 QQ 邮箱
2. 设置 → 账户 → 开启 SMTP 服务
3. 生成授权码
4. 在 Render 中使用授权码作为 `SMTP_PASS`

#### Outlook/Hotmail 设置步骤：

1. 使用您的 Microsoft 账号登录
2. 访问：https://account.microsoft.com/security
3. 启用两步验证
4. 创建应用密码
5. 在 Render 中使用应用密码作为 `SMTP_PASS`

### 步骤 4: 配置示例

#### Gmail 配置示例：
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_SECURE = false
SMTP_USER = your-email@gmail.com
SMTP_PASS = xxxx xxxx xxxx xxxx（应用密码）
NOTIFICATION_EMAIL = your-notification-email@gmail.com
```

#### QQ 邮箱配置示例：
```
SMTP_HOST = smtp.qq.com
SMTP_PORT = 587
SMTP_SECURE = false
SMTP_USER = your-qq-number@qq.com
SMTP_PASS = 授权码（从 QQ 邮箱获取）
NOTIFICATION_EMAIL = notification@example.com
```

### 步骤 5: 保存并重启服务

1. 添加完所有环境变量后，点击 **"Save Changes"**（保存更改）
2. Render 会自动重新部署服务
3. 等待部署完成（约 1-2 分钟）

### 步骤 6: 验证配置

部署完成后，测试邮件配置：

```bash
curl https://ink-th4e.onrender.com/api/health
```

应该看到：
```json
{
  "emailConfigured": true,
  ...
}
```

## 🔍 测试邮件功能

1. 访问网站：https://baisiyou.github.io/ink/
2. 滚动到"留言板"部分
3. 注册一个测试用户
4. 登录
5. 提交一条留言
6. 检查 `NOTIFICATION_EMAIL` 邮箱，应该收到邮件通知

## 🐛 常见问题

### Q: 仍然收不到邮件？

1. **检查垃圾邮件文件夹**：邮件可能被标记为垃圾邮件
2. **检查 Render 日志**：在 Render Dashboard → Logs 查看是否有错误信息
3. **验证环境变量**：确保所有变量都已正确设置
4. **检查邮箱设置**：确保 SMTP 服务已启用，应用密码正确

### Q: 邮件配置错误怎么办？

- 查看 Render 日志中的错误信息
- 常见错误：
  - `Invalid login` - SMTP_USER 或 SMTP_PASS 错误
  - `Connection timeout` - SMTP_HOST 或 SMTP_PORT 错误
  - `Authentication failed` - 需要使用应用密码，而不是普通密码

### Q: 如何查看 Render 日志？

1. 在 Render Dashboard 中点击您的服务
2. 点击 **"Logs"** 标签
3. 查看实时日志和错误信息

## ✅ 配置检查清单

- [ ] 已在 Render 添加所有必需的环境变量
- [ ] 使用了邮箱应用密码（不是普通密码）
- [ ] 环境变量值没有多余的空格
- [ ] 服务已重新部署
- [ ] 健康检查显示 `emailConfigured: true`
- [ ] 已测试提交留言功能
- [ ] 已检查邮箱（包括垃圾邮件文件夹）

## 📝 注意事项

1. **免费 tier 限制**：Render 免费服务在休眠后首次唤醒可能需要几秒
2. **邮件延迟**：邮件发送可能需要几秒到几分钟
3. **安全性**：环境变量在 Render 中是加密存储的，不会暴露在代码中

