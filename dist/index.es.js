import { defineComponent as S, computed as T, resolveComponent as v, createBlock as p, openBlock as l, withCtx as s, createElementVNode as w, resolveDynamicComponent as Q, createElementBlock as d, createCommentVNode as Y, Fragment as C, renderList as $, ref as O, watchEffect as W, createTextVNode as D, toDisplayString as N, createVNode as i, withKeys as X, nextTick as Z, withModifiers as ee, unref as x, renderSlot as H } from "vue";
const le = { class: "flex items-center space-x-2" }, _e = /* @__PURE__ */ S({
  __name: "DictEdit",
  props: {
    modelValue: {},
    disabled: { type: Boolean },
    draft: { type: Boolean },
    options: {},
    keyFormat: {},
    autosave: { type: Boolean },
    valueType: {}
  },
  emits: ["update:modelValue", "save", "update:draft", "refresh"],
  setup(y, { emit: _ }) {
    const t = y, c = T(() => t.options?.map(
      (r) => typeof r == "string" ? { label: r, value: r } : r
    ) ?? []), o = (r) => r.valueType ?? t.valueType ?? "select";
    return (r, n) => {
      const b = v("el-option"), V = v("el-table-column");
      return l(), p(V, {
        label: "Value",
        width: "180"
      }, {
        default: s(({ row: m }) => [
          w("div", le, [
            (l(), p(Q(
              o(m) === "string" ? "el-input" : o(m) === "number" ? "el-input-number" : "el-select"
            ), {
              modelValue: m.value,
              "onUpdate:modelValue": (k) => m.value = k,
              size: "small",
              style: { width: "100%" },
              disabled: r.disabled,
              placeholder: o(m) === "select" ? "Select option" : o(m) === "number" ? "Enter number" : "Enter text"
            }, {
              default: s(() => [
                o(m) === "select" ? (l(!0), d(C, { key: 0 }, $(c.value, (k) => (l(), p(b, {
                  key: k.value,
                  label: k.label,
                  value: k.value
                }, null, 8, ["label", "value"]))), 128)) : Y("", !0)
              ]),
              _: 2
            }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "placeholder"]))
          ])
        ]),
        _: 1
      });
    };
  }
});
/*! Element Plus Icons Vue v2.3.1 */
var te = /* @__PURE__ */ S({
  name: "Close",
  __name: "close",
  setup(y) {
    return (_, t) => (l(), d("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      w("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), I = te, ae = /* @__PURE__ */ S({
  name: "Edit",
  __name: "edit",
  setup(y) {
    return (_, t) => (l(), d("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      w("path", {
        fill: "currentColor",
        d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
      }),
      w("path", {
        fill: "currentColor",
        d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
      })
    ]));
  }
}), M = ae;
const oe = {
  key: 0,
  class: "flex flex-wrap gap-2 items-center"
}, ne = { class: "mt-2 w-full flex justify-end gap-2" }, se = { class: "truncate max-w-[170px] block" }, ue = {
  key: 0,
  class: "flex justify-end items-center space-x-1"
}, ie = { class: "flex items-center space-x-1" }, de = {
  key: 2,
  class: "flex items-center space-x-2 w-full"
}, ce = {
  key: 0,
  class: "flex items-center space-x-1"
}, re = { class: "flex items-center space-x-1" }, pe = { key: 4 }, me = { class: "flex items-center space-x-1" }, fe = /* @__PURE__ */ S({
  __name: "DynamicInputEditor",
  props: {
    modelValue: {},
    label: {},
    disabled: { type: Boolean },
    type: {},
    placeholder: {},
    dateDefaultVal: {},
    isDate: { type: Boolean },
    isDict: { type: Boolean },
    readonly: { type: Boolean }
  },
  emits: ["update:modelValue", "save", "cancel", "info", "validate"],
  setup(y, { emit: _ }) {
    const t = y, c = _, o = O([]), r = O(!1), n = O(!1), b = O(null), V = T(() => Array.isArray(t.modelValue)), m = T(
      () => t.isDict && t.modelValue !== null && !Array.isArray(t.modelValue)
    ), k = T(
      () => typeof t.modelValue == "object" && t.modelValue !== null && !Array.isArray(t.modelValue) && "label" in t.modelValue
    ), a = O(null);
    W(() => {
      const e = t.modelValue;
      Array.isArray(e) ? (o.value = e.map(
        (u) => typeof u == "string" ? u : u.label ?? ""
      ), a.value = "") : m.value ? (a.value = { ...e }, o.value = []) : typeof e == "number" ? (a.value = e, o.value = []) : typeof e == "string" ? (a.value = e, o.value = []) : k.value ? (a.value = e.label ?? "", o.value = []) : (a.value = "", o.value = []);
    });
    function g() {
      r.value = !0;
    }
    function U() {
      const e = a.value?.toString().trim();
      if (e) {
        if (o.value.includes(e)) {
          c("info", `"${e}" is already added and cannot be duplicated.`), c("validate", !1), a.value = "", n.value = !1;
          return;
        }
        c("validate", !0), o.value.push(e), a.value = "", n.value = !1;
      }
    }
    function A(e) {
      o.value.splice(e, 1);
    }
    function z() {
      let e;
      V.value ? e = o.value : m.value ? e = { ...a.value } : k.value ? e = {
        ...t.modelValue,
        label: a.value
      } : e = a.value, c("update:modelValue", e), c("save", e), r.value = !1;
    }
    function B() {
      a.value = typeof t.modelValue == "string" ? t.modelValue : t.modelValue?.label ?? "", c("cancel"), r.value = !1, n.value = !1;
    }
    function R(e) {
      a.value = e, c("update:modelValue", e);
    }
    return (e, u) => {
      const j = v("el-tag"), F = v("el-input"), h = v("el-button"), q = v("el-icon"), L = v("el-popconfirm"), G = v("el-input-number"), J = v("el-date-picker");
      return l(), d("div", null, [
        V.value ? (l(), d(C, { key: 0 }, [
          r.value ? (l(), d("div", oe, [
            (l(!0), d(C, null, $(o.value, (f, E) => (l(), p(j, {
              key: E,
              closable: "",
              onClose: (P) => A(E),
              size: "small"
            }, {
              default: s(() => [
                D(N(f), 1)
              ]),
              _: 2
            }, 1032, ["onClose"]))), 128)),
            n.value ? (l(), p(j, {
              key: 0,
              class: "px-0"
            }, {
              default: s(() => [
                i(F, {
                  ref_key: "inputRef",
                  ref: b,
                  modelValue: a.value,
                  "onUpdate:modelValue": u[0] || (u[0] = (f) => a.value = f),
                  class: "w-20",
                  size: "small",
                  onKeyup: X(U, ["enter"]),
                  onBlur: U,
                  style: { border: "none", outline: "none" }
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })) : (l(), p(j, {
              key: 1,
              type: "info",
              class: "cursor-pointer",
              onClick: u[1] || (u[1] = () => {
                n.value = !0, a.value = "", Z(() => b.value?.focus());
              })
            }, {
              default: s(() => [
                D(" + " + N(e.label), 1)
              ]),
              _: 1
            })),
            w("div", ne, [
              i(h, {
                size: "small",
                onClick: B
              }, {
                default: s(() => u[6] || (u[6] = [
                  D("Cancel")
                ])),
                _: 1,
                __: [6]
              }),
              i(h, {
                type: "primary",
                size: "small",
                onClick: z
              }, {
                default: s(() => u[7] || (u[7] = [
                  D("Save")
                ])),
                _: 1,
                __: [7]
              })
            ])
          ])) : (l(), d("div", {
            key: 1,
            class: "flex flex-wrap gap-2 cursor-pointer",
            onClick: g
          }, [
            (l(!0), d(C, null, $(o.value, (f, E) => (l(), p(j, {
              key: E,
              closable: "",
              onClose: ee((P) => A(E), ["stop"]),
              size: "small"
            }, {
              default: s(() => [
                D(N(f), 1)
              ]),
              _: 2
            }, 1032, ["onClose"]))), 128)),
            i(j, {
              type: "info",
              class: "cursor-pointer"
            }, {
              default: s(() => u[8] || (u[8] = [
                D("+ New Tag")
              ])),
              _: 1,
              __: [8]
            })
          ]))
        ], 64)) : (l(), d(C, { key: 1 }, [
          r.value ? e.type === "number" || e.type === "float" ? (l(), p(G, {
            key: 1,
            modelValue: a.value,
            "onUpdate:modelValue": u[2] || (u[2] = (f) => a.value = f),
            disabled: e.disabled,
            size: "small",
            class: "w-full",
            placeholder: e.label
          }, {
            suffix: s(() => [
              w("div", ie, [
                i(L, {
                  title: "Are you sure you want to save the changes?",
                  "confirm-button-text": "Yes",
                  "cancel-button-text": "No",
                  onConfirm: z
                }, {
                  reference: s(() => [
                    i(h, {
                      class: "compact-btn",
                      type: "text",
                      size: "small",
                      icon: "Edit",
                      title: "Save"
                    })
                  ]),
                  _: 1
                }),
                i(h, {
                  class: "compact-btn",
                  type: "text",
                  size: "small",
                  icon: x(I),
                  onClick: B,
                  title: "Cancel"
                }, null, 8, ["icon"])
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "disabled", "placeholder"])) : e.type === "date" ? (l(), d("div", de, [
            i(J, {
              modelValue: a.value,
              "onUpdate:modelValue": u[3] || (u[3] = (f) => a.value = f),
              disabled: e.disabled,
              size: "small",
              class: "w-full",
              placeholder: e.label,
              "default-value": t.dateDefaultVal
            }, null, 8, ["modelValue", "disabled", "placeholder", "default-value"]),
            e.disabled ? Y("", !0) : (l(), d("div", ce, [
              i(L, {
                title: "Are you sure you want to save the changes?",
                "confirm-button-text": "Yes",
                "cancel-button-text": "No",
                onConfirm: z
              }, {
                reference: s(() => [
                  i(h, {
                    class: "compact-btn",
                    type: "text",
                    size: "small",
                    icon: x(M),
                    title: "Save"
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }),
              i(h, {
                class: "compact-btn",
                type: "text",
                size: "small",
                icon: x(I),
                onClick: B,
                title: "Cancel"
              }, null, 8, ["icon"])
            ]))
          ])) : e.type === "email" ? (l(), p(F, {
            key: 3,
            modelValue: a.value,
            "onUpdate:modelValue": u[4] || (u[4] = (f) => a.value = f),
            type: "email",
            size: "small",
            class: "w-full",
            placeholder: e.label
          }, {
            suffix: s(() => [
              w("div", re, [
                i(L, {
                  title: "Are you sure you want to save the changes?",
                  "confirm-button-text": "Yes",
                  "cancel-button-text": "No",
                  onConfirm: z
                }, {
                  reference: s(() => [
                    i(h, {
                      class: "compact-btn",
                      type: "text",
                      size: "small",
                      icon: x(M),
                      title: "Save"
                    }, null, 8, ["icon"])
                  ]),
                  _: 1
                }),
                i(h, {
                  class: "compact-btn",
                  type: "text",
                  size: "small",
                  icon: x(I),
                  onClick: B,
                  title: "Cancel"
                }, null, 8, ["icon"])
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])) : e.type === "dict" ? (l(), d("div", pe, [
            H(e.$slots, "dict", {
              vModel: a.value,
              disabled: e.disabled,
              label: e.label,
              readonly: e.readonly,
              type: e.type,
              placeholder: e.placeholder,
              isDict: m.value,
              updateModelValue: R,
              save: z,
              cancel: B
            }, void 0, !0)
          ])) : (l(), p(F, {
            key: 5,
            modelValue: a.value,
            "onUpdate:modelValue": u[5] || (u[5] = (f) => a.value = f),
            size: "small",
            class: "w-full",
            disabled: e.disabled,
            placeholder: e.label
          }, {
            suffix: s(() => [
              w("div", me, [
                i(L, {
                  title: "Are you sure you want to save the changes?",
                  "confirm-button-text": "Yes",
                  "cancel-button-text": "No",
                  onConfirm: z
                }, {
                  reference: s(() => [
                    i(h, {
                      class: "compact-btn",
                      type: "text",
                      size: "small",
                      icon: x(M),
                      title: "Save"
                    }, null, 8, ["icon"])
                  ]),
                  _: 1
                }),
                i(h, {
                  class: "compact-btn",
                  type: "text",
                  size: "small",
                  icon: x(I),
                  onClick: B,
                  title: "Cancel"
                }, null, 8, ["icon"])
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "disabled", "placeholder"])) : (l(), d("div", {
            key: 0,
            class: "cursor-pointer flex justify-between items-center",
            onClick: g
          }, [
            w("span", se, N(a.value || t.placeholder || "—"), 1),
            e.disabled ? Y("", !0) : (l(), d("span", ue, [
              i(q, null, {
                default: s(() => [
                  i(x(M))
                ]),
                _: 1
              })
            ]))
          ]))
        ], 64))
      ]);
    };
  }
}), ve = (y, _) => {
  const t = y.__vccOpts || y;
  for (const [c, o] of _)
    t[c] = o;
  return t;
}, be = /* @__PURE__ */ ve(fe, [["__scopeId", "data-v-44df74d5"]]);
function K(y, _) {
  return _.split(".").reduce((t, c) => t ? t[c] : void 0, y);
}
const Ve = /* @__PURE__ */ S({
  __name: "EnityDetailDialog",
  props: {
    modelValue: { type: Boolean },
    loading: { type: Boolean },
    title: {},
    infoObject: {},
    fields: {},
    width: {}
  },
  emits: ["update:modelValue", "close"],
  setup(y, { emit: _ }) {
    const t = y, c = _, o = T(() => {
      const n = {};
      if (!t.infoObject) return n;
      for (const b of t.fields)
        if (b.children?.length)
          for (const V of b.children)
            n[V.key] = K(t.infoObject, V.key);
        else
          n[b.key] = K(t.infoObject, b.key);
      return n;
    });
    function r() {
      c("update:modelValue", !1), c("close");
    }
    return (n, b) => {
      const V = v("el-descriptions-item"), m = v("el-descriptions"), k = v("el-skeleton"), a = v("el-dialog");
      return l(), p(a, {
        "model-value": n.modelValue,
        title: n.title,
        width: n.width,
        onClose: r
      }, {
        default: s(() => [
          i(k, {
            loading: n.loading,
            animated: ""
          }, {
            default: s(() => [
              n.infoObject ? (l(), p(m, {
                key: 0,
                column: 1,
                border: ""
              }, {
                default: s(() => [
                  (l(!0), d(C, null, $(n.fields, (g, U) => (l(), p(V, {
                    key: U,
                    label: g.label
                  }, {
                    default: s(() => [
                      g.children?.length ? (l(), p(m, {
                        key: 0,
                        column: 1,
                        border: ""
                      }, {
                        default: s(() => [
                          (l(!0), d(C, null, $(g.children, (A, z) => (l(), p(V, {
                            key: z,
                            label: A.label
                          }, {
                            default: s(() => [
                              n.$slots.custom ? H(n.$slots, "custom", {
                                key: 0,
                                item: A,
                                infoObject: n.infoObject,
                                value: o.value[A.key] ?? "N/A",
                                fields: n.fields,
                                nestedValues: o.value
                              }) : (l(), d(C, { key: 1 }, [
                                D(N(o.value[A.key] ?? "N/A"), 1)
                              ], 64))
                            ]),
                            _: 2
                          }, 1032, ["label"]))), 128))
                        ]),
                        _: 2
                      }, 1024)) : n.$slots.custom ? H(n.$slots, "custom", {
                        key: 1,
                        item: g,
                        infoObject: n.infoObject,
                        value: o.value[g.key] ?? "N/A",
                        fields: n.fields,
                        nestedValues: o.value
                      }) : (l(), d(C, { key: 2 }, [
                        D(N(o.value[g.key] ?? "N/A"), 1)
                      ], 64))
                    ]),
                    _: 2
                  }, 1032, ["label"]))), 128))
                ]),
                _: 3
              })) : Y("", !0)
            ]),
            _: 3
          }, 8, ["loading"])
        ]),
        _: 3
      }, 8, ["model-value", "title", "width"]);
    };
  }
});
export {
  _e as DictEdit,
  be as DynamicInputEditor,
  Ve as EnityDetailDialog
};
