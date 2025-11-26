# Business Web App

A modern, professional business web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly navigation
- ⚡ Fast performance with Next.js
- 🎯 SEO optimized
- 💼 Professional business pages (Home, About, Services, Contact)
- 🎨 Beautiful UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/akhilanugrah/business-website-which-is-customizeable.git
cd business-website-which-is-customizeable
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser to see the app.

## Deployment

This is a Next.js application that needs to be built before deployment. Here are your options:

### Option 1: Deploy to Vercel (Recommended - Free & Easy)

Vercel is made by the creators of Next.js and offers free hosting:

1. **Push your code to GitHub** (already done!)
2. **Go to [vercel.com](https://vercel.com)** and sign up
3. **Import your GitHub repository**
4. **Click Deploy** - Vercel will automatically:
   - Detect it's a Next.js app
   - Install dependencies (`npm install`)
   - Build the app (`npm run build`)
   - Deploy it with a free URL

Your site will be live at: `https://your-project-name.vercel.app`

### Option 2: Deploy to Netlify (Free Alternative)

1. **Go to [netlify.com](https://netlify.com)** and sign up
2. **Connect your GitHub repository**
3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Click Deploy**

### Option 3: Self-Host on Your Own Server

If you want to host it on your own server:

1. **On your server, clone and install:**
```bash
git clone https://github.com/akhilanugrah/business-website-which-is-customizeable.git
cd business-website-which-is-customizeable
npm install
```

2. **Build the production version:**
```bash
npm run build
```

3. **Start the production server:**
```bash
npm start
```

The app will run on port 3000 (or the port specified by the `PORT` environment variable).

4. **Use a process manager** (like PM2) to keep it running:
```bash
npm install -g pm2
pm2 start npm --name "business-website" -- start
pm2 save
pm2 startup
```

5. **Set up a reverse proxy** (like Nginx) to serve it on port 80/443.

### Option 4: Docker Deployment

1. **Create a Dockerfile** (we can add this if needed)
2. **Build and run:**
```bash
docker build -t business-website .
docker run -p 3000:3000 business-website
```

## Important Notes

⚠️ **This is NOT just static files** - You cannot simply copy files to a web server. This is a Node.js application that needs to:
- Have Node.js installed on the server
- Run `npm install` to get dependencies
- Run `npm run build` to create the production build
- Run `npm start` to serve the application

For easiest deployment, use **Vercel** (Option 1) - it's free and handles everything automatically!

## Project Structure

```
webapp/
├── app/                 # Next.js app directory
│   ├── about/          # About page
│   ├── services/       # Services page
│   ├── contact/        # Contact page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Navbar.tsx     # Navigation component
│   └── Footer.tsx     # Footer component
└── public/            # Static assets
```

## Customization

### Using the Admin Interface

**The easiest way to customize your website is through the built-in admin panel!**

1. **Access the Admin Panel**: 
   - Click the "Customize" button in the navigation bar, or
   - Navigate to `http://localhost:3000/admin`

2. **Customize Your Content**:
   - **Company Tab**: Update company name, tagline, and description
   - **Contact Tab**: Edit email, phone, address, and business hours
   - **Homepage Tab**: Customize hero section and features
   - **Services Tab**: Edit all your service offerings
   - **About Tab**: Update mission, values, team members, and statistics

3. **Save Changes**: Click "Save Changes" to apply your customizations. The site will automatically reload with your new content.

4. **Reset**: Use "Reset to Default" if you want to start over.

### Manual Customization (Advanced)

If you prefer to edit code directly:

1. **Configuration File**: Edit `lib/config.ts` to change default values
2. **Colors**: Customize the primary color in `tailwind.config.ts`
3. **Components**: Modify individual components in the `components/` and `app/` directories

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## License

MIT

