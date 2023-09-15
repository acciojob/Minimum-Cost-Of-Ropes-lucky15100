function calculateMinimumCost() {
  const ropeInput = document.getElementById('ropeInput').value;
  const ropeLengths = ropeInput.split(',').map(Number);

  if (ropeLengths.length < 2) {
    // Display an error message if there are fewer than 2 ropes
    document.getElementById('result').textContent = 'Please enter at least 2 rope lengths.';
  } else {
    const minCost = findMinimumCost(ropeLengths);
    document.getElementById('result').textContent = `Minimum cost: ${minCost}`;
  }
}

function findMinimumCost(ropeLengths) {
  let minCost = 0;

  // Create a min heap to store rope lengths
  const minHeap = new MinHeap();

  // Add all rope lengths to the min heap
  for (const length of ropeLengths) {
    minHeap.insert(length);
  }

  // Connect ropes until only one rope is left in the heap
  while (minHeap.size() > 1) {
    const firstRope = minHeap.extractMin();
    const secondRope = minHeap.extractMin();

    const cost = firstRope + secondRope;
    minCost += cost;

    minHeap.insert(cost);
  }

  return minCost;
}

// MinHeap implementation (used to efficiently find the minimum rope lengths)
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin() {
    if (this.size() === 0) {
      return undefined;
    }

    if (this.size() === 1) {
      return this.heap.pop();
    }

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown();
    return minValue;
  }

  bubbleUp() {
    let index = this.size() - 1;

    while (index > 0) {
      const element = this.heap[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element >= parent) {
        break;
      }

      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  sinkDown() {
    let index = 0;
    const length = this.size();
    const element = this.heap[0];

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild < element) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if ((swap === null && rightChild < element) || (swap !== null && rightChild < leftChild)) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) {
        break;
      }

      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }
}
