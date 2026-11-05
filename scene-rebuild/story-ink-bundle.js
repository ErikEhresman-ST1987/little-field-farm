"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/inkjs/dist/ink-full.js
  var require_ink_full = __commonJS({
    "node_modules/inkjs/dist/ink-full.js"(exports, module) {
      !(function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).inkjs = {});
      })(exports, (function(t) {
        "use strict";
        class e {
          constructor() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, r2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
            this.sourceFilename = t2, this.pluginNames = e2, this.countAllVisits = n2, this.errorHandler = i2, this.fileHandler = r2;
          }
        }
        class n {
          constructor(t2, e2, n2) {
            this.length = t2, this.debugMetadata = e2, this.text = n2;
          }
        }
        var i;
        !(function(t2) {
          t2[t2.Author = 0] = "Author", t2[t2.Warning = 1] = "Warning", t2[t2.Error = 2] = "Error";
        })(i || (i = {}));
        class r {
          constructor() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            this.identifier = t2, this.isByReference = e2, this.isDivertTarget = n2;
          }
          get typeName() {
            return "Argument";
          }
        }
        function s(t2, e2) {
          return t2 instanceof e2 ? u(t2) : null;
        }
        function a(t2, e2) {
          if (t2 instanceof e2) return u(t2);
          throw new Error(`${t2} is not of type ${e2}`);
        }
        function o(t2) {
          return t2.hasValidName && t2.name ? t2 : null;
        }
        function l(t2) {
          return void 0 === t2 ? null : t2;
        }
        function h(t2) {
          return "object" == typeof t2 && "function" == typeof t2.Equals;
        }
        function u(t2, e2) {
          return t2;
        }
        function c(t2) {
          return null != t2;
        }
        class d {
          constructor() {
            var t2 = this;
            this._alreadyHadError = false, this._alreadyHadWarning = false, this._debugMetadata = null, this._runtimeObject = null, this.content = [], this.parent = null, this.GetType = () => this.typeName, this.AddContent = (t3) => {
              null === this.content && (this.content = []);
              const e2 = Array.isArray(t3) ? t3 : [t3];
              for (const t4 of e2) t4.hasOwnProperty("parent") && (t4.parent = this), this.content.push(t4);
              return Array.isArray(t3) ? void 0 : t3;
            }, this.InsertContent = (t3, e2) => (null === this.content && (this.content = []), e2.parent = this, this.content.splice(t3, 0, e2), e2), this.Find = (e2) => function() {
              let n2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, i2 = s(t2, e2);
              if (null !== i2 && (null === n2 || true === n2(i2))) return i2;
              if (null === t2.content) return null;
              for (const i3 of t2.content) {
                let t3 = i3.Find && i3.Find(e2)(n2);
                if (t3) return t3;
              }
              return null;
            }, this.FindAll = (t3) => (e2, n2) => {
              const i2 = Array.isArray(n2) ? n2 : [], r2 = s(this, t3);
              if (null === r2 || e2 && true !== e2(r2) || i2.push(r2), null === this.content) return [];
              for (const n3 of this.content) n3.FindAll && n3.FindAll(t3)(e2, i2);
              return i2;
            }, this.Warning = function(e2) {
              let n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
              t2.Error(e2, n2, true);
            };
          }
          get debugMetadata() {
            return null === this._debugMetadata && this.parent ? this.parent.debugMetadata : this._debugMetadata;
          }
          set debugMetadata(t2) {
            this._debugMetadata = t2;
          }
          get hasOwnDebugMetadata() {
            return Boolean(this.debugMetadata);
          }
          get typeName() {
            return "ParsedObject";
          }
          get story() {
            let t2 = this;
            for (; t2.parent; ) t2 = t2.parent;
            return t2;
          }
          get runtimeObject() {
            return this._runtimeObject || (this._runtimeObject = this.GenerateRuntimeObject(), this._runtimeObject && (this._runtimeObject.debugMetadata = this.debugMetadata)), this._runtimeObject;
          }
          set runtimeObject(t2) {
            this._runtimeObject = t2;
          }
          get runtimePath() {
            if (!this.runtimeObject.path) throw new Error();
            return this.runtimeObject.path;
          }
          get containerForCounting() {
            return this.runtimeObject;
          }
          get ancestry() {
            let t2 = [], e2 = this.parent;
            for (; e2; ) t2.push(e2), e2 = e2.parent;
            return t2 = t2.reverse(), t2;
          }
          ResolveReferences(t2) {
            if (null !== this.content) for (const e2 of this.content) e2.ResolveReferences(t2);
          }
          Error(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (null === e2 && (e2 = this), !(e2._alreadyHadError && !n2 || e2._alreadyHadWarning && n2)) {
              if (!this.parent) throw new Error(`No parent object to send error to: ${t2}`);
              this.parent.Error(t2, e2, n2), n2 ? e2._alreadyHadWarning = true : e2._alreadyHadError = true;
            }
          }
        }
        class p extends d {
          constructor(t2) {
            super(), this.warningMessage = t2, this.GenerateRuntimeObject = () => (this.Warning(this.warningMessage), null);
          }
          get typeName() {
            return "AuthorWarning";
          }
        }
        let m = class t2 {
          constructor() {
            if (this._components = [], this._componentsString = null, this._isRelative = false, "string" == typeof arguments[0]) {
              let t3 = arguments[0];
              this.componentsString = t3;
            } else if (arguments[0] instanceof t2.Component && arguments[1] instanceof t2) {
              let t3 = arguments[0], e2 = arguments[1];
              this._components.push(t3), this._components = this._components.concat(e2._components);
            } else if (arguments[0] instanceof Array) {
              let t3 = arguments[0], e2 = !!arguments[1];
              this._components = this._components.concat(t3), this._isRelative = e2;
            }
          }
          get isRelative() {
            return this._isRelative;
          }
          get componentCount() {
            return this._components.length;
          }
          get head() {
            return this._components.length > 0 ? this._components[0] : null;
          }
          get tail() {
            if (this._components.length >= 2) {
              let e2 = this._components.slice(1, this._components.length);
              return new t2(e2);
            }
            return t2.self;
          }
          get length() {
            return this._components.length;
          }
          get lastComponent() {
            let t3 = this._components.length - 1;
            return t3 >= 0 ? this._components[t3] : null;
          }
          get containsNamedComponent() {
            for (let t3 = 0, e2 = this._components.length; t3 < e2; t3++) if (!this._components[t3].isIndex) return true;
            return false;
          }
          static get self() {
            let e2 = new t2();
            return e2._isRelative = true, e2;
          }
          GetComponent(t3) {
            return this._components[t3];
          }
          PathByAppendingPath(e2) {
            let n2 = new t2(), i2 = 0;
            for (let t3 = 0; t3 < e2._components.length && e2._components[t3].isParent; ++t3) i2++;
            for (let t3 = 0; t3 < this._components.length - i2; ++t3) n2._components.push(this._components[t3]);
            for (let t3 = i2; t3 < e2._components.length; ++t3) n2._components.push(e2._components[t3]);
            return n2;
          }
          get componentsString() {
            return null == this._componentsString && (this._componentsString = this._components.join("."), this.isRelative && (this._componentsString = "." + this._componentsString)), this._componentsString;
          }
          set componentsString(e2) {
            if (this._components.length = 0, this._componentsString = e2, null == this._componentsString || "" == this._componentsString) return;
            "." == this._componentsString[0] && (this._isRelative = true, this._componentsString = this._componentsString.substring(1));
            let n2 = this._componentsString.split(".");
            for (let e3 of n2) /^(\-|\+)?([0-9]+|Infinity)$/.test(e3) ? this._components.push(new t2.Component(parseInt(e3))) : this._components.push(new t2.Component(e3));
          }
          toString() {
            return this.componentsString;
          }
          Equals(t3) {
            if (null == t3) return false;
            if (t3._components.length != this._components.length) return false;
            if (t3.isRelative != this.isRelative) return false;
            for (let e2 = 0, n2 = t3._components.length; e2 < n2; e2++) if (!t3._components[e2].Equals(this._components[e2])) return false;
            return true;
          }
          PathByAppendingComponent(e2) {
            let n2 = new t2();
            return n2._components.push(...this._components), n2._components.push(e2), n2;
          }
        };
        var f, g, v;
        m.parentId = "^", (function(t2) {
          class e2 {
            constructor(t3) {
              this.index = -1, this.name = null, "string" == typeof t3 ? this.name = t3 : this.index = t3;
            }
            get isIndex() {
              return this.index >= 0;
            }
            get isParent() {
              return this.name == t2.parentId;
            }
            static ToParent() {
              return new e2(t2.parentId);
            }
            toString() {
              return this.isIndex ? this.index.toString() : this.name;
            }
            Equals(t3) {
              return null != t3 && t3.isIndex == this.isIndex && (this.isIndex ? this.index == t3.index : this.name == t3.name);
            }
          }
          t2.Component = e2;
        })(m || (m = {})), (function(t2) {
          function e2(t3, e3) {
            if (!t3) throw void 0 !== e3 && console.warn(e3), console.trace && console.trace(), new Error("");
          }
          t2.AssertType = function(t3, n2, i2) {
            e2(t3 instanceof n2, i2);
          }, t2.Assert = e2;
        })(f || (f = {}));
        class C extends Error {
        }
        function S(t2) {
          throw new C(`${t2} is null or undefined`);
        }
        class y {
          constructor() {
            this.parent = null, this._debugMetadata = null, this._path = null;
          }
          get debugMetadata() {
            return null === this._debugMetadata && this.parent ? this.parent.debugMetadata : this._debugMetadata;
          }
          set debugMetadata(t2) {
            this._debugMetadata = t2;
          }
          get ownDebugMetadata() {
            return this._debugMetadata;
          }
          DebugLineNumberOfPath(t2) {
            if (null === t2) return null;
            let e2 = this.rootContentContainer;
            if (e2) {
              let n2 = e2.ContentAtPath(t2).obj;
              if (n2) {
                let t3 = n2.debugMetadata;
                if (null !== t3) return t3.startLineNumber;
              }
            }
            return null;
          }
          get path() {
            if (null == this._path) if (null == this.parent) this._path = new m();
            else {
              let t2 = [], e2 = this, n2 = s(e2.parent, L);
              for (; null !== n2; ) {
                let i2 = o(e2);
                if (null != i2 && i2.hasValidName) {
                  if (null === i2.name) return S("namedChild.name");
                  t2.unshift(new m.Component(i2.name));
                } else t2.unshift(new m.Component(n2.content.indexOf(e2)));
                e2 = n2, n2 = s(n2.parent, L);
              }
              this._path = new m(t2);
            }
            return this._path;
          }
          ResolvePath(t2) {
            if (null === t2) return S("path");
            if (t2.isRelative) {
              let e2 = s(this, L);
              return null === e2 && (f.Assert(null !== this.parent, "Can't resolve relative path because we don't have a parent"), e2 = s(this.parent, L), f.Assert(null !== e2, "Expected parent to be a container"), f.Assert(t2.GetComponent(0).isParent), t2 = t2.tail), null === e2 ? S("nearestContainer") : e2.ContentAtPath(t2);
            }
            {
              let e2 = this.rootContentContainer;
              return null === e2 ? S("contentContainer") : e2.ContentAtPath(t2);
            }
          }
          ConvertPathToRelative(t2) {
            let e2 = this.path, n2 = Math.min(t2.length, e2.length), i2 = -1;
            for (let r3 = 0; r3 < n2; ++r3) {
              let n3 = e2.GetComponent(r3), s3 = t2.GetComponent(r3);
              if (!n3.Equals(s3)) break;
              i2 = r3;
            }
            if (-1 == i2) return t2;
            let r2 = e2.componentCount - 1 - i2, s2 = [];
            for (let t3 = 0; t3 < r2; ++t3) s2.push(m.Component.ToParent());
            for (let e3 = i2 + 1; e3 < t2.componentCount; ++e3) s2.push(t2.GetComponent(e3));
            return new m(s2, true);
          }
          CompactPathString(t2) {
            let e2 = null, n2 = null;
            if (t2.isRelative) n2 = t2.componentsString, e2 = this.path.PathByAppendingPath(t2).componentsString;
            else {
              n2 = this.ConvertPathToRelative(t2).componentsString, e2 = t2.componentsString;
            }
            return n2.length < e2.length ? n2 : e2;
          }
          get rootContentContainer() {
            let t2 = this;
            for (; t2.parent; ) t2 = t2.parent;
            return s(t2, L);
          }
          Copy() {
            throw Error("Not Implemented: Doesn't support copying");
          }
          SetChild(t2, e2, n2) {
            t2[e2] && (t2[e2] = null), t2[e2] = n2, t2[e2] && (t2[e2].parent = this);
          }
          Equals(t2) {
            return t2 === this;
          }
        }
        class b {
          constructor(t2) {
            t2 = void 0 !== t2 ? t2.toString() : "", this.string = t2;
          }
          get Length() {
            return this.string.length;
          }
          Append(t2) {
            null !== t2 && (this.string += t2);
          }
          AppendLine(t2) {
            void 0 !== t2 && this.Append(t2), this.string += "\n";
          }
          AppendFormat(t2) {
            for (var e2 = arguments.length, n2 = new Array(e2 > 1 ? e2 - 1 : 0), i2 = 1; i2 < e2; i2++) n2[i2 - 1] = arguments[i2];
            this.string += t2.replace(/{(\d+)}/g, ((t3, e3) => void 0 !== n2[e3] ? n2[e3] : t3));
          }
          toString() {
            return this.string;
          }
          Clear() {
            this.string = "";
          }
        }
        class w {
          constructor() {
            if (this.originName = null, this.itemName = null, void 0 !== arguments[1]) {
              let t2 = arguments[0], e2 = arguments[1];
              this.originName = t2, this.itemName = e2;
            } else if (arguments[0]) {
              let t2 = arguments[0].toString().split(".");
              this.originName = t2[0], this.itemName = t2[1];
            }
          }
          static get Null() {
            return new w(null, null);
          }
          get isNull() {
            return null == this.originName && null == this.itemName;
          }
          get fullName() {
            return (null !== this.originName ? this.originName : "?") + "." + this.itemName;
          }
          toString() {
            return this.fullName;
          }
          Equals(t2) {
            if (t2 instanceof w) {
              let e2 = t2;
              return e2.itemName == this.itemName && e2.originName == this.originName;
            }
            return false;
          }
          copy() {
            return new w(this.originName, this.itemName);
          }
          serialized() {
            return JSON.stringify({ originName: this.originName, itemName: this.itemName });
          }
          static fromSerializedKey(t2) {
            let e2 = JSON.parse(t2);
            if (!w.isLikeInkListItem(e2)) return w.Null;
            let n2 = e2;
            return new w(n2.originName, n2.itemName);
          }
          static isLikeInkListItem(t2) {
            return "object" == typeof t2 && (!(!t2.hasOwnProperty("originName") || !t2.hasOwnProperty("itemName")) && (("string" == typeof t2.originName || null === typeof t2.originName) && ("string" == typeof t2.itemName || null === typeof t2.itemName)));
          }
        }
        class E extends Map {
          constructor() {
            if (super(arguments[0] instanceof E ? arguments[0] : []), this.origins = null, this._originNames = [], arguments[0] instanceof E) {
              let t2 = arguments[0], e2 = t2.originNames;
              null !== e2 && (this._originNames = e2.slice()), null !== t2.origins && (this.origins = t2.origins.slice());
            } else if ("string" == typeof arguments[0]) {
              let t2 = arguments[0], e2 = arguments[1];
              if (this.SetInitialOriginName(t2), null === e2.listDefinitions) return S("originStory.listDefinitions");
              let n2 = e2.listDefinitions.TryListGetDefinition(t2, null);
              if (!n2.exists) throw new Error("InkList origin could not be found in story when constructing new list: " + t2);
              if (null === n2.result) return S("def.result");
              this.origins = [n2.result];
            } else if ("object" == typeof arguments[0] && arguments[0].hasOwnProperty("Key") && arguments[0].hasOwnProperty("Value")) {
              let t2 = arguments[0];
              this.Add(t2.Key, t2.Value);
            }
          }
          static FromString(t2, e2) {
            var n2;
            if (null == t2 || "" == t2) return new E();
            let i2 = null === (n2 = e2.listDefinitions) || void 0 === n2 ? void 0 : n2.FindSingleItemListWithName(t2);
            if (i2) return null === i2.value ? S("listValue.value") : new E(i2.value);
            throw new Error("Could not find the InkListItem from the string '" + t2 + "' to create an InkList because it doesn't exist in the original list definition in ink.");
          }
          AddItem(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if (t2 instanceof w) {
              let e3 = t2;
              if (null == e3.originName) return void this.AddItem(e3.itemName);
              if (null === this.origins) return S("this.origins");
              for (let t3 of this.origins) if (t3.name == e3.originName) {
                let n2 = t3.TryGetValueForItem(e3, 0);
                if (n2.exists) return void this.Add(e3, n2.result);
                throw new Error("Could not add the item " + e3 + " to this list because it doesn't exist in the original list definition in ink.");
              }
              throw new Error("Failed to add item to list because the item was from a new list definition that wasn't previously known to this list. Only items from previously known lists can be used, so that the int value can be found.");
            }
            if (null !== t2) {
              let n2 = t2, i2 = null;
              if (null === this.origins) return S("this.origins");
              for (let t3 of this.origins) {
                if (null === n2) return S("itemName");
                if (t3.ContainsItemWithName(n2)) {
                  if (null != i2) throw new Error("Could not add the item " + n2 + " to this list because it could come from either " + t3.name + " or " + i2.name);
                  i2 = t3;
                }
              }
              if (null == i2) {
                if (null == e2) throw new Error("Could not add the item " + n2 + " to this list because it isn't known to any list definitions previously associated with this list.");
                {
                  let t3 = E.FromString(n2, e2).orderedItems[0];
                  this.Add(t3.Key, t3.Value);
                }
              } else {
                let t3 = new w(i2.name, n2), e3 = i2.ValueForItem(t3);
                this.Add(t3, e3);
              }
            }
          }
          ContainsItemNamed(t2) {
            for (let [e2] of this) {
              if (w.fromSerializedKey(e2).itemName == t2) return true;
            }
            return false;
          }
          ContainsKey(t2) {
            return this.has(t2.serialized());
          }
          Add(t2, e2) {
            let n2 = t2.serialized();
            if (this.has(n2)) throw new Error(`The Map already contains an entry for ${t2}`);
            this.set(n2, e2);
          }
          Remove(t2) {
            return this.delete(t2.serialized());
          }
          get Count() {
            return this.size;
          }
          get originOfMaxItem() {
            if (null == this.origins) return null;
            let t2 = this.maxItem.Key.originName, e2 = null;
            return this.origins.every(((n2) => n2.name != t2 || (e2 = n2, false))), e2;
          }
          get originNames() {
            if (this.Count > 0) {
              null == this._originNames && this.Count > 0 ? this._originNames = [] : (this._originNames || (this._originNames = []), this._originNames.length = 0);
              for (let [t2] of this) {
                let e2 = w.fromSerializedKey(t2);
                if (null === e2.originName) return S("item.originName");
                this._originNames.push(e2.originName);
              }
            }
            return this._originNames;
          }
          SetInitialOriginName(t2) {
            this._originNames = [t2];
          }
          SetInitialOriginNames(t2) {
            this._originNames = null == t2 ? null : t2.slice();
          }
          get maxItem() {
            let t2 = { Key: w.Null, Value: 0 };
            for (let [e2, n2] of this) {
              let i2 = w.fromSerializedKey(e2);
              (t2.Key.isNull || n2 > t2.Value) && (t2 = { Key: i2, Value: n2 });
            }
            return t2;
          }
          get minItem() {
            let t2 = { Key: w.Null, Value: 0 };
            for (let [e2, n2] of this) {
              let i2 = w.fromSerializedKey(e2);
              (t2.Key.isNull || n2 < t2.Value) && (t2 = { Key: i2, Value: n2 });
            }
            return t2;
          }
          get inverse() {
            let t2 = new E();
            if (null != this.origins) for (let e2 of this.origins) for (let [n2, i2] of e2.items) {
              let e3 = w.fromSerializedKey(n2);
              this.ContainsKey(e3) || t2.Add(e3, i2);
            }
            return t2;
          }
          get all() {
            let t2 = new E();
            if (null != this.origins) for (let e2 of this.origins) for (let [n2, i2] of e2.items) {
              let e3 = w.fromSerializedKey(n2);
              t2.set(e3.serialized(), i2);
            }
            return t2;
          }
          Union(t2) {
            let e2 = new E(this);
            for (let [n2, i2] of t2) e2.set(n2, i2);
            return e2;
          }
          Intersect(t2) {
            let e2 = new E();
            for (let [n2, i2] of this) t2.has(n2) && e2.set(n2, i2);
            return e2;
          }
          HasIntersection(t2) {
            for (let [e2] of this) if (t2.has(e2)) return true;
            return false;
          }
          Without(t2) {
            let e2 = new E(this);
            for (let [n2] of t2) e2.delete(n2);
            return e2;
          }
          Contains(t2) {
            if ("string" == typeof t2) return this.ContainsItemNamed(t2);
            const e2 = t2;
            if (0 == e2.size || 0 == this.size) return false;
            for (let [t3] of e2) if (!this.has(t3)) return false;
            return true;
          }
          GreaterThan(t2) {
            return 0 != this.Count && (0 == t2.Count || this.minItem.Value > t2.maxItem.Value);
          }
          GreaterThanOrEquals(t2) {
            return 0 != this.Count && (0 == t2.Count || this.minItem.Value >= t2.minItem.Value && this.maxItem.Value >= t2.maxItem.Value);
          }
          LessThan(t2) {
            return 0 != t2.Count && (0 == this.Count || this.maxItem.Value < t2.minItem.Value);
          }
          LessThanOrEquals(t2) {
            return 0 != t2.Count && (0 == this.Count || this.maxItem.Value <= t2.maxItem.Value && this.minItem.Value <= t2.minItem.Value);
          }
          MaxAsList() {
            return this.Count > 0 ? new E(this.maxItem) : new E();
          }
          MinAsList() {
            return this.Count > 0 ? new E(this.minItem) : new E();
          }
          ListWithSubRange(t2, e2) {
            if (0 == this.Count) return new E();
            let n2 = this.orderedItems, i2 = 0, r2 = Number.MAX_SAFE_INTEGER;
            Number.isInteger(t2) ? i2 = t2 : t2 instanceof E && t2.Count > 0 && (i2 = t2.minItem.Value), Number.isInteger(e2) ? r2 = e2 : e2 instanceof E && e2.Count > 0 && (r2 = e2.maxItem.Value);
            let s2 = new E();
            s2.SetInitialOriginNames(this.originNames);
            for (let t3 of n2) t3.Value >= i2 && t3.Value <= r2 && s2.Add(t3.Key, t3.Value);
            return s2;
          }
          Equals(t2) {
            if (t2 instanceof E == false) return false;
            if (t2.Count != this.Count) return false;
            for (let [e2] of this) if (!t2.has(e2)) return false;
            return true;
          }
          get orderedItems() {
            let t2 = new Array();
            for (let [e2, n2] of this) {
              let i2 = w.fromSerializedKey(e2);
              t2.push({ Key: i2, Value: n2 });
            }
            return t2.sort(((t3, e2) => null === t3.Key.originName ? S("x.Key.originName") : null === e2.Key.originName ? S("y.Key.originName") : t3.Value == e2.Value ? t3.Key.originName.localeCompare(e2.Key.originName) : t3.Value < e2.Value ? -1 : t3.Value > e2.Value ? 1 : 0)), t2;
          }
          get singleItem() {
            for (let t2 of this.orderedItems) return t2.Key;
            return null;
          }
          toString() {
            let t2 = this.orderedItems, e2 = new b();
            for (let n2 = 0; n2 < t2.length; n2++) {
              n2 > 0 && e2.Append(", ");
              let i2 = t2[n2].Key;
              if (null === i2.itemName) return S("item.itemName");
              e2.Append(i2.itemName);
            }
            return e2.toString();
          }
          valueOf() {
            return NaN;
          }
        }
        class _ extends Error {
          constructor(t2) {
            super(t2), this.useEndLineNumber = false, this.message = t2, this.name = "StoryException";
          }
        }
        function T(t2, e2, n2) {
          if (null === t2) return { result: n2, exists: false };
          let i2 = t2.get(e2);
          return void 0 === i2 ? { result: n2, exists: false } : { result: i2, exists: true };
        }
        class x extends y {
          static Create(t2, e2) {
            if (e2) {
              if (e2 === g.Int && Number.isInteger(Number(t2))) return new N(Number(t2));
              if (e2 === g.Float && !isNaN(t2)) return new I(Number(t2));
            }
            return "boolean" == typeof t2 ? new P(Boolean(t2)) : "string" == typeof t2 ? new O(String(t2)) : Number.isInteger(Number(t2)) ? new N(Number(t2)) : isNaN(t2) ? t2 instanceof m ? new F(a(t2, m)) : t2 instanceof E ? new R(a(t2, E)) : null : new I(Number(t2));
          }
          Copy() {
            return a(x.Create(this.valueObject), y);
          }
          BadCastException(t2) {
            return new _("Can't cast " + this.valueObject + " from " + this.valueType + " to " + t2);
          }
        }
        class A extends x {
          constructor(t2) {
            super(), this.value = t2;
          }
          get valueObject() {
            return this.value;
          }
          toString() {
            return null === this.value ? S("Value.value") : this.value.toString();
          }
        }
        class P extends A {
          constructor(t2) {
            super(t2 || false);
          }
          get isTruthy() {
            return Boolean(this.value);
          }
          get valueType() {
            return g.Bool;
          }
          Cast(t2) {
            if (null === this.value) return S("Value.value");
            if (t2 == this.valueType) return this;
            if (t2 == g.Int) return new N(this.value ? 1 : 0);
            if (t2 == g.Float) return new I(this.value ? 1 : 0);
            if (t2 == g.String) return new O(this.value ? "true" : "false");
            throw this.BadCastException(t2);
          }
          toString() {
            return this.value ? "true" : "false";
          }
        }
        class N extends A {
          constructor(t2) {
            super(t2 || 0);
          }
          get isTruthy() {
            return 0 != this.value;
          }
          get valueType() {
            return g.Int;
          }
          Cast(t2) {
            if (null === this.value) return S("Value.value");
            if (t2 == this.valueType) return this;
            if (t2 == g.Bool) return new P(0 !== this.value);
            if (t2 == g.Float) return new I(this.value);
            if (t2 == g.String) return new O("" + this.value);
            throw this.BadCastException(t2);
          }
        }
        class I extends A {
          constructor(t2) {
            super(t2 || 0);
          }
          get isTruthy() {
            return 0 != this.value;
          }
          get valueType() {
            return g.Float;
          }
          Cast(t2) {
            if (null === this.value) return S("Value.value");
            if (t2 == this.valueType) return this;
            if (t2 == g.Bool) return new P(0 !== this.value);
            if (t2 == g.Int) return new N(this.value);
            if (t2 == g.String) return new O("" + this.value);
            throw this.BadCastException(t2);
          }
        }
        class O extends A {
          constructor(t2) {
            if (super(t2 || ""), this._isNewline = "\n" == this.value, this._isInlineWhitespace = true, null === this.value) return S("Value.value");
            this.value.length > 0 && this.value.split("").every(((t3) => " " == t3 || "	" == t3 || (this._isInlineWhitespace = false, false)));
          }
          get valueType() {
            return g.String;
          }
          get isTruthy() {
            return null === this.value ? S("Value.value") : this.value.length > 0;
          }
          get isNewline() {
            return this._isNewline;
          }
          get isInlineWhitespace() {
            return this._isInlineWhitespace;
          }
          get isNonWhitespace() {
            return !this.isNewline && !this.isInlineWhitespace;
          }
          Cast(t2) {
            if (t2 == this.valueType) return this;
            if (t2 == g.Int) {
              let e2 = (function(t3) {
                let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n2 = parseInt(t3);
                return Number.isNaN(n2) ? { result: e3, exists: false } : { result: n2, exists: true };
              })(this.value);
              if (e2.exists) return new N(e2.result);
              throw this.BadCastException(t2);
            }
            if (t2 == g.Float) {
              let e2 = (function(t3) {
                let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n2 = parseFloat(t3);
                return Number.isNaN(n2) ? { result: e3, exists: false } : { result: n2, exists: true };
              })(this.value);
              if (e2.exists) return new I(e2.result);
              throw this.BadCastException(t2);
            }
            throw this.BadCastException(t2);
          }
        }
        class F extends A {
          constructor() {
            super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null);
          }
          get valueType() {
            return g.DivertTarget;
          }
          get targetPath() {
            return null === this.value ? S("Value.value") : this.value;
          }
          set targetPath(t2) {
            this.value = t2;
          }
          get isTruthy() {
            throw new Error("Shouldn't be checking the truthiness of a divert target");
          }
          Cast(t2) {
            if (t2 == this.valueType) return this;
            throw this.BadCastException(t2);
          }
          toString() {
            return "DivertTargetValue(" + this.targetPath + ")";
          }
        }
        class W extends A {
          constructor(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
            super(t2), this._contextIndex = e2;
          }
          get contextIndex() {
            return this._contextIndex;
          }
          set contextIndex(t2) {
            this._contextIndex = t2;
          }
          get variableName() {
            return null === this.value ? S("Value.value") : this.value;
          }
          set variableName(t2) {
            this.value = t2;
          }
          get valueType() {
            return g.VariablePointer;
          }
          get isTruthy() {
            throw new Error("Shouldn't be checking the truthiness of a variable pointer");
          }
          Cast(t2) {
            if (t2 == this.valueType) return this;
            throw this.BadCastException(t2);
          }
          toString() {
            return "VariablePointerValue(" + this.variableName + ")";
          }
          Copy() {
            return new W(this.variableName, this.contextIndex);
          }
        }
        class R extends A {
          get isTruthy() {
            return null === this.value ? S("this.value") : this.value.Count > 0;
          }
          get valueType() {
            return g.List;
          }
          Cast(t2) {
            if (null === this.value) return S("Value.value");
            if (t2 == g.Int) {
              let t3 = this.value.maxItem;
              return t3.Key.isNull ? new N(0) : new N(t3.Value);
            }
            if (t2 == g.Float) {
              let t3 = this.value.maxItem;
              return t3.Key.isNull ? new I(0) : new I(t3.Value);
            }
            if (t2 == g.String) {
              let t3 = this.value.maxItem;
              return t3.Key.isNull ? new O("") : new O(t3.Key.toString());
            }
            if (t2 == this.valueType) return this;
            throw this.BadCastException(t2);
          }
          constructor(t2, e2) {
            super(null), t2 || e2 ? t2 instanceof E ? this.value = new E(t2) : t2 instanceof w && "number" == typeof e2 && (this.value = new E({ Key: t2, Value: e2 })) : this.value = new E();
          }
          static RetainListOriginsForAssignment(t2, e2) {
            let n2 = s(t2, R), i2 = s(e2, R);
            return i2 && null === i2.value ? S("newList.value") : n2 && null === n2.value ? S("oldList.value") : void (n2 && i2 && 0 == i2.value.Count && i2.value.SetInitialOriginNames(n2.value.originNames));
          }
        }
        !(function(t2) {
          t2[t2.Bool = -1] = "Bool", t2[t2.Int = 0] = "Int", t2[t2.Float = 1] = "Float", t2[t2.List = 2] = "List", t2[t2.String = 3] = "String", t2[t2.DivertTarget = 4] = "DivertTarget", t2[t2.VariablePointer = 5] = "VariablePointer";
        })(g || (g = {}));
        class k {
          constructor() {
            this.obj = null, this.approximate = false;
          }
          get correctObj() {
            return this.approximate ? null : this.obj;
          }
          get container() {
            return this.obj instanceof L ? this.obj : null;
          }
          copy() {
            let t2 = new k();
            return t2.obj = this.obj, t2.approximate = this.approximate, t2;
          }
        }
        class L extends y {
          constructor() {
            super(...arguments), this.name = null, this._content = [], this.namedContent = /* @__PURE__ */ new Map(), this.visitsShouldBeCounted = false, this.turnIndexShouldBeCounted = false, this.countingAtStartOnly = false, this._pathToFirstLeafContent = null;
          }
          get hasValidName() {
            return null != this.name && this.name.length > 0;
          }
          get content() {
            return this._content;
          }
          set content(t2) {
            this.AddContent(t2);
          }
          get namedOnlyContent() {
            let t2 = /* @__PURE__ */ new Map();
            for (let [e2, n2] of this.namedContent) {
              let i2 = a(n2, y);
              t2.set(e2, i2);
            }
            for (let e2 of this.content) {
              let n2 = o(e2);
              null != n2 && n2.hasValidName && t2.delete(n2.name);
            }
            return 0 == t2.size && (t2 = null), t2;
          }
          set namedOnlyContent(t2) {
            let e2 = this.namedOnlyContent;
            if (null != e2) for (let [t3] of e2) this.namedContent.delete(t3);
            if (null != t2) for (let [, e3] of t2) {
              let t3 = o(e3);
              null != t3 && this.AddToNamedContentOnly(t3);
            }
          }
          get countFlags() {
            let t2 = 0;
            return this.visitsShouldBeCounted && (t2 |= L.CountFlags.Visits), this.turnIndexShouldBeCounted && (t2 |= L.CountFlags.Turns), this.countingAtStartOnly && (t2 |= L.CountFlags.CountStartOnly), t2 == L.CountFlags.CountStartOnly && (t2 = 0), t2;
          }
          set countFlags(t2) {
            let e2 = t2;
            (e2 & L.CountFlags.Visits) > 0 && (this.visitsShouldBeCounted = true), (e2 & L.CountFlags.Turns) > 0 && (this.turnIndexShouldBeCounted = true), (e2 & L.CountFlags.CountStartOnly) > 0 && (this.countingAtStartOnly = true);
          }
          get pathToFirstLeafContent() {
            return null == this._pathToFirstLeafContent && (this._pathToFirstLeafContent = this.path.PathByAppendingPath(this.internalPathToFirstLeafContent)), this._pathToFirstLeafContent;
          }
          get internalPathToFirstLeafContent() {
            let t2 = [], e2 = this;
            for (; e2 instanceof L; ) e2.content.length > 0 && (t2.push(new m.Component(0)), e2 = e2.content[0]);
            return new m(t2);
          }
          AddContent(t2) {
            if (t2 instanceof Array) {
              let e2 = t2;
              for (let t3 of e2) this.AddContent(t3);
            } else {
              let e2 = t2;
              if (this._content.push(e2), e2.parent) throw new Error("content is already in " + e2.parent);
              e2.parent = this, this.TryAddNamedContent(e2);
            }
          }
          TryAddNamedContent(t2) {
            let e2 = o(t2);
            null != e2 && e2.hasValidName && this.AddToNamedContentOnly(e2);
          }
          AddToNamedContentOnly(t2) {
            if (f.AssertType(t2, y, "Can only add Runtime.Objects to a Runtime.Container"), a(t2, y).parent = this, null === t2.name) return S("namedContentObj.name");
            this.namedContent.set(t2.name, t2);
          }
          ContentAtPath(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : -1;
            -1 == n2 && (n2 = t2.length);
            let i2 = new k();
            i2.approximate = false;
            let r2 = this, a2 = this;
            for (let o2 = e2; o2 < n2; ++o2) {
              let e3 = t2.GetComponent(o2);
              if (null == r2) {
                i2.approximate = true;
                break;
              }
              let l2 = r2.ContentWithPathComponent(e3);
              if (null == l2) {
                i2.approximate = true;
                break;
              }
              const h2 = s(l2, L);
              if (o2 < n2 - 1 && null == h2) {
                i2.approximate = true;
                break;
              }
              a2 = l2, r2 = h2;
            }
            return i2.obj = a2, i2;
          }
          InsertContent(t2, e2) {
            if (this.content.splice(e2, 0, t2), t2.parent) throw new Error("content is already in " + t2.parent);
            t2.parent = this, this.TryAddNamedContent(t2);
          }
          AddContentsOfContainer(t2) {
            this.content.push(...t2.content);
            for (let e2 of t2.content) e2.parent = this, this.TryAddNamedContent(e2);
          }
          ContentWithPathComponent(t2) {
            if (t2.isIndex) return t2.index >= 0 && t2.index < this.content.length ? this.content[t2.index] : null;
            if (t2.isParent) return this.parent;
            {
              if (null === t2.name) return S("component.name");
              let e2 = T(this.namedContent, t2.name, null);
              return e2.exists ? a(e2.result, y) : null;
            }
          }
          BuildStringOfHierarchy() {
            let t2;
            if (0 == arguments.length) return t2 = new b(), this.BuildStringOfHierarchy(t2, 0, null), t2.toString();
            t2 = arguments[0];
            let e2 = arguments[1], n2 = arguments[2];
            function i2() {
              for (let n3 = 0; n3 < 4 * e2; ++n3) t2.Append(" ");
            }
            i2(), t2.Append("["), this.hasValidName && t2.AppendFormat(" ({0})", this.name), this == n2 && t2.Append("  <---"), t2.AppendLine(), e2++;
            for (let r3 = 0; r3 < this.content.length; ++r3) {
              let s2 = this.content[r3];
              if (s2 instanceof L) {
                s2.BuildStringOfHierarchy(t2, e2, n2);
              } else i2(), s2 instanceof O ? (t2.Append('"'), t2.Append(s2.toString().replace("\n", "\\n")), t2.Append('"')) : t2.Append(s2.toString());
              r3 != this.content.length - 1 && t2.Append(","), s2 instanceof L || s2 != n2 || t2.Append("  <---"), t2.AppendLine();
            }
            let r2 = /* @__PURE__ */ new Map();
            for (let [t3, e3] of this.namedContent) this.content.indexOf(a(e3, y)) >= 0 || r2.set(t3, e3);
            if (r2.size > 0) {
              i2(), t2.AppendLine("-- named: --");
              for (let [, i3] of r2) {
                f.AssertType(i3, L, "Can only print out named Containers"), i3.BuildStringOfHierarchy(t2, e2, n2), t2.AppendLine();
              }
            }
            e2--, i2(), t2.Append("]");
          }
        }
        !(function(t2) {
          var e2;
          (e2 = t2.CountFlags || (t2.CountFlags = {}))[e2.Start = 0] = "Start", e2[e2.Visits = 1] = "Visits", e2[e2.Turns = 2] = "Turns", e2[e2.CountStartOnly = 4] = "CountStartOnly";
        })(L || (L = {}));
        class D extends y {
          get commandType() {
            return this._commandType;
          }
          constructor() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : D.CommandType.NotSet;
            super(), this._commandType = t2;
          }
          Copy() {
            return new D(this.commandType);
          }
          static EvalStart() {
            return new D(D.CommandType.EvalStart);
          }
          static EvalOutput() {
            return new D(D.CommandType.EvalOutput);
          }
          static EvalEnd() {
            return new D(D.CommandType.EvalEnd);
          }
          static Duplicate() {
            return new D(D.CommandType.Duplicate);
          }
          static PopEvaluatedValue() {
            return new D(D.CommandType.PopEvaluatedValue);
          }
          static PopFunction() {
            return new D(D.CommandType.PopFunction);
          }
          static PopTunnel() {
            return new D(D.CommandType.PopTunnel);
          }
          static BeginString() {
            return new D(D.CommandType.BeginString);
          }
          static EndString() {
            return new D(D.CommandType.EndString);
          }
          static NoOp() {
            return new D(D.CommandType.NoOp);
          }
          static ChoiceCount() {
            return new D(D.CommandType.ChoiceCount);
          }
          static Turns() {
            return new D(D.CommandType.Turns);
          }
          static TurnsSince() {
            return new D(D.CommandType.TurnsSince);
          }
          static ReadCount() {
            return new D(D.CommandType.ReadCount);
          }
          static Random() {
            return new D(D.CommandType.Random);
          }
          static SeedRandom() {
            return new D(D.CommandType.SeedRandom);
          }
          static VisitIndex() {
            return new D(D.CommandType.VisitIndex);
          }
          static SequenceShuffleIndex() {
            return new D(D.CommandType.SequenceShuffleIndex);
          }
          static StartThread() {
            return new D(D.CommandType.StartThread);
          }
          static Done() {
            return new D(D.CommandType.Done);
          }
          static End() {
            return new D(D.CommandType.End);
          }
          static ListFromInt() {
            return new D(D.CommandType.ListFromInt);
          }
          static ListRange() {
            return new D(D.CommandType.ListRange);
          }
          static ListRandom() {
            return new D(D.CommandType.ListRandom);
          }
          static BeginTag() {
            return new D(D.CommandType.BeginTag);
          }
          static EndTag() {
            return new D(D.CommandType.EndTag);
          }
          toString() {
            return "ControlCommand " + this.commandType.toString();
          }
        }
        !(function(t2) {
          var e2;
          (e2 = t2.CommandType || (t2.CommandType = {}))[e2.NotSet = -1] = "NotSet", e2[e2.EvalStart = 0] = "EvalStart", e2[e2.EvalOutput = 1] = "EvalOutput", e2[e2.EvalEnd = 2] = "EvalEnd", e2[e2.Duplicate = 3] = "Duplicate", e2[e2.PopEvaluatedValue = 4] = "PopEvaluatedValue", e2[e2.PopFunction = 5] = "PopFunction", e2[e2.PopTunnel = 6] = "PopTunnel", e2[e2.BeginString = 7] = "BeginString", e2[e2.EndString = 8] = "EndString", e2[e2.NoOp = 9] = "NoOp", e2[e2.ChoiceCount = 10] = "ChoiceCount", e2[e2.Turns = 11] = "Turns", e2[e2.TurnsSince = 12] = "TurnsSince", e2[e2.ReadCount = 13] = "ReadCount", e2[e2.Random = 14] = "Random", e2[e2.SeedRandom = 15] = "SeedRandom", e2[e2.VisitIndex = 16] = "VisitIndex", e2[e2.SequenceShuffleIndex = 17] = "SequenceShuffleIndex", e2[e2.StartThread = 18] = "StartThread", e2[e2.Done = 19] = "Done", e2[e2.End = 20] = "End", e2[e2.ListFromInt = 21] = "ListFromInt", e2[e2.ListRange = 22] = "ListRange", e2[e2.ListRandom = 23] = "ListRandom", e2[e2.BeginTag = 24] = "BeginTag", e2[e2.EndTag = 25] = "EndTag", e2[e2.TOTAL_VALUES = 26] = "TOTAL_VALUES";
        })(D || (D = {}));
        class V extends d {
          constructor() {
            super(...arguments), this._prototypeRuntimeConstantExpression = null, this.outputWhenComplete = false, this.GenerateRuntimeObject = () => {
              const t2 = new L();
              return t2.AddContent(D.EvalStart()), this.GenerateIntoContainer(t2), this.outputWhenComplete && t2.AddContent(D.EvalOutput()), t2.AddContent(D.EvalEnd()), t2;
            }, this.GenerateConstantIntoContainer = (t2) => {
              null === this._prototypeRuntimeConstantExpression && (this._prototypeRuntimeConstantExpression = new L(), this.GenerateIntoContainer(this._prototypeRuntimeConstantExpression));
              for (const e2 of this._prototypeRuntimeConstantExpression.content) {
                const n2 = e2.Copy();
                n2 && t2.AddContent(n2);
              }
            }, this.toString = () => "No string value in JavaScript.";
          }
          get typeName() {
            return "Expression";
          }
          Equals(t2) {
            return false;
          }
        }
        class j extends y {
          toString() {
            return "Void";
          }
        }
        class B extends y {
          static CallWithName(t2) {
            return new B(t2);
          }
          static CallExistsWithName(t2) {
            return this.GenerateNativeFunctionsIfNecessary(), this._nativeFunctions.get(t2);
          }
          get name() {
            return null === this._name ? S("NativeFunctionCall._name") : this._name;
          }
          set name(t2) {
            this._name = t2, this._isPrototype || (null === B._nativeFunctions ? S("NativeFunctionCall._nativeFunctions") : this._prototype = B._nativeFunctions.get(this._name) || null);
          }
          get numberOfParameters() {
            return this._prototype ? this._prototype.numberOfParameters : this._numberOfParameters;
          }
          set numberOfParameters(t2) {
            this._numberOfParameters = t2;
          }
          Call(t2) {
            if (this._prototype) return this._prototype.Call(t2);
            if (this.numberOfParameters != t2.length) throw new Error("Unexpected number of parameters");
            let e2 = false;
            for (let n3 of t2) {
              if (n3 instanceof j) throw new _("Attempting to perform " + this.name + ' on a void value. Did you forget to "return" a value from a function you called here?');
              n3 instanceof R && (e2 = true);
            }
            if (2 == t2.length && e2) return this.CallBinaryListOperation(t2);
            let n2 = this.CoerceValuesToSingleType(t2), i2 = n2[0].valueType;
            return i2 == g.Int || i2 == g.Float || i2 == g.String || i2 == g.DivertTarget || i2 == g.List ? this.CallType(n2) : null;
          }
          CallType(t2) {
            let e2 = a(t2[0], A), n2 = e2.valueType, i2 = e2, r2 = t2.length;
            if (2 == r2 || 1 == r2) {
              if (null === this._operationFuncs) return S("NativeFunctionCall._operationFuncs");
              let s2 = this._operationFuncs.get(n2);
              if (!s2) {
                const t3 = g[n2];
                throw new _("Cannot perform operation " + this.name + " on " + t3);
              }
              if (2 == r2) {
                let e3 = a(t2[1], A), n3 = s2;
                if (null === i2.value || null === e3.value) return S("NativeFunctionCall.Call BinaryOp values");
                let r3 = n3(i2.value, e3.value);
                return A.Create(r3);
              }
              {
                let t3 = s2;
                if (null === i2.value) return S("NativeFunctionCall.Call UnaryOp value");
                let n3 = t3(i2.value);
                return this.name === B.Int ? A.Create(n3, g.Int) : this.name === B.Float ? A.Create(n3, g.Float) : A.Create(n3, e2.valueType);
              }
            }
            throw new Error("Unexpected number of parameters to NativeFunctionCall: " + t2.length);
          }
          CallBinaryListOperation(t2) {
            if (("+" == this.name || "-" == this.name) && t2[0] instanceof R && t2[1] instanceof N) return this.CallListIncrementOperation(t2);
            let e2 = a(t2[0], A), n2 = a(t2[1], A);
            if (!("&&" != this.name && "||" != this.name || e2.valueType == g.List && n2.valueType == g.List)) {
              if (null === this._operationFuncs) return S("NativeFunctionCall._operationFuncs");
              let t3 = this._operationFuncs.get(g.Int);
              if (null === t3) return S("NativeFunctionCall.CallBinaryListOperation op");
              let i2 = (function(t4) {
                if ("boolean" == typeof t4) return t4;
                throw new Error(`${t4} is not a boolean`);
              })(t3(e2.isTruthy ? 1 : 0, n2.isTruthy ? 1 : 0));
              return new P(i2);
            }
            if (e2.valueType == g.List && n2.valueType == g.List) return this.CallType([e2, n2]);
            throw new _("Can not call use " + this.name + " operation on " + g[e2.valueType] + " and " + g[n2.valueType]);
          }
          CallListIncrementOperation(t2) {
            let e2 = a(t2[0], R), n2 = a(t2[1], N), i2 = new E();
            if (null === e2.value) return S("NativeFunctionCall.CallListIncrementOperation listVal.value");
            for (let [t3, r2] of e2.value) {
              let s2 = w.fromSerializedKey(t3);
              if (null === this._operationFuncs) return S("NativeFunctionCall._operationFuncs");
              let a2 = this._operationFuncs.get(g.Int);
              if (null === n2.value) return S("NativeFunctionCall.CallListIncrementOperation intVal.value");
              let o2 = a2(r2, n2.value), l2 = null;
              if (null === e2.value.origins) return S("NativeFunctionCall.CallListIncrementOperation listVal.value.origins");
              for (let t4 of e2.value.origins) if (t4.name == s2.originName) {
                l2 = t4;
                break;
              }
              if (null != l2) {
                let t4 = l2.TryGetItemWithValue(o2, w.Null);
                t4.exists && i2.Add(t4.result, o2);
              }
            }
            return new R(i2);
          }
          CoerceValuesToSingleType(t2) {
            let e2 = g.Int, n2 = null;
            for (let i3 of t2) {
              let t3 = a(i3, A);
              t3.valueType > e2 && (e2 = t3.valueType), t3.valueType == g.List && (n2 = s(t3, R));
            }
            let i2 = [];
            if (g[e2] == g[g.List]) for (let e3 of t2) {
              let t3 = a(e3, A);
              if (t3.valueType == g.List) i2.push(t3);
              else {
                if (t3.valueType != g.Int) {
                  const e4 = g[t3.valueType];
                  throw new _("Cannot mix Lists and " + e4 + " values in this operation");
                }
                {
                  let e4 = parseInt(t3.valueObject);
                  if (n2 = a(n2, R), null === n2.value) return S("NativeFunctionCall.CoerceValuesToSingleType specialCaseList.value");
                  let r2 = n2.value.originOfMaxItem;
                  if (null === r2) return S("NativeFunctionCall.CoerceValuesToSingleType list");
                  let s2 = r2.TryGetItemWithValue(e4, w.Null);
                  if (!s2.exists) throw new _("Could not find List item with the value " + e4 + " in " + r2.name);
                  {
                    let t4 = new R(s2.result, e4);
                    i2.push(t4);
                  }
                }
              }
            }
            else for (let n3 of t2) {
              let t3 = a(n3, A).Cast(e2);
              i2.push(t3);
            }
            return i2;
          }
          constructor() {
            if (super(), this._name = null, this._numberOfParameters = 0, this._prototype = null, this._isPrototype = false, this._operationFuncs = null, 0 === arguments.length) B.GenerateNativeFunctionsIfNecessary();
            else if (1 === arguments.length) {
              let t2 = arguments[0];
              B.GenerateNativeFunctionsIfNecessary(), this.name = t2;
            } else if (2 === arguments.length) {
              let t2 = arguments[0], e2 = arguments[1];
              this._isPrototype = true, this.name = t2, this.numberOfParameters = e2;
            }
          }
          static Identity(t2) {
            return t2;
          }
          static GenerateNativeFunctionsIfNecessary() {
            if (null == this._nativeFunctions) {
              this._nativeFunctions = /* @__PURE__ */ new Map(), this.AddIntBinaryOp(this.Add, ((t3, e3) => t3 + e3)), this.AddIntBinaryOp(this.Subtract, ((t3, e3) => t3 - e3)), this.AddIntBinaryOp(this.Multiply, ((t3, e3) => t3 * e3)), this.AddIntBinaryOp(this.Divide, ((t3, e3) => Math.floor(t3 / e3))), this.AddIntBinaryOp(this.Mod, ((t3, e3) => t3 % e3)), this.AddIntUnaryOp(this.Negate, ((t3) => -t3)), this.AddIntBinaryOp(this.Equal, ((t3, e3) => t3 == e3)), this.AddIntBinaryOp(this.Greater, ((t3, e3) => t3 > e3)), this.AddIntBinaryOp(this.Less, ((t3, e3) => t3 < e3)), this.AddIntBinaryOp(this.GreaterThanOrEquals, ((t3, e3) => t3 >= e3)), this.AddIntBinaryOp(this.LessThanOrEquals, ((t3, e3) => t3 <= e3)), this.AddIntBinaryOp(this.NotEquals, ((t3, e3) => t3 != e3)), this.AddIntUnaryOp(this.Not, ((t3) => 0 == t3)), this.AddIntBinaryOp(this.And, ((t3, e3) => 0 != t3 && 0 != e3)), this.AddIntBinaryOp(this.Or, ((t3, e3) => 0 != t3 || 0 != e3)), this.AddIntBinaryOp(this.Max, ((t3, e3) => Math.max(t3, e3))), this.AddIntBinaryOp(this.Min, ((t3, e3) => Math.min(t3, e3))), this.AddIntBinaryOp(this.Pow, ((t3, e3) => Math.pow(t3, e3))), this.AddIntUnaryOp(this.Floor, B.Identity), this.AddIntUnaryOp(this.Ceiling, B.Identity), this.AddIntUnaryOp(this.Int, B.Identity), this.AddIntUnaryOp(this.Float, ((t3) => t3)), this.AddFloatBinaryOp(this.Add, ((t3, e3) => t3 + e3)), this.AddFloatBinaryOp(this.Subtract, ((t3, e3) => t3 - e3)), this.AddFloatBinaryOp(this.Multiply, ((t3, e3) => t3 * e3)), this.AddFloatBinaryOp(this.Divide, ((t3, e3) => t3 / e3)), this.AddFloatBinaryOp(this.Mod, ((t3, e3) => t3 % e3)), this.AddFloatUnaryOp(this.Negate, ((t3) => -t3)), this.AddFloatBinaryOp(this.Equal, ((t3, e3) => t3 == e3)), this.AddFloatBinaryOp(this.Greater, ((t3, e3) => t3 > e3)), this.AddFloatBinaryOp(this.Less, ((t3, e3) => t3 < e3)), this.AddFloatBinaryOp(this.GreaterThanOrEquals, ((t3, e3) => t3 >= e3)), this.AddFloatBinaryOp(this.LessThanOrEquals, ((t3, e3) => t3 <= e3)), this.AddFloatBinaryOp(this.NotEquals, ((t3, e3) => t3 != e3)), this.AddFloatUnaryOp(this.Not, ((t3) => 0 == t3)), this.AddFloatBinaryOp(this.And, ((t3, e3) => 0 != t3 && 0 != e3)), this.AddFloatBinaryOp(this.Or, ((t3, e3) => 0 != t3 || 0 != e3)), this.AddFloatBinaryOp(this.Max, ((t3, e3) => Math.max(t3, e3))), this.AddFloatBinaryOp(this.Min, ((t3, e3) => Math.min(t3, e3))), this.AddFloatBinaryOp(this.Pow, ((t3, e3) => Math.pow(t3, e3))), this.AddFloatUnaryOp(this.Floor, ((t3) => Math.floor(t3))), this.AddFloatUnaryOp(this.Ceiling, ((t3) => Math.ceil(t3))), this.AddFloatUnaryOp(this.Int, ((t3) => Math.floor(t3))), this.AddFloatUnaryOp(this.Float, B.Identity), this.AddStringBinaryOp(this.Add, ((t3, e3) => t3 + e3)), this.AddStringBinaryOp(this.Equal, ((t3, e3) => t3 === e3)), this.AddStringBinaryOp(this.NotEquals, ((t3, e3) => !(t3 === e3))), this.AddStringBinaryOp(this.Has, ((t3, e3) => t3.includes(e3))), this.AddStringBinaryOp(this.Hasnt, ((t3, e3) => !t3.includes(e3))), this.AddListBinaryOp(this.Add, ((t3, e3) => t3.Union(e3))), this.AddListBinaryOp(this.Subtract, ((t3, e3) => t3.Without(e3))), this.AddListBinaryOp(this.Has, ((t3, e3) => t3.Contains(e3))), this.AddListBinaryOp(this.Hasnt, ((t3, e3) => !t3.Contains(e3))), this.AddListBinaryOp(this.Intersect, ((t3, e3) => t3.Intersect(e3))), this.AddListBinaryOp(this.Equal, ((t3, e3) => t3.Equals(e3))), this.AddListBinaryOp(this.Greater, ((t3, e3) => t3.GreaterThan(e3))), this.AddListBinaryOp(this.Less, ((t3, e3) => t3.LessThan(e3))), this.AddListBinaryOp(this.GreaterThanOrEquals, ((t3, e3) => t3.GreaterThanOrEquals(e3))), this.AddListBinaryOp(this.LessThanOrEquals, ((t3, e3) => t3.LessThanOrEquals(e3))), this.AddListBinaryOp(this.NotEquals, ((t3, e3) => !t3.Equals(e3))), this.AddListBinaryOp(this.And, ((t3, e3) => t3.Count > 0 && e3.Count > 0)), this.AddListBinaryOp(this.Or, ((t3, e3) => t3.Count > 0 || e3.Count > 0)), this.AddListUnaryOp(this.Not, ((t3) => 0 == t3.Count ? 1 : 0)), this.AddListUnaryOp(this.Invert, ((t3) => t3.inverse)), this.AddListUnaryOp(this.All, ((t3) => t3.all)), this.AddListUnaryOp(this.ListMin, ((t3) => t3.MinAsList())), this.AddListUnaryOp(this.ListMax, ((t3) => t3.MaxAsList())), this.AddListUnaryOp(this.Count, ((t3) => t3.Count)), this.AddListUnaryOp(this.ValueOfList, ((t3) => t3.maxItem.Value));
              let t2 = (t3, e3) => t3.Equals(e3), e2 = (t3, e3) => !t3.Equals(e3);
              this.AddOpToNativeFunc(this.Equal, 2, g.DivertTarget, t2), this.AddOpToNativeFunc(this.NotEquals, 2, g.DivertTarget, e2);
            }
          }
          AddOpFuncForType(t2, e2) {
            null == this._operationFuncs && (this._operationFuncs = /* @__PURE__ */ new Map()), this._operationFuncs.set(t2, e2);
          }
          static AddOpToNativeFunc(t2, e2, n2, i2) {
            if (null === this._nativeFunctions) return S("NativeFunctionCall._nativeFunctions");
            let r2 = this._nativeFunctions.get(t2);
            r2 || (r2 = new B(t2, e2), this._nativeFunctions.set(t2, r2)), r2.AddOpFuncForType(n2, i2);
          }
          static AddIntBinaryOp(t2, e2) {
            this.AddOpToNativeFunc(t2, 2, g.Int, e2);
          }
          static AddIntUnaryOp(t2, e2) {
            this.AddOpToNativeFunc(t2, 1, g.Int, e2);
          }
          static AddFloatBinaryOp(t2, e2) {
            this.AddOpToNativeFunc(t2, 2, g.Float, e2);
          }
          static AddFloatUnaryOp(t2, e2) {
            this.AddOpToNativeFunc(t2, 1, g.Float, e2);
          }
          static AddStringBinaryOp(t2, e2) {
            this.AddOpToNativeFunc(t2, 2, g.String, e2);
          }
          static AddListBinaryOp(t2, e2) {
            this.AddOpToNativeFunc(t2, 2, g.List, e2);
          }
          static AddListUnaryOp(t2, e2) {
            this.AddOpToNativeFunc(t2, 1, g.List, e2);
          }
          toString() {
            return 'Native "' + this.name + '"';
          }
        }
        B.Add = "+", B.Subtract = "-", B.Divide = "/", B.Multiply = "*", B.Mod = "%", B.Negate = "_", B.Equal = "==", B.Greater = ">", B.Less = "<", B.GreaterThanOrEquals = ">=", B.LessThanOrEquals = "<=", B.NotEquals = "!=", B.Not = "!", B.And = "&&", B.Or = "||", B.Min = "MIN", B.Max = "MAX", B.Pow = "POW", B.Floor = "FLOOR", B.Ceiling = "CEILING", B.Int = "INT", B.Float = "FLOAT", B.Has = "?", B.Hasnt = "!?", B.Intersect = "^", B.ListMin = "LIST_MIN", B.ListMax = "LIST_MAX", B.All = "LIST_ALL", B.Count = "LIST_COUNT", B.ValueOfList = "LIST_VALUE", B.Invert = "LIST_INVERT", B._nativeFunctions = null;
        class M extends V {
          constructor(t2, e2) {
            if (super(), this.isInt = () => "int" == this.subtype, this.isFloat = () => "float" == this.subtype, this.isBool = () => "bool" == this.subtype, this.GenerateIntoContainer = (t3) => {
              this.isInt() ? t3.AddContent(new N(this.value)) : this.isFloat() ? t3.AddContent(new I(this.value)) : this.isBool() && t3.AddContent(new P(this.value));
            }, this.toString = () => String(this.value), ("number" != typeof t2 || Number.isNaN(t2)) && "boolean" != typeof t2) throw new Error("Unexpected object type in NumberExpression.");
            this.value = t2, this.subtype = e2;
          }
          get typeName() {
            return "Number";
          }
          Equals(t2) {
            const e2 = s(t2, M);
            return !!e2 && (e2.subtype == this.subtype && e2.value == this.value);
          }
        }
        class G extends V {
          get nativeNameForOp() {
            return "-" === this.op ? "_" : "not" === this.op ? "!" : this.op;
          }
          constructor(t2, e2) {
            super(), this.op = e2, this.GenerateIntoContainer = (t3) => {
              this.innerExpression.GenerateIntoContainer(t3), t3.AddContent(B.CallWithName(this.nativeNameForOp));
            }, this.toString = () => this.nativeNameForOp + this.innerExpression, this.innerExpression = this.AddContent(t2);
          }
          get typeName() {
            return "UnaryExpression";
          }
        }
        G.WithInner = (t2, e2) => {
          const n2 = s(t2, M);
          if (n2) {
            if ("-" === e2) {
              if (n2.isInt()) return new M(-n2.value, "int");
              if (n2.isFloat()) return new M(-n2.value, "float");
            } else if ("!" == e2 || "not" == e2) {
              if (n2.isInt()) return new M(0 == n2.value, "bool");
              if (n2.isFloat()) return new M(0 == n2.value, "bool");
              if (n2.isBool()) return new M(!n2.value, "bool");
            }
            throw new Error("Unexpected operation or number type");
          }
          return new G(t2, e2);
        };
        class $ extends V {
          constructor(t2, e2, n2) {
            super(), this.opName = n2, this.GenerateIntoContainer = (t3) => {
              this.leftExpression.GenerateIntoContainer(t3), this.rightExpression.GenerateIntoContainer(t3), this.opName = this.NativeNameForOp(this.opName), t3.AddContent(B.CallWithName(this.opName));
            }, this.NativeNameForOp = (t3) => "and" === t3 ? "&&" : "or" === t3 ? "||" : "mod" === t3 ? "%" : "has" === t3 ? "?" : "hasnt" === t3 ? "!?" : t3, this.toString = () => `(${this.leftExpression} ${this.opName} ${this.rightExpression})`, this.leftExpression = this.AddContent(t2), this.rightExpression = this.AddContent(e2), this.opName = n2;
          }
          get typeName() {
            return "BinaryExpression";
          }
          ResolveReferences(t2) {
            if (super.ResolveReferences(t2), "?" === this.NativeNameForOp(this.opName)) {
              const t3 = s(this.leftExpression, G);
              null === t3 || "not" !== t3.op && "!" !== t3.op || this.Error(`Using 'not' or '!' here negates '${t3.innerExpression}' rather than the result of the '?' or 'has' operator. You need to add parentheses around the (A ? B) expression.`);
            }
          }
        }
        class q {
          constructor(t2) {
            this.set = /* @__PURE__ */ new Set(), this.Add = (t3) => this.set.add(t3), this.AddRange = (t3, e2) => {
              for (let n2 = t3.charCodeAt(0); n2 <= e2.charCodeAt(0); ++n2) this.Add(String.fromCharCode(n2));
              return this;
            }, this.AddCharacters = (t3) => {
              if ("string" == typeof t3 || Array.isArray(t3)) for (const e2 of t3) this.Add(e2);
              else for (const e2 of t3.set) this.Add(e2);
              return this;
            }, t2 && this.AddCharacters(t2);
          }
        }
        q.FromRange = (t2, e2) => new q().AddRange(t2, e2);
        class U {
          constructor(t2, e2) {
            let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            if (this._start = t2, this._end = e2, this._correspondingCharSet = new q(), this._excludes = /* @__PURE__ */ new Set(), this.ToCharacterSet = () => {
              if (0 === this._correspondingCharSet.set.size) for (let t3, e3 = this.start.charCodeAt(0); e3 <= this.end.charCodeAt(0); e3 += 1) t3 = String.fromCharCode(e3), this._excludes.has(t3) || this._correspondingCharSet.AddCharacters(t3);
              return this._correspondingCharSet;
            }, n2 instanceof q) this._excludes = n2.set;
            else for (const t3 of n2) this._excludes.add(t3);
          }
          get start() {
            return this._start;
          }
          get end() {
            return this._end;
          }
        }
        U.Define = function(t2, e2) {
          return new U(t2, e2, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : []);
        };
        class K extends y {
          constructor() {
            let t2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            super(), this._pathOnChoice = null, this.hasCondition = false, this.hasStartContent = false, this.hasChoiceOnlyContent = false, this.isInvisibleDefault = false, this.onceOnly = true, this.onceOnly = t2;
          }
          get pathOnChoice() {
            if (null != this._pathOnChoice && this._pathOnChoice.isRelative) {
              let t2 = this.choiceTarget;
              t2 && (this._pathOnChoice = t2.path);
            }
            return this._pathOnChoice;
          }
          set pathOnChoice(t2) {
            this._pathOnChoice = t2;
          }
          get choiceTarget() {
            return null === this._pathOnChoice ? S("ChoicePoint._pathOnChoice") : this.ResolvePath(this._pathOnChoice).container;
          }
          get pathStringOnChoice() {
            return null === this.pathOnChoice ? S("ChoicePoint.pathOnChoice") : this.CompactPathString(this.pathOnChoice);
          }
          set pathStringOnChoice(t2) {
            this.pathOnChoice = new m(t2);
          }
          get flags() {
            let t2 = 0;
            return this.hasCondition && (t2 |= 1), this.hasStartContent && (t2 |= 2), this.hasChoiceOnlyContent && (t2 |= 4), this.isInvisibleDefault && (t2 |= 8), this.onceOnly && (t2 |= 16), t2;
          }
          set flags(t2) {
            this.hasCondition = (1 & t2) > 0, this.hasStartContent = (2 & t2) > 0, this.hasChoiceOnlyContent = (4 & t2) > 0, this.isInvisibleDefault = (8 & t2) > 0, this.onceOnly = (16 & t2) > 0;
          }
          toString() {
            if (null === this.pathOnChoice) return S("ChoicePoint.pathOnChoice");
            return "Choice: -> " + this.pathOnChoice.toString();
          }
        }
        !(function(t2) {
          t2[t2.Tunnel = 0] = "Tunnel", t2[t2.Function = 1] = "Function", t2[t2.FunctionEvaluationFromGame = 2] = "FunctionEvaluationFromGame";
        })(v || (v = {}));
        class H {
          constructor() {
            this.container = null, this.index = -1, 2 === arguments.length && (this.container = arguments[0], this.index = arguments[1]);
          }
          Resolve() {
            return this.index < 0 ? this.container : null == this.container ? null : 0 == this.container.content.length ? this.container : this.index >= this.container.content.length ? null : this.container.content[this.index];
          }
          get isNull() {
            return null == this.container;
          }
          get path() {
            return this.isNull ? null : this.index >= 0 ? this.container.path.PathByAppendingComponent(new m.Component(this.index)) : this.container.path;
          }
          toString() {
            return this.container ? "Ink Pointer -> " + this.container.path.toString() + " -- index " + this.index : "Ink Pointer (null)";
          }
          copy() {
            return new H(this.container, this.index);
          }
          static StartOf(t2) {
            return new H(t2, 0);
          }
          static get Null() {
            return new H(null, -1);
          }
        }
        let J = class t2 extends y {
          get targetPath() {
            if (null != this._targetPath && this._targetPath.isRelative) {
              let t3 = this.targetPointer.Resolve();
              t3 && (this._targetPath = t3.path);
            }
            return this._targetPath;
          }
          set targetPath(t3) {
            this._targetPath = t3, this._targetPointer = H.Null;
          }
          get targetPointer() {
            if (this._targetPointer.isNull) {
              let t3 = this.ResolvePath(this._targetPath).obj;
              if (null === this._targetPath) return S("this._targetPath");
              if (null === this._targetPath.lastComponent) return S("this._targetPath.lastComponent");
              if (this._targetPath.lastComponent.isIndex) {
                if (null === t3) return S("targetObj");
                this._targetPointer.container = t3.parent instanceof L ? t3.parent : null, this._targetPointer.index = this._targetPath.lastComponent.index;
              } else this._targetPointer = H.StartOf(t3 instanceof L ? t3 : null);
            }
            return this._targetPointer.copy();
          }
          get targetPathString() {
            return null == this.targetPath ? null : this.CompactPathString(this.targetPath);
          }
          set targetPathString(t3) {
            this.targetPath = null == t3 ? null : new m(t3);
          }
          get hasVariableTarget() {
            return null != this.variableDivertName;
          }
          constructor(t3) {
            super(), this._targetPath = null, this._targetPointer = H.Null, this.variableDivertName = null, this.pushesToStack = false, this.stackPushType = 0, this.isExternal = false, this.externalArgs = 0, this.isConditional = false, this.pushesToStack = false, void 0 !== t3 && (this.pushesToStack = true, this.stackPushType = t3);
          }
          Equals(e2) {
            let n2 = e2;
            return n2 instanceof t2 && this.hasVariableTarget == n2.hasVariableTarget && (this.hasVariableTarget ? this.variableDivertName == n2.variableDivertName : null === this.targetPath ? S("this.targetPath") : this.targetPath.Equals(n2.targetPath));
          }
          toString() {
            if (this.hasVariableTarget) return "Divert(variable: " + this.variableDivertName + ")";
            if (null == this.targetPath) return "Divert(null)";
            {
              let t3 = new b(), e2 = this.targetPath.toString();
              return t3.Append("Divert"), this.isConditional && t3.Append("?"), this.pushesToStack && (this.stackPushType == v.Function ? t3.Append(" function") : t3.Append(" tunnel")), t3.Append(" -> "), t3.Append(this.targetPathString), t3.Append(" ("), t3.Append(e2), t3.Append(")"), t3.toString();
            }
          }
        };
        var z;
        !(function(t2) {
          t2[t2.Knot = 0] = "Knot", t2[t2.List = 1] = "List", t2[t2.ListItem = 2] = "ListItem", t2[t2.Var = 3] = "Var", t2[t2.SubFlowAndWeave = 4] = "SubFlowAndWeave", t2[t2.Arg = 5] = "Arg", t2[t2.Temp = 6] = "Temp";
        })(z || (z = {}));
        let X = class extends y {
          constructor(t2, e2) {
            super(), this.variableName = t2 || null, this.isNewDeclaration = !!e2, this.isGlobal = false;
          }
          toString() {
            return "VarAssign to " + this.variableName;
          }
        }, Y = class extends d {
          get runtimeChoice() {
            if (!this._runtimeChoice) throw new Error();
            return this._runtimeChoice;
          }
          get name() {
            var t2;
            return (null === (t2 = this.identifier) || void 0 === t2 ? void 0 : t2.name) || null;
          }
          get condition() {
            return this._condition;
          }
          set condition(t2) {
            this._condition = t2, t2 && this.AddContent(t2);
          }
          get runtimeContainer() {
            return this._innerContentContainer;
          }
          get innerContentContainer() {
            return this._innerContentContainer;
          }
          get containerForCounting() {
            return this._innerContentContainer;
          }
          get runtimePath() {
            if (!this.innerContentContainer || !this.innerContentContainer.path) throw new Error();
            return this.innerContentContainer.path;
          }
          constructor(t2, e2, n2) {
            super(), this._condition = null, this._innerContentContainer = null, this._outerContainer = null, this._runtimeChoice = null, this._returnToR1 = null, this._returnToR2 = null, this._r1Label = null, this._r2Label = null, this._divertToStartContentOuter = null, this._divertToStartContentInner = null, this._startContentRuntimeContainer = null, this.isInvisibleDefault = false, this.hasWeaveStyleInlineBrackets = false, this.GenerateRuntimeObject = () => {
              if (this._outerContainer = new L(), this._runtimeChoice = new K(this.onceOnly), this._runtimeChoice.isInvisibleDefault = this.isInvisibleDefault, (this.startContent || this.choiceOnlyContent || this.condition) && this._outerContainer.AddContent(D.EvalStart()), this.startContent) {
                this._returnToR1 = new F(), this._outerContainer.AddContent(this._returnToR1);
                const t3 = new X("$r", true);
                this._outerContainer.AddContent(t3), this._outerContainer.AddContent(D.BeginString()), this._divertToStartContentOuter = new J(), this._outerContainer.AddContent(this._divertToStartContentOuter), this._startContentRuntimeContainer = this.startContent.GenerateRuntimeObject(), this._startContentRuntimeContainer.name = "s";
                const e3 = new J();
                e3.variableDivertName = "$r", this._startContentRuntimeContainer.AddContent(e3), this._outerContainer.AddToNamedContentOnly(this._startContentRuntimeContainer), this._r1Label = new L(), this._r1Label.name = "$r1", this._outerContainer.AddContent(this._r1Label), this._outerContainer.AddContent(D.EndString()), this._runtimeChoice.hasStartContent = true;
              }
              if (this.choiceOnlyContent) {
                this._outerContainer.AddContent(D.BeginString());
                const t3 = this.choiceOnlyContent.GenerateRuntimeObject();
                this._outerContainer.AddContentsOfContainer(t3), this._outerContainer.AddContent(D.EndString()), this._runtimeChoice.hasChoiceOnlyContent = true;
              }
              if (this.condition && (this.condition.GenerateIntoContainer(this._outerContainer), this._runtimeChoice.hasCondition = true), (this.startContent || this.choiceOnlyContent || this.condition) && this._outerContainer.AddContent(D.EvalEnd()), this._outerContainer.AddContent(this._runtimeChoice), this._innerContentContainer = new L(), this.startContent) {
                this._returnToR2 = new F(), this._innerContentContainer.AddContent(D.EvalStart()), this._innerContentContainer.AddContent(this._returnToR2), this._innerContentContainer.AddContent(D.EvalEnd());
                const t3 = new X("$r", true);
                this._innerContentContainer.AddContent(t3), this._divertToStartContentInner = new J(), this._innerContentContainer.AddContent(this._divertToStartContentInner), this._r2Label = new L(), this._r2Label.name = "$r2", this._innerContentContainer.AddContent(this._r2Label);
              }
              if (this.innerContent) {
                const t3 = this.innerContent.GenerateRuntimeObject();
                this._innerContentContainer.AddContentsOfContainer(t3);
              }
              return this.story.countAllVisits && (this._innerContentContainer.visitsShouldBeCounted = true), this._innerContentContainer.countingAtStartOnly = true, this._outerContainer;
            }, this.toString = () => null !== this.choiceOnlyContent ? `* ${this.startContent}[${this.choiceOnlyContent}]...` : `* ${this.startContent}...`, this.startContent = t2, this.choiceOnlyContent = e2, this.innerContent = n2, this.indentationDepth = 1, t2 && this.AddContent(this.startContent), e2 && this.AddContent(this.choiceOnlyContent), n2 && this.AddContent(this.innerContent), this.onceOnly = true;
          }
          get typeName() {
            return "Choice";
          }
          ResolveReferences(t2) {
            var e2;
            if (this._innerContentContainer && (this.runtimeChoice.pathOnChoice = this._innerContentContainer.path, this.onceOnly && (this._innerContentContainer.visitsShouldBeCounted = true)), this._returnToR1) {
              if (!this._r1Label) throw new Error();
              this._returnToR1.targetPath = this._r1Label.path;
            }
            if (this._returnToR2) {
              if (!this._r2Label) throw new Error();
              this._returnToR2.targetPath = this._r2Label.path;
            }
            if (this._divertToStartContentOuter) {
              if (!this._startContentRuntimeContainer) throw new Error();
              this._divertToStartContentOuter.targetPath = this._startContentRuntimeContainer.path;
            }
            if (this._divertToStartContentInner) {
              if (!this._startContentRuntimeContainer) throw new Error();
              this._divertToStartContentInner.targetPath = this._startContentRuntimeContainer.path;
            }
            super.ResolveReferences(t2), this.identifier && ((null === (e2 = this.identifier) || void 0 === e2 ? void 0 : e2.name) || "").length > 0 && t2.CheckForNamingCollisions(this, this.identifier, z.SubFlowAndWeave);
          }
        };
        class Z {
          constructor() {
            this.characterIndex = 0, this.characterInLineIndex = 0, this.lineIndex = 0, this.reportedErrorInScope = false, this.uniqueId = 0, this.customFlags = 0, this.CopyFrom = (t2) => {
              Z._uniqueIdCounter++, this.uniqueId = Z._uniqueIdCounter, this.characterIndex = t2.characterIndex, this.characterInLineIndex = t2.characterInLineIndex, this.lineIndex = t2.lineIndex, this.customFlags = t2.customFlags, this.reportedErrorInScope = false;
            }, this.SquashFrom = (t2) => {
              this.characterIndex = t2.characterIndex, this.characterInLineIndex = t2.characterInLineIndex, this.lineIndex = t2.lineIndex, this.reportedErrorInScope = t2.reportedErrorInScope, this.customFlags = t2.customFlags;
            };
          }
        }
        Z._uniqueIdCounter = 1e3;
        class Q {
          get currentElement() {
            return this._stack[this._numElements - 1];
          }
          get lineIndex() {
            return this.currentElement.lineIndex;
          }
          set lineIndex(t2) {
            this.currentElement.lineIndex = t2;
          }
          get characterIndex() {
            return this.currentElement.characterIndex;
          }
          set characterIndex(t2) {
            this.currentElement.characterIndex = t2;
          }
          get characterInLineIndex() {
            return this.currentElement.characterInLineIndex;
          }
          set characterInLineIndex(t2) {
            this.currentElement.characterInLineIndex = t2;
          }
          get customFlags() {
            return this.currentElement.customFlags;
          }
          set customFlags(t2) {
            this.currentElement.customFlags = t2;
          }
          get errorReportedAlreadyInScope() {
            return this.currentElement.reportedErrorInScope;
          }
          get stackHeight() {
            return this._numElements;
          }
          constructor() {
            this._stack = [], this._numElements = 0, this.StringParserState = () => {
              this._stack = new Array(200);
              for (let t2 = 0; t2 < 200; ++t2) this._stack[t2] = new Z();
              this._numElements = 1;
            }, this.Push = () => {
              if (this._numElements >= this._stack.length && this._numElements > 0) throw new Error("Stack overflow in parser state.");
              const t2 = this._stack[this._numElements - 1], e2 = this._stack[this._numElements];
              return this._numElements++, e2.CopyFrom(t2), e2.uniqueId;
            }, this.Pop = (t2) => {
              if (1 == this._numElements) throw new Error("Attempting to remove final stack element is illegal! Mismatched Begin/Succceed/Fail?");
              if (this.currentElement.uniqueId != t2) throw new Error("Mismatched rule IDs while Poping - do you have mismatched Begin/Succeed/Fail?");
              this._numElements -= 1;
            }, this.Peek = (t2) => {
              if (this.currentElement.uniqueId != t2) throw new Error("Mismatched rule IDs while Peeking - do you have mismatched Begin/Succeed/Fail?");
              return this._stack[this._numElements - 1];
            }, this.PeekPenultimate = () => this._numElements >= 2 ? this._stack[this._numElements - 2] : null, this.Squash = () => {
              if (this._numElements < 2) throw new Error("Attempting to remove final stack element is illegal! Mismatched Begin/Succceed/Fail?");
              const t2 = this._stack[this._numElements - 2], e2 = this._stack[this._numElements - 1];
              t2.SquashFrom(e2), this._numElements -= 1;
            }, this.NoteErrorReported = () => {
              for (const t2 of this._stack) t2.reportedErrorInScope = true;
            };
            for (let t2 = 0; t2 < 200; t2++) this._stack[t2] = new Z();
            this._numElements = 1;
          }
        }
        const tt = Symbol("ParseSuccessStruct");
        class et {
          constructor(t2) {
            var e2 = this;
            this.ParseRule = null, this.errorHandler = null, this.hadError = false, this.BeginRule = () => this.state.Push(), this.FailRule = (t3) => (this.state.Pop(t3), null), this.CancelRule = (t3) => {
              this.state.Pop(t3);
            }, this.SucceedRule = function(t3) {
              let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
              const i2 = e2.state.Peek(t3), r2 = e2.state.PeekPenultimate();
              e2.RuleDidSucceed && e2.RuleDidSucceed(n3, r2, i2), e2.state.Squash();
              let s2 = n3;
              return null === s2 && (s2 = et.ParseSuccess), s2;
            }, this.Expect = function(t3) {
              let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, r2 = e2.ParseObject(t3);
              if (null === r2) {
                let s2;
                null === n3 && (n3 = t3.name);
                const a2 = e2.LineRemainder();
                s2 = null === a2 || 0 === a2.length ? "end of line" : `'${a2}'`, e2.Error(`Expected ${n3} but saw ${s2}`), null !== i2 && (r2 = i2());
              }
              return r2;
            }, this.Error = function(t3) {
              let n3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              e2.ErrorOnLine(t3, e2.lineIndex + 1, n3);
            }, this.ErrorWithParsedObject = function(t3, n3) {
              let i2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              e2.ErrorOnLine(t3, n3.debugMetadata ? n3.debugMetadata.startLineNumber : -1, i2);
            }, this.ErrorOnLine = (t3, e3, n3) => {
              if (!this.state.errorReportedAlreadyInScope) {
                const i2 = n3 ? "Warning" : "Error";
                if (!this.errorHandler) throw new Error(`${i2} on line ${e3}: ${t3}`);
                this.errorHandler(t3, this.index, e3 - 1, n3), this.state.NoteErrorReported();
              }
              n3 || (this.hadError = true);
            }, this.Warning = (t3) => this.Error(t3, true), this.LineRemainder = () => this.Peek((() => this.ParseUntilCharactersFromString("\n\r"))), this.SetFlag = (t3, e3) => {
              e3 ? this.state.customFlags |= t3 : this.state.customFlags &= ~t3;
            }, this.GetFlag = (t3) => Boolean(this.state.customFlags & t3), this.ParseObject = (t3) => {
              const e3 = this.BeginRule(), n3 = this.state.stackHeight, i2 = t3();
              if (n3 !== this.state.stackHeight) throw new Error("Mismatched Begin/Fail/Succeed rules");
              return null === i2 ? this.FailRule(e3) : (this.SucceedRule(e3, i2), i2);
            }, this.Parse = (t3) => {
              const e3 = this.BeginRule(), n3 = t3();
              return null === n3 ? (this.FailRule(e3), null) : (this.SucceedRule(e3, n3), n3);
            }, this.OneOf = (t3) => {
              for (const e3 of t3) {
                const t4 = this.ParseObject(e3);
                if (null !== t4) return t4;
              }
              return null;
            }, this.OneOrMore = (t3) => {
              const e3 = [];
              let n3 = null;
              do {
                n3 = this.ParseObject(t3), null !== n3 && e3.push(n3);
              } while (null !== n3);
              return e3.length > 0 ? e3 : null;
            }, this.Optional = (t3) => () => {
              const e3 = this.ParseObject(t3);
              return null === e3 ? et.ParseSuccess : e3;
            }, this.Exclude = (t3) => () => this.ParseObject(t3) && et.ParseSuccess, this.OptionalExclude = (t3) => () => (this.ParseObject(t3), et.ParseSuccess), this.String = (t3) => () => this.ParseString(t3), this.TryAddResultToList = function(t3, e3) {
              let n3 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
              if (t3 !== et.ParseSuccess) {
                if (n3 && Array.isArray(t3)) {
                  const n4 = t3;
                  if (null !== n4) {
                    for (const t4 of n4) e3.push(t4);
                    return;
                  }
                }
                e3.push(t3);
              }
            }, this.Interleave = function(t3, n3) {
              let i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, r2 = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
              const s2 = e2.BeginRule(), a2 = [], o2 = e2.ParseObject(t3);
              if (null === o2) return e2.FailRule(s2);
              e2.TryAddResultToList(o2, a2, r2);
              let l2 = null, h2 = null;
              do {
                if (null !== i2 && null !== e2.Peek(i2)) break;
                if (l2 = e2.ParseObject(n3), null === l2) break;
                if (e2.TryAddResultToList(l2, a2, r2), h2 = null, null !== l2) {
                  if (h2 = e2.ParseObject(t3), null === h2) break;
                  e2.TryAddResultToList(h2, a2, r2);
                }
              } while ((null !== l2 || null !== h2) && (l2 !== et.ParseSuccess || h2 != et.ParseSuccess) && e2.remainingLength > 0);
              return 0 === a2.length ? e2.FailRule(s2) : e2.SucceedRule(s2, a2);
            }, this.ParseString = (t3) => {
              if (t3.length > this.remainingLength) return null;
              const e3 = this.BeginRule();
              let n3 = this.index, i2 = this.characterInLineIndex, r2 = this.lineIndex, s2 = true;
              for (let e4 = 0; e4 < t3.length; e4 += 1) {
                const a2 = t3[e4];
                if (this._chars[n3] !== a2) {
                  s2 = false;
                  break;
                }
                "\n" === a2 && (r2++, i2 = -1), n3++, i2++;
              }
              return this.index = n3, this.characterInLineIndex = i2, this.lineIndex = r2, s2 ? this.SucceedRule(e3, t3) : this.FailRule(e3);
            }, this.ParseSingleCharacter = () => {
              if (this.remainingLength > 0) {
                const t3 = this._chars[this.index];
                return "\n" === t3 && (this.lineIndex += 1, this.characterInLineIndex = -1), this.index += 1, this.characterInLineIndex += 1, t3;
              }
              return "0";
            }, this.ParseUntilCharactersFromString = function(t3) {
              let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
              return e2.ParseCharactersFromString(t3, false, n3);
            }, this.ParseUntilCharactersFromCharSet = function(t3) {
              let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
              return e2.ParseCharactersFromCharSet(t3, false, n3);
            }, this.ParseCharactersFromString = function(t3) {
              let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : -1;
              const r2 = new q(t3);
              return "number" == typeof n3 ? e2.ParseCharactersFromCharSet(r2, true, n3) : e2.ParseCharactersFromCharSet(r2, n3, i2);
            }, this.ParseCharactersFromCharSet = function(t3) {
              let n3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : -1;
              -1 === i2 && (i2 = Number.MAX_SAFE_INTEGER);
              const r2 = e2.index;
              let s2 = e2.index, a2 = e2.characterInLineIndex, o2 = e2.lineIndex, l2 = 0;
              for (; s2 < e2._chars.length && t3.set.has(e2._chars[s2]) === n3 && l2 < i2; ) "\n" === e2._chars[s2] && (o2 += 1, a2 = -1), s2 += 1, a2 += 1, l2 += 1;
              e2.index = s2, e2.characterInLineIndex = a2, e2.lineIndex = o2;
              return e2.index > r2 ? e2._chars.slice(r2, e2.index).join("") : null;
            }, this.Peek = (t3) => {
              const e3 = this.BeginRule(), n3 = t3();
              return this.CancelRule(e3), n3;
            }, this.ParseInt = () => {
              const t3 = this.index, e3 = this.characterInLineIndex, n3 = null !== this.ParseString("-");
              this.ParseCharactersFromString(" 	");
              const i2 = this.ParseCharactersFromCharSet(et.numbersCharacterSet);
              if (null === i2) return this.index = t3, this.characterInLineIndex = e3, null;
              let r2;
              return Number.isNaN(Number(i2)) ? (this.Error("Failed to read integer value: " + i2 + ". Perhaps it's out of the range of acceptable numbers ink supports? (" + Number.MIN_SAFE_INTEGER + " to " + Number.MAX_SAFE_INTEGER + ")"), null) : (r2 = Number(i2), n3 ? -r2 : r2);
            }, this.ParseFloat = () => {
              const t3 = this.index, e3 = this.characterInLineIndex, n3 = this.ParseInt();
              if (null !== n3 && null !== this.ParseString(".")) {
                const t4 = this.ParseCharactersFromCharSet(et.numbersCharacterSet);
                return Number(`${n3}.${t4}`);
              }
              return this.index = t3, this.characterInLineIndex = e3, null;
            }, this.ParseNewline = () => {
              const t3 = this.BeginRule();
              return this.ParseString("\r"), null === this.ParseString("\n") ? this.FailRule(t3) : this.SucceedRule(t3, "\n");
            };
            const n2 = this.PreProcessInputString(t2);
            this.state = new Q(), this._chars = t2 ? n2.split("") : [], this.inputString = n2;
          }
          get currentCharacter() {
            return this.index >= 0 && this.remainingLength > 0 ? this._chars[this.index] : "0";
          }
          PreProcessInputString(t2) {
            return t2;
          }
          get endOfInput() {
            return this.index >= this._chars.length;
          }
          get remainingString() {
            return this._chars.slice(this.index, this.index + this.remainingLength).join("");
          }
          get remainingLength() {
            return this._chars.length - this.index;
          }
          get lineIndex() {
            return this.state.lineIndex;
          }
          set lineIndex(t2) {
            this.state.lineIndex = t2;
          }
          set characterInLineIndex(t2) {
            this.state.characterInLineIndex = t2;
          }
          get characterInLineIndex() {
            return this.state.characterInLineIndex;
          }
          get index() {
            return this.state.characterIndex;
          }
          set index(t2) {
            this.state.characterIndex = t2;
          }
          ParseUntil(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            const i2 = this.BeginRule(), r2 = new q();
            null !== e2 && (r2.set = /* @__PURE__ */ new Set([...r2.set.values(), ...e2.set.values()])), null !== n2 && (r2.set = /* @__PURE__ */ new Set([...r2.set.values(), ...n2.set.values()]));
            let s2 = "", a2 = null;
            for (; ; ) {
              const n3 = this.ParseUntilCharactersFromCharSet(r2);
              if (n3 && (s2 += n3), a2 = this.Peek(t2), null !== a2) break;
              {
                if (this.endOfInput) break;
                const t3 = this.currentCharacter;
                if (null !== e2 && e2.set.has(t3)) {
                  s2 += t3, "\n" === t3 && (this.lineIndex += 1, this.characterInLineIndex = -1), this.index += 1, this.characterInLineIndex += 1;
                  continue;
                }
                break;
              }
            }
            return s2.length > 0 ? this.SucceedRule(i2, String(s2)) : this.FailRule(i2);
          }
        }
        et.ParseSuccess = tt, et.numbersCharacterSet = new q("0123456789");
        class nt extends et {
          constructor() {
            super(...arguments), this._commentOrNewlineStartCharacter = new q("/\r\n"), this._commentBlockEndCharacter = new q("*"), this._newlineCharacters = new q("\n\r"), this.Process = () => {
              const t2 = this.Interleave(this.Optional(this.CommentsAndNewlines), this.Optional(this.MainInk));
              return null !== t2 ? t2.join("") : "";
            }, this.MainInk = () => this.ParseUntil(this.CommentsAndNewlines, this._commentOrNewlineStartCharacter, null), this.CommentsAndNewlines = () => {
              let t2 = this.Interleave(this.Optional(this.ParseNewline), this.Optional(this.ParseSingleComment));
              return null !== t2 ? t2.join("") : null;
            }, this.ParseSingleComment = () => this.OneOf([this.EndOfLineComment, this.BlockComment]), this.EndOfLineComment = () => null === this.ParseString("//") ? null : (this.ParseUntilCharactersFromCharSet(this._newlineCharacters), ""), this.BlockComment = () => {
              if (null === this.ParseString("/*")) return null;
              const t2 = this.lineIndex, e2 = this.ParseUntil(this.String("*/"), this._commentBlockEndCharacter, null);
              return this.endOfInput || this.ParseString("*/"), null != e2 ? "\n".repeat(this.lineIndex - t2) : null;
            };
          }
          PreProcessInputString(t2) {
            return t2;
          }
        }
        class it extends d {
          constructor(t2, e2) {
            super(), this.initialCondition = t2, this.branches = e2, this._reJoinTarget = null, this.GenerateRuntimeObject = () => {
              const t3 = new L();
              this.initialCondition && t3.AddContent(this.initialCondition.runtimeObject);
              for (const e3 of this.branches) {
                const n2 = e3.runtimeObject;
                t3.AddContent(n2);
              }
              return null === this.initialCondition || null === this.branches[0].ownExpression || this.branches[this.branches.length - 1].isElse || t3.AddContent(D.PopEvaluatedValue()), this._reJoinTarget = D.NoOp(), t3.AddContent(this._reJoinTarget), t3;
            }, this.initialCondition && this.AddContent(this.initialCondition), null !== this.branches && this.AddContent(this.branches);
          }
          get typeName() {
            return "Conditional";
          }
          ResolveReferences(t2) {
            const e2 = this._reJoinTarget.path;
            for (const t3 of this.branches) {
              if (!t3.returnDivert) throw new Error();
              t3.returnDivert.targetPath = e2;
            }
            super.ResolveReferences(t2);
          }
        }
        class rt extends d {
          constructor(t2) {
            super(), this.text = t2, this.GenerateRuntimeObject = () => new O(this.text), this.toString = () => this.text;
          }
          get typeName() {
            return "Text";
          }
        }
        class st extends d {
          get constantName() {
            var t2;
            return null === (t2 = this.constantIdentifier) || void 0 === t2 ? void 0 : t2.name;
          }
          get expression() {
            if (!this._expression) throw new Error();
            return this._expression;
          }
          constructor(t2, e2) {
            super(), this._expression = null, this.GenerateRuntimeObject = () => null, this.constantIdentifier = t2, e2 && (this._expression = this.AddContent(e2));
          }
          get typeName() {
            return "CONST";
          }
          ResolveReferences(t2) {
            super.ResolveReferences(t2), t2.CheckForNamingCollisions(this, this.constantIdentifier, z.Var);
          }
        }
        var at;
        !(function(t2) {
          t2[t2.Story = 0] = "Story", t2[t2.Knot = 1] = "Knot", t2[t2.Stitch = 2] = "Stitch", t2[t2.WeavePoint = 3] = "WeavePoint";
        })(at || (at = {}));
        class ot extends d {
          get name() {
            var t2;
            return (null === (t2 = this.identifier) || void 0 === t2 ? void 0 : t2.name) || null;
          }
          get runtimeContainer() {
            return this.runtimeObject;
          }
          constructor(t2, e2) {
            super(), this.indentationDepth = e2, this.GenerateRuntimeObject = () => {
              const t3 = new L();
              if (t3.name = this.name, this.story.countAllVisits && (t3.visitsShouldBeCounted = true), t3.countingAtStartOnly = true, this.content) for (const e3 of this.content) t3.AddContent(e3.runtimeObject);
              return t3;
            }, this.toString = () => {
              var t3, e3;
              return "- " + ((null === (t3 = this.identifier) || void 0 === t3 ? void 0 : t3.name) ? "(" + (null === (e3 = this.identifier) || void 0 === e3 ? void 0 : e3.name) + ")" : "gather");
            }, t2 && (this.identifier = t2);
          }
          get typeName() {
            return "Gather";
          }
          ResolveReferences(t2) {
            super.ResolveReferences(t2), this.identifier && (this.identifier.name || "").length > 0 && t2.CheckForNamingCollisions(this, this.identifier, z.SubFlowAndWeave);
          }
        }
        class lt {
          get baseTargetLevel() {
            return this.baseLevelIsAmbiguous ? at.Story : this._baseTargetLevel;
          }
          get baseLevelIsAmbiguous() {
            return !this._baseTargetLevel;
          }
          get firstComponent() {
            return null != this.components && this.components.length ? this.components[0].name : null;
          }
          get numberOfComponents() {
            return this.components ? this.components.length : 0;
          }
          get dotSeparatedComponents() {
            return null == this._dotSeparatedComponents && (this._dotSeparatedComponents = (this.components ? this.components : []).map(((t2) => t2.name)).filter(c).join(".")), this._dotSeparatedComponents;
          }
          constructor(t2, e2) {
            this._dotSeparatedComponents = null, this.toString = () => null === this.components || 0 === this.components.length ? this.baseTargetLevel === at.WeavePoint ? "-> <next gather point>" : "<invalid Path>" : `-> ${this.dotSeparatedComponents}`, this.ResolveFromContext = (t3) => {
              if (null == this.components || 0 == this.components.length) return null;
              let e3 = this.ResolveBaseTarget(t3);
              return null === e3 ? null : this.components.length > 1 ? this.ResolveTailComponents(e3) : e3;
            }, this.ResolveBaseTarget = (t3) => {
              const e3 = this.firstComponent;
              let n2 = t3;
              for (; n2; ) {
                const i2 = n2 === t3, r2 = this.GetChildFromContext(n2, e3, null, i2);
                if (r2) return r2;
                n2 = n2.parent;
              }
              return null;
            }, this.ResolveTailComponents = (t3) => {
              let e3 = t3;
              if (!this.components) return null;
              for (let t4 = 1; t4 < this.components.length; ++t4) {
                const n2 = this.components[t4].name;
                let i2, r2 = s(e3, dt);
                if (i2 = null !== r2 ? r2.flowLevel + 1 : at.WeavePoint, e3 = this.GetChildFromContext(e3, n2, i2), null === e3) break;
              }
              return e3;
            }, this.GetChildFromContext = function(t3, e3, n2) {
              let i2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
              const r2 = null === n2, a2 = s(t3, Pt);
              if (e3 && null !== a2 && (r2 || n2 === at.WeavePoint)) return a2.WeavePointNamed(e3);
              let o2 = s(t3, dt);
              if (e3 && null !== o2) {
                const t4 = i2 || o2.flowLevel === at.Knot;
                return o2.ContentWithNameAtLevel(e3, n2, t4);
              }
              return null;
            }, Object.values(at).includes(t2) ? (this._baseTargetLevel = t2, this.components = e2 || []) : Array.isArray(t2) ? (this._baseTargetLevel = null, this.components = t2 || []) : (this._baseTargetLevel = null, this.components = [t2]);
          }
          get typeName() {
            return "Path";
          }
        }
        class ht extends d {
          constructor() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            super(), this.returnedExpression = null, this.GenerateRuntimeObject = () => {
              const t3 = new L();
              return this.returnedExpression ? t3.AddContent(this.returnedExpression.runtimeObject) : (t3.AddContent(D.EvalStart()), t3.AddContent(new j()), t3.AddContent(D.EvalEnd())), t3.AddContent(D.PopFunction()), t3;
            }, t2 && (this.returnedExpression = this.AddContent(t2));
          }
          get typeName() {
            return "ReturnType";
          }
        }
        function ut(t2) {
          let e2 = t2.parent;
          for (; e2; ) {
            if (e2.hasOwnProperty("iamFlowbase") && e2.iamFlowbase()) return e2;
            e2 = e2.parent;
          }
          return null;
        }
        class ct {
          constructor(t2) {
            this.debugMetadata = null, this.toString = () => this.name || "undefined identifer", this.name = t2;
          }
          get typeName() {
            return "Identifier";
          }
          static Done() {
            return new ct("DONE");
          }
        }
        class dt extends d {
          get hasParameters() {
            return null !== this.args && this.args.length > 0;
          }
          get subFlowsByName() {
            return this._subFlowsByName;
          }
          get typeName() {
            return this.isFunction ? "Function" : String(this.flowLevel);
          }
          get name() {
            var t2;
            return (null === (t2 = this.identifier) || void 0 === t2 ? void 0 : t2.name) || null;
          }
          constructor(t2) {
            var e2;
            let n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, r2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], a2 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            super(), e2 = this, this.isFunction = r2, this._rootWeave = null, this._subFlowsByName = /* @__PURE__ */ new Map(), this._startingSubFlowDivert = null, this._startingSubFlowRuntime = null, this._firstChildFlow = null, this.variableDeclarations = /* @__PURE__ */ new Map(), this.identifier = null, this.args = null, this.iamFlowbase = () => true, this.SplitWeaveAndSubFlowContent = (t3, e3) => {
              var n3, i3;
              const r3 = [], a3 = [];
              this._subFlowsByName = /* @__PURE__ */ new Map();
              for (const e4 of t3) {
                const t4 = s(e4, dt);
                t4 ? (null === this._firstChildFlow && (this._firstChildFlow = t4), a3.push(e4), (null === (n3 = t4.identifier) || void 0 === n3 ? void 0 : n3.name) && this._subFlowsByName.set(null === (i3 = t4.identifier) || void 0 === i3 ? void 0 : i3.name, t4)) : r3.push(e4);
              }
              e3 && r3.push(new ot(null, 1), new St(new lt(ct.Done())));
              const o2 = [];
              return r3.length > 0 && (this._rootWeave = new Pt(r3, 0), o2.push(this._rootWeave)), a3.length > 0 && o2.push(...a3), o2;
            }, this.ResolveVariableWithName = (t3, e3) => {
              var n3;
              const i3 = {}, r3 = null === e3 ? this : ut(e3);
              if (r3) {
                if (null !== r3.args) {
                  for (const e4 of r3.args) if ((null === (n3 = e4.identifier) || void 0 === n3 ? void 0 : n3.name) === t3) return i3.found = true, i3.isArgument = true, i3.ownerFlow = r3, i3;
                }
                if (r3 !== this.story && r3.variableDeclarations.has(t3)) return i3.found = true, i3.ownerFlow = r3, i3.isTemporary = true, i3;
              }
              return this.story.variableDeclarations.has(t3) ? (i3.found = true, i3.ownerFlow = this.story, i3.isGlobal = true, i3) : (i3.found = false, i3);
            }, this.AddNewVariableDeclaration = (t3) => {
              const e3 = t3.variableName;
              if (this.variableDeclarations.has(e3)) {
                const n3 = this.variableDeclarations.get(e3);
                let i3 = "";
                return n3.debugMetadata && (i3 = ` (${n3.debugMetadata})`), void this.Error(`found declaration variable '${e3}' that was already declared${i3}`, t3, false);
              }
              this.variableDeclarations.set(t3.variableName, t3);
            }, this.ResolveWeavePointNaming = () => {
              this._rootWeave && this._rootWeave.ResolveWeavePointNaming();
              for (const [, t3] of this._subFlowsByName) t3.hasOwnProperty("ResolveWeavePointNaming") && t3.ResolveWeavePointNaming();
            }, this.GenerateRuntimeObject = () => {
              var t3;
              let e3 = null;
              this.isFunction ? this.CheckForDisallowedFunctionFlowControl() : this.flowLevel !== at.Knot && this.flowLevel !== at.Stitch || (e3 = this.Find(ht)(), null !== e3 && this.Error(`Return statements can only be used in knots that are declared as functions: == function ${this.identifier} ==`, e3));
              const n3 = new L();
              n3.name = null === (t3 = this.identifier) || void 0 === t3 ? void 0 : t3.name, this.story.countAllVisits && (n3.visitsShouldBeCounted = true), this.GenerateArgumentVariableAssignments(n3);
              let i3 = 0;
              for (; null !== this.content && i3 < this.content.length; ) {
                const t4 = this.content[i3];
                if (t4 instanceof dt) {
                  const e4 = t4, r3 = e4.runtimeObject;
                  0 !== i3 || e4.hasParameters || this.flowLevel !== at.Knot || (this._startingSubFlowDivert = new J(), n3.AddContent(this._startingSubFlowDivert), this._startingSubFlowRuntime = r3);
                  const s2 = r3, a3 = n3.namedContent.get(s2.name) || null;
                  if (a3) {
                    const t5 = `${this.GetType()} already contains flow named '${s2.name}' (at ${a3.debugMetadata})`;
                    this.Error(t5, e4);
                  }
                  n3.AddToNamedContentOnly(s2);
                } else t4 && n3.AddContent(t4.runtimeObject);
                i3 += 1;
              }
              return this.flowLevel === at.Story || this.isFunction || null === this._rootWeave || null !== e3 || this._rootWeave.ValidateTermination(this.WarningInTermination), n3;
            }, this.GenerateArgumentVariableAssignments = (t3) => {
              var e3;
              if (null !== this.args && 0 !== this.args.length) for (let n3 = this.args.length - 1; n3 >= 0; --n3) {
                const i3 = (null === (e3 = this.args[n3].identifier) || void 0 === e3 ? void 0 : e3.name) || null, r3 = new X(i3, true);
                t3.AddContent(r3);
              }
            }, this.ContentWithNameAtLevel = function(t3) {
              let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i3 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              var r3;
              if ((n3 === e2.flowLevel || null === n3) && t3 === (null === (r3 = e2.identifier) || void 0 === r3 ? void 0 : r3.name)) return e2;
              if (n3 === at.WeavePoint || null === n3) {
                let r4 = null;
                if (e2._rootWeave && (r4 = e2._rootWeave.WeavePointNamed(t3), r4)) return r4;
                if (n3 === at.WeavePoint) return i3 ? e2.DeepSearchForAnyLevelContent(t3) : null;
              }
              if (null !== n3 && n3 < e2.flowLevel) return null;
              let s2 = e2._subFlowsByName.get(t3) || null;
              return !s2 || null !== n3 && n3 !== s2.flowLevel ? i3 ? e2.DeepSearchForAnyLevelContent(t3) : null : s2;
            }, this.DeepSearchForAnyLevelContent = (t3) => {
              const e3 = this.ContentWithNameAtLevel(t3, at.WeavePoint, false);
              if (e3) return e3;
              for (const [, e4] of this._subFlowsByName) {
                const n3 = e4.ContentWithNameAtLevel(t3, null, true);
                if (n3) return n3;
              }
              return null;
            }, this.CheckForDisallowedFunctionFlowControl = () => {
              this.flowLevel !== at.Knot && this.Error("Functions cannot be stitches - i.e. they should be defined as '== function myFunc ==' rather than internal to another knot.");
              for (const [t4, e4] of this._subFlowsByName) this.Error(`Functions may not contain stitches, but saw '${t4}' within the function '${this.identifier}'`, e4);
              if (!this._rootWeave) throw new Error();
              const t3 = this._rootWeave.FindAll(St)();
              for (const e4 of t3) e4.isFunctionCall || e4.parent instanceof Ct || this.Error(`Functions may not contain diverts, but saw '${e4}'`, e4);
              const e3 = this._rootWeave.FindAll(Y)();
              for (const t4 of e3) this.Error(`Functions may not contain choices, but saw '${t4}'`, t4);
            }, this.WarningInTermination = (t3) => {
              let e3 = "Apparent loose end exists where the flow runs out. Do you need a '-> DONE' statement, choice or divert?";
              t3.parent === this._rootWeave && this._firstChildFlow && (e3 = `${e3} Note that if you intend to enter '${this._firstChildFlow.identifier}' next, you need to divert to it explicitly.`);
              const n3 = s(t3, St);
              n3 && n3.isTunnel && (e3 += ` When final tunnel to '${n3.target} ->' returns it won't have anywhere to go.`), this.Warning(e3, t3);
            }, this.toString = () => `${this.typeName} '${this.identifier}'`, this.identifier = t2, this.args = i2, null === n2 && (n2 = []), this.PreProcessTopLevelObjects(n2), n2 = this.SplitWeaveAndSubFlowContent(n2, "Story" == this.GetType() && !a2), this.AddContent(n2);
          }
          PreProcessTopLevelObjects(t2) {
          }
          ResolveReferences(t2) {
            var e2, n2;
            if (this._startingSubFlowDivert) {
              if (!this._startingSubFlowRuntime) throw new Error();
              this._startingSubFlowDivert.targetPath = this._startingSubFlowRuntime.path;
            }
            if (super.ResolveReferences(t2), null !== this.args) {
              for (const e3 of this.args) t2.CheckForNamingCollisions(this, e3.identifier, z.Arg, "argument");
              for (let t3 = 0; t3 < this.args.length; t3 += 1) for (let i2 = t3 + 1; i2 < this.args.length; i2 += 1) (null === (e2 = this.args[t3].identifier) || void 0 === e2 ? void 0 : e2.name) == (null === (n2 = this.args[i2].identifier) || void 0 === n2 ? void 0 : n2.name) && this.Error(`Multiple arguments with the same name: '${this.args[t3].identifier}'`);
            }
            if (this.flowLevel !== at.Story) {
              const e3 = this.flowLevel === at.Knot ? z.Knot : z.SubFlowAndWeave;
              t2.CheckForNamingCollisions(this, this.identifier, e3);
            }
          }
        }
        class pt extends d {
          get runtimeContainer() {
            return this.runtimeObject;
          }
          constructor(t2) {
            super(), this.dontFlatten = false, this.TrimTrailingWhitespace = () => {
              for (let t3 = this.content.length - 1; t3 >= 0; --t3) {
                const e3 = s(this.content[t3], rt);
                if (null === e3) break;
                if (e3.text = e3.text.replace(new RegExp(/[ \t]/g), ""), 0 !== e3.text.length) break;
                this.content.splice(t3, 1);
              }
            }, this.GenerateRuntimeObject = () => {
              const t3 = new L();
              if (null !== this.content) for (const e3 of this.content) {
                const n3 = e3.runtimeObject;
                n3 && t3.AddContent(n3);
              }
              return this.dontFlatten && this.story.DontFlattenContainer(t3), t3;
            }, this.toString = () => `ContentList(${this.content.join(", ")})`, t2 && this.AddContent(t2);
            for (var e2 = arguments.length, n2 = new Array(e2 > 1 ? e2 - 1 : 0), i2 = 1; i2 < e2; i2++) n2[i2 - 1] = arguments[i2];
            n2 && this.AddContent(n2);
          }
          get typeName() {
            return "ContentList";
          }
        }
        let mt = class extends y {
          get containerForCount() {
            return null === this.pathForCount ? null : this.ResolvePath(this.pathForCount).container;
          }
          get pathStringForCount() {
            return null === this.pathForCount ? null : this.CompactPathString(this.pathForCount);
          }
          set pathStringForCount(t2) {
            this.pathForCount = null === t2 ? null : new m(t2);
          }
          constructor() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            super(), this.pathForCount = null, this.name = t2;
          }
          toString() {
            if (null != this.name) return "var(" + this.name + ")";
            return "read_count(" + this.pathStringForCount + ")";
          }
        };
        class ft extends V {
          get name() {
            return this.path.join(".");
          }
          get path() {
            return this.pathIdentifiers.map(((t2) => t2.name)).filter(c);
          }
          get identifier() {
            if (!this.pathIdentifiers || 0 == this.pathIdentifiers.length) return null;
            const t2 = this.path.join(".");
            return new ct(t2);
          }
          get runtimeVarRef() {
            return this._runtimeVarRef;
          }
          constructor(t2) {
            super(), this.pathIdentifiers = t2, this._runtimeVarRef = null, this.isConstantReference = false, this.isListItemReference = false, this.GenerateIntoContainer = (t3) => {
              let e2 = this.story.constants.get(this.name);
              if (e2) return e2.GenerateConstantIntoContainer(t3), void (this.isConstantReference = true);
              if (this._runtimeVarRef = new mt(this.name), 1 === this.path.length || 2 === this.path.length) {
                let t4 = "", e3 = "";
                1 === this.path.length ? t4 = this.path[0] : (e3 = this.path[0], t4 = this.path[1]);
                this.story.ResolveListItem(e3, t4, this) && (this.isListItemReference = true);
              }
              t3.AddContent(this._runtimeVarRef);
            }, this.toString = () => `{${this.path.join(".")}}`;
          }
          get typeName() {
            return "ref";
          }
          ResolveReferences(t2) {
            if (super.ResolveReferences(t2), this.isConstantReference || this.isListItemReference) return;
            const e2 = new lt(this.pathIdentifiers), n2 = e2.ResolveFromContext(this);
            if (n2) {
              if (!n2.containerForCounting) throw new Error();
              if (n2.containerForCounting.visitsShouldBeCounted = true, null === this._runtimeVarRef) return;
              this._runtimeVarRef.pathForCount = n2.runtimePath, this._runtimeVarRef.name = null;
              let t3 = s(n2, dt);
              t3 && t3.isFunction && (this.parent instanceof Pt || this.parent instanceof pt || this.parent instanceof dt) && this.Warning(`'${t3.identifier}' being used as read count rather than being called as function. Perhaps you intended to write ${t3.identifier}()`);
            } else {
              if (this.path.length > 1) {
                let t3 = `Could not find target for read count: ${e2}`;
                return this.path.length <= 2 && (t3 += `, or couldn't find list item with the name ${this.path.join(",")}`), void this.Error(t3);
              }
              t2.ResolveVariableWithName(this.name, this).found || this.Error(`Unresolved variable: ${this.name}`, this);
            }
          }
        }
        class gt extends V {
          get proxyDivert() {
            return this._proxyDivert;
          }
          get name() {
            return this._proxyDivert.target.firstComponent || "";
          }
          get args() {
            return this._proxyDivert.args;
          }
          get runtimeDivert() {
            return this._proxyDivert.runtimeDivert;
          }
          get isChoiceCount() {
            return "CHOICE_COUNT" === this.name;
          }
          get isTurns() {
            return "TURNS" === this.name;
          }
          get isTurnsSince() {
            return "TURNS_SINCE" === this.name;
          }
          get isRandom() {
            return "RANDOM" === this.name;
          }
          get isSeedRandom() {
            return "SEED_RANDOM" === this.name;
          }
          get isListRange() {
            return "LIST_RANGE" === this.name;
          }
          get isListRandom() {
            return "LIST_RANDOM" === this.name;
          }
          get isReadCount() {
            return "READ_COUNT" === this.name;
          }
          constructor(t2, e2) {
            super(), this._divertTargetToCount = null, this._variableReferenceToCount = null, this.shouldPopReturnedValue = false, this.GenerateIntoContainer = (t3) => {
              const e3 = this.story.ResolveList(this.name);
              let n2 = false;
              if (this.isChoiceCount) this.args.length > 0 && this.Error("The CHOICE_COUNT() function shouldn't take any arguments"), t3.AddContent(D.ChoiceCount());
              else if (this.isTurns) this.args.length > 0 && this.Error("The TURNS() function shouldn't take any arguments"), t3.AddContent(D.Turns());
              else if (this.isTurnsSince || this.isReadCount) {
                const e4 = s(this.args[0], Ct), n3 = s(this.args[0], ft);
                if (1 !== this.args.length || null === e4 && null === n3) return void this.Error(`The ${this.name}() function should take one argument: a divert target to the target knot, stitch, gather or choice you want to check. e.g. TURNS_SINCE(-> myKnot)`);
                e4 ? (this._divertTargetToCount = e4, this.AddContent(this._divertTargetToCount), this._divertTargetToCount.GenerateIntoContainer(t3)) : n3 && (this._variableReferenceToCount = n3, this.AddContent(this._variableReferenceToCount), this._variableReferenceToCount.GenerateIntoContainer(t3)), this.isTurnsSince ? t3.AddContent(D.TurnsSince()) : t3.AddContent(D.ReadCount());
              } else if (this.isRandom) {
                2 !== this.args.length && this.Error("RANDOM should take 2 parameters: a minimum and a maximum integer");
                for (let e4 = 0; e4 < this.args.length; e4 += 1) {
                  const n3 = s(this.args[e4], M);
                  if (n3 && !n3.isInt()) {
                    const t4 = 0 === e4 ? "minimum" : "maximum";
                    this.Error(`RANDOM's ${t4} parameter should be an integer`);
                  }
                  this.args[e4].GenerateIntoContainer(t3);
                }
                t3.AddContent(D.Random());
              } else if (this.isSeedRandom) {
                1 !== this.args.length && this.Error("SEED_RANDOM should take 1 parameter - an integer seed");
                const e4 = s(this.args[0], M);
                e4 && !e4.isInt() && this.Error("SEED_RANDOM's parameter should be an integer seed"), this.args[0].GenerateIntoContainer(t3), t3.AddContent(D.SeedRandom());
              } else if (this.isListRange) {
                3 !== this.args.length && this.Error("LIST_RANGE should take 3 parameters - a list, a min and a max");
                for (let e4 = 0; e4 < this.args.length; e4 += 1) this.args[e4].GenerateIntoContainer(t3);
                t3.AddContent(D.ListRange());
              } else if (this.isListRandom) 1 !== this.args.length && this.Error("LIST_RANDOM should take 1 parameter - a list"), this.args[0].GenerateIntoContainer(t3), t3.AddContent(D.ListRandom());
              else if (B.CallExistsWithName(this.name)) {
                const e4 = B.CallWithName(this.name);
                if (e4.numberOfParameters !== this.args.length) {
                  let t4 = `${gt.name} should take ${e4.numberOfParameters} parameter`;
                  e4.numberOfParameters > 1 && (t4 += "s"), this.Error(t4);
                }
                for (let e5 = 0; e5 < this.args.length; e5 += 1) this.args[e5].GenerateIntoContainer(t3);
                t3.AddContent(B.CallWithName(this.name));
              } else if (null !== e3) if (this.args.length > 1 && this.Error("Can currently only construct a list from one integer (or an empty list from a given list definition)"), 1 === this.args.length) t3.AddContent(new O(this.name)), this.args[0].GenerateIntoContainer(t3), t3.AddContent(D.ListFromInt());
              else {
                const e4 = new E();
                e4.SetInitialOriginName(this.name), t3.AddContent(new R(e4));
              }
              else t3.AddContent(this._proxyDivert.runtimeObject), n2 = true;
              n2 || this.content.splice(this.content.indexOf(this._proxyDivert), 1), this.shouldPopReturnedValue && t3.AddContent(D.PopEvaluatedValue());
            }, this.toString = () => {
              const t3 = this.args.join(", ");
              return `${this.name}(${t3})`;
            }, this._proxyDivert = new St(new lt(t2), e2), this._proxyDivert.isFunctionCall = true, this.AddContent(this._proxyDivert);
          }
          get typeName() {
            return "FunctionCall";
          }
          ResolveReferences(t2) {
            if (super.ResolveReferences(t2), !this.content.includes(this._proxyDivert) && null !== this.args) for (const e2 of this.args) e2.ResolveReferences(t2);
            if (this._divertTargetToCount) {
              const t3 = this._divertTargetToCount.divert, e2 = null != t3.runtimeDivert.variableDivertName;
              if (e2) return void this.Error(`When getting the TURNS_SINCE() of a variable target, remove the '->' - i.e. it should just be TURNS_SINCE(${t3.runtimeDivert.variableDivertName})`);
              const n2 = t3.targetContent;
              if (null === n2) e2 || this.Error(`Failed to find target for TURNS_SINCE: '${t3.target}'`);
              else {
                if (!n2.containerForCounting) throw new Error();
                n2.containerForCounting.turnIndexShouldBeCounted = true;
              }
            } else if (this._variableReferenceToCount) {
              const t3 = this._variableReferenceToCount.runtimeVarRef;
              if (!t3) throw new Error();
              null !== t3.pathForCount && this.Error(`Should be '${gt.name}'(-> '${this._variableReferenceToCount.name}). Usage without the '->' only makes sense for variable targets.`);
            }
          }
        }
        gt.IsBuiltIn = (t2) => !!B.CallExistsWithName(t2) || ("CHOICE_COUNT" === t2 || "TURNS_SINCE" === t2 || "TURNS" === t2 || "RANDOM" === t2 || "SEED_RANDOM" === t2 || "LIST_VALUE" === t2 || "LIST_RANDOM" === t2 || "READ_COUNT" === t2);
        class vt extends V {
          get subExpressions() {
            return this.content;
          }
          constructor(t2) {
            super(), this.GenerateIntoContainer = (t3) => {
              let e2 = true;
              for (const n2 of this.subExpressions) n2.GenerateIntoContainer(t3), e2 || t3.AddContent(B.CallWithName("&&")), e2 = false;
            }, this.AddContent(t2);
          }
          get typeName() {
            return "MultipleConditionExpression";
          }
        }
        class Ct extends V {
          get runtimeDivert() {
            if (!this._runtimeDivert) throw new Error();
            return this._runtimeDivert;
          }
          get runtimeDivertTargetValue() {
            if (!this._runtimeDivertTargetValue) throw new Error();
            return this._runtimeDivertTargetValue;
          }
          constructor(t2) {
            super(), this._runtimeDivert = null, this._runtimeDivertTargetValue = null, this.GenerateIntoContainer = (t3) => {
              this.divert.GenerateRuntimeObject(), this._runtimeDivert = this.divert.runtimeDivert, this._runtimeDivertTargetValue = new F(), t3.AddContent(this.runtimeDivertTargetValue);
            }, this.Equals = (t3) => {
              const e2 = s(t3, Ct);
              if (!e2 || !this.divert.target || !e2.divert.target) return false;
              return this.divert.target.dotSeparatedComponents === e2.divert.target.dotSeparatedComponents;
            }, this.divert = this.AddContent(t2);
          }
          get typeName() {
            return "DivertTarget";
          }
          ResolveReferences(t2) {
            if (super.ResolveReferences(t2), this.divert.isDone || this.divert.isEnd) return void this.Error("Can't use -> DONE or -> END as variable divert targets", this);
            let e2 = this;
            for (; e2 && e2 instanceof V; ) {
              let t3 = false, n3 = false;
              const i2 = e2.parent;
              if (i2 instanceof $) {
                const e3 = i2;
                "==" !== e3.opName && "!=" !== e3.opName ? t3 = true : (e3.leftExpression instanceof Ct || e3.leftExpression instanceof ft) && (e3.rightExpression instanceof Ct || e3.rightExpression instanceof ft) || (t3 = true), n3 = true;
              } else if (i2 instanceof gt) {
                const e3 = i2;
                e3.isTurnsSince || e3.isReadCount || (t3 = true), n3 = true;
              } else (i2 instanceof V || i2 instanceof vt || i2 instanceof Y && i2.condition === e2 || i2 instanceof it || i2 instanceof Nt) && (t3 = true, n3 = true);
              if (t3 && this.Error(`Can't use a divert target like that. Did you intend to call '${this.divert.target}' as a function: likeThis(), or check the read count: likeThis, with no arrows?`, this), n3) break;
              e2 = i2;
            }
            if (this.runtimeDivert.hasVariableTarget) {
              if (!this.divert.target) throw new Error();
              this.Error(`Since '${this.divert.target.dotSeparatedComponents}' is a variable, it shouldn't be preceded by '->' here.`);
            }
            this.runtimeDivert.targetPath && (this.runtimeDivertTargetValue.targetPath = this.runtimeDivert.targetPath);
            let n2 = this.divert.targetContent;
            if (null !== n2) {
              let t3 = n2.containerForCounting;
              if (null !== t3) {
                const e4 = s(this.parent, gt);
                e4 && e4.isTurnsSince || (t3.visitsShouldBeCounted = true), t3.turnIndexShouldBeCounted = true;
              }
              let e3 = s(n2, dt);
              if (null != e3 && null !== e3.args) for (const t4 of e3.args) t4.isByReference && this.Error(`Can't store a divert target to a knot or function that has by-reference arguments ('${e3.identifier}' has 'ref ${t4.identifier}').`);
            }
          }
        }
        class St extends d {
          get runtimeDivert() {
            if (!this._runtimeDivert) throw new Error();
            return this._runtimeDivert;
          }
          set runtimeDivert(t2) {
            this._runtimeDivert = t2;
          }
          get isEnd() {
            return Boolean(this.target && "END" === this.target.dotSeparatedComponents);
          }
          get isDone() {
            return Boolean(this.target && "DONE" === this.target.dotSeparatedComponents);
          }
          constructor(t2, e2) {
            super(), this.args = [], this.target = null, this.targetContent = null, this._runtimeDivert = null, this.isFunctionCall = false, this.isEmpty = false, this.isTunnel = false, this.isThread = false, this.GenerateRuntimeObject = () => {
              if (this.isEnd) return D.End();
              if (this.isDone) return D.Done();
              this.runtimeDivert = new J(), this.ResolveTargetContent(), this.CheckArgumentValidity();
              const t3 = null !== this.args && this.args.length > 0;
              if (t3 || this.isFunctionCall || this.isTunnel || this.isThread) {
                const e3 = new L();
                if (t3) {
                  this.isFunctionCall || e3.AddContent(D.EvalStart());
                  let t4 = null;
                  this.targetContent && (t4 = this.targetContent.args);
                  for (let n2 = 0; n2 < this.args.length; ++n2) {
                    const i2 = this.args[n2];
                    let r2 = null;
                    if (t4 && n2 < t4.length && (r2 = t4[n2]), r2 && r2.isByReference) {
                      const t5 = s(i2, ft);
                      if (!t5) {
                        this.Error(`Expected variable name to pass by reference to 'ref ${r2.identifier}' but saw ${i2}`);
                        break;
                      }
                      const n3 = new lt(t5.pathIdentifiers);
                      if (n3.ResolveFromContext(this)) {
                        this.Error(`can't pass a read count by reference. '${n3.dotSeparatedComponents}' is a knot/stitch/label, but '${this.target.dotSeparatedComponents}' requires the name of a VAR to be passed.`);
                        break;
                      }
                      const a2 = new W(t5.name);
                      e3.AddContent(a2);
                    } else i2.GenerateIntoContainer(e3);
                  }
                  this.isFunctionCall || e3.AddContent(D.EvalEnd());
                }
                return this.isThread ? e3.AddContent(D.StartThread()) : (this.isFunctionCall || this.isTunnel) && (this.runtimeDivert.pushesToStack = true, this.runtimeDivert.stackPushType = this.isFunctionCall ? v.Function : v.Tunnel), e3.AddContent(this.runtimeDivert), e3;
              }
              return this.runtimeDivert;
            }, this.PathAsVariableName = () => this.target ? this.target.firstComponent : null, this.ResolveTargetContent = () => {
              if (!this.isEmpty && !this.isEnd && null === this.targetContent) {
                let t3 = this.PathAsVariableName();
                if (null !== t3) {
                  const e3 = s(ut(this), dt);
                  if (e3) {
                    const n2 = e3.ResolveVariableWithName(t3, this);
                    if (n2.found) {
                      if (n2.isArgument && n2.ownerFlow && n2.ownerFlow.args) {
                        let e4 = n2.ownerFlow.args.find(((e5) => {
                          var n3;
                          return (null === (n3 = e5.identifier) || void 0 === n3 ? void 0 : n3.name) == t3;
                        }));
                        e4 && !e4.isDivertTarget && this.Error(`Since '${e4.identifier}' is used as a variable divert target (on ${this.debugMetadata}), it should be marked as: -> ${e4.identifier}`, n2.ownerFlow);
                      }
                      return void (this.runtimeDivert.variableDivertName = t3);
                    }
                  }
                }
                if (!this.target) throw new Error();
                this.targetContent = this.target.ResolveFromContext(this);
              }
            }, this.CheckArgumentValidity = () => {
              if (this.isEmpty) return;
              let t3 = 0;
              if (null !== this.args && this.args.length > 0 && (t3 = this.args.length), null === this.targetContent) return;
              const e3 = s(this.targetContent, dt);
              if (!(0 !== t3 || null !== e3 && e3.hasParameters)) return;
              if (null === e3 && t3 > 0) return void this.Error("target needs to be a knot or stitch in order to pass arguments");
              if (null !== e3 && (null === e3.args || !e3.args && t3 > 0)) return void this.Error(`target (${e3.name}) doesn't take parameters`);
              if (this.parent instanceof Ct) return void (t3 > 0 && this.Error("can't store arguments in a divert target variable"));
              const n2 = e3.args.length;
              if (n2 !== t3) {
                let i2;
                return i2 = 0 === t3 ? "but there weren't any passed to it" : t3 < n2 ? `but only got ${t3}` : `but got ${t3}`, void this.Error(`to '${e3.identifier}' requires ${n2} arguments, ${i2}`);
              }
              for (let t4 = 0; t4 < n2; ++t4) {
                const n3 = e3.args[t4], i2 = this.args[t4];
                if (n3.isDivertTarget) {
                  let t5 = s(i2, ft);
                  if (i2 instanceof Ct || null !== t5) {
                    if (t5) {
                      const e4 = new lt(t5.pathIdentifiers);
                      e4.ResolveFromContext(t5) && this.Error(`Passing read count of '${e4.dotSeparatedComponents}' instead of a divert target. You probably meant '${e4}'`);
                    }
                  } else this.Error(`Target '${e3.identifier}' expects a divert target for the parameter named -> ${n3.identifier} but saw ${i2}`, i2);
                }
              }
              null !== e3 || this.Error("Can't call as a function or with arguments unless it's a knot or stitch");
            }, this.CheckExternalArgumentValidity = (t3) => {
              const e3 = this.target ? this.target.firstComponent : null, n2 = t3.externals.get(e3);
              if (!n2) throw new Error("external not found");
              const i2 = n2.argumentNames.length;
              let r2 = 0;
              this.args && (r2 = this.args.length), r2 !== i2 && this.Error(`incorrect number of arguments sent to external function '${e3}'. Expected ${i2} but got ${r2}`);
            }, this.toString = () => {
              let t3 = "";
              return null === this.target ? "-> <empty divert>" : (t3 += this.target.toString(), this.isTunnel && (t3 += " ->"), this.isFunctionCall && (t3 += " ()"), t3);
            }, t2 && (this.target = t2), e2 && (this.args = e2, this.AddContent(e2));
          }
          get typeName() {
            return "Divert";
          }
          ResolveReferences(t2) {
            if (this.isEmpty || this.isEnd || this.isDone) return;
            if (!this.runtimeDivert) throw new Error();
            this.targetContent && (this.runtimeDivert.targetPath = this.targetContent.runtimePath), super.ResolveReferences(t2);
            let e2 = s(this.targetContent, dt);
            e2 && (!e2.isFunction && this.isFunctionCall ? super.Error(`${e2.identifier} hasn't been marked as a function, but it's being called as one. Do you need to declare the knot as '== function ${e2.identifier} =='?`) : !e2.isFunction || this.isFunctionCall || this.parent instanceof Ct || super.Error(e2.identifier + " can't be diverted to. It can only be called as a function since it's been marked as such: '" + e2.identifier + "(...)'"));
            const n2 = null !== this.targetContent;
            let i2 = false, r2 = false;
            if (!this.target) throw new Error();
            if (1 === this.target.numberOfComponents) {
              if (!this.target.firstComponent) throw new Error();
              if (i2 = gt.IsBuiltIn(this.target.firstComponent), r2 = t2.IsExternal(this.target.firstComponent), i2 || r2) return this.isFunctionCall || super.Error(`${this.target.firstComponent} must be called as a function: ~ ${this.target.firstComponent}()`), void (r2 && (this.runtimeDivert.isExternal = true, null !== this.args && (this.runtimeDivert.externalArgs = this.args.length), this.runtimeDivert.pushesToStack = false, this.runtimeDivert.targetPath = new m(this.target.firstComponent), this.CheckExternalArgumentValidity(t2)));
            }
            null == this.runtimeDivert.variableDivertName && (n2 || i2 || r2 || this.Error(`target not found: '${this.target}'`));
          }
          Error(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            e2 !== this && e2 ? super.Error(t2, e2) : this.isFunctionCall ? super.Error(`Function call ${t2}`, e2, n2) : super.Error(`Divert ${t2}`, e2, n2);
          }
        }
        class yt {
          constructor(t2, e2) {
            this.divert = t2, this.targetRuntimeObj = e2;
          }
        }
        class bt {
          constructor(t2, e2) {
            this.divert = t2, this.targetContent = e2;
          }
        }
        var wt;
        !(function(t2) {
          t2[t2.Stopping = 1] = "Stopping", t2[t2.Cycle = 2] = "Cycle", t2[t2.Shuffle = 4] = "Shuffle", t2[t2.Once = 8] = "Once";
        })(wt || (wt = {}));
        class Et extends d {
          constructor(t2, e2) {
            super(), this.sequenceType = e2, this._sequenceDivertsToResolve = [], this.GenerateRuntimeObject = () => {
              const t3 = new L();
              t3.visitsShouldBeCounted = true, t3.countingAtStartOnly = true, this._sequenceDivertsToResolve = [], t3.AddContent(D.EvalStart()), t3.AddContent(D.VisitIndex());
              const e3 = (this.sequenceType & wt.Once) > 0, n2 = (this.sequenceType & wt.Cycle) > 0, i2 = (this.sequenceType & wt.Stopping) > 0, r2 = (this.sequenceType & wt.Shuffle) > 0;
              let s2 = this.sequenceElements.length;
              if (e3 && (s2 += 1), i2 || e3 ? (t3.AddContent(new N(s2 - 1)), t3.AddContent(B.CallWithName("MIN"))) : n2 && (t3.AddContent(new N(this.sequenceElements.length)), t3.AddContent(B.CallWithName("%"))), r2) {
                const n3 = D.NoOp();
                if (e3 || i2) {
                  const e4 = i2 ? this.sequenceElements.length - 1 : this.sequenceElements.length;
                  t3.AddContent(D.Duplicate()), t3.AddContent(new N(e4)), t3.AddContent(B.CallWithName("=="));
                  const r4 = new J();
                  r4.isConditional = true, t3.AddContent(r4), this.AddDivertToResolve(r4, n3);
                }
                let r3 = this.sequenceElements.length;
                i2 && (r3 -= 1), t3.AddContent(new N(r3)), t3.AddContent(D.SequenceShuffleIndex()), (e3 || i2) && t3.AddContent(n3);
              }
              t3.AddContent(D.EvalEnd());
              const a2 = D.NoOp();
              for (let e4 = 0; e4 < s2; e4 += 1) {
                t3.AddContent(D.EvalStart()), t3.AddContent(D.Duplicate()), t3.AddContent(new N(e4)), t3.AddContent(B.CallWithName("==")), t3.AddContent(D.EvalEnd());
                const n3 = new J();
                let i3;
                if (n3.isConditional = true, t3.AddContent(n3), e4 < this.sequenceElements.length) {
                  i3 = this.sequenceElements[e4].runtimeObject;
                } else i3 = new L();
                i3.name = `s${e4}`, i3.InsertContent(D.PopEvaluatedValue(), 0);
                const r3 = new J();
                i3.AddContent(r3), t3.AddToNamedContentOnly(i3), this.AddDivertToResolve(n3, i3), this.AddDivertToResolve(r3, a2);
              }
              return t3.AddContent(a2), t3;
            }, this.AddDivertToResolve = (t3, e3) => {
              this._sequenceDivertsToResolve.push(new bt(t3, e3));
            }, this.sequenceType = e2, this.sequenceElements = [];
            for (const e3 of t2) {
              const t3 = e3.content;
              let n2 = null;
              n2 = null === t3 || 0 === t3.length ? e3 : new Pt(t3), this.sequenceElements.push(n2), this.AddContent(n2);
            }
          }
          get typeName() {
            return "Sequence";
          }
          ResolveReferences(t2) {
            super.ResolveReferences(t2);
            for (const t3 of this._sequenceDivertsToResolve) t3.divert.targetPath = t3.targetContent.path;
          }
        }
        class _t extends d {
          constructor() {
            super(...arguments), this._overrideDivertTarget = null, this._divertAfter = null, this.GenerateRuntimeObject = () => {
              const t2 = new L();
              if (t2.AddContent(D.EvalStart()), this.divertAfter) {
                const e2 = this.divertAfter.GenerateRuntimeObject(), n2 = e2;
                if (n2) {
                  const e3 = this.divertAfter.args;
                  if (null !== e3 && e3.length > 0) {
                    let e4 = -1, i3 = -1;
                    for (let t3 = 0; t3 < n2.content.length; t3 += 1) {
                      const r2 = n2.content[t3];
                      r2 && (-1 == e4 && r2.commandType === D.CommandType.EvalStart ? e4 = t3 : r2.commandType === D.CommandType.EvalEnd && (i3 = t3));
                    }
                    for (let r2 = e4 + 1; r2 < i3; r2 += 1) {
                      n2.content[r2].parent = null, t2.AddContent(n2.content[r2]);
                    }
                  }
                }
                let i2 = s(e2, J);
                if (null != i2 && i2.hasVariableTarget) {
                  let e3 = new mt(i2.variableDivertName);
                  t2.AddContent(e3);
                } else this._overrideDivertTarget = new F(), t2.AddContent(this._overrideDivertTarget);
              } else t2.AddContent(new j());
              return t2.AddContent(D.EvalEnd()), t2.AddContent(D.PopTunnel()), t2;
            }, this.toString = () => ` -> ${this._divertAfter}`;
          }
          get divertAfter() {
            return this._divertAfter;
          }
          set divertAfter(t2) {
            this._divertAfter = t2, this._divertAfter && this.AddContent(this._divertAfter);
          }
          get typeName() {
            return "TunnelOnwards";
          }
          ResolveReferences(t2) {
            super.ResolveReferences(t2), this.divertAfter && this.divertAfter.targetContent && (this._overrideDivertTarget.targetPath = this.divertAfter.targetContent.runtimePath);
          }
        }
        let Tt = class {
          constructor(t2, e2) {
            this._name = t2 || "", this._items = null, this._itemNameToValues = e2 || /* @__PURE__ */ new Map();
          }
          get name() {
            return this._name;
          }
          get items() {
            if (null == this._items) {
              this._items = /* @__PURE__ */ new Map();
              for (let [t2, e2] of this._itemNameToValues) {
                let n2 = new w(this.name, t2);
                this._items.set(n2.serialized(), e2);
              }
            }
            return this._items;
          }
          ValueForItem(t2) {
            if (!t2.itemName) return 0;
            let e2 = this._itemNameToValues.get(t2.itemName);
            return void 0 !== e2 ? e2 : 0;
          }
          ContainsItem(t2) {
            return !!t2.itemName && (t2.originName == this.name && this._itemNameToValues.has(t2.itemName));
          }
          ContainsItemWithName(t2) {
            return this._itemNameToValues.has(t2);
          }
          TryGetItemWithValue(t2, e2) {
            for (let [e3, n2] of this._itemNameToValues) if (n2 == t2) return { result: new w(this.name, e3), exists: true };
            return { result: w.Null, exists: false };
          }
          TryGetValueForItem(t2, e2) {
            if (!t2.itemName) return { result: 0, exists: false };
            let n2 = this._itemNameToValues.get(t2.itemName);
            return n2 ? { result: n2, exists: true } : { result: 0, exists: false };
          }
        };
        class xt extends d {
          get typeName() {
            return "ListDefinition";
          }
          get runtimeListDefinition() {
            var t2;
            const e2 = /* @__PURE__ */ new Map();
            for (const t3 of this.itemDefinitions) e2.has(t3.name) ? this.Error(`List '${this.identifier}' contains duplicate items called '${t3.name}'`) : e2.set(t3.name, t3.seriesValue);
            return new Tt((null === (t2 = this.identifier) || void 0 === t2 ? void 0 : t2.name) || "", e2);
          }
          constructor(t2) {
            super(), this.itemDefinitions = t2, this.identifier = null, this.variableAssignment = null, this._elementsByName = null, this.ItemNamed = (t3) => {
              if (null === this._elementsByName) {
                this._elementsByName = /* @__PURE__ */ new Map();
                for (const t4 of this.itemDefinitions) this._elementsByName.set(t4.name, t4);
              }
              return this._elementsByName.get(t3) || null;
            }, this.GenerateRuntimeObject = () => {
              var t3, e3;
              const n2 = new E();
              for (const e4 of this.itemDefinitions) if (e4.inInitialList) {
                const i2 = new w((null === (t3 = this.identifier) || void 0 === t3 ? void 0 : t3.name) || null, e4.name || null);
                n2.Add(i2, e4.seriesValue);
              }
              return n2.SetInitialOriginName((null === (e3 = this.identifier) || void 0 === e3 ? void 0 : e3.name) || ""), new R(n2);
            };
            let e2 = 1;
            for (const t3 of this.itemDefinitions) null !== t3.explicitValue && (e2 = t3.explicitValue), t3.seriesValue = e2, e2 += 1;
            this.AddContent(t2);
          }
          ResolveReferences(t2) {
            super.ResolveReferences(t2), t2.CheckForNamingCollisions(this, this.identifier, z.List);
          }
        }
        class At extends d {
          get variableName() {
            return this.variableIdentifier.name;
          }
          get typeName() {
            return this.isNewTemporaryDeclaration ? "temp" : this.isGlobalDeclaration ? null !== this.listDefinition ? "LIST" : "VAR" : "variable assignment";
          }
          get isDeclaration() {
            return this.isGlobalDeclaration || this.isNewTemporaryDeclaration;
          }
          constructor(t2) {
            let { assignedExpression: e2, isGlobalDeclaration: n2, isTemporaryNewDeclaration: i2, listDef: r2, variableIdentifier: s2 } = t2;
            super(), this._runtimeAssignment = null, this.expression = null, this.listDefinition = null, this.GenerateRuntimeObject = () => {
              let t3 = null;
              if (this.isGlobalDeclaration ? t3 = this.story : this.isNewTemporaryDeclaration && (t3 = ut(this)), t3 && t3.AddNewVariableDeclaration(this), this.isGlobalDeclaration) return null;
              const e3 = new L();
              return this.expression ? e3.AddContent(this.expression.runtimeObject) : this.listDefinition && e3.AddContent(this.listDefinition.runtimeObject), this._runtimeAssignment = new X(this.variableName, this.isNewTemporaryDeclaration), e3.AddContent(this._runtimeAssignment), e3;
            }, this.toString = () => `${this.isGlobalDeclaration ? "VAR" : this.isNewTemporaryDeclaration ? "~ temp" : ""} ${this.variableName}`, this.variableIdentifier = s2, this.isGlobalDeclaration = Boolean(n2), this.isNewTemporaryDeclaration = Boolean(i2), r2 instanceof xt ? (this.listDefinition = this.AddContent(r2), this.listDefinition.variableAssignment = this, this.isGlobalDeclaration = true) : e2 && (this.expression = this.AddContent(e2));
          }
          ResolveReferences(t2) {
            if (super.ResolveReferences(t2), this.isDeclaration && null === this.listDefinition && t2.CheckForNamingCollisions(this, this.variableIdentifier, this.isGlobalDeclaration ? z.Var : z.Temp), this.isGlobalDeclaration) {
              const t3 = s(this.expression, ft);
              !t3 || t3.isConstantReference || t3.isListItemReference || this.Error("global variable assignments cannot refer to other variables, only literal values, constants and list items");
            }
            if (!this.isNewTemporaryDeclaration) {
              const e2 = t2.ResolveVariableWithName(this.variableName, this);
              e2.found || (this.variableName in this.story.constants ? this.Error(`Can't re-assign to a constant (do you need to use VAR when declaring '${this.variableName}'?)`, this) : this.Error(`Variable could not be found to assign to: '${this.variableName}'`, this)), this._runtimeAssignment && (this._runtimeAssignment.isGlobal = e2.isGlobal);
            }
          }
        }
        class Pt extends d {
          get rootContainer() {
            return this._rootContainer || (this._rootContainer = this.GenerateRuntimeObject()), this._rootContainer;
          }
          get namedWeavePoints() {
            return this._namedWeavePoints;
          }
          get lastParsedSignificantObject() {
            if (0 === this.content.length) return null;
            let t2 = null;
            for (let e3 = this.content.length - 1; e3 >= 0; --e3) {
              t2 = this.content[e3];
              let n2 = s(t2, rt);
              if ((!n2 || "\n" !== n2.text) && !this.IsGlobalDeclaration(t2)) break;
            }
            const e2 = s(t2, Pt);
            return e2 && (t2 = e2.lastParsedSignificantObject), t2;
          }
          constructor(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
            super(), this.previousWeavePoint = null, this.addContentToPreviousWeavePoint = false, this.hasSeenChoiceInSection = false, this.currentContainer = null, this._unnamedGatherCount = 0, this._choiceCount = 0, this._rootContainer = null, this._namedWeavePoints = /* @__PURE__ */ new Map(), this.looseEnds = [], this.gatherPointsToResolve = [], this.ResolveWeavePointNaming = () => {
              var t3, e3, n2;
              const i2 = [...this.FindAll(ot)(((t4) => !(null === t4.name || void 0 === t4.name))), ...this.FindAll(Y)(((t4) => !(null === t4.name || void 0 === t4.name)))];
              this._namedWeavePoints = /* @__PURE__ */ new Map();
              for (const r2 of i2) {
                const i3 = this.namedWeavePoints.get((null === (t3 = r2.identifier) || void 0 === t3 ? void 0 : t3.name) || "");
                if (i3) {
                  const t4 = i3 instanceof ot ? "gather" : "choice", e4 = i3;
                  this.Error(`A ${t4} with the same label name '${r2.name}' already exists in this context on line ${e4.debugMetadata ? e4.debugMetadata.startLineNumber : "NO DEBUG METADATA AVAILABLE"}`, r2);
                }
                (null === (e3 = r2.identifier) || void 0 === e3 ? void 0 : e3.name) && this.namedWeavePoints.set(null === (n2 = r2.identifier) || void 0 === n2 ? void 0 : n2.name, r2);
              }
            }, this.ConstructWeaveHierarchyFromIndentation = () => {
              let t3 = 0;
              for (; t3 < this.content.length; ) {
                const e3 = this.content[t3];
                if (e3 instanceof Y || e3 instanceof ot) {
                  const n2 = e3.indentationDepth - 1;
                  if (n2 > this.baseIndentIndex) {
                    let e4 = t3;
                    for (; t3 < this.content.length; ) {
                      const e5 = s(this.content[t3], Y) || s(this.content[t3], ot);
                      if (null !== e5) {
                        if (e5.indentationDepth - 1 <= this.baseIndentIndex) break;
                      }
                      t3 += 1;
                    }
                    const i2 = t3 - e4, r2 = this.content.slice(e4, e4 + i2);
                    this.content.splice(e4, i2);
                    const a2 = new Pt(r2, n2);
                    this.InsertContent(e4, a2), t3 = e4;
                  }
                }
                t3 += 1;
              }
            }, this.DetermineBaseIndentationFromContent = (t3) => {
              for (const e3 of t3) if (e3 instanceof Y || e3 instanceof ot) return e3.indentationDepth - 1;
              return 0;
            }, this.GenerateRuntimeObject = () => {
              this._rootContainer = new L(), this.currentContainer = this._rootContainer, this.looseEnds = [], this.gatherPointsToResolve = [];
              for (const t3 of this.content) if (t3 instanceof Y || t3 instanceof ot) this.AddRuntimeForWeavePoint(t3);
              else if (t3 instanceof Pt) {
                const e3 = t3;
                this.AddRuntimeForNestedWeave(e3), this.gatherPointsToResolve.splice(0, 0, ...e3.gatherPointsToResolve);
              } else this.AddGeneralRuntimeContent(t3.runtimeObject);
              return this.PassLooseEndsToAncestors(), this._rootContainer;
            }, this.AddRuntimeForGather = (t3) => {
              const e3 = !this.hasSeenChoiceInSection;
              this.hasSeenChoiceInSection = false;
              const n2 = t3.runtimeContainer;
              if (t3.name || (n2.name = `g-${this._unnamedGatherCount}`, this._unnamedGatherCount += 1), e3) {
                if (!this.currentContainer) throw new Error();
                this.currentContainer.AddContent(n2);
              } else this.rootContainer.AddToNamedContentOnly(n2);
              for (const e4 of this.looseEnds) {
                const i2 = e4;
                if (i2 instanceof ot) {
                  if (i2.indentationDepth == t3.indentationDepth) continue;
                }
                let r2 = null;
                if (i2 instanceof St) r2 = i2.runtimeObject;
                else {
                  r2 = new J();
                  const t4 = i2;
                  if (!t4.runtimeContainer) throw new Error();
                  t4.runtimeContainer.AddContent(r2);
                }
                this.gatherPointsToResolve.push(new yt(r2, n2));
              }
              this.looseEnds = [], this.currentContainer = n2;
            }, this.AddRuntimeForWeavePoint = (t3) => {
              if (t3 instanceof ot) this.AddRuntimeForGather(t3);
              else if (t3 instanceof Y) {
                if (!this.currentContainer) throw new Error();
                this.previousWeavePoint instanceof ot && this.looseEnds.splice(this.looseEnds.indexOf(this.previousWeavePoint), 1);
                const e3 = t3;
                if (this.currentContainer.AddContent(e3.runtimeObject), !e3.innerContentContainer) throw new Error();
                e3.innerContentContainer.name = `c-${this._choiceCount}`, this.currentContainer.AddToNamedContentOnly(e3.innerContentContainer), this._choiceCount += 1, this.hasSeenChoiceInSection = true;
              }
              if (this.addContentToPreviousWeavePoint = false, this.WeavePointHasLooseEnd(t3)) {
                this.looseEnds.push(t3);
                s(t3, Y) && (this.addContentToPreviousWeavePoint = true);
              }
              this.previousWeavePoint = t3;
            }, this.AddRuntimeForNestedWeave = (t3) => {
              this.AddGeneralRuntimeContent(t3.rootContainer), null !== this.previousWeavePoint && (this.looseEnds.splice(this.looseEnds.indexOf(this.previousWeavePoint), 1), this.addContentToPreviousWeavePoint = false);
            }, this.AddGeneralRuntimeContent = (t3) => {
              if (null !== t3) if (this.addContentToPreviousWeavePoint) {
                if (!this.previousWeavePoint || !this.previousWeavePoint.runtimeContainer) throw new Error();
                this.previousWeavePoint.runtimeContainer.AddContent(t3);
              } else {
                if (!this.currentContainer) throw new Error();
                this.currentContainer.AddContent(t3);
              }
            }, this.PassLooseEndsToAncestors = () => {
              if (0 === this.looseEnds.length) return;
              let t3 = null, e3 = null, n2 = false;
              for (let i2 = this.parent; null !== i2; i2 = i2.parent) {
                const r2 = s(i2, Pt);
                r2 && (n2 || null !== t3 || (t3 = r2), n2 && null === e3 && (e3 = r2)), (i2 instanceof Et || i2 instanceof it) && (n2 = true);
              }
              if (null !== t3 || null !== e3) for (let i2 = this.looseEnds.length - 1; i2 >= 0; i2 -= 1) {
                const r2 = this.looseEnds[i2];
                let s2 = false;
                if (n2) {
                  if (r2 instanceof Y && null !== t3) t3.ReceiveLooseEnd(r2), s2 = true;
                  else if (!(r2 instanceof Y)) {
                    const n3 = t3 || e3;
                    null !== n3 && (n3.ReceiveLooseEnd(r2), s2 = true);
                  }
                } else (null == t3 ? void 0 : t3.hasOwnProperty("ReceiveLooseEnd")) && t3.ReceiveLooseEnd(r2), s2 = true;
                s2 && this.looseEnds.splice(i2, 1);
              }
            }, this.ReceiveLooseEnd = (t3) => {
              this.looseEnds.push(t3);
            }, this.WeavePointNamed = (t3) => {
              if (!this.namedWeavePoints) return null;
              let e3 = this.namedWeavePoints.get(t3);
              return e3 || null;
            }, this.IsGlobalDeclaration = (t3) => {
              const e3 = s(t3, At);
              if (e3 && e3.isGlobalDeclaration && e3.isDeclaration) return true;
              return !!s(t3, st);
            }, this.ContentThatFollowsWeavePoint = (t3) => {
              const e3 = [], n2 = t3;
              if (null !== n2.content) for (const t4 of n2.content) this.IsGlobalDeclaration(t4) || e3.push(t4);
              const i2 = s(n2.parent, Pt);
              if (null === i2) throw new Error("Expected weave point parent to be weave?");
              for (let t4 = i2.content.indexOf(n2) + 1; t4 < i2.content.length; t4 += 1) {
                const n3 = i2.content[t4];
                if (!this.IsGlobalDeclaration(n3)) {
                  if (n3 instanceof Y || n3 instanceof ot) break;
                  if (n3 instanceof Pt) break;
                  e3.push(n3);
                }
              }
              return e3;
            }, this.ValidateTermination = (t3) => {
              if (this.lastParsedSignificantObject instanceof p) return;
              if (null !== this.looseEnds && this.looseEnds.length > 0) for (const e3 of this.looseEnds) {
                const n2 = this.ContentThatFollowsWeavePoint(e3);
                this.ValidateFlowOfObjectsTerminates(n2, e3, t3);
              }
              else {
                for (const t4 of this.content) if (t4 instanceof Y || t4 instanceof St) return;
                this.ValidateFlowOfObjectsTerminates(this.content, this, t3);
              }
            }, this.BadNestedTerminationHandler = (t3) => {
              let e3 = null;
              for (let n3 = t3.parent; null !== n3; n3 = n3.parent) if (n3 instanceof Et || n3 instanceof it) {
                e3 = s(n3, it);
                break;
              }
              let n2 = "Choices nested in conditionals or sequences need to explicitly divert afterwards.";
              if (null !== e3) {
                1 === e3.FindAll(Y)().length && (n2 = `Choices with conditions should be written: '* {condition} choice'. Otherwise, ${n2.toLowerCase()}`);
              }
              this.Error(n2, t3);
            }, this.ValidateFlowOfObjectsTerminates = (t3, e3, n2) => {
              let i2 = false, r2 = e3;
              for (const e4 of t3) {
                if (null !== e4.Find(St)(((t4) => !(t4.isThread || t4.isTunnel || t4.isFunctionCall || t4.parent instanceof Ct))) && (i2 = true), null != e4.Find(_t)()) {
                  i2 = true;
                  break;
                }
                r2 = e4;
              }
              if (!i2) {
                if (r2 instanceof p) return;
                n2(r2);
              }
            }, this.WeavePointHasLooseEnd = (t3) => {
              if (null === t3.content) return true;
              for (let e3 = t3.content.length - 1; e3 >= 0; --e3) {
                let n2 = s(t3.content[e3], St);
                if (n2) {
                  if (!(n2.isThread || n2.isTunnel || n2.isFunctionCall)) return false;
                }
              }
              return true;
            }, this.CheckForWeavePointNamingCollisions = () => {
              if (!this.namedWeavePoints) return;
              const t3 = [];
              for (const e3 of this.ancestry) {
                const n2 = s(e3, dt);
                if (!n2) break;
                t3.push(n2);
              }
              for (const [e3, n2] of this.namedWeavePoints) for (const i2 of t3) {
                const t4 = i2.ContentWithNameAtLevel(e3);
                if (t4 && t4 !== n2) {
                  const i3 = `${n2.GetType()} '${e3}' has the same label name as a ${t4.GetType()} (on ${t4.debugMetadata})`;
                  this.Error(i3, n2);
                }
              }
            }, this.baseIndentIndex = -1 == e2 ? this.DetermineBaseIndentationFromContent(t2) : e2, this.AddContent(t2), this.ConstructWeaveHierarchyFromIndentation();
          }
          get typeName() {
            return "Weave";
          }
          ResolveReferences(t2) {
            if (super.ResolveReferences(t2), null !== this.looseEnds && this.looseEnds.length > 0) {
              let t3 = false;
              for (let e2 = this.parent; null !== e2; e2 = e2.parent) if (e2 instanceof Et || e2 instanceof it) {
                t3 = true;
                break;
              }
              t3 && this.ValidateTermination(this.BadNestedTerminationHandler);
            }
            for (const t3 of this.gatherPointsToResolve) t3.divert.targetPath = t3.targetRuntimeObj.path;
            this.CheckForWeavePointNamingCollisions();
          }
        }
        class Nt extends d {
          get ownExpression() {
            return this._ownExpression;
          }
          set ownExpression(t2) {
            this._ownExpression = t2, this._ownExpression && this.AddContent(this._ownExpression);
          }
          constructor(t2) {
            super(), this._contentContainer = null, this._conditionalDivert = null, this._ownExpression = null, this._innerWeave = null, this.isTrueBranch = false, this.matchingEquality = false, this.isElse = false, this.isInline = false, this.returnDivert = null, this.GenerateRuntimeObject = () => {
              if (this._innerWeave) for (const t4 of this._innerWeave.content) {
                const e3 = s(t4, rt);
                e3 && e3.text.startsWith("else:") && this.Warning("Saw the text 'else:' which is being treated as content. Did you mean '- else:'?", e3);
              }
              const t3 = new L(), e2 = this.matchingEquality && !this.isElse;
              if (e2 && t3.AddContent(D.Duplicate()), this._conditionalDivert = new J(), this._conditionalDivert.isConditional = !this.isElse, !this.isTrueBranch && !this.isElse) {
                const e3 = null !== this.ownExpression;
                e3 && t3.AddContent(D.EvalStart()), this.ownExpression && this.ownExpression.GenerateIntoContainer(t3), this.matchingEquality && t3.AddContent(B.CallWithName("==")), e3 && t3.AddContent(D.EvalEnd());
              }
              return t3.AddContent(this._conditionalDivert), this._contentContainer = this.GenerateRuntimeForContent(), this._contentContainer.name = "b", this.isInline || this._contentContainer.InsertContent(new O("\n"), 0), (e2 || this.isElse && this.matchingEquality) && this._contentContainer.InsertContent(D.PopEvaluatedValue(), 0), t3.AddToNamedContentOnly(this._contentContainer), this.returnDivert = new J(), this._contentContainer.AddContent(this.returnDivert), t3;
            }, this.GenerateRuntimeForContent = () => null === this._innerWeave ? new L() : this._innerWeave.rootContainer, t2 && (this._innerWeave = new Pt(t2), this.AddContent(this._innerWeave));
          }
          get typeName() {
            return "ConditionalSingleBranch";
          }
          ResolveReferences(t2) {
            if (!this._conditionalDivert || !this._contentContainer) throw new Error();
            this._conditionalDivert.targetPath = this._contentContainer.path, super.ResolveReferences(t2);
          }
        }
        var It;
        !(function(t2) {
          t2[t2.ParsingString = 1] = "ParsingString", t2[t2.TagActive = 2] = "TagActive";
        })(It || (It = {}));
        class Ot {
          constructor() {
            this.startLineNumber = 0, this.endLineNumber = 0, this.startCharacterNumber = 0, this.endCharacterNumber = 0, this.fileName = null, this.sourceName = null;
          }
          Merge(t2) {
            let e2 = new Ot();
            return e2.fileName = this.fileName, e2.sourceName = this.sourceName, this.startLineNumber < t2.startLineNumber ? (e2.startLineNumber = this.startLineNumber, e2.startCharacterNumber = this.startCharacterNumber) : this.startLineNumber > t2.startLineNumber ? (e2.startLineNumber = t2.startLineNumber, e2.startCharacterNumber = t2.startCharacterNumber) : (e2.startLineNumber = this.startLineNumber, e2.startCharacterNumber = Math.min(this.startCharacterNumber, t2.startCharacterNumber)), this.endLineNumber > t2.endLineNumber ? (e2.endLineNumber = this.endLineNumber, e2.endCharacterNumber = this.endCharacterNumber) : this.endLineNumber < t2.endLineNumber ? (e2.endLineNumber = t2.endLineNumber, e2.endCharacterNumber = t2.endCharacterNumber) : (e2.endLineNumber = this.endLineNumber, e2.endCharacterNumber = Math.max(this.endCharacterNumber, t2.endCharacterNumber)), e2;
          }
          toString() {
            return null !== this.fileName ? `line ${this.startLineNumber} of ${this.fileName}"` : "line " + this.startLineNumber;
          }
        }
        class Ft extends d {
          get name() {
            var t2;
            return (null === (t2 = this.identifier) || void 0 === t2 ? void 0 : t2.name) || null;
          }
          constructor(t2, e2) {
            super(), this.identifier = t2, this.argumentNames = e2, this.GenerateRuntimeObject = () => (this.story.AddExternal(this), null);
          }
          get typeName() {
            return "EXTERNAL";
          }
          toString() {
            var t2;
            return `EXTERNAL ${null === (t2 = this.identifier) || void 0 === t2 ? void 0 : t2.name}`;
          }
        }
        class Wt {
          constructor(t2, e2, n2) {
            this.name = t2, this.args = e2, this.isFunction = n2;
          }
        }
        class Rt extends d {
          constructor(t2) {
            super(), this._objToWrap = t2, this.GenerateRuntimeObject = () => this._objToWrap;
          }
        }
        let kt = class extends Rt {
          constructor(t2) {
            super(t2);
          }
          get typeName() {
            return "Glue";
          }
        };
        class Lt extends y {
          toString() {
            return "Glue";
          }
        }
        class Dt extends V {
          constructor(t2, e2, n2) {
            super(), this.varIdentifier = t2, this._runtimeAssignment = null, this.expression = null, this.GenerateIntoContainer = (t3) => {
              var e3, n3;
              t3.AddContent(new mt((null === (e3 = this.varIdentifier) || void 0 === e3 ? void 0 : e3.name) || null)), this.expression ? this.expression.GenerateIntoContainer(t3) : t3.AddContent(new N(1)), t3.AddContent(B.CallWithName(this.isInc ? "+" : "-")), this._runtimeAssignment = new X((null === (n3 = this.varIdentifier) || void 0 === n3 ? void 0 : n3.name) || null, false), t3.AddContent(this._runtimeAssignment);
            }, this.toString = () => {
              var t3, e3;
              return this.expression ? `${null === (t3 = this.varIdentifier) || void 0 === t3 ? void 0 : t3.name}${this.isInc ? " += " : " -= "}${this.expression}` : `${null === (e3 = this.varIdentifier) || void 0 === e3 ? void 0 : e3.name}` + (this.isInc ? "++" : "--");
            }, e2 instanceof V ? (this.expression = e2, this.AddContent(this.expression), this.isInc = Boolean(n2)) : this.isInc = e2;
          }
          get typeName() {
            return "IncDecExpression";
          }
          ResolveReferences(t2) {
            var e2;
            super.ResolveReferences(t2);
            const n2 = t2.ResolveVariableWithName((null === (e2 = this.varIdentifier) || void 0 === e2 ? void 0 : e2.name) || "", this);
            if (n2.found || this.Error(`variable for ${this.incrementDecrementWord} could not be found: '${this.varIdentifier}' after searching: {this.descriptionOfScope}`), !this._runtimeAssignment) throw new Error();
            this._runtimeAssignment.isGlobal = n2.isGlobal, this.parent instanceof Pt || this.parent instanceof dt || this.parent instanceof pt || this.Error(`Can't use ${this.incrementDecrementWord} as sub-expression`);
          }
          get incrementDecrementWord() {
            return this.isInc ? "increment" : "decrement";
          }
        }
        class Vt extends d {
          constructor(t2) {
            super(), this.includedStory = t2, this.GenerateRuntimeObject = () => null;
          }
          get typeName() {
            return "IncludedFile";
          }
        }
        class jt {
          constructor(t2, e2, n2) {
            this.type = t2, this.precedence = e2, this.requireWhitespace = n2, this.toString = () => this.type;
          }
        }
        class Bt extends dt {
          get flowLevel() {
            return at.Knot;
          }
          constructor(t2, e2, n2, i2) {
            super(t2, e2, n2, i2);
          }
          get typeName() {
            return this.isFunction ? "Function" : "Knot";
          }
          ResolveReferences(t2) {
            super.ResolveReferences(t2);
            let e2 = this.story;
            for (const t3 in this.subFlowsByName) {
              const n2 = e2.ContentWithNameAtLevel(t3, at.Knot, false);
              if (n2) {
                const e3 = this.subFlowsByName.get(t3), i2 = `Stitch '${e3 ? e3.name : "NO STITCH FOUND"}' has the same name as a knot (on ${n2.debugMetadata})`;
                this.Error(i2, e3);
              }
            }
          }
        }
        class Mt extends V {
          constructor(t2) {
            super(), this.itemIdentifierList = t2, this.GenerateIntoContainer = (t3) => {
              var e2, n2;
              const i2 = new E();
              if (null != this.itemIdentifierList) for (const t4 of this.itemIdentifierList) {
                const r2 = (null === (e2 = null == t4 ? void 0 : t4.name) || void 0 === e2 ? void 0 : e2.split(".")) || [];
                let s2 = null, a2 = "";
                r2.length > 1 ? (s2 = r2[0], a2 = r2[1]) : a2 = r2[0];
                const o2 = this.story.ResolveListItem(s2, a2, this);
                if (null === o2) null === s2 ? this.Error(`Could not find list definition that contains item '${t4}'`) : this.Error(`Could not find list item ${t4}`);
                else {
                  if (null == o2.parent) return void this.Error(`Could not find list definition for item ${t4}`);
                  s2 || (s2 = (null === (n2 = o2.parent.identifier) || void 0 === n2 ? void 0 : n2.name) || null);
                  const e3 = new w(s2, o2.name || null);
                  i2.has(e3.serialized()) ? this.Warning(`Duplicate of item '${t4}' in list.`) : i2.Add(e3, o2.seriesValue);
                }
              }
              t3.AddContent(new R(i2));
            };
          }
          get typeName() {
            return "List";
          }
        }
        class Gt extends d {
          get fullName() {
            var t2;
            const e2 = this.parent;
            if (null === e2) throw new Error("Can't get full name without a parent list.");
            return `${null === (t2 = e2.identifier) || void 0 === t2 ? void 0 : t2.name}.${this.name}`;
          }
          get typeName() {
            return "ListElement";
          }
          get name() {
            var t2;
            return (null === (t2 = this.indentifier) || void 0 === t2 ? void 0 : t2.name) || null;
          }
          constructor(t2, e2) {
            let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            super(), this.indentifier = t2, this.inInitialList = e2, this.explicitValue = n2, this.seriesValue = 0, this.parent = null, this.GenerateRuntimeObject = () => {
              throw new Error("Not implemented.");
            }, this.toString = () => this.fullName, this.parent = this.parent;
          }
          ResolveReferences(t2) {
            super.ResolveReferences(t2), t2.CheckForNamingCollisions(this, this.indentifier, z.ListItem);
          }
        }
        var $t;
        t.StatementLevel = void 0, ($t = t.StatementLevel || (t.StatementLevel = {}))[$t.InnerBlock = 0] = "InnerBlock", $t[$t.Stitch = 1] = "Stitch", $t[$t.Knot = 2] = "Knot", $t[$t.Top = 3] = "Top";
        class qt extends dt {
          get flowLevel() {
            return at.Stitch;
          }
          constructor(t2, e2, n2, i2) {
            super(t2, e2, n2, i2), this.baseToString = this.toString, this.toString = () => `${null !== this.parent ? this.parent + " > " : ""}${this.baseToString()}`;
          }
          get typeName() {
            return "Stitch";
          }
        }
        let Ut = class extends y {
          constructor(t2) {
            super(), this.text = t2.toString() || "";
          }
          toString() {
            return "# " + this.text;
          }
        };
        class Kt extends y {
          constructor() {
            super(...arguments), this.text = "", this.index = 0, this.threadAtGeneration = null, this.sourcePath = "", this.targetPath = null, this.isInvisibleDefault = false, this.tags = null, this.originalThreadIndex = 0;
          }
          get pathStringOnChoice() {
            return null === this.targetPath ? S("Choice.targetPath") : this.targetPath.toString();
          }
          set pathStringOnChoice(t2) {
            this.targetPath = new m(t2);
          }
          Clone() {
            let t2 = new Kt();
            return t2.text = this.text, t2.sourcePath = this.sourcePath, t2.index = this.index, t2.targetPath = this.targetPath, t2.originalThreadIndex = this.originalThreadIndex, t2.isInvisibleDefault = this.isInvisibleDefault, null !== this.threadAtGeneration && (t2.threadAtGeneration = this.threadAtGeneration.Copy()), t2;
          }
        }
        class Ht {
          constructor(t2) {
            this._lists = /* @__PURE__ */ new Map(), this._allUnambiguousListValueCache = /* @__PURE__ */ new Map();
            for (let e2 of t2) {
              this._lists.set(e2.name, e2);
              for (let [t3, n2] of e2.items) {
                let e3 = w.fromSerializedKey(t3), i2 = new R(e3, n2);
                if (!e3.itemName) throw new Error("item.itemName is null or undefined.");
                this._allUnambiguousListValueCache.set(e3.itemName, i2), this._allUnambiguousListValueCache.set(e3.fullName, i2);
              }
            }
          }
          get lists() {
            let t2 = [];
            for (let [, e2] of this._lists) t2.push(e2);
            return t2;
          }
          TryListGetDefinition(t2, e2) {
            if (null === t2) return { result: e2, exists: false };
            let n2 = this._lists.get(t2);
            return n2 ? { result: n2, exists: true } : { result: e2, exists: false };
          }
          FindSingleItemListWithName(t2) {
            if (null === t2) return S("name");
            let e2 = this._allUnambiguousListValueCache.get(t2);
            return void 0 !== e2 ? e2 : null;
          }
        }
        class Jt {
          static JArrayToRuntimeObjList(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n2 = t2.length;
            e2 && n2--;
            let i2 = [];
            for (let e3 = 0; e3 < n2; e3++) {
              let n3 = t2[e3], r2 = this.JTokenToRuntimeObject(n3);
              if (null === r2) return S("runtimeObj");
              i2.push(r2);
            }
            return i2;
          }
          static WriteDictionaryRuntimeObjs(t2, e2) {
            t2.WriteObjectStart();
            for (let [n2, i2] of e2) t2.WritePropertyStart(n2), this.WriteRuntimeObject(t2, i2), t2.WritePropertyEnd();
            t2.WriteObjectEnd();
          }
          static WriteListRuntimeObjs(t2, e2) {
            t2.WriteArrayStart();
            for (let n2 of e2) this.WriteRuntimeObject(t2, n2);
            t2.WriteArrayEnd();
          }
          static WriteIntDictionary(t2, e2) {
            t2.WriteObjectStart();
            for (let [n2, i2] of e2) t2.WriteIntProperty(n2, i2);
            t2.WriteObjectEnd();
          }
          static WriteRuntimeObject(t2, e2) {
            let n2 = s(e2, L);
            if (n2) return void this.WriteRuntimeContainer(t2, n2);
            let i2 = s(e2, J);
            if (i2) {
              let e3, n3 = "->";
              return i2.isExternal ? n3 = "x()" : i2.pushesToStack && (i2.stackPushType == v.Function ? n3 = "f()" : i2.stackPushType == v.Tunnel && (n3 = "->t->")), e3 = i2.hasVariableTarget ? i2.variableDivertName : i2.targetPathString, t2.WriteObjectStart(), t2.WriteProperty(n3, e3), i2.hasVariableTarget && t2.WriteProperty("var", true), i2.isConditional && t2.WriteProperty("c", true), i2.externalArgs > 0 && t2.WriteIntProperty("exArgs", i2.externalArgs), void t2.WriteObjectEnd();
            }
            let r2 = s(e2, K);
            if (r2) return t2.WriteObjectStart(), t2.WriteProperty("*", r2.pathStringOnChoice), t2.WriteIntProperty("flg", r2.flags), void t2.WriteObjectEnd();
            let a2 = s(e2, P);
            if (a2) return void t2.WriteBool(a2.value);
            let o2 = s(e2, N);
            if (o2) return void t2.WriteInt(o2.value);
            let l2 = s(e2, I);
            if (l2) return void t2.WriteFloat(l2.value);
            let h2 = s(e2, O);
            if (h2) return void (h2.isNewline ? t2.Write("\n", false) : (t2.WriteStringStart(), t2.WriteStringInner("^"), t2.WriteStringInner(h2.value), t2.WriteStringEnd()));
            let u2 = s(e2, R);
            if (u2) return void this.WriteInkList(t2, u2);
            let c2 = s(e2, F);
            if (c2) return t2.WriteObjectStart(), null === c2.value ? S("divTargetVal.value") : (t2.WriteProperty("^->", c2.value.componentsString), void t2.WriteObjectEnd());
            let d2 = s(e2, W);
            if (d2) return t2.WriteObjectStart(), t2.WriteProperty("^var", d2.value), t2.WriteIntProperty("ci", d2.contextIndex), void t2.WriteObjectEnd();
            if (s(e2, Lt)) return void t2.Write("<>");
            let p2 = s(e2, D);
            if (p2) return void t2.Write(Jt._controlCommandNames[p2.commandType]);
            let m2 = s(e2, B);
            if (m2) {
              let e3 = m2.name;
              return "^" == e3 && (e3 = "L^"), void t2.Write(e3);
            }
            let f2 = s(e2, mt);
            if (f2) {
              t2.WriteObjectStart();
              let e3 = f2.pathStringForCount;
              return null != e3 ? t2.WriteProperty("CNT?", e3) : t2.WriteProperty("VAR?", f2.name), void t2.WriteObjectEnd();
            }
            let g2 = s(e2, X);
            if (g2) {
              t2.WriteObjectStart();
              let e3 = g2.isGlobal ? "VAR=" : "temp=";
              return t2.WriteProperty(e3, g2.variableName), g2.isNewDeclaration || t2.WriteProperty("re", true), void t2.WriteObjectEnd();
            }
            if (s(e2, j)) return void t2.Write("void");
            let C2 = s(e2, Ut);
            if (C2) return t2.WriteObjectStart(), t2.WriteProperty("#", C2.text), void t2.WriteObjectEnd();
            let y2 = s(e2, Kt);
            if (!y2) throw new Error("Failed to convert runtime object to Json token: " + e2);
            this.WriteChoice(t2, y2);
          }
          static JObjectToDictionaryRuntimeObjs(t2) {
            let e2 = /* @__PURE__ */ new Map();
            for (let n2 in t2) if (t2.hasOwnProperty(n2)) {
              let i2 = this.JTokenToRuntimeObject(t2[n2]);
              if (null === i2) return S("inkObject");
              e2.set(n2, i2);
            }
            return e2;
          }
          static JObjectToIntDictionary(t2) {
            let e2 = /* @__PURE__ */ new Map();
            for (let n2 in t2) t2.hasOwnProperty(n2) && e2.set(n2, parseInt(t2[n2]));
            return e2;
          }
          static JTokenToRuntimeObject(t2) {
            if ("number" == typeof t2 && !isNaN(t2) || "boolean" == typeof t2) return A.Create(t2);
            if ("string" == typeof t2) {
              let e2 = t2.toString();
              const n2 = /^([0-9]+.[0-9]+f)$/.exec(e2);
              if (n2) return new I(parseFloat(n2[0]));
              let i2 = e2[0];
              if ("^" == i2) return new O(e2.substring(1));
              if ("\n" == i2 && 1 == e2.length) return new O("\n");
              if ("<>" == e2) return new Lt();
              for (let t3 = 0; t3 < Jt._controlCommandNames.length; ++t3) {
                if (e2 == Jt._controlCommandNames[t3]) return new D(t3);
              }
              if ("L^" == e2 && (e2 = "^"), B.CallExistsWithName(e2)) return B.CallWithName(e2);
              if ("->->" == e2) return D.PopTunnel();
              if ("~ret" == e2) return D.PopFunction();
              if ("void" == e2) return new j();
            }
            if ("object" == typeof t2 && !Array.isArray(t2)) {
              let e2, n2 = t2;
              if (n2["^->"]) return e2 = n2["^->"], new F(new m(e2.toString()));
              if (n2["^var"]) {
                e2 = n2["^var"];
                let t3 = new W(e2.toString());
                return "ci" in n2 && (e2 = n2.ci, t3.contextIndex = parseInt(e2)), t3;
              }
              let i2 = false, r2 = false, s2 = v.Function, a2 = false;
              if ((e2 = n2["->"]) ? i2 = true : (e2 = n2["f()"]) ? (i2 = true, r2 = true, s2 = v.Function) : (e2 = n2["->t->"]) ? (i2 = true, r2 = true, s2 = v.Tunnel) : (e2 = n2["x()"]) && (i2 = true, a2 = true, r2 = false, s2 = v.Function), i2) {
                let t3 = new J();
                t3.pushesToStack = r2, t3.stackPushType = s2, t3.isExternal = a2;
                let i3 = e2.toString();
                return (e2 = n2.var) ? t3.variableDivertName = i3 : t3.targetPathString = i3, t3.isConditional = !!n2.c, a2 && (e2 = n2.exArgs) && (t3.externalArgs = parseInt(e2)), t3;
              }
              if (e2 = n2["*"]) {
                let t3 = new K();
                return t3.pathStringOnChoice = e2.toString(), (e2 = n2.flg) && (t3.flags = parseInt(e2)), t3;
              }
              if (e2 = n2["VAR?"]) return new mt(e2.toString());
              if (e2 = n2["CNT?"]) {
                let t3 = new mt();
                return t3.pathStringForCount = e2.toString(), t3;
              }
              let o2 = false, l2 = false;
              if ((e2 = n2["VAR="]) ? (o2 = true, l2 = true) : (e2 = n2["temp="]) && (o2 = true, l2 = false), o2) {
                let t3 = e2.toString(), i3 = !n2.re, r3 = new X(t3, i3);
                return r3.isGlobal = l2, r3;
              }
              if (void 0 !== n2["#"]) return e2 = n2["#"], new Ut(e2.toString());
              if (e2 = n2.list) {
                let t3 = e2, i3 = new E();
                if (e2 = n2.origins) {
                  let t4 = e2;
                  i3.SetInitialOriginNames(t4);
                }
                for (let e3 in t3) if (t3.hasOwnProperty(e3)) {
                  let n3 = t3[e3], r3 = new w(e3), s3 = parseInt(n3);
                  i3.Add(r3, s3);
                }
                return new R(i3);
              }
              if (null != n2.originalChoicePath) return this.JObjectToChoice(n2);
            }
            if (Array.isArray(t2)) return this.JArrayToContainer(t2);
            if (null == t2) return null;
            throw new Error("Failed to convert token to runtime object: " + this.toJson(t2, ["parent"]));
          }
          static toJson(t2, e2, n2) {
            return JSON.stringify(t2, ((t3, n3) => (null == e2 ? void 0 : e2.some(((e3) => e3 === t3))) ? void 0 : n3), n2);
          }
          static WriteRuntimeContainer(t2, e2) {
            let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (t2.WriteArrayStart(), null === e2) return S("container");
            for (let n3 of e2.content) this.WriteRuntimeObject(t2, n3);
            let i2 = e2.namedOnlyContent, r2 = e2.countFlags, a2 = null != e2.name && !n2, o2 = null != i2 || r2 > 0 || a2;
            if (o2 && t2.WriteObjectStart(), null != i2) for (let [e3, n3] of i2) {
              let i3 = e3, r3 = s(n3, L);
              t2.WritePropertyStart(i3), this.WriteRuntimeContainer(t2, r3, true), t2.WritePropertyEnd();
            }
            r2 > 0 && t2.WriteIntProperty("#f", r2), a2 && t2.WriteProperty("#n", e2.name), o2 ? t2.WriteObjectEnd() : t2.WriteNull(), t2.WriteArrayEnd();
          }
          static JArrayToContainer(t2) {
            let e2 = new L();
            e2.content = this.JArrayToRuntimeObjList(t2, true);
            let n2 = t2[t2.length - 1];
            if (null != n2) {
              let t3 = /* @__PURE__ */ new Map();
              for (let i2 in n2) if ("#f" == i2) e2.countFlags = parseInt(n2[i2]);
              else if ("#n" == i2) e2.name = n2[i2].toString();
              else {
                let e3 = this.JTokenToRuntimeObject(n2[i2]), r2 = s(e3, L);
                r2 && (r2.name = i2), t3.set(i2, e3);
              }
              e2.namedOnlyContent = t3;
            }
            return e2;
          }
          static JObjectToChoice(t2) {
            let e2 = new Kt();
            return e2.text = t2.text.toString(), e2.index = parseInt(t2.index), e2.sourcePath = t2.originalChoicePath.toString(), e2.originalThreadIndex = parseInt(t2.originalThreadIndex), e2.pathStringOnChoice = t2.targetPath.toString(), e2.tags = this.JArrayToTags(t2), e2.isInvisibleDefault = !!t2.isInvisibleDefault, e2;
          }
          static JArrayToTags(t2) {
            return t2.tags ? t2.tags : null;
          }
          static WriteChoice(t2, e2) {
            t2.WriteObjectStart(), t2.WriteProperty("text", e2.text), t2.WriteIntProperty("index", e2.index), t2.WriteProperty("originalChoicePath", e2.sourcePath), t2.WriteIntProperty("originalThreadIndex", e2.originalThreadIndex), t2.WriteProperty("targetPath", e2.pathStringOnChoice), t2.WriteProperty("isInvisibleDefault", e2.isInvisibleDefault), this.WriteChoiceTags(t2, e2), t2.WriteObjectEnd();
          }
          static WriteChoiceTags(t2, e2) {
            if (e2.tags && e2.tags.length > 0) {
              t2.WritePropertyStart("tags"), t2.WriteArrayStart();
              for (const n2 of e2.tags) t2.Write(n2);
              t2.WriteArrayEnd(), t2.WritePropertyEnd();
            }
          }
          static WriteInkList(t2, e2) {
            let n2 = e2.value;
            if (null === n2) return S("rawList");
            t2.WriteObjectStart(), t2.WritePropertyStart("list"), t2.WriteObjectStart();
            for (let [e3, i2] of n2) {
              let n3 = w.fromSerializedKey(e3), r2 = i2;
              if (null === n3.itemName) return S("item.itemName");
              t2.WritePropertyNameStart(), t2.WritePropertyNameInner(n3.originName ? n3.originName : "?"), t2.WritePropertyNameInner("."), t2.WritePropertyNameInner(n3.itemName), t2.WritePropertyNameEnd(), t2.Write(r2), t2.WritePropertyEnd();
            }
            if (t2.WriteObjectEnd(), t2.WritePropertyEnd(), 0 == n2.Count && null != n2.originNames && n2.originNames.length > 0) {
              t2.WritePropertyStart("origins"), t2.WriteArrayStart();
              for (let e3 of n2.originNames) t2.Write(e3);
              t2.WriteArrayEnd(), t2.WritePropertyEnd();
            }
            t2.WriteObjectEnd();
          }
          static ListDefinitionsToJToken(t2) {
            let e2 = {};
            for (let n2 of t2.lists) {
              let t3 = {};
              for (let [e3, i2] of n2.items) {
                let n3 = w.fromSerializedKey(e3);
                if (null === n3.itemName) return S("item.itemName");
                t3[n3.itemName] = i2;
              }
              e2[n2.name] = t3;
            }
            return e2;
          }
          static JTokenToListDefinitions(t2) {
            let e2 = t2, n2 = [];
            for (let t3 in e2) if (e2.hasOwnProperty(t3)) {
              let i2 = t3.toString(), r2 = e2[t3], s2 = /* @__PURE__ */ new Map();
              for (let n3 in r2) if (e2.hasOwnProperty(t3)) {
                let t4 = r2[n3];
                s2.set(n3, parseInt(t4));
              }
              let a2 = new Tt(i2, s2);
              n2.push(a2);
            }
            return new Ht(n2);
          }
        }
        Jt._controlCommandNames = (() => {
          let t2 = [];
          t2[D.CommandType.EvalStart] = "ev", t2[D.CommandType.EvalOutput] = "out", t2[D.CommandType.EvalEnd] = "/ev", t2[D.CommandType.Duplicate] = "du", t2[D.CommandType.PopEvaluatedValue] = "pop", t2[D.CommandType.PopFunction] = "~ret", t2[D.CommandType.PopTunnel] = "->->", t2[D.CommandType.BeginString] = "str", t2[D.CommandType.EndString] = "/str", t2[D.CommandType.NoOp] = "nop", t2[D.CommandType.ChoiceCount] = "choiceCnt", t2[D.CommandType.Turns] = "turn", t2[D.CommandType.TurnsSince] = "turns", t2[D.CommandType.ReadCount] = "readc", t2[D.CommandType.Random] = "rnd", t2[D.CommandType.SeedRandom] = "srnd", t2[D.CommandType.VisitIndex] = "visit", t2[D.CommandType.SequenceShuffleIndex] = "seq", t2[D.CommandType.StartThread] = "thread", t2[D.CommandType.Done] = "done", t2[D.CommandType.End] = "end", t2[D.CommandType.ListFromInt] = "listInt", t2[D.CommandType.ListRange] = "range", t2[D.CommandType.ListRandom] = "lrnd", t2[D.CommandType.BeginTag] = "#", t2[D.CommandType.EndTag] = "/#";
          for (let e2 = 0; e2 < D.CommandType.TOTAL_VALUES; ++e2) if (null == t2[e2]) throw new Error("Control command not accounted for in serialisation");
          return t2;
        })();
        class zt {
          get elements() {
            return this.callStack;
          }
          get depth() {
            return this.elements.length;
          }
          get currentElement() {
            let t2 = this._threads[this._threads.length - 1].callstack;
            return t2[t2.length - 1];
          }
          get currentElementIndex() {
            return this.callStack.length - 1;
          }
          get currentThread() {
            return this._threads[this._threads.length - 1];
          }
          set currentThread(t2) {
            f.Assert(1 == this._threads.length, "Shouldn't be directly setting the current thread when we have a stack of them"), this._threads.length = 0, this._threads.push(t2);
          }
          get canPop() {
            return this.callStack.length > 1;
          }
          constructor() {
            if (this._threadCounter = 0, this._startOfRoot = H.Null, arguments[0] instanceof re) {
              let t2 = arguments[0];
              this._startOfRoot = H.StartOf(t2.rootContentContainer), this.Reset();
            } else {
              let t2 = arguments[0];
              this._threads = [];
              for (let e2 of t2._threads) this._threads.push(e2.Copy());
              this._threadCounter = t2._threadCounter, this._startOfRoot = t2._startOfRoot.copy();
            }
          }
          Reset() {
            this._threads = [], this._threads.push(new zt.Thread()), this._threads[0].callstack.push(new zt.Element(v.Tunnel, this._startOfRoot));
          }
          SetJsonToken(t2, e2) {
            this._threads.length = 0;
            let n2 = t2.threads;
            for (let t3 of n2) {
              let n3 = t3, i2 = new zt.Thread(n3, e2);
              this._threads.push(i2);
            }
            this._threadCounter = parseInt(t2.threadCounter), this._startOfRoot = H.StartOf(e2.rootContentContainer);
          }
          WriteJson(t2) {
            t2.WriteObject(((t3) => {
              t3.WritePropertyStart("threads"), t3.WriteArrayStart();
              for (let e2 of this._threads) e2.WriteJson(t3);
              t3.WriteArrayEnd(), t3.WritePropertyEnd(), t3.WritePropertyStart("threadCounter"), t3.WriteInt(this._threadCounter), t3.WritePropertyEnd();
            }));
          }
          PushThread() {
            let t2 = this.currentThread.Copy();
            this._threadCounter++, t2.threadIndex = this._threadCounter, this._threads.push(t2);
          }
          ForkThread() {
            let t2 = this.currentThread.Copy();
            return this._threadCounter++, t2.threadIndex = this._threadCounter, t2;
          }
          PopThread() {
            if (!this.canPopThread) throw new Error("Can't pop thread");
            this._threads.splice(this._threads.indexOf(this.currentThread), 1);
          }
          get canPopThread() {
            return this._threads.length > 1 && !this.elementIsEvaluateFromGame;
          }
          get elementIsEvaluateFromGame() {
            return this.currentElement.type == v.FunctionEvaluationFromGame;
          }
          Push(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, i2 = new zt.Element(t2, this.currentElement.currentPointer, false);
            i2.evaluationStackHeightWhenPushed = e2, i2.functionStartInOutputStream = n2, this.callStack.push(i2);
          }
          CanPop() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return !!this.canPop && (null == t2 || this.currentElement.type == t2);
          }
          Pop() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            if (!this.CanPop(t2)) throw new Error("Mismatched push/pop in Callstack");
            this.callStack.pop();
          }
          GetTemporaryVariableWithName(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
            -1 == e2 && (e2 = this.currentElementIndex + 1);
            let n2 = T(this.callStack[e2 - 1].temporaryVariables, t2, null);
            return n2.exists ? n2.result : null;
          }
          SetTemporaryVariable(t2, e2, n2) {
            let i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -1;
            -1 == i2 && (i2 = this.currentElementIndex + 1);
            let r2 = this.callStack[i2 - 1];
            if (!n2 && !r2.temporaryVariables.get(t2)) throw new Error("Could not find temporary variable to set: " + t2);
            let s2 = T(r2.temporaryVariables, t2, null);
            s2.exists && R.RetainListOriginsForAssignment(s2.result, e2), r2.temporaryVariables.set(t2, e2);
          }
          ContextForVariableNamed(t2) {
            return this.currentElement.temporaryVariables.get(t2) ? this.currentElementIndex + 1 : 0;
          }
          ThreadWithIndex(t2) {
            let e2 = this._threads.filter(((e3) => {
              if (e3.threadIndex == t2) return e3;
            }));
            return e2.length > 0 ? e2[0] : null;
          }
          get callStack() {
            return this.currentThread.callstack;
          }
          get callStackTrace() {
            let t2 = new b();
            for (let e2 = 0; e2 < this._threads.length; e2++) {
              let n2 = this._threads[e2], i2 = e2 == this._threads.length - 1;
              t2.AppendFormat("=== THREAD {0}/{1} {2}===\n", e2 + 1, this._threads.length, i2 ? "(current) " : "");
              for (let e3 = 0; e3 < n2.callstack.length; e3++) {
                n2.callstack[e3].type == v.Function ? t2.Append("  [FUNCTION] ") : t2.Append("  [TUNNEL] ");
                let i3 = n2.callstack[e3].currentPointer;
                if (!i3.isNull) {
                  if (t2.Append("<SOMEWHERE IN "), null === i3.container) return S("pointer.container");
                  t2.Append(i3.container.path.toString()), t2.AppendLine(">");
                }
              }
            }
            return t2.toString();
          }
        }
        !(function(t2) {
          class e2 {
            constructor(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              this.evaluationStackHeightWhenPushed = 0, this.functionStartInOutputStream = 0, this.currentPointer = e3.copy(), this.inExpressionEvaluation = n3, this.temporaryVariables = /* @__PURE__ */ new Map(), this.type = t3;
            }
            Copy() {
              let t3 = new e2(this.type, this.currentPointer, this.inExpressionEvaluation);
              return t3.temporaryVariables = new Map(this.temporaryVariables), t3.evaluationStackHeightWhenPushed = this.evaluationStackHeightWhenPushed, t3.functionStartInOutputStream = this.functionStartInOutputStream, t3;
            }
          }
          t2.Element = e2;
          class n2 {
            constructor() {
              if (this.threadIndex = 0, this.previousPointer = H.Null, this.callstack = [], arguments[0] && arguments[1]) {
                let t3 = arguments[0], n3 = arguments[1];
                this.threadIndex = parseInt(t3.threadIndex);
                let i2 = t3.callstack;
                for (let t4 of i2) {
                  let i3, r3 = t4, s2 = parseInt(r3.type), a2 = H.Null, o2 = r3.cPath;
                  if (void 0 !== o2) {
                    i3 = o2.toString();
                    let t5 = n3.ContentAtPath(new m(i3));
                    if (a2.container = t5.container, a2.index = parseInt(r3.idx), null == t5.obj) throw new Error("When loading state, internal story location couldn't be found: " + i3 + ". Has the story changed since this save data was created?");
                    t5.approximate && (null !== a2.container ? n3.Warning("When loading state, exact internal story location couldn't be found: '" + i3 + "', so it was approximated to '" + a2.container.path.toString() + "' to recover. Has the story changed since this save data was created?") : n3.Warning("When loading state, exact internal story location couldn't be found: '" + i3 + "' and it may not be recoverable. Has the story changed since this save data was created?"));
                  }
                  let l2 = !!r3.exp, h2 = new e2(s2, a2, l2), u2 = r3.temp;
                  void 0 !== u2 ? h2.temporaryVariables = Jt.JObjectToDictionaryRuntimeObjs(u2) : h2.temporaryVariables.clear(), this.callstack.push(h2);
                }
                let r2 = t3.previousContentObject;
                if (void 0 !== r2) {
                  let t4 = new m(r2.toString());
                  this.previousPointer = n3.PointerAtPath(t4);
                }
              }
            }
            Copy() {
              let t3 = new n2();
              t3.threadIndex = this.threadIndex;
              for (let e3 of this.callstack) t3.callstack.push(e3.Copy());
              return t3.previousPointer = this.previousPointer.copy(), t3;
            }
            WriteJson(t3) {
              t3.WriteObjectStart(), t3.WritePropertyStart("callstack"), t3.WriteArrayStart();
              for (let e3 of this.callstack) {
                if (t3.WriteObjectStart(), !e3.currentPointer.isNull) {
                  if (null === e3.currentPointer.container) return S("el.currentPointer.container");
                  t3.WriteProperty("cPath", e3.currentPointer.container.path.componentsString), t3.WriteIntProperty("idx", e3.currentPointer.index);
                }
                t3.WriteProperty("exp", e3.inExpressionEvaluation), t3.WriteIntProperty("type", e3.type), e3.temporaryVariables.size > 0 && (t3.WritePropertyStart("temp"), Jt.WriteDictionaryRuntimeObjs(t3, e3.temporaryVariables), t3.WritePropertyEnd()), t3.WriteObjectEnd();
              }
              if (t3.WriteArrayEnd(), t3.WritePropertyEnd(), t3.WriteIntProperty("threadIndex", this.threadIndex), !this.previousPointer.isNull) {
                let e3 = this.previousPointer.Resolve();
                if (null === e3) return S("this.previousPointer.Resolve()");
                t3.WriteProperty("previousContentObject", e3.path.toString());
              }
              t3.WriteObjectEnd();
            }
          }
          t2.Thread = n2;
        })(zt || (zt = {}));
        class Xt extends class {
        } {
          variableChangedEvent(t2, e2) {
            for (let n2 of this.variableChangedEventCallbacks) n2(t2, e2);
          }
          StartVariableObservation() {
            this._batchObservingVariableChanges = true, this._changedVariablesForBatchObs = /* @__PURE__ */ new Set();
          }
          CompleteVariableObservation() {
            this._batchObservingVariableChanges = false;
            let t2 = /* @__PURE__ */ new Map();
            if (null != this._changedVariablesForBatchObs) for (let t3 of this._changedVariablesForBatchObs) {
              let e2 = this._globalVariables.get(t3);
              this.variableChangedEvent(t3, e2);
            }
            if (null != this.patch) for (let e2 of this.patch.changedVariables) {
              let n2 = this.patch.TryGetGlobal(e2, null);
              n2.exists && t2.set(e2, n2);
            }
            return this._changedVariablesForBatchObs = null, t2;
          }
          NotifyObservers(t2) {
            for (const [e2, n2] of t2) this.variableChangedEvent(e2, n2);
          }
          get callStack() {
            return this._callStack;
          }
          set callStack(t2) {
            this._callStack = t2;
          }
          $(t2, e2) {
            if (void 0 === e2) {
              let e3 = null;
              return null !== this.patch && (e3 = this.patch.TryGetGlobal(t2, null), e3.exists) ? e3.result.valueObject : (e3 = this._globalVariables.get(t2), void 0 === e3 && (e3 = this._defaultGlobalVariables.get(t2)), void 0 !== e3 ? e3.valueObject : null);
            }
            {
              if (void 0 === this._defaultGlobalVariables.get(t2)) throw new _("Cannot assign to a variable (" + t2 + ") that hasn't been declared in the story");
              let n2 = A.Create(e2);
              if (null == n2) throw null == e2 ? new Error("Cannot pass null to VariableState") : new Error("Invalid value passed to VariableState: " + e2.toString());
              this.SetGlobal(t2, n2);
            }
          }
          constructor(t2, e2) {
            super(), this.variableChangedEventCallbacks = [], this.patch = null, this._defaultGlobalVariables = /* @__PURE__ */ new Map(), this._changedVariablesForBatchObs = /* @__PURE__ */ new Set(), this._batchObservingVariableChanges = false, this._globalVariables = /* @__PURE__ */ new Map(), this._callStack = t2, this._listDefsOrigin = e2;
            try {
              return new Proxy(this, { get: (t3, e3) => e3 in t3 ? t3[e3] : t3.$(e3), set: (t3, e3, n2) => (e3 in t3 ? t3[e3] = n2 : t3.$(e3, n2), true), ownKeys: (t3) => [.../* @__PURE__ */ new Set([...t3._defaultGlobalVariables.keys(), ...t3._globalVariables.keys()])], getOwnPropertyDescriptor: (t3, e3) => ({ enumerable: true, configurable: true, value: t3.$(e3) }) });
            } catch (t3) {
            }
          }
          ApplyPatch() {
            if (null === this.patch) return S("this.patch");
            for (let [t2, e2] of this.patch.globals) this._globalVariables.set(t2, e2);
            if (null !== this._changedVariablesForBatchObs) for (let t2 of this.patch.changedVariables) this._changedVariablesForBatchObs.add(t2);
            this.patch = null;
          }
          SetJsonToken(t2) {
            this._globalVariables.clear();
            for (let [e2, n2] of this._defaultGlobalVariables) {
              let i2 = t2[e2];
              if (void 0 !== i2) {
                let t3 = Jt.JTokenToRuntimeObject(i2);
                if (null === t3) return S("tokenInkObject");
                this._globalVariables.set(e2, t3);
              } else this._globalVariables.set(e2, n2);
            }
          }
          WriteJson(t2) {
            t2.WriteObjectStart();
            for (let [e2, n2] of this._globalVariables) {
              let i2 = e2, r2 = n2;
              if (Xt.dontSaveDefaultValues && this._defaultGlobalVariables.has(i2)) {
                let t3 = this._defaultGlobalVariables.get(i2);
                if (this.RuntimeObjectsEqual(r2, t3)) continue;
              }
              t2.WritePropertyStart(i2), Jt.WriteRuntimeObject(t2, r2), t2.WritePropertyEnd();
            }
            t2.WriteObjectEnd();
          }
          RuntimeObjectsEqual(t2, e2) {
            if (null === t2) return S("obj1");
            if (null === e2) return S("obj2");
            if (t2.constructor !== e2.constructor) return false;
            let n2 = s(t2, P);
            if (null !== n2) return n2.value === a(e2, P).value;
            let i2 = s(t2, N);
            if (null !== i2) return i2.value === a(e2, N).value;
            let r2 = s(t2, I);
            if (null !== r2) return r2.value === a(e2, I).value;
            let o2 = s(t2, A), l2 = s(e2, A);
            if (null !== o2 && null !== l2) return h(o2.valueObject) && h(l2.valueObject) ? o2.valueObject.Equals(l2.valueObject) : o2.valueObject === l2.valueObject;
            throw new Error("FastRoughDefinitelyEquals: Unsupported runtime object type: " + t2.constructor.name);
          }
          GetVariableWithName(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1, n2 = this.GetRawVariableWithName(t2, e2), i2 = s(n2, W);
            return null !== i2 && (n2 = this.ValueAtVariablePointer(i2)), n2;
          }
          TryGetDefaultVariableValue(t2) {
            let e2 = T(this._defaultGlobalVariables, t2, null);
            return e2.exists ? e2.result : null;
          }
          GlobalVariableExistsWithName(t2) {
            return this._globalVariables.has(t2) || null !== this._defaultGlobalVariables && this._defaultGlobalVariables.has(t2);
          }
          GetRawVariableWithName(t2, e2) {
            let n2 = null;
            if (0 == e2 || -1 == e2) {
              let e3 = null;
              if (null !== this.patch && (e3 = this.patch.TryGetGlobal(t2, null), e3.exists)) return e3.result;
              if (e3 = T(this._globalVariables, t2, null), e3.exists) return e3.result;
              if (null !== this._defaultGlobalVariables && (e3 = T(this._defaultGlobalVariables, t2, null), e3.exists)) return e3.result;
              if (null === this._listDefsOrigin) return S("VariablesState._listDefsOrigin");
              let n3 = this._listDefsOrigin.FindSingleItemListWithName(t2);
              if (n3) return n3;
            }
            return n2 = this._callStack.GetTemporaryVariableWithName(t2, e2), n2;
          }
          ValueAtVariablePointer(t2) {
            return this.GetVariableWithName(t2.variableName, t2.contextIndex);
          }
          Assign(t2, e2) {
            let n2 = t2.variableName;
            if (null === n2) return S("name");
            let i2 = -1, r2 = false;
            if (r2 = t2.isNewDeclaration ? t2.isGlobal : this.GlobalVariableExistsWithName(n2), t2.isNewDeclaration) {
              let t3 = s(e2, W);
              if (null !== t3) {
                e2 = this.ResolveVariablePointer(t3);
              }
            } else {
              let t3 = null;
              do {
                t3 = s(this.GetRawVariableWithName(n2, i2), W), null != t3 && (n2 = t3.variableName, i2 = t3.contextIndex, r2 = 0 == i2);
              } while (null != t3);
            }
            r2 ? this.SetGlobal(n2, e2) : this._callStack.SetTemporaryVariable(n2, e2, t2.isNewDeclaration, i2);
          }
          SnapshotDefaultGlobals() {
            this._defaultGlobalVariables = new Map(this._globalVariables);
          }
          RetainListOriginsForAssignment(t2, e2) {
            let n2 = a(t2, R), i2 = a(e2, R);
            n2.value && i2.value && 0 == i2.value.Count && i2.value.SetInitialOriginNames(n2.value.originNames);
          }
          SetGlobal(t2, e2) {
            let n2 = null;
            if (null === this.patch && (n2 = T(this._globalVariables, t2, null)), null !== this.patch && (n2 = this.patch.TryGetGlobal(t2, null), n2.exists || (n2 = T(this._globalVariables, t2, null))), R.RetainListOriginsForAssignment(n2.result, e2), null === t2) return S("variableName");
            if (null !== this.patch ? this.patch.SetGlobal(t2, e2) : this._globalVariables.set(t2, e2), null !== this.variableChangedEvent && null !== n2 && e2 !== n2.result) if (this._batchObservingVariableChanges) {
              if (null === this._changedVariablesForBatchObs) return S("this._changedVariablesForBatchObs");
              null !== this.patch ? this.patch.AddChangedVariable(t2) : null !== this._changedVariablesForBatchObs && this._changedVariablesForBatchObs.add(t2);
            } else this.variableChangedEvent(t2, e2);
          }
          ResolveVariablePointer(t2) {
            let e2 = t2.contextIndex;
            -1 == e2 && (e2 = this.GetContextIndexOfVariableNamed(t2.variableName));
            let n2 = s(this.GetRawVariableWithName(t2.variableName, e2), W);
            return null != n2 ? n2 : new W(t2.variableName, e2);
          }
          GetContextIndexOfVariableNamed(t2) {
            return this.GlobalVariableExistsWithName(t2) ? 0 : this._callStack.currentElementIndex;
          }
          ObserveVariableChange(t2) {
            this.variableChangedEventCallbacks.push(t2);
          }
        }
        Xt.dontSaveDefaultValues = true;
        class Yt {
          constructor(t2) {
            this.seed = t2 % 2147483647, this.seed <= 0 && (this.seed += 2147483646);
          }
          next() {
            return this.seed = 48271 * this.seed % 2147483647;
          }
          nextFloat() {
            return (this.next() - 1) / 2147483646;
          }
        }
        class Zt {
          get globals() {
            return this._globals;
          }
          get changedVariables() {
            return this._changedVariables;
          }
          get visitCounts() {
            return this._visitCounts;
          }
          get turnIndices() {
            return this._turnIndices;
          }
          constructor() {
            if (this._changedVariables = /* @__PURE__ */ new Set(), this._visitCounts = /* @__PURE__ */ new Map(), this._turnIndices = /* @__PURE__ */ new Map(), 1 === arguments.length && null !== arguments[0]) {
              let t2 = arguments[0];
              this._globals = new Map(t2._globals), this._changedVariables = new Set(t2._changedVariables), this._visitCounts = new Map(t2._visitCounts), this._turnIndices = new Map(t2._turnIndices);
            } else this._globals = /* @__PURE__ */ new Map(), this._changedVariables = /* @__PURE__ */ new Set(), this._visitCounts = /* @__PURE__ */ new Map(), this._turnIndices = /* @__PURE__ */ new Map();
          }
          TryGetGlobal(t2, e2) {
            return null !== t2 && this._globals.has(t2) ? { result: this._globals.get(t2), exists: true } : { result: e2, exists: false };
          }
          SetGlobal(t2, e2) {
            this._globals.set(t2, e2);
          }
          AddChangedVariable(t2) {
            return this._changedVariables.add(t2);
          }
          TryGetVisitCount(t2, e2) {
            return this._visitCounts.has(t2) ? { result: this._visitCounts.get(t2), exists: true } : { result: e2, exists: false };
          }
          SetVisitCount(t2, e2) {
            this._visitCounts.set(t2, e2);
          }
          SetTurnIndex(t2, e2) {
            this._turnIndices.set(t2, e2);
          }
          TryGetTurnIndex(t2, e2) {
            return this._turnIndices.has(t2) ? { result: this._turnIndices.get(t2), exists: true } : { result: e2, exists: false };
          }
        }
        class Qt {
          static TextToDictionary(t2) {
            return new Qt.Reader(t2).ToDictionary();
          }
          static TextToArray(t2) {
            return new Qt.Reader(t2).ToArray();
          }
        }
        !(function(t2) {
          t2.Reader = class {
            constructor(t3) {
              if (JSON.parse("0", ((t4, e3, n2) => null != n2))) {
                const e3 = (t4, e4, n2) => Number.isInteger(e4) && n2.source.endsWith(".0") ? n2.source + "f" : e4;
                this._rootObject = JSON.parse(t3, e3);
              } else {
                const e3 = t3.replace(/(,\s*)([0-9]+\.[0]+)([,]*)/g, '$1"$2f"$3');
                this._rootObject = JSON.parse(e3);
              }
            }
            ToDictionary() {
              return this._rootObject;
            }
            ToArray() {
              return this._rootObject;
            }
          };
          class e2 {
            constructor() {
              this._currentPropertyName = null, this._currentString = null, this._stateStack = [], this._collectionStack = [], this._propertyNameStack = [], this._jsonObject = null;
            }
            WriteObject(t3) {
              this.WriteObjectStart(), t3(this), this.WriteObjectEnd();
            }
            WriteObjectStart() {
              this.StartNewObject(true);
              let e3 = {};
              if (this.state === t2.Writer.State.Property) {
                this.Assert(null !== this.currentCollection), this.Assert(null !== this.currentPropertyName);
                let t3 = this._propertyNameStack.pop();
                this.currentCollection[t3] = e3, this._collectionStack.push(e3);
              } else this.state === t2.Writer.State.Array ? (this.Assert(null !== this.currentCollection), this.currentCollection.push(e3), this._collectionStack.push(e3)) : (this.Assert(this.state === t2.Writer.State.None), this._jsonObject = e3, this._collectionStack.push(e3));
              this._stateStack.push(new t2.Writer.StateElement(t2.Writer.State.Object));
            }
            WriteObjectEnd() {
              this.Assert(this.state === t2.Writer.State.Object), this._collectionStack.pop(), this._stateStack.pop();
            }
            WriteProperty(t3, e3) {
              if (this.WritePropertyStart(t3), arguments[1] instanceof Function) {
                (0, arguments[1])(this);
              } else {
                let t4 = arguments[1];
                this.Write(t4);
              }
              this.WritePropertyEnd();
            }
            WriteIntProperty(t3, e3) {
              this.WritePropertyStart(t3), this.WriteInt(e3), this.WritePropertyEnd();
            }
            WriteFloatProperty(t3, e3) {
              this.WritePropertyStart(t3), this.WriteFloat(e3), this.WritePropertyEnd();
            }
            WritePropertyStart(e3) {
              this.Assert(this.state === t2.Writer.State.Object), this._propertyNameStack.push(e3), this.IncrementChildCount(), this._stateStack.push(new t2.Writer.StateElement(t2.Writer.State.Property));
            }
            WritePropertyEnd() {
              this.Assert(this.state === t2.Writer.State.Property), this.Assert(1 === this.childCount), this._stateStack.pop();
            }
            WritePropertyNameStart() {
              this.Assert(this.state === t2.Writer.State.Object), this.IncrementChildCount(), this._currentPropertyName = "", this._stateStack.push(new t2.Writer.StateElement(t2.Writer.State.Property)), this._stateStack.push(new t2.Writer.StateElement(t2.Writer.State.PropertyName));
            }
            WritePropertyNameEnd() {
              this.Assert(this.state === t2.Writer.State.PropertyName), this.Assert(null !== this._currentPropertyName), this._propertyNameStack.push(this._currentPropertyName), this._currentPropertyName = null, this._stateStack.pop();
            }
            WritePropertyNameInner(e3) {
              this.Assert(this.state === t2.Writer.State.PropertyName), this.Assert(null !== this._currentPropertyName), this._currentPropertyName += e3;
            }
            WriteArrayStart() {
              this.StartNewObject(true);
              let e3 = [];
              if (this.state === t2.Writer.State.Property) {
                this.Assert(null !== this.currentCollection), this.Assert(null !== this.currentPropertyName);
                let t3 = this._propertyNameStack.pop();
                this.currentCollection[t3] = e3, this._collectionStack.push(e3);
              } else this.state === t2.Writer.State.Array ? (this.Assert(null !== this.currentCollection), this.currentCollection.push(e3), this._collectionStack.push(e3)) : (this.Assert(this.state === t2.Writer.State.None), this._jsonObject = e3, this._collectionStack.push(e3));
              this._stateStack.push(new t2.Writer.StateElement(t2.Writer.State.Array));
            }
            WriteArrayEnd() {
              this.Assert(this.state === t2.Writer.State.Array), this._collectionStack.pop(), this._stateStack.pop();
            }
            Write(t3) {
              null !== t3 ? (this.StartNewObject(false), this._addToCurrentObject(t3)) : console.error("Warning: trying to write a null value");
            }
            WriteBool(t3) {
              null !== t3 && (this.StartNewObject(false), this._addToCurrentObject(t3));
            }
            WriteInt(t3) {
              null !== t3 && (this.StartNewObject(false), this._addToCurrentObject(Math.floor(t3)));
            }
            WriteFloat(t3) {
              null !== t3 && (this.StartNewObject(false), t3 == Number.POSITIVE_INFINITY ? this._addToCurrentObject(34e37) : t3 == Number.NEGATIVE_INFINITY ? this._addToCurrentObject(-34e37) : isNaN(t3) ? this._addToCurrentObject(0) : this._addToCurrentObject(t3));
            }
            WriteNull() {
              this.StartNewObject(false), this._addToCurrentObject(null);
            }
            WriteStringStart() {
              this.StartNewObject(false), this._currentString = "", this._stateStack.push(new t2.Writer.StateElement(t2.Writer.State.String));
            }
            WriteStringEnd() {
              this.Assert(this.state == t2.Writer.State.String), this._stateStack.pop(), this._addToCurrentObject(this._currentString), this._currentString = null;
            }
            WriteStringInner(e3) {
              this.Assert(this.state === t2.Writer.State.String), null !== e3 ? this._currentString += e3 : console.error("Warning: trying to write a null string");
            }
            toString() {
              return null === this._jsonObject ? "" : JSON.stringify(this._jsonObject);
            }
            StartNewObject(e3) {
              e3 ? this.Assert(this.state === t2.Writer.State.None || this.state === t2.Writer.State.Property || this.state === t2.Writer.State.Array) : this.Assert(this.state === t2.Writer.State.Property || this.state === t2.Writer.State.Array), this.state === t2.Writer.State.Property && this.Assert(0 === this.childCount), this.state !== t2.Writer.State.Array && this.state !== t2.Writer.State.Property || this.IncrementChildCount();
            }
            get state() {
              return this._stateStack.length > 0 ? this._stateStack[this._stateStack.length - 1].type : t2.Writer.State.None;
            }
            get childCount() {
              return this._stateStack.length > 0 ? this._stateStack[this._stateStack.length - 1].childCount : 0;
            }
            get currentCollection() {
              return this._collectionStack.length > 0 ? this._collectionStack[this._collectionStack.length - 1] : null;
            }
            get currentPropertyName() {
              return this._propertyNameStack.length > 0 ? this._propertyNameStack[this._propertyNameStack.length - 1] : null;
            }
            IncrementChildCount() {
              this.Assert(this._stateStack.length > 0);
              let t3 = this._stateStack.pop();
              t3.childCount++, this._stateStack.push(t3);
            }
            Assert(t3) {
              if (!t3) throw Error("Assert failed while writing JSON");
            }
            _addToCurrentObject(e3) {
              this.Assert(null !== this.currentCollection), this.state === t2.Writer.State.Array ? (this.Assert(Array.isArray(this.currentCollection)), this.currentCollection.push(e3)) : this.state === t2.Writer.State.Property && (this.Assert(!Array.isArray(this.currentCollection)), this.Assert(null !== this.currentPropertyName), this.currentCollection[this.currentPropertyName] = e3, this._propertyNameStack.pop());
            }
          }
          t2.Writer = e2, (function(e3) {
            var n2;
            (n2 = e3.State || (e3.State = {}))[n2.None = 0] = "None", n2[n2.Object = 1] = "Object", n2[n2.Array = 2] = "Array", n2[n2.Property = 3] = "Property", n2[n2.PropertyName = 4] = "PropertyName", n2[n2.String = 5] = "String";
            e3.StateElement = class {
              constructor(e4) {
                this.type = t2.Writer.State.None, this.childCount = 0, this.type = e4;
              }
            };
          })(e2 = t2.Writer || (t2.Writer = {}));
        })(Qt || (Qt = {}));
        class te {
          constructor() {
            let t2 = arguments[0], e2 = arguments[1];
            if (this.name = t2, this.callStack = new zt(e2), arguments[2]) {
              let t3 = arguments[2];
              this.callStack.SetJsonToken(t3.callstack, e2), this.outputStream = Jt.JArrayToRuntimeObjList(t3.outputStream), this.currentChoices = Jt.JArrayToRuntimeObjList(t3.currentChoices);
              let n2 = t3.choiceThreads;
              void 0 !== n2 && this.LoadFlowChoiceThreads(n2, e2);
            } else this.outputStream = [], this.currentChoices = [];
          }
          WriteJson(t2) {
            t2.WriteObjectStart(), t2.WriteProperty("callstack", ((t3) => this.callStack.WriteJson(t3))), t2.WriteProperty("outputStream", ((t3) => Jt.WriteListRuntimeObjs(t3, this.outputStream)));
            let e2 = false;
            for (let n2 of this.currentChoices) {
              if (null === n2.threadAtGeneration) return S("c.threadAtGeneration");
              n2.originalThreadIndex = n2.threadAtGeneration.threadIndex, null === this.callStack.ThreadWithIndex(n2.originalThreadIndex) && (e2 || (e2 = true, t2.WritePropertyStart("choiceThreads"), t2.WriteObjectStart()), t2.WritePropertyStart(n2.originalThreadIndex), n2.threadAtGeneration.WriteJson(t2), t2.WritePropertyEnd());
            }
            e2 && (t2.WriteObjectEnd(), t2.WritePropertyEnd()), t2.WriteProperty("currentChoices", ((t3) => {
              t3.WriteArrayStart();
              for (let e3 of this.currentChoices) Jt.WriteChoice(t3, e3);
              t3.WriteArrayEnd();
            })), t2.WriteObjectEnd();
          }
          LoadFlowChoiceThreads(t2, e2) {
            for (let n2 of this.currentChoices) {
              let i2 = this.callStack.ThreadWithIndex(n2.originalThreadIndex);
              if (null !== i2) n2.threadAtGeneration = i2.Copy();
              else {
                let i3 = t2[`${n2.originalThreadIndex}`];
                n2.threadAtGeneration = new zt.Thread(i3, e2);
              }
            }
          }
        }
        class ee {
          ToJson() {
            let t2 = new Qt.Writer();
            return this.WriteJson(t2), t2.toString();
          }
          toJson() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return this.ToJson(t2);
          }
          LoadJson(t2) {
            let e2 = Qt.TextToDictionary(t2);
            this.LoadJsonObj(e2), null !== this.onDidLoadState && this.onDidLoadState();
          }
          VisitCountAtPathString(t2) {
            let e2;
            if (null !== this._patch) {
              let n2 = this.story.ContentAtPath(new m(t2)).container;
              if (null === n2) throw new Error("Content at path not found: " + t2);
              if (e2 = this._patch.TryGetVisitCount(n2, 0), e2.exists) return e2.result;
            }
            return e2 = T(this._visitCounts, t2, null), e2.exists ? e2.result : 0;
          }
          VisitCountForContainer(t2) {
            if (null === t2) return S("container");
            if (!t2.visitsShouldBeCounted) return this.story.Error("Read count for target (" + t2.name + " - on " + t2.debugMetadata + ") unknown. The story may need to be compiled with countAllVisits flag (-c)."), 0;
            if (null !== this._patch) {
              let e3 = this._patch.TryGetVisitCount(t2, 0);
              if (e3.exists) return e3.result;
            }
            let e2 = t2.path.toString(), n2 = T(this._visitCounts, e2, null);
            return n2.exists ? n2.result : 0;
          }
          IncrementVisitCountForContainer(t2) {
            if (null !== this._patch) {
              let e3 = this.VisitCountForContainer(t2);
              return e3++, void this._patch.SetVisitCount(t2, e3);
            }
            let e2 = t2.path.toString(), n2 = T(this._visitCounts, e2, null);
            n2.exists ? this._visitCounts.set(e2, n2.result + 1) : this._visitCounts.set(e2, 1);
          }
          RecordTurnIndexVisitToContainer(t2) {
            if (null !== this._patch) return void this._patch.SetTurnIndex(t2, this.currentTurnIndex);
            let e2 = t2.path.toString();
            this._turnIndices.set(e2, this.currentTurnIndex);
          }
          TurnsSinceForContainer(t2) {
            if (t2.turnIndexShouldBeCounted || this.story.Error("TURNS_SINCE() for target (" + t2.name + " - on " + t2.debugMetadata + ") unknown. The story may need to be compiled with countAllVisits flag (-c)."), null !== this._patch) {
              let e3 = this._patch.TryGetTurnIndex(t2, 0);
              if (e3.exists) return this.currentTurnIndex - e3.result;
            }
            let e2 = t2.path.toString(), n2 = T(this._turnIndices, e2, 0);
            return n2.exists ? this.currentTurnIndex - n2.result : -1;
          }
          get callstackDepth() {
            return this.callStack.depth;
          }
          get outputStream() {
            return this._currentFlow.outputStream;
          }
          get currentChoices() {
            return this.canContinue ? [] : this._currentFlow.currentChoices;
          }
          get generatedChoices() {
            return this._currentFlow.currentChoices;
          }
          get currentErrors() {
            return this._currentErrors;
          }
          get currentWarnings() {
            return this._currentWarnings;
          }
          get variablesState() {
            return this._variablesState;
          }
          set variablesState(t2) {
            this._variablesState = t2;
          }
          get callStack() {
            return this._currentFlow.callStack;
          }
          get evaluationStack() {
            return this._evaluationStack;
          }
          get currentTurnIndex() {
            return this._currentTurnIndex;
          }
          set currentTurnIndex(t2) {
            this._currentTurnIndex = t2;
          }
          get currentPathString() {
            let t2 = this.currentPointer;
            return t2.isNull ? null : null === t2.path ? S("pointer.path") : t2.path.toString();
          }
          get previousPathString() {
            let t2 = this.previousPointer;
            return t2.isNull ? null : null === t2.path ? S("previousPointer.path") : t2.path.toString();
          }
          get currentPointer() {
            return this.callStack.currentElement.currentPointer.copy();
          }
          set currentPointer(t2) {
            this.callStack.currentElement.currentPointer = t2.copy();
          }
          get previousPointer() {
            return this.callStack.currentThread.previousPointer.copy();
          }
          set previousPointer(t2) {
            this.callStack.currentThread.previousPointer = t2.copy();
          }
          get canContinue() {
            return !this.currentPointer.isNull && !this.hasError;
          }
          get hasError() {
            return null != this.currentErrors && this.currentErrors.length > 0;
          }
          get hasWarning() {
            return null != this.currentWarnings && this.currentWarnings.length > 0;
          }
          get currentText() {
            if (this._outputStreamTextDirty) {
              let t2 = new b(), e2 = false;
              for (let n2 of this.outputStream) {
                let i2 = s(n2, O);
                if (e2 || null === i2) {
                  let t3 = s(n2, D);
                  null !== t3 && (t3.commandType == D.CommandType.BeginTag ? e2 = true : t3.commandType == D.CommandType.EndTag && (e2 = false));
                } else t2.Append(i2.value);
              }
              this._currentText = this.CleanOutputWhitespace(t2.toString()), this._outputStreamTextDirty = false;
            }
            return this._currentText;
          }
          CleanOutputWhitespace(t2) {
            let e2 = new b(), n2 = -1, i2 = 0;
            for (let r2 = 0; r2 < t2.length; r2++) {
              let s2 = t2.charAt(r2), a2 = " " == s2 || "	" == s2;
              a2 && -1 == n2 && (n2 = r2), a2 || ("\n" != s2 && n2 > 0 && n2 != i2 && e2.Append(" "), n2 = -1), "\n" == s2 && (i2 = r2 + 1), a2 || e2.Append(s2);
            }
            return e2.toString();
          }
          get currentTags() {
            if (this._outputStreamTagsDirty) {
              this._currentTags = [];
              let t2 = false, e2 = new b();
              for (let n2 of this.outputStream) {
                let i2 = s(n2, D);
                if (null != i2) {
                  if (i2.commandType == D.CommandType.BeginTag) {
                    if (t2 && e2.Length > 0) {
                      let t3 = this.CleanOutputWhitespace(e2.toString());
                      this._currentTags.push(t3), e2.Clear();
                    }
                    t2 = true;
                  } else if (i2.commandType == D.CommandType.EndTag) {
                    if (e2.Length > 0) {
                      let t3 = this.CleanOutputWhitespace(e2.toString());
                      this._currentTags.push(t3), e2.Clear();
                    }
                    t2 = false;
                  }
                } else if (t2) {
                  let t3 = s(n2, O);
                  null !== t3 && e2.Append(t3.value);
                } else {
                  let t3 = s(n2, Ut);
                  null != t3 && null != t3.text && t3.text.length > 0 && this._currentTags.push(t3.text);
                }
              }
              if (e2.Length > 0) {
                let t3 = this.CleanOutputWhitespace(e2.toString());
                this._currentTags.push(t3), e2.Clear();
              }
              this._outputStreamTagsDirty = false;
            }
            return this._currentTags;
          }
          get currentFlowName() {
            return this._currentFlow.name;
          }
          get currentFlowIsDefaultFlow() {
            return this._currentFlow.name == this.kDefaultFlowName;
          }
          get aliveFlowNames() {
            if (this._aliveFlowNamesDirty) {
              if (this._aliveFlowNames = [], null != this._namedFlows) for (let t2 of this._namedFlows.keys()) t2 != this.kDefaultFlowName && this._aliveFlowNames.push(t2);
              this._aliveFlowNamesDirty = false;
            }
            return this._aliveFlowNames;
          }
          get inExpressionEvaluation() {
            return this.callStack.currentElement.inExpressionEvaluation;
          }
          set inExpressionEvaluation(t2) {
            this.callStack.currentElement.inExpressionEvaluation = t2;
          }
          constructor(t2) {
            this.kInkSaveStateVersion = 10, this.kMinCompatibleLoadVersion = 8, this.onDidLoadState = null, this._currentErrors = null, this._currentWarnings = null, this.divertedPointer = H.Null, this._currentTurnIndex = 0, this.storySeed = 0, this.previousRandom = 0, this.didSafeExit = false, this._currentText = null, this._currentTags = null, this._outputStreamTextDirty = true, this._outputStreamTagsDirty = true, this._patch = null, this._aliveFlowNames = null, this._namedFlows = null, this.kDefaultFlowName = "DEFAULT_FLOW", this._aliveFlowNamesDirty = true, this.story = t2, this._currentFlow = new te(this.kDefaultFlowName, t2), this.OutputStreamDirty(), this._aliveFlowNamesDirty = true, this._evaluationStack = [], this._variablesState = new Xt(this.callStack, t2.listDefinitions), this._visitCounts = /* @__PURE__ */ new Map(), this._turnIndices = /* @__PURE__ */ new Map(), this.currentTurnIndex = -1;
            let e2 = (/* @__PURE__ */ new Date()).getTime();
            this.storySeed = new Yt(e2).next() % 100, this.previousRandom = 0, this.GoToStart();
          }
          GoToStart() {
            this.callStack.currentElement.currentPointer = H.StartOf(this.story.mainContentContainer);
          }
          SwitchFlow_Internal(t2) {
            if (null === t2) throw new Error("Must pass a non-null string to Story.SwitchFlow");
            if (null === this._namedFlows && (this._namedFlows = /* @__PURE__ */ new Map(), this._namedFlows.set(this.kDefaultFlowName, this._currentFlow)), t2 === this._currentFlow.name) return;
            let e2, n2 = T(this._namedFlows, t2, null);
            n2.exists ? e2 = n2.result : (e2 = new te(t2, this.story), this._namedFlows.set(t2, e2), this._aliveFlowNamesDirty = true), this._currentFlow = e2, this.variablesState.callStack = this._currentFlow.callStack, this.OutputStreamDirty();
          }
          SwitchToDefaultFlow_Internal() {
            null !== this._namedFlows && this.SwitchFlow_Internal(this.kDefaultFlowName);
          }
          RemoveFlow_Internal(t2) {
            if (null === t2) throw new Error("Must pass a non-null string to Story.DestroyFlow");
            if (t2 === this.kDefaultFlowName) throw new Error("Cannot destroy default flow");
            if (this._currentFlow.name === t2 && this.SwitchToDefaultFlow_Internal(), null === this._namedFlows) return S("this._namedFlows");
            this._namedFlows.delete(t2), this._aliveFlowNamesDirty = true;
          }
          CopyAndStartPatching(t2) {
            let e2 = new ee(this.story);
            if (e2._patch = new Zt(this._patch), e2._currentFlow.name = this._currentFlow.name, e2._currentFlow.callStack = new zt(this._currentFlow.callStack), e2._currentFlow.outputStream.push(...this._currentFlow.outputStream), e2.OutputStreamDirty(), t2) for (let t3 of this._currentFlow.currentChoices) e2._currentFlow.currentChoices.push(t3.Clone());
            else e2._currentFlow.currentChoices.push(...this._currentFlow.currentChoices);
            if (null !== this._namedFlows) {
              e2._namedFlows = /* @__PURE__ */ new Map();
              for (let [t3, n2] of this._namedFlows) e2._namedFlows.set(t3, n2), e2._aliveFlowNamesDirty = true;
              e2._namedFlows.set(this._currentFlow.name, e2._currentFlow);
            }
            return this.hasError && (e2._currentErrors = [], e2._currentErrors.push(...this.currentErrors || [])), this.hasWarning && (e2._currentWarnings = [], e2._currentWarnings.push(...this.currentWarnings || [])), e2.variablesState = this.variablesState, e2.variablesState.callStack = e2.callStack, e2.variablesState.patch = e2._patch, e2.evaluationStack.push(...this.evaluationStack), this.divertedPointer.isNull || (e2.divertedPointer = this.divertedPointer.copy()), e2.previousPointer = this.previousPointer.copy(), e2._visitCounts = this._visitCounts, e2._turnIndices = this._turnIndices, e2.currentTurnIndex = this.currentTurnIndex, e2.storySeed = this.storySeed, e2.previousRandom = this.previousRandom, e2.didSafeExit = this.didSafeExit, e2;
          }
          RestoreAfterPatch() {
            this.variablesState.callStack = this.callStack, this.variablesState.patch = this._patch;
          }
          ApplyAnyPatch() {
            if (null !== this._patch) {
              this.variablesState.ApplyPatch();
              for (let [t2, e2] of this._patch.visitCounts) this.ApplyCountChanges(t2, e2, true);
              for (let [t2, e2] of this._patch.turnIndices) this.ApplyCountChanges(t2, e2, false);
              this._patch = null;
            }
          }
          ApplyCountChanges(t2, e2, n2) {
            (n2 ? this._visitCounts : this._turnIndices).set(t2.path.toString(), e2);
          }
          WriteJson(t2) {
            if (t2.WriteObjectStart(), t2.WritePropertyStart("flows"), t2.WriteObjectStart(), null !== this._namedFlows) for (let [e2, n2] of this._namedFlows) t2.WriteProperty(e2, ((t3) => n2.WriteJson(t3)));
            else t2.WriteProperty(this._currentFlow.name, ((t3) => this._currentFlow.WriteJson(t3)));
            if (t2.WriteObjectEnd(), t2.WritePropertyEnd(), t2.WriteProperty("currentFlowName", this._currentFlow.name), t2.WriteProperty("variablesState", ((t3) => this.variablesState.WriteJson(t3))), t2.WriteProperty("evalStack", ((t3) => Jt.WriteListRuntimeObjs(t3, this.evaluationStack))), !this.divertedPointer.isNull) {
              if (null === this.divertedPointer.path) return S("divertedPointer");
              t2.WriteProperty("currentDivertTarget", this.divertedPointer.path.componentsString);
            }
            t2.WriteProperty("visitCounts", ((t3) => Jt.WriteIntDictionary(t3, this._visitCounts))), t2.WriteProperty("turnIndices", ((t3) => Jt.WriteIntDictionary(t3, this._turnIndices))), t2.WriteIntProperty("turnIdx", this.currentTurnIndex), t2.WriteIntProperty("storySeed", this.storySeed), t2.WriteIntProperty("previousRandom", this.previousRandom), t2.WriteIntProperty("inkSaveVersion", this.kInkSaveStateVersion), t2.WriteIntProperty("inkFormatVersion", re.inkVersionCurrent), t2.WriteObjectEnd();
          }
          LoadJsonObj(t2) {
            let e2 = t2, n2 = e2.inkSaveVersion;
            if (null == n2) throw new Error("ink save format incorrect, can't load.");
            if (parseInt(n2) < this.kMinCompatibleLoadVersion) throw new Error("Ink save format isn't compatible with the current version (saw '" + n2 + "', but minimum is " + this.kMinCompatibleLoadVersion + "), so can't load.");
            let i2 = e2.flows;
            if (null != i2) {
              let t3 = i2;
              1 === Object.keys(t3).length ? this._namedFlows = null : null === this._namedFlows ? this._namedFlows = /* @__PURE__ */ new Map() : this._namedFlows.clear();
              let n3 = Object.entries(t3);
              for (let [e3, i3] of n3) {
                let n4 = e3, r3 = i3, s2 = new te(n4, this.story, r3);
                if (1 === Object.keys(t3).length) this._currentFlow = new te(n4, this.story, r3);
                else {
                  if (null === this._namedFlows) return S("this._namedFlows");
                  this._namedFlows.set(n4, s2);
                }
              }
              if (null != this._namedFlows && this._namedFlows.size > 1) {
                let t4 = e2.currentFlowName;
                this._currentFlow = this._namedFlows.get(t4);
              }
            } else {
              this._namedFlows = null, this._currentFlow.name = this.kDefaultFlowName, this._currentFlow.callStack.SetJsonToken(e2.callstackThreads, this.story), this._currentFlow.outputStream = Jt.JArrayToRuntimeObjList(e2.outputStream), this._currentFlow.currentChoices = Jt.JArrayToRuntimeObjList(e2.currentChoices);
              let t3 = e2.choiceThreads;
              this._currentFlow.LoadFlowChoiceThreads(t3, this.story);
            }
            this.OutputStreamDirty(), this._aliveFlowNamesDirty = true, this.variablesState.SetJsonToken(e2.variablesState), this.variablesState.callStack = this._currentFlow.callStack, this._evaluationStack = Jt.JArrayToRuntimeObjList(e2.evalStack);
            let r2 = e2.currentDivertTarget;
            if (null != r2) {
              let t3 = new m(r2.toString());
              this.divertedPointer = this.story.PointerAtPath(t3);
            }
            this._visitCounts = Jt.JObjectToIntDictionary(e2.visitCounts), this._turnIndices = Jt.JObjectToIntDictionary(e2.turnIndices), this.currentTurnIndex = parseInt(e2.turnIdx), this.storySeed = parseInt(e2.storySeed), this.previousRandom = parseInt(e2.previousRandom);
          }
          ResetErrors() {
            this._currentErrors = null, this._currentWarnings = null;
          }
          ResetOutput() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            this.outputStream.length = 0, null !== t2 && this.outputStream.push(...t2), this.OutputStreamDirty();
          }
          PushToOutputStream(t2) {
            let e2 = s(t2, O);
            if (null !== e2) {
              let t3 = this.TrySplittingHeadTailWhitespace(e2);
              if (null !== t3) {
                for (let e3 of t3) this.PushToOutputStreamIndividual(e3);
                return void this.OutputStreamDirty();
              }
            }
            this.PushToOutputStreamIndividual(t2), this.OutputStreamDirty();
          }
          PopFromOutputStream(t2) {
            this.outputStream.splice(this.outputStream.length - t2, t2), this.OutputStreamDirty();
          }
          TrySplittingHeadTailWhitespace(t2) {
            let e2 = t2.value;
            if (null === e2) return S("single.value");
            let n2 = -1, i2 = -1;
            for (let t3 = 0; t3 < e2.length; t3++) {
              let r3 = e2[t3];
              if ("\n" != r3) {
                if (" " == r3 || "	" == r3) continue;
                break;
              }
              -1 == n2 && (n2 = t3), i2 = t3;
            }
            let r2 = -1, s2 = -1;
            for (let t3 = e2.length - 1; t3 >= 0; t3--) {
              let n3 = e2[t3];
              if ("\n" != n3) {
                if (" " == n3 || "	" == n3) continue;
                break;
              }
              -1 == r2 && (r2 = t3), s2 = t3;
            }
            if (-1 == n2 && -1 == r2) return null;
            let a2 = [], o2 = 0, l2 = e2.length;
            if (-1 != n2) {
              if (n2 > 0) {
                let t3 = new O(e2.substring(0, n2));
                a2.push(t3);
              }
              a2.push(new O("\n")), o2 = i2 + 1;
            }
            if (-1 != r2 && (l2 = s2), l2 > o2) {
              let t3 = e2.substring(o2, l2);
              a2.push(new O(t3));
            }
            if (-1 != r2 && s2 > i2 && (a2.push(new O("\n")), r2 < e2.length - 1)) {
              let t3 = e2.length - r2 - 1, n3 = new O(e2.substring(r2 + 1, r2 + 1 + t3));
              a2.push(n3);
            }
            return a2;
          }
          PushToOutputStreamIndividual(t2) {
            let e2 = s(t2, Lt), n2 = s(t2, O), i2 = true;
            if (e2) this.TrimNewlinesFromOutputStream(), i2 = true;
            else if (n2) {
              let t3 = -1, e3 = this.callStack.currentElement;
              e3.type == v.Function && (t3 = e3.functionStartInOutputStream);
              let r2 = -1;
              for (let e4 = this.outputStream.length - 1; e4 >= 0; e4--) {
                let n3 = this.outputStream[e4], i3 = n3 instanceof D ? n3 : null;
                if (null != (n3 instanceof Lt ? n3 : null)) {
                  r2 = e4;
                  break;
                }
                if (null != i3 && i3.commandType == D.CommandType.BeginString) {
                  e4 >= t3 && (t3 = -1);
                  break;
                }
              }
              let s2 = -1;
              if (s2 = -1 != r2 && -1 != t3 ? Math.min(t3, r2) : -1 != r2 ? r2 : t3, -1 != s2) {
                if (n2.isNewline) i2 = false;
                else if (n2.isNonWhitespace && (r2 > -1 && this.RemoveExistingGlue(), t3 > -1)) {
                  let t4 = this.callStack.elements;
                  for (let e4 = t4.length - 1; e4 >= 0; e4--) {
                    let n3 = t4[e4];
                    if (n3.type != v.Function) break;
                    n3.functionStartInOutputStream = -1;
                  }
                }
              } else n2.isNewline && (!this.outputStreamEndsInNewline && this.outputStreamContainsContent || (i2 = false));
            }
            if (i2) {
              if (null === t2) return S("obj");
              this.outputStream.push(t2), this.OutputStreamDirty();
            }
          }
          TrimNewlinesFromOutputStream() {
            let t2 = -1, e2 = this.outputStream.length - 1;
            for (; e2 >= 0; ) {
              let n2 = this.outputStream[e2], i2 = s(n2, D), r2 = s(n2, O);
              if (null != i2 || null != r2 && r2.isNonWhitespace) break;
              null != r2 && r2.isNewline && (t2 = e2), e2--;
            }
            if (t2 >= 0) for (e2 = t2; e2 < this.outputStream.length; ) {
              s(this.outputStream[e2], O) ? this.outputStream.splice(e2, 1) : e2++;
            }
            this.OutputStreamDirty();
          }
          RemoveExistingGlue() {
            for (let t2 = this.outputStream.length - 1; t2 >= 0; t2--) {
              let e2 = this.outputStream[t2];
              if (e2 instanceof Lt) this.outputStream.splice(t2, 1);
              else if (e2 instanceof D) break;
            }
            this.OutputStreamDirty();
          }
          get outputStreamEndsInNewline() {
            if (this.outputStream.length > 0) for (let t2 = this.outputStream.length - 1; t2 >= 0; t2--) {
              if (this.outputStream[t2] instanceof D) break;
              let e2 = this.outputStream[t2];
              if (e2 instanceof O) {
                if (e2.isNewline) return true;
                if (e2.isNonWhitespace) break;
              }
            }
            return false;
          }
          get outputStreamContainsContent() {
            for (let t2 of this.outputStream) if (t2 instanceof O) return true;
            return false;
          }
          get inStringEvaluation() {
            for (let t2 = this.outputStream.length - 1; t2 >= 0; t2--) {
              let e2 = s(this.outputStream[t2], D);
              if (e2 instanceof D && e2.commandType == D.CommandType.BeginString) return true;
            }
            return false;
          }
          PushEvaluationStack(t2) {
            let e2 = s(t2, R);
            if (e2) {
              let t3 = e2.value;
              if (null === t3) return S("rawList");
              if (null != t3.originNames) {
                t3.origins || (t3.origins = []), t3.origins.length = 0;
                for (let e3 of t3.originNames) {
                  if (null === this.story.listDefinitions) return S("StoryState.story.listDefinitions");
                  let n2 = this.story.listDefinitions.TryListGetDefinition(e3, null);
                  if (null === n2.result) return S("StoryState def.result");
                  t3.origins.indexOf(n2.result) < 0 && t3.origins.push(n2.result);
                }
              }
            }
            if (null === t2) return S("obj");
            this.evaluationStack.push(t2);
          }
          PopEvaluationStack(t2) {
            if (void 0 === t2) {
              return l(this.evaluationStack.pop());
            }
            if (t2 > this.evaluationStack.length) throw new Error("trying to pop too many objects");
            return l(this.evaluationStack.splice(this.evaluationStack.length - t2, t2));
          }
          PeekEvaluationStack() {
            return this.evaluationStack[this.evaluationStack.length - 1];
          }
          ForceEnd() {
            this.callStack.Reset(), this._currentFlow.currentChoices.length = 0, this.currentPointer = H.Null, this.previousPointer = H.Null, this.didSafeExit = true;
          }
          TrimWhitespaceFromFunctionEnd() {
            f.Assert(this.callStack.currentElement.type == v.Function);
            let t2 = this.callStack.currentElement.functionStartInOutputStream;
            -1 == t2 && (t2 = 0);
            for (let e2 = this.outputStream.length - 1; e2 >= t2; e2--) {
              let t3 = this.outputStream[e2], n2 = s(t3, O), i2 = s(t3, D);
              if (null != n2) {
                if (i2) break;
                if (!n2.isNewline && !n2.isInlineWhitespace) break;
                this.outputStream.splice(e2, 1), this.OutputStreamDirty();
              }
            }
          }
          PopCallStack() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            this.callStack.currentElement.type == v.Function && this.TrimWhitespaceFromFunctionEnd(), this.callStack.Pop(t2);
          }
          SetChosenPath(t2, e2) {
            this._currentFlow.currentChoices.length = 0;
            let n2 = this.story.PointerAtPath(t2);
            n2.isNull || -1 != n2.index || (n2.index = 0), this.currentPointer = n2, e2 && this.currentTurnIndex++;
          }
          StartFunctionEvaluationFromGame(t2, e2) {
            this.callStack.Push(v.FunctionEvaluationFromGame, this.evaluationStack.length), this.callStack.currentElement.currentPointer = H.StartOf(t2), this.PassArgumentsToEvaluationStack(e2);
          }
          PassArgumentsToEvaluationStack(t2) {
            if (null !== t2) for (let e2 = 0; e2 < t2.length; e2++) {
              if (!("number" == typeof t2[e2] || "string" == typeof t2[e2] || "boolean" == typeof t2[e2] || t2[e2] instanceof E)) throw new Error("ink arguments when calling EvaluateFunction / ChoosePathStringWithParameters must benumber, string, bool or InkList. Argument was " + (null === l(t2[e2]) ? "null" : t2[e2].constructor.name));
              this.PushEvaluationStack(A.Create(t2[e2]));
            }
          }
          TryExitFunctionEvaluationFromGame() {
            return this.callStack.currentElement.type == v.FunctionEvaluationFromGame && (this.currentPointer = H.Null, this.didSafeExit = true, true);
          }
          CompleteFunctionEvaluationFromGame() {
            if (this.callStack.currentElement.type != v.FunctionEvaluationFromGame) throw new Error("Expected external function evaluation to be complete. Stack trace: " + this.callStack.callStackTrace);
            let t2 = this.callStack.currentElement.evaluationStackHeightWhenPushed, e2 = null;
            for (; this.evaluationStack.length > t2; ) {
              let t3 = this.PopEvaluationStack();
              null === e2 && (e2 = t3);
            }
            if (this.PopCallStack(v.FunctionEvaluationFromGame), e2) {
              if (e2 instanceof j) return null;
              let t3 = a(e2, A);
              return t3.valueType == g.DivertTarget ? "-> " + t3.valueObject.toString() : t3.valueObject;
            }
            return null;
          }
          AddError(t2, e2) {
            e2 ? (null == this._currentWarnings && (this._currentWarnings = []), this._currentWarnings.push(t2)) : (null == this._currentErrors && (this._currentErrors = []), this._currentErrors.push(t2));
          }
          OutputStreamDirty() {
            this._outputStreamTextDirty = true, this._outputStreamTagsDirty = true;
          }
        }
        class ne {
          constructor() {
            this.startTime = void 0;
          }
          get ElapsedMilliseconds() {
            return void 0 === this.startTime ? 0 : (/* @__PURE__ */ new Date()).getTime() - this.startTime;
          }
          Start() {
            this.startTime = (/* @__PURE__ */ new Date()).getTime();
          }
          Stop() {
            this.startTime = void 0;
          }
        }
        var ie;
        !(function(t2) {
          t2[t2.Author = 0] = "Author", t2[t2.Warning = 1] = "Warning", t2[t2.Error = 2] = "Error";
        })(ie || (ie = {})), Number.isInteger || (Number.isInteger = function(t2) {
          return "number" == typeof t2 && isFinite(t2) && t2 > -9007199254740992 && t2 < 9007199254740992 && Math.floor(t2) === t2;
        });
        let re = class t2 extends y {
          get currentChoices() {
            let t3 = [];
            if (null === this._state) return S("this._state");
            for (let e2 of this._state.currentChoices) e2.isInvisibleDefault || (e2.index = t3.length, t3.push(e2));
            return t3;
          }
          get currentText() {
            return this.IfAsyncWeCant("call currentText since it's a work in progress"), this.state.currentText;
          }
          get currentTags() {
            return this.IfAsyncWeCant("call currentTags since it's a work in progress"), this.state.currentTags;
          }
          get currentErrors() {
            return this.state.currentErrors;
          }
          get currentWarnings() {
            return this.state.currentWarnings;
          }
          get currentFlowName() {
            return this.state.currentFlowName;
          }
          get currentFlowIsDefaultFlow() {
            return this.state.currentFlowIsDefaultFlow;
          }
          get aliveFlowNames() {
            return this.state.aliveFlowNames;
          }
          get hasError() {
            return this.state.hasError;
          }
          get hasWarning() {
            return this.state.hasWarning;
          }
          get variablesState() {
            return this.state.variablesState;
          }
          get listDefinitions() {
            return this._listDefinitions;
          }
          get state() {
            return this._state;
          }
          StartProfiling() {
          }
          EndProfiling() {
          }
          constructor() {
            let e2;
            super(), this.inkVersionMinimumCompatible = 18, this.onError = null, this.onDidContinue = null, this.onMakeChoice = null, this.onEvaluateFunction = null, this.onCompleteEvaluateFunction = null, this.onChoosePathString = null, this._prevContainers = [], this.allowExternalFunctionFallbacks = false, this._listDefinitions = null, this._variableObservers = null, this._hasValidatedExternals = false, this._temporaryEvaluationContainer = null, this._asyncContinueActive = false, this._stateSnapshotAtLastNewline = null, this._sawLookaheadUnsafeFunctionAfterNewline = false, this._recursiveContinueCount = 0, this._asyncSaving = false, this._profiler = null;
            let n2 = null, i2 = null;
            if (arguments[0] instanceof L) e2 = arguments[0], void 0 !== arguments[1] && (n2 = arguments[1]), this._mainContentContainer = e2;
            else if ("string" == typeof arguments[0]) {
              let t3 = arguments[0];
              i2 = Qt.TextToDictionary(t3);
            } else i2 = arguments[0];
            if (null != n2 && (this._listDefinitions = new Ht(n2)), this._externals = /* @__PURE__ */ new Map(), null !== i2) {
              let e3 = i2, n3 = e3.inkVersion;
              if (null == n3) throw new Error("ink version number not found. Are you sure it's a valid .ink.json file?");
              let r2 = parseInt(n3);
              if (r2 > t2.inkVersionCurrent) throw new Error("Version of ink used to build story was newer than the current version of the engine");
              if (r2 < this.inkVersionMinimumCompatible) throw new Error("Version of ink used to build story is too old to be loaded by this version of the engine");
              r2 != t2.inkVersionCurrent && console.warn(`WARNING: Version of ink ${t2.inkVersionCurrent} used to build story doesn't match current version of engine (${r2}). Non-critical, but recommend synchronising.`);
              let s2, o2 = e3.root;
              if (null == o2) throw new Error("Root node for ink not found. Are you sure it's a valid .ink.json file?");
              (s2 = e3.listDefs) && (this._listDefinitions = Jt.JTokenToListDefinitions(s2)), this._mainContentContainer = a(Jt.JTokenToRuntimeObject(o2), L), this.ResetState();
            }
          }
          ToJson(e2) {
            let n2 = false;
            if (e2 || (n2 = true, e2 = new Qt.Writer()), e2.WriteObjectStart(), e2.WriteIntProperty("inkVersion", t2.inkVersionCurrent), e2.WriteProperty("root", ((t3) => Jt.WriteRuntimeContainer(t3, this._mainContentContainer))), null != this._listDefinitions) {
              e2.WritePropertyStart("listDefs"), e2.WriteObjectStart();
              for (let t3 of this._listDefinitions.lists) {
                e2.WritePropertyStart(t3.name), e2.WriteObjectStart();
                for (let [n3, i2] of t3.items) {
                  let t4 = w.fromSerializedKey(n3), r2 = i2;
                  e2.WriteIntProperty(t4.itemName, r2);
                }
                e2.WriteObjectEnd(), e2.WritePropertyEnd();
              }
              e2.WriteObjectEnd(), e2.WritePropertyEnd();
            }
            if (e2.WriteObjectEnd(), n2) return e2.toString();
          }
          ResetState() {
            this.IfAsyncWeCant("ResetState"), this._state = new ee(this), this._state.variablesState.ObserveVariableChange(this.VariableStateDidChangeEvent.bind(this)), this.ResetGlobals();
          }
          ResetErrors() {
            if (null === this._state) return S("this._state");
            this._state.ResetErrors();
          }
          ResetCallstack() {
            if (this.IfAsyncWeCant("ResetCallstack"), null === this._state) return S("this._state");
            this._state.ForceEnd();
          }
          ResetGlobals() {
            if (this._mainContentContainer.namedContent.get("global decl")) {
              let t3 = this.state.currentPointer.copy();
              this.ChoosePath(new m("global decl"), false), this.ContinueInternal(), this.state.currentPointer = t3;
            }
            this.state.variablesState.SnapshotDefaultGlobals();
          }
          SwitchFlow(t3) {
            if (this.IfAsyncWeCant("switch flow"), this._asyncSaving) throw new Error("Story is already in background saving mode, can't switch flow to " + t3);
            this.state.SwitchFlow_Internal(t3);
          }
          RemoveFlow(t3) {
            this.state.RemoveFlow_Internal(t3);
          }
          SwitchToDefaultFlow() {
            this.state.SwitchToDefaultFlow_Internal();
          }
          Continue() {
            return this.ContinueAsync(0), this.currentText;
          }
          get canContinue() {
            return this.state.canContinue;
          }
          get asyncContinueComplete() {
            return !this._asyncContinueActive;
          }
          ContinueAsync(t3) {
            this._hasValidatedExternals || this.ValidateExternalBindings(), this.ContinueInternal(t3);
          }
          ContinueInternal() {
            let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            null != this._profiler && this._profiler.PreContinue();
            let e2 = t3 > 0;
            if (this._recursiveContinueCount++, this._asyncContinueActive) this._asyncContinueActive && !e2 && (this._asyncContinueActive = false);
            else {
              if (this._asyncContinueActive = e2, !this.canContinue) throw new Error("Can't continue - should check canContinue before calling Continue");
              this._state.didSafeExit = false, this._state.ResetOutput(), 1 == this._recursiveContinueCount && this._state.variablesState.StartVariableObservation();
            }
            let n2 = new ne();
            n2.Start();
            let i2 = false;
            this._sawLookaheadUnsafeFunctionAfterNewline = false;
            do {
              try {
                i2 = this.ContinueSingleStep();
              } catch (t4) {
                if (!(t4 instanceof _)) throw t4;
                this.AddError(t4.message, void 0, t4.useEndLineNumber);
                break;
              }
              if (i2) break;
              if (this._asyncContinueActive && n2.ElapsedMilliseconds > t3) break;
            } while (this.canContinue);
            n2.Stop();
            let r2 = null;
            if (!i2 && this.canContinue || (null !== this._stateSnapshotAtLastNewline && this.RestoreStateSnapshot(), this.canContinue || (this.state.callStack.canPopThread && this.AddError("Thread available to pop, threads should always be flat by the end of evaluation?"), 0 != this.state.generatedChoices.length || this.state.didSafeExit || null != this._temporaryEvaluationContainer || (this.state.callStack.CanPop(v.Tunnel) ? this.AddError("unexpectedly reached end of content. Do you need a '->->' to return from a tunnel?") : this.state.callStack.CanPop(v.Function) ? this.AddError("unexpectedly reached end of content. Do you need a '~ return'?") : this.state.callStack.canPop ? this.AddError("unexpectedly reached end of content for unknown reason. Please debug compiler!") : this.AddError("ran out of content. Do you need a '-> DONE' or '-> END'?"))), this.state.didSafeExit = false, this._sawLookaheadUnsafeFunctionAfterNewline = false, 1 == this._recursiveContinueCount && (r2 = this._state.variablesState.CompleteVariableObservation()), this._asyncContinueActive = false, null !== this.onDidContinue && this.onDidContinue()), this._recursiveContinueCount--, null != this._profiler && this._profiler.PostContinue(), this.state.hasError || this.state.hasWarning) {
              if (null === this.onError) {
                let t4 = new b();
                throw t4.Append("Ink had "), this.state.hasError && (t4.Append(`${this.state.currentErrors.length}`), t4.Append(1 == this.state.currentErrors.length ? " error" : " errors"), this.state.hasWarning && t4.Append(" and ")), this.state.hasWarning && (t4.Append(`${this.state.currentWarnings.length}`), t4.Append(1 == this.state.currentWarnings.length ? " warning" : " warnings"), this.state.hasWarning && t4.Append(" and ")), t4.Append(". It is strongly suggested that you assign an error handler to story.onError. The first issue was: "), t4.Append(this.state.hasError ? this.state.currentErrors[0] : this.state.currentWarnings[0]), new _(t4.toString());
              }
              if (this.state.hasError) for (let t4 of this.state.currentErrors) this.onError(t4, ie.Error);
              if (this.state.hasWarning) for (let t4 of this.state.currentWarnings) this.onError(t4, ie.Warning);
              this.ResetErrors();
            }
            null != r2 && Object.keys(r2).length > 0 && this._state.variablesState.NotifyObservers(r2);
          }
          ContinueSingleStep() {
            if (null != this._profiler && this._profiler.PreStep(), this.Step(), null != this._profiler && this._profiler.PostStep(), this.canContinue || this.state.callStack.elementIsEvaluateFromGame || this.TryFollowDefaultInvisibleChoice(), null != this._profiler && this._profiler.PreSnapshot(), !this.state.inStringEvaluation) {
              if (null !== this._stateSnapshotAtLastNewline) {
                if (null === this._stateSnapshotAtLastNewline.currentTags) return S("this._stateAtLastNewline.currentTags");
                if (null === this.state.currentTags) return S("this.state.currentTags");
                let e2 = this.CalculateNewlineOutputStateChange(this._stateSnapshotAtLastNewline.currentText, this.state.currentText, this._stateSnapshotAtLastNewline.currentTags.length, this.state.currentTags.length);
                if (e2 == t2.OutputStateChange.ExtendedBeyondNewline || this._sawLookaheadUnsafeFunctionAfterNewline) return this.RestoreStateSnapshot(), true;
                e2 == t2.OutputStateChange.NewlineRemoved && this.DiscardSnapshot();
              }
              this.state.outputStreamEndsInNewline && (this.canContinue ? null == this._stateSnapshotAtLastNewline && this.StateSnapshot() : this.DiscardSnapshot());
            }
            return null != this._profiler && this._profiler.PostSnapshot(), false;
          }
          CalculateNewlineOutputStateChange(e2, n2, i2, r2) {
            if (null === e2) return S("prevText");
            if (null === n2) return S("currText");
            let s2 = n2.length >= e2.length && e2.length > 0 && "\n" == n2.charAt(e2.length - 1);
            if (i2 == r2 && e2.length == n2.length && s2) return t2.OutputStateChange.NoChange;
            if (!s2) return t2.OutputStateChange.NewlineRemoved;
            if (r2 > i2) return t2.OutputStateChange.ExtendedBeyondNewline;
            for (let i3 = e2.length; i3 < n2.length; i3++) {
              let e3 = n2.charAt(i3);
              if (" " != e3 && "	" != e3) return t2.OutputStateChange.ExtendedBeyondNewline;
            }
            return t2.OutputStateChange.NoChange;
          }
          ContinueMaximally() {
            this.IfAsyncWeCant("ContinueMaximally");
            let t3 = new b();
            for (; this.canContinue; ) t3.Append(this.Continue());
            return t3.toString();
          }
          ContentAtPath(t3) {
            return this.mainContentContainer.ContentAtPath(t3);
          }
          KnotContainerWithName(t3) {
            let e2 = this.mainContentContainer.namedContent.get(t3);
            return e2 instanceof L ? e2 : null;
          }
          PointerAtPath(t3) {
            if (0 == t3.length) return H.Null;
            let e2 = new H(), n2 = t3.length, i2 = null;
            return null === t3.lastComponent ? S("path.lastComponent") : (t3.lastComponent.isIndex ? (n2 = t3.length - 1, i2 = this.mainContentContainer.ContentAtPath(t3, void 0, n2), e2.container = i2.container, e2.index = t3.lastComponent.index) : (i2 = this.mainContentContainer.ContentAtPath(t3), e2.container = i2.container, e2.index = -1), null == i2.obj || i2.obj == this.mainContentContainer && n2 > 0 ? this.Error("Failed to find content at path '" + t3 + "', and no approximation of it was possible.") : i2.approximate && this.Warning("Failed to find content at path '" + t3 + "', so it was approximated to: '" + i2.obj.path + "'."), e2);
          }
          StateSnapshot() {
            this._stateSnapshotAtLastNewline = this._state, this._state = this._state.CopyAndStartPatching(false);
          }
          RestoreStateSnapshot() {
            null === this._stateSnapshotAtLastNewline && S("_stateSnapshotAtLastNewline"), this._stateSnapshotAtLastNewline.RestoreAfterPatch(), this._state = this._stateSnapshotAtLastNewline, this._stateSnapshotAtLastNewline = null, this._asyncSaving || this._state.ApplyAnyPatch();
          }
          DiscardSnapshot() {
            this._asyncSaving || this._state.ApplyAnyPatch(), this._stateSnapshotAtLastNewline = null;
          }
          CopyStateForBackgroundThreadSave() {
            if (this.IfAsyncWeCant("start saving on a background thread"), this._asyncSaving) throw new Error("Story is already in background saving mode, can't call CopyStateForBackgroundThreadSave again!");
            let t3 = this._state;
            return this._state = this._state.CopyAndStartPatching(true), this._asyncSaving = true, t3;
          }
          BackgroundSaveComplete() {
            null === this._stateSnapshotAtLastNewline && this._state.ApplyAnyPatch(), this._asyncSaving = false;
          }
          Step() {
            let t3 = true, e2 = this.state.currentPointer.copy();
            if (e2.isNull) return;
            let n2 = s(e2.Resolve(), L);
            for (; n2 && (this.VisitContainer(n2, true), 0 != n2.content.length); ) e2 = H.StartOf(n2), n2 = s(e2.Resolve(), L);
            this.state.currentPointer = e2.copy(), null != this._profiler && this._profiler.Step(this.state.callStack);
            let i2 = e2.Resolve(), r2 = this.PerformLogicAndFlowControl(i2);
            if (this.state.currentPointer.isNull) return;
            r2 && (t3 = false);
            let a2 = s(i2, K);
            if (a2) {
              let e3 = this.ProcessChoice(a2);
              e3 && this.state.generatedChoices.push(e3), i2 = null, t3 = false;
            }
            if (i2 instanceof L && (t3 = false), t3) {
              let t4 = s(i2, W);
              if (t4 && -1 == t4.contextIndex) {
                let e3 = this.state.callStack.ContextForVariableNamed(t4.variableName);
                i2 = new W(t4.variableName, e3);
              }
              this.state.inExpressionEvaluation ? this.state.PushEvaluationStack(i2) : this.state.PushToOutputStream(i2);
            }
            this.NextContent();
            let o2 = s(i2, D);
            o2 && o2.commandType == D.CommandType.StartThread && this.state.callStack.PushThread();
          }
          VisitContainer(t3, e2) {
            t3.countingAtStartOnly && !e2 || (t3.visitsShouldBeCounted && this.state.IncrementVisitCountForContainer(t3), t3.turnIndexShouldBeCounted && this.state.RecordTurnIndexVisitToContainer(t3));
          }
          VisitChangedContainersDueToDivert() {
            let t3 = this.state.previousPointer.copy(), e2 = this.state.currentPointer.copy();
            if (e2.isNull || -1 == e2.index) return;
            if (this._prevContainers.length = 0, !t3.isNull) {
              let e3 = s(t3.Resolve(), L) || s(t3.container, L);
              for (; e3; ) this._prevContainers.push(e3), e3 = s(e3.parent, L);
            }
            let n2 = e2.Resolve();
            if (null == n2) return;
            let i2 = s(n2.parent, L), r2 = true;
            for (; i2 && (this._prevContainers.indexOf(i2) < 0 || i2.countingAtStartOnly); ) {
              let t4 = i2.content.length > 0 && n2 == i2.content[0] && r2;
              t4 || (r2 = false), this.VisitContainer(i2, t4), n2 = i2, i2 = s(i2.parent, L);
            }
          }
          PopChoiceStringAndTags(t3) {
            let e2 = a(this.state.PopEvaluationStack(), O);
            for (; this.state.evaluationStack.length > 0 && null != s(this.state.PeekEvaluationStack(), Ut); ) {
              let e3 = s(this.state.PopEvaluationStack(), Ut);
              e3 && t3.push(e3.text);
            }
            return e2.value;
          }
          ProcessChoice(t3) {
            let e2 = true;
            if (t3.hasCondition) {
              let t4 = this.state.PopEvaluationStack();
              this.IsTruthy(t4) || (e2 = false);
            }
            let n2 = "", i2 = "", r2 = [];
            if (t3.hasChoiceOnlyContent && (i2 = this.PopChoiceStringAndTags(r2) || ""), t3.hasStartContent && (n2 = this.PopChoiceStringAndTags(r2) || ""), t3.onceOnly) {
              this.state.VisitCountForContainer(t3.choiceTarget) > 0 && (e2 = false);
            }
            if (!e2) return null;
            let s2 = new Kt();
            return s2.targetPath = t3.pathOnChoice, s2.sourcePath = t3.path.toString(), s2.isInvisibleDefault = t3.isInvisibleDefault, s2.threadAtGeneration = this.state.callStack.ForkThread(), s2.tags = r2.reverse(), s2.text = (n2 + i2).replace(/^[ \t]+|[ \t]+$/g, ""), s2;
          }
          IsTruthy(t3) {
            if (t3 instanceof A) {
              let e2 = t3;
              if (e2 instanceof F) {
                let t4 = e2;
                return this.Error("Shouldn't use a divert target (to " + t4.targetPath + ") as a conditional value. Did you intend a function call 'likeThis()' or a read count check 'likeThis'? (no arrows)"), false;
              }
              return e2.isTruthy;
            }
            return false;
          }
          PerformLogicAndFlowControl(t3) {
            if (null == t3) return false;
            if (t3 instanceof J) {
              let e2 = t3;
              if (e2.isConditional) {
                let t4 = this.state.PopEvaluationStack();
                if (!this.IsTruthy(t4)) return true;
              }
              if (e2.hasVariableTarget) {
                let t4 = e2.variableDivertName, n2 = this.state.variablesState.GetVariableWithName(t4);
                if (null == n2) this.Error("Tried to divert using a target from a variable that could not be found (" + t4 + ")");
                else if (!(n2 instanceof F)) {
                  let e3 = s(n2, N), i3 = "Tried to divert to a target from a variable, but the variable (" + t4 + ") didn't contain a divert target, it ";
                  e3 instanceof N && 0 == e3.value ? i3 += "was empty/null (the value 0)." : i3 += "contained '" + n2 + "'.", this.Error(i3);
                }
                let i2 = a(n2, F);
                this.state.divertedPointer = this.PointerAtPath(i2.targetPath);
              } else {
                if (e2.isExternal) return this.CallExternalFunction(e2.targetPathString, e2.externalArgs), true;
                this.state.divertedPointer = e2.targetPointer.copy();
              }
              return e2.pushesToStack && this.state.callStack.Push(e2.stackPushType, void 0, this.state.outputStream.length), this.state.divertedPointer.isNull && !e2.isExternal && (e2 && e2.debugMetadata && null != e2.debugMetadata.sourceName ? this.Error("Divert target doesn't exist: " + e2.debugMetadata.sourceName) : this.Error("Divert resolution failed: " + e2)), true;
            }
            if (t3 instanceof D) {
              let e2 = t3;
              switch (e2.commandType) {
                case D.CommandType.EvalStart:
                  this.Assert(false === this.state.inExpressionEvaluation, "Already in expression evaluation?"), this.state.inExpressionEvaluation = true;
                  break;
                case D.CommandType.EvalEnd:
                  this.Assert(true === this.state.inExpressionEvaluation, "Not in expression evaluation mode"), this.state.inExpressionEvaluation = false;
                  break;
                case D.CommandType.EvalOutput:
                  if (this.state.evaluationStack.length > 0) {
                    let t5 = this.state.PopEvaluationStack();
                    if (!(t5 instanceof j)) {
                      let e3 = new O(t5.toString());
                      this.state.PushToOutputStream(e3);
                    }
                  }
                  break;
                case D.CommandType.NoOp:
                  break;
                case D.CommandType.Duplicate:
                  this.state.PushEvaluationStack(this.state.PeekEvaluationStack());
                  break;
                case D.CommandType.PopEvaluatedValue:
                  this.state.PopEvaluationStack();
                  break;
                case D.CommandType.PopFunction:
                case D.CommandType.PopTunnel:
                  let t4 = e2.commandType == D.CommandType.PopFunction ? v.Function : v.Tunnel, n2 = null;
                  if (t4 == v.Tunnel) {
                    let t5 = this.state.PopEvaluationStack();
                    n2 = s(t5, F), null === n2 && this.Assert(t5 instanceof j, "Expected void if ->-> doesn't override target");
                  }
                  if (this.state.TryExitFunctionEvaluationFromGame()) break;
                  if (this.state.callStack.currentElement.type == t4 && this.state.callStack.canPop) this.state.PopCallStack(), n2 && (this.state.divertedPointer = this.PointerAtPath(n2.targetPath));
                  else {
                    let e3 = /* @__PURE__ */ new Map();
                    e3.set(v.Function, "function return statement (~ return)"), e3.set(v.Tunnel, "tunnel onwards statement (->->)");
                    let n3 = e3.get(this.state.callStack.currentElement.type);
                    this.state.callStack.canPop || (n3 = "end of flow (-> END or choice)");
                    let i3 = "Found " + e3.get(t4) + ", when expected " + n3;
                    this.Error(i3);
                  }
                  break;
                case D.CommandType.BeginString:
                  this.state.PushToOutputStream(e2), this.Assert(true === this.state.inExpressionEvaluation, "Expected to be in an expression when evaluating a string"), this.state.inExpressionEvaluation = false;
                  break;
                case D.CommandType.BeginTag:
                  this.state.PushToOutputStream(e2);
                  break;
                case D.CommandType.EndTag:
                  if (this.state.inStringEvaluation) {
                    let t5 = [], e3 = 0;
                    for (let n4 = this.state.outputStream.length - 1; n4 >= 0; --n4) {
                      let i4 = this.state.outputStream[n4];
                      e3++;
                      let r3 = s(i4, D);
                      if (null != r3) {
                        if (r3.commandType == D.CommandType.BeginTag) break;
                        this.Error("Unexpected ControlCommand while extracting tag from choice");
                        break;
                      }
                      i4 instanceof O && t5.push(i4);
                    }
                    this.state.PopFromOutputStream(e3);
                    let n3 = new b();
                    for (let e4 of t5.reverse()) n3.Append(e4.toString());
                    let i3 = new Ut(this.state.CleanOutputWhitespace(n3.toString()));
                    this.state.PushEvaluationStack(i3);
                  } else this.state.PushToOutputStream(e2);
                  break;
                case D.CommandType.EndString: {
                  let t5 = [], e3 = [], n3 = 0;
                  for (let i4 = this.state.outputStream.length - 1; i4 >= 0; --i4) {
                    let r3 = this.state.outputStream[i4];
                    n3++;
                    let a2 = s(r3, D);
                    if (a2 && a2.commandType == D.CommandType.BeginString) break;
                    r3 instanceof Ut && e3.push(r3), r3 instanceof O && t5.push(r3);
                  }
                  this.state.PopFromOutputStream(n3);
                  for (let t6 of e3) this.state.PushToOutputStream(t6);
                  t5 = t5.reverse();
                  let i3 = new b();
                  for (let e4 of t5) i3.Append(e4.toString());
                  this.state.inExpressionEvaluation = true, this.state.PushEvaluationStack(new O(i3.toString()));
                  break;
                }
                case D.CommandType.ChoiceCount:
                  let i2 = this.state.generatedChoices.length;
                  this.state.PushEvaluationStack(new N(i2));
                  break;
                case D.CommandType.Turns:
                  this.state.PushEvaluationStack(new N(this.state.currentTurnIndex + 1));
                  break;
                case D.CommandType.TurnsSince:
                case D.CommandType.ReadCount:
                  let r2 = this.state.PopEvaluationStack();
                  if (!(r2 instanceof F)) {
                    let t5 = "";
                    r2 instanceof N && (t5 = ". Did you accidentally pass a read count ('knot_name') instead of a target ('-> knot_name')?"), this.Error("TURNS_SINCE / READ_COUNT expected a divert target (knot, stitch, label name), but saw " + r2 + t5);
                    break;
                  }
                  let o2, l2 = a(r2, F), h2 = s(this.ContentAtPath(l2.targetPath).correctObj, L);
                  null != h2 ? o2 = e2.commandType == D.CommandType.TurnsSince ? this.state.TurnsSinceForContainer(h2) : this.state.VisitCountForContainer(h2) : (o2 = e2.commandType == D.CommandType.TurnsSince ? -1 : 0, this.Warning("Failed to find container for " + e2.toString() + " lookup at " + l2.targetPath.toString())), this.state.PushEvaluationStack(new N(o2));
                  break;
                case D.CommandType.Random: {
                  let t5 = s(this.state.PopEvaluationStack(), N), e3 = s(this.state.PopEvaluationStack(), N);
                  if (null == e3 || e3 instanceof N == false) return this.Error("Invalid value for minimum parameter of RANDOM(min, max)");
                  if (null == t5 || t5 instanceof N == false) return this.Error("Invalid value for maximum parameter of RANDOM(min, max)");
                  if (null === t5.value) return S("maxInt.value");
                  if (null === e3.value) return S("minInt.value");
                  let n3 = t5.value - e3.value + 1;
                  (!isFinite(n3) || n3 > Number.MAX_SAFE_INTEGER) && (n3 = Number.MAX_SAFE_INTEGER, this.Error("RANDOM was called with a range that exceeds the size that ink numbers can use.")), n3 <= 0 && this.Error("RANDOM was called with minimum as " + e3.value + " and maximum as " + t5.value + ". The maximum must be larger");
                  let i3 = this.state.storySeed + this.state.previousRandom, r3 = new Yt(i3).next(), a2 = r3 % n3 + e3.value;
                  this.state.PushEvaluationStack(new N(a2)), this.state.previousRandom = r3;
                  break;
                }
                case D.CommandType.SeedRandom:
                  let u2 = s(this.state.PopEvaluationStack(), N);
                  if (null == u2 || u2 instanceof N == false) return this.Error("Invalid value passed to SEED_RANDOM");
                  if (null === u2.value) return S("minInt.value");
                  this.state.storySeed = u2.value, this.state.previousRandom = 0, this.state.PushEvaluationStack(new j());
                  break;
                case D.CommandType.VisitIndex:
                  let c2 = this.state.VisitCountForContainer(this.state.currentPointer.container) - 1;
                  this.state.PushEvaluationStack(new N(c2));
                  break;
                case D.CommandType.SequenceShuffleIndex:
                  let d2 = this.NextSequenceShuffleIndex();
                  this.state.PushEvaluationStack(new N(d2));
                  break;
                case D.CommandType.StartThread:
                  break;
                case D.CommandType.Done:
                  this.state.callStack.canPopThread ? this.state.callStack.PopThread() : (this.state.didSafeExit = true, this.state.currentPointer = H.Null);
                  break;
                case D.CommandType.End:
                  this.state.ForceEnd();
                  break;
                case D.CommandType.ListFromInt:
                  let p2 = s(this.state.PopEvaluationStack(), N), m2 = a(this.state.PopEvaluationStack(), O);
                  if (null === p2) throw new _("Passed non-integer when creating a list element from a numerical value.");
                  let f2 = null;
                  if (null === this.listDefinitions) return S("this.listDefinitions");
                  let g2 = this.listDefinitions.TryListGetDefinition(m2.value, null);
                  if (!g2.exists) throw new _("Failed to find LIST called " + m2.value);
                  {
                    if (null === p2.value) return S("minInt.value");
                    let t5 = g2.result.TryGetItemWithValue(p2.value, w.Null);
                    t5.exists && (f2 = new R(t5.result, p2.value));
                  }
                  null == f2 && (f2 = new R()), this.state.PushEvaluationStack(f2);
                  break;
                case D.CommandType.ListRange:
                  let C2 = s(this.state.PopEvaluationStack(), A), y2 = s(this.state.PopEvaluationStack(), A), T2 = s(this.state.PopEvaluationStack(), R);
                  if (null === T2 || null === y2 || null === C2) throw new _("Expected list, minimum and maximum for LIST_RANGE");
                  if (null === T2.value) return S("targetList.value");
                  let x2 = T2.value.ListWithSubRange(y2.valueObject, C2.valueObject);
                  this.state.PushEvaluationStack(new R(x2));
                  break;
                case D.CommandType.ListRandom: {
                  let t5 = this.state.PopEvaluationStack();
                  if (null === t5) throw new _("Expected list for LIST_RANDOM");
                  let e3 = t5.value, n3 = null;
                  if (null === e3) throw S("list");
                  if (0 == e3.Count) n3 = new E();
                  else {
                    let t6 = this.state.storySeed + this.state.previousRandom, i3 = new Yt(t6).next(), r3 = i3 % e3.Count, s2 = e3.entries();
                    for (let t7 = 0; t7 <= r3 - 1; t7++) s2.next();
                    let a2 = s2.next().value, o3 = { Key: w.fromSerializedKey(a2[0]), Value: a2[1] };
                    if (null === o3.Key.originName) return S("randomItem.Key.originName");
                    n3 = new E(o3.Key.originName, this), n3.Add(o3.Key, o3.Value), this.state.previousRandom = i3;
                  }
                  this.state.PushEvaluationStack(new R(n3));
                  break;
                }
                default:
                  this.Error("unhandled ControlCommand: " + e2);
              }
              return true;
            }
            if (t3 instanceof X) {
              let e2 = t3, n2 = this.state.PopEvaluationStack();
              return this.state.variablesState.Assign(e2, n2), true;
            }
            if (t3 instanceof mt) {
              let e2 = t3, n2 = null;
              if (null != e2.pathForCount) {
                let t4 = e2.containerForCount, i2 = this.state.VisitCountForContainer(t4);
                n2 = new N(i2);
              } else n2 = this.state.variablesState.GetVariableWithName(e2.name), null == n2 && (this.Warning("Variable not found: '" + e2.name + "'. Using default value of 0 (false). This can happen with temporary variables if the declaration hasn't yet been hit. Globals are always given a default value on load if a value doesn't exist in the save state."), n2 = new N(0));
              return this.state.PushEvaluationStack(n2), true;
            }
            if (t3 instanceof B) {
              let e2 = t3, n2 = this.state.PopEvaluationStack(e2.numberOfParameters), i2 = e2.Call(n2);
              return this.state.PushEvaluationStack(i2), true;
            }
            return false;
          }
          ChoosePathString(t3) {
            let e2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            if (this.IfAsyncWeCant("call ChoosePathString right now"), null !== this.onChoosePathString && this.onChoosePathString(t3, n2), e2) this.ResetCallstack();
            else if (this.state.callStack.currentElement.type == v.Function) {
              let e3 = "", n3 = this.state.callStack.currentElement.currentPointer.container;
              throw null != n3 && (e3 = "(" + n3.path.toString() + ") "), new Error("Story was running a function " + e3 + "when you called ChoosePathString(" + t3 + ") - this is almost certainly not not what you want! Full stack trace: \n" + this.state.callStack.callStackTrace);
            }
            this.state.PassArgumentsToEvaluationStack(n2), this.ChoosePath(new m(t3));
          }
          IfAsyncWeCant(t3) {
            if (this._asyncContinueActive) throw new Error("Can't " + t3 + ". Story is in the middle of a ContinueAsync(). Make more ContinueAsync() calls or a single Continue() call beforehand.");
          }
          ChoosePath(t3) {
            let e2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            this.state.SetChosenPath(t3, e2), this.VisitChangedContainersDueToDivert();
          }
          ChooseChoiceIndex(t3) {
            let e2 = this.currentChoices;
            this.Assert(t3 >= 0 && t3 < e2.length, "choice out of range");
            let n2 = e2[t3];
            return null !== this.onMakeChoice && this.onMakeChoice(n2), null === n2.threadAtGeneration ? S("choiceToChoose.threadAtGeneration") : null === n2.targetPath ? S("choiceToChoose.targetPath") : (this.state.callStack.currentThread = n2.threadAtGeneration, void this.ChoosePath(n2.targetPath));
          }
          HasFunction(t3) {
            try {
              return null != this.KnotContainerWithName(t3);
            } catch (t4) {
              return false;
            }
          }
          EvaluateFunction(t3) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (null !== this.onEvaluateFunction && this.onEvaluateFunction(t3, e2), this.IfAsyncWeCant("evaluate a function"), null == t3) throw new Error("Function is null");
            if ("" == t3 || "" == t3.trim()) throw new Error("Function is empty or white space.");
            let i2 = this.KnotContainerWithName(t3);
            if (null == i2) throw new Error("Function doesn't exist: '" + t3 + "'");
            let r2 = [];
            r2.push(...this.state.outputStream), this._state.ResetOutput(), this.state.StartFunctionEvaluationFromGame(i2, e2);
            let s2 = new b();
            for (; this.canContinue; ) s2.Append(this.Continue());
            let a2 = s2.toString();
            this._state.ResetOutput(r2);
            let o2 = this.state.CompleteFunctionEvaluationFromGame();
            return null != this.onCompleteEvaluateFunction && this.onCompleteEvaluateFunction(t3, e2, a2, o2), n2 ? { returned: o2, output: a2 } : o2;
          }
          EvaluateExpression(t3) {
            let e2 = this.state.callStack.elements.length;
            this.state.callStack.Push(v.Tunnel), this._temporaryEvaluationContainer = t3, this.state.GoToStart();
            let n2 = this.state.evaluationStack.length;
            return this.Continue(), this._temporaryEvaluationContainer = null, this.state.callStack.elements.length > e2 && this.state.PopCallStack(), this.state.evaluationStack.length > n2 ? this.state.PopEvaluationStack() : null;
          }
          CallExternalFunction(t3, e2) {
            if (null === t3) return S("funcName");
            let n2 = this._externals.get(t3), i2 = null, r2 = void 0 !== n2;
            if (r2 && !n2.lookAheadSafe && this._state.inStringEvaluation && this.Error("External function " + t3 + ` could not be called because 1) it wasn't marked as lookaheadSafe when BindExternalFunction was called and 2) the story is in the middle of string generation, either because choice text is being generated, or because you have ink like "hello {func()}". You can work around this by generating the result of your function into a temporary variable before the string or choice gets generated: ~ temp x = ` + t3 + "()"), r2 && !n2.lookAheadSafe && null !== this._stateSnapshotAtLastNewline) return void (this._sawLookaheadUnsafeFunctionAfterNewline = true);
            if (!r2) {
              if (this.allowExternalFunctionFallbacks) return i2 = this.KnotContainerWithName(t3), this.Assert(null !== i2, "Trying to call EXTERNAL function '" + t3 + "' which has not been bound, and fallback ink function could not be found."), this.state.callStack.Push(v.Function, void 0, this.state.outputStream.length), void (this.state.divertedPointer = H.StartOf(i2));
              this.Assert(false, "Trying to call EXTERNAL function '" + t3 + "' which has not been bound (and ink fallbacks disabled).");
            }
            let s2 = [];
            for (let t4 = 0; t4 < e2; ++t4) {
              let t5 = a(this.state.PopEvaluationStack(), A).valueObject;
              s2.push(t5);
            }
            s2.reverse();
            let o2 = n2.function(s2), l2 = null;
            null != o2 ? (l2 = A.Create(o2), this.Assert(null !== l2, "Could not create ink value from returned object of type " + typeof o2)) : l2 = new j(), this.state.PushEvaluationStack(l2);
          }
          BindExternalFunctionGeneral(t3, e2) {
            let n2 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            this.IfAsyncWeCant("bind an external function"), this.Assert(!this._externals.has(t3), "Function '" + t3 + "' has already been bound."), this._externals.set(t3, { function: e2, lookAheadSafe: n2 });
          }
          TryCoerce(t3) {
            return t3;
          }
          BindExternalFunction(t3, e2) {
            let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            this.Assert(null != e2, "Can't bind a null function"), this.BindExternalFunctionGeneral(t3, ((t4) => {
              this.Assert(t4.length >= e2.length, "External function expected " + e2.length + " arguments");
              let n3 = [];
              for (let e3 = 0, i2 = t4.length; e3 < i2; e3++) n3[e3] = this.TryCoerce(t4[e3]);
              return e2.apply(null, n3);
            }), n2);
          }
          UnbindExternalFunction(t3) {
            this.IfAsyncWeCant("unbind an external a function"), this.Assert(this._externals.has(t3), "Function '" + t3 + "' has not been bound."), this._externals.delete(t3);
          }
          ValidateExternalBindings() {
            let t3 = null, e2 = null, n2 = arguments[1] || /* @__PURE__ */ new Set();
            if (arguments[0] instanceof L && (t3 = arguments[0]), arguments[0] instanceof y && (e2 = arguments[0]), null === t3 && null === e2) if (this.ValidateExternalBindings(this._mainContentContainer, n2), this._hasValidatedExternals = true, 0 == n2.size) this._hasValidatedExternals = true;
            else {
              let t4 = "Error: Missing function binding for external";
              t4 += n2.size > 1 ? "s" : "", t4 += ": '", t4 += Array.from(n2).join("', '"), t4 += "' ", t4 += this.allowExternalFunctionFallbacks ? ", and no fallback ink function found." : " (ink fallbacks disabled)", this.Error(t4);
            }
            else if (null != t3) {
              for (let e3 of t3.content) {
                null != e3 && e3.hasValidName || this.ValidateExternalBindings(e3, n2);
              }
              for (let [, e3] of t3.namedContent) this.ValidateExternalBindings(s(e3, y), n2);
            } else if (null != e2) {
              let t4 = s(e2, J);
              if (t4 && t4.isExternal) {
                let e3 = t4.targetPathString;
                if (null === e3) return S("name");
                if (!this._externals.has(e3)) if (this.allowExternalFunctionFallbacks) {
                  this.mainContentContainer.namedContent.has(e3) || n2.add(e3);
                } else n2.add(e3);
              }
            }
          }
          ObserveVariable(t3, e2) {
            if (this.IfAsyncWeCant("observe a new variable"), null === this._variableObservers && (this._variableObservers = /* @__PURE__ */ new Map()), !this.state.variablesState.GlobalVariableExistsWithName(t3)) throw new Error("Cannot observe variable '" + t3 + "' because it wasn't declared in the ink story.");
            this._variableObservers.has(t3) ? this._variableObservers.get(t3).push(e2) : this._variableObservers.set(t3, [e2]);
          }
          ObserveVariables(t3, e2) {
            for (let n2 = 0, i2 = t3.length; n2 < i2; n2++) this.ObserveVariable(t3[n2], e2[n2]);
          }
          RemoveVariableObserver(t3, e2) {
            if (this.IfAsyncWeCant("remove a variable observer"), null !== this._variableObservers) {
              if (null != e2) {
                if (this._variableObservers.has(e2)) if (null != t3) {
                  let n2 = this._variableObservers.get(e2);
                  null != n2 && (n2.splice(n2.indexOf(t3), 1), 0 === n2.length && this._variableObservers.delete(e2));
                } else this._variableObservers.delete(e2);
              } else if (null != t3) {
                let e3 = this._variableObservers.keys();
                for (let n2 of e3) {
                  let e4 = this._variableObservers.get(n2);
                  null != e4 && (e4.splice(e4.indexOf(t3), 1), 0 === e4.length && this._variableObservers.delete(n2));
                }
              }
            }
          }
          VariableStateDidChangeEvent(t3, e2) {
            if (null === this._variableObservers) return;
            let n2 = this._variableObservers.get(t3);
            if (void 0 !== n2) {
              if (!(e2 instanceof A)) throw new Error("Tried to get the value of a variable that isn't a standard type");
              let i2 = a(e2, A);
              for (let e3 of n2) e3(t3, i2.valueObject);
            }
          }
          get globalTags() {
            return this.TagsAtStartOfFlowContainerWithPathString("");
          }
          TagsForContentAtPath(t3) {
            return this.TagsAtStartOfFlowContainerWithPathString(t3);
          }
          TagsAtStartOfFlowContainerWithPathString(t3) {
            let e2 = new m(t3), n2 = this.ContentAtPath(e2).container;
            if (null === n2) return S("flowContainer");
            for (; ; ) {
              let t4 = n2.content[0];
              if (!(t4 instanceof L)) break;
              n2 = t4;
            }
            let i2 = false, r2 = null;
            for (let t4 of n2.content) {
              let e3 = s(t4, D);
              if (null != e3) e3.commandType == D.CommandType.BeginTag ? i2 = true : e3.commandType == D.CommandType.EndTag && (i2 = false);
              else {
                if (!i2) break;
                {
                  let e4 = s(t4, O);
                  null !== e4 ? (null === r2 && (r2 = []), null !== e4.value && r2.push(e4.value)) : this.Error("Tag contained non-text content. Only plain text is allowed when using globalTags or TagsAtContentPath. If you want to evaluate dynamic content, you need to use story.Continue().");
                }
              }
            }
            return r2;
          }
          BuildStringOfHierarchy() {
            let t3 = new b();
            return this.mainContentContainer.BuildStringOfHierarchy(t3, 0, this.state.currentPointer.Resolve()), t3.toString();
          }
          BuildStringOfContainer(t3) {
            let e2 = new b();
            return t3.BuildStringOfHierarchy(e2, 0, this.state.currentPointer.Resolve()), e2.toString();
          }
          NextContent() {
            if (this.state.previousPointer = this.state.currentPointer.copy(), !this.state.divertedPointer.isNull && (this.state.currentPointer = this.state.divertedPointer.copy(), this.state.divertedPointer = H.Null, this.VisitChangedContainersDueToDivert(), !this.state.currentPointer.isNull)) return;
            if (!this.IncrementContentPointer()) {
              let t3 = false;
              this.state.callStack.CanPop(v.Function) ? (this.state.PopCallStack(v.Function), this.state.inExpressionEvaluation && this.state.PushEvaluationStack(new j()), t3 = true) : this.state.callStack.canPopThread ? (this.state.callStack.PopThread(), t3 = true) : this.state.TryExitFunctionEvaluationFromGame(), t3 && !this.state.currentPointer.isNull && this.NextContent();
            }
          }
          IncrementContentPointer() {
            let t3 = true, e2 = this.state.callStack.currentElement.currentPointer.copy();
            if (e2.index++, null === e2.container) return S("pointer.container");
            for (; e2.index >= e2.container.content.length; ) {
              t3 = false;
              let n2 = s(e2.container.parent, L);
              if (n2 instanceof L == false) break;
              let i2 = n2.content.indexOf(e2.container);
              if (-1 == i2) break;
              if (e2 = new H(n2, i2), e2.index++, t3 = true, null === e2.container) return S("pointer.container");
            }
            return t3 || (e2 = H.Null), this.state.callStack.currentElement.currentPointer = e2.copy(), t3;
          }
          TryFollowDefaultInvisibleChoice() {
            let t3 = this._state.currentChoices, e2 = t3.filter(((t4) => t4.isInvisibleDefault));
            if (0 == e2.length || t3.length > e2.length) return false;
            let n2 = e2[0];
            return null === n2.targetPath ? S("choice.targetPath") : null === n2.threadAtGeneration ? S("choice.threadAtGeneration") : (this.state.callStack.currentThread = n2.threadAtGeneration, null !== this._stateSnapshotAtLastNewline && (this.state.callStack.currentThread = this.state.callStack.ForkThread()), this.ChoosePath(n2.targetPath, false), true);
          }
          NextSequenceShuffleIndex() {
            let t3 = s(this.state.PopEvaluationStack(), N);
            if (!(t3 instanceof N)) return this.Error("expected number of elements in sequence for shuffle index"), 0;
            let e2 = this.state.currentPointer.container;
            if (null === e2) return S("seqContainer");
            if (null === t3.value) return S("numElementsIntVal.value");
            let n2 = t3.value, i2 = a(this.state.PopEvaluationStack(), N).value;
            if (null === i2) return S("seqCount");
            let r2 = i2 / n2, o2 = i2 % n2, l2 = e2.path.toString(), h2 = 0;
            for (let t4 = 0, e3 = l2.length; t4 < e3; t4++) h2 += l2.charCodeAt(t4) || 0;
            let u2 = h2 + r2 + this.state.storySeed, c2 = new Yt(Math.floor(u2)), d2 = [];
            for (let t4 = 0; t4 < n2; ++t4) d2.push(t4);
            for (let t4 = 0; t4 <= o2; ++t4) {
              let e3 = c2.next() % d2.length, n3 = d2[e3];
              if (d2.splice(e3, 1), t4 == o2) return n3;
            }
            throw new Error("Should never reach here");
          }
          Error(t3) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n2 = new _(t3);
            throw n2.useEndLineNumber = e2, n2;
          }
          Warning(t3) {
            this.AddError(t3, true);
          }
          AddError(t3) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i2 = this.currentDebugMetadata, r2 = e2 ? "WARNING" : "ERROR";
            if (null != i2) {
              let e3 = n2 ? i2.endLineNumber : i2.startLineNumber;
              t3 = "RUNTIME " + r2 + ": '" + i2.fileName + "' line " + e3 + ": " + t3;
            } else t3 = this.state.currentPointer.isNull ? "RUNTIME " + r2 + ": " + t3 : "RUNTIME " + r2 + ": (" + this.state.currentPointer + "): " + t3;
            this.state.AddError(t3, e2), e2 || this.state.ForceEnd();
          }
          Assert(t3) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if (0 == t3) throw null == e2 && (e2 = "Story assert"), new Error(e2 + " " + this.currentDebugMetadata);
          }
          get currentDebugMetadata() {
            let t3, e2 = this.state.currentPointer;
            if (!e2.isNull && null !== e2.Resolve() && (t3 = e2.Resolve().debugMetadata, null !== t3)) return t3;
            for (let n2 = this.state.callStack.elements.length - 1; n2 >= 0; --n2) if (e2 = this.state.callStack.elements[n2].currentPointer, !e2.isNull && null !== e2.Resolve() && (t3 = e2.Resolve().debugMetadata, null !== t3)) return t3;
            for (let e3 = this.state.outputStream.length - 1; e3 >= 0; --e3) {
              if (t3 = this.state.outputStream[e3].debugMetadata, null !== t3) return t3;
            }
            return null;
          }
          get mainContentContainer() {
            return this._temporaryEvaluationContainer ? this._temporaryEvaluationContainer : this._mainContentContainer;
          }
        };
        re.inkVersionCurrent = 21, (function(t2) {
          var e2;
          (e2 = t2.OutputStateChange || (t2.OutputStateChange = {}))[e2.NoChange = 0] = "NoChange", e2[e2.ExtendedBeyondNewline = 1] = "ExtendedBeyondNewline", e2[e2.NewlineRemoved = 2] = "NewlineRemoved";
        })(re || (re = {}));
        class se extends dt {
          get flowLevel() {
            return at.Story;
          }
          get hadError() {
            return this._hadError;
          }
          get hadWarning() {
            return this._hadWarning;
          }
          constructor(t2) {
            var e2;
            super(null, t2, null, false, arguments.length > 1 && void 0 !== arguments[1] && arguments[1]), e2 = this, this._errorHandler = null, this._hadError = false, this._hadWarning = false, this._dontFlattenContainers = /* @__PURE__ */ new Set(), this._listDefs = /* @__PURE__ */ new Map(), this.constants = /* @__PURE__ */ new Map(), this.externals = /* @__PURE__ */ new Map(), this.countAllVisits = false, this.ExportRuntime = function() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
              var n2, i2;
              e2._errorHandler = t3, e2.constants = /* @__PURE__ */ new Map();
              for (const t4 of e2.FindAll(st)()) {
                const n3 = e2.constants.get(t4.constantName);
                if (n3 && !n3.Equals(t4.expression)) {
                  const i3 = `CONST '${t4.constantName}' has been redefined with a different value. Multiple definitions of the same CONST are valid so long as they contain the same value. Initial definition was on ${n3.debugMetadata}.`;
                  e2.Error(i3, t4, false);
                }
                e2.constants.set(t4.constantName, t4.expression);
              }
              e2._listDefs = /* @__PURE__ */ new Map();
              for (const t4 of e2.FindAll(xt)()) (null === (n2 = t4.identifier) || void 0 === n2 ? void 0 : n2.name) && e2._listDefs.set(null === (i2 = t4.identifier) || void 0 === i2 ? void 0 : i2.name, t4);
              e2.externals = /* @__PURE__ */ new Map(), e2.ResolveWeavePointNaming();
              const r2 = e2.runtimeObject, s2 = new L();
              s2.AddContent(D.EvalStart());
              const a2 = [];
              for (const [t4, n3] of e2.variableDeclarations) if (n3.isGlobalDeclaration) {
                if (n3.listDefinition) e2._listDefs.set(t4, n3.listDefinition), s2.AddContent(n3.listDefinition.runtimeObject), a2.push(n3.listDefinition.runtimeListDefinition);
                else {
                  if (!n3.expression) throw new Error();
                  n3.expression.GenerateIntoContainer(s2);
                }
                const i3 = new X(t4, true);
                i3.isGlobal = true, s2.AddContent(i3);
              }
              s2.AddContent(D.EvalEnd()), s2.AddContent(D.End()), e2.variableDeclarations.size > 0 && (s2.name = "global decl", r2.AddToNamedContentOnly(s2)), r2.AddContent(D.Done());
              const o2 = new re(r2, a2);
              return e2.runtimeObject = o2, e2.hadError ? null : (e2.FlattenContainersIn(r2), e2.ResolveReferences(e2), e2.hadError ? null : (o2.ResetState(), o2));
            }, this.ResolveList = (t3) => {
              let e3 = this._listDefs.get(t3);
              return e3 || null;
            }, this.ResolveListItem = function(t3, n2) {
              let i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, r2 = null;
              if (t3) return (r2 = e2._listDefs.get(t3)) ? r2.ItemNamed(n2) : null;
              {
                let t4 = null, r3 = null;
                for (const [, s2] of e2._listDefs.entries()) {
                  const a2 = s2.ItemNamed(n2);
                  a2 && (t4 ? e2.Error(`Ambiguous item name '${n2}' found in multiple sets, including ${r3.identifier} and ${s2.identifier}`, i2, false) : (t4 = a2, r3 = s2));
                }
                return t4;
              }
            }, this.FlattenContainersIn = (t3) => {
              const e3 = /* @__PURE__ */ new Set();
              if (t3.content) for (const n2 of t3.content) {
                const t4 = s(n2, L);
                t4 && e3.add(t4);
              }
              if (t3.namedContent) for (const [, n2] of t3.namedContent) {
                const t4 = s(n2, L);
                t4 && e3.add(t4);
              }
              for (const t4 of e3) this.TryFlattenContainer(t4), this.FlattenContainersIn(t4);
            }, this.TryFlattenContainer = (t3) => {
              if (t3.namedContent && t3.namedContent.size > 0 || t3.hasValidName || this._dontFlattenContainers.has(t3)) return;
              const e3 = s(t3.parent, L);
              if (e3) {
                let n2 = e3.content.indexOf(t3);
                e3.content.splice(n2, 1);
                const i2 = t3.ownDebugMetadata;
                if (t3.content) for (const r2 of t3.content) r2.parent = null, null !== i2 && null === r2.ownDebugMetadata && (r2.debugMetadata = i2), e3.InsertContent(r2, n2), n2 += 1;
              }
            }, this.Error = (t3, e3, n2) => {
              let r2 = n2 ? i.Warning : i.Error, s2 = "";
              if (e3 instanceof p ? (s2 += "TODO: ", r2 = i.Author) : s2 += n2 ? "WARNING: " : "ERROR: ", e3 && null !== e3.debugMetadata && e3.debugMetadata.startLineNumber >= 1 && (null != e3.debugMetadata.fileName && (s2 += `'${e3.debugMetadata.fileName}' `), s2 += `line ${e3.debugMetadata.startLineNumber}: `), s2 += t3, t3 = s2, null === this._errorHandler) throw new Error(t3);
              this._errorHandler(t3, r2), this._hadError = r2 === i.Error, this._hadWarning = r2 === i.Warning;
            }, this.ResetError = () => {
              this._hadError = false, this._hadWarning = false;
            }, this.IsExternal = (t3) => this.externals.has(t3), this.AddExternal = (t3) => {
              this.externals.has(t3.name) ? this.Error(`Duplicate EXTERNAL definition of '${t3.name}'`, t3, false) : t3.name && this.externals.set(t3.name, t3);
            }, this.DontFlattenContainer = (t3) => {
              this._dontFlattenContainers.add(t3);
            }, this.NameConflictError = (t3, e3, n2, i2) => {
              t3.Error(`${i2} '${e3}': name has already been used for a ${n2.typeName.toLowerCase()} on ${n2.debugMetadata}`);
            }, this.CheckForNamingCollisions = function(t3, n2, i2) {
              var r2;
              const a2 = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "") || t3.typeName;
              if (se.IsReservedKeyword(null == n2 ? void 0 : n2.name)) return void t3.Error(`'${n2}' cannot be used for the name of a ${a2.toLowerCase()} because it's a reserved keyword`);
              if (gt.IsBuiltIn((null == n2 ? void 0 : n2.name) || "")) return void t3.Error(`'${n2}' cannot be used for the name of a ${a2.toLowerCase()} because it's a built in function`);
              const o2 = s(e2.ContentWithNameAtLevel((null == n2 ? void 0 : n2.name) || "", at.Knot), dt);
              if (o2 && (o2 !== t3 || i2 === z.Arg)) return void e2.NameConflictError(t3, (null == n2 ? void 0 : n2.name) || "", o2, a2);
              if (i2 < z.List) return;
              for (const [i3, r3] of e2._listDefs) if ((null == n2 ? void 0 : n2.name) === i3 && t3 !== r3 && r3.variableAssignment !== t3 && e2.NameConflictError(t3, null == n2 ? void 0 : n2.name, r3, a2), !(t3 instanceof Gt)) for (const i4 of r3.itemDefinitions) (null == n2 ? void 0 : n2.name) === i4.name && e2.NameConflictError(t3, (null == n2 ? void 0 : n2.name) || "", i4, a2);
              if (i2 <= z.Var) return;
              const l2 = (null == n2 ? void 0 : n2.name) && e2.variableDeclarations.get(null == n2 ? void 0 : n2.name) || null;
              if (l2 && l2 !== t3 && l2.isGlobalDeclaration && null == l2.listDefinition && e2.NameConflictError(t3, (null == n2 ? void 0 : n2.name) || "", l2, a2), i2 < z.SubFlowAndWeave) return;
              const h2 = new lt(n2).ResolveFromContext(t3);
              if (h2 && h2 !== t3) e2.NameConflictError(t3, (null == n2 ? void 0 : n2.name) || "", h2, a2);
              else if (!(i2 < z.Arg) && i2 !== z.Arg) {
                let e3 = s(t3, dt);
                if (e3 || (e3 = ut(t3)), e3 && e3.hasParameters && e3.args) {
                  for (const i3 of e3.args) if ((null === (r2 = i3.identifier) || void 0 === r2 ? void 0 : r2.name) === (null == n2 ? void 0 : n2.name)) return void t3.Error(`${a2} '${n2}': name has already been used for a argument to ${e3.identifier} on ${e3.debugMetadata}`);
                }
              }
            };
          }
          get typeName() {
            return "Story";
          }
          PreProcessTopLevelObjects(t2) {
            super.PreProcessTopLevelObjects(t2);
            const e2 = [];
            for (let n2 of t2) if (n2 instanceof Vt) {
              const i2 = n2, r2 = t2.indexOf(n2);
              if (t2.splice(r2, 1), i2.includedStory) {
                const n3 = [], s2 = i2.includedStory;
                if (null != s2.content) {
                  for (const t3 of s2.content) t3 instanceof dt ? e2.push(t3) : n3.push(t3);
                  n3.push(new rt("\n")), t2.splice(r2, 0, ...n3);
                }
              }
            } else ;
            t2.splice(0, 0, ...e2);
          }
        }
        se.IsReservedKeyword = (t2) => {
          switch (t2) {
            case "true":
            case "false":
            case "not":
            case "return":
            case "else":
            case "VAR":
            case "CONST":
            case "temp":
            case "LIST":
            case "function":
              return true;
          }
          return false;
        };
        class ae extends V {
          get isSingleString() {
            if (1 !== this.content.length) return false;
            return this.content[0] instanceof rt;
          }
          constructor(t2) {
            super(), this.GenerateIntoContainer = (t3) => {
              t3.AddContent(D.BeginString());
              for (const e2 of this.content) t3.AddContent(e2.runtimeObject);
              t3.AddContent(D.EndString());
            }, this.toString = () => {
              let t3 = "";
              for (const e2 of this.content) t3 += e2;
              return t3;
            }, this.AddContent(t2);
          }
          get typeName() {
            return "String";
          }
          Equals(t2) {
            const e2 = s(t2, ae);
            if (null === e2) return false;
            if (!this.isSingleString || !e2.isSingleString) return false;
            return this.toString() === e2.toString();
          }
        }
        class oe extends d {
          constructor(t2) {
            let e2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            super(), this.GenerateRuntimeObject = () => this.isStart ? D.BeginTag() : D.EndTag(), this.toString = () => this.isStart ? "#StartTag" : "#EndTag", this.isStart = t2, this.inChoice = e2;
          }
          get typeName() {
            return "Tag";
          }
        }
        class le {
          constructor(t2) {
            this.rootPath = t2, this.ResolveInkFilename = () => {
              throw Error("Can't resolve filename because no FileHandler was provided when instantiating the parser / compiler.");
            }, this.LoadInkFileContents = () => {
              throw Error("Can't load ink content because no FileHandler was provided when instantiating the parser / compiler.");
            };
          }
        }
        class he extends et {
          get fileHandler() {
            if (!this._fileHandler) throw new Error("No FileHandler defined");
            return this._fileHandler;
          }
          set fileHandler(t2) {
            this._fileHandler = t2;
          }
          constructor(e2) {
            var n2;
            let a2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, l2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, h2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
            if (super(e2), n2 = this, this.ParseStory = () => {
              const e3 = this.StatementsAtLevel(t.StatementLevel.Top);
              return new se(e3, this._rootParser !== this);
            }, this.SeparatedList = (t2, e3) => {
              const n3 = this.Parse(t2);
              if (null === n3) return null;
              const i2 = [];
              for (i2.push(n3); ; ) {
                const n4 = this.BeginRule();
                if (null === e3()) {
                  this.FailRule(n4);
                  break;
                }
                const r2 = this.Parse(t2);
                if (null === r2) {
                  this.FailRule(n4);
                  break;
                }
                this.SucceedRule(n4), i2.push(r2);
              }
              return i2;
            }, this.CreateDebugMetadata = (t2, e3) => {
              const n3 = new Ot();
              return n3.startLineNumber = ((null == t2 ? void 0 : t2.lineIndex) || 0) + 1, n3.endLineNumber = e3.lineIndex + 1, n3.startCharacterNumber = ((null == t2 ? void 0 : t2.characterInLineIndex) || 0) + 1, n3.endCharacterNumber = e3.characterInLineIndex + 1, n3.fileName = this._filename, n3;
            }, this.RuleDidSucceed = (t2, e3, n3) => {
              const i2 = s(t2, d);
              i2 && (i2.debugMetadata = this.CreateDebugMetadata(e3, n3));
              const r2 = Array.isArray(t2) ? t2 : null;
              if (null !== r2) for (const t3 of r2) {
                s(t3, d) && (t3.hasOwnDebugMetadata || (t3.debugMetadata = this.CreateDebugMetadata(e3, n3)));
              }
              const a3 = s(t2, ct);
              null != a3 && (a3.debugMetadata = this.CreateDebugMetadata(e3, n3));
            }, this.OnStringParserError = function(t2, e3) {
              let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, s2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
              let a3 = s2 ? "WARNING:" : "ERROR:";
              if (null !== n2._filename && (a3 += ` '${n2._filename}'`), a3 += ` line ${r2 + 1}: ${t2}`, null === n2._externalErrorHandler) throw new Error(a3);
              n2._externalErrorHandler(a3, s2 ? i.Warning : i.Error);
            }, this.AuthorWarning = () => {
              this.Whitespace();
              const t2 = this.Parse(this.IdentifierWithMetadata);
              if (null === t2 || "TODO" !== t2.name) return null;
              this.Whitespace(), this.ParseString(":"), this.Whitespace();
              const e3 = this.ParseUntilCharactersFromString("\n\r");
              return e3 ? new p(e3) : null;
            }, this.ExtendIdentifierCharacterRanges = (t2) => {
              const e3 = he.ListAllCharacterRanges();
              for (const n3 of e3) t2.AddCharacters(n3.ToCharacterSet());
            }, this._parsingChoice = false, this.Choice = () => {
              let t2 = true, e3 = this.Interleave(this.OptionalExclude(this.Whitespace), this.String("*"));
              if (!e3) {
                if (e3 = this.Interleave(this.OptionalExclude(this.Whitespace), this.String("+")), null === e3) return null;
                t2 = false;
              }
              const n3 = this.Parse(this.BracketedName);
              this.Whitespace(), null != n3 && this.Newline();
              const i2 = this.Parse(this.ChoiceCondition);
              if (this.Whitespace(), this._parsingChoice) throw new Error("Already parsing a choice - shouldn't have nested choices");
              this._parsingChoice = true;
              let r2 = null;
              const a3 = this.Parse(this.MixedTextAndLogic);
              a3 && (r2 = new pt(a3));
              let o3 = null, l3 = null;
              const h3 = null !== this.ParseString("[");
              if (h3) {
                this.EndTagIfNecessary(r2);
                const t3 = this.Parse(this.MixedTextAndLogic);
                null !== t3 && (o3 = new pt(t3)), this.Expect(this.String("]"), "closing ']' for weave-style option"), this.EndTagIfNecessary(o3);
                let e4 = this.Parse(this.MixedTextAndLogic);
                null !== e4 && (l3 = new pt(e4));
              }
              this.Whitespace(), this.EndTagIfNecessary(null != l3 ? l3 : r2);
              const u2 = this.Parse(this.MultiDivert);
              this._parsingChoice = false, this.Whitespace();
              const c2 = !r2 && !l3 && !o3;
              if (c2 && null === u2 && this.Warning("Choice is completely empty. Interpretting as a default fallback choice. Add a divert arrow to remove this warning: * ->"), r2 || !h3 || o3 || this.Warning("Blank choice - if you intended a default fallback choice, use the `* ->` syntax"), l3 || (l3 = new pt()), this.EndTagIfNecessary(l3), null !== u2) for (const t3 of u2) {
                const e4 = s(t3, St);
                e4 && e4.isEmpty || l3.AddContent(t3);
              }
              l3.AddContent(new rt("\n"));
              const d2 = new Y(r2, o3, l3);
              return n3 && (d2.identifier = n3), d2.indentationDepth = e3.length, d2.hasWeaveStyleInlineBrackets = h3, d2.condition = i2, d2.onceOnly = t2, d2.isInvisibleDefault = c2, d2;
            }, this.ChoiceCondition = () => {
              const t2 = this.Interleave(this.ChoiceSingleCondition, this.ChoiceConditionsSpace);
              return null === t2 ? null : 1 === t2.length ? t2[0] : new vt(t2);
            }, this.ChoiceConditionsSpace = () => (this.Newline(), this.Whitespace(), tt), this.ChoiceSingleCondition = () => {
              if (null === this.ParseString("{")) return null;
              const t2 = this.Expect(this.Expression, "choice condition inside { }");
              return this.DisallowIncrement(t2), this.Expect(this.String("}"), "closing '}' for choice condition"), t2;
            }, this.Gather = () => {
              const t2 = this.Parse(this.GatherDashes);
              if (null === t2) return null;
              const e3 = Number(t2), n3 = this.Parse(this.BracketedName), i2 = new ot(n3, e3);
              return this.Newline(), i2;
            }, this.GatherDashes = () => {
              this.Whitespace();
              let t2 = 0;
              for (; null !== this.ParseDashNotArrow(); ) t2 += 1, this.Whitespace();
              return 0 === t2 ? null : t2;
            }, this.ParseDashNotArrow = () => {
              const t2 = this.BeginRule();
              return null === this.ParseString("->") && "-" === this.ParseSingleCharacter() ? this.SucceedRule(t2) : this.FailRule(t2);
            }, this.BracketedName = () => {
              if (null === this.ParseString("(")) return null;
              this.Whitespace();
              const t2 = this.Parse(this.IdentifierWithMetadata);
              return null === t2 ? null : (this.Whitespace(), this.Expect(this.String(")"), "closing ')' for bracketed name"), t2);
            }, this.InnerConditionalContent = (e3) => {
              if (void 0 === e3) {
                const t2 = this.Parse(this.ConditionExpression), e4 = this.Parse((() => this.InnerConditionalContent(t2)));
                return null === e4 ? null : e4;
              }
              let n3;
              const i2 = null !== e3, r2 = null === this.Parse(this.Newline);
              if (r2 && !i2) return null;
              if (r2) n3 = this.InlineConditionalBranches();
              else {
                if (n3 = this.MultilineConditionalBranches(), null === n3) {
                  if (e3) {
                    let e4 = this.StatementsAtLevel(t.StatementLevel.InnerBlock);
                    if (null !== e4) {
                      n3 = [new Nt(e4)];
                      const t2 = this.Parse(this.SingleMultilineCondition);
                      t2 && (t2.isElse || (this.ErrorWithParsedObject("Expected an '- else:' clause here rather than an extra condition", t2), t2.isElse = true), n3.push(t2));
                    }
                  }
                  if (null === n3) return null;
                } else if (1 === n3.length && n3[0].isElse && e3) {
                  const t2 = new Nt(null);
                  t2.isTrueBranch = true, n3.unshift(t2);
                }
                if (e3) {
                  let t2 = false;
                  for (let e4 = 0; e4 < n3.length; ++e4) {
                    const i3 = n3[e4], r3 = e4 === n3.length - 1;
                    i3.ownExpression ? (i3.matchingEquality = true, t2 = true) : t2 && r3 ? (i3.matchingEquality = true, i3.isElse = true) : !r3 && n3.length > 2 ? this.ErrorWithParsedObject("Only final branch can be an 'else'. Did you miss a ':'?", i3) : 0 === e4 ? i3.isTrueBranch = true : i3.isElse = true;
                  }
                } else {
                  for (let t2 = 0; t2 < n3.length; ++t2) {
                    const e4 = n3[t2], i3 = t2 === n3.length - 1;
                    if (null === e4.ownExpression) if (i3) e4.isElse = true;
                    else if (e4.isElse) {
                      const t3 = n3[n3.length - 1];
                      t3.isElse ? this.ErrorWithParsedObject("Multiple 'else' cases. Can have a maximum of one, at the end.", t3) : this.ErrorWithParsedObject("'else' case in conditional should always be the final one", e4);
                    } else this.ErrorWithParsedObject("Branch doesn't have condition. Are you missing a ':'? ", e4);
                  }
                  1 === n3.length && null === n3[0].ownExpression && this.ErrorWithParsedObject("Condition block with no conditions", n3[0]);
                }
              }
              if (null === n3) return null;
              for (const t2 of n3) t2.isInline = r2;
              return new it(e3, n3);
            }, this.InlineConditionalBranches = () => {
              const t2 = this.Interleave(this.MixedTextAndLogic, this.Exclude(this.String("|")), null, false);
              if (null === t2 || 0 === t2.length) return null;
              const e3 = [];
              if (t2.length > 2) this.Error("Expected one or two alternatives separated by '|' in inline conditional");
              else {
                const n3 = new Nt(t2[0]);
                if (n3.isTrueBranch = true, e3.push(n3), t2.length > 1) {
                  const n4 = new Nt(t2[1]);
                  n4.isElse = true, e3.push(n4);
                }
              }
              return e3;
            }, this.MultilineConditionalBranches = () => {
              this.MultilineWhitespace();
              const t2 = this.OneOrMore(this.SingleMultilineCondition);
              return null === t2 ? null : (this.MultilineWhitespace(), t2);
            }, this.SingleMultilineCondition = () => {
              if (this.Whitespace(), null !== this.ParseString("->") || null === this.ParseString("-")) return null;
              this.Whitespace();
              let e3 = null;
              const n3 = null !== this.Parse(this.ElseExpression);
              n3 || (e3 = this.Parse(this.ConditionExpression));
              let i2 = this.StatementsAtLevel(t.StatementLevel.InnerBlock);
              null === e3 && null === i2 && (this.Error("expected content for the conditional branch following '-'"), i2 = [new rt("")]), this.MultilineWhitespace();
              const r2 = new Nt(i2);
              return r2.ownExpression = e3, r2.isElse = n3, r2;
            }, this.ConditionExpression = () => {
              const t2 = this.Parse(this.Expression);
              return null === t2 ? null : (this.DisallowIncrement(t2), this.Whitespace(), null === this.ParseString(":") ? null : t2);
            }, this.ElseExpression = () => null === this.ParseString("else") ? null : (this.Whitespace(), null === this.ParseString(":") ? null : tt), this._nonTextPauseCharacters = null, this._nonTextEndCharacters = null, this._notTextEndCharactersChoice = null, this._notTextEndCharactersString = null, this.TrimEndWhitespace = (t2, e3) => {
              if (t2.length > 0) {
                const n3 = t2.length - 1, i2 = t2[n3];
                if (i2 instanceof rt) {
                  const r2 = i2;
                  r2.text = r2.text.replace(new RegExp(/[ \t]+$/g), ""), e3 ? r2.text += " " : 0 === r2.text.length && (t2.splice(n3, 1), this.TrimEndWhitespace(t2, false));
                }
              }
            }, this.LineOfMixedTextAndLogic = () => {
              this.Parse(this.Whitespace);
              let t2 = this.Parse(this.MixedTextAndLogic);
              if (!t2 || !t2.length) return null;
              const e3 = t2[0];
              if (e3 && e3.text && e3.text.startsWith("return") && this.Warning("Do you need a '~' before 'return'? If not, perhaps use a glue: <> (since it's lowercase) or rewrite somehow?"), 0 === t2.length) return null;
              return t2[t2.length - 1] instanceof St || this.TrimEndWhitespace(t2, false), this.EndTagIfNecessary(t2), t2.length > 0 && t2[0] instanceof oe && t2[0].isStart || t2.push(new rt("\n")), this.Expect(this.EndOfLine, "end of line", this.SkipToNextLine), t2;
            }, this.MixedTextAndLogic = () => {
              null !== this.ParseObject(this.Spaced(this.String("~"))) && this.Error("You shouldn't use a '~' here - tildas are for logic that's on its own line. To do inline logic, use { curly braces } instead");
              let t2 = this.Interleave(this.Optional(this.ContentText), this.Optional(this.InlineLogicOrGlueOrStartTag));
              if (!this._parsingChoice) {
                const e3 = this.Parse(this.MultiDivert);
                null !== e3 && (null === t2 && (t2 = []), this.EndTagIfNecessary(t2), this.TrimEndWhitespace(t2, true), t2.push(...e3));
              }
              return t2 || null;
            }, this.ContentText = () => this.ContentTextAllowingEscapeChar(), this.ContentTextAllowingEscapeChar = () => {
              let t2 = null;
              for (; ; ) {
                let e3 = this.Parse(this.ContentTextNoEscape);
                const n3 = null !== this.ParseString("\\");
                if (!n3 && null === e3) break;
                if (null === t2 && (t2 = ""), null !== e3 && (t2 += String(e3)), n3) {
                  t2 += this.ParseSingleCharacter();
                }
              }
              return null !== t2 ? new rt(t2) : null;
            }, this.ContentTextNoEscape = () => {
              null === this._nonTextPauseCharacters && (this._nonTextPauseCharacters = new q("-<")), null === this._nonTextEndCharacters && (this._nonTextEndCharacters = new q("{}|\n\r\\#"), this._notTextEndCharactersChoice = new q(this._nonTextEndCharacters), this._notTextEndCharactersChoice.AddCharacters("[]"), this._notTextEndCharactersString = new q(this._nonTextEndCharacters), this._notTextEndCharactersString.AddCharacters('"'));
              let t2 = null;
              t2 = this.parsingStringExpression ? this._notTextEndCharactersString : this._parsingChoice ? this._notTextEndCharactersChoice : this._nonTextEndCharacters;
              const e3 = this.ParseUntil((() => this.OneOf([this.ParseDivertArrow, this.ParseThreadArrow, this.EndOfLine, this.Glue])), this._nonTextPauseCharacters, t2);
              return null !== e3 ? e3 : null;
            }, this.MultiDivert = () => {
              this.Whitespace();
              let t2 = [];
              const e3 = this.Parse(this.StartThread);
              if (e3) return t2 = [e3], t2;
              const n3 = this.Interleave(this.ParseDivertArrowOrTunnelOnwards, this.DivertIdentifierWithArguments);
              if (!n3) return null;
              t2 = [], this.EndTagIfNecessary(t2);
              for (let e4 = 0; e4 < n3.length; ++e4) {
                if (e4 % 2 == 0) {
                  if ("->->" === n3[e4]) {
                    0 === e4 || e4 === n3.length - 1 || e4 === n3.length - 2 || this.Error("Tunnel onwards '->->' must only come at the begining or the start of a divert");
                    const i2 = new _t();
                    if (e4 < n3.length - 1) {
                      const t3 = s(n3[e4 + 1], St);
                      i2.divertAfter = t3;
                    }
                    t2.push(i2);
                    break;
                  }
                } else {
                  const i2 = n3[e4];
                  e4 < n3.length - 1 && (i2.isTunnel = true), t2.push(i2);
                }
              }
              if (0 === t2.length && 1 === n3.length) {
                const e4 = new St(null);
                e4.isEmpty = true, t2.push(e4), this._parsingChoice || this.Error("Empty diverts (->) are only valid on choices");
              }
              return t2;
            }, this.StartThread = () => {
              if (this.Whitespace(), null === this.ParseThreadArrow()) return null;
              this.Whitespace();
              const t2 = this.Expect(this.DivertIdentifierWithArguments, "target for new thread", (() => new St(null)));
              return t2.isThread = true, t2;
            }, this.DivertIdentifierWithArguments = () => {
              this.Whitespace();
              const t2 = this.Parse(this.DotSeparatedDivertPathComponents);
              if (!t2) return null;
              this.Whitespace();
              const e3 = this.Parse(this.ExpressionFunctionCallArguments);
              this.Whitespace();
              const n3 = new lt(t2);
              return new St(n3, e3);
            }, this.SingleDivert = () => {
              const t2 = this.Parse(this.MultiDivert);
              if (!t2) return null;
              if (1 !== t2.length) return null;
              if (t2[0] instanceof _t) return null;
              const e3 = t2[0];
              return e3.isTunnel ? null : e3;
            }, this.DotSeparatedDivertPathComponents = () => this.Interleave(this.Spaced(this.IdentifierWithMetadata), this.Exclude(this.String("."))), this.ParseDivertArrowOrTunnelOnwards = () => {
              let t2 = 0;
              for (; null !== this.ParseString("->"); ) t2 += 1;
              return 0 === t2 ? null : 1 === t2 ? "->" : (2 === t2 || this.Error("Unexpected number of arrows in divert. Should only have '->' or '->->'"), "->->");
            }, this.ParseDivertArrow = () => this.ParseString("->"), this.ParseThreadArrow = () => this.ParseString("<-"), this._binaryOperators = [], this._maxBinaryOpLength = 0, this.TempDeclarationOrAssignment = () => {
              this.Whitespace();
              const t2 = this.ParseTempKeyword();
              this.Whitespace();
              let e3 = null;
              if (e3 = t2 ? this.Expect(this.IdentifierWithMetadata, "variable name") : this.Parse(this.IdentifierWithMetadata), null === e3) return null;
              this.Whitespace();
              const n3 = null !== this.ParseString("+"), i2 = null !== this.ParseString("-");
              if (n3 && i2 && this.Error("Unexpected sequence '+-'"), null === this.ParseString("=")) return t2 && this.Error("Expected '='"), null;
              const r2 = this.Expect(this.Expression, "value expression to be assigned");
              if (n3 || i2) {
                return new Dt(e3, r2, n3);
              }
              return new At({ variableIdentifier: e3, assignedExpression: r2, isTemporaryNewDeclaration: t2 });
            }, this.DisallowIncrement = (t2) => {
              t2 instanceof Dt && this.Error("Can't use increment/decrement here. It can only be used on a ~ line");
            }, this.ParseTempKeyword = () => {
              const t2 = this.BeginRule();
              return "temp" === this.Parse(this.Identifier) ? (this.SucceedRule(t2), true) : (this.FailRule(t2), false);
            }, this.ReturnStatement = () => {
              this.Whitespace();
              if ("return" !== this.Parse(this.Identifier)) return null;
              this.Whitespace();
              const t2 = this.Parse(this.Expression);
              return new ht(t2);
            }, this.Expression = function() {
              let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              n2.Whitespace();
              let e3 = n2.ExpressionUnary();
              if (null === e3) return null;
              for (n2.Whitespace(); ; ) {
                const i2 = n2.BeginRule(), r2 = n2.ParseInfixOperator();
                if (!(null !== r2 && r2.precedence > t2)) {
                  n2.FailRule(i2);
                  break;
                }
                {
                  const t3 = `right side of '${r2.type}' expression`, s2 = n2.Expect((() => n2.ExpressionInfixRight(e3, r2)), t3);
                  if (null === s2) return n2.FailRule(i2), null;
                  e3 = n2.SucceedRule(i2, s2);
                }
              }
              return n2.Whitespace(), e3;
            }, this.ExpressionUnary = () => {
              const t2 = this.Parse(this.ExpressionDivertTarget);
              if (null !== t2) return t2;
              let e3 = this.OneOf([this.String("-"), this.String("!")]);
              null === e3 && (e3 = this.Parse(this.ExpressionNot)), this.Whitespace();
              let n3 = this.OneOf([this.ExpressionList, this.ExpressionParen, this.ExpressionFunctionCall, this.ExpressionVariableName, this.ExpressionLiteral]);
              if (null === n3 && null !== e3 && (n3 = this.ExpressionUnary()), null === n3) return null;
              null !== e3 && (n3 = G.WithInner(n3, e3)), this.Whitespace();
              const i2 = this.OneOf([this.String("++"), this.String("--")]);
              if (null !== i2) {
                const t3 = "++" === i2;
                if (n3 instanceof ft) {
                  n3 = new Dt(n3.identifier, t3);
                } else this.Error(`can only increment and decrement variables, but saw '${n3}'.`);
              }
              return n3;
            }, this.ExpressionNot = () => {
              const t2 = this.Identifier();
              return "not" === t2 ? t2 : null;
            }, this.ExpressionLiteral = () => this.OneOf([this.ExpressionFloat, this.ExpressionInt, this.ExpressionBool, this.ExpressionString]), this.ExpressionDivertTarget = () => {
              this.Whitespace();
              const t2 = this.Parse(this.SingleDivert);
              return !t2 || t2 && t2.isThread ? null : (this.Whitespace(), new Ct(t2));
            }, this.ExpressionInt = () => {
              const t2 = this.ParseInt();
              return null === t2 ? null : new M(t2, "int");
            }, this.ExpressionFloat = () => {
              const t2 = this.ParseFloat();
              return null === t2 ? null : new M(t2, "float");
            }, this.ExpressionString = () => {
              if (null === this.ParseString('"')) return null;
              this.parsingStringExpression = true;
              let t2 = this.Parse(this.MixedTextAndLogic);
              return this.Expect(this.String('"'), "close quote for string expression"), this.parsingStringExpression = false, null === t2 ? t2 = [new rt("")] : t2.find(((t3) => t3 instanceof St)) && this.Error("String expressions cannot contain diverts (->)"), new ae(t2);
            }, this.ExpressionBool = () => {
              const t2 = this.Parse(this.Identifier);
              return "true" === t2 ? new M(true, "bool") : "false" === t2 ? new M(false, "bool") : null;
            }, this.ExpressionFunctionCall = () => {
              const t2 = this.Parse(this.IdentifierWithMetadata);
              if (null === t2) return null;
              this.Whitespace();
              const e3 = this.Parse(this.ExpressionFunctionCallArguments);
              return null === e3 ? null : new gt(t2, e3);
            }, this.ExpressionFunctionCallArguments = () => {
              if (null === this.ParseString("(")) return null;
              const t2 = this.Exclude(this.String(","));
              let e3 = this.Interleave(this.Expression, t2);
              return null === e3 && (e3 = []), this.Whitespace(), this.Expect(this.String(")"), "closing ')' for function call"), e3;
            }, this.ExpressionVariableName = () => {
              const t2 = this.Interleave(this.IdentifierWithMetadata, this.Exclude(this.Spaced(this.String("."))));
              return null === t2 || se.IsReservedKeyword(t2[0].name) ? null : new ft(t2);
            }, this.ExpressionParen = () => {
              if (null === this.ParseString("(")) return null;
              const t2 = this.Parse(this.Expression);
              return null === t2 ? null : (this.Whitespace(), this.Expect(this.String(")"), "closing parenthesis ')' for expression"), t2);
            }, this.ExpressionInfixRight = (t2, e3) => {
              if (!t2) return null;
              this.Whitespace();
              const n3 = this.Parse((() => this.Expression(e3.precedence)));
              if (n3) {
                return new $(t2, n3, e3.type);
              }
              return null;
            }, this.ParseInfixOperator = () => {
              for (const t2 of this._binaryOperators) {
                const e3 = this.BeginRule();
                if (null !== this.ParseString(t2.type)) {
                  if (t2.requireWhitespace && null === this.Whitespace()) {
                    this.FailRule(e3);
                    continue;
                  }
                  return this.SucceedRule(e3, t2);
                }
                this.FailRule(e3);
              }
              return null;
            }, this.ExpressionList = () => {
              if (this.Whitespace(), null === this.ParseString("(")) return null;
              this.Whitespace();
              const t2 = this.SeparatedList(this.ListMember, this.Spaced(this.String(",")));
              return this.Whitespace(), null === this.ParseString(")") ? null : new Mt(t2);
            }, this.ListMember = () => {
              this.Whitespace();
              let t2 = this.Parse(this.IdentifierWithMetadata);
              if (null === t2) return null;
              if (null !== this.ParseString(".")) {
                const e3 = this.Expect(this.IdentifierWithMetadata, `element name within the set ${t2}`);
                t2.name += `.${null == e3 ? void 0 : e3.name}`;
              }
              return this.Whitespace(), t2;
            }, this.RegisterExpressionOperators = () => {
              this.RegisterBinaryOperator("&&", 1), this.RegisterBinaryOperator("||", 1), this.RegisterBinaryOperator("and", 1, true), this.RegisterBinaryOperator("or", 1, true), this.RegisterBinaryOperator("==", 2), this.RegisterBinaryOperator(">=", 2), this.RegisterBinaryOperator("<=", 2), this.RegisterBinaryOperator("<", 2), this.RegisterBinaryOperator(">", 2), this.RegisterBinaryOperator("!=", 2), this.RegisterBinaryOperator("?", 3), this.RegisterBinaryOperator("has", 3, true), this.RegisterBinaryOperator("!?", 3), this.RegisterBinaryOperator("hasnt", 3, true), this.RegisterBinaryOperator("^", 3), this.RegisterBinaryOperator("+", 4), this.RegisterBinaryOperator("-", 5), this.RegisterBinaryOperator("*", 6), this.RegisterBinaryOperator("/", 7), this.RegisterBinaryOperator("%", 8), this.RegisterBinaryOperator("mod", 8, true);
            }, this.RegisterBinaryOperator = function(t2, e3) {
              const i2 = new jt(t2, e3, arguments.length > 2 && void 0 !== arguments[2] && arguments[2]);
              n2._binaryOperators.push(i2), n2._maxBinaryOpLength = Math.max(n2._maxBinaryOpLength, t2.length);
            }, this._openFilenames = [], this.IncludeStatement = () => {
              if (this.Whitespace(), null === this.ParseString("INCLUDE")) return null;
              this.Whitespace();
              let t2 = this.Expect((() => this.ParseUntilCharactersFromString("\n\r")), "filename for include statement");
              t2 = t2.replace(new RegExp(/[ \t]+$/g), "");
              const e3 = this.fileHandler.ResolveInkFilename(t2, this._filename);
              if (this.FilenameIsAlreadyOpen(e3)) return this.Error(`Recursive INCLUDE detected: '${e3}' is already open.`), this.ParseUntilCharactersFromString("\r\n"), new Vt(null);
              this.AddOpenFilename(e3);
              let n3 = null, i2 = "";
              try {
                i2 = this._rootParser.fileHandler.LoadInkFileContents(e3, this._filename);
              } catch (e4) {
                this.Error(`Failed to load: '${t2}'.
Error:${e4}`);
              }
              if (null != i2) {
                n3 = new he(i2, t2, this._externalErrorHandler, this._rootParser, this.fileHandler).ParseStory();
              }
              return this.RemoveOpenFilename(e3), new Vt(n3);
            }, this.FilenameIsAlreadyOpen = (t2) => this._rootParser._openFilenames.includes(t2), this.AddOpenFilename = (t2) => {
              this._rootParser._openFilenames.push(t2);
            }, this.RemoveOpenFilename = (t2) => {
              this._rootParser._openFilenames.splice(this._rootParser._openFilenames.indexOf(t2), 1);
            }, this.KnotDefinition = () => {
              const e3 = this.Parse(this.KnotDeclaration);
              if (null === e3) return null;
              this.Expect(this.EndOfLine, "end of line after knot name definition", this.SkipToNextLine);
              const n3 = this.Expect((() => this.StatementsAtLevel(t.StatementLevel.Knot)), "at least one line within the knot", this.KnotStitchNoContentRecoveryRule);
              return new Bt(e3.name, n3, e3.args, e3.isFunction);
            }, this.KnotDeclaration = () => {
              if (this.Whitespace(), null === this.KnotTitleEquals()) return null;
              this.Whitespace();
              const t2 = this.Parse(this.IdentifierWithMetadata);
              let e3;
              const n3 = "function" === (null == t2 ? void 0 : t2.name);
              n3 ? (this.Expect(this.Whitespace, "whitespace after the 'function' keyword"), e3 = this.Parse(this.IdentifierWithMetadata)) : e3 = t2, null === e3 && (this.Error("Expected the name of the " + (n3 ? "function" : "knot")), e3 = new ct("")), this.Whitespace();
              const i2 = this.Parse(this.BracketedKnotDeclArguments);
              return this.Whitespace(), this.Parse(this.KnotTitleEquals), new Wt(e3, i2, n3);
            }, this.KnotTitleEquals = () => {
              const t2 = this.ParseCharactersFromString("=");
              return null === t2 || t2.length <= 1 ? null : t2;
            }, this.StitchDefinition = () => {
              const e3 = this.Parse(this.StitchDeclaration);
              if (null === e3) return null;
              this.Expect(this.EndOfLine, "end of line after stitch name", this.SkipToNextLine);
              const n3 = this.Expect((() => this.StatementsAtLevel(t.StatementLevel.Stitch)), "at least one line within the stitch", this.KnotStitchNoContentRecoveryRule);
              return new qt(e3.name, n3, e3.args, e3.isFunction);
            }, this.StitchDeclaration = () => {
              if (this.Whitespace(), null === this.ParseString("=")) return null;
              if (null !== this.ParseString("=")) return null;
              this.Whitespace();
              const t2 = null !== this.ParseString("function");
              t2 && this.Whitespace();
              const e3 = this.Parse(this.IdentifierWithMetadata);
              if (null === e3) return null;
              this.Whitespace();
              const n3 = this.Parse(this.BracketedKnotDeclArguments);
              return this.Whitespace(), new Wt(e3, n3, t2);
            }, this.KnotStitchNoContentRecoveryRule = () => {
              this.ParseUntil(this.KnotDeclaration, new q("="), null);
              return [new rt("<ERROR IN FLOW>")];
            }, this.BracketedKnotDeclArguments = () => {
              if (null === this.ParseString("(")) return null;
              let t2 = this.Interleave(this.Spaced(this.FlowDeclArgument), this.Exclude(this.String(",")));
              return this.Expect(this.String(")"), "closing ')' for parameter list"), null === t2 && (t2 = []), t2;
            }, this.FlowDeclArgument = () => {
              const t2 = this.Parse(this.IdentifierWithMetadata);
              this.Whitespace();
              const e3 = this.ParseDivertArrow();
              this.Whitespace();
              const n3 = this.Parse(this.IdentifierWithMetadata);
              if (null == t2 && null === n3) return null;
              const i2 = new r();
              return null !== e3 && (i2.isDivertTarget = true), null !== t2 && "ref" === t2.name ? (null === n3 && this.Error("Expected an parameter name after 'ref'"), i2.identifier = n3, i2.isByReference = true) : (i2.isDivertTarget ? i2.identifier = n3 : i2.identifier = t2, null === i2.identifier && this.Error("Expected an parameter name"), i2.isByReference = false), i2;
            }, this.ExternalDeclaration = () => {
              this.Whitespace();
              const t2 = this.Parse(this.IdentifierWithMetadata);
              if (null === t2 || "EXTERNAL" != t2.name) return null;
              this.Whitespace();
              const e3 = this.Expect(this.IdentifierWithMetadata, "name of external function") || new ct("");
              this.Whitespace();
              let n3 = this.Expect(this.BracketedKnotDeclArguments, `declaration of arguments for EXTERNAL, even if empty, i.e. 'EXTERNAL ${e3}()'`);
              null === n3 && (n3 = []);
              const i2 = n3.map(((t3) => {
                var e4;
                return null === (e4 = t3.identifier) || void 0 === e4 ? void 0 : e4.name;
              })).filter(c);
              return new Ft(e3, i2);
            }, this._identifierCharSet = null, this.LogicLine = () => {
              if (this.Whitespace(), null === this.ParseString("~")) return null;
              this.Whitespace();
              let t2 = this.Expect((() => this.OneOf([this.ReturnStatement, this.TempDeclarationOrAssignment, this.Expression])), "expression after '~'", this.SkipToNextLine);
              if (null === t2) return new pt();
              t2 instanceof V && !(t2 instanceof gt || t2 instanceof Dt) && this.Error("Logic following a '~' can't be that type of expression. It can only be something like:\n	~ return\n	~ var x = blah\n	~ x++\n	~ myFunction()");
              const e3 = s(t2, gt);
              return e3 && (e3.shouldPopReturnedValue = true), null !== t2.Find(gt)() && (t2 = new pt(t2, new rt("\n"))), this.Expect(this.EndOfLine, "end of line", this.SkipToNextLine), t2;
            }, this.VariableDeclaration = () => {
              this.Whitespace();
              if ("VAR" !== this.Parse(this.Identifier)) return null;
              this.Whitespace();
              const t2 = this.Expect(this.IdentifierWithMetadata, "variable name");
              this.Whitespace(), this.Expect(this.String("="), "the '=' for an assignment of a value, e.g. '= 5' (initial values are mandatory)"), this.Whitespace();
              const e3 = this.Expect(this.Expression, "initial value for ");
              if (e3) {
                if (e3 instanceof M || e3 instanceof ae || e3 instanceof Ct || e3 instanceof ft || e3 instanceof Mt || this.Error("initial value for a variable must be a number, constant, list or divert target"), null !== this.Parse(this.ListElementDefinitionSeparator)) this.Error("Unexpected ','. If you're trying to declare a new list, use the LIST keyword, not VAR");
                else if (e3 instanceof ae) {
                  e3.isSingleString || this.Error("Constant strings cannot contain any logic.");
                }
                return new At({ assignedExpression: e3, isGlobalDeclaration: true, variableIdentifier: t2 });
              }
              return null;
            }, this.ListDeclaration = () => {
              this.Whitespace();
              if ("LIST" != this.Parse(this.Identifier)) return null;
              this.Whitespace();
              const t2 = this.Expect(this.IdentifierWithMetadata, "list name");
              this.Whitespace(), this.Expect(this.String("="), "the '=' for an assignment of the list definition"), this.Whitespace();
              const e3 = this.Expect(this.ListDefinition, "list item names");
              return e3 ? (e3.identifier = new ct(t2.name), new At({ variableIdentifier: t2, listDef: e3 })) : null;
            }, this.ListDefinition = () => {
              this.AnyWhitespace();
              const t2 = this.SeparatedList(this.ListElementDefinition, this.ListElementDefinitionSeparator);
              return null === t2 ? null : new xt(t2);
            }, this.ListElementDefinitionSeparator = () => (this.AnyWhitespace(), null === this.ParseString(",") ? null : (this.AnyWhitespace(), ",")), this.ListElementDefinition = () => {
              const t2 = null !== this.ParseString("(");
              let e3 = t2;
              this.Whitespace();
              const n3 = this.Parse(this.IdentifierWithMetadata);
              if (null === n3) return null;
              this.Whitespace(), t2 && null != this.ParseString(")") && (e3 = false, this.Whitespace());
              let i2 = null;
              if (null !== this.ParseString("=")) {
                this.Whitespace();
                const t3 = this.Expect(this.ExpressionInt, "value to be assigned to list item");
                null !== t3 && (i2 = t3.value), e3 && (this.Whitespace(), null !== this.ParseString(")") && (e3 = false));
              }
              return e3 && this.Error("Expected closing ')'"), new Gt(n3, t2, i2);
            }, this.ConstDeclaration = () => {
              this.Whitespace();
              if ("CONST" !== this.Parse(this.Identifier)) return null;
              this.Whitespace();
              const t2 = this.Expect(this.IdentifierWithMetadata, "constant name");
              this.Whitespace(), this.Expect(this.String("="), "the '=' for an assignment of a value, e.g. '= 5' (initial values are mandatory)"), this.Whitespace();
              const e3 = this.Expect(this.Expression, "initial value for ");
              if (e3 instanceof M || e3 instanceof Ct || e3 instanceof ae) {
                if (e3 instanceof ae) {
                  e3.isSingleString || this.Error("Constant strings cannot contain any logic.");
                }
              } else this.Error("initial value for a constant must be a number or divert target");
              return new st(t2, e3);
            }, this.InlineLogicOrGlueOrStartTag = () => this.OneOf([this.InlineLogic, this.Glue, this.StartTag]), this.Glue = () => null !== this.ParseString("<>") ? new kt(new Lt()) : null, this.InlineLogic = () => {
              if (null === this.ParseString("{")) return null;
              let t2 = this.parsingStringExpression, e3 = this.tagActive;
              this.Whitespace();
              const n3 = this.Expect(this.InnerLogic, "some kind of logic, conditional or sequence within braces: { ... }");
              if (null === n3) return this.parsingStringExpression = t2, null;
              this.DisallowIncrement(n3);
              let i2 = s(n3, pt);
              return i2 || (i2 = new pt(n3)), this.Whitespace(), this.Expect(this.String("}"), "closing brace '}' for inline logic"), this.parsingStringExpression = t2, e3 || this.EndTagIfNecessary(i2), i2;
            }, this.InnerLogic = () => {
              this.Whitespace();
              const t2 = this.ParseObject(this.SequenceTypeAnnotation);
              if (null !== t2) {
                const e4 = this.Expect(this.InnerSequenceObjects, "sequence elements (for cycle/stoping etc)");
                return null === e4 ? null : new Et(e4, t2);
              }
              const e3 = this.Parse(this.ConditionExpression);
              if (e3) {
                return this.Expect((() => this.InnerConditionalContent(e3)), "conditional content following query");
              }
              const n3 = [this.InnerConditionalContent, this.InnerSequence, this.InnerExpression];
              for (const t3 of n3) {
                const e4 = this.BeginRule(), n4 = this.ParseObject(t3);
                if (n4) {
                  if (null !== this.Peek(this.Spaced(this.String("}")))) return this.SucceedRule(e4, n4);
                  this.FailRule(e4);
                } else this.FailRule(e4);
              }
              return null;
            }, this.InnerExpression = () => {
              const t2 = this.Parse(this.Expression);
              return t2 && (t2.outputWhenComplete = true), t2;
            }, this.IdentifierWithMetadata = () => {
              const t2 = this.Identifier();
              return null === t2 ? null : new ct(t2);
            }, this.Identifier = () => {
              const t2 = this.ParseCharactersFromCharSet(this.identifierCharSet);
              if (null === t2) return null;
              let e3 = true;
              for (let n3 of t2) if (!(n3 >= "0" && n3 <= "9")) {
                e3 = false;
                break;
              }
              return e3 ? null : t2;
            }, this._sequenceTypeSymbols = new q("!&~$"), this.InnerSequence = () => {
              this.Whitespace();
              let t2 = wt.Stopping;
              const e3 = this.Parse(this.SequenceTypeAnnotation);
              null !== e3 && (t2 = e3);
              const n3 = this.Parse(this.InnerSequenceObjects);
              return null === n3 || n3.length <= 1 ? null : new Et(n3, t2);
            }, this.SequenceTypeAnnotation = () => {
              let t2 = this.Parse(this.SequenceTypeSymbolAnnotation);
              if (null === t2 && (t2 = this.Parse(this.SequenceTypeWordAnnotation)), null === t2) return null;
              switch (t2) {
                case wt.Once:
                case wt.Cycle:
                case wt.Stopping:
                case wt.Shuffle:
                case wt.Shuffle | wt.Stopping:
                case wt.Shuffle | wt.Once:
                  break;
                default:
                  return this.Error(`Sequence type combination not supported: ${t2}`), wt.Stopping;
              }
              return t2;
            }, this.SequenceTypeSymbolAnnotation = () => {
              null === this._sequenceTypeSymbols && (this._sequenceTypeSymbols = new q("!&~$ "));
              let t2 = 0;
              const e3 = this.ParseCharactersFromCharSet(this._sequenceTypeSymbols);
              if (null === e3) return null;
              for (const n3 of e3) switch (n3) {
                case "!":
                  t2 |= wt.Once;
                  break;
                case "&":
                  t2 |= wt.Cycle;
                  break;
                case "~":
                  t2 |= wt.Shuffle;
                  break;
                case "$":
                  t2 |= wt.Stopping;
              }
              return 0 === t2 ? null : t2;
            }, this.SequenceTypeWordAnnotation = () => {
              const t2 = this.Interleave(this.SequenceTypeSingleWord, this.Exclude(this.Whitespace));
              if (null === t2 || 0 === t2.length) return null;
              if (null === this.ParseString(":")) return null;
              let e3 = 0;
              for (const n3 of t2) e3 |= n3;
              return e3;
            }, this.SequenceTypeSingleWord = () => {
              let t2 = null;
              const e3 = this.Parse(this.IdentifierWithMetadata);
              if (null !== e3) switch (e3.name) {
                case "once":
                  t2 = wt.Once;
                  break;
                case "cycle":
                  t2 = wt.Cycle;
                  break;
                case "shuffle":
                  t2 = wt.Shuffle;
                  break;
                case "stopping":
                  t2 = wt.Stopping;
              }
              return null === t2 ? null : t2;
            }, this.InnerSequenceObjects = () => {
              let t2 = null;
              return t2 = null !== this.Parse(this.Newline) ? this.Parse(this.InnerMultilineSequenceObjects) : this.Parse(this.InnerInlineSequenceObjects), t2;
            }, this.InnerInlineSequenceObjects = () => {
              const t2 = this.Interleave(this.Optional(this.MixedTextAndLogic), this.String("|"), null, false);
              if (null === t2) return null;
              const e3 = [];
              let n3 = false;
              for (const i2 of t2) if ("|" === i2) n3 || e3.push(new pt()), n3 = false;
              else {
                const t3 = i2;
                null === t3 ? this.Error(`Expected content, but got ${i2} (this is an ink compiler bug!)`) : e3.push(new pt(t3)), n3 = true;
              }
              return n3 || e3.push(new pt()), e3;
            }, this.InnerMultilineSequenceObjects = () => {
              this.MultilineWhitespace();
              const t2 = this.OneOrMore(this.SingleMultilineSequenceElement);
              return null === t2 ? null : t2;
            }, this.SingleMultilineSequenceElement = () => {
              if (this.Whitespace(), null !== this.ParseString("->")) return null;
              if (null === this.ParseString("-")) return null;
              this.Whitespace();
              const e3 = this.StatementsAtLevel(t.StatementLevel.InnerBlock);
              return null === e3 ? this.MultilineWhitespace() : e3.unshift(new rt("\n")), new pt(e3);
            }, this._statementRulesAtLevel = [], this._statementBreakRulesAtLevel = [], this.StatementsAtLevel = (e3) => {
              if (e3 === t.StatementLevel.InnerBlock) {
                null !== this.Parse(this.GatherDashes) && this.Error("You can't use a gather (the dashes) within the { curly braces } context. For multi-line sequences and conditions, you should only use one dash.");
              }
              return this.Interleave(this.Optional(this.MultilineWhitespace), (() => this.StatementAtLevel(e3)), (() => this.StatementsBreakForLevel(e3)));
            }, this.StatementAtLevel = (e3) => {
              const n3 = this._statementRulesAtLevel[e3], i2 = this.OneOf(n3);
              return e3 === t.StatementLevel.Top && i2 instanceof ht && this.Error("should not have return statement outside of a knot"), i2;
            }, this.StatementsBreakForLevel = (t2) => {
              this.Whitespace();
              const e3 = this._statementBreakRulesAtLevel[t2], n3 = this.OneOf(e3);
              return null === n3 ? null : n3;
            }, this.GenerateStatementLevelRules = () => {
              const e3 = Object.values(t.StatementLevel);
              this._statementRulesAtLevel = "f".repeat(e3.length).split("f").map((() => [])), this._statementBreakRulesAtLevel = "f".repeat(e3.length).split("f").map((() => []));
              for (const n3 of e3) {
                const e4 = [], i2 = [];
                e4.push(this.Line(this.MultiDivert)), n3 >= t.StatementLevel.Top && e4.push(this.KnotDefinition), e4.push(this.Line(this.Choice)), e4.push(this.Line(this.AuthorWarning)), n3 > t.StatementLevel.InnerBlock && e4.push(this.Gather), n3 >= t.StatementLevel.Knot && e4.push(this.StitchDefinition), e4.push(this.Line(this.ListDeclaration)), e4.push(this.Line(this.VariableDeclaration)), e4.push(this.Line(this.ConstDeclaration)), e4.push(this.Line(this.ExternalDeclaration)), e4.push(this.Line(this.IncludeStatement)), e4.push(this.LogicLine), e4.push(this.LineOfMixedTextAndLogic), n3 <= t.StatementLevel.Knot && i2.push(this.KnotDeclaration), n3 <= t.StatementLevel.Stitch && i2.push(this.StitchDeclaration), n3 <= t.StatementLevel.InnerBlock && (i2.push(this.ParseDashNotArrow), i2.push(this.String("}"))), this._statementRulesAtLevel[n3] = e4, this._statementBreakRulesAtLevel[n3] = i2;
              }
            }, this.SkipToNextLine = () => (this.ParseUntilCharactersFromString("\n\r"), this.ParseNewline(), tt), this.Line = (t2) => () => {
              const e3 = this.ParseObject(t2);
              return null === e3 ? null : (this.Expect(this.EndOfLine, "end of line", this.SkipToNextLine), e3);
            }, this.StartTag = () => {
              if (this.Whitespace(), null === this.ParseString("#")) return null;
              this.parsingStringExpression && this.Error("Tags aren't allowed inside of strings. Please use \\# if you want a hash symbol.");
              let t2 = null;
              if (this.tagActive) {
                let e3 = new pt();
                e3.AddContent(new oe(false)), e3.AddContent(new oe(true)), t2 = e3;
              } else t2 = new oe(true);
              return this.tagActive = true, this.Whitespace(), t2;
            }, this._inlineWhitespaceChars = new q(" 	"), this.EndOfLine = () => this.OneOf([this.Newline, this.EndOfFile]), this.Newline = () => {
              this.Whitespace();
              return null !== this.ParseNewline() ? tt : null;
            }, this.EndOfFile = () => (this.Whitespace(), this.endOfInput ? tt : null), this.MultilineWhitespace = () => {
              let t2 = this.OneOrMore(this.Newline);
              if (null === t2) return null;
              return t2.length >= 1 ? tt : null;
            }, this.Whitespace = () => null !== this.ParseCharactersFromCharSet(this._inlineWhitespaceChars) ? tt : null, this.Spaced = (t2) => () => {
              this.Whitespace();
              const e3 = this.ParseObject(t2);
              return null === e3 ? null : (this.Whitespace(), e3);
            }, this.AnyWhitespace = () => {
              let t2 = false;
              for (; null !== this.OneOf([this.Whitespace, this.MultilineWhitespace]); ) t2 = true;
              return t2 ? tt : null;
            }, this.MultiSpaced = (t2) => () => {
              this.AnyWhitespace();
              const e3 = this.ParseObject(t2);
              return null === e3 ? null : (this.AnyWhitespace(), e3);
            }, this._filename = null, this._externalErrorHandler = null, this._fileHandler = null, this._filename = a2, this.RegisterExpressionOperators(), this.GenerateStatementLevelRules(), this.errorHandler = this.OnStringParserError, this._externalErrorHandler = o2, this._fileHandler = null === h2 ? new le() : h2, null === l2) {
              if (this._rootParser = this, this._openFilenames = [], null !== this._filename) {
                const t2 = this.fileHandler.ResolveInkFilename(this._filename);
                this._openFilenames.push(t2);
              }
            } else this._rootParser = l2;
          }
          PreProcessInputString(t2) {
            return new nt(t2).Process();
          }
          get parsingStringExpression() {
            return this.GetFlag(Number(It.ParsingString));
          }
          set parsingStringExpression(t2) {
            this.SetFlag(Number(It.ParsingString), t2);
          }
          get tagActive() {
            return this.GetFlag(Number(It.TagActive));
          }
          set tagActive(t2) {
            this.SetFlag(Number(It.TagActive), t2);
          }
          get identifierCharSet() {
            return null === this._identifierCharSet && ((this._identifierCharSet = new q()).AddRange("A", "Z").AddRange("a", "z").AddRange("0", "9").Add("_"), this.ExtendIdentifierCharacterRanges(this._identifierCharSet)), this._identifierCharSet;
          }
          EndTagIfNecessary(t2) {
            this.tagActive && (null != t2 && (t2 instanceof pt ? t2.AddContent(new oe(false)) : t2.push(new oe(false))), this.tagActive = false);
          }
        }
        he.LatinBasic = U.Define("A", "z", new q().AddRange("[", "`")), he.LatinExtendedA = U.Define("\u0100", "\u017F"), he.LatinExtendedB = U.Define("\u0180", "\u024F"), he.Greek = U.Define("\u0370", "\u03FF", new q().AddRange("\u0378", "\u0385").AddCharacters("\u0374\u0375\u0378\u0387\u038B\u038D\u03A2")), he.Cyrillic = U.Define("\u0400", "\u04FF", new q().AddRange("\u0482", "\u0489")), he.Armenian = U.Define("\u0530", "\u058F", new q().AddCharacters("\u0530").AddRange("\u0557", "\u0560").AddRange("\u0588", "\u058E")), he.Hebrew = U.Define("\u0590", "\u05FF", new q()), he.Arabic = U.Define("\u0600", "\u06FF", new q()), he.Korean = U.Define("\uAC00", "\uD7AF", new q()), he.Latin1Supplement = U.Define("\x80", "\xFF", new q()), he.Chinese = U.Define("\u4E00", "\u9FFF", new q()), he.ListAllCharacterRanges = () => [he.LatinBasic, he.LatinExtendedA, he.LatinExtendedB, he.Arabic, he.Armenian, he.Cyrillic, he.Greek, he.Hebrew, he.Korean, he.Latin1Supplement, he.Chinese];
        t.Compiler = class {
          get errors() {
            return this._errors;
          }
          get warnings() {
            return this._warnings;
          }
          get authorMessages() {
            return this._authorMessages;
          }
          get inputString() {
            return this._inputString;
          }
          get options() {
            return this._options;
          }
          get parsedStory() {
            if (!this._parsedStory) throw new Error();
            return this._parsedStory;
          }
          get runtimeStory() {
            if (!this._runtimeStory) throw new Error("Compilation failed.");
            return this._runtimeStory;
          }
          get parser() {
            if (!this._parser) throw new Error();
            return this._parser;
          }
          get debugSourceRanges() {
            return this._debugSourceRanges;
          }
          constructor(t2) {
            let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            this._errors = [], this._warnings = [], this._authorMessages = [], this._parsedStory = null, this._runtimeStory = null, this._parser = null, this._debugSourceRanges = [], this.Compile = () => (this._parser = new he(this.inputString, this.options.sourceFilename || null, this.OnError, null, this.options.fileHandler), this._parsedStory = this.parser.ParseStory(), 0 === this.errors.length ? (this.parsedStory.countAllVisits = this.options.countAllVisits, this._runtimeStory = this.parsedStory.ExportRuntime(this.OnError)) : this._runtimeStory = null, this.runtimeStory), this.RetrieveDebugSourceForLatestContent = () => {
              var t3;
              for (const e2 of this.runtimeStory.state.outputStream) {
                const i2 = s(e2, O);
                if (null !== i2) {
                  const e3 = new n((null === (t3 = i2.value) || void 0 === t3 ? void 0 : t3.length) || 0, i2.debugMetadata, i2.value || "unknown");
                  this.debugSourceRanges.push(e3);
                }
              }
            }, this.GenerateStats = () => null === this._parsedStory ? null : (function(t3) {
              let e2 = t3.FindAll(rt)(), n2 = 0;
              for (const t4 of e2) {
                let e3 = 0, i3 = true;
                for (const n3 of t4.text) " " == n3 || "	" == n3 || "\n" == n3 || "\r" == n3 ? i3 = true : i3 && (e3++, i3 = false);
                n2 += e3;
              }
              const i2 = t3.FindAll(Bt)(), r3 = t3.FindAll(qt)(), s2 = t3.FindAll(Y)(), a2 = t3.FindAll(ot)(((t4) => null != t4.debugMetadata)), o2 = t3.FindAll(St)();
              return { words: n2, knots: i2.length, functions: i2.filter(((t4) => t4.isFunction)).length, stitches: r3.length, gathers: a2.length, diverts: o2.length - 1, choices: s2.length };
            })(this._parsedStory), this.DebugMetadataForContentAtOffset = (t3) => {
              let e2 = 0, n2 = null;
              for (const i2 of this.debugSourceRanges) {
                if (null !== i2.debugMetadata && (n2 = i2.debugMetadata), t3 >= e2 && t3 < e2 + i2.length) return n2;
                e2 += i2.length;
              }
              return null;
            }, this.OnError = (t3, e2) => {
              switch (e2) {
                case i.Author:
                  this._authorMessages.push(t3);
                  break;
                case i.Warning:
                  this._warnings.push(t3);
                  break;
                case i.Error:
                  this._errors.push(t3);
              }
              null !== this.options.errorHandler && this.options.errorHandler(t3, e2);
            }, this._inputString = t2, this._options = r2 || new e();
          }
        }, t.CompilerOptions = e, t.InkList = E, t.InkParser = he, t.JsonFileHandler = class {
          constructor(t2) {
            this.fileHierarchy = t2, this.ResolveInkFilename = (t3) => {
              if (Object.keys(this.fileHierarchy).includes(t3)) return t3;
              throw new Error(`Cannot locate ${t3}. Are you trying a relative import ? This is not yet implemented.`);
            }, this.LoadInkFileContents = (t3) => {
              if (Object.keys(this.fileHierarchy).includes(t3)) return this.fileHierarchy[t3];
              throw new Error(`Cannot open ${t3}.`);
            };
          }
        }, t.Story = re;
      }));
    }
  });

  // scene-rebuild/story-ink-entry.cjs
  var require_story_ink_entry = __commonJS({
    "scene-rebuild/story-ink-entry.cjs"() {
      var { Compiler, Story } = require_ink_full();
      var chapters = [
        `=== start ===
Juliette: Could you bring in some fresh wheat? Two harvests will help us get started.
+ [I'll get to work.]
    Juliette: Thank you. I'll be here when the wheat is ready.
    -> END
+ [I'll take my time.]
    Juliette: No rush. Farming takes patience.
    -> END
=== complete ===
Juliette: That's exactly what we needed.
-> END`,
        `=== start ===
Juliette: The farm helps more than one kitchen. Complete a neighbor order to keep our community supplied.
+ [I'll make a delivery.]
    Juliette: Every neighbor counts.
    -> END
=== complete ===
Juliette: I heard the delivery went well.
-> END`,
        `=== start ===
Juliette: Thank you. It means a great deal when neighbors look out for one another.
+ [Glad to help.]
    Juliette: I hope we'll work together again.
    -> END
=== complete ===
Juliette: Until next time!
-> END`
      ];
      var compiled = chapters.map((source) => new Compiler(source).Compile().ToJson());
      function createSession(chapter, saved) {
        if (!Number.isInteger(chapter) || chapter < 0 || chapter >= compiled.length) throw Error("Invalid chapter");
        const story = new Story(compiled[chapter]);
        if (saved) story.state.LoadJson(saved);
        else story.ChoosePathString("start");
        return {
          view() {
            const lines = [];
            while (story.canContinue) lines.push(story.Continue().trim());
            return { lines: lines.filter(Boolean), choices: story.currentChoices.map((c, index) => ({ index, text: c.text })), ink: story.state.ToJson() };
          },
          choose(index) {
            if (!Number.isInteger(index) || index < 0 || index >= story.currentChoices.length) throw Error("Invalid Ink choice");
            story.ChooseChoiceIndex(index);
            return this.view();
          },
          snapshot() {
            return story.state.ToJson();
          }
        };
      }
      window.FarmInk = { createSession };
    }
  });
  require_story_ink_entry();
})();
