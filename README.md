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

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

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

