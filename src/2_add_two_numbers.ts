// You are given two non-empty linked lists representing two non-negative integers.
// The digits are stored in reverse order, and each of their nodes contains a single digit.
// Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example 1:
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

// Example 2:
// Input: l1 = [0], l2 = [0]
// Output: [0]

// Example 3:
// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.

//   Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbersRecursion(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let solution = new ListNode();
  let head = solution;

  const travers = (
    lt1: ListNode | null,
    lt2: ListNode | null,
    toTransfer: number,
  ) => {
    //if both nulls solution is ready
    if (lt1 === null && lt2 === null && toTransfer === 0) return;

    const value = (lt1?.val ?? 0) + (lt2?.val ?? 0) + toTransfer;
    head.val = value % 10;
    const toTransferNext = value >= 10 ? 1 : 0;

    if (lt1?.next || lt2?.next || toTransferNext) {
      const next = new ListNode();
      head.next = next;
      head = next;
    }

    travers(lt1?.next ?? null, lt2?.next ?? null, toTransferNext);
  };

  travers(l1, l2, 0);

  return solution;
}

function addTwoNumbersIteratively(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let solution = new ListNode();
  let head = solution;

  let l1next = l1;
  let l2next = l2;
  let toTransfer = 0;

  while (l1next || l2next || toTransfer) {
    const value = (l1next?.val ?? 0) + (l2next?.val ?? 0) + toTransfer;
    head.val = value % 10;
    toTransfer = value >= 10 ? 1 : 0;

    if (l1next?.next || l2next?.next || toTransfer) {
      const next = new ListNode();
      head.next = next;
      head = next;
    }
    l1next = l1next?.next ?? null;
    l2next = l2next?.next ?? null;
  }

  return solution;
}

const prepareLinkedList = (arr: number[]): ListNode => {
  let first: ListNode = new ListNode(arr[0]);
  let head = first;

  for (let i = 1; i < arr.length; i++) {
    const next = new ListNode(arr[i]);
    head.next = next;
    head = next;
  }

  return first;
};

const getListNodeString = (list: ListNode): string => {
  let listString = "";

  const travers = (list: ListNode) => {
    listString += list.val.toString() + " ";
    if (list.next === null) return;
    else travers(list.next);
  };

  travers(list);

  return listString;
};

const tests = [
  { l1: [2, 4, 3], l2: [5, 6, 4] },
  { l1: [0], l2: [0] },
  { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] },
];

tests.forEach((test) => {
  const l1 = prepareLinkedList(test.l1);
  const l2 = prepareLinkedList(test.l2);
  console.log(`l1: ${getListNodeString(l1)}`);
  console.log(`l2: ${getListNodeString(l2)}`);

  const solutionR = addTwoNumbersRecursion(l1, l2);
  console.log(`sr: ${solutionR ? getListNodeString(solutionR) : "null"}`);
  const solutionI = addTwoNumbersIteratively(l1, l2);
  console.log(`si: ${solutionI ? getListNodeString(solutionI) : "null"}`);

  console.log("******");
});
