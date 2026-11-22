// 1. Zero-Copy Memory Transfer Benchmark
function runZeroCopyBenchmark(bufferSizeMB = 32, iterations = 50) {
  const byteLength = bufferSizeMB * 1024 * 1024;
  const sourceBuffer = new Uint8Array(byteLength);
  sourceBuffer.fill(0xAB);

  // Before: Redundant allocation & copy
  const t0 = performance.now();
  for (let i = 0; i < iterations; i++) {
    const copy = new Uint8Array(sourceBuffer);
    if (copy[0] !== 0xAB) throw new Error("Verify failed");
  }
  const cloneMs = performance.now() - t0;

  // After: Zero-copy view transfer
  const t1 = performance.now();
  for (let i = 0; i < iterations; i++) {
    const view = sourceBuffer.subarray(0, byteLength);
    if (view[0] !== 0xAB) throw new Error("Verify failed");
  }
  const zeroCopyMs = performance.now() - t1;

  console.table([
    { Method: "Before (Uint8Array Clone)", Time_ms: cloneMs.toFixed(2) },
    { Method: "After (Zero-Copy View)", Time_ms: zeroCopyMs.toFixed(2) }
  ]);
}

runZeroCopyBenchmark();

// 2. Branchless Bit-Mask Lookup Benchmark
function runBitMaskLookupBenchmark(deviceCount = 5000, queries = 10000) {
  const FLAG_ID = 1 << 0;
  const FLAG_LABEL = 1 << 1;
  const FLAG_GROUP = 1 << 2;

  const devices = Array.from({ length: deviceCount }, (_, i) => ({
    id: `dev_${i}`,
    label: `Camera_${i}`,
    groupId: `grp_${i % 50}`,
    flags: FLAG_ID | FLAG_LABEL | FLAG_GROUP
  }));

  const target = devices[deviceCount - 1];

  // Before: Sequential multi-pass loops
  const t0 = performance.now();
  for (let q = 0; q < queries; q++) {
    let found = null;
    for (let i = 0; i < devices.length; i++) {
      if (devices[i].id === target.id) { found = devices[i]; break; }
    }
    if (!found) {
      for (let i = 0; i < devices.length; i++) {
        if (devices[i].label === target.label) { found = devices[i]; break; }
      }
    }
  }
  const loopMs = performance.now() - t0;

  // After: Pre-indexed O(1) lookup with bitmask check
  const indexMap = new Map(devices.map(d => [d.id, d]));
  const t1 = performance.now();
  for (let q = 0; q < queries; q++) {
    const candidate = indexMap.get(target.id);
    const isValid = candidate && ((candidate.flags & FLAG_ID) !== 0);
    if (!isValid) throw new Error("Lookup failed");
  }
  const bitMaskMs = performance.now() - t1;

  console.table([
    { Method: "Before (Sequential Loops)", Time_ms: loopMs.toFixed(2) },
    { Method: "After (Bit-Mask O(1) Map)", Time_ms: bitMaskMs.toFixed(2) }
  ]);
}

runBitMaskLookupBenchmark();


// 3. Storage Mutex Serialization Test
class StorageMutex {
  constructor() {
    this.queue = Promise.resolve();
  }
  run(task) {
    const next = this.queue.then(() => task());
    this.queue = next.catch(() => {});
    return next;
  }
}

async function runStorageMutexTest(concurrentWrites = 20) {
  const mutex = new StorageMutex();
  let activeTransactions = 0;
  let maxConcurrentDetected = 0;

  const mockIndexedDBWrite = () => new Promise(resolve => {
    activeTransactions++;
    maxConcurrentDetected = Math.max(maxConcurrentDetected, activeTransactions);
    setTimeout(() => {
      activeTransactions--;
      resolve();
    }, 5);
  });

  const tasks = Array.from({ length: concurrentWrites }, () =>
    mutex.run(() => mockIndexedDBWrite())
  );

  await Promise.all(tasks);
  console.log(`Max concurrent transactions (Expected: 1): ${maxConcurrentDetected}`);
}

runStorageMutexTest();
