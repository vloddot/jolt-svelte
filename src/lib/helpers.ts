import { invoke } from '@tauri-apps/api';

export function getAutumnURL(file: AutumnFile): string {
  return `https://autumn.revolt.chat/${file.tag}/${file._id}`;
}

export function getDefaultUserAvatar(user_id: string): string {
  return `https://api.revolt.chat/users/${user_id}/default_avatar`;
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
