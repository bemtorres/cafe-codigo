const REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element');
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

export function jsxDEV(type, config, maybeKey) {
  let key = null;
  if (maybeKey !== undefined) {
    key = '' + maybeKey;
  }
  if (config && config.key !== undefined) {
    key = '' + config.key;
  }

  const props = {};
  if (config) {
    for (const propName in config) {
      if (
        Object.prototype.hasOwnProperty.call(config, propName) &&
        propName !== 'key' &&
        propName !== 'ref'
      ) {
        props[propName] = config[propName];
      }
    }
  }

  const ref = config && config.ref !== undefined ? config.ref : null;

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  };
}

export const Fragment = REACT_FRAGMENT_TYPE;
export const jsx = jsxDEV;
export const jsxs = jsxDEV;

export default {
  Fragment: REACT_FRAGMENT_TYPE,
  jsxDEV,
  jsx: jsxDEV,
  jsxs: jsxDEV,
};
