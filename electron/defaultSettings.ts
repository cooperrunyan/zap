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
    showInitially: true,
    showTitle: true
  },

  theme: {
    foregroundColor: '#ccd5e5',
    backgroundColor: '#000',
    selectionColor: '#3B3E46',

    black: '#000',
    lightBlack: '#49525f',
    red: '#ff5562',
    lightRed: '#ff5562',
    green: '#8dcf5e',
    lightGreen: '#8dcf5e',
    blue: '#4da5ff',
    lightBlue: '#4da5ff',
    yellow: '#d09953',
    lightYellow: '#d09953',
    magenta: '#d367ff',
    lightMagenta: '#d367ff',
    cyan: '#46c3d9',
    lightCyan: '#46c3d9',
    white: '#abb2bf',
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
    weight: 'normal', // valid css font-weight
    weightBold: 'bold', // valid css font-weight
    lineHeight: 1.2,
    letterSpacing: -0.01 // px
  },

  dark: true,
  os: platform
});
