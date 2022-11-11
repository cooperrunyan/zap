import { theme } from './themes/getTheme';

export const defaultSettings = (platform: string) => ({
  window: {
    style: {
      padding: '2px 6px 6px 14px',
      opacity: 1,
      showShadow: true,
      vibrancy: null
    },
    dimensions: {
      initialWidth: 1575,
      initialHeight: 775,
      minHeight: 190,
      minWidth: 370,
      maxWidth: null,
      maxHeight: null
    },
    position: {
      center: true,
      initial: {
        x: null,
        y: null
      }
    },

    can: {
      move: true,
      maximize: true,
      minimize: true,
      resize: true,
      close: true,
      beLargerThanScreen: false
    },

    useNativeAppBar: false,
    acceptFirstMouse: false,
    remainOnTop: false,
    paintWhenInitiallyHidden: true,
    showTitle: true
  },

  theme: 'zap' as const,
  compositeTheme: theme('zap'),

  themeOverrides: {
    foreground: undefined,
    background: undefined,
    selection: undefined,
    black: undefined,
    lightBlack: undefined,
    red: undefined,
    lightRed: undefined,
    green: undefined,
    lightGreen: undefined,
    blue: undefined,
    lightBlue: undefined,
    yellow: undefined,
    lightYellow: undefined,
    magenta: undefined,
    lightMagenta: undefined,
    cyan: undefined,
    lightCyan: undefined,
    white: undefined,
    lightWhite: undefined
  },

  cursor: {
    color: '#fff',
    accentColor: '#000',
    width: 1, // px (only when style is bar)
    style: 'bar', // bar, block, underline
    blink: true
  },

  shell: {
    name: 'zsh',
    shellArgs: ['--login']
  },

  font: {
    family: '"Roboto Mono", Consolas, Menlo, monospace',
    size: 14,
    weight: '400', // valid css font-weight
    weightBold: '600', // valid css font-weight
    lineHeight: 1.2,
    letterSpacing: -0.01 // px
  },

  os: platform
});
