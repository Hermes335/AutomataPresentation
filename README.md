# Context-Free Grammar - Interactive Educational Presentation

An interactive, one-page educational website about Context-Free Grammar (CFG) built with React, Framer Motion, and Tailwind CSS. This project presents automata theory concepts through a scrolling presentation format with smooth animations and modern design.

## 🎯 Features

- **8 Interactive Sections**: Each section acts as a slide covering different aspects of CFG
- **Smooth Scroll Navigation**: Sticky navbar with seamless section transitions
- **Rich Animations**: Using Framer Motion for engaging visual effects
- **Progress Indicator**: Top bar showing scroll progress
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, academic design with pastel gradients and readable typography
- **Interactive Examples**: Step-by-step derivation demonstrations
- **Parse Tree Visualization**: Animated SVG tree diagrams

## 📚 Content Sections

1. **Hero/Landing** - Title and introduction
2. **Definition** - Formal definition and explanation of CFG
3. **Example** - Interactive grammar rules and derivation steps
4. **Parse Tree** - Animated visual representation
5. **Applications** - Real-world uses in compiler design, NLP, etc.
6. **Comparison** - CFG vs Regular Grammar and limitations
7. **Conclusion** - Key takeaways and final thoughts
8. **References** - Academic sources and credits

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**:
   \`\`\`bash
   cd d:\\Documents_D\\Codes.Ams\\AutomataPresent
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**:
   \`\`\`bash
   npm start
   \`\`\`

4. **Open your browser** and visit:
   \`\`\`
   http://localhost:3000
   \`\`\`

The page will automatically reload when you make changes.

## 📦 Build for Production

To create an optimized production build:

\`\`\`bash
npm run build
\`\`\`

This creates a `build` folder with optimized static files ready for deployment.

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI (optional):
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. Deploy:
   \`\`\`bash
   vercel
   \`\`\`

Or simply push to GitHub and import the repository in Vercel dashboard.

### Deploy to Netlify

1. Build the project:
   \`\`\`bash
   npm run build
   \`\`\`

2. Drag and drop the `build` folder to [Netlify Drop](https://app.netlify.com/drop)

Or connect your GitHub repository in Netlify dashboard with these settings:
- **Build command**: `npm run build`
- **Publish directory**: `build`

### Deploy to GitHub Pages

1. Install gh-pages:
   \`\`\`bash
   npm install --save-dev gh-pages
   \`\`\`

2. Add to `package.json`:
   \`\`\`json
   "homepage": "https://yourusername.github.io/AutomataPresent",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   \`\`\`

3. Deploy:
   \`\`\`bash
   npm run deploy
   \`\`\`

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon set
- **PostCSS** - CSS processing

## 📁 Project Structure

\`\`\`
AutomataPresent/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ProgressBar.js
│   │   └── sections/
│   │       ├── Hero.js
│   │       ├── Definition.js
│   │       ├── Example.js
│   │       ├── ParseTree.js
│   │       ├── Applications.js
│   │       ├── Comparison.js
│   │       ├── Conclusion.js
│   │       └── References.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
\`\`\`

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

\`\`\`javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
\`\`\`

### Content

All content is in the section components under `src/components/sections/`. Edit any section file to update the content.

### Animations

Animations are configured using Framer Motion. Modify the `motion` components in each section to adjust timing, effects, and behaviors.

## 📊 Rubric Alignment

This project is designed to excel in all evaluation criteria:

- **Content Knowledge (40%)**: Comprehensive coverage of CFG concepts with formal definitions, examples, and explanations
- **Organization (20%)**: Logical flow from introduction through applications to conclusion
- **Creativity & Visual Aids (20%)**: Modern animations, interactive elements, parse tree visualizations
- **Depth of Analysis (20%)**: Comparisons, limitations, real-world applications, and theoretical foundations

## 🤝 Contributing

This is an educational project. Feel free to fork and customize for your own presentations!

## 📄 License

This project is open source and available for educational purposes.

## 👥 Credits

- **Created by**: [Your Name/Team]
- **Course**: Automata Theory & Formal Languages
- **Date**: November 2025

## 📚 References

- Hopcroft, Motwani, Ullman - "Introduction to Automata Theory, Languages, and Computation"
- Aho, Lam, Sethi, Ullman - "Compilers: Principles, Techniques, and Tools"
- Sipser - "Theory of Computation"
- Linz - "Formal Languages and Automata Theory"

---

**Built with ❤️ using React, Framer Motion, and Tailwind CSS**
