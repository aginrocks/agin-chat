import { platform } from '@tauri-apps/plugin-os';
import { APP_NAME } from '../constants/names';

export function humanReadablePlatform() {
    const platformId = platform();
    if (platformId === 'linux') return 'Linux';
    if (platformId === 'macos') return 'macOS';
    if (platformId === 'windows') return 'Windows';
    return platformId;
}

export function getSessionName() {
    return `${APP_NAME}: ${humanReadablePlatform()}`;
}
