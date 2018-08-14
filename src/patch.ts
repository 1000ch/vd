import { createText, createNode } from './vd';
import { isDefined, isTextNode } from './util';
import VNode from './VNode';
import VText from './VText';

type V = VNode | VText;

function isChanged(oldV: V, newV: V): boolean {
  if (oldV.nodeType !== newV.nodeType) {
    return true;
  }

  if (!isTextNode(oldV) && isTextNode(newV)) {
    return true;
  }

  if (isTextNode(oldV) && !isTextNode(newV)) {
    return true;
  }

  if (isTextNode(oldV) && isTextNode(newV)) {
    const oldVText = oldV as VText;
    const newVText = newV as VText;

    return oldVText.data !== newVText.data;
  }

  const oldVNode = oldV as VNode;
  const newVNode = newV as VNode;

  if (oldVNode.tagName !== newVNode.tagName) {
    return true;
  }

  if (oldVNode.attributes.size !== newVNode.attributes.size) {
    return true;
  }

  if (oldVNode.childNodes.length !== newVNode.childNodes.length) {
    return true;
  }

  return false;
}

export function createPatch(rootNode: Node, oldVs: Array<V>, newVs: Array<V>): Function {
  const patchQueue: Array<Function> = [];
  const length = Math.max(oldVs.length, newVs.length);

  for (let i = 0; i < length; i++) {
    const oldV = oldVs[i];
    const newV = newVs[i];

    if (isDefined(oldV) && isDefined(newV) && isChanged(oldV, newV)) {
      patchQueue.push(() => {
        const oldChild = rootNode.childNodes[i];
        const newChild = isTextNode(newV) ?
          createText(newV as VText) :
          createNode(newV as VNode);
        rootNode.replaceChild(newChild, oldChild);
      });
    } else if (!isDefined(oldV)) {
      patchQueue.push(() => {
        const newChild = isTextNode(newV) ?
          createText(newV as VText) :
          createNode(newV as VNode);
        rootNode.appendChild(newChild);
      });
    } else if (!isDefined(newV)) {
      patchQueue.push(() => {
        const oldChild = rootNode.childNodes[i];
        rootNode.removeChild(oldChild);
      });
    }
  }

  return () => patchQueue.forEach(fn => fn());
}
