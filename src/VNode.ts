import VText from './VText.js';

export default interface VNode {
  nodeType: number;
  tagName: string;
  attributes: Map<string, any>;
  childNodes: Array<VNode | VText>;
}
