import { session } from '$lib/stores';
import { invoke } from '@tauri-apps/api';
import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';

export const AUTUMN_URL = 'https://autumn.revolt.chat';
export const API_URL = 'https://api.revolt.chat';
export const ULID_LENGTH = 26;

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

export async function getChannelName(channel: Channel): Promise<string> {
  if (
    channel.channel_type === 'TextChannel' ||
    channel.channel_type === 'VoiceChannel' ||
    channel.channel_type === 'Group'
  ) {
    return `#${channel.name}`;
  }

  if (channel.channel_type === 'SavedMessages') {
    return get(_)('channel.notes');
  }

  const user = await fetchUser(
    channel.recipients[0] === get(session)?.user_id ? channel.recipients[1] : channel.recipients[0],
  );

  return `@${user.username}`;
}
