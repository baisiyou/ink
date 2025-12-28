# 🚀 快速部署指南

## 5 分钟部署到 Render（推荐）

### 第一步：准备代码

确保代码已提交到 GitHub：
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 第二步：在 Render 部署

1. **访问**: https://render.com
2. **注册**: 使用 GitHub 账号登录
3. **新建**: 点击 "New +" → "Web Service"
4. **连接**: 选择您的 GitHub 仓库 `ink`
5. **配置**:
   - Name: `baisiyou-ink-api`
   - Environment: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node server.js`
   - Instance Type: `Free`
6. **创建**: 点击 "Create Web Service"

等待 2-5 分钟，部署完成！

### 第三步：获取后端地址

部署成功后，Render 会显示：
```
https://baisiyou-ink-api.onrender.com
```

**记下这个地址！**

### 第四步：更新前端

编辑 `api-client.js`，替换后端地址：

```javascript
// 找到这一行，替换为您的 Render 地址
return 'https://baisiyou-ink-api.onrender.com/api';
```

### 第五步：部署前端到 GitHub Pages

1. GitHub 仓库 → Settings → Pages
2. Source: `main` branch
3. Folder: `/ (root)`
4. 保存

完成！🎉

---

## 完整的部署架构

```
前端 (GitHub Pages)
  ↓
https://yourusername.github.io/ink/
  ↓ (API 调用)
后端 (Render)
  ↓
https://baisiyou-ink-api.onrender.com
  ↓ (保存数据)
server/data/registrations.txt
server/data/comments.txt
```

---

## 测试

1. **测试后端**: 
   ```
   https://your-app.onrender.com/api/health
   ```

2. **测试前端**: 
   ```
   https://yourusername.github.io/ink/
   ```

3. **测试功能**: 
   - 注册新用户
   - 发表留言
   - 检查数据是否保存

---

## 常见问题

**Q: 后端第一次访问很慢？**  
A: Render 免费版有休眠机制，15分钟无活动后会休眠，首次访问需要几秒唤醒。

**Q: 如何查看后端日志？**  
A: 在 Render Dashboard → 您的服务 → Logs

**Q: 数据会丢失吗？**  
A: Render 免费版文件系统是临时的，重启可能丢失。如需持久化，考虑使用数据库。

**Q: 如何更新代码？**  
A: 直接 `git push`，Render 会自动重新部署。

---

## 下一步

部署完成后，您可以：
- ✅ 访问您的网站
- ✅ 测试注册和留言功能
- ✅ 查看保存的数据文件
- ✅ 自定义网站内容

详细说明请查看 `DEPLOY_RENDER.md`

