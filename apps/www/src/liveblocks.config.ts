import { type LayersType } from '~/types/liveblocks';

declare global {
	interface Liveblocks {
		// Each user's Presence, for useMyPresence, useOthers, etc.
		Presence: {
			// Example, real-time cursor coordinates
			// cursor: { x: number; y: number };
		};
		Storage: {
			layers: LayersType;
		};

		// Custom user info set when authenticating with a secret key
		UserMeta: {
			id: string;
			info: {
				// Example properties, for useSelf, useUser, useOthers, etc.
				// name: string;
				// avatar: string;
			};
		};

		// Custom events, for useBroadcastEvent, useEventListener
		RoomEvent: {
			// Example has two events, using a union
			// | { type: "PLAY" }
			// | { type: "REACTION"; emoji: "🔥" };
		};
		// Custom metadata set on threads, for useThreads, useCreateThread, etc.
		ThreadMetadata: {
			// Example, attaching coordinates to a thread
			// x: number;
			// y: number;
		};

		// Custom room info set with resolveRoomsInfo, for useRoomInfo
		RoomInfo: {
			// Example, rooms with a title and url
			// title: string;
			// url: string;
		};
	}
}

export {};
