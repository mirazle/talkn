var WORKER_DOM_DEBUG = /log|development/i.test(location.hash);
var WorkerThread = (function (exports) {
    'use strict';

    /**
     * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let count = 0;
    let transfer = [];
    const mapping = new Map();
    /**
     * Stores a string in mapping and returns the index of the location.
     * @param value string to store
     * @return location in map
     */

    function store(value) {
      if (mapping.has(value)) {
        // Safe to cast since we verified the mapping contains the value
        return mapping.get(value);
      }

      mapping.set(value, count);
      transfer.push(value);
      return count++;
    }
    /**
     * Returns strings registered but not yet transferred.
     * Side effect: Resets the transfer array to default value, to prevent passing the same values multiple times.
     */

    function consume() {
      const strings = transfer;
      transfer = [];
      return strings;
    }

    /**
     * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let phase = 0
    /* Initializing */
    ;
    const set = newPhase => phase = newPhase;

    /**
     * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let transfer$1 = [];
    /**
     * Returns nodes registered but not yet transferred.
     * Side effect: Resets the transfer array to default value, to prevent passing the same values multiple times.
     */

    function consume$1() {
      const copy = transfer$1;
      transfer$1 = [];
      return copy;
    }

    /**
     * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let pending = false;
    let pendingMutations = []; // TODO(choumx): Change `mutation` to Array<Uint16> to prevent casting errors e.g. integer underflow, precision loss.

    function transfer$2(document, mutation) {
      if (phase > 0
      /* Initializing */
      && document[58
      /* allowTransfer */
      ]) {
        pending = true;
        pendingMutations = pendingMutations.concat(mutation);
        Promise.resolve().then(_ => {
          if (pending) {
            const nodes = new Uint16Array(consume$1().reduce((acc, node) => acc.concat(node[8
            /* creationFormat */
            ]), [])).buffer;
            const mutations = new Uint16Array(pendingMutations).buffer;
            document.postMessage({
              [54
              /* phase */
              ]: phase,
              [12
              /* type */
              ]: phase === 2
              /* Mutating */
              ? 3
              /* MUTATE */
              : 2
              /* HYDRATE */
              ,
              [37
              /* nodes */
              ]: nodes,
              [41
              /* strings */
              ]: consume(),
              [36
              /* mutations */
              ]: mutations
            }, [nodes, mutations]);
            pendingMutations = [];
            pending = false;
            set(2
            /* Mutating */
            );
          }
        });
      }
    }

    /**
     * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class AMP {
      constructor(document) {
        this.document = document;
      }
      /**
       * Returns a promise that resolves with the value of `key`.
       * @param key
       */


      getState(key) {
        return new Promise(resolve => {
          const messageHandler = event => {
            const message = event.data;

            if (message[12
            /* type */
            ] !== 11
            /* GET_STORAGE */
            ) {
                return;
              } // TODO: There is a race condition here if there are multiple concurrent
            // getState(k) messages in flight, where k is the same value.


            const storageMessage = message;

            if (storageMessage[74
            /* storageKey */
            ] !== key) {
              return;
            }

            this.document.removeGlobalEventListener('message', messageHandler);
            const value = storageMessage[21
            /* value */
            ];
            resolve(value);
          };

          this.document.addGlobalEventListener('message', messageHandler);
          transfer$2(this.document, [12
          /* STORAGE */
          , 1
          /* GET */
          , 2
          /* AmpState */
          ,
          /* key */
          store(key),
          /* value */
          0]);
          setTimeout(resolve, 500, null); // TODO: Why a magical constant, define and explain.
        });
      }
      /**
       * Deep-merges `state` into the existing state.
       * @param state
       */


      setState(state) {
        // Stringify `state` so it can be post-messaged as a transferrable.
        let stringified;

        try {
          stringified = JSON.stringify(state);
        } catch (e) {
          throw new Error(`AMP.setState only accepts valid JSON as input.`);
        }

        transfer$2(this.document, [12
        /* STORAGE */
        , 2
        /* SET */
        , 2
        /* AmpState */
        ,
        /* key */
        0,
        /* value */
        store(stringified)]);
      }

    }

    /**
     * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const exportedFunctions = {};
    function callFunctionMessageHandler(event, document) {
      const msg = event.data;

      if (msg[12
      /* type */
      ] !== 12
      /* FUNCTION */
      ) {
          return;
        }

      const functionMessage = msg;
      const fnIdentifier = functionMessage[77
      /* functionIdentifier */
      ];
      const fnArguments = JSON.parse(functionMessage[78
      /* functionArguments */
      ]);
      const index = functionMessage[7
      /* index */
      ];
      const fn = exportedFunctions[fnIdentifier];

      if (!fn) {
        transfer$2(document, [13
        /* FUNCTION_CALL */
        , 2
        /* REJECT */
        , index, store(JSON.stringify(`[worker-dom]: Exported function "${fnIdentifier}" could not be found.`))]);
        return;
      }

      Promise.resolve(fn) // Forcing promise flows allows us to skip a try/catch block.
      .then(f => f.apply(null, fnArguments)).then(value => {
        transfer$2(document, [13
        /* FUNCTION_CALL */
        , 1
        /* RESOLVE */
        , index, store(JSON.stringify(value))]);
      }, err => {
        const errorMessage = JSON.stringify(err.message || err);
        transfer$2(document, [13
        /* FUNCTION_CALL */
        , 2
        /* REJECT */
        , index, store(JSON.stringify(`[worker-dom]: Function "${fnIdentifier}" threw: "${errorMessage}"`))]);
      });
    }
    function exportFunction(name, fn) {
      if (!name || name === '') {
        throw new Error(`[worker-dom]: Attempt to export function was missing an identifier.`);
      }

      if (typeof fn !== 'function') {
        throw new Error(`[worker-dom]: Attempt to export non-function failed: ("${name}", ${typeof fn}).`);
      }

      if (name in exportedFunctions) {
        throw new Error(`[worker-dom]: Attempt to re-export function failed: "${name}".`);
      }

      exportedFunctions[name] = fn;
    }

    /**
     * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var _a, _b;
    /**
     * A lightweight Document stub for the no-dom amp binary.
     */

    class DocumentStub {
      constructor() {
        this[_a] = true;
        this[_b] = -1;
        this.defaultView = {
          document: this
        };
      }

      [(_a = 58
      /* allowTransfer */
      , _b = 7
      /* index */
      , 59
      /* observe */
      )]() {
        set(2
        /* Mutating */
        );
      }

    }

    /**
     * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const ALLOWLISTED_GLOBALS = {
      Array: true,
      ArrayBuffer: true,
      BigInt: true,
      BigInt64Array: true,
      BigUint64Array: true,
      Boolean: true,
      Cache: true,
      CustomEvent: true,
      DataView: true,
      Date: true,
      Error: true,
      EvalError: true,
      Event: true,
      EventTarget: true,
      Float32Array: true,
      Float64Array: true,
      Function: true,
      Infinity: true,
      Int16Array: true,
      Int32Array: true,
      Int8Array: true,
      Intl: true,
      JSON: true,
      Map: true,
      Math: true,
      NaN: true,
      Number: true,
      Object: true,
      Promise: true,
      Proxy: true,
      RangeError: true,
      ReferenceError: true,
      Reflect: true,
      RegExp: true,
      Set: true,
      String: true,
      Symbol: true,
      SyntaxError: true,
      TextDecoder: true,
      TextEncoder: true,
      TypeError: true,
      URIError: true,
      URL: true,
      Uint16Array: true,
      Uint32Array: true,
      Uint8Array: true,
      Uint8ClampedArray: true,
      WeakMap: true,
      WeakSet: true,
      WebAssembly: true,
      WebSocket: true,
      XMLHttpRequest: true,
      atob: true,
      addEventListener: true,
      removeEventListener: true,
      btoa: true,
      caches: true,
      clearInterval: true,
      clearTimeout: true,
      console: true,
      decodeURI: true,
      decodeURIComponent: true,
      document: true,
      encodeURI: true,
      encodeURIComponent: true,
      escape: true,
      fetch: true,
      indexedDB: true,
      isFinite: true,
      isNaN: true,
      location: true,
      navigator: true,
      onerror: true,
      onrejectionhandled: true,
      onunhandledrejection: true,
      parseFloat: true,
      parseInt: true,
      performance: true,
      requestAnimationFrame: true,
      cancelAnimationFrame: true,
      self: true,
      setTimeout: true,
      setInterval: true,
      unescape: true
    }; // Modify global scope by removing disallowed properties.

    function deleteGlobals(global) {
      /**
       * @param object
       * @param property
       * @return True if property was deleted from object. Otherwise, false.
       */
      const deleteUnsafe = (object, property) => {
        if (!ALLOWLISTED_GLOBALS.hasOwnProperty(property)) {
          try {
            delete object[property];
            return true;
          } catch (e) {}
        }

        return false;
      }; // Walk up global's prototype chain and dereference non-allowlisted properties
      // until EventTarget is reached.


      let current = global;

      while (current && current.constructor !== EventTarget) {
        const deleted = [];
        const failedToDelete = [];
        Object.getOwnPropertyNames(current).forEach(prop => {
          if (deleteUnsafe(current, prop)) {
            deleted.push(prop);
          } else {
            failedToDelete.push(prop);
          }
        });
        console.info(`Removed ${deleted.length} references from`, current, ':', deleted);

        if (failedToDelete.length) {
          console.info(`Failed to remove ${failedToDelete.length} references from`, current, ':', failedToDelete);
        }

        current = Object.getPrototypeOf(current);
      }
    }

    /**
     * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    const noop = () => void 0;

    const workerDOM = function (postMessage, addEventListener, removeEventListener) {
      const document = new DocumentStub(); // TODO(choumx): Avoid polluting Document's public API.

      document.postMessage = postMessage;
      document.addGlobalEventListener = addEventListener;
      document.removeGlobalEventListener = removeEventListener;
      return {
        document
      };
    }(postMessage.bind(self) || noop, addEventListener.bind(self) || noop, removeEventListener.bind(self) || noop); // Modify global scope by removing disallowed properties.

    deleteGlobals(self); // Offer APIs like AMP.setState() on the global scope.

    self.AMP = new AMP(workerDOM.document); // Allows for function invocation

    self.exportFunction = exportFunction;
    addEventListener('message', evt => callFunctionMessageHandler(evt, workerDOM.document));
    const hydrate = noop;

    exports.hydrate = hydrate;
    exports.workerDOM = workerDOM;

    return exports;

}({}));
//# sourceMappingURL=worker.nodom.mjs.map
