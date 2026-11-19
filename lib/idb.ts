// Lightweight Native IndexedDB helper for storing thousands of real website records without hitting localStorage 5MB quota limit

export async function openSitesDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      return reject(new Error("IndexedDB not supported"));
    }
    const request = indexedDB.open("NovaGrowthSitesDB", 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("sites")) {
        db.createObjectStore("sites", { keyPath: "domain" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveSitesToIndexedDB(sites: any[]): Promise<void> {
  try {
    const db = await openSitesDB();
    const tx = db.transaction("sites", "readwrite");
    const store = tx.objectStore("sites");
    store.clear();
    for (const site of sites) {
      if (site && site.domain) {
        store.put(site);
      }
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn("IndexedDB write failed:", err);
  }
}

export async function loadSitesFromIndexedDB(): Promise<any[]> {
  try {
    const db = await openSitesDB();
    const tx = db.transaction("sites", "readonly");
    const store = tx.objectStore("sites");
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return [];
  }
}
