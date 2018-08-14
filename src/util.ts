import VNode from "./VNode";
import VText from "./VText";

export function isDefined(arg: any): boolean {
  return arg !== undefined;
}

export function isTextNode(v: Node | VNode | VText) {
  return v.nodeType === Node.TEXT_NODE;
}
