import { invoke } from '@tauri-apps/api';

export function getIconURL(icon?: AutumnFile): string {
  if (icon === undefined) {
    return generateDicebearAvatar();
  }

  return `https://autumn.revolt.chat/${icon.tag}/${icon._id}`;
}

export function generateDicebearAvatar(): string {
  return `https://avatars.dicebear.com/api/open-peeps/${Math.round(Math.random() * 99)}.svg`;
}

export function fetchUser(user: string): Promise<User> {
  return invoke('fetch_user', { user });
}
