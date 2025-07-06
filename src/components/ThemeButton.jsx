import { useEffect, useState } from 'react';

const ThemeButton = () => {

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('mode');
    return savedMode || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme');
  });

  useEffect(() => {
    document.documentElement.classList.add(mode);
    // document.documentElement.setAttribute('mode', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme');
    const oppositeMode = mode === 'dark-theme' ? 'light-theme' : 'dark-theme';
    document.documentElement.classList.remove(oppositeMode);

    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(prevMode => prevMode === "dark-theme" ? "light-theme" : "dark-theme"); 
  };

  return (    
      <button 
        className="p-2 rounded-3xl  flex gap-3 bg-gradient-to-r from-blue-600 to-amber-300
      hover:from-blue-700 hover:to-amber-400
        transition-all duration-300 shadow-lg hover:shadow-xl" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <svg 
          className={` rounded-xl p-1 cursor-pointer           
          ${mode === 'light-theme' ? 'opacity-100 bg-blue-200 fill-amber-500 stroke-amber-400' : 'opacity-35 bg-blue-400 fill-amber-200 stroke-amber-200'} hover:bg-blue-300 
          transition-colors duration-200`} 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/>
            <path d="m17.66 17.66 1.41 1.41"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m6.34 17.66-1.41 1.41"/>
            <path d="m19.07 4.93-1.41 1.41"/>
          </svg>
        <svg 
          className={` rounded-xl p-1 cursor-pointer 
          ${mode === 'dark-theme' ? 'opacity-100 bg-blue-900' : 'opacity-35 bg-blue-400'} 
          hover:bg-blue-700 fill-amber-200 stroke-amber-400
          transition-colors duration-200`}
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
      </button>
  )
}
export default ThemeButton;