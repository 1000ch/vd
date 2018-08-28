import VNode from './VNode.js';
import VText from './VText.js';

export function isDefined(arg: any): boolean {
  return arg !== undefined;
}

export function isTextNode(v: Node | VNode | VText) {
  return v.nodeType === Node.TEXT_NODE;
}
