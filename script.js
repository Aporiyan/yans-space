// 全局变量
let currentPage = 'home';

// 全局页面切换函数
function showPage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // 如果是文章页面，加载文章列表
        if (pageId === 'articles') {
            loadArticles();
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTools();
    initMobileMenu();
    initAnimations();
});

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                showPage(targetPage);
                updateActiveNav(this);
            }
        });
    });

    // 首页按钮点击事件
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                showPage(targetPage);
                updateActiveNavByPage(targetPage);
            }
        });
    });



    // 更新导航活跃状态
    function updateActiveNav(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // 根据页面ID更新导航活跃状态
    function updateActiveNavByPage(pageId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }
}

// 移动端菜单
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击菜单项后关闭移动端菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // 点击外部区域关闭菜单
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// 工具功能初始化
function initTools() {
    initColorPicker();
    initUnitConverter();
    initTimestampConverter();
    initJSONFormatter();
}

// 颜色选择器
function initColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');

    if (colorPicker && hexValue && rgbValue) {
        colorPicker.addEventListener('input', function() {
            const hex = this.value;
            const rgb = hexToRgb(hex);
            
            hexValue.textContent = hex.toUpperCase();
            rgbValue.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        });

        // 初始化显示
        const initialHex = colorPicker.value;
        const initialRgb = hexToRgb(initialHex);
        hexValue.textContent = initialHex.toUpperCase();
        rgbValue.textContent = `rgb(${initialRgb.r}, ${initialRgb.g}, ${initialRgb.b})`;
    }
}

// 单位转换器
function initUnitConverter() {
    const pxInput = document.getElementById('pxInput');
    const remOutput = document.getElementById('remOutput');

    if (pxInput && remOutput) {
        pxInput.addEventListener('input', function() {
            const px = parseFloat(this.value) || 0;
            const rem = px / 16; // 假设基础字体大小为16px
            remOutput.textContent = `${rem.toFixed(3)}rem`;
        });

        // 初始化显示
        const initialPx = parseFloat(pxInput.value) || 16;
        const initialRem = initialPx / 16;
        remOutput.textContent = `${initialRem.toFixed(3)}rem`;
    }
}

// 时间戳转换器
function initTimestampConverter() {
    const dateInput = document.getElementById('dateInput');
    const timestampOutput = document.getElementById('timestampOutput');

    if (dateInput && timestampOutput) {
        // 设置当前时间为默认值
        const now = new Date();
        const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString().slice(0, 16);
        dateInput.value = localDateTime;

        dateInput.addEventListener('input', function() {
            if (this.value) {
                const date = new Date(this.value);
                const timestamp = Math.floor(date.getTime() / 1000);
                timestampOutput.textContent = timestamp;
            } else {
                timestampOutput.textContent = '--';
            }
        });

        // 初始化显示
        if (dateInput.value) {
            const date = new Date(dateInput.value);
            const timestamp = Math.floor(date.getTime() / 1000);
            timestampOutput.textContent = timestamp;
        }
    }
}

// JSON格式化器
function initJSONFormatter() {
    const jsonInput = document.getElementById('jsonInput');
    
    if (jsonInput) {
        // 设置默认JSON
        jsonInput.value = '{"name": "示例", "value": 123, "active": true}';
    }
}

// JSON格式化函数（全局函数，供HTML调用）
function formatJSON() {
    const jsonInput = document.getElementById('jsonInput');
    
    if (!jsonInput) return;
    
    try {
        const jsonText = jsonInput.value.trim();
        if (!jsonText) {
            alert('请输入JSON数据');
            return;
        }
        
        const parsed = JSON.parse(jsonText);
        const formatted = JSON.stringify(parsed, null, 2);
        jsonInput.value = formatted;
        
        // 添加成功提示
        showToast('JSON格式化成功！', 'success');
    } catch (error) {
        showToast('JSON格式错误：' + error.message, 'error');
    }
}

// 动画和交互效果
function initAnimations() {
    // 添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有卡片元素
    const cards = document.querySelectorAll('.feature-card, .tool-card, .article-card, .link-card, .file-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // 添加鼠标跟随效果
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // 添加页面切换动画
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.addEventListener('animationend', function() {
            this.style.opacity = '1';
        });
    });
}

