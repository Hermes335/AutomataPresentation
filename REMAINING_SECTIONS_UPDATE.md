# 🎨 Remaining Sections - Dark Theme Update Script

## Quick Update Instructions

For each remaining section (Applications, Comparison, Conclusion, References), follow this pattern:

### 1. Replace the main container div
```javascript
// OLD:
<div ref={ref} className="min-h-screen ... bg-gradient-to-br from-LIGHT-COLOR to-LIGHT-COLOR ...">

// NEW:
<div ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20 relative">
  {/* Section gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 to-primary-500/5" />
  
  <div className="max-w-7xl mx-auto relative z-10">
```

### 2. Update title
```javascript
// OLD:
<h2 className="... bg-gradient-to-r from-COLOR-600 to-COLOR-600 bg-clip-text text-transparent">

// NEW:
<h2 className="... gradient-text">
```

### 3. Replace card backgrounds
```javascript
// OLD:
<div className="bg-white rounded-xl shadow-lg ...">

// NEW:
<div className="glass-dark rounded-xl shadow-glow hover-glow ...">
```

### 4. Update text colors
```javascript
// OLD:
text-gray-800 → text-text-primary
text-gray-700 → text-text-secondary
text-gray-600 → text-text-secondary
text-gray-500 → text-text-muted

// Icon colors:
text-blue-600 → text-primary-400 or text-accent-400
```

### 5. Update borders
```javascript
// OLD:
border-gray-200 → border-primary-500/20
border-blue-500 → border-primary-500
```

---

## Applications Section - Specific Updates

### Replace header gradients:
```javascript
// Card headers - OLD:
<div className={`bg-gradient-to-r ${app.color} p-6`}>

// NEW:
<div className="bg-gradient-to-r from-primary-500/20 to-accent-400/20 p-6 rounded-t-2xl border-b border-primary-500/30">
```

### Example list items:
```javascript
// OLD:
<span className={`w-2 h-2 bg-gradient-to-r ${app.color} rounded-full mr-3`}></span>

// NEW:
<span className="w-2 h-2 bg-accent-400 rounded-full mr-3"></span>
```

### Card structure:
```javascript
<motion.div
  className="glass-dark rounded-2xl shadow-glow overflow-hidden hover-glow transition-all"
  whileHover={{ scale: 1.02 }}
>
  <div className="bg-gradient-to-r from-primary-500/20 to-accent-400/20 p-6 border-b border-primary-500/30">
    <div className="flex items-center space-x-4 text-text-primary">
      <div className="bg-primary-500/30 p-3 rounded-lg">
        <app.icon size={32} className="text-accent-400" />
      </div>
      <h3 className="text-2xl font-bold">{app.title}</h3>
    </div>
  </div>

  <div className="p-6">
    <p className="text-text-secondary leading-relaxed mb-4">
      {app.description}
    </p>

    <div className="glass rounded-lg p-4 border-glow">
      <h4 className="font-semibold text-primary-400 mb-3 text-sm uppercase tracking-wide">
        Key Applications:
      </h4>
      <ul className="space-y-2">
        {app.examples.map((example, i) => (
          <li key={i} className="flex items-center text-sm text-text-secondary">
            <span className="w-2 h-2 bg-accent-400 rounded-full mr-3"></span>
            {example}
          </li>
        ))}
      </ul>
    </div>
  </div>
</motion.div>
```

---

## Comparison Section - Specific Updates

### Table styling:
```javascript
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b-2 border-primary-500/30">
        <th className="text-left p-4 font-semibold text-text-primary">Aspect</th>
        <th className="text-left p-4 font-semibold text-primary-400">Regular Grammar</th>
        <th className="text-left p-4 font-semibold text-accent-400">Context-Free Grammar</th>
      </tr>
    </thead>
    <tbody>
      <motion.tr className="border-b border-primary-500/10 glass-dark hover:bg-primary-500/5 transition-colors">
        <td className="p-4 font-medium text-text-primary">{row.aspect}</td>
        <td className="p-4 text-text-secondary bg-primary-500/5">{row.regular}</td>
        <td className="p-4 text-text-secondary bg-accent-400/5">{row.cfg}</td>
      </motion.tr>
    </tbody>
  </table>
</div>
```

### Chomsky Hierarchy:
```javascript
<div className="glass-dark rounded-lg p-6 border-glow">
  <h4 className="font-semibold text-text-primary mb-4 text-center">Chomsky Hierarchy</h4>
  <div className="flex flex-col items-center space-y-3">
    <div className="w-full max-w-md">
      <div className="bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/30 rounded-lg p-3 text-center">
        <p className="font-semibold text-text-primary">Recursively Enumerable</p>
        <p className="text-xs text-text-muted">Type 0 - Turing Machine</p>
      </div>
    </div>
    <div className="w-4/5">
      <div className="bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-orange-500/30 rounded-lg p-3 text-center">
        <p className="font-semibold text-text-primary">Context-Sensitive</p>
        <p className="text-xs text-text-muted">Type 1 - Linear Bounded Automaton</p>
      </div>
    </div>
    <div className="w-3/5">
      <div className="bg-gradient-to-r from-accent-400/30 to-primary-500/30 border-2 border-accent-400 rounded-lg p-3 text-center font-bold shadow-glow">
        <p className="font-semibold text-accent-400">Context-Free ← We are here</p>
        <p className="text-xs text-text-secondary">Type 2 - Pushdown Automaton</p>
      </div>
    </div>
    <div className="w-2/5">
      <div className="bg-gradient-to-r from-primary-500/20 to-primary-400/20 border border-primary-500/30 rounded-lg p-3 text-center">
        <p className="font-semibold text-text-primary">Regular</p>
        <p className="text-xs text-text-muted">Type 3 - Finite Automaton</p>
      </div>
    </div>
  </div>
</div>
```

