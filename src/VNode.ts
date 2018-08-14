import VText from "./VText";

export default interface VNode {
  nodeType: number;
  tagName: string;
  attributes: Map<string, any>;
  childNodes: Array<VNode | VText>;
}
