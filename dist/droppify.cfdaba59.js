// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/droppify.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  /*
  *   Summary: Convert an Empty Div into a Drag and Drop file upload element
  *   Author: jagadeesh.jkp@gmail.com
  *   Usage: Call DNDfy.init with options (they are optional)
      *   Selector (class/id of the element tat should be DNDfied)
      *   promptText (Text to show as Main prompt)
      *   activeClass (css class to apply when )
      *   acceptedFiles (accept only those files, else throw a tantrum... No, throw an error)
  * 
  */
  // Just in case if the library is added twice :P
  window.DNDfy = window.DNDfy || {};

  DNDfy.init = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    //helpers
    // To assign multiple Attributes to dynamically created element
    // Also, I realised there is no out-of-the-box element.setAttributes().. 
    var setAttributes = function setAttributes(elem, props) {
      Object.entries(props).forEach(function (prop) {
        return elem.setAttribute.apply(elem, _toConsumableArray(prop));
      });
    }; // Props - setting default values if not passed during init


    var _options$selector = options.selector,
        selector = _options$selector === void 0 ? '.dnd' : _options$selector,
        _options$promptText = options.promptText,
        promptText = _options$promptText === void 0 ? 'Click or Drop your Files here' : _options$promptText,
        _options$activeClass = options.activeClass,
        activeClass = _options$activeClass === void 0 ? 'dragActive' : _options$activeClass,
        _options$acceptedFile = options.acceptedFiles,
        acceptedFiles = _options$acceptedFile === void 0 ? ['mp3', 'mp4', 'jpg'] : _options$acceptedFile; // variables - to be used within

    var fileMap = new Map(),
        form,
        input,
        details,
        submitBtn,
        summary,
        dndBox = document.querySelector(selector),
        unsupportedErrText = 'The following file(s) were not added because they are not in supported format';
    var acceptedFilesText = acceptedFiles.length ? " (Accepted files are : ".concat(acceptedFiles.toString(), ")") : '';
    /*
    *   Create the input element, the label element and placeholder to show file count, file names
    */

    var createElements = function createElements() {
      form = document.createElement('form');
      form.setAttribute('id', 'dragDrop');
      input = document.createElement('input');
      setAttributes(input, {
        id: 'fileUploadInp',
        type: 'file',
        multiple: true,
        hidden: true
      });
      var label = document.createElement('label');
      label.innerText = promptText;
      setAttributes(label, {
        for: 'fileUploadInp',
        class: 'uploadLabel'
      });
      summary = document.createElement('div');
      setAttributes(summary, {
        class: 'summary'
      });
      details = document.createElement('div');
      setAttributes(details, {
        class: 'details'
      });
      submitBtn = document.createElement('button');
      submitBtn.innerHTML = 'Submit';
      setAttributes(submitBtn, {
        type: 'submit',
        class: 'submit-uploadForm'
      }); // add the bad boys to DOM

      form.appendChild(input);
      form.appendChild(label);
      form.appendChild(summary);
      form.appendChild(details);
      form.appendChild(submitBtn);
      dndBox.appendChild(form);
    };
    /*
    *   Binding the Dragevents, Remove-entry-event
    */


    var bindEvents = function bindEvents() {
      dndBox.addEventListener('dragenter', dragEnter);
      dndBox.addEventListener('dragleave', dragLeave);
      dndBox.addEventListener('dragover', dragOver);
      dndBox.addEventListener('drop', dropped);
      details.addEventListener('click', removeEntry);
      form.addEventListener('submit', submitForm);
      input.addEventListener('onchange', dropped);

      function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
      }

      function dragEnter(e) {
        preventDefaults(e);
        dndBox.classList.add("".concat(activeClass));
      }

      function dragLeave(e) {
        preventDefaults(e);
        dndBox.classList.remove("".concat(activeClass));
      }

      function dragOver(e) {
        preventDefaults(e);
        dndBox.classList.add("".concat(activeClass));
      }

      function dropped(e) {
        preventDefaults(e);
        dndBox.classList.remove("".concat(activeClass));
        var files = e.dataTransfer.files;
        var exceptions = [];

        _toConsumableArray(files).forEach(function (file) {
          // On drop, check if the files are already in Map
          // If yes then there are No duplicates, If no add them
          // EE6 Map rocks !!
          if (acceptedFiles.includes(file.name.split('.')[1])) {
            fileMap.set(file.name, file);
          } else {
            exceptions.push(file.name);
          }
        });

        if (exceptions.length) {
          alert("".concat(unsupportedErrText, " : ").concat(exceptions.toString()));
        }

        refreshSummary();
        refreshDetails();
      }

      function removeEntry(e) {
        try {
          var key = e.target.dataset.key;
          if (!key) return;
          fileMap.delete(key);
          refreshSummary();
          refreshDetails();
        } catch (e) {
          console.log('Dang! Sorry Bruh');
        }
      }

      function submitForm(e) {
        e.preventDefault();
        console.log(fileMap);
        alert('Well.. Only the front end is done.');
      }
    };

    var refreshSummary = function refreshSummary() {
      // todo : optimise : dont refresh just add/delete the node using key
      var summaryText;

      if (fileMap.size) {
        var plural = fileMap.size === 1 ? '' : 's';
        summaryText = "".concat(fileMap.size, " file").concat(plural, " added");
        submitBtn.style.visibility = 'visible';
      } else {
        summaryText = 'No files added';
        submitBtn.style.visibility = 'hidden';
      }

      summary.innerText = summaryText + acceptedFilesText;
    };

    var refreshDetails = function refreshDetails() {
      details.innerHTML = null;

      _toConsumableArray(fileMap.values()).forEach(function (file) {
        var entry = document.createElement('div');
        entry.innerHTML = file.name;
        setAttributes(entry, {
          'class': 'file-entry',
          'data-key': file.name
        });
        details.appendChild(entry);
      });
    }; // Its Go time


    createElements();
    bindEvents();
    refreshSummary();
    refreshDetails(); //styles
    // todo: optimise as per block. Dont inject css if classes are given

    var cssInJS = document.createElement('style');
    cssInJS.innerText = "\n        ".concat(selector, ",\n        ").concat(selector, " * {\n            box-sizing: content-box;\n            font-family: system;\n        }\n        ").concat(selector, " {\n            margin: 20px;\n            background: #f2f2f2;\n            min-height: 100px;\n            border: 1px solid #f2f2f2;\n            padding: 10px;\n\n        }\n        .").concat(activeClass, " {\n            border: 1px dotted #999;\n        }\n        @font-face {\n            font-family: system;\n            font-style: normal;\n            font-weight: 300;\n            src: local(\".SFNSText-Light\"), local(\".HelveticaNeueDeskInterface-Light\"), local(\".LucidaGrandeUI\"), local(\"Ubuntu Light\"), local(\"Segoe UI Light\"), local(\"Roboto-Light\"), local(\"DroidSans\"), local(\"Tahoma\");\n        }\n        .uploadLabel {\n            width: 100%;\n            display: block;\n            padding: 20px 0;\n            text-align: center;\n            border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n            cursor: pointer;\n        }\n        .summary {\n            font-size: .8rem;\n            padding: 10px 0;\n        }\n        .file-entry {\n            padding: 10px;\n            margin-bottom: 5px;\n            background: #dedede;\n            cursor: pointer;\n            position: relative;\n            border-radius: 5px;\n        }\n        .file-entry:after {\n            content: 'x';\n            position: absolute;\n            right: 10px;\n        }\n    ");
    document.getElementsByTagName('head')[0].appendChild(cssInJS);
  };
})();
},{}],"../../../.nvm/versions/node/v9.11.2/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51081" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v9.11.2/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/droppify.js"], null)
//# sourceMappingURL=/droppify.cfdaba59.js.map