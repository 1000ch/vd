import { createPatch } from './lib/patch.js';
import { createVNodes } from './lib/VNode.js';

function render(vnode, rootNode) {
  if (app.$vnode === undefined) {
    app.$vnode = createVNodes(app.children);
  }

  const patch = createPatch(rootNode, app.$vnode, vnode);
  app.$vnode = vnode;
  patch();
}

document.querySelector('button').addEventListener('click', () => {
  const span = document.createElement('span');
  span.innerHTML = '＼(^o^)／';
  const nextVnodes = createVNodes([span]);
  render(nextVnodes, document.querySelector('#app'));
});
