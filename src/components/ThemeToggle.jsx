
// ============================================
// FILE: src/components/ThemeToggle.jsx
// ============================================
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FiSun className="text-xl text-yellow-400" />
      ) : (
        <FiMoon className="text-xl text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
