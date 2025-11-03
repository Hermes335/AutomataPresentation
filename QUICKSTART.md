# 🚀 Quick Start Guide

## Context-Free Grammar Interactive Presentation

### Getting Started (First Time Setup)

1. **Open Terminal in this directory**

2. **Install Dependencies** (one-time setup):
   \`\`\`bash
   npm install
   \`\`\`

3. **Start Development Server**:
   \`\`\`bash
   npm start
   \`\`\`

4. **View in Browser**:
   - Automatically opens at: http://localhost:3000
   - Or manually visit the URL above

### Development Commands

| Command | Description |
|---------|-------------|
| \`npm start\` | Start development server with hot reload |
| \`npm run build\` | Create optimized production build |
| \`npm test\` | Run tests (if any) |

### Project Features

✅ **8 Interactive Sections** - Complete CFG coverage
✅ **Smooth Scrolling** - Beautiful navigation experience  
✅ **Framer Motion Animations** - Professional transitions
✅ **Responsive Design** - Works on all devices
✅ **Parse Tree Visualization** - Animated SVG diagrams
✅ **Interactive Examples** - Step-by-step derivations

### Customization Tips

1. **Update Your Info**: Edit \`src/components/sections/References.js\`
   - Change "Your Name / Team"
   - Update course information

2. **Change Colors**: Edit \`tailwind.config.js\`
   - Modify the color palette
   - Adjust gradients

3. **Edit Content**: All sections in \`src/components/sections/\`
   - Hero.js - Landing page
   - Definition.js - CFG explanation
   - Example.js - Grammar examples
   - ParseTree.js - Visual tree
   - Applications.js - Real-world uses
   - Comparison.js - vs Regular Grammar
   - Conclusion.js - Summary
   - References.js - Citations

### Deployment

#### Quick Deploy to Vercel
\`\`\`bash
npm run build
npx vercel
\`\`\`

#### Quick Deploy to Netlify
1. Run \`npm run build\`
2. Drag \`build\` folder to https://app.netlify.com/drop

### Troubleshooting

**Port 3000 already in use?**
- Kill the process or change port:
  \`\`\`bash
  set PORT=3001 && npm start
  \`\`\`

**Build errors?**
- Delete \`node_modules\` and run \`npm install\` again

**Animations not working?**
- Check if Framer Motion is installed: \`npm list framer-motion\`

### Need Help?

- Check README.md for detailed documentation
- Review component files for code examples
- Framer Motion docs: https://www.framer.com/motion/

---

**Ready to Present!** 🎓

Your presentation demonstrates:
- ✅ Deep understanding of automata theory
- ✅ Professional organization and flow
- ✅ Creative visuals and animations
- ✅ Thorough analysis and examples

Good luck with your presentation! 🌟
