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

  retro: false,
  theme: 'zap',

  color: {
    foreground: '#CCCCCC',
    background: '#000',
    selection: '#3B3E46',
    black: '#000',
    lightBlack: '#000',
    red: '#EB543B',
    lightRed: '#EB543B',
    green: '#58FF1D',
    lightGreen: '#58FF1D',
    blue: '#009DFF',
    lightBlue: '#009DFF',
    yellow: '#FFF500',
    lightYellow: '#FFF500',
    magenta: '#E339DD',
    lightMagenta: '#E339DD',
    cyan: '#00F0FF',
    lightCyan: '#00F0FF',
    white: '#CCCCCC',
    lightWhite: '#fff'
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
