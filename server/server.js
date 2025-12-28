const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Data directory
const DATA_DIR = path.join(__dirname, 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.txt');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.txt');

// Ensure data directory exists
fs.ensureDirSync(DATA_DIR);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from parent directory (website files)
const parentDir = path.join(__dirname, '..');
app.use(express.static(parentDir));

// Email configuration
let emailTransporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NOTIFICATION_EMAIL) {
    emailTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    
    // Verify email connection
    emailTransporter.verify((error) => {
        if (error) {
            console.error('❌ Email service error:', error.message);
            emailTransporter = null;
        } else {
            console.log('✅ Email service ready');
        }
    });
} else {
    console.warn('⚠️  Email service not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and NOTIFICATION_EMAIL in .env file');
}

// Helper function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Helper function to append data to file
function appendToFile(filePath, data, separator = '\n' + '='.repeat(80) + '\n') {
    const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const formattedData = `\n[${timestamp}]\n${JSON.stringify(data, null, 2)}${separator}`;
    fs.appendFileSync(filePath, formattedData, 'utf8');
}

// Helper function to send email
async function sendEmail(subject, text, html) {
    if (!emailTransporter || !process.env.NOTIFICATION_EMAIL) {
        console.warn('Email not configured, skipping email notification');
        return false;
    }
    
    try {
        await emailTransporter.sendMail({
            from: `"Baisiyou Ink Website" <${process.env.SMTP_USER}>`,
            to: process.env.NOTIFICATION_EMAIL,
            subject: subject,
            text: text,
            html: html
        });
        console.log('✅ Email sent successfully');
        return true;
    } catch (error) {
        console.error('❌ Failed to send email:', error.message);
        return false;
    }
}


