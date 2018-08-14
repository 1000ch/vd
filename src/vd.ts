import { isTextNode } from './util';
import VNode from "./VNode";
import VText from "./VText";

function createAttributeMap(attributes: NamedNodeMap): Map<string, any> {
  const map = new Map();
  const { length } = attributes;

  for (let i = 0; i < length; i++ ) {
    const { name, value } = attributes[i];
    map.set(name, value);
  }

  return map;
}

function createVText(text: Text): VText {
  const { nodeType, data } = text;

  return {
    nodeType,
    data
  };
}

export function createText(vtext: VText): Text {
  return document.createTextNode(vtext.data);
}

export function createVNode(element: HTMLElement): VNode {
  const { nodeType, tagName, attributes, childNodes } = element;

  return {
    nodeType,
    tagName: tagName.toLowerCase(),
    attributes: createAttributeMap(attributes),
    childNodes: createVNodes(childNodes)
  };
}

export function createNode(vnode: VNode): Node {
  const { tagName, attributes, childNodes } = vnode;
  const node = document.createElement(tagName);

  attributes.forEach((key, value) => {
    node.setAttribute(key, value);
  })

  childNodes.forEach(childNode => {
    if (isTextNode(childNode)) {
      node.appendChild(createText(childNode as VText));
    } else {
      node.appendChild(createNode(childNode as VNode));
    }
  });

  return node;
}

export function createNodes(vnodes: Array<VNode | VText>): Array<Node> {
  return [].map.call(vnodes, (vnode: VNode | VText) => {
    if (isTextNode(vnode)) {
      return createText(vnode as VText);
    } else {
      return createNode(vnode as VNode);
    }
  });
}

export function createVNodes(nodes: NodeListOf<Node>): Array<VNode | VText> {
  return [].map.call(nodes, (node: Node) => {
    if (isTextNode(node)) {
      return createVText(node as Text);
    } else {
      return createVNode(node as HTMLElement);
    }
  });
}
