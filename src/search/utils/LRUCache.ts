export class LRUCache<K, V> {
  private cache = new Map<K, V>();

  constructor(private maxSize = 5) {}

  set(key: K, value: V) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;

      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
  }

  get(key: K): V | null {
    if (!this.cache.has(key)) {
      return null;
    }

    const value = this.cache.get(key)!;

    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  clear() {
    this.cache.clear();
  }
}