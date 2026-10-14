export const PROFILE_QUERY_KEYS = {
  all: ["profile"] as const,
  me: () => [...PROFILE_QUERY_KEYS.all, "me"] as const,
  sessions: () => [...PROFILE_QUERY_KEYS.all, "sessions"] as const,
};
