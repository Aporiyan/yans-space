# JavaScript 异步编程

深入理解 Promise、async/await 和事件循环机制。

## Promise 基础

Promise 是 JavaScript 中处理异步操作的重要工具：

```javascript
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('数据加载完成');
        }, 1000);
    });
};

fetchData().then(data => {
    console.log(data);
});
```

## async/await 语法

使用 async/await 可以让异步代码看起来更像同步代码：

```javascript
async function loadUserData() {
    try {
        const user = await fetchUser();
        const posts = await fetchUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error('加载失败:', error);
    }
}
```

## 事件循环

理解事件循环对于掌握 JavaScript 异步编程至关重要。

### 调用栈
- 同步代码按顺序执行
- 函数调用形成调用栈

### 任务队列
- 宏任务：setTimeout、setInterval
- 微任务：Promise、queueMicrotask

## 最佳实践

1. 优先使用 async/await 而不是 Promise 链
2. 合理处理错误情况
3. 避免回调地狱
4. 理解并发与并行的区别

## 总结

掌握异步编程是现代 JavaScript 开发的必备技能，它能让我们写出更高效、更优雅的代码。
