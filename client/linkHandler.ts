export function linkHandler(_: MouseEvent, url: string) {
  window.electron.api.openUrl(url);
}
