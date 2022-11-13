export function linkHandler(e: MouseEvent, url: string) {
  if (e.ctrlKey || e.metaKey) window.electron.api.openUrl(url);
}
