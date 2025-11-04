import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/sections/Hero';
import Definition from './components/sections/Definition';
import Example from './components/sections/Example';
import ParseTree from './components/sections/ParseTree';
import Applications from './components/sections/Applications';
import Comparison from './components/sections/Comparison';
import Conclusion from './components/sections/Conclusion';
import References from './components/sections/References';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'hero', label: 'Home', component: Hero },
    { id: 'definition', label: 'Definition', component: Definition },
    { id: 'example', label: 'Examples', component: Example },
    { id: 'parse-tree', label: 'Parse Trees', component: ParseTree },
    { id: 'comparison', label: 'Comparison', component: Comparison },
    { id: 'applications', label: 'Applications', component: Applications },
    { id: 'conclusion', label: 'Conclusion', component: Conclusion },
    { id: 'references', label: 'References', component: References },
  ];

  return (
    <div className="App bg-dark-bg min-h-screen">
      <AnimatedBackground />
      <ProgressBar progress={scrollProgress} />
      <Navbar sections={sections} />
      
      <div className="relative z-10">
        {sections.map(({ id, component: Component }) => (
          <section key={id} id={id}>
            <Component />
          </section>
        ))}
      </div>
    </div>
  );
}

export default App;