// Register endpoint
app.post('/api/register', (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const registrationData = {
            username,
            email,
            password: '***hidden***', // Don't save actual password
            timestamp: new Date().toISOString()
        };
        
        // Save to file
        appendToFile(REGISTRATIONS_FILE, registrationData);
        console.log(`✅ Registration saved: ${username} (${email})`);
        
        // Send email notification
        const emailSubject = `新用户注册 - ${username}`;
        const emailText = `
新用户注册通知

用户名: ${username}
邮箱: ${email}
注册时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

---
此邮件由 Baisiyou Ink 网站自动发送
        `.trim();
        
        const emailHtml = `
            <h2>新用户注册通知</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
                <p><strong>用户名:</strong> ${username}</p>
                <p><strong>邮箱:</strong> ${email}</p>
                <p><strong>注册时间:</strong> ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
            </div>
            <hr>
            <p style="color: #888; font-size: 12px;">此邮件由 Baisiyou Ink 网站自动发送</p>
        `;
        
        sendEmail(emailSubject, emailText, emailHtml).catch(err => {
            console.error('Email sending failed:', err);
        });
        
        res.json({ 
            message: 'Registration saved successfully',
            saved: true,
            file: REGISTRATIONS_FILE
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Login endpoint (for email notification)
app.post('/api/login', (req, res) => {
    try {
        const { username, email } = req.body;
        
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        
        const loginData = {
            username,
            email: email || '未提供',
            timestamp: new Date().toISOString()
        };
        
        // Send email notification for login
        const emailSubject = `用户登录 - ${username}`;
        const emailText = `
用户登录通知

用户名: ${username}
邮箱: ${email || '未提供'}
登录时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

---
此邮件由 Baisiyou Ink 网站自动发送
        `.trim();
        
        const emailHtml = `
            <h2>用户登录通知</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
                <p><strong>用户名:</strong> ${username}</p>
                <p><strong>邮箱:</strong> ${email || '未提供'}</p>
                <p><strong>登录时间:</strong> ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
            </div>
            <hr>
            <p style="color: #888; font-size: 12px;">此邮件由 Baisiyou Ink 网站自动发送</p>
        `;
        
        sendEmail(emailSubject, emailText, emailHtml).catch(err => {
            console.error('Email sending failed:', err);
        });
        
        console.log(`✅ Login notification sent: ${username}`);
        
        res.json({ 
            message: 'Login notification sent successfully',
            sent: true
        });
    } catch (error) {
        console.error('Login notification error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Comment endpoint
app.post('/api/comment', (req, res) => {
    try {
        const { username, email, message } = req.body;
        
        if (!username || !message) {
            return res.status(400).json({ error: 'Username and message are required' });
        }
        
        const commentData = {
            username,
            email: email || '未提供',
            message,
            timestamp: new Date().toISOString()
        };
        
        // Save to file
        appendToFile(COMMENTS_FILE, commentData);
        console.log(`✅ Comment saved: ${username} - ${message.substring(0, 50)}...`);
        
        // Send email notification
        const escapedUsername = escapeHtml(username);
        const escapedEmail = escapeHtml(email || '未提供');
        const escapedMessage = escapeHtml(message);
        const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
        
        const emailSubject = `新留言 - 来自 ${username}`;
        const emailText = `
新留言通知

留言人: ${username}
邮箱: ${email || '未提供'}
留言时间: ${timestamp}
留言内容:
${message}

---
此邮件由 Baisiyou Ink 网站自动发送
        `.trim();
        
        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>新留言通知</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">新留言通知</h2>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>留言人:</strong> ${escapedUsername}</p>
                    <p><strong>邮箱:</strong> ${escapedEmail}</p>
                    <p><strong>留言时间:</strong> ${timestamp}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <h3 style="color: #2563eb; margin-top: 30px;">留言内容:</h3>
                <div style="background: #fff; padding: 15px; border-left: 4px solid #2563eb; margin: 15px 0; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <p style="white-space: pre-wrap; margin: 0; font-size: 16px; line-height: 1.8;">${escapedMessage.replace(/\n/g, '<br>')}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="color: #888; font-size: 12px; text-align: center; margin-top: 30px;">此邮件由 Baisiyou Ink 网站自动发送</p>
            </body>
            </html>
        `;
        
        // Log email content for debugging
        console.log(`📧 Preparing to send email for comment from ${username}`);
        console.log(`   Message length: ${message.length} characters`);
        console.log(`   Message preview: ${message.substring(0, 100)}...`);
        
        sendEmail(emailSubject, emailText, emailHtml)
            .then(success => {
                if (success) {
                    console.log(`✅ Comment email sent successfully to ${process.env.NOTIFICATION_EMAIL}`);
                } else {
                    console.error(`❌ Failed to send comment email`);
                }
            })
            .catch(err => {
                console.error('❌ Email sending error:', err.message);
            });
        
        res.json({ 
            message: 'Comment saved successfully',
            saved: true,
            file: COMMENTS_FILE
        });
    } catch (error) {
        console.error('Comment error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Root path
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Baisiyou Ink API Server',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            register: 'POST /api/register',
            login: 'POST /api/login',
            comment: 'POST /api/comment'
        },
        timestamp: new Date().toISOString()
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Baisiyou Ink API is running',
        storage: 'File-based (TXT files)',
        emailConfigured: !!emailTransporter,
        dataFiles: {
            registrations: REGISTRATIONS_FILE,
            comments: COMMENTS_FILE
        },
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`💾 Data storage: ${DATA_DIR}`);
    console.log(`📄 Registration file: ${REGISTRATIONS_FILE}`);
    console.log(`📄 Comments file: ${COMMENTS_FILE}`);
    console.log(`📧 Email notifications: ${emailTransporter ? 'Enabled' : 'Disabled (configure SMTP in .env)'}`);
    console.log(`\n📝 API endpoints:`);
    console.log(`   - POST /api/register - Save registration (sends email)`);
    console.log(`   - POST /api/login - Send login notification (sends email)`);
    console.log(`   - POST /api/comment - Save comment (sends email)`);
    console.log(`   - GET  /api/health - Health check`);
});
