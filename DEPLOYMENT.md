# Deployment Guide for GoDaddy and Other Hosting Providers

## Important: GoDaddy Shared Hosting Limitations

⚠️ **GoDaddy's basic shared hosting plans do NOT support Node.js applications.**

GoDaddy's traditional shared hosting is designed for:
- Static HTML/CSS/JavaScript websites
- PHP applications
- WordPress sites

**Next.js requires Node.js**, which is NOT available on GoDaddy's basic shared hosting.

## Your Options with GoDaddy

### Option 1: GoDaddy VPS or Dedicated Server (If Available)

If you have or purchase a GoDaddy VPS (Virtual Private Server) or Dedicated Server, you can install Node.js and run your app:

#### Step 1: Access Your Server
- Connect via SSH to your GoDaddy VPS
- Make sure you have root/sudo access

#### Step 2: Install Node.js
```bash
# Update system packages
sudo apt update  # For Ubuntu/Debian
# or
sudo yum update  # For CentOS/RHEL

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Step 3: Install Git
```bash
sudo apt install git  # Ubuntu/Debian
# or
sudo yum install git  # CentOS/RHEL
```

#### Step 4: Clone and Setup Your App
```bash
# Clone your repository
git clone https://github.com/akhilanugrah/business-website-which-is-customizeable.git
cd business-website-which-is-customizeable

# Install dependencies
npm install

# Build for production
npm run build
```

#### Step 5: Run with PM2 (Process Manager)
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start your app
pm2 start npm --name "business-website" -- start

# Make it start on server reboot
pm2 startup
pm2 save
```

#### Step 6: Configure Firewall
```bash
# Allow port 3000 (or your chosen port)
sudo ufw allow 3000
```

#### Step 7: Set Up Reverse Proxy with Nginx
```bash
# Install Nginx
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/business-website
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/business-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Option 2: Use GoDaddy Domain with Better Hosting

You can keep your GoDaddy domain but host the app elsewhere:

1. **Keep your domain on GoDaddy**
2. **Deploy your app to Vercel/Netlify** (free)
3. **Update DNS records** on GoDaddy to point to your hosting provider

This is often the easiest and cheapest option!

## Better Alternatives for Node.js Apps

### 1. Vercel (Recommended - FREE)
- ✅ Made by Next.js creators
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Perfect for Next.js apps
- ✅ No server management needed

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Click Deploy
5. Update GoDaddy DNS to point to Vercel (optional - Vercel gives you a free domain)

### 2. Netlify (FREE)
- ✅ Free tier available
- ✅ Easy GitHub integration
- ✅ Good for Next.js

### 3. Railway (Paid but Easy)
- ✅ $5/month starting
- ✅ Very easy setup
- ✅ Automatic deployments

### 4. DigitalOcean App Platform
- ✅ $5/month starting
- ✅ Easy Node.js deployment
- ✅ Good documentation

### 5. AWS, Google Cloud, Azure
- ✅ More complex but powerful
- ✅ Various pricing options
- ✅ Enterprise-grade

## Recommended Approach

**Best Option:** Use Vercel (free) for hosting + Keep GoDaddy for domain

1. Deploy to Vercel (takes 2 minutes)
2. Get free Vercel URL: `your-app.vercel.app`
3. (Optional) Point your GoDaddy domain to Vercel:
   - In GoDaddy DNS settings, add CNAME record:
     - Name: `@` or `www`
     - Value: `cname.vercel-dns.com`
   - Or use Vercel's domain configuration

## Cost Comparison

| Option | Monthly Cost | Difficulty | Best For |
|--------|-------------|------------|----------|
| Vercel | FREE | ⭐ Easy | Most users |
| Netlify | FREE | ⭐ Easy | Most users |
| GoDaddy VPS | $10-50+ | ⭐⭐⭐ Hard | Advanced users |
| Railway | $5+ | ⭐⭐ Medium | Easy paid option |
| DigitalOcean | $5+ | ⭐⭐ Medium | More control |

## Summary

- ❌ **GoDaddy shared hosting won't work** - No Node.js support
- ✅ **GoDaddy VPS works** - But requires server management
- ✅ **Vercel/Netlify are better** - Free, easy, perfect for Next.js
- 💡 **Best approach:** Use Vercel for hosting, keep GoDaddy for domain

