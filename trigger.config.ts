import { defineConfig } from "@trigger.dev/sdk/v3";
import { prismaExtension } from "@trigger.dev/build/extensions/prisma";

export default defineConfig({
  project: "proj_xmpoqrknmyqbgkvdexis",  // ← updated to your new project ref
  runtime: "node",
  logLevel: "log",
  build: {
    external: ["@prisma/client", "prisma", "ffmpeg-static"],
    extensions: [prismaExtension({ schema: "prisma/schema.prisma", mode: "legacy" })],
  },
  maxDuration: 3600,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ["./src/trigger"],
});