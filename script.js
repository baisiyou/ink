// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Enhanced scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animate-on-scroll class to elements
    const animatedElements = document.querySelectorAll(
        '.feature-card, .product-card, .service-card, .ink-info-card, ' +
        '.contact-card, .address-card, .value-card, .section-title, ' +
        '.hero-features .feature-item, .ink-demo-image, .company-intro-image'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Animate section titles with delay
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        title.style.animationDelay = `${index * 0.2}s`;
        title.classList.add('fade-in-up');
    });

    // Add pulse animation to hero features on hover
    const heroFeatures = document.querySelectorAll('.hero-features .feature-item');
    heroFeatures.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.animation = 'pulse 0.6s ease';
        });
        item.addEventListener('animationend', () => {
            item.style.animation = '';
        });
    });
});

// Language selector functionality (placeholder)
const languageSelector = document.querySelector('.language-selector');
if (languageSelector) {
    const languages = languageSelector.querySelectorAll('span');
    languages.forEach(lang => {
        lang.addEventListener('click', () => {
            languages.forEach(l => {
                l.style.opacity = '0.5';
                l.style.transform = 'scale(1)';
            });
            lang.style.opacity = '1';
            lang.style.transform = 'scale(1.1)';
            lang.style.fontWeight = 'bold';
            // Add language switching logic here
        });
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-main-image');
    
    if (heroSection && heroImage && scrolled < heroSection.offsetHeight) {
        const parallaxSpeed = 0.5;
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
    
    // Handle image loading with fade-in effect
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            img.addEventListener('error', function() {
                // If image fails to load, it will use onerror fallback
                this.classList.add('loaded');
            });
        }
    });
});

// Lazy load images with Intersection Observer
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

