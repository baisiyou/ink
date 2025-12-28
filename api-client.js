// API Client for Baisiyou Ink Website
// 自动检测环境并使用相应的 API 地址
const API_BASE_URL = (function() {
    // 如果是本地开发环境
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3000/api';
    }
    
    // 生产环境：使用 Render 后端地址
    // ⚠️ 部署到 Render 后，请将下面的 URL 替换为您的实际 Render 服务地址
    // 例如：'https://baisiyou-ink-api.onrender.com/api'
    // 获取地址：在 Render Dashboard 中查看您的服务 URL
    return 'https://baisiyou-ink-api.onrender.com/api';
})();

class ApiClient {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async saveRegistration(username, email, password) {
        return await this.request('/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        });
    }

    async saveComment(username, email, message) {
        return await this.request('/comment', {
            method: 'POST',
            body: JSON.stringify({ username, email, message })
        });
    }

    async notifyLogin(username, email) {
        return await this.request('/login', {
            method: 'POST',
            body: JSON.stringify({ username, email })
        });
    }
}

// Export singleton instance
window.apiClient = new ApiClient();
