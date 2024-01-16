class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.loadFactor = 0.75;
    this.size = 0;
  }

  hash(input) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < input.length; i++) {
      hashCode = primeNumber * hashCode + input.charCodeAt(i);
    }
    return hashCode % this.buckets.length;
  }

  resize() {
    const emptyBuckets = this.buckets.reduce((prev, curr) => {
      return !curr ? prev + 1 : prev;
    }, 0);
    if (emptyBuckets / this.buckets.length <= 1 - this.loadFactor) {
      this.buckets = this.buckets.concat(
        new Array(this.buckets.length).fill(null)
      );
    }
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) this.size++;
    this.buckets[index] = { [key]: value };
    this.resize();
  }

  get(key) {
    const index = this.hash(key);
    return this.buckets[index] ? this.buckets[index][key] : null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    if (this.has(key)) {
      this.buckets[this.hash(key)] = null;
      this.size--;
      return true;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(16).fill(null);
    this.size = 0;
  }

  keys() {
    return this.buckets
      .filter((bucket) => bucket !== null)
      .map((bucket) => Object.keys(bucket)[0]);
  }

  values() {
    return this.buckets
      .filter((bucket) => bucket !== null)
      .map((bucket) => Object.values(bucket)[0]);
  }

  entries() {
    return this.buckets
      .filter((bucket) => bucket !== null)
      .map((bucket) => Object.entries(bucket))
      .flat();
  }
}
