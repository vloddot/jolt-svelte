import { base } from '$app/paths';
import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';

export const PING_HEARTBEAT_INTERVAL = 30;
export const PONG_TIMEOUT = 10;
export const AUTUMN_URL = 'https://autumn.revolt.chat';
export const API_URL = 'https://api.revolt.chat';
export const DEFAULT_SETTINGS: Settings = {
	appearance: {},
	ordering: {},
	'jolt:low-data-mode': false,
	'jolt:compact-mode': false,
	'jolt:receive-typing-indicators': true,
	'jolt:send-typing-indicators': true
};

export function getAutumnURL(
	file: { _id: string; tag: string },
	options?: Partial<{ max_side: string }>
): string {
	return `${AUTUMN_URL}/${file.tag}/${file._id}?${new URLSearchParams(options)}`;
}

export function getDefaultUserAvatar(user_id: string): string {
	return `${API_URL}/users/${user_id}/default_avatar`;
}

export function getDisplayName(
	user?: Partial<{ display_name: string; username: string }>,
	member?: Member,
	message?: Message
): string {
	if (message?.system == undefined) {
		return (
			message?.masquerade?.name ??
			member?.nickname ??
			user?.display_name ??
			user?.username ??
			`<${get(_)('user.unknown')}>`
		);
	}

	return get(_)('message.system');
}

export function getDisplayAvatar(
	user?: { _id: string; avatar?: { _id: string; tag: string } },
	member?: Member,
	message?: Message
): string {
	if (message?.system != undefined) {
		return `${base}/user.svg`;
	}

	if (message?.webhook?.avatar != undefined) {
		return message.webhook.avatar;
	}

	if (message?.masquerade?.avatar != undefined) {
		return message.masquerade.avatar;
	}

	if (member?.avatar != undefined) {
		return `${getAutumnURL(member.avatar, { max_side: '256' })}`;
	}

	if (user?.avatar == undefined) {
		return user == undefined ? `${base}/user.svg` : getDefaultUserAvatar(user._id);
	}

	return `${getAutumnURL(user?.avatar, { max_side: '256' })}`;
}