// Observe images with data-src attribute
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Comments/Guestbook Functionality
(function() {
    // Check if user is logged in (stored in localStorage)
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const authContainer = document.getElementById('authContainer');
    const userInfo = document.getElementById('userInfo');
    const loggedInUsername = document.getElementById('loggedInUsername');
    const logoutLink = document.getElementById('logoutLink');
    const commentFormContainer = document.getElementById('commentFormContainer');
    const loginRequiredMessage = document.getElementById('loginRequiredMessage');
    const registerTab = document.getElementById('registerTab');
    const loginTab = document.getElementById('loginTab');
    const registerCard = document.getElementById('registerCard');
    const loginCard = document.getElementById('loginCard');
    
    // Load comments from localStorage
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        const commentsList = document.getElementById('commentsList');
        
        if (!commentsList) return;
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="no-comments" data-i18n="noComments">暂无留言，快来成为第一个留言的人吧！</p>';
            // Re-translate
            if (window.i18n) {
                const noCommentsEl = commentsList.querySelector('[data-i18n]');
                if (noCommentsEl) noCommentsEl.textContent = window.i18n.t('noComments');
            }
            return;
        }
        
        commentsList.innerHTML = comments.map((comment, index) => {
            const date = new Date(comment.date).toLocaleString();
            const isAdmin = currentUser && (currentUser.username === 'admin' || currentUser.role === 'admin');
            const canDelete = currentUser && (comment.userId === currentUser.username || isAdmin);
            const actions = canDelete ? `
                <div class="comment-actions">
                    <button class="btn-delete" onclick="deleteComment(${index})" data-i18n="deleteComment">删除</button>
                </div>
            ` : '';
            
            return `
                <div class="comment-item animate-on-scroll">
                    <div class="comment-header">
                        <span class="comment-author">${escapeHtml(comment.name || comment.username)}</span>
                        <span class="comment-date">${date}</span>
                    </div>
                    <div class="comment-content">${escapeHtml(comment.message)}</div>
                    ${actions}
                </div>
            `;
        }).join('');
        
        // Re-translate delete buttons
        if (window.i18n) {
            commentsList.querySelectorAll('[data-i18n="deleteComment"]').forEach(btn => {
                btn.textContent = window.i18n.t('deleteComment');
            });
        }
        
        // Observe new comment items for animation
        commentsList.querySelectorAll('.comment-item').forEach(item => {
            observer.observe(item);
        });
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Update UI based on login status
    function updateUI() {
        if (currentUser) {
            // User is logged in
            if (authContainer) authContainer.style.display = 'none';
            if (userInfo) {
                userInfo.style.display = 'block';
                if (loggedInUsername) loggedInUsername.textContent = currentUser.username;
            }
            if (commentFormContainer) commentFormContainer.style.display = 'block';
            if (loginRequiredMessage) loginRequiredMessage.style.display = 'none';
        } else {
            // User is not logged in
            if (authContainer) authContainer.style.display = 'block';
            if (userInfo) userInfo.style.display = 'none';
            if (commentFormContainer) commentFormContainer.style.display = 'none';
            if (loginRequiredMessage) loginRequiredMessage.style.display = 'block';
        }
        loadComments();
    }
    
    // Tab switching for register/login
    if (registerTab && loginTab && registerCard && loginCard) {
        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerCard.style.display = 'block';
            loginCard.style.display = 'none';
        });
        
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginCard.style.display = 'block';
            registerCard.style.display = 'none';
        });
    }
    
    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const passwordConfirm = document.getElementById('regPasswordConfirm').value;
            
            if (!username || !email || !password) {
                alert('请填写所有必填字段！');
                return;
            }
            
            if (password !== passwordConfirm) {
                alert('两次输入的密码不一致！');
                return;
            }
            
            if (password.length < 6) {
                alert('密码长度至少为6位！');
                return;
            }
            
            // Check if username already exists
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            if (users.find(u => u.username === username)) {
                alert('该用户名已被使用，请选择其他用户名！');
                return;
            }
            
            // Register new user
            const newUser = {
                username: username,
                email: email,
                password: password, // In production, hash the password
                registeredDate: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            
            // Save to server (file and email)
            if (window.apiClient) {
                window.apiClient.saveRegistration(username, email, password).catch(err => {
                    console.error('Failed to save registration to server:', err);
                });
            }
            
            // Auto login after registration
            currentUser = {
                username: username,
                email: email,
                role: 'user'
            };
            localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
            
            updateUI();
            alert('注册成功！已自动登录。');
            registerForm.reset();
        });
    }
    
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            // Check admin account first
            if (username === 'admin' && password === 'admin') {
                currentUser = {
                    username: 'admin',
                    role: 'admin'
                };
                localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
                
                // Send login notification to server
                if (window.apiClient) {
                    window.apiClient.notifyLogin('admin', 'admin@baisiyou.com').catch(err => {
                        console.error('Failed to send login notification:', err);
                    });
                }
                
                updateUI();
                alert('登录成功！');
                loginForm.reset();
                return;
            }
            
            // Check registered users
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                currentUser = {
                    username: user.username,
                    email: user.email,
                    role: 'user'
                };
                localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
                
                // Send login notification to server
                if (window.apiClient) {
                    window.apiClient.notifyLogin(user.username, user.email).catch(err => {
                        console.error('Failed to send login notification:', err);
                    });
                }
                
                updateUI();
                alert('登录成功！');
                loginForm.reset();
            } else {
                alert('用户名或密码错误！');
            }
        });
    }
    
    // Logout handler
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentUser = null;
            localStorage.removeItem('loggedInUser');
            updateUI();
        });
    }
    
    // Comment form handler (only available when logged in)
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check if user is logged in
            if (!currentUser) {
                alert('请先注册或登录后才能留言！');
                return;
            }
            
            const message = document.getElementById('commentMessage').value.trim();
            
            if (!message) {
                alert('请输入留言内容！');
                return;
            }
            
            const comments = JSON.parse(localStorage.getItem('comments') || '[]');
            const newComment = {
                username: currentUser.username,
                name: currentUser.username,
                email: currentUser.email || '',
                message: message,
                userId: currentUser.username,
                date: new Date().toISOString()
            };
            
            comments.unshift(newComment); // Add to beginning
            localStorage.setItem('comments', JSON.stringify(comments));
            
            // Save to server (file and email)
            if (window.apiClient) {
                window.apiClient.saveComment(
                    currentUser.username,
                    currentUser.email || '',
                    message
                ).catch(err => {
                    console.error('Failed to save comment to server:', err);
                });
            }
            
            loadComments();
            commentForm.reset();
            
            // Scroll to comments list
            const commentsList = document.getElementById('commentsList');
            if (commentsList) {
                commentsList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // Delete comment function (global for onclick)
    window.deleteComment = function(index) {
        if (!confirm('确定要删除这条留言吗？')) return;
        
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateUI);
    } else {
        updateUI();
    }
})();
