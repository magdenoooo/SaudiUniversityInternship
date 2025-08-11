# Saudi University Internship Program Website

A modern, responsive website for a Saudi university's field training program, built with pure HTML, CSS, and JavaScript. The website features Arabic-first design with RTL layout support and English language switching.

## 🌟 Features

### Core Functionality
- **Multi-page Structure**: Landing, About, Students, Companies, FAQ, and Contact pages
- **Arabic-First Design**: RTL layout with Arabic typography (Cairo font)
- **Language Switching**: Toggle between Arabic and English
- **Responsive Design**: Mobile-first approach with hamburger navigation
- **Interactive Elements**: Smooth scrolling, accordion FAQ, form validation
- **Modern UI**: Clean design with Saudi green color palette and gold accents

### Design Highlights
- **Saudi Green Theme**: Primary color (#006C35) with comprehensive color system
- **Professional Typography**: Cairo for Arabic, Inter for English via Google Fonts
- **Smooth Animations**: Hover effects, scroll animations, and micro-interactions
- **Accessibility**: Proper contrast ratios, keyboard navigation, and ARIA labels
- **Mobile Optimized**: Hamburger menu and responsive grid layouts

## 📁 Project Structure

```
/
├── index.html              # Landing page
├── about.html              # About the program
├── students.html           # Student information
├── companies.html          # Company partnerships
├── faq.html               # Frequently asked questions
├── contact.html           # Contact form and information
├── css/
│   └── style.css          # Main stylesheet with CSS variables
├── js/
│   ├── main.js            # Core functionality
│   ├── faq.js             # FAQ page interactions
│   └── contact.js         # Contact form handling
├── images/                # Placeholder for images
├── fonts/                 # Placeholder for custom fonts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required - pure HTML/CSS/JS

### Installation
1. Download or clone all project files
2. Open `index.html` in your web browser
3. Navigate through the site using the navigation menu

### Local Development
For best results, serve the files through a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Single column layout, hamburger menu
- **Tablet**: 768px - 1024px - Two column grids, adjusted spacing
- **Desktop**: > 1024px - Full multi-column layouts

## 🎨 Design System

### Colors
- **Primary Green**: #006C35 (Saudi flag green)
- **Accent Gold**: #d4af37
- **Neutral Grays**: 50-900 scale
- **Status Colors**: Success, warning, error variants

### Typography
- **Arabic**: Cairo (400, 500, 600, 700 weights)
- **English**: Inter (400, 500, 600, 700 weights)
- **Font Sizes**: xs (12px) to 5xl (48px) scale

### Spacing
- **8px Grid System**: All margins and padding use 8px increments
- **Component Spacing**: xs(4px) to 4xl(96px) scale

## 🔧 Customization

### Adding New Pages
1. Create new HTML file following the existing structure
2. Include the navigation component
3. Add appropriate `<link>` tags for CSS and JS
4. Update navigation links in all existing pages

### Modifying Colors
Update the CSS custom properties in `css/style.css`:

```css
:root {
    --primary-500: #006C35;  /* Main green */
    --accent-400: #d4af37;   /* Gold accent */
    /* Add your custom colors */
}
```

### Adding New Sections
Follow the existing HTML structure and CSS classes:

```html
<section class="your-section">
    <div class="container">
        <h2 class="section-title">Your Title</h2>
        <!-- Your content -->
    </div>
</section>
```

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📧 Contact Features

The contact form includes:
- Real-time validation
- Character counter for message field
- Success/error messaging
- Phone and email format validation
- Accessibility features

## ❓ FAQ System

Interactive FAQ with:
- Category filtering (Students, Companies, General)
- Accordion-style answers
- Smooth animations
- Search functionality (ready for implementation)

## 🔒 Security Notes

- All forms use client-side validation only
- No sensitive data is processed client-side
- Implement server-side validation for production use
- Consider adding CSRF protection for forms

## 🚀 Deployment

### Static Hosting (Recommended)
- Upload all files to your web server
- Ensure proper MIME types for Arabic fonts
- Configure server for UTF-8 encoding
- Set up proper cache headers for static assets

### CDN Integration
The project uses external CDNs for:
- Google Fonts (Cairo, Inter)
- Font Awesome icons
- Consider hosting locally for production

## 📈 Performance Optimization

- Optimize images before adding to `/images/`
- Minify CSS and JS for production
- Enable gzip compression on server
- Use WebP format for images where supported

## 🎯 Future Enhancements

- Add search functionality to FAQ
- Implement proper backend for contact forms
- Add student/company dashboards
- Integrate with university systems
- Add progressive web app (PWA) features

## 📄 License

This project is designed for educational and university use. Modify and adapt as needed for your institution.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Test thoroughly across devices
4. Submit a pull request with detailed description

## 📞 Support

For questions or issues:
- Check the FAQ section first
- Review the code comments
- Test in multiple browsers
- Ensure all files are properly linked

---

Built with ❤️ for Saudi universities and educational institutions.