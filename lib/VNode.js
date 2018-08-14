function createAttrMap(attributes) {
  const map = {};
  const { length } = attributes;

  for (let i = 0; i < length; i++ ) {
    const { name, value } = attributes[i];
    map[name] = value;
  }

  return map;
}

function createVNode(node) {
  return new VNode(node);
}

export function createVNodes(nodes) {
  return [].map.call(nodes, createVNode);
}

export default class VNode {
  constructor(node) {
    this.nodeType = node.nodeType;

    if (node.nodeType === Node.TEXT_NODE) {
      this.data = node.data;
    } else {
      this.tagName = node.tagName.toLowerCase();
      this.attrs = createAttrMap(node.attributes);
      this.childVNodes = createVNodes(node.childNodes);
    }
  }
}
