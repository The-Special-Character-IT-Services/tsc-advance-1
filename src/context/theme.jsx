import React, { createContext, PureComponent } from 'react';

export const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   return (
//     <ThemeContext.Provider value={{ theme: 'light' }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

export class ThemeProvider extends PureComponent {
  state = {
    theme: 'light',
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;

    return (
      <ThemeContext.Provider
        value={{ theme, toggleTheme: this.toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
}
