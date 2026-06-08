import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getDB() {
  const { env } = getCloudflareContext();
  if (!env || !env.DB) {
    throw new Error("D1 Database binding 'DB' not found in Cloudflare context.");
  }
  return env.DB;
}

export default getDB;
