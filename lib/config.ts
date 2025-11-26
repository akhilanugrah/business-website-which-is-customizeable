// Configuration file for customizable content
// This can be edited through the admin interface

export interface BusinessConfig {
  company: {
    name: string
    tagline: string
    description: string
  }
  contact: {
    email: string
    phone: string
    address: {
      street: string
      city: string
      state: string
      zip: string
    }
    hours: {
      weekdays: string
      saturday: string
      sunday: string
    }
  }
  branding: {
    primaryColor: string
  }
  homepage: {
    heroTitle: string
    heroSubtitle: string
    ctaText: string
    features: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  services: Array<{
    title: string
    description: string
    icon: string
    features: string[]
  }>
  about: {
    mission: string
    values: string[]
    team: Array<{
      name: string
      role: string
      bio: string
    }>
    stats: {
      clients: string
      years: string
      team: string
    }
  }
}

// Default configuration
export const defaultConfig: BusinessConfig = {
  company: {
    name: "YourBusiness",
    tagline: "Building the future of business solutions.",
    description: "Professional business web application"
  },
  contact: {
    email: "contact@yourbusiness.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Business Street",
      city: "City",
      state: "State",
      zip: "12345"
    },
    hours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    }
  },
  branding: {
    primaryColor: "#0ea5e9"
  },
  homepage: {
    heroTitle: "Welcome to Your Business",
    heroSubtitle: "We provide innovative solutions to help your business grow and succeed in today's competitive market.",
    ctaText: "Get Started",
    features: [
      {
        title: "Fast & Efficient",
        description: "Streamlined processes that save you time and resources while delivering outstanding results.",
        icon: "⚡"
      },
      {
        title: "Secure & Reliable",
        description: "Your data and business operations are protected with industry-leading security measures.",
        icon: "🔒"
      },
      {
        title: "Expert Support",
        description: "Our dedicated team of professionals is always ready to assist you with any questions or needs.",
        icon: "👥"
      }
    ]
  },
  services: [
    {
      title: "Business Consulting",
      description: "Strategic guidance to help your business grow and overcome challenges.",
      icon: "💼",
      features: ["Strategic Planning", "Market Analysis", "Growth Strategies"]
    },
    {
      title: "Digital Solutions",
      description: "Modern technology solutions to streamline your operations.",
      icon: "💻",
      features: ["Web Development", "Cloud Services", "Automation"]
    },
    {
      title: "Marketing Services",
      description: "Comprehensive marketing strategies to boost your brand presence.",
      icon: "📈",
      features: ["SEO Optimization", "Social Media", "Content Marketing"]
    },
    {
      title: "Financial Services",
      description: "Expert financial planning and management for your business.",
      icon: "💰",
      features: ["Financial Planning", "Tax Consulting", "Investment Advice"]
    },
    {
      title: "Training & Development",
      description: "Empower your team with professional training programs.",
      icon: "🎓",
      features: ["Team Training", "Leadership Development", "Skills Enhancement"]
    },
    {
      title: "Support & Maintenance",
      description: "Ongoing support to keep your business running smoothly.",
      icon: "🔧",
      features: ["24/7 Support", "Regular Updates", "Technical Maintenance"]
    }
  ],
  about: {
    mission: "At YourBusiness, we are committed to empowering businesses of all sizes with innovative solutions that drive growth and success. We believe in building long-term partnerships with our clients, understanding their unique needs, and delivering exceptional value.",
    values: [
      "Integrity in everything we do",
      "Innovation and continuous improvement",
      "Customer-centric approach",
      "Excellence in execution"
    ],
    team: [
      {
        name: "John Doe",
        role: "CEO & Founder",
        bio: "With over 15 years of experience in business development and strategy."
      },
      {
        name: "Jane Smith",
        role: "CTO",
        bio: "Technology expert specializing in scalable solutions and innovation."
      },
      {
        name: "Mike Johnson",
        role: "Head of Operations",
        bio: "Operations specialist focused on efficiency and customer satisfaction."
      }
    ],
    stats: {
      clients: "500+",
      years: "10+",
      team: "50+"
    }
  }
}

// Load configuration from localStorage or use default
export function loadConfig(): BusinessConfig {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('businessConfig')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error loading config:', e)
      }
    }
  }
  return defaultConfig
}

// Save configuration to localStorage
export function saveConfig(config: BusinessConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('businessConfig', JSON.stringify(config))
  }
}

