export const defaultSettings = (platform: string) => ({
  window: {
    style: {
      padding: '2px 6px 6px 14px',
      showShadow: true,
      vibrancy: null
    },
    useNativeAppBar: false,
    acceptFirstMouse: false,
    showTitle: true
  },

  theme: 'zap',

  color: {
    foreground: '#CCCCCC',
    background: '#000000',
    selection: '#3B3E46',
    black: '#000000',
    lightBlack: '#000000',
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
    lightWhite: '#ffffff'
  },

  cursor: {
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
