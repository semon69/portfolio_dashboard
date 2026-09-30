import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * RTK Query mutation triggers resolve to `{ data }` or `{ error }` — they
 * do not throw. The old code wrapped them in try/catch, so the catch block
 * never ran and a failed save looked exactly like a successful one.
 *
 * This inspects the result properly and surfaces the server's message.
 */
export const readError = (error: any): string => {
  if (!error) return "Something went wrong.";
  if (error.status === "FETCH_ERROR") return "Could not reach the server.";
  if (error.status === 401 || error.status === 403) {
    return "Your session has expired. Please log in again.";
  }

  // RTK Query puts the parsed response body on `data`.
  const body = error.data ?? error;
  if (typeof body === "string") return body;

  return body?.message || body?.error?.message || "Something went wrong.";
};

type Options = {
  success?: string;
  onSuccess?: () => void;
};

/** Returns true when the mutation succeeded. */
export const runMutation = async (
  promise: Promise<any>,
  { success, onSuccess }: Options = {}
): Promise<boolean> => {
  const result: any = await promise;

  if (result?.error) {
    toast.error(readError(result.error));
    return false;
  }

  toast.success(success || result?.data?.message || "Saved");
  onSuccess?.();
  return true;
};
