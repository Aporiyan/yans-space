# Yan's Space

一个优雅的个人网站，用于展示文章、工具和收藏的链接。

## 特性

- 🎨 **优雅设计**: 薰衣草紫和高级灰配色，带有毛玻璃效果
- 📝 **文章系统**: 自动加载 Markdown 文件，无需手动配置
- 🛠️ **工具集合**: 展示个人开发的小工具
- 🔗 **链接收藏**: 收藏有意义的网站和资源
- 📁 **文件分享**: 分享有用的文档和资料
- 📱 **响应式设计**: 完美适配桌面和移动设备

## 如何添加文章

1. 在 `articles/` 文件夹中创建新的 Markdown 文件
2. 文件会自动被系统检测和加载
3. 系统会自动提取标题、摘要、分类和标签

### 文章文件命名建议

- 使用有意义的文件名，如 `javascript-tips.md`
- 可以包含日期，如 `2024-01-15-new-feature.md`
- 使用连字符分隔单词

### Markdown 格式建议

```markdown
# 文章标题

文章简介或摘要...

## 章节标题

内容...

### 子章节

更多内容...
```

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: CSS Grid, Flexbox, CSS Variables
- **字体**: Inter (Google Fonts)
- **图标**: Font Awesome
- **部署**: GitHub Pages

## 本地开发

1. 克隆仓库
2. 使用任意 HTTP 服务器运行，如：
   ```bash
   python -m http.server 8000
   # 或
   npx serve .
   ```
3. 在浏览器中访问 `http://localhost:8000`

## 自定义

### 修改配色

在 `styles.css` 中修改 CSS 变量：

```css
:root {
    --lavender-primary: #8B7EC8;
    --lavender-secondary: #A594D1;
    --gray-primary: #6B7280;
    --gray-secondary: #9CA3AF;
}
```

### 添加新页面

1. 在 HTML 中添加新的 section
2. 在导航中添加对应链接
3. 在 JavaScript 中添加页面切换逻辑

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

如有问题或建议，欢迎通过以下方式联系：

- GitHub Issues
- Email: [你的邮箱]

---

⭐ 如果这个项目对你有帮助，请给它一个星标！