type Handler = (ctx: { data: unknown }) => unknown;

/** Runs the server function body on-device. No ATO or model key is bundled. */
export function createServerFn(_opts?: { method?: string }) {
  const builder = {
    validator(_fn: unknown) {
      return builder;
    },
    handler(fn: Handler) {
      return (input?: { data?: unknown }) => Promise.resolve(fn({ data: input?.data }));
    },
  };
  return builder;
}
