export const projectsData = {
  '1': {
    id: 1, title: 'E-Commerce Platform Pro', price: '$499', originalPrice: '$799',
    category: 'Website', badge: 'Best Seller',
    description: 'A full-featured e-commerce platform built with modern technologies.',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Tailwind CSS', 'JWT Auth', 'REST API'],
    features: [
      { icon: 'fa-solid fa-cart-shopping', title: 'Shopping Cart', desc: 'Advanced cart with real-time updates' },
      { icon: 'fa-solid fa-credit-card', title: 'Payment Gateway', desc: 'Stripe integration with multiple methods' },
      { icon: 'fa-solid fa-user-shield', title: 'Admin Dashboard', desc: 'Complete order & user management' },
      { icon: 'fa-solid fa-mobile-screen', title: 'Responsive Design', desc: 'Perfect on all devices' },
      { icon: 'fa-solid fa-magnifying-glass', title: 'Search & Filter', desc: 'Advanced product search' },
      { icon: 'fa-solid fa-chart-line', title: 'Analytics', desc: 'Sales & traffic reports' },
    ],
    includes: ['Full Source Code', 'Documentation', '6 Months Support', 'Free Installation', 'Lifetime Updates', 'Database Setup', 'Email Templates', 'API Documentation'],
    faqs: [
      { q: 'Can I customize the code?', a: 'Yes! You get full source code and can modify anything you need.' },
      { q: 'What hosting do I need?', a: 'Any Node.js hosting works. I recommend Vercel, DigitalOcean, or AWS.' },
      { q: 'Do you offer installation?', a: 'Yes, free installation is included with every purchase.' },
      { q: 'What about updates?', a: 'You receive lifetime updates for all features and security patches.' },
    ],
  },
  '2': {
    id: 2, title: 'SaaS Dashboard Kit', price: '$799', originalPrice: '$1,299',
    category: 'Web App', badge: 'Popular',
    description: 'Complete SaaS dashboard with analytics, user management, subscription billing, and dark mode.',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind', 'Firebase', 'Chart.js'],
    features: [
      { icon: 'fa-solid fa-chart-line', title: 'Analytics Dashboard', desc: 'Real-time data visualization' },
      { icon: 'fa-solid fa-users', title: 'User Management', desc: 'Complete user CRUD operations' },
      { icon: 'fa-solid fa-credit-card', title: 'Subscription Billing', desc: 'Recurring payment system' },
      { icon: 'fa-solid fa-moon', title: 'Dark Mode', desc: 'Full dark/light theme support' },
    ],
    includes: ['Full Source Code', 'Documentation', '3 Months Support', 'Free Installation', 'Lifetime Updates'],
    faqs: [
      { q: 'Is it responsive?', a: 'Yes, fully responsive on all devices.' },
      { q: 'Can I add more features?', a: 'Absolutely! The code is modular and easy to extend.' },
    ],
  },
 
};