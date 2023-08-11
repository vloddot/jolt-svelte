import { invoke } from '@tauri-apps/api';

const AUTUMN_URL = 'https://autumn.revolt.chat';
const API_URL = 'https://api.revolt.chat';

export function getAutumnURL(file: AutumnFile): string {
  return `${AUTUMN_URL}/${file.tag}/${file._id}`;
}

export function getDefaultUserAvatar(user_id: string): string {
  return `${API_URL}/users/${user_id}/default_avatar`;
}

export function fetchUser(userId: string): Promise<User> {
  return invoke('fetch_user', { userId });
}

export function getDisplayAvatar(member?: Member, user?: User): string {
  if (member?.avatar !== undefined) {
    return getAutumnURL(member.avatar);
  }

  if (user?.avatar === undefined) {
    return user === undefined ? '/user.svg' : getDefaultUserAvatar(user._id);
  } else {
    return getAutumnURL(user?.avatar);
  }
}
