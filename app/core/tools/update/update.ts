import { autoUpdater, UpdateInfo } from 'electron-updater';

export function autoCheckUpdate(isAuto = true): void {
  autoUpdater.logger = $tools.log.logger;

  autoUpdater.on('error', (message: { name: any; message: any; stack: any }) => {
    $tools.log.error('There was a problem updating the application');
    $tools.log.error(message.name, message.message, message.stack);
  });

  autoUpdater.on('update-downloaded', async (info: UpdateInfo) => {
    $tools.log.info('auto-update: downloaded ', info);
    if (await $tools.showConfirmWindow(`${info.version}已下载，是否立即更新？`)) {
      autoUpdater.quitAndInstall();
    }
  });

  autoUpdater.on('checking-for-update', () => {
    $tools.log.info('auto-update: checking-for-update');
  });

  autoUpdater.on('download-progress', (process: any) => {
    $tools.log.info('auto-update: download process, ', process);
  });

  autoUpdater.on('update-available', (info: UpdateInfo) => {
    $tools.log.info('auto-update: update-available');
    !isAuto && $tools.showMessageWindow(`正在进行 ${info.version} 下载，请稍后...`);
  });

  autoUpdater.on('update-not-available', () => {
    $tools.log.info('auto-update: update-not-available');
    !isAuto && $tools.showMessageWindow(`您目前版本为${$tools.APP_VERSION}, 暂无可用更新。`);
  });

  autoUpdater.on('before-quit-for-update', () => {
    $tools.log.info('auto-update: before-quit-for-update');
  });

  autoUpdater.checkForUpdatesAndNotify();
}
