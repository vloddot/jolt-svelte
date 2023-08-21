import { invoke } from '@tauri-apps/api';
import { getContext, setContext } from 'svelte';
import { _ } from 'svelte-i18n';
import { get, writable, type Writable } from 'svelte/store';

export const AUTUMN_URL = 'https://autumn.revolt.chat';
export const API_URL = 'https://api.revolt.chat';
export const ULID_LENGTH = 26;

export function getAutumnURL(file: AutumnFile): string {
	return `${AUTUMN_URL}/${file.tag}/${file._id}`;
}

export function getDefaultUserAvatar(user_id: string): string {
	return `${API_URL}/users/${user_id}/default_avatar`;
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

export async function getChannelName(channel: Channel, user_id?: string): Promise<string> {
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

	const user = await invoke<User>('fetch_user', {
		user_id: channel.recipients[0] === user_id ? channel.recipients[1] : channel.recipients[0]
	});

	return `@${user.username}`;
}

export function defineService<T>(
	key: string | symbol = Symbol(),
	initialValue?: T
): () => Writable<T> {
	setContext(key, writable(initialValue));
	return () => getContext<Writable<T>>(key);
}
