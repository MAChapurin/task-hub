import Ably from 'ably';

const globalForAbly = globalThis as unknown as {
  ablyClient: Ably.Realtime | undefined;
};

export const ably =
  globalForAbly.ablyClient ?? new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_KEY!);

if (process.env.NODE_ENV !== 'production') {
  globalForAbly.ablyClient = ably;
}
