import { invoke } from '@tauri-apps/api';

export function getAutumnURL(file: AutumnFile): string {
  return `https://autumn.revolt.chat/${file.tag}/${file._id}`;
}

export function fetchUser(userId: string): Promise<User> {
  return invoke('fetch_user', { userId: userId });
}
