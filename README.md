# Baisiyou Ink Inc. - 热敏墨水企业网站

专业的现代化热敏微胶囊墨水企业网站，支持多语言（英语、中文、法语）和响应式设计。

## 🌟 主要特性

- 🌍 **多语言支持**: 英语、中文、法语三语种切换
- 📱 **完全响应式**: 完美适配手机、平板、桌面设备
- 🎨 **现代化设计**: 美观的UI和流畅的动画效果
- 🖼️ **高质量图片**: 集成Unsplash免费高质量图片
- ⚡ **性能优化**: 懒加载和图片优化
- 🎭 **丰富动画**: 滚动动画、悬停效果、加载动画

## 📁 文件结构

```
ink/
├── index.html          # 主HTML文件
├── styles.css          # 样式文件
├── script.js           # JavaScript交互文件
├── i18n.js            # 国际化语言文件
├── README.md          # 说明文档
├── IMAGE_SOURCES.md   # 图片资源说明
├── .gitignore         # Git忽略文件
└── public/            # 静态资源目录
    ├── *.png          # 备用图片资源
    ├── *.svg          # 社交媒体图标
    └── locales/       # 语言文件（可选）
```

## 网站功能

### 主要页面模块

1. **首页 (Home)**
   - 热敏微胶囊墨水介绍
   - 核心特性展示
   - 产品宣传

2. **关于我们 (About Us)**
   - 公司介绍
   - 公司故事
   - 团队介绍
   - 核心价值观

3. **产品展示**
   - 墨水产品 (Ink)
   - 浆料产品 (Paste)
   - 笔芯产品 (Refills)
   - 笔产品 (Pen)

4. **产品特性**
   - 可擦除性
   - 温度反应性
   - 技术规格

5. **专业服务**
   - 墨水开发
   - 优化服务
   - 测试服务

6. **联系我们 (Contact Us)**
   - 销售咨询
   - 客户支持
   - 公司地址（中国和加拿大）

7. **留言板 (Guestbook)**
   - 用户注册和登录
   - 留言功能
   - 留言管理（删除自己的留言）
   - 数据存储在浏览器 localStorage

## 使用方法

### 直接在浏览器中打开

1. 双击 `index.html` 文件
2. 或使用浏览器打开：`file:///路径/to/ink/index.html`

### 使用本地服务器（推荐）

```bash
# 使用Python 3
python3 -m http.server 8000

# 使用Node.js (需要安装http-server)
npx http-server -p 8000

# 然后访问 http://localhost:8000
```

## 🚀 快速开始

### 方式一：直接在浏览器中打开

1. 克隆或下载此仓库
2. 双击 `index.html` 文件在浏览器中打开

### 方式二：使用本地服务器（推荐）

```bash
# 使用Python 3
python3 -m http.server 8000

# 使用Node.js
npx http-server -p 8000

# 然后访问 http://localhost:8000
```

### 方式三：使用GitHub Pages部署

1. 将此仓库上传到GitHub
2. 进入仓库设置 > Pages
3. 选择主分支，保存
4. 访问 `https://yourusername.github.io/repository-name`

## 🎨 技术特性

- ✅ **多语言i18n**: 支持英语、中文、法语实时切换
- ✅ **完全响应式设计**: 支持手机、平板、桌面
- ✅ **现代化UI设计**: 精美的界面和交互效果
- ✅ **平滑滚动导航**: 流畅的页面导航体验
- ✅ **移动端友好**: 响应式汉堡菜单
- ✅ **丰富动画效果**: 滚动触发动画、悬停效果、加载动画
- ✅ **图片优化**: Unsplash高质量图片 + 本地备用图片
- ✅ **性能优化**: 懒加载、图片预加载
- ✅ **留言板功能**: 用户注册、登录、留言功能（使用 localStorage）

## 产品信息

### 热敏墨水特性

- **工作温度范围**: -15°C 至 60°C
- **擦除温度**: 超过 60°C (140°F)
- **重现温度**: 低于 -15°C
- **粒径**: 小于 0.8 微米（笔用墨水为 0.2-0.35 微米）
- **涂层**: 聚氨酯涂层，不含甲醛

### 公司信息

**中国地址:**
- 156 Guanghua Road, Qinhuai District, Nanjing, China 210014
- Tel: 86-13951873061; 86-13337181827

**加拿大地址:**
- 1190 Mackay Street, Montreal, QC, Canada H3G 0G1
- Tel: 1-(514) 549-4158; 1-(514) 998-6168

**邮箱:** baisiyou@gmail.com

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 🖼️ 图片资源

网站使用了Unsplash的高质量免费图片，所有图片都有本地备用文件以确保离线可用。

详情请参考 [IMAGE_SOURCES.md](IMAGE_SOURCES.md)

## 🌐 部署到GitHub Pages

1. 在GitHub上创建新仓库
2. 将代码推送到仓库
3. 在仓库设置中启用GitHub Pages
4. 选择主分支作为源
5. 访问 `https://yourusername.github.io/repository-name`

## 📝 自定义

### 修改语言内容
编辑 `i18n.js` 文件中的语言数据对象

### 修改样式
编辑 `styles.css` 文件，使用CSS变量可以轻松修改主题颜色

### 添加新页面
在 `index.html` 中添加新的section，并在导航菜单中添加链接

## 🔧 浏览器支持

- ✅ Chrome (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ Edge (最新版本)

## 📄 许可证

Copyright © 2025 Baisiyou Ink Inc. All rights reserved.

## 许可证

Copyright © 2025 Baisiyou Ink Inc. All rights reserved.
