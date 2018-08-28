import { createPatch } from './lib/patch.js';
import { createVNodes } from './lib/vd.js';

function render(vnode, rootNode) {
  if (rootNode.$vnode === undefined) {
    rootNode.$vnode = createVNodes(rootNode.childNodes);
  }

  const patch = createPatch(rootNode, rootNode.$vnode, vnode);
  rootNode.$vnode = vnode;
  patch();
}

document.querySelector('button').addEventListener('click', () => {
  const nextRoot = document.createDocumentFragment();
  const span = document.createElement('span');
  span.innerHTML = '＼(^o^)／';
  nextRoot.appendChild(span);

  render(
    createVNodes(nextRoot.childNodes),
    document.querySelector('#app')
  );
});
