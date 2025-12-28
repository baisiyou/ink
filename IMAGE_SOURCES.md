# 图片资源说明

网站已集成来自 Unsplash 的高质量免费图片。所有图片都配置了错误处理，如果无法加载网络图片，会自动回退到本地图片。

## 使用的图片资源

### 首页 Hero 区域
- **主产品图**: Unsplash - 笔和墨水相关图片
- 备用: `public/rectangle-105@2x.png`

### 产品系列
- **圆珠笔**: Unsplash - 专业笔具摄影
- **钢笔**: Unsplash - 钢笔特写
- **滚珠笔**: Unsplash - 现代笔具
- **可擦除凝胶笔**: Unsplash - 笔具系列

### 产品特性
- **可擦除性**: Unsplash - 书写相关图片
- **温度反应性**: Unsplash - 科学/化学相关
- **温度敏感性**: Unsplash - 实验室/研究相关

### 墨水演示
- **演示图1**: Unsplash - 墨水流动效果
- **演示图2**: Unsplash - 墨水应用场景

### 关于我们
- **团队图片**: Unsplash - 团队协作/实验室场景

## 图片服务说明

### Unsplash Source API
- 所有图片通过 Unsplash Source API 加载
- 自动优化图片尺寸和格式
- 支持响应式加载
- 完全免费使用

### 错误处理
- 如果网络图片无法加载，会自动使用本地备用图片
- 确保网站在离线或网络不佳时仍能正常显示

## 如何替换图片

如果您想使用自己的图片，可以：

1. **替换网络图片URL**:
   - 编辑 `index.html` 文件
   - 找到相应的 `<img>` 标签
   - 修改 `src` 属性为您自己的图片URL

2. **使用本地图片**:
   - 将图片放入 `public/` 目录
   - 更新 `src` 属性为本地路径
   - 移除 `onerror` 回退属性（如果不需要）

## 推荐的免费图片资源

1. **Unsplash** (https://unsplash.com/)
   - 高质量免费图片
   - 无需注册即可使用
   - 商业使用友好

2. **Pexels** (https://www.pexels.com/)
   - 免费高质量图片
   - 视频资源也可用
   - 无需归属（推荐）

3. **Pixabay** (https://pixabay.com/)
   - 免费图片、插图和矢量图
   - 无版权限制
   - 适合商业使用

## 图片搜索关键词建议

- "pen", "writing", "ink"
- "stationery", "office supplies"
- "laboratory", "research"
- "science", "chemistry"
- "team", "collaboration"
- "professional", "business"

## 注意事项

- 确保使用的图片符合版权要求
- 推荐使用有明确商业使用许可的图片
- Unsplash 图片可以免费商用，但建议在网站底部添加 Unsplash 的感谢信息（可选）
