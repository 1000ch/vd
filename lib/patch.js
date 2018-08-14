import { isDefined } from './util.js';
import { createNode } from './Node.js';

function isChanged(oldVnode, newVnode) {
  if (oldVnode.tagName !== newVnode.tagName) {
    return true;
  }

  const oldAttrsLength = Object.keys(oldVnode.attrs).length;
  const newAttrsLength = Object.keys(newVnode.attrs).length;

  if (oldAttrsLength !== newAttrsLength) {
    return true;
  }

  if (oldVnode.childVNodes.length !== newVnode.childVNodes.length) {
    return true;
  }

  return false;
}

export function createPatch(parentNode, oldVnodes, newVnodes) {
  const patchQueue = [];
  const oldLength = oldVnodes.length;
  const newLength = newVnodes.length;
  const length = oldLength > newLength ? oldLength : newLength;

  for (let i = 0; i < length; i++) {
    const oldVnode = oldVnodes[i];
    const newVnode = newVnodes[i];

    if (isDefined(oldVnode) && isDefined(newVnode)) {
      patchQueue.push(() => {
        const oldChild = parentNode.childNodes[i];
        const newChild = createNode(newVnode);
        parentNode.replaceChild(newChild, oldChild);
      });
    } else if (!isDefined(oldVnode)) {
      patchQueue.push(() => {
        const newChild = createNode(vnode);
        parentNode.appendChild(newChild);
      });
    } else if (!isDefined(newVnode)) {
      patchQueue.push(() => {
        const oldChild = parentNode.childNodes[i];
        parentNode.removeChild(oldChild);
      });
    }
  }

  return () => patchQueue.forEach(fn => fn());
}
