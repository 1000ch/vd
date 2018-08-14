import { isDefined } from './util.js';

export function createNode(vnode) {
  if (vnode.nodeType === Node.TEXT_NODE) {
    return document.createTextNode(vnode.data);
  }

  const { tagName, attrs, childVNodes } = vnode;
  const node = document.createElement(tagName);

  if (isDefined(attrs)) {
    Object.keys(attrs).forEach(attr => {
      node.setAttribute(attr, attrs[attr]);
    });
  }

  if (isDefined(childVNodes)) {
    childVNodes.forEach(childVnode => {
      node.appendChild(createNode(childVnode));
    });
  }

  return node;
}

export function createNodes(vnodes) {
  return [].map.call(vnodes, createNode);
}