// 工具函数
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// 提示消息函数
function showToast(message, type = 'info') {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 添加样式
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // 设置背景色
    if (type === 'success') {
        toast.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        toast.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';
    }
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 复制到剪贴板功能
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('已复制到剪贴板', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('已复制到剪贴板', 'success');
    } catch (err) {
        showToast('复制失败', 'error');
    }
    
    document.body.removeChild(textArea);
}

// 添加点击复制功能到颜色值
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const hexValue = document.getElementById('hexValue');
        const rgbValue = document.getElementById('rgbValue');
        const timestampOutput = document.getElementById('timestampOutput');
        
        if (hexValue) {
            hexValue.style.cursor = 'pointer';
            hexValue.title = '点击复制';
            hexValue.addEventListener('click', () => copyToClipboard(hexValue.textContent));
        }
        
        if (rgbValue) {
            rgbValue.style.cursor = 'pointer';
            rgbValue.title = '点击复制';
            rgbValue.addEventListener('click', () => copyToClipboard(rgbValue.textContent));
        }
        
        if (timestampOutput) {
            timestampOutput.style.cursor = 'pointer';
            timestampOutput.title = '点击复制';
            timestampOutput.addEventListener('click', () => {
                if (timestampOutput.textContent !== '--') {
                    copyToClipboard(timestampOutput.textContent);
                }
            });
        }
    }, 100);
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + 数字键快速切换页面
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const pageMap = {
            '1': 'home',
            '2': 'tools',
            '3': 'articles',
            '4': 'links',
            '5': 'files'
        };
        
        const targetPage = pageMap[e.key];
        if (targetPage) {
            const navLink = document.querySelector(`[data-page="${targetPage}"]`);
            if (navLink) {
                navLink.click();
            }
        }
    }
    
    // ESC键关闭移动端菜单
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// 添加页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时，重新初始化时间相关的工具
        const dateInput = document.getElementById('dateInput');
        if (dateInput && !dateInput.value) {
            const now = new Date();
            const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
                .toISOString().slice(0, 16);
            dateInput.value = localDateTime;
            
            const timestampOutput = document.getElementById('timestampOutput');
            if (timestampOutput) {
                const timestamp = Math.floor(new Date(dateInput.value).getTime() / 1000);
                timestampOutput.textContent = timestamp;
            }
        }
    }
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 添加滚动性能优化
const optimizedScrollHandler = throttle(function() {
    // 滚动相关的处理逻辑
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 添加窗口大小变化处理
const optimizedResizeHandler = debounce(function() {
    // 窗口大小变化的处理逻辑
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile', isMobile);
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// 初始化时设置移动端类
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile', isMobile);
    
    // 初始化文章系统
    initArticleSystem();
});

// 文章系统功能
let articlesData = [];

// 初始化文章系统
function initArticleSystem() {
    const backBtn = document.getElementById('back-to-articles');
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showPage('articles');
        });
    }
    
    // 加载文章
    loadArticles();
}

// 加载文章列表 - 自动扫描articles文件夹中的MD文件
async function loadArticles() {
    try {
        // 尝试获取articles文件夹中的所有MD文件
        const articles = await scanMarkdownFiles();
        articlesData = articles;
        renderArticles();
    } catch (error) {
        console.error('加载文章失败:', error);
        // 如果扫描失败，加载预设文章
        await loadPresetArticles();
    }
}

// 扫描articles文件夹中的Markdown文件
async function scanMarkdownFiles() {
    const articles = [];
    
    // 预定义的文章文件列表（GitHub Pages环境下无法动态扫描文件夹）
    const articleFiles = [
        'css-layout-tips.md',
        'javascript-async.md',
        'productivity-tools.md'
    ];
    
    for (const fileName of articleFiles) {
        try {
            const response = await fetch(`articles/${fileName}`);
            if (response.ok) {
                const content = await response.text();
                const article = parseMarkdownFile(fileName, content);
                articles.push(article);
            }
        } catch (error) {
            console.warn(`无法加载文章: ${fileName}`, error);
        }
    }
    
    return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 解析Markdown文件内容
function parseMarkdownFile(fileName, content) {
    const lines = content.split('\n');
    
    // 提取标题（第一个 # 标题）
    let title = fileName.replace('.md', '').replace(/-/g, ' ');
    const titleLine = lines.find(line => line.startsWith('# '));
    if (titleLine) {
        title = titleLine.replace('# ', '').trim();
    }
    
    // 提取摘要（第一个非标题段落）
    let excerpt = '点击查看文章内容...';
    const contentLines = lines.filter(line => !line.startsWith('#') && line.trim() !== '');
    if (contentLines.length > 0) {
        excerpt = contentLines[0].substring(0, 100) + '...';
    }
    
    // 从文件名推断日期和分类
    const fileDate = getDateFromFileName(fileName);
    const category = getCategoryFromContent(content);
    const tags = getTagsFromContent(content);
    
    return {
        id: fileName.replace('.md', ''),
        title: title,
        excerpt: excerpt,
        date: fileDate,
        category: category,
        tags: tags,
        file: `articles/${fileName}`,
        type: 'markdown'
    };
}

// 从文件名推断日期
function getDateFromFileName(fileName) {
    // 如果文件名包含日期格式，提取它
    const dateMatch = fileName.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
        return dateMatch[1];
    }
    
    // 否则使用当前日期
    return new Date().toISOString().split('T')[0];
}

