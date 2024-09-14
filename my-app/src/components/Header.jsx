import { useEffect } from 'react';
import Dropdown from './Dropdown';
import Switch from './Switch';
import logo from '../assets/images/logo.svg';
import moonIcon from '../assets/images/icon-moon.svg';
import moonIconDark from '../assets/images/icon-moon-purple.svg';
import useToggler from '../hooks/useToggler';
import fontNames from '../utils/font-names';

export default function Header({ applyFont, currentFont }) {
  const [isDarkTheme, toggleTheme] = useToggler(localStorage.getItem('theme-color') === 'dark');
  const [isDropdownExpanded, toggleDropdown] = useToggler(false);

  useEffect(() => {
    updateTheme(isDarkTheme);
  }, [isDarkTheme]);

  const updateTheme = (isDark) => {
    document.documentElement.className = isDark ? 'dark' : '';
    localStorage.setItem('theme-color', isDark ? 'dark' : 'light');
  };

  const handleFontSelection = (font) => {
    applyFont(font);
    toggleDropdown();
  };

  const renderFontOptions = () =>
    Object.entries(fontNames).map(([fontName, fontClass]) => (
      <li key={fontName} className={`${fontClass} cursor-pointer hover:text-purple`}>
        <button onClick={() => handleFontSelection(fontName)}>{fontName}</button>
      </li>
    ));

  return (
    <header className="flex justify-between mt-6 mb-6 tablet:mt-[3.625rem] tablet:mb-[3.25rem]">
      <img src={logo} alt="App logo" className="w-[28px] tablet:w-[32px]" />
      <div className="flex items-center">
        <Dropdown
          applyFont={applyFont}
          currentFont={currentFont}
          toggle={toggleDropdown}
          isExpanded={isDropdownExpanded}
        >
          {renderFontOptions()}
        </Dropdown>
        <div className="flex items-center">
          <Switch checked={isDarkTheme} toggle={toggleTheme} />
          <img
            src={isDarkTheme ? moonIconDark : moonIcon}
            aria-hidden="true"
            className="ml-3 tablet:ml-5"
            alt="Moon icon"
          />
        </div>
      </div>
    </header>
  );
}
