const searchParams = new URL(location.href).searchParams;

export const params = {
  windowId: searchParams.get('windowId')!,
  dir: searchParams.get('dir'),
  openSettingsInitially: searchParams.get('openSettingsInitially') === 'true'
};

params.dir = params.dir === 'undefined' ? '' : params.dir;
