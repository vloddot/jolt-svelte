import { invoke } from '@tauri-apps/api';
import xxhash from 'xxhashjs';

export function getAutumnURL(icon?: AutumnFile): string {
  if (icon === undefined) {
    return generateDicebearAvatar();
  }

  return `https://autumn.revolt.chat/${icon.tag}/${icon._id}`;
}

export function generateDicebearAvatar(): string {
  const DICEBEAR_AVATAR = `https://avatars.dicebear.com/api/open-peeps`;

  return `${DICEBEAR_AVATAR}/${Math.round(Math.random() * 99)}.svg`;
}

export function fetchUser(user: string): Promise<User> {
  return invoke('fetch_user', { user });
}
