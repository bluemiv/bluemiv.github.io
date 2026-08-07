import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import { describe, expect, it, vi } from "vitest";

import {
  isLegacyCacheName,
  isLegacyServiceWorkerUrl,
  LEGACY_CACHE_PREFIX,
} from "./serviceWorkerConfig";

type WorkerEvent = {
  waitUntil: (promise: Promise<unknown>) => void;
};

type WorkerListener = (event: WorkerEvent) => void;

function loadCleanupWorker(unregisterResult = true) {
  const listeners = new Map<string, WorkerListener>();
  const clients = [
    {
      url: "https://bluemiv.github.io/articles/one/",
      postMessage: vi.fn(),
      navigate: vi.fn().mockResolvedValue(undefined),
    },
    {
      url: "https://bluemiv.github.io/articles/two/",
      postMessage: vi.fn(() => {
        throw new Error("stale client");
      }),
      navigate: vi.fn().mockResolvedValue(undefined),
    },
  ];
  const cacheNames = ["bluemiv-blog-v1", "another-app-cache", "bluemiv-blog-v2"];
  const caches = {
    keys: vi.fn().mockResolvedValue(cacheNames),
    delete: vi.fn((cacheName: string) => Promise.resolve(cacheName === "bluemiv-blog-v1")),
  };
  const workerScope = {
    skipWaiting: vi.fn().mockResolvedValue(undefined),
    clients: {
      matchAll: vi.fn().mockResolvedValue(clients),
    },
    registration: {
      unregister: vi.fn().mockResolvedValue(unregisterResult),
    },
    addEventListener: (type: string, listener: WorkerListener) => listeners.set(type, listener),
  };
  const tombstone = fs.readFileSync(path.join(process.cwd(), "public/sw.js"), "utf8");

  vm.runInNewContext(tombstone, { caches, self: workerScope });

  return { caches, cacheNames, clients, listeners, workerScope };
}

describe("serviceWorkerConfig", () => {
  it.each(["bluemiv-blog-v1", "bluemiv-blog-static-2025"])(
    "구형 cache 이름을 판별한다: %s",
    (cacheName) => {
      expect(isLegacyCacheName(cacheName)).toBe(true);
    },
  );

  it.each(["bluemiv-v1", "another-app-cache", ""])("다른 cache를 보호한다: %s", (cacheName) => {
    expect(isLegacyCacheName(cacheName)).toBe(false);
  });

  it("동일 origin의 /sw.js만 구형 worker로 판별한다", () => {
    const origin = "https://bluemiv.github.io";

    expect(isLegacyServiceWorkerUrl(`${origin}/sw.js`, origin)).toBe(true);
    expect(isLegacyServiceWorkerUrl(`${origin}/sw.js?v=1`, origin)).toBe(true);
    expect(isLegacyServiceWorkerUrl(`${origin}/worker.js`, origin)).toBe(false);
    expect(isLegacyServiceWorkerUrl("https://example.com/sw.js", origin)).toBe(false);
    expect(isLegacyServiceWorkerUrl("invalid-url", origin)).toBe(false);
  });

  it("public tombstone이 cache write와 fetch interception을 포함하지 않는다", () => {
    const tombstone = fs.readFileSync(path.join(process.cwd(), "public/sw.js"), "utf8");

    expect(tombstone).toContain(LEGACY_CACHE_PREFIX);
    expect(tombstone).not.toMatch(/addEventListener\(["']fetch["']/);
    expect(tombstone).not.toContain("caches.open(");
    expect(tombstone).not.toContain("cache.put(");
  });

  it("install 즉시 새 tombstone을 활성화한다", async () => {
    const { listeners, workerScope } = loadCleanupWorker();
    const waitUntil = vi.fn();

    listeners.get("install")?.({ waitUntil });
    await waitUntil.mock.calls[0][0];

    expect(workerScope.skipWaiting).toHaveBeenCalledOnce();
  });

  it("activate에서 구형 cache만 지우고 모든 page를 worker에서 해제한다", async () => {
    const { caches, cacheNames, clients, listeners, workerScope } = loadCleanupWorker();
    const waitUntil = vi.fn();

    listeners.get("activate")?.({ waitUntil });
    await waitUntil.mock.calls[0][0];

    expect(caches.keys).toHaveBeenCalledOnce();
    expect(caches.delete).toHaveBeenCalledTimes(2);
    expect(caches.delete).toHaveBeenNthCalledWith(1, cacheNames[0]);
    expect(caches.delete).toHaveBeenNthCalledWith(2, cacheNames[2]);
    expect(workerScope.clients.matchAll).toHaveBeenCalledWith({
      type: "window",
      includeUncontrolled: true,
    });
    expect(workerScope.registration.unregister).toHaveBeenCalledOnce();
    expect(clients[0].postMessage).toHaveBeenCalledWith({
      type: "BLUEMIV_SW_CLEANUP_COMPLETE",
      deletedCacheNames: ["bluemiv-blog-v1"],
    });
    expect(clients[0].navigate).toHaveBeenCalledWith(clients[0].url);
    expect(clients[1].navigate).toHaveBeenCalledWith(clients[1].url);
  });

  it("worker 등록 해제가 실패하면 activate를 실패시킨다", async () => {
    const { listeners } = loadCleanupWorker(false);
    const waitUntil = vi.fn();

    listeners.get("activate")?.({ waitUntil });

    await expect(waitUntil.mock.calls[0][0]).rejects.toThrow(
      "Service worker unregister returned false",
    );
  });
});
