import { invoke } from '@tauri-apps/api';

export function getAutumnURL(icon: AutumnFile): string {
  return `https://autumn.revolt.chat/${icon.tag}/${icon._id}`;
}

export function fetchUser(user: string): Promise<User> {
  return invoke('fetch_user', { user });
}