// 从内容推断分类
function getCategoryFromContent(content) {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('javascript') || lowerContent.includes('css') || lowerContent.includes('html')) {
        return '技术';
    } else if (lowerContent.includes('工具') || lowerContent.includes('效率')) {
        return '生活';
    } else {
        return '文章';
    }
}

// 从内容提取标签
function getTagsFromContent(content) {
    const tags = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('javascript')) tags.push('JavaScript');
    if (lowerContent.includes('css')) tags.push('CSS');
    if (lowerContent.includes('html')) tags.push('HTML');
    if (lowerContent.includes('工具')) tags.push('工具');
    if (lowerContent.includes('效率')) tags.push('效率');
    if (lowerContent.includes('布局')) tags.push('布局');
    if (lowerContent.includes('异步')) tags.push('异步');
    
    return tags.length > 0 ? tags : ['文章'];
}

// 加载预设文章（备用方案）
async function loadPresetArticles() {
    try {
        const response = await fetch('articles.json');
        const data = await response.json();
        articlesData = data.articles;
        renderArticles();
    } catch (error) {
        console.error('加载预设文章失败:', error);
        renderDefaultArticles();
    }
}

// 渲染文章列表
function renderArticles() {
    const container = document.getElementById('articles-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    articlesData.forEach(article => {
        const articleCard = createArticleCard(article);
        container.appendChild(articleCard);
    });
}

// 创建文章卡片
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.setAttribute('data-article-id', article.id);
    
    card.innerHTML = `
        <div class="article-meta">
            <span class="article-date">${article.date}</span>
            <span class="article-category">${article.category}</span>
        </div>
        <h3 class="article-title">${article.title}</h3>
        <p class="article-excerpt">${article.excerpt}</p>
        <div class="article-tags">
            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    
    card.addEventListener('click', () => {
        viewArticle(article);
    });
    
    return card;
}

// 查看文章
async function viewArticle(article) {
    const content = document.getElementById('article-content');
    if (!content) return;
    
    try {
        let articleContent = '';
        
        if (article.type === 'markdown') {
            // 从文件加载Markdown内容
            const response = await fetch(article.file);
            const markdown = await response.text();
            articleContent = convertMarkdownToHTML(markdown);
        } else if (article.content) {
            // 直接包含内容的文章
            articleContent = article.content;
        } else {
            articleContent = `
                <h1>${article.title}</h1>
                <p>无法显示此类型的文件内容。</p>
            `;
        }
        
        content.innerHTML = articleContent;
        showPage('article-view');
        
    } catch (error) {
        console.error('加载文章内容失败:', error);
        content.innerHTML = `
            <h1>加载失败</h1>
            <p>无法加载文章内容，请稍后重试。</p>
            <p>错误信息: ${error.message}</p>
        `;
        showPage('article-view');
    }
}

// 简单的 Markdown 转 HTML 转换器
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // 代码块
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // 行内代码
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 斜体
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // 列表
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    
    // 包装列表项
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // 段落
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // 清理空段落
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre>)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');
    
    return html;
}



// 显示通知
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--lavender-primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 渲染默认文章（当加载失败时）
function renderDefaultArticles() {
    articlesData = [
        {
            id: 'welcome',
            title: '欢迎使用文章系统',
            excerpt: '这是一个可以动态添加文章的系统...',
            date: new Date().toISOString().split('T')[0],
            category: '系统',
            tags: ['欢迎'],
            content: '<h1>欢迎使用文章系统</h1><p>您可以通过点击"添加文章"按钮来上传您的文档。</p>'
        }
    ];
    renderArticles();
}