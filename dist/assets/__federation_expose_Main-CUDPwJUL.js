import { importShared } from './__federation_fn_import-lyDSGtOx.js';
import { r as reactExports } from './__federation_shared_react-DO25RkNm.js';
import 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/cn/index.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const {useRef,useEffect: useEffect$1,useState: useState$1} = await importShared('react');

const { CozeWebSDK } = window;
function CozeWebSdk({ propData, event, propState }) {
  const chatBotRef = useRef(null);
  const sdkRef = useRef(null);
  const initRef = useRef(false);
  const asstIconUrl = "https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/obric/coze/favicon.1970.png";
  const [isVisible, setIsVisible] = useState$1(false);
  useEffect$1(() => {
    if (!chatBotRef.current) {
      console.log("等待中渲染完成...");
      return;
    }
    if (!propData?.config_botId) {
      console.log("未获取到config_botId,等待中...");
      return;
    }
    if (initRef.current) {
      console.log("sdk已经渲染过一次");
      return;
    }
    initRef.current = true;
    propState?.config_botId?.set(String(propData?.config_botId));
    sdkRef.current = new CozeWebSDK.WebChatClient({
      config: {
        // 智能体 ID
        botId: propData?.config_botId
      },
      auth: {
        //鉴权方式，默认type 为unauth，表示不鉴权；建议设置为 token，表示通过PAT或OAuth鉴权
        type: propData?.auth_type || "unauth",
        //type 为 token 时，需要设置PAT或OAuth访问密钥
        token: propData?.auth_token || void 0,
        //访问密钥过期时，使用的新密钥，可以按需设置。
        onRefreshToken: () => propData?.auth_refreshToken || void 0
      },
      userInfo: {
        id: propData?.userInfo_id || void 0,
        url: propData?.userInfo_url || asstIconUrl,
        nickname: propData?.userInfo_nickname || "用户"
      },
      ui: {
        base: {
          icon: propData?.ui_base_icon || asstIconUrl,
          layout: "pc",
          // 改为 pc 布局，因为 mobile 布局会有固定宽度限制
          lang: propData?.ui_base_lang || "zh-CN"
          //zIndex: 0,
        },
        asstBtn: {
          isNeed: propData?.ui_asstBtn_isNeed == "true" ? true : false
        },
        footer: {
          isShow: propData?.ui_footer_expressionText ? true : false,
          expressionText: propData?.ui_footer_expressionText
          // linkvars: {
          //   nameA: {
          //     text: "Coze",
          //     link: "https://www.coze.cn/",
          //   },
          //   nameB: {
          //     text: "Zion",
          //     link: "https://zion.functorz.com/",
          //   },
          // },
        },
        chatBot: {
          title: propData?.ui_chatBot_title || void 0,
          // uploadable: true,
          width: propData?.ui_chatBot_width || "100%",
          // 添加这行，设置宽度为 100%
          el: chatBotRef.current,
          onHide: () => {
            setIsVisible(false);
            event.onChatBotHide?.call(null);
            console.log("onHide---");
          },
          onShow: () => {
            setIsVisible(true);
            event.onChatBotShow?.call(null);
            console.log("onShow---");
          }
        }
      }
    });
    sdkRef.current.showChatBot();
    return () => {
    };
  }, [propData, event, propState]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "coze-web-sdk",
      ref: chatBotRef,
      style: {
        display: isVisible ? "flex" : "none",
        width: "100%",
        height: "100%",
        position: "relative",
        justifyContent: "center",
        // Center horizontally
        alignItems: "center",
        // Center vertically
        background: "transparent"
        // 添加透明背景
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
          // /* 隐藏关闭按钮 */
          // .efa8c49d8ce1a57573bf.e4f8c2c1d9d493c0cfdb {
          //   display: none !important;
          // }
          // /* 隐藏顶部标题栏 */
          // .header._874044fb502a454c2fe9-header {
          //   display: none !important;
          // }
        ` })
    }
  );
}

function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject$1 = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject$1(result[targetKey]) && isPlainObject$1(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject$1(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0];
  }

  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }

  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({source, data}) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);

    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    }
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === 'function',
  isFunction(_global.postMessage)
);

const asap = typeof queueMicrotask !== 'undefined' ?
  queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

// *********************

const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject: isPlainObject$1,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError$1(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}

utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});

const prototype$1 = AxiosError$1.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils$1.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError$1.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
const httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils$1.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

  if (!utils$1.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils$1.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1('Blob is not supported. Use a Buffer instead.');
    }

    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils$1.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils$1.isArray(value) && isFlatArray(value)) ||
        ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils$1.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils$1.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData$1(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?(object|Function)} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  } 

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

const URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

const FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

const Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

const _navigator = typeof navigator === 'object' && navigator || undefined;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = hasBrowserEnv &&
  (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

const origin = hasBrowserEnv && window.location.href || 'http://localhost';

const utils = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: 'Module' }));

const platform = {
  ...utils,
  ...platform$1
};

function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};

    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (0, JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http', 'fetch'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils$1.isObject(data);

    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils$1.isFormData(data);

    if (isFormData) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils$1.isArrayBuffer(data) ||
      utils$1.isBuffer(data) ||
      utils$1.isStream(data) ||
      utils$1.isFile(data) ||
      utils$1.isBlob(data) ||
      utils$1.isReadableStream(data)
    ) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData$1(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }

    if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils$1.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
const parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils$1.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils$1.isString(value)) return;

  if (utils$1.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils$1.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils$1.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isHeaders(header)) {
      for (const [key, value] of header.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils$1.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
};

AxiosHeaders$1.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils$1.freezeMethods(AxiosHeaders$1);

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError$1(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError$1.call(this, message == null ? 'canceled' : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      'Request failed with status code ' + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Function}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1000 / freq;
  let lastArgs;
  let timer;

  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };

  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if ( passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };

  const flush = () => lastArgs && invoke(lastArgs);

  return [throttled, flush];
}

const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return throttle(e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? 'download' : 'upload']: true
    };

    listener(data);
  }, freq);
};

const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;

  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};

const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));

const isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
  url = new URL(url, platform.origin);

  return (
    origin.protocol === url.protocol &&
    origin.host === url.host &&
    (isMSIE || origin.port === url.port)
  );
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;

const cookies = platform.hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];

      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

      utils$1.isString(path) && cookie.push('path=' + path);

      utils$1.isString(domain) && cookie.push('domain=' + domain);

      secure === true && cookie.push('secure');

      document.cookie = cookie.join('; ');
    },

    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return (match ? decodeURIComponent(match[3]) : null);
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  };

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig$2(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({caseless}, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, prop , caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop , caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a, prop , caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b , prop) => mergeDeepProperties(headersToObject(a), headersToObject(b),prop, true)
  };

  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const resolveConfig = (config) => {
  const newConfig = mergeConfig$2({}, config);

  let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

  newConfig.headers = headers = AxiosHeaders$1.from(headers);

  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);

  // HTTP basic authentication
  if (auth) {
    headers.set('Authorization', 'Basic ' +
      btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
    );
  }

  let contentType;

  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(undefined); // Let the browser set it
    } else if ((contentType = headers.getContentType()) !== false) {
      // fix semicolon duplication issue for ReactNative FormData implementation
      const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
    }
  }

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.

  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

    if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
      // Add xsrf header
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }

  return newConfig;
};

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

const xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let {responseType, onUploadProgress, onDownloadProgress} = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;

    function done() {
      flushUpload && flushUpload(); // flush events
      flushDownload && flushDownload(); // flush events

      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

      _config.signal && _config.signal.removeEventListener('abort', onCanceled);
    }

    let request = new XMLHttpRequest();

    request.open(_config.method.toUpperCase(), _config.url, true);

    // Set the request timeout in MS
    request.timeout = _config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = _config.responseType;
    }

    // Handle progress if needed
    if (onDownloadProgress) {
      ([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
      request.addEventListener('progress', downloadThrottled);
    }

    // Not all browsers support upload events
    if (onUploadProgress && request.upload) {
      ([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

      request.upload.addEventListener('progress', uploadThrottled);

      request.upload.addEventListener('loadend', flushUpload);
    }

    if (_config.cancelToken || _config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(_config.url);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1('Unsupported protocol ' + protocol + ':', AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const composeSignals = (signals, timeout) => {
  const {length} = (signals = signals ? signals.filter(Boolean) : []);

  if (timeout || length) {
    let controller = new AbortController();

    let aborted;

    const onabort = function (reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };

    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);

    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach(signal => {
          signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
        });
        signals = null;
      }
    };

    signals.forEach((signal) => signal.addEventListener('abort', onabort));

    const {signal} = controller;

    signal.unsubscribe = () => utils$1.asap(unsubscribe);

    return signal;
  }
};

const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;

  if (len < chunkSize) {
    yield chunk;
    return;
  }

  let pos = 0;
  let end;

  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};

const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};

const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }

  const reader = stream.getReader();
  try {
    for (;;) {
      const {done, value} = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};

const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);

  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };

  return new ReadableStream({
    async pull(controller) {
      try {
        const {done, value} = await iterator.next();

        if (done) {
         _onFinish();
          controller.close();
          return;
        }

        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  })
};

const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

// used only inside the fetch adapter
const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
    ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
    async (str) => new Uint8Array(await new Response(str).arrayBuffer())
);

const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false
  }
};

const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;

  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: 'POST',
    get duplex() {
      duplexAccessed = true;
      return 'half';
    },
  }).headers.has('Content-Type');

  return duplexAccessed && !hasContentType;
});

const DEFAULT_CHUNK_SIZE = 64 * 1024;

const supportsResponseStream = isReadableStreamSupported &&
  test(() => utils$1.isReadableStream(new Response('').body));


const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};

isFetchSupported && (((res) => {
  ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res) => res[type]() :
      (_, config) => {
        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
  });
})(new Response));

const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }

  if(utils$1.isBlob(body)) {
    return body.size;
  }

  if(utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: 'POST',
      body,
    });
    return (await _request.arrayBuffer()).byteLength;
  }

  if(utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }

  if(utils$1.isURLSearchParams(body)) {
    body = body + '';
  }

  if(utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};

const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());

  return length == null ? getBodyLength(body) : length;
};

const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = 'same-origin',
    fetchOptions
  } = resolveConfig(config);

  responseType = responseType ? (responseType + '').toLowerCase() : 'text';

  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

  let request;

  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
  });

  let requestContentLength;

  try {
    if (
      onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
      (requestContentLength = await resolveBodyLength(headers, data)) !== 0
    ) {
      let _request = new Request(url, {
        method: 'POST',
        body: data,
        duplex: "half"
      });

      let contentTypeHeader;

      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
        headers.setContentType(contentTypeHeader);
      }

      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );

        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }

    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? 'include' : 'omit';
    }

    // Cloudflare Workers throws when credentials are defined
    // see https://github.com/cloudflare/workerd/issues/902
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : undefined
    });

    let response = await fetch(request);

    const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

    if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
      const options = {};

      ['status', 'statusText', 'headers'].forEach(prop => {
        options[prop] = response[prop];
      });

      const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];

      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }

    responseType = responseType || 'text';

    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

    !isStreamResponse && unsubscribe && unsubscribe();

    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    })
  } catch (err) {
    unsubscribe && unsubscribe();

    if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      )
    }

    throw AxiosError$1.from(err, err && err.code, config, request);
  }
});

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};

utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

const adapters = {
  getAdapter: (adapters) => {
    adapters = utils$1.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const VERSION$1 = "1.7.9";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION$1 + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError$1(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError$1.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    // eslint-disable-next-line no-console
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  }
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1('option ' + opt + ' must be ' + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}

const validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};

        Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
        try {
          if (!err.stack) {
            err.stack = stack;
            // match without the 2 top stack lines
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
            err.stack += '\n' + stack;
          }
        } catch (e) {
          // ignore the case where "stack" is an un-writable property
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig$2(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    validator.assertOptions(config, {
      baseUrl: validators.spelling('baseURL'),
      withXsrfToken: validators.spelling('withXSRFToken')
    }, true);

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils$1.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig$2(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};

// Provide aliases for supported request methods
utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$2(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$2(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios$1.prototype[method] = generateHTTPMethod();

  Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  toAbortSignal() {
    const controller = new AbortController();

    const abort = (err) => {
      controller.abort(err);
    };

    this.subscribe(abort);

    controller.signal.unsubscribe = () => this.unsubscribe(abort);

    return controller.signal;
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils$1.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$2(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;

// Expose AxiosError class
axios.AxiosError = AxiosError$1;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread$1;

// Expose isAxiosError
axios.isAxiosError = isAxiosError$1;

// Expose mergeConfig
axios.mergeConfig = mergeConfig$2;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
const {
  Axios,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken,
  VERSION,
  all,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig: mergeConfig$1
} = axios;

const __viteBrowserExternal = {};

class APIResource {
    constructor(client){
        this._client = client;
    }
}
/* eslint-disable @typescript-eslint/no-namespace */ class Bots extends APIResource {
    /**
   * Create a new agent. | 调用接口创建一个新的智能体。
   * @docs en:https://www.coze.com/docs/developer_guides/create_bot?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/create_bot?_lang=zh
   * @param params - Required The parameters for creating a bot. | 创建 Bot 的参数。
   * @param params.space_id - Required The Space ID of the space where the agent is located. | Bot 所在的空间的 Space ID。
   * @param params.name - Required The name of the agent. It should be 1 to 20 characters long. | Bot 的名称。
   * @param params.description - Optional The description of the agent. It can be 0 to 500 characters long. | Bot 的描述信息。
   * @param params.icon_file_id - Optional The file ID for the agent's avatar. | 作为智能体头像的文件 ID。
   * @param params.prompt_info - Optional The personality and reply logic of the agent. | Bot 的提示词配置。
   * @param params.onboarding_info - Optional The settings related to the agent's opening remarks. | Bot 的开场白配置。
   * @returns Information about the created bot. | 创建的 Bot 信息。
   */ async create(params, options) {
        const apiUrl = '/v1/bot/create';
        const result = await this._client.post(apiUrl, params, false, options);
        return result.data;
    }
    /**
   * Update the configuration of an agent. | 调用接口修改智能体的配置。
   * @docs en:https://www.coze.com/docs/developer_guides/update_bot?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/update_bot?_lang=zh
   * @param params - Required The parameters for updating a bot. | 修改 Bot 的参数。
   * @param params.bot_id - Required The ID of the agent that the API interacts with. | 待修改配置的智能体ID。
   * @param params.name - Optional The name of the agent. | Bot 的名称。
   * @param params.description - Optional The description of the agent. | Bot 的描述信息。
   * @param params.icon_file_id - Optional The file ID for the agent's avatar. | 作为智能体头像的文件 ID。
   * @param params.prompt_info - Optional The personality and reply logic of the agent. | Bot 的提示词配置。
   * @param params.onboarding_info - Optional The settings related to the agent's opening remarks. | Bot 的开场白配置。
   * @param params.knowledge - Optional Knowledge configurations of the agent. | Bot 的知识库配置。
   * @returns Undefined | 无返回值
   */ async update(params, options) {
        const apiUrl = '/v1/bot/update';
        const result = await this._client.post(apiUrl, params, false, options);
        return result.data;
    }
    /**
   * Get the agents published as API service. | 调用接口查看指定空间发布到 Agent as API 渠道的智能体列表。
   * @docs en:https://www.coze.com/docs/developer_guides/published_bots_list?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/published_bots_list?_lang=zh
   * @param params - Required The parameters for listing bots. | 列出 Bot 的参数。
   * @param params.space_id - Required The ID of the space. | Bot 所在的空间的 Space ID。
   * @param params.page_size - Optional Pagination size. | 分页大小。
   * @param params.page_index - Optional Page number for paginated queries. | 分页查询时的页码。
   * @returns List of published bots. | 已发布的 Bot 列表。
   */ async list(params, options) {
        const apiUrl = '/v1/space/published_bots_list';
        const result = await this._client.get(apiUrl, params, false, options);
        return result.data;
    }
    /**
   * Publish the specified agent as an API service. | 调用接口创建一个新的智能体。
   * @docs en:https://www.coze.com/docs/developer_guides/publish_bot?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/publish_bot?_lang=zh
   * @param params - Required The parameters for publishing a bot. | 发布 Bot 的参数。
   * @param params.bot_id - Required The ID of the agent that the API interacts with. | 要发布的智能体ID。
   * @param params.connector_ids - Required The list of publishing channel IDs for the agent. | 智能体的发布渠道 ID 列表。
   * @returns Undefined | 无返回值
   */ async publish(params, options) {
        const apiUrl = '/v1/bot/publish';
        const result = await this._client.post(apiUrl, params, false, options);
        return result.data;
    }
    /**
   * Get the configuration information of the agent. | 获取指定智能体的配置信息。
   * @docs en:https://www.coze.com/docs/developer_guides/get_metadata?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/get_metadata?_lang=zh
   * @param params - Required The parameters for retrieving a bot. | 获取 Bot 的参数。
   * @param params.bot_id - Required The ID of the agent that the API interacts with. | 要查看的智能体ID。
   * @returns Information about the bot. | Bot 的配置信息。
   */ async retrieve(params, options) {
        const apiUrl = '/v1/bot/get_online_info';
        const result = await this._client.get(apiUrl, params, false, options);
        return result.data;
    }
}
/* eslint-disable security/detect-object-injection */ /* eslint-disable @typescript-eslint/no-explicit-any */ function safeJsonParse(jsonString) {
    let defaultValue = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return defaultValue;
    }
}
function sleep(ms) {
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
    });
}
function isBrowser() {
    return 'undefined' != typeof window;
}
function isPlainObject(obj) {
    if ('object' != typeof obj || null === obj) return false;
    const proto = Object.getPrototypeOf(obj);
    if (null === proto) return true;
    let baseProto = proto;
    while(null !== Object.getPrototypeOf(baseProto))baseProto = Object.getPrototypeOf(baseProto);
    return proto === baseProto;
}
function mergeConfig() {
    for(var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++)objects[_key] = arguments[_key];
    return objects.reduce((result, obj)=>{
        if (void 0 === obj) return result || {};
        for(const key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (isPlainObject(obj[key]) && !Array.isArray(obj[key])) result[key] = mergeConfig(result[key] || {}, obj[key]);
            else result[key] = obj[key];
        }
        return result;
    }, {});
}
function isPersonalAccessToken(token) {
    return null == token ? void 0 : token.startsWith('pat_');
}
/* eslint-disable max-params */ class CozeError extends Error {
}
class APIError extends CozeError {
    static makeMessage(status, errorBody, message, headers) {
        if (!errorBody && message) return message;
        if (errorBody) {
            const list = [];
            const { code, msg, error } = errorBody;
            if (code) list.push(`code: ${code}`);
            if (msg) list.push(`msg: ${msg}`);
            if ((null == error ? void 0 : error.detail) && msg !== error.detail) list.push(`detail: ${error.detail}`);
            const logId = (null == error ? void 0 : error.logid) || (null == headers ? void 0 : headers['x-tt-logid']);
            if (logId) list.push(`logid: ${logId}`);
            const help_doc = null == error ? void 0 : error.help_doc;
            if (help_doc) list.push(`help doc: ${help_doc}`);
            return list.join(', ');
        }
        if (status) return `http status code: ${status} (no body)`;
        return '(no status code or body)';
    }
    static generate(status, errorResponse, message, headers) {
        if (!status) return new APIConnectionError({
            cause: castToError(errorResponse)
        });
        const error = errorResponse;
        // https://www.coze.cn/docs/developer_guides/coze_error_codes
        if (400 === status || (null == error ? void 0 : error.code) === 4000) return new BadRequestError(status, error, message, headers);
        if (401 === status || (null == error ? void 0 : error.code) === 4100) return new AuthenticationError(status, error, message, headers);
        if (403 === status || (null == error ? void 0 : error.code) === 4101) return new PermissionDeniedError(status, error, message, headers);
        if (404 === status || (null == error ? void 0 : error.code) === 4200) return new NotFoundError(status, error, message, headers);
        if (429 === status || (null == error ? void 0 : error.code) === 4013) return new RateLimitError(status, error, message, headers);
        if (408 === status) return new TimeoutError(status, error, message, headers);
        if (502 === status) return new GatewayError(status, error, message, headers);
        if (status >= 500) return new InternalServerError(status, error, message, headers);
        return new APIError(status, error, message, headers);
    }
    constructor(status, error, message, headers){
        var _error_error, _error_error1;
        super(`${APIError.makeMessage(status, error, message, headers)}`);
        this.status = status;
        this.headers = headers;
        this.logid = null == headers ? void 0 : headers['x-tt-logid'];
        // this.error = error;
        this.code = null == error ? void 0 : error.code;
        this.msg = null == error ? void 0 : error.msg;
        this.detail = null == error ? void 0 : null === (_error_error = error.error) || void 0 === _error_error ? void 0 : _error_error.detail;
        this.help_doc = null == error ? void 0 : null === (_error_error1 = error.error) || void 0 === _error_error1 ? void 0 : _error_error1.help_doc;
        this.rawError = error;
    }
}
class APIConnectionError extends APIError {
    constructor({ message, cause }){
        super(void 0, void 0, message || 'Connection error.', void 0), this.status = void 0;
    // if (cause) {
    //   this.cause = cause;
    // }
    }
}
class APIUserAbortError extends APIError {
    constructor(message){
        super(void 0, void 0, message || 'Request was aborted.', void 0), this.name = 'UserAbortError', this.status = void 0;
    }
}
class BadRequestError extends APIError {
    constructor(...args){
        super(...args), this.name = 'BadRequestError', this.status = 400;
    }
}
class AuthenticationError extends APIError {
    constructor(...args){
        super(...args), this.name = 'AuthenticationError', this.status = 401;
    }
}
class PermissionDeniedError extends APIError {
    constructor(...args){
        super(...args), this.name = 'PermissionDeniedError', this.status = 403;
    }
}
class NotFoundError extends APIError {
    constructor(...args){
        super(...args), this.name = 'NotFoundError', this.status = 404;
    }
}
class TimeoutError extends APIError {
    constructor(...args){
        super(...args), this.name = 'TimeoutError', this.status = 408;
    }
}
class RateLimitError extends APIError {
    constructor(...args){
        super(...args), this.name = 'RateLimitError', this.status = 429;
    }
}
class InternalServerError extends APIError {
    constructor(...args){
        super(...args), this.name = 'InternalServerError', this.status = 500;
    }
}
class GatewayError extends APIError {
    constructor(...args){
        super(...args), this.name = 'GatewayError', this.status = 502;
    }
}
const castToError = (err)=>{
    if (err instanceof Error) return err;
    return new Error(err);
};
class Messages extends APIResource {
    /**
   * Get the list of messages in a chat. | 获取对话中的消息列表。
   * @docs en:https://www.coze.com/docs/developer_guides/chat_message_list?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/chat_message_list?_lang=zh
   * @param conversation_id - Required The ID of the conversation. | 会话 ID。
   * @param chat_id - Required The ID of the chat. | 对话 ID。
   * @returns An array of chat messages. | 对话消息数组。
   */ async list(conversation_id, chat_id, options) {
        const apiUrl = `/v3/chat/message/list?conversation_id=${conversation_id}&chat_id=${chat_id}`;
        const result = await this._client.get(apiUrl, void 0, false, options);
        return result.data;
    }
}
const uuid = ()=>(Math.random() * new Date().getTime()).toString();
const handleAdditionalMessages = (additional_messages)=>null == additional_messages ? void 0 : additional_messages.map((i)=>({
            ...i,
            content: 'object' == typeof i.content ? JSON.stringify(i.content) : i.content
        }));
class Chat extends APIResource {
    /**
   * Call the Chat API to send messages to a published Coze agent. | 调用此接口发起一次对话，支持添加上下文
   * @docs en:https://www.coze.com/docs/developer_guides/chat_v3?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/chat_v3?_lang=zh
   * @param params - Required The parameters for creating a chat session. | 创建会话的参数。
   * @param params.bot_id - Required The ID of the agent. | 要进行会话聊天的 Bot ID。
   * @param params.user_id - Optional The ID of the user interacting with the Bot. | 标识当前与 Bot 交互的用户。
   * @param params.additional_messages - Optional Additional messages for the conversation. | 对话的附加信息。
   * @param params.custom_variables - Optional Variables defined in the Bot. | Bot 中定义变量。
   * @param params.auto_save_history - Optional Whether to automatically save the conversation history. | 是否自动保存历史对话记录。
   * @param params.meta_data - Optional Additional metadata for the message. | 创建消息时的附加消息。
   * @param params.conversation_id - Optional The ID of the conversation. | 标识对话发生在哪一次会话中。
   * @param params.extra_params - Optional Extra parameters for the conversation. | 附加参数。
   * @returns The data of the created chat. | 创建的对话数据。
   */ async create(params, options) {
        if (!params.user_id) params.user_id = uuid();
        const { conversation_id, ...rest } = params;
        const apiUrl = `/v3/chat${conversation_id ? `?conversation_id=${conversation_id}` : ''}`;
        const payload = {
            ...rest,
            additional_messages: handleAdditionalMessages(params.additional_messages),
            stream: false
        };
        const result = await this._client.post(apiUrl, payload, false, options);
        return result.data;
    }
    /**
   * Call the Chat API to send messages to a published Coze agent. | 调用此接口发起一次对话，支持添加上下文
   * @docs en:https://www.coze.com/docs/developer_guides/chat_v3?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/chat_v3?_lang=zh
   * @param params - Required The parameters for creating a chat session. | 创建会话的参数。
   * @param params.bot_id - Required The ID of the agent. | 要进行会话聊天的 Bot ID。
   * @param params.user_id - Optional The ID of the user interacting with the Bot. | 标识当前与 Bot 交互的用户。
   * @param params.additional_messages - Optional Additional messages for the conversation. | 对话的附加信息。
   * @param params.custom_variables - Optional Variables defined in the Bot. | Bot 中定义的变量。
   * @param params.auto_save_history - Optional Whether to automatically save the conversation history. | 是否自动保存历史对话记录。
   * @param params.meta_data - Optional Additional metadata for the message. | 创建消息时的附加消息。
   * @param params.conversation_id - Optional The ID of the conversation. | 标识对话发生在哪一次会话中。
   * @param params.extra_params - Optional Extra parameters for the conversation. | 附加参数。
   * @returns
   */ async createAndPoll(params, options) {
        if (!params.user_id) params.user_id = uuid();
        const { conversation_id, ...rest } = params;
        const apiUrl = `/v3/chat${conversation_id ? `?conversation_id=${conversation_id}` : ''}`;
        const payload = {
            ...rest,
            additional_messages: handleAdditionalMessages(params.additional_messages),
            stream: false
        };
        const result = await this._client.post(apiUrl, payload, false, options);
        const chatId = result.data.id;
        const conversationId = result.data.conversation_id;
        let chat;
        while(true){
            await sleep(100);
            chat = await this.retrieve(conversationId, chatId);
            if ('completed' === chat.status || 'failed' === chat.status || 'requires_action' === chat.status) break;
        }
        const messageList = await this.messages.list(conversationId, chatId);
        return {
            chat,
            messages: messageList
        };
    }
    /**
   * Call the Chat API to send messages to a published Coze agent with streaming response. | 调用此接口发起一次对话，支持流式响应。
   * @docs en:https://www.coze.com/docs/developer_guides/chat_v3?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/chat_v3?_lang=zh
   * @param params - Required The parameters for streaming a chat session. | 流式会话的参数。
   * @param params.bot_id - Required The ID of the agent. | 要进行会话聊天的 Bot ID。
   * @param params.user_id - Optional The ID of the user interacting with the Bot. | 标识当前与 Bot 交互的用户。
   * @param params.additional_messages - Optional Additional messages for the conversation. | 对话的附加信息。
   * @param params.custom_variables - Optional Variables defined in the Bot. | Bot 中定义的变量。
   * @param params.auto_save_history - Optional Whether to automatically save the conversation history. | 是否自动保存历史对话记录。
   * @param params.meta_data - Optional Additional metadata for the message. | 创建消息时的附加消息。
   * @param params.conversation_id - Optional The ID of the conversation. | 标识对话发生在哪一次会话中。
   * @param params.extra_params - Optional Extra parameters for the conversation. | 附加参数。
   * @returns A stream of chat data. | 对话数据流。
   */ async *stream(params, options) {
        if (!params.user_id) params.user_id = uuid();
        const { conversation_id, ...rest } = params;
        const apiUrl = `/v3/chat${conversation_id ? `?conversation_id=${conversation_id}` : ''}`;
        const payload = {
            ...rest,
            additional_messages: handleAdditionalMessages(params.additional_messages),
            stream: true
        };
        const result = await this._client.post(apiUrl, payload, true, options);
        for await (const message of result)if ("done" === message.event) {
            const ret = {
                event: message.event,
                data: '[DONE]'
            };
            yield ret;
        } else try {
            const ret = {
                event: message.event,
                data: JSON.parse(message.data)
            };
            yield ret;
        } catch (error) {
            throw new CozeError(`Could not parse message into JSON:${message.data}`);
        }
    }
    /**
   * Get the detailed information of the chat. | 查看对话的详细信息。
   * @docs en:https://www.coze.com/docs/developer_guides/retrieve_chat?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/retrieve_chat?_lang=zh
   * @param conversation_id - Required The ID of the conversation. | 会话 ID。
   * @param chat_id - Required The ID of the chat. | 对话 ID。
   * @returns The data of the retrieved chat. | 检索到的对话数据。
   */ async retrieve(conversation_id, chat_id, options) {
        const apiUrl = `/v3/chat/retrieve?conversation_id=${conversation_id}&chat_id=${chat_id}`;
        const result = await this._client.post(apiUrl, void 0, false, options);
        return result.data;
    }
    /**
   * Cancel a chat session. | 取消对话会话。
   * @docs en:https://www.coze.com/docs/developer_guides/cancel_chat?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/cancel_chat?_lang=zh
   * @param conversation_id - Required The ID of the conversation. | 会话 ID。
   * @param chat_id - Required The ID of the chat. | 对话 ID。
   * @returns The data of the canceled chat. | 取消的对话数据。
   */ async cancel(conversation_id, chat_id, options) {
        const apiUrl = '/v3/chat/cancel';
        const payload = {
            conversation_id,
            chat_id
        };
        const result = await this._client.post(apiUrl, payload, false, options);
        return result.data;
    }
    /**
   * Submit tool outputs for a chat session. | 提交对话会话的工具输出。
   * @docs en:https://www.coze.com/docs/developer_guides/chat_submit_tool_outputs?_lang=en
   * @docs zh:https://www.coze.cn/docs/developer_guides/chat_submit_tool_outputs?_lang=zh
   * @param params - Required Parameters for submitting tool outputs. | 提交工具输出的参数。
   * @param params.conversation_id - Required The ID of the conversation. | 会话 ID。
   * @param params.chat_id - Required The ID of the chat. | 对话 ID。
   * @param params.tool_outputs - Required The outputs of the tool. | 工具的输出。
   * @param params.stream - Optional Whether to use streaming response. | 是否使用流式响应。
   * @returns The data of the submitted tool outputs or a stream of chat data. | 提交的工具输出数据或对话数据流。
   */ async *submitToolOutputs(params, options) {
        const { conversation_id, chat_id, ...rest } = params;
        const apiUrl = `/v3/chat/submit_tool_outputs?conversation_id=${params.conversation_id}&chat_id=${params.chat_id}`;
        const payload = {
            ...rest
        };
        if (false === params.stream) {
            const response = await this._client.post(apiUrl, payload, false, options);
            return response.data;
        }
        {
            const result = await this._client.post(apiUrl, payload, true, options);
            for await (const message of result)if ("done" === message.event) {
                const ret = {
                    event: message.event,
                    data: '[DONE]'
                };
                yield ret;
            } else try {
                const ret = {
                    event: message.event,
                    data: JSON.parse(message.data)
                };
                yield ret;
            } catch (error) {
                throw new CozeError(`Could not parse message into JSON:${message.data}`);
            }
        }
    }
    constructor(...args){
        super(...args), this.messages = new Messages(this._client);
    }
}
var chat_ChatStatus = /*#__PURE__*/ function(ChatStatus) {
    ChatStatus["CREATED"] = "created";
    ChatStatus["IN_PROGRESS"] = "in_progress";
    ChatStatus["COMPLETED"] = "completed";
    ChatStatus["FAILED"] = "failed";
    ChatStatus["REQUIRES_ACTION"] = "requires_action";
    ChatStatus["CANCELED"] = "canceled";
    return ChatStatus;
}({});
var chat_ChatEventType = /*#__PURE__*/ function(ChatEventType) {
    ChatEventType["CONVERSATION_CHAT_CREATED"] = "conversation.chat.created";
    ChatEventType["CONVERSATION_CHAT_IN_PROGRESS"] = "conversation.chat.in_progress";
    ChatEventType["CONVERSATION_CHAT_COMPLETED"] = "conversation.chat.completed";
    ChatEventType["CONVERSATION_CHAT_FAILED"] = "conversation.chat.failed";
    ChatEventType["CONVERSATION_CHAT_REQUIRES_ACTION"] = "conversation.chat.requires_action";
    ChatEventType["CONVERSATION_MESSAGE_DELTA"] = "conversation.message.delta";
    ChatEventType["CONVERSATION_MESSAGE_COMPLETED"] = "conversation.message.completed";
    ChatEventType["CONVERSATION_AUDIO_DELTA"] = "conversation.audio.delta";
    ChatEventType["DONE"] = "done";
    ChatEventType["ERROR"] = "error";
    return ChatEventType;
}({});
var chat_RoleType = /*#__PURE__*/ function(RoleType) {
    RoleType["User"] = "user";
    RoleType["Assistant"] = "assistant";
    return RoleType;
}({});
class messages_Messages extends APIResource {
    /**
   * Create a message and add it to the specified conversation. | 创建一条消息，并将其添加到指定的会话中。
   * @docs en: https://www.coze.com/docs/developer_guides/create_message?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/create_message?_lang=zh
   * @param conversation_id - Required The ID of the conversation. | Conversation ID，即会话的唯一标识。
   * @param params - Required The parameters for creating a message | 创建消息所需的参数
   * @param params.role - Required The entity that sent this message. Possible values: user, assistant. | 发送这条消息的实体。取值：user, assistant。
   * @param params.content - Required The content of the message. | 消息的内容。
   * @param params.content_type - Required The type of the message content. | 消息内容的类型。
   * @param params.meta_data - Optional Additional information when creating a message. | 创建消息时的附加消息。
   * @returns Information about the new message. | 消息详情。
   */ async create(conversation_id, params, options) {
        const apiUrl = `/v1/conversation/message/create?conversation_id=${conversation_id}`;
        const response = await this._client.post(apiUrl, params, false, options);
        return response.data;
    }
    /**
   * Modify a message, supporting the modification of message content, additional content, and message type. | 修改一条消息，支持修改消息内容、附加内容和消息类型。
   * @docs en: https://www.coze.com/docs/developer_guides/modify_message?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/modify_message?_lang=zh
   * @param conversation_id - Required The ID of the conversation. | Conversation ID，即会话的唯一标识。
   * @param message_id - Required The ID of the message. | Message ID，即消息的唯一标识。
   * @param params - Required The parameters for modifying a message | 修改消息所需的参数
   * @param params.meta_data - Optional Additional information when modifying a message. | 修改消息时的附加消息。
   * @param params.content - Optional The content of the message. | 消息的内容。
   * @param params.content_type - Optional The type of the message content. | 消息内容的类型。
   * @returns Information about the modified message. | 消息详情。
   */ // eslint-disable-next-line max-params
    async update(conversation_id, message_id, params, options) {
        const apiUrl = `/v1/conversation/message/modify?conversation_id=${conversation_id}&message_id=${message_id}`;
        const response = await this._client.post(apiUrl, params, false, options);
        return response.message;
    }
    /**
   * Get the detailed information of specified message. | 查看指定消息的详细信息。
   * @docs en: https://www.coze.com/docs/developer_guides/retrieve_message?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/retrieve_message?_lang=zh
   * @param conversation_id - Required The ID of the conversation. | Conversation ID，即会话的唯一标识。
   * @param message_id - Required The ID of the message. | Message ID，即消息的唯一标识。
   * @returns Information about the message. | 消息详情。
   */ async retrieve(conversation_id, message_id, options) {
        const apiUrl = `/v1/conversation/message/retrieve?conversation_id=${conversation_id}&message_id=${message_id}`;
        const response = await this._client.get(apiUrl, null, false, options);
        return response.data;
    }
    /**
   * List messages in a conversation. | 列出会话中的消息。
   * @docs en: https://www.coze.com/docs/developer_guides/message_list?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/message_list?_lang=zh
   * @param conversation_id - Required The ID of the conversation. | Conversation ID，即会话的唯一标识。
   * @param params - Optional The parameters for listing messages | 列出消息所需的参数
   * @param params.order - Optional The order of the messages. | 消息的顺序。
   * @param params.chat_id - Optional The ID of the chat. | 聊天 ID。
   * @param params.before_id - Optional The ID of the message before which to list. | 列出此消息之前的消息 ID。
   * @param params.after_id - Optional The ID of the message after which to list. | 列出此消息之后的消息 ID。
   * @param params.limit - Optional The maximum number of messages to return. | 返回的最大消息数。
   * @returns A list of messages. | 消息列表。
   */ async list(conversation_id, params, options) {
        const apiUrl = `/v1/conversation/message/list?conversation_id=${conversation_id}`;
        const response = await this._client.post(apiUrl, params, false, options);
        return response;
    }
    /**
   * Call the API to delete a message within a specified conversation. | 调用接口在指定会话中删除消息。
   * @docs en: https://www.coze.com/docs/developer_guides/delete_message?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/delete_message?_lang=zh
   * @param conversation_id - Required The ID of the conversation. | Conversation ID，即会话的唯一标识。
   * @param message_id - Required The ID of the message. | Message ID，即消息的唯一标识。
   * @returns Details of the deleted message. | 已删除的消息详情。
   */ async delete(conversation_id, message_id, options) {
        const apiUrl = `/v1/conversation/message/delete?conversation_id=${conversation_id}&message_id=${message_id}`;
        const response = await this._client.post(apiUrl, void 0, false, options);
        return response.data;
    }
}
class Conversations extends APIResource {
    /**
   * Create a conversation. Conversation is an interaction between an agent and a user, including one or more messages. | 调用接口创建一个会话。
   * @docs en: https://www.coze.com/docs/developer_guides/create_conversation?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/create_conversation?_lang=zh
   * @param params - Required The parameters for creating a conversation | 创建会话所需的参数
   * @param params.messages - Optional Messages in the conversation. | 会话中的消息内容。
   * @param params.meta_data - Optional Additional information when creating a message. | 创建消息时的附加消息。
   * @param params.bot_id - Optional Bind and isolate conversation on different bots. | 绑定和隔离不同Bot的会话。
   * @returns Information about the created conversation. | 会话的基础信息。
   */ async create(params, options) {
        const apiUrl = '/v1/conversation/create';
        const response = await this._client.post(apiUrl, params, false, options);
        return response.data;
    }
    /**
   * Get the information of specific conversation. | 通过会话 ID 查看会话信息。
   * @docs en: https://www.coze.com/docs/developer_guides/retrieve_conversation?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/retrieve_conversation?_lang=zh
   * @param conversation_id - Required The ID of the conversation. | Conversation ID，即会话的唯一标识。
   * @returns Information about the conversation. | 会话的基础信息。
   */ async retrieve(conversation_id, options) {
        const apiUrl = `/v1/conversation/retrieve?conversation_id=${conversation_id}`;
        const response = await this._client.get(apiUrl, null, false, options);
        return response.data;
    }
    /**
   * List all conversations. | 列出 Bot 下所有会话。
   * @param params
   * @param params.bot_id - Required Bot ID. | Bot ID。
   * @param params.page_num - Optional The page number. | 页码，默认值为 1。
   * @param params.page_size - Optional The number of conversations per page. | 每页的会话数量，默认值为 50。
   * @returns Information about the conversations. | 会话的信息。
   */ async list(params, options) {
        const apiUrl = '/v1/conversations';
        const response = await this._client.get(apiUrl, params, false, options);
        return response.data;
    }
    /**
   * Clear a conversation. | 清空会话。
   * @param conversation_id - Required The ID of the conversation. | Conversation ID，即会话的唯一标识。
   * @returns Information about the conversation session. | 会话的会话 ID。
   */ async clear(conversation_id, options) {
        const apiUrl = `/v1/conversations/${conversation_id}/clear`;
        const response = await this._client.post(apiUrl, null, false, options);
        return response.data;
    }
    constructor(...args){
        super(...args), this.messages = new messages_Messages(this._client);
    }
}
class Files extends APIResource {
    /**
   * Upload files to Coze platform. | 调用接口上传文件到扣子。
   * @docs en: https://www.coze.com/docs/developer_guides/upload_files?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/upload_files?_lang=zh
   * @param params - Required The parameters for file upload | 上传文件所需的参数
   * @param params.file - Required The file to be uploaded. | 需要上传的文件。
   * @returns Information about the new file. | 已上传的文件信息。
   */ async upload(params, options) {
        const apiUrl = '/v1/files/upload';
        const response = await this._client.post(apiUrl, (0, toFormData)(params), false, options);
        return response.data;
    }
    /**
   * Get the information of the specific file uploaded to Coze platform. | 查看已上传的文件详情。
   * @docs en: https://www.coze.com/docs/developer_guides/retrieve_files?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/retrieve_files?_lang=zh
   * @param file_id - Required The ID of the uploaded file. | 已上传的文件 ID。
   * @returns Information about the uploaded file. | 已上传的文件信息。
   */ async retrieve(file_id, options) {
        const apiUrl = `/v1/files/retrieve?file_id=${file_id}`;
        const response = await this._client.get(apiUrl, null, false, options);
        return response.data;
    }
}
class Runs extends APIResource {
    /**
   * Initiates a workflow run. | 启动工作流运行。
   * @docs en: https://www.coze.com/docs/developer_guides/workflow_run?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/workflow_run?_lang=zh
   * @param params.workflow_id - Required The ID of the workflow to run. | 必选 要运行的工作流 ID。
   * @param params.bot_id - Optional The ID of the bot associated with the workflow. | 可选 与工作流关联的机器人 ID。
   * @param params.parameters - Optional Parameters for the workflow execution. | 可选 工作流执行的参数。
   * @param params.ext - Optional Additional information for the workflow execution. | 可选 工作流执行的附加信息。
   * @param params.execute_mode - Optional The mode in which to execute the workflow. | 可选 工作流执行的模式。
   * @param params.connector_id - Optional The ID of the connector to use for the workflow. | 可选 用于工作流的连接器 ID。
   * @param params.app_id - Optional The ID of the app.  | 可选 要进行会话聊天的 App ID
   * @returns RunWorkflowData | 工作流运行数据
   */ async create(params, options) {
        const apiUrl = '/v1/workflow/run';
        const response = await this._client.post(apiUrl, params, false, options);
        return response;
    }
    /**
   * Streams the workflow run events. | 流式传输工作流运行事件。
   * @docs en: https://www.coze.com/docs/developer_guides/workflow_stream_run?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/workflow_stream_run?_lang=zh
   * @param params.workflow_id - Required The ID of the workflow to run. | 必选 要运行的工作流 ID。
   * @param params.bot_id - Optional The ID of the bot associated with the workflow. | 可选 与工作流关联的机器人 ID。
   * @param params.parameters - Optional Parameters for the workflow execution. | 可选 工作流执行的参数。
   * @param params.ext - Optional Additional information for the workflow execution. | 可选 工作流执行的附加信息。
   * @param params.execute_mode - Optional The mode in which to execute the workflow. | 可选 工作流执行的模式。
   * @param params.connector_id - Optional The ID of the connector to use for the workflow. | 可选 用于工作流的连接器 ID。
   * @param params.app_id - Optional The ID of the app.  | 可选 要进行会话聊天的 App ID
   * @returns Stream<WorkflowEvent, { id: string; event: string; data: string }> | 工作流事件流
   */ async *stream(params, options) {
        const apiUrl = '/v1/workflow/stream_run';
        const result = await this._client.post(apiUrl, params, true, options);
        for await (const message of result)try {
            if ("Done" === message.event) yield new WorkflowEvent(Number(message.id), "Done");
            else yield new WorkflowEvent(Number(message.id), message.event, JSON.parse(message.data));
        } catch (error) {
            throw new CozeError(`Could not parse message into JSON:${message.data}`);
        }
    }
    /**
   * Resumes a paused workflow run. | 恢复暂停的工作流运行。
   * @docs en: https://www.coze.com/docs/developer_guides/workflow_resume?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/workflow_resume?_lang=zh
   * @param params.workflow_id - Required The ID of the workflow to resume. | 必选 要恢复的工作流 ID。
   * @param params.event_id - Required The ID of the event to resume from. | 必选 要从中恢复的事件 ID。
   * @param params.resume_data - Required Data needed to resume the workflow. | 必选 恢复工作流所需的数据。
   * @param params.interrupt_type - Required The type of interruption to resume from. | 必选 要恢复的中断类型。
   * @returns { id: string; event: WorkflowEventType; data: WorkflowEventMessage | WorkflowEventInterrupt | WorkflowEventError | null } | 恢复的工作流事件数据
   */ async resume(params, options) {
        const apiUrl = '/v1/workflow/stream_resume';
        const response = await this._client.post(apiUrl, params, false, options);
        return response;
    }
}
class WorkflowEvent {
    constructor(id, event, data){
        this.id = id;
        this.event = event;
        this.data = data;
    }
}
class Workflows extends APIResource {
    constructor(...args){
        super(...args), this.runs = new Runs(this._client);
    }
}
class WorkSpaces extends APIResource {
    /**
   * View the list of workspaces that the current Coze user has joined. | 查看当前扣子用户加入的空间列表。
   * @docs en: https://www.coze.com/docs/developer_guides/list_workspace?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/list_workspace?_lang=zh
   * @param params.page_num - Optional The page number for paginated queries. Default is 1.
   * | 可选 分页查询时的页码。默认为 1，即从第一页数据开始返回。
   * @param params.page_size - Optional The size of pagination. Default is 10. Maximum is 50. | 可选 分页大小。默认为 10，最大为 50。
   * @returns OpenSpaceData | 工作空间列表
   */ async list(params, options) {
        const apiUrl = '/v1/workspaces';
        const response = await this._client.get(apiUrl, params, false, options);
        return safeJsonParse(response, response).data;
    }
}
// Required header for knowledge APIs
const documents_headers = {
    'agw-js-conv': 'str'
};
class Documents extends APIResource {
    /**
   * View the file list of a specified knowledge base, which includes lists of documents, spreadsheets, or images.
   * | 调用接口查看指定知识库的内容列表，即文件、表格或图像列表。
   * @docs en: https://www.coze.com/docs/developer_guides/list_knowledge_files?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/list_knowledge_files?_lang=zh
   * @param params.dataset_id - Required The ID of the knowledge base. | 必选 待查看文件的知识库 ID。
   * @param params.page - Optional The page number for paginated queries. Default is 1. | 可选 分页查询时的页码。默认为 1。
   * @param params.page_size - Optional The size of pagination. Default is 10. | 可选 分页大小。默认为 10。
   * @returns ListDocumentData | 知识库文件列表
   */ list(params, options) {
        const apiUrl = '/open_api/knowledge/document/list';
        const response = this._client.get(apiUrl, params, false, mergeConfig(options, {
            headers: documents_headers
        }));
        return response;
    }
    /**
   * Upload files to the specific knowledge. | 调用此接口向指定知识库中上传文件。
   * @docs en: https://www.coze.com/docs/developer_guides/create_knowledge_files?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/create_knowledge_files?_lang=zh
   * @param params.dataset_id - Required The ID of the knowledge. | 必选 知识库 ID。
   * @param params.document_bases - Required The metadata information of the files awaiting upload. | 必选 待上传文件的元数据信息。
   * @param params.chunk_strategy - Required when uploading files to a new knowledge for the first time. Chunk strategy.
   * | 向新知识库首次上传文件时必选 分段规则。
   * @returns DocumentInfo[] | 已上传文件的基本信息
   */ async create(params, options) {
        const apiUrl = '/open_api/knowledge/document/create';
        const response = await this._client.post(apiUrl, params, false, mergeConfig(options, {
            headers: documents_headers
        }));
        return response.document_infos;
    }
    /**
   * Delete text, images, sheets, and other files in the knowledge base, supporting batch deletion.
   * | 删除知识库中的文本、图像、表格等文件，支持批量删除。
   * @docs en: https://www.coze.com/docs/developer_guides/delete_knowledge_files?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/delete_knowledge_files?_lang=zh
   * @param params.document_ids - Required The list of knowledge base files to be deleted. | 必选 待删除的文件 ID。
   * @returns void | 无返回
   */ async delete(params, options) {
        const apiUrl = '/open_api/knowledge/document/delete';
        await this._client.post(apiUrl, params, false, mergeConfig(options, {
            headers: documents_headers
        }));
    }
    /**
   * Modify the knowledge base file name and update strategy. | 调用接口修改知识库文件名称和更新策略。
   * @docs en: https://www.coze.com/docs/developer_guides/modify_knowledge_files?_lang=en
   * @docs zh: https://www.coze.cn/docs/developer_guides/modify_knowledge_files?_lang=zh
   * @param params.document_id - Required The ID of the knowledge base file. | 必选 待修改的知识库文件 ID。
   * @param params.document_name - Optional The new name of the knowledge base file. | 可选 知识库文件的新名称。
   * @param params.update_rule - Optional The update strategy for online web pages. | 可选 在线网页更新策略。
   * @returns void | 无返回
   */ async update(params, options) {
        const apiUrl = '/open_api/knowledge/document/update';
        await this._client.post(apiUrl, params, false, mergeConfig(options, {
            headers: documents_headers
        }));
    }
}
class Knowledge extends APIResource {
    constructor(...args){
        super(...args), this.documents = new Documents(this._client);
    }
}
class Voices extends APIResource {
    /**
   * @description Clone a voice | 音色克隆
   * @param params
   * @param params.voice_name - Required. Voice name, cannot be empty and must be longer than 6 characters
   * | 复刻的音色名称，不能为空，长度大于 6
   * @param params.file - Required. Audio file | 音频文件
   * @param params.audio_format - Required. Only supports "wav", "mp3", "ogg", "m4a", "aac", "pcm" formats
   * | 只支持 "wav", "mp3", "ogg", "m4a", "aac", "pcm" 格式
   * @param params.language - Optional. Only supports "zh", "en" "ja" "es" "id" "pt" languages
   * | 只支持 "zh", "en" "ja" "es" "id" "pt" 语种
   * @param params.voice_id - Optional. If provided, will train on existing voice and override previous training
   * | 传入的话就会在原有的音色上去训练，覆盖前面训练好的音色
   * @param params.preview_text - Optional. If provided, will generate preview audio based on this text, otherwise uses default text
   * | 如果传入会基于该文本生成预览音频，否则使用默认的文本
   * @param params.text - Optional. Users can read this text, service will compare audio with text. Returns error if difference is too large
   * | 可以让用户按照该文本念诵，服务会对比音频与该文本的差异。若差异过大会返回错误
   * @param options - Request options
   * @returns Clone voice data
   */ async clone(params, options) {
        const apiUrl = '/v1/audio/voices/clone';
        const response = await this._client.post(apiUrl, (0, toFormData)(params), false, options);
        return response.data;
    }
    /**
   * @description List voices | 获取音色列表
   * @param params
   * @param params.filter_system_voice - Optional. Whether to filter system voices, default is false
   * | 是否过滤系统音色, 默认不过滤
   * @param params.page_num - Optional. Starts from 1 by default, value must be > 0
   * | 不传默认从 1 开始，传值需要 > 0
   * @param params.page_size - Optional. Default is 100, value must be (0, 100]
   * | 不传默认 100，传值需要 (0, 100]
   * @param options - Request options
   * @returns List voices data
   */ async list(params, options) {
        const apiUrl = '/v1/audio/voices';
        const response = await this._client.get(apiUrl, params, false, options);
        return response.data;
    }
}
class Speech extends APIResource {
    /**
   * @description Speech synthesis | 语音合成
   * @param params
   * @param params.input - Required. Text to generate audio | 要为其生成音频的文本
   * @param params.voice_id - Required. Voice ID | 生成音频的音色 ID
   * @param params.response_format - Optional. Audio encoding format,
   * supports "wav", "pcm", "ogg", "opus", "mp3", default is "mp3"
   * | 音频编码格式，支持 "wav", "pcm", "ogg", "opus", "mp3"，默认是 "mp3"
   * @param options - Request options
   * @returns Speech synthesis data
   */ async create(params, options) {
        const apiUrl = '/v1/audio/speech';
        const response = await this._client.post(apiUrl, params, false, mergeConfig(options, {
            responseType: 'arraybuffer'
        }));
        return response;
    }
}
class Rooms extends APIResource {
    async create(params, options) {
        const apiUrl = '/v1/audio/rooms';
        const response = await this._client.post(apiUrl, params, false, options);
        return response.data;
    }
}
class Audio extends APIResource {
    constructor(...args){
        super(...args), this.rooms = new Rooms(this._client), this.voices = new Voices(this._client), this.speech = new Speech(this._client);
    }
}
var package_namespaceObject = JSON.parse('{"name":"@coze/api","version":"1.0.14","description":"Official Coze Node.js SDK for seamless AI integration into your applications | 扣子官方 Node.js SDK，助您轻松集成 AI 能力到应用中","keywords":["coze","ai","nodejs","sdk","chatbot","typescript"],"homepage":"https://github.com/coze-dev/coze-js/tree/main/packages/coze-js","bugs":{"url":"https://github.com/coze-dev/coze-js/issues"},"repository":{"type":"git","url":"https://github.com/coze-dev/coze-js.git","directory":"packages/coze-js"},"license":"MIT","author":"Leeight <leeight@gmail.com>","type":"module","exports":{".":{"require":"./dist/cjs/index.cjs","import":"./dist/esm/index.js","types":"./dist/types/index.d.ts"}},"main":"dist/cjs/index.cjs","module":"dist/esm/index.js","browser":{"crypto":false,"os":false,"jsonwebtoken":false},"types":"dist/types/index.d.ts","files":["dist","LICENSE","README.md","!**/*.tsbuildinfo"],"scripts":{"build":"rm -rf dist && rslib build","format":"prettier --write .","lint":"eslint ./ --cache --quiet","prepublishOnly":"npm run build","start":"rm -rf dist && rslib build -w","test":"vitest","test:cov":"vitest --coverage --run"},"dependencies":{"jsonwebtoken":"^9.0.2"},"devDependencies":{"@coze-infra/eslint-config":"workspace:*","@coze-infra/ts-config":"workspace:*","@coze-infra/vitest-config":"workspace:*","@rslib/core":"0.0.18","@swc/core":"^1.3.14","@types/jsonwebtoken":"^9.0.0","@types/node":"^20","@types/uuid":"^9.0.1","@types/whatwg-fetch":"^0.0.33","@vitest/coverage-v8":"~2.1.4","axios":"^1.7.7","typescript":"^5.5.3","vitest":"~2.1.4"},"peerDependencies":{"axios":"^1.7.1"}}'); // CONCATENATED MODULE: ./src/version.ts
const { version } = package_namespaceObject;
const getEnv = ()=>{
    const nodeVersion = process.version.slice(1); // Remove 'v' prefix
    const { platform } = process;
    let osName = platform.toLowerCase();
    let osVersion = __viteBrowserExternal.release();
    if ('darwin' === platform) {
        osName = 'macos';
        // Try to parse the macOS version
        try {
            const darwinVersion = __viteBrowserExternal.release().split('.');
            if (darwinVersion.length >= 2) {
                const majorVersion = parseInt(darwinVersion[0], 10);
                if (!isNaN(majorVersion) && majorVersion >= 9) {
                    const macVersion = majorVersion - 9;
                    osVersion = `10.${macVersion}.${darwinVersion[1]}`;
                }
            }
        } catch (error) {
        // Keep the default os.release() value if parsing fails
        }
    } else if ('win32' === platform) {
        osName = 'windows';
        osVersion = __viteBrowserExternal.release();
    } else if ('linux' === platform) {
        osName = 'linux';
        osVersion = __viteBrowserExternal.release();
    }
    return {
        osName,
        osVersion,
        nodeVersion
    };
};
const getUserAgent = ()=>{
    const { nodeVersion, osName, osVersion } = getEnv();
    return `coze-js/${version} node/${nodeVersion} ${osName}/${osVersion}`.toLowerCase();
};
const getNodeClientUserAgent = ()=>{
    const { osVersion, nodeVersion, osName } = getEnv();
    const ua = {
        version,
        lang: 'node',
        lang_version: nodeVersion,
        os_name: osName,
        os_version: osVersion
    };
    return JSON.stringify(ua);
};
/* eslint-disable @typescript-eslint/no-explicit-any */ const handleError = (error)=>{
    if (!error.isAxiosError && (!error.code || !error.message)) return new CozeError(`Unexpected error: ${error.message}`);
    if ('ECONNABORTED' === error.code && error.message.includes('timeout') || 'ETIMEDOUT' === error.code) {
        var _error_response;
        return new TimeoutError(408, void 0, `Request timed out: ${error.message}`, null === (_error_response = error.response) || void 0 === _error_response ? void 0 : _error_response.headers);
    }
    if ('ERR_CANCELED' === error.code) return new APIUserAbortError(error.message);
    else {
        var _error_response1, _error_response2, _error_response3;
        return APIError.generate((null === (_error_response1 = error.response) || void 0 === _error_response1 ? void 0 : _error_response1.status) || 500, null === (_error_response2 = error.response) || void 0 === _error_response2 ? void 0 : _error_response2.data, error.message, null === (_error_response3 = error.response) || void 0 === _error_response3 ? void 0 : _error_response3.headers);
    }
};
async function fetchAPI(url) {
    let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const axiosInstance = options.axiosInstance || axios;
    // Add version check for streaming requests
    if (options.isStreaming && isAxiosStatic(axiosInstance)) {
        const axiosVersion = axiosInstance.VERSION || axios.VERSION;
        if (!axiosVersion || compareVersions(axiosVersion, '1.7.1') < 0) throw new CozeError('Streaming requests require axios version 1.7.1 or higher. Please upgrade your axios version.');
    }
    const response = await axiosInstance({
        url,
        responseType: options.isStreaming ? 'stream' : 'json',
        adapter: options.isStreaming ? 'fetch' : void 0,
        ...options
    }).catch((error)=>{
        throw handleError(error);
    });
    return {
        async *stream () {
            try {
                const stream = response.data;
                const reader = stream[Symbol.asyncIterator] ? stream[Symbol.asyncIterator]() : stream.getReader();
                const decoder = new TextDecoder();
                const fieldValues = {};
                let buffer = '';
                while(true){
                    const { done, value } = await (reader.next ? reader.next() : reader.read());
                    if (done) {
                        if (buffer) {
                            // If the stream ends without a newline, it means an error occurred
                            fieldValues.event = 'error';
                            fieldValues.data = buffer;
                            yield fieldValues;
                        }
                        break;
                    }
                    buffer += decoder.decode(value, {
                        stream: true
                    });
                    const lines = buffer.split('\n');
                    for(let i = 0; i < lines.length - 1; i++){
                        const line = lines[i];
                        const index = line.indexOf(':');
                        if (-1 !== index) {
                            const field = line.substring(0, index).trim();
                            const content = line.substring(index + 1).trim();
                            fieldValues[field] = content;
                            if ('data' === field) yield fieldValues;
                        }
                    }
                    buffer = lines[lines.length - 1]; // Keep the last incomplete line in the buffer
                }
            } catch (error) {
                handleError(error);
            }
        },
        json: ()=>response.data,
        response
    };
}
// Add version comparison utility
function compareVersions(v1, v2) {
    const v1Parts = v1.split('.').map(Number);
    const v2Parts = v2.split('.').map(Number);
    for(let i = 0; i < 3; i++){
        const part1 = v1Parts[i] || 0;
        const part2 = v2Parts[i] || 0;
        if (part1 > part2) return 1;
        if (part1 < part2) return -1;
    }
    return 0;
}
function isAxiosStatic(instance) {
    return !!(null == instance ? void 0 : instance.Axios);
}
/**
 * default coze  base URL is api.coze.com
 */ const COZE_COM_BASE_URL = 'https://api.coze.com';
/**
 * change to api.coze.cn if you use https://coze.cn
 */ const COZE_CN_BASE_URL = 'https://api.coze.cn';
/* eslint-disable max-params */ class APIClient {
    buildOptions(method, body, options) {
        const headers = {
            authorization: `Bearer ${this.token}`
        };
        if (!isBrowser()) {
            headers['User-Agent'] = getUserAgent();
            headers['X-Coze-Client-User-Agent'] = getNodeClientUserAgent();
        }
        const config = mergeConfig(this.axiosOptions, options, {
            headers
        });
        config.method = method;
        config.data = body;
        return config;
    }
    async makeRequest(apiUrl, method, body, isStream, options) {
        const fullUrl = `${this.baseURL}${apiUrl}`;
        const fetchOptions = this.buildOptions(method, body, options);
        fetchOptions.isStreaming = isStream;
        fetchOptions.axiosInstance = this.axiosInstance;
        this.debugLog(`--- request url: ${fullUrl}`);
        this.debugLog('--- request options:', fetchOptions);
        const { response, stream, json } = await fetchAPI(fullUrl, fetchOptions);
        this.debugLog(`--- response status: ${response.status}`);
        this.debugLog('--- response headers: ', response.headers);
        var _response_headers;
        // Taro use `header`
        const contentType = (null !== (_response_headers = response.headers) && void 0 !== _response_headers ? _response_headers : response.header)['content-type'];
        if (isStream) {
            if (contentType && contentType.includes('application/json')) {
                const result = await json();
                const { code, msg } = result;
                if (0 !== code && void 0 !== code) throw APIError.generate(response.status, result, msg, response.headers);
            }
            return stream();
        }
        if (!(contentType && contentType.includes('application/json'))) return await response.data;
        {
            const result = await json();
            const { code, msg } = result;
            if (0 !== code && void 0 !== code) throw APIError.generate(response.status, result, msg, response.headers);
            return result;
        }
    }
    async post(apiUrl, body) {
        let isStream = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], options = arguments.length > 3 ? arguments[3] : void 0;
        return this.makeRequest(apiUrl, 'POST', body, isStream, options);
    }
    async get(apiUrl, param, isStream, options) {
        // 拼接参数
        const queryString = Object.entries(param || {}).map((param)=>{
            let [key, value] = param;
            return `${key}=${value}`;
        }).join('&');
        return this.makeRequest(queryString ? `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}${queryString}` : apiUrl, 'GET', void 0, isStream, options);
    }
    async put(apiUrl, body, isStream, options) {
        return this.makeRequest(apiUrl, 'PUT', body, isStream, options);
    }
    async delete(apiUrl, isStream, options) {
        return this.makeRequest(apiUrl, 'DELETE', void 0, isStream, options);
    }
    getConfig() {
        return this._config;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debugLog() {
        for(var _len = arguments.length, msgs = new Array(_len), _key = 0; _key < _len; _key++)msgs[_key] = arguments[_key];
        if (this.debug) console.debug(...msgs);
    }
    constructor(config){
        this._config = config;
        this.baseURL = config.baseURL || COZE_COM_BASE_URL;
        this.token = config.token;
        this.axiosOptions = config.axiosOptions || {};
        this.axiosInstance = config.axiosInstance;
        this.debug = config.debug || false;
        this.allowPersonalAccessTokenInBrowser = config.allowPersonalAccessTokenInBrowser || false;
        this.headers = config.headers;
        if (isBrowser() && isPersonalAccessToken(this.token) && !this.allowPersonalAccessTokenInBrowser) throw new CozeError('Browser environments do not support authentication using Personal Access Token (PAT) by default.\nas it may expose secret API keys. \n\nPlease use OAuth2.0 authentication mechanism. see:\nhttps://www.coze.com/docs/developer_guides/oauth_apps?_lang=en \n\nIf you need to force use, please set the `allowPersonalAccessTokenInBrowser` option to `true`. \n\ne.g new CozeAPI({ token, allowPersonalAccessTokenInBrowser: true });\n\n');
    }
}
APIClient.APIError = APIError;
APIClient.BadRequestError = BadRequestError;
APIClient.AuthenticationError = AuthenticationError;
APIClient.PermissionDeniedError = PermissionDeniedError;
APIClient.NotFoundError = NotFoundError;
APIClient.RateLimitError = RateLimitError;
APIClient.InternalServerError = InternalServerError;
APIClient.GatewayError = GatewayError;
APIClient.TimeoutError = TimeoutError;
APIClient.UserAbortError = APIUserAbortError;
class CozeAPI extends APIClient {
    constructor(...args){
        super(...args), this.bots = new Bots(this), this.chat = new Chat(this), this.conversations = new Conversations(this), this.files = new Files(this), this.knowledge = new Knowledge(this), this.workflows = new Workflows(this), this.workspaces = new WorkSpaces(this), this.audio = new Audio(this);
    }
}

console.log(chat_ChatEventType, chat_ChatStatus, chat_RoleType);
function getCozeClient(token = "") {
  const client = new CozeAPI({
    baseURL: COZE_CN_BASE_URL,
    token,
    allowPersonalAccessTokenInBrowser: true
    // Allow the browers to use PAT
  });
  return {
    client,
    sendMessage: () => {
    },
    uploadFile: () => {
    },
    uploadImage: () => {
    }
  };
}

const {useState,useEffect} = await importShared('react');
function CozeNodeSdk({ propData, event }) {
  const [cozeClient, setCozeClient] = useState(null);
  useEffect(() => {
    if (!propData?.auth_token) {
      return;
    }
    setCozeClient(getCozeClient(propData?.auth_token));
  }, [propData?.auth_token]);
  event?.onChatBotShow.call();
  console.log(cozeClient);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "111" });
}

const Components = {
  CozeWebSdk,
  // Coze,
  CozeNodeSdk
};

export { Components as default, jsxRuntimeExports as j };
