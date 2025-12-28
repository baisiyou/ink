# 📋 部署步骤

## ✅ 已完成的准备工作

- ✅ Git 仓库已初始化
- ✅ 代码已提交到本地仓库
- ✅ 敏感文件已添加到 .gitignore

---

## 🚀 下一步：部署到 GitHub

### 第一步：在 GitHub 创建仓库

1. 访问：https://github.com/new
2. 填写信息：
   - **Repository name**: `baisiyou-ink`（或您喜欢的名字）
   - **Description**: `Baisiyou Ink Company Website`
   - **Visibility**: Public 或 Private（推荐 Public，GitHub Pages 免费）
   - ⚠️ **不要**勾选 "Add a README file"
   - ⚠️ **不要**添加 .gitignore 或 license
3. 点击 "Create repository"

### 第二步：连接本地仓库到 GitHub

复制以下命令，**将 `yourusername` 和 `repository-name` 替换为您的实际 GitHub 用户名和仓库名**：

```bash
cd /Users/zrb/Documents/ink
git remote add origin https://github.com/yourusername/repository-name.git
git push -u origin main
```

**示例**：
```bash
git remote add origin https://github.com/zhangrb/baisiyou-ink.git
git push -u origin main
```

### 第三步：启用 GitHub Pages

1. 在 GitHub 上打开您的仓库
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 "Source" 部分：
   - 选择 `main` 分支
   - 选择 `/ (root)` 文件夹
5. 点击 **Save**
6. 等待几分钟，GitHub 会显示您的网站地址：
   - `https://yourusername.github.io/repository-name/`

---

## 🎉 前端部署完成！

现在您可以通过 GitHub Pages 访问网站了。

---

## 📧 可选：部署后端（完整功能）

如果您需要注册/留言功能保存到服务器并发送邮件，需要部署后端：

### 部署后端到 Render（免费）

1. **访问 Render**: https://render.com
2. **注册/登录**: 使用 GitHub 账号
3. **创建 Web Service**:
   - 点击 "New +" → "Web Service"
   - 选择您的 GitHub 仓库
   - 配置：
     - **Name**: `baisiyou-ink-api`
     - **Environment**: `Node`
     - **Build Command**: `cd server && npm install`
     - **Start Command**: `cd server && node server.js`
     - **Instance Type**: `Free`
4. **添加环境变量**（Settings → Environment Variables）:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=baisiyou@gmail.com
   SMTP_PASS=bgrs eroa yarn yzch
   NOTIFICATION_EMAIL=baisiyou@gmail.com
   ```
5. **等待部署完成**，获取后端 URL（如：`https://xxx.onrender.com`）

### 更新前端 API 地址

部署后端后，编辑 `api-client.js`，将：
```javascript
return 'https://your-app-name.onrender.com/api';
```
替换为实际的 Render URL，然后：
```bash
git add api-client.js
git commit -m "Update API URL for production"
git push
```

---

## 📝 快速命令参考

```bash
# 查看仓库状态
git status

# 查看已连接的远程仓库
git remote -v

# 推送更新到 GitHub
git add .
git commit -m "Update description"
git push

# 查看提交历史
git log --oneline
```

---

## 🎯 部署后检查

- [ ] 网站可以访问（GitHub Pages URL）
- [ ] 所有页面正常显示
- [ ] 图片加载正常
- [ ] 语言切换功能正常
- [ ] 如果部署了后端，测试注册和留言功能