### Limitations cards:
```javascript
<div className="grid md:grid-cols-3 gap-6">
  {limitations.map((limit, index) => (
    <motion.div
      className="glass-dark rounded-xl p-6 border-l-4 border-accent-400 hover-glow"
      whileHover={{ scale: 1.02 }}
    >
      <h4 className="font-bold text-text-primary mb-3">{limit.title}</h4>
      <p className="text-sm text-text-secondary mb-3">{limit.description}</p>
      <div className="glass rounded p-2 border border-primary-500/20">
        <p className="text-xs font-mono text-accent-400">{limit.example}</p>
      </div>
    </motion.div>
  ))}
</div>
```

---

## Conclusion Section - Specific Updates

### Key takeaways:
```javascript
<div className="grid md:grid-cols-2 gap-6">
  {keyTakeaways.map((item, index) => (
    <motion.div
      className="glass-dark rounded-xl p-6 border-l-4 border-primary-500 hover-glow"
      whileHover={{ scale: 1.02 }}
    >
      <h4 className="font-bold text-text-primary mb-2 text-lg">{item.title}</h4>
      <p className="text-text-secondary text-sm">{item.description}</p>
    </motion.div>
  ))}
</div>
```

### Quote box:
```javascript
<div className="relative rounded-2xl shadow-glow-lg p-8 md:p-10 text-text-primary mb-8 overflow-hidden">
  <div 
    className="absolute inset-0 opacity-20"
    style={{
      background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
    }}
  />
  <div className="relative z-10">
    <Sparkles className="mb-4 text-accent-400" size={32} />
    <blockquote className="text-2xl md:text-3xl font-light italic mb-4 leading-relaxed">
      "Context-Free Grammars bridge theory and practice in the understanding of language structures."
    </blockquote>
    <p className="text-lg text-text-secondary">
      They enable us to formally describe, analyze, and implement languages—both natural and artificial.
    </p>
  </div>
</div>
```

### Summary box:
```javascript
<div className="glass-dark rounded-2xl shadow-glow p-8 text-center">
  <h3 className="text-2xl font-semibold text-text-primary mb-4">Final Thoughts</h3>
  <p className="text-text-secondary leading-relaxed mb-4">
    Context-Free Grammars are fundamental to computer science...
  </p>
  <p className="text-text-muted text-sm">
    Understanding CFGs deepens our appreciation...
  </p>
</div>
```

---

## References Section - Specific Updates

### Reference cards:
```javascript
<div className="space-y-4">
  {references.map((ref, index) => (
    <motion.div
      className="border-l-4 border-accent-400 glass-dark rounded-r-lg p-4 hover:bg-primary-500/5 transition-colors"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
    >
      <h4 className="font-bold text-text-primary mb-2">{ref.title}</h4>
      <p className="text-sm text-text-secondary mb-1">
        <strong>Authors:</strong> {ref.authors}
      </p>
      <p className="text-sm text-text-muted">
        <strong>Publisher:</strong> {ref.publisher} ({ref.year}) - {ref.edition}
      </p>
    </motion.div>
  ))}
</div>
```

### Online resources:
```javascript
<div className="flex items-center justify-between glass-dark rounded-lg p-4 hover:bg-primary-500/5 transition-colors border border-primary-500/20">
  <div>
    <h4 className="font-semibold text-text-primary">{resource.title}</h4>
    <p className="text-xs text-text-muted mt-1">{resource.type}</p>
  </div>
  <ExternalLink className="text-accent-400" size={20} />
</div>
```

### Credits box:
```javascript
<div className="relative rounded-2xl shadow-glow p-8 text-text-primary text-center overflow-hidden">
  <div 
    className="absolute inset-0 opacity-90"
    style={{
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(34, 211, 238, 0.1))',
    }}
  />
  <div className="relative z-10">
    <h3 className="text-2xl font-semibold mb-6">About This Presentation</h3>
    
    <div className="grid md:grid-cols-3 gap-6 mb-6">
      <div className="flex flex-col items-center">
        <User className="mb-2 text-accent-400" size={32} />
        <p className="text-sm text-text-secondary">Created By</p>
        <p className="font-semibold">Your Name / Team</p>
      </div>
      {/* More items... */}
    </div>

    <div className="border-t border-primary-500/20 pt-6">
      <p className="text-sm text-text-secondary mb-2">Built with</p>
      <div className="flex justify-center space-x-4 text-sm text-text-muted">
        <span>React</span>
        <span>•</span>
        <span>Framer Motion</span>
        <span>•</span>
        <span>Tailwind CSS</span>
      </div>
    </div>
  </div>
</div>
```

---

## ✅ Final Checklist

After updating all sections:

- [ ] All sections have `relative` wrapper with gradient overlay
- [ ] All titles use `gradient-text` class
- [ ] All cards use `glass-dark` or `glass`
- [ ] All hover effects have `hover-glow` class
- [ ] All text uses `text-text-primary/secondary/muted`
- [ ] All icons use `text-primary-400` or `text-accent-400`
- [ ] All borders use `border-primary-500/XX`
- [ ] All backgrounds avoid white/light colors
- [ ] Motion animations preserved
- [ ] SVG elements updated to dark colors

---

## 🚀 Quick Commands

Test dark theme:
```bash
npm start
```

Check for light backgrounds:
```bash
# Search for old patterns
grep -r "bg-white" src/components/sections/
grep -r "bg-gray" src/components/sections/
grep -r "text-gray-8" src/components/sections/
```

---

**This completes the dark theme transformation! The result is a cinematic, professional, academic presentation with smooth animations and modern glassmorphism effects.** 🌙✨
