import { c as createLucideIcon, ab as clsx, R as React, af as getDefaultExportFromCjs, r as reactExports, k as useNavigate, N as Variant_Low_High_Medium_Critical, j as jsxRuntimeExports, O as Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError, a as cn, T as TriangleAlert, b as ChevronRight, Z as Zap, P as PayrollStatus, ag as AlertType, ah as AlertSeverity, X, S as Shield, y as AuditActionType, x as Lock, Q as TrendingUp, ai as useGetCompanyStats, F as useGetMyCompany, $ as useGetSubscription, U as Users, L as LoadingSpinner, m as formatDate, t as timestampToDate } from "./index-DqipwkTD.js";
import { c as useListUnreadAlerts, a as CreditCard, B as Bell, C as Clock, F as FileText, d as useMarkAllAlertsRead } from "./AppShell-CUGPoZlf.js";
import { d as useListAttendanceByMonth } from "./attendance-BHJK1AGJ.js";
import { f as filterProps, _ as _baseExtremum, F as _baseGt, H as _baseIteratee, I as _baseLt, j as isFunction, J as Text, K as polarToCartesian, L as Layer, M as getTickClassName, N as adaptEventsOfChild, O as Label, D as Dot, C as Curve, b as isNil, k as getValueByDataKey, S as Shape, A as Animate, P as get, a as interpolateNumber, d as isEqual, i as isNumber, e as LabelList, g as uniqueId, G as Global, Q as mathSign, B as findAllByType, U as Cell, V as getMaxRadius, W as getPercentValue, w as warn, Z as findPositionOfBar, $ as getBaseValueOfBar, a0 as truncateByDomain, a1 as getCateCoordinateOfBar, a2 as getTooltipItem, n as generateCategoricalChart, a3 as Bar, X as XAxis, Y as YAxis, o as formatAxisMap, a4 as formatAxisMap$1, u as useGetComplianceRiskScore, R as ResponsiveContainer, a5 as useGetPenaltyExposure, a6 as Legend, T as Tooltip } from "./generateCategoricalChart-FZbN6Ag_.js";
import { u as useListEmployees } from "./employees-CUvviRBY.js";
import { u as useListPayrollRuns } from "./payroll-BT2KpQag.js";
import { a as useListAllVisaRecords } from "./visa-DRv2T8_7.js";
import { b as SkeletonCard, a as SkeletonKPI } from "./SkeletonLoader-BW78e9tY.js";
import { B as Button } from "./button-B4kMrH3h.js";
import { I as Info } from "./info-zGkwlnOj.js";
import { T as TrendingDown } from "./trending-down-BHvE2-0E.js";
import { C as CircleCheckBig } from "./circle-check-big-B7EgiPXR.js";
import { u as useListAuditLogs } from "./audit-C2N5k9eD.js";
import { S as ShieldCheck } from "./shield-check-Chn_N5_O.js";
import { C as CardContainer, a as CardHeader } from "./CardContainer-BlAWtbPm.js";
import { M as Minus } from "./minus-DnstMq2X.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { D as Download } from "./download-BXuxgTcz.js";
import "./index-DzTulS2Y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$9);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode$8);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const FileWarning = createLucideIcon("file-warning", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
];
const Wrench = createLucideIcon("wrench", __iconNode);
var _excluded$2 = ["points", "className", "baseLinePoints", "connectNulls"];
function _extends$5() {
  _extends$5 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$5.apply(this, arguments);
}
function _objectWithoutProperties$2(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$2(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var isValidatePoint = function isValidatePoint2(point) {
  return point && point.x === +point.x && point.y === +point.y;
};
var getParsedPoints = function getParsedPoints2() {
  var points = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var segmentPoints = [[]];
  points.forEach(function(entry) {
    if (isValidatePoint(entry)) {
      segmentPoints[segmentPoints.length - 1].push(entry);
    } else if (segmentPoints[segmentPoints.length - 1].length > 0) {
      segmentPoints.push([]);
    }
  });
  if (isValidatePoint(points[0])) {
    segmentPoints[segmentPoints.length - 1].push(points[0]);
  }
  if (segmentPoints[segmentPoints.length - 1].length <= 0) {
    segmentPoints = segmentPoints.slice(0, -1);
  }
  return segmentPoints;
};
var getSinglePolygonPath = function getSinglePolygonPath2(points, connectNulls) {
  var segmentPoints = getParsedPoints(points);
  if (connectNulls) {
    segmentPoints = [segmentPoints.reduce(function(res, segPoints) {
      return [].concat(_toConsumableArray(res), _toConsumableArray(segPoints));
    }, [])];
  }
  var polygonPath = segmentPoints.map(function(segPoints) {
    return segPoints.reduce(function(path, point, index) {
      return "".concat(path).concat(index === 0 ? "M" : "L").concat(point.x, ",").concat(point.y);
    }, "");
  }).join("");
  return segmentPoints.length === 1 ? "".concat(polygonPath, "Z") : polygonPath;
};
var getRanglePath = function getRanglePath2(points, baseLinePoints, connectNulls) {
  var outerPath = getSinglePolygonPath(points, connectNulls);
  return "".concat(outerPath.slice(-1) === "Z" ? outerPath.slice(0, -1) : outerPath, "L").concat(getSinglePolygonPath(baseLinePoints.reverse(), connectNulls).slice(1));
};
var Polygon = function Polygon2(props) {
  var points = props.points, className = props.className, baseLinePoints = props.baseLinePoints, connectNulls = props.connectNulls, others = _objectWithoutProperties$2(props, _excluded$2);
  if (!points || !points.length) {
    return null;
  }
  var layerClass = clsx("recharts-polygon", className);
  if (baseLinePoints && baseLinePoints.length) {
    var hasStroke = others.stroke && others.stroke !== "none";
    var rangePath = getRanglePath(points, baseLinePoints, connectNulls);
    return /* @__PURE__ */ React.createElement("g", {
      className: layerClass
    }, /* @__PURE__ */ React.createElement("path", _extends$5({}, filterProps(others, true), {
      fill: rangePath.slice(-1) === "Z" ? others.fill : "none",
      stroke: "none",
      d: rangePath
    })), hasStroke ? /* @__PURE__ */ React.createElement("path", _extends$5({}, filterProps(others, true), {
      fill: "none",
      d: getSinglePolygonPath(points, connectNulls)
    })) : null, hasStroke ? /* @__PURE__ */ React.createElement("path", _extends$5({}, filterProps(others, true), {
      fill: "none",
      d: getSinglePolygonPath(baseLinePoints, connectNulls)
    })) : null);
  }
  var singlePath = getSinglePolygonPath(points, connectNulls);
  return /* @__PURE__ */ React.createElement("path", _extends$5({}, filterProps(others, true), {
    fill: singlePath.slice(-1) === "Z" ? others.fill : "none",
    className: layerClass,
    d: singlePath
  }));
};
var baseExtremum$1 = _baseExtremum, baseGt = _baseGt, baseIteratee$1 = _baseIteratee;
function maxBy(array, iteratee) {
  return array && array.length ? baseExtremum$1(array, baseIteratee$1(iteratee), baseGt) : void 0;
}
var maxBy_1 = maxBy;
const maxBy$1 = /* @__PURE__ */ getDefaultExportFromCjs(maxBy_1);
var baseExtremum = _baseExtremum, baseIteratee = _baseIteratee, baseLt = _baseLt;
function minBy(array, iteratee) {
  return array && array.length ? baseExtremum(array, baseIteratee(iteratee), baseLt) : void 0;
}
var minBy_1 = minBy;
const minBy$1 = /* @__PURE__ */ getDefaultExportFromCjs(minBy_1);
var _excluded$1 = ["cx", "cy", "angle", "ticks", "axisLine"], _excluded2$1 = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function _typeof$4(o) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$4(o);
}
function _extends$4() {
  _extends$4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$4.apply(this, arguments);
}
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$4(descriptor.key), descriptor);
  }
}
function _createClass$3(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$3(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$3(t, o, e) {
  return o = _getPrototypeOf$3(o), _possibleConstructorReturn$3(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf$3(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$3(self, call) {
  if (call && (_typeof$4(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$3(self);
}
function _assertThisInitialized$3(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$3() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$3(o) {
  _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$3(o);
}
function _inherits$3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$3(subClass, superClass);
}
function _setPrototypeOf$3(o, p) {
  _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$3(o, p);
}
function _defineProperty$4(obj, key, value) {
  key = _toPropertyKey$4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == _typeof$4(i) ? i : i + "";
}
function _toPrimitive$4(t, r) {
  if ("object" != _typeof$4(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$4(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var PolarRadiusAxis = /* @__PURE__ */ function(_PureComponent) {
  function PolarRadiusAxis2() {
    _classCallCheck$3(this, PolarRadiusAxis2);
    return _callSuper$3(this, PolarRadiusAxis2, arguments);
  }
  _inherits$3(PolarRadiusAxis2, _PureComponent);
  return _createClass$3(PolarRadiusAxis2, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function getTickValueCoord(_ref) {
        var coordinate = _ref.coordinate;
        var _this$props = this.props, angle = _this$props.angle, cx = _this$props.cx, cy = _this$props.cy;
        return polarToCartesian(cx, cy, coordinate, angle);
      }
    )
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor() {
      var orientation = this.props.orientation;
      var textAnchor;
      switch (orientation) {
        case "left":
          textAnchor = "end";
          break;
        case "right":
          textAnchor = "start";
          break;
        default:
          textAnchor = "middle";
          break;
      }
      return textAnchor;
    }
  }, {
    key: "getViewBox",
    value: function getViewBox() {
      var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, angle = _this$props2.angle, ticks = _this$props2.ticks;
      var maxRadiusTick = maxBy$1(ticks, function(entry) {
        return entry.coordinate || 0;
      });
      var minRadiusTick = minBy$1(ticks, function(entry) {
        return entry.coordinate || 0;
      });
      return {
        cx,
        cy,
        startAngle: angle,
        endAngle: angle,
        innerRadius: minRadiusTick.coordinate || 0,
        outerRadius: maxRadiusTick.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props3 = this.props, cx = _this$props3.cx, cy = _this$props3.cy, angle = _this$props3.angle, ticks = _this$props3.ticks, axisLine = _this$props3.axisLine, others = _objectWithoutProperties$1(_this$props3, _excluded$1);
      var extent = ticks.reduce(function(result, entry) {
        return [Math.min(result[0], entry.coordinate), Math.max(result[1], entry.coordinate)];
      }, [Infinity, -Infinity]);
      var point0 = polarToCartesian(cx, cy, extent[0], angle);
      var point1 = polarToCartesian(cx, cy, extent[1], angle);
      var props = _objectSpread$4(_objectSpread$4(_objectSpread$4({}, filterProps(others, false)), {}, {
        fill: "none"
      }, filterProps(axisLine, false)), {}, {
        x1: point0.x,
        y1: point0.y,
        x2: point1.x,
        y2: point1.y
      });
      return /* @__PURE__ */ React.createElement("line", _extends$4({
        className: "recharts-polar-radius-axis-line"
      }, props));
    }
  }, {
    key: "renderTicks",
    value: function renderTicks() {
      var _this = this;
      var _this$props4 = this.props, ticks = _this$props4.ticks, tick = _this$props4.tick, angle = _this$props4.angle, tickFormatter = _this$props4.tickFormatter, stroke = _this$props4.stroke, others = _objectWithoutProperties$1(_this$props4, _excluded2$1);
      var textAnchor = this.getTickTextAnchor();
      var axisProps = filterProps(others, false);
      var customTickProps = filterProps(tick, false);
      var items = ticks.map(function(entry, i) {
        var coord = _this.getTickValueCoord(entry);
        var tickProps = _objectSpread$4(_objectSpread$4(_objectSpread$4(_objectSpread$4({
          textAnchor,
          transform: "rotate(".concat(90 - angle, ", ").concat(coord.x, ", ").concat(coord.y, ")")
        }, axisProps), {}, {
          stroke: "none",
          fill: stroke
        }, customTickProps), {}, {
          index: i
        }, coord), {}, {
          payload: entry
        });
        return /* @__PURE__ */ React.createElement(Layer, _extends$4({
          className: clsx("recharts-polar-radius-axis-tick", getTickClassName(tick)),
          key: "tick-".concat(entry.coordinate)
        }, adaptEventsOfChild(_this.props, entry, i)), PolarRadiusAxis2.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
      });
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-polar-radius-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props, ticks = _this$props5.ticks, axisLine = _this$props5.axisLine, tick = _this$props5.tick;
      if (!ticks || !ticks.length) {
        return null;
      }
      return /* @__PURE__ */ React.createElement(Layer, {
        className: clsx("recharts-polar-radius-axis", this.props.className)
      }, axisLine && this.renderAxisLine(), tick && this.renderTicks(), Label.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;
      if (/* @__PURE__ */ React.isValidElement(option)) {
        tickItem = /* @__PURE__ */ React.cloneElement(option, props);
      } else if (isFunction(option)) {
        tickItem = option(props);
      } else {
        tickItem = /* @__PURE__ */ React.createElement(Text, _extends$4({}, props, {
          className: "recharts-polar-radius-axis-tick-value"
        }), value);
      }
      return tickItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty$4(PolarRadiusAxis, "displayName", "PolarRadiusAxis");
_defineProperty$4(PolarRadiusAxis, "axisType", "radiusAxis");
_defineProperty$4(PolarRadiusAxis, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: true,
  tick: true,
  tickCount: 5,
  allowDataOverflow: false,
  scale: "auto",
  allowDuplicatedCategory: true
});
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$3(descriptor.key), descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$2(t, o, e) {
  return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
  if (call && (_typeof$3(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$2() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$2(o);
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$2(o, p);
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var RADIAN = Math.PI / 180;
var eps = 1e-5;
var PolarAngleAxis = /* @__PURE__ */ function(_PureComponent) {
  function PolarAngleAxis2() {
    _classCallCheck$2(this, PolarAngleAxis2);
    return _callSuper$2(this, PolarAngleAxis2, arguments);
  }
  _inherits$2(PolarAngleAxis2, _PureComponent);
  return _createClass$2(PolarAngleAxis2, [{
    key: "getTickLineCoord",
    value: (
      /**
       * Calculate the coordinate of line endpoint
       * @param  {Object} data The Data if ticks
       * @return {Object} (x0, y0): The start point of text,
       *                  (x1, y1): The end point close to text,
       *                  (x2, y2): The end point close to axis
       */
      function getTickLineCoord(data) {
        var _this$props = this.props, cx = _this$props.cx, cy = _this$props.cy, radius = _this$props.radius, orientation = _this$props.orientation, tickSize = _this$props.tickSize;
        var tickLineSize = tickSize || 8;
        var p1 = polarToCartesian(cx, cy, radius, data.coordinate);
        var p2 = polarToCartesian(cx, cy, radius + (orientation === "inner" ? -1 : 1) * tickLineSize, data.coordinate);
        return {
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y
        };
      }
    )
    /**
     * Get the text-anchor of each tick
     * @param  {Object} data Data of ticks
     * @return {String} text-anchor
     */
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor(data) {
      var orientation = this.props.orientation;
      var cos = Math.cos(-data.coordinate * RADIAN);
      var textAnchor;
      if (cos > eps) {
        textAnchor = orientation === "outer" ? "start" : "end";
      } else if (cos < -eps) {
        textAnchor = orientation === "outer" ? "end" : "start";
      } else {
        textAnchor = "middle";
      }
      return textAnchor;
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, radius = _this$props2.radius, axisLine = _this$props2.axisLine, axisLineType = _this$props2.axisLineType;
      var props = _objectSpread$3(_objectSpread$3({}, filterProps(this.props, false)), {}, {
        fill: "none"
      }, filterProps(axisLine, false));
      if (axisLineType === "circle") {
        return /* @__PURE__ */ React.createElement(Dot, _extends$3({
          className: "recharts-polar-angle-axis-line"
        }, props, {
          cx,
          cy,
          r: radius
        }));
      }
      var ticks = this.props.ticks;
      var points = ticks.map(function(entry) {
        return polarToCartesian(cx, cy, radius, entry.coordinate);
      });
      return /* @__PURE__ */ React.createElement(Polygon, _extends$3({
        className: "recharts-polar-angle-axis-line"
      }, props, {
        points
      }));
    }
  }, {
    key: "renderTicks",
    value: function renderTicks() {
      var _this = this;
      var _this$props3 = this.props, ticks = _this$props3.ticks, tick = _this$props3.tick, tickLine = _this$props3.tickLine, tickFormatter = _this$props3.tickFormatter, stroke = _this$props3.stroke;
      var axisProps = filterProps(this.props, false);
      var customTickProps = filterProps(tick, false);
      var tickLineProps = _objectSpread$3(_objectSpread$3({}, axisProps), {}, {
        fill: "none"
      }, filterProps(tickLine, false));
      var items = ticks.map(function(entry, i) {
        var lineCoord = _this.getTickLineCoord(entry);
        var textAnchor = _this.getTickTextAnchor(entry);
        var tickProps = _objectSpread$3(_objectSpread$3(_objectSpread$3({
          textAnchor
        }, axisProps), {}, {
          stroke: "none",
          fill: stroke
        }, customTickProps), {}, {
          index: i,
          payload: entry,
          x: lineCoord.x2,
          y: lineCoord.y2
        });
        return /* @__PURE__ */ React.createElement(Layer, _extends$3({
          className: clsx("recharts-polar-angle-axis-tick", getTickClassName(tick)),
          key: "tick-".concat(entry.coordinate)
        }, adaptEventsOfChild(_this.props, entry, i)), tickLine && /* @__PURE__ */ React.createElement("line", _extends$3({
          className: "recharts-polar-angle-axis-tick-line"
        }, tickLineProps, lineCoord)), tick && PolarAngleAxis2.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
      });
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-polar-angle-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props, ticks = _this$props4.ticks, radius = _this$props4.radius, axisLine = _this$props4.axisLine;
      if (radius <= 0 || !ticks || !ticks.length) {
        return null;
      }
      return /* @__PURE__ */ React.createElement(Layer, {
        className: clsx("recharts-polar-angle-axis", this.props.className)
      }, axisLine && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;
      if (/* @__PURE__ */ React.isValidElement(option)) {
        tickItem = /* @__PURE__ */ React.cloneElement(option, props);
      } else if (isFunction(option)) {
        tickItem = option(props);
      } else {
        tickItem = /* @__PURE__ */ React.createElement(Text, _extends$3({}, props, {
          className: "recharts-polar-angle-axis-tick-value"
        }), value);
      }
      return tickItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty$3(PolarAngleAxis, "displayName", "PolarAngleAxis");
_defineProperty$3(PolarAngleAxis, "axisType", "angleAxis");
_defineProperty$3(PolarAngleAxis, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: true,
  tickLine: true,
  tickSize: 8,
  tick: true,
  hide: false,
  allowDuplicatedCategory: true
});
var _Pie;
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$1(t, o, e) {
  return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$1() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$1(o, p);
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Pie = /* @__PURE__ */ function(_PureComponent) {
  function Pie2(props) {
    var _this;
    _classCallCheck$1(this, Pie2);
    _this = _callSuper$1(this, Pie2, [props]);
    _defineProperty$2(_this, "pieRef", null);
    _defineProperty$2(_this, "sectorRefs", []);
    _defineProperty$2(_this, "id", uniqueId("recharts-pie-"));
    _defineProperty$2(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty$2(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    _this.state = {
      isAnimationFinished: !props.isAnimationActive,
      prevIsAnimationActive: props.isAnimationActive,
      prevAnimationId: props.animationId,
      sectorToFocus: 0
    };
    return _this;
  }
  _inherits$1(Pie2, _PureComponent);
  return _createClass$1(Pie2, [{
    key: "isActiveIndex",
    value: function isActiveIndex(i) {
      var activeIndex = this.props.activeIndex;
      if (Array.isArray(activeIndex)) {
        return activeIndex.indexOf(i) !== -1;
      }
      return i === activeIndex;
    }
  }, {
    key: "hasActiveIndex",
    value: function hasActiveIndex() {
      var activeIndex = this.props.activeIndex;
      return Array.isArray(activeIndex) ? activeIndex.length !== 0 : activeIndex || activeIndex === 0;
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(sectors) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, label = _this$props.label, labelLine = _this$props.labelLine, dataKey = _this$props.dataKey, valueKey = _this$props.valueKey;
      var pieProps = filterProps(this.props, false);
      var customLabelProps = filterProps(label, false);
      var customLabelLineProps = filterProps(labelLine, false);
      var offsetRadius = label && label.offsetRadius || 20;
      var labels = sectors.map(function(entry, i) {
        var midAngle = (entry.startAngle + entry.endAngle) / 2;
        var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
        var labelProps = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, pieProps), entry), {}, {
          stroke: "none"
        }, customLabelProps), {}, {
          index: i,
          textAnchor: Pie2.getTextAnchor(endPoint.x, entry.cx)
        }, endPoint);
        var lineProps = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, pieProps), entry), {}, {
          fill: "none",
          stroke: entry.fill
        }, customLabelLineProps), {}, {
          index: i,
          points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint]
        });
        var realDataKey = dataKey;
        if (isNil(dataKey) && isNil(valueKey)) {
          realDataKey = "value";
        } else if (isNil(dataKey)) {
          realDataKey = valueKey;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ React.createElement(Layer, {
            key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
          }, labelLine && Pie2.renderLabelLineItem(labelLine, lineProps, "line"), Pie2.renderLabelItem(label, labelProps, getValueByDataKey(entry, realDataKey)))
        );
      });
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-pie-labels"
      }, labels);
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this2 = this;
      var _this$props2 = this.props, activeShape = _this$props2.activeShape, blendStroke = _this$props2.blendStroke, inactiveShapeProp = _this$props2.inactiveShape;
      return sectors.map(function(entry, i) {
        if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
        var isActive = _this2.isActiveIndex(i);
        var inactiveShape = inactiveShapeProp && _this2.hasActiveIndex() ? inactiveShapeProp : null;
        var sectorOptions = isActive ? activeShape : inactiveShape;
        var sectorProps = _objectSpread$2(_objectSpread$2({}, entry), {}, {
          stroke: blendStroke ? entry.fill : entry.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ React.createElement(Layer, _extends$2({
          ref: function ref(_ref) {
            if (_ref && !_this2.sectorRefs.includes(_ref)) {
              _this2.sectorRefs.push(_ref);
            }
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, adaptEventsOfChild(_this2.props, entry, i), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
        }), /* @__PURE__ */ React.createElement(Shape, _extends$2({
          option: sectorOptions,
          isActive,
          shapeType: "sector"
        }, sectorProps)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this3 = this;
      var _this$props3 = this.props, sectors = _this$props3.sectors, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
      var _this$state = this.state, prevSectors = _this$state.prevSectors, prevIsAnimationActive = _this$state.prevIsAnimationActive;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId, "-").concat(prevIsAnimationActive),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(_ref2) {
        var t = _ref2.t;
        var stepData = [];
        var first = sectors && sectors[0];
        var curAngle = first.startAngle;
        sectors.forEach(function(entry, index) {
          var prev = prevSectors && prevSectors[index];
          var paddingAngle = index > 0 ? get(entry, "paddingAngle", 0) : 0;
          if (prev) {
            var angleIp = interpolateNumber(prev.endAngle - prev.startAngle, entry.endAngle - entry.startAngle);
            var latest = _objectSpread$2(_objectSpread$2({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + angleIp(t) + paddingAngle
            });
            stepData.push(latest);
            curAngle = latest.endAngle;
          } else {
            var endAngle = entry.endAngle, startAngle = entry.startAngle;
            var interpolatorAngle = interpolateNumber(0, endAngle - startAngle);
            var deltaAngle = interpolatorAngle(t);
            var _latest = _objectSpread$2(_objectSpread$2({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + deltaAngle + paddingAngle
            });
            stepData.push(_latest);
            curAngle = _latest.endAngle;
          }
        });
        return /* @__PURE__ */ React.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function attachKeyboardHandlers(pieRef) {
      var _this4 = this;
      pieRef.onkeydown = function(e) {
        if (!e.altKey) {
          switch (e.key) {
            case "ArrowLeft": {
              var next = ++_this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[next].focus();
              _this4.setState({
                sectorToFocus: next
              });
              break;
            }
            case "ArrowRight": {
              var _next = --_this4.state.sectorToFocus < 0 ? _this4.sectorRefs.length - 1 : _this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[_next].focus();
              _this4.setState({
                sectorToFocus: _next
              });
              break;
            }
            case "Escape": {
              _this4.sectorRefs[_this4.state.sectorToFocus].blur();
              _this4.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
        }
      };
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props4 = this.props, sectors = _this$props4.sectors, isAnimationActive = _this$props4.isAnimationActive;
      var prevSectors = this.state.prevSectors;
      if (isAnimationActive && sectors && sectors.length && (!prevSectors || !isEqual(prevSectors, sectors))) {
        return this.renderSectorsWithAnimation();
      }
      return this.renderSectorsStatically(sectors);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.pieRef) {
        this.attachKeyboardHandlers(this.pieRef);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      var _this$props5 = this.props, hide = _this$props5.hide, sectors = _this$props5.sectors, className = _this$props5.className, label = _this$props5.label, cx = _this$props5.cx, cy = _this$props5.cy, innerRadius = _this$props5.innerRadius, outerRadius = _this$props5.outerRadius, isAnimationActive = _this$props5.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (hide || !sectors || !sectors.length || !isNumber(cx) || !isNumber(cy) || !isNumber(innerRadius) || !isNumber(outerRadius)) {
        return null;
      }
      var layerClass = clsx("recharts-pie", className);
      return /* @__PURE__ */ React.createElement(Layer, {
        tabIndex: this.props.rootTabIndex,
        className: layerClass,
        ref: function ref(_ref3) {
          _this5.pieRef = _ref3;
        }
      }, this.renderSectors(), label && this.renderLabels(sectors), Label.renderCallByParent(this.props, null, false), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, sectors, false));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.prevIsAnimationActive !== nextProps.isAnimationActive) {
        return {
          prevIsAnimationActive: nextProps.isAnimationActive,
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: [],
          isAnimationFinished: true
        };
      }
      if (nextProps.isAnimationActive && nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: prevState.curSectors,
          isAnimationFinished: true
        };
      }
      if (nextProps.sectors !== prevState.curSectors) {
        return {
          curSectors: nextProps.sectors,
          isAnimationFinished: true
        };
      }
      return null;
    }
  }, {
    key: "getTextAnchor",
    value: function getTextAnchor(x, cx) {
      if (x > cx) {
        return "start";
      }
      if (x < cx) {
        return "end";
      }
      return "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function renderLabelLineItem(option, props, key) {
      if (/* @__PURE__ */ React.isValidElement(option)) {
        return /* @__PURE__ */ React.cloneElement(option, props);
      }
      if (isFunction(option)) {
        return option(props);
      }
      var className = clsx("recharts-pie-label-line", typeof option !== "boolean" ? option.className : "");
      return /* @__PURE__ */ React.createElement(Curve, _extends$2({}, props, {
        key,
        type: "linear",
        className
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function renderLabelItem(option, props, value) {
      if (/* @__PURE__ */ React.isValidElement(option)) {
        return /* @__PURE__ */ React.cloneElement(option, props);
      }
      var label = value;
      if (isFunction(option)) {
        label = option(props);
        if (/* @__PURE__ */ React.isValidElement(label)) {
          return label;
        }
      }
      var className = clsx("recharts-pie-label-text", typeof option !== "boolean" && !isFunction(option) ? option.className : "");
      return /* @__PURE__ */ React.createElement(Text, _extends$2({}, props, {
        alignmentBaseline: "middle",
        className
      }), label);
    }
  }]);
}(reactExports.PureComponent);
_Pie = Pie;
_defineProperty$2(Pie, "displayName", "Pie");
_defineProperty$2(Pie, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: true,
  hide: false,
  minAngle: 0,
  isAnimationActive: !Global.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: false,
  rootTabIndex: 0
});
_defineProperty$2(Pie, "parseDeltaAngle", function(startAngle, endAngle) {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
});
_defineProperty$2(Pie, "getRealPieData", function(itemProps) {
  var data = itemProps.data, children = itemProps.children;
  var presentationProps = filterProps(itemProps, false);
  var cells = findAllByType(children, Cell);
  if (data && data.length) {
    return data.map(function(entry, index) {
      return _objectSpread$2(_objectSpread$2(_objectSpread$2({
        payload: entry
      }, presentationProps), entry), cells && cells[index] && cells[index].props);
    });
  }
  if (cells && cells.length) {
    return cells.map(function(cell) {
      return _objectSpread$2(_objectSpread$2({}, presentationProps), cell.props);
    });
  }
  return [];
});
_defineProperty$2(Pie, "parseCoordinateOfPie", function(itemProps, offset) {
  var top = offset.top, left = offset.left, width = offset.width, height = offset.height;
  var maxPieRadius = getMaxRadius(width, height);
  var cx = left + getPercentValue(itemProps.cx, width, width / 2);
  var cy = top + getPercentValue(itemProps.cy, height, height / 2);
  var innerRadius = getPercentValue(itemProps.innerRadius, maxPieRadius, 0);
  var outerRadius = getPercentValue(itemProps.outerRadius, maxPieRadius, maxPieRadius * 0.8);
  var maxRadius = itemProps.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx,
    cy,
    innerRadius,
    outerRadius,
    maxRadius
  };
});
_defineProperty$2(Pie, "getComposedData", function(_ref4) {
  var item = _ref4.item, offset = _ref4.offset;
  var itemProps = item.type.defaultProps !== void 0 ? _objectSpread$2(_objectSpread$2({}, item.type.defaultProps), item.props) : item.props;
  var pieData = _Pie.getRealPieData(itemProps);
  if (!pieData || !pieData.length) {
    return null;
  }
  var cornerRadius = itemProps.cornerRadius, startAngle = itemProps.startAngle, endAngle = itemProps.endAngle, paddingAngle = itemProps.paddingAngle, dataKey = itemProps.dataKey, nameKey = itemProps.nameKey, valueKey = itemProps.valueKey, tooltipType = itemProps.tooltipType;
  var minAngle = Math.abs(itemProps.minAngle);
  var coordinate = _Pie.parseCoordinateOfPie(itemProps, offset);
  var deltaAngle = _Pie.parseDeltaAngle(startAngle, endAngle);
  var absDeltaAngle = Math.abs(deltaAngle);
  var realDataKey = dataKey;
  if (isNil(dataKey) && isNil(valueKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = "value";
  } else if (isNil(dataKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = valueKey;
  }
  var notZeroItemCount = pieData.filter(function(entry) {
    return getValueByDataKey(entry, realDataKey, 0) !== 0;
  }).length;
  var totalPadingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
  var realTotalAngle = absDeltaAngle - notZeroItemCount * minAngle - totalPadingAngle;
  var sum = pieData.reduce(function(result, entry) {
    var val = getValueByDataKey(entry, realDataKey, 0);
    return result + (isNumber(val) ? val : 0);
  }, 0);
  var sectors;
  if (sum > 0) {
    var prev;
    sectors = pieData.map(function(entry, i) {
      var val = getValueByDataKey(entry, realDataKey, 0);
      var name = getValueByDataKey(entry, nameKey, i);
      var percent = (isNumber(val) ? val : 0) / sum;
      var tempStartAngle;
      if (i) {
        tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
      } else {
        tempStartAngle = startAngle;
      }
      var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? minAngle : 0) + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name,
        value: val,
        payload: entry,
        dataKey: realDataKey,
        type: tooltipType
      }];
      var tooltipPosition = polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread$2(_objectSpread$2(_objectSpread$2({
        percent,
        cornerRadius,
        name,
        tooltipPayload,
        midAngle,
        middleRadius,
        tooltipPosition
      }, entry), coordinate), {}, {
        value: getValueByDataKey(entry, realDataKey),
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entry,
        paddingAngle: mathSign(deltaAngle) * paddingAngle
      });
      return prev;
    });
  }
  return _objectSpread$2(_objectSpread$2({}, coordinate), {}, {
    sectors,
    data: pieData
  });
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function parseCornerRadius(cornerRadius) {
  if (typeof cornerRadius === "string") {
    return parseInt(cornerRadius, 10);
  }
  return cornerRadius;
}
function typeGuardSectorProps(option, props) {
  var cxValue = "".concat(props.cx || option.cx);
  var cx = Number(cxValue);
  var cyValue = "".concat(props.cy || option.cy);
  var cy = Number(cyValue);
  return _objectSpread$1(_objectSpread$1(_objectSpread$1({}, props), option), {}, {
    cx,
    cy
  });
}
function RadialBarSector(props) {
  return /* @__PURE__ */ React.createElement(Shape, _extends$1({
    shapeType: "sector",
    propTransformer: typeGuardSectorProps
  }, props));
}
var _excluded = ["shape", "activeShape", "activeIndex", "cornerRadius"], _excluded2 = ["value", "background"];
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var RadialBar = /* @__PURE__ */ function(_PureComponent) {
  function RadialBar2() {
    var _this;
    _classCallCheck(this, RadialBar2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, RadialBar2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: false
    });
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    return _this;
  }
  _inherits(RadialBar2, _PureComponent);
  return _createClass(RadialBar2, [{
    key: "getDeltaAngle",
    value: function getDeltaAngle() {
      var _this$props = this.props, startAngle = _this$props.startAngle, endAngle = _this$props.endAngle;
      var sign = mathSign(endAngle - startAngle);
      var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
      return sign * deltaAngle;
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this2 = this;
      var _this$props2 = this.props, shape = _this$props2.shape, activeShape = _this$props2.activeShape, activeIndex = _this$props2.activeIndex, cornerRadius = _this$props2.cornerRadius, others = _objectWithoutProperties(_this$props2, _excluded);
      var baseProps = filterProps(others, false);
      return sectors.map(function(entry, i) {
        var isActive = i === activeIndex;
        var props = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, baseProps), {}, {
          cornerRadius: parseCornerRadius(cornerRadius)
        }, entry), adaptEventsOfChild(_this2.props, entry, i)), {}, {
          className: "recharts-radial-bar-sector ".concat(entry.className),
          forceCornerRadius: others.forceCornerRadius,
          cornerIsExternal: others.cornerIsExternal,
          isActive,
          option: isActive ? activeShape : shape
        });
        return /* @__PURE__ */ React.createElement(RadialBarSector, _extends({}, props, {
          key: "sector-".concat(i)
        }));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this3 = this;
      var _this$props3 = this.props, data = _this$props3.data, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
      var prevData = this.state.prevData;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "radialBar-".concat(animationId),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(_ref) {
        var t = _ref.t;
        var stepData = data.map(function(entry, index) {
          var prev = prevData && prevData[index];
          if (prev) {
            var interpolatorStartAngle = interpolateNumber(prev.startAngle, entry.startAngle);
            var interpolatorEndAngle = interpolateNumber(prev.endAngle, entry.endAngle);
            return _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: interpolatorStartAngle(t),
              endAngle: interpolatorEndAngle(t)
            });
          }
          var endAngle = entry.endAngle, startAngle = entry.startAngle;
          var interpolator = interpolateNumber(startAngle, endAngle);
          return _objectSpread(_objectSpread({}, entry), {}, {
            endAngle: interpolator(t)
          });
        });
        return /* @__PURE__ */ React.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props4 = this.props, data = _this$props4.data, isAnimationActive = _this$props4.isAnimationActive;
      var prevData = this.state.prevData;
      if (isAnimationActive && data && data.length && (!prevData || !isEqual(prevData, data))) {
        return this.renderSectorsWithAnimation();
      }
      return this.renderSectorsStatically(data);
    }
  }, {
    key: "renderBackground",
    value: function renderBackground(sectors) {
      var _this4 = this;
      var cornerRadius = this.props.cornerRadius;
      var backgroundProps = filterProps(this.props.background, false);
      return sectors.map(function(entry, i) {
        entry.value;
        var background = entry.background, rest = _objectWithoutProperties(entry, _excluded2);
        if (!background) {
          return null;
        }
        var props = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
          cornerRadius: parseCornerRadius(cornerRadius)
        }, rest), {}, {
          fill: "#eee"
        }, background), backgroundProps), adaptEventsOfChild(_this4.props, entry, i)), {}, {
          index: i,
          className: clsx("recharts-radial-bar-background-sector", backgroundProps === null || backgroundProps === void 0 ? void 0 : backgroundProps.className),
          option: background,
          isActive: false
        });
        return /* @__PURE__ */ React.createElement(RadialBarSector, _extends({}, props, {
          key: "sector-".concat(i)
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props, hide = _this$props5.hide, data = _this$props5.data, className = _this$props5.className, background = _this$props5.background, isAnimationActive = _this$props5.isAnimationActive;
      if (hide || !data || !data.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = clsx("recharts-area", className);
      return /* @__PURE__ */ React.createElement(Layer, {
        className: layerClass
      }, background && /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-radial-bar-background"
      }, this.renderBackground(data)), /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-radial-bar-sectors"
      }, this.renderSectors()), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(_objectSpread({}, this.props), data));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curData: nextProps.data,
          prevData: prevState.curData
        };
      }
      if (nextProps.data !== prevState.curData) {
        return {
          curData: nextProps.data
        };
      }
      return null;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty(RadialBar, "displayName", "RadialBar");
_defineProperty(RadialBar, "defaultProps", {
  angleAxisId: 0,
  radiusAxisId: 0,
  minPointSize: 0,
  hide: false,
  legendType: "rect",
  data: [],
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  forceCornerRadius: false,
  cornerIsExternal: false
});
_defineProperty(RadialBar, "getComposedData", function(_ref2) {
  var item = _ref2.item, props = _ref2.props, radiusAxis = _ref2.radiusAxis, radiusAxisTicks = _ref2.radiusAxisTicks, angleAxis = _ref2.angleAxis, angleAxisTicks = _ref2.angleAxisTicks, displayedData = _ref2.displayedData, dataKey = _ref2.dataKey, stackedData = _ref2.stackedData, barPosition = _ref2.barPosition, bandSize = _ref2.bandSize, dataStartIndex = _ref2.dataStartIndex;
  var pos = findPositionOfBar(barPosition, item);
  if (!pos) {
    return null;
  }
  var cx = angleAxis.cx, cy = angleAxis.cy;
  var layout = props.layout;
  var _item$props = item.props, children = _item$props.children, minPointSize = _item$props.minPointSize;
  var numericAxis = layout === "radial" ? angleAxis : radiusAxis;
  var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
  var baseValue = getBaseValueOfBar({
    numericAxis
  });
  var cells = findAllByType(children, Cell);
  var sectors = displayedData.map(function(entry, index) {
    var value, innerRadius, outerRadius, startAngle, endAngle, backgroundSector;
    if (stackedData) {
      value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain);
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      }
    }
    if (layout === "radial") {
      innerRadius = getCateCoordinateOfBar({
        axis: radiusAxis,
        ticks: radiusAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      endAngle = angleAxis.scale(value[1]);
      startAngle = angleAxis.scale(value[0]);
      outerRadius = innerRadius + pos.size;
      var deltaAngle = endAngle - startAngle;
      if (Math.abs(minPointSize) > 0 && Math.abs(deltaAngle) < Math.abs(minPointSize)) {
        var delta = mathSign(deltaAngle || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaAngle));
        endAngle += delta;
      }
      backgroundSector = {
        background: {
          cx,
          cy,
          innerRadius,
          outerRadius,
          startAngle: props.startAngle,
          endAngle: props.endAngle
        }
      };
    } else {
      innerRadius = radiusAxis.scale(value[0]);
      outerRadius = radiusAxis.scale(value[1]);
      startAngle = getCateCoordinateOfBar({
        axis: angleAxis,
        ticks: angleAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      endAngle = startAngle + pos.size;
      var deltaRadius = outerRadius - innerRadius;
      if (Math.abs(minPointSize) > 0 && Math.abs(deltaRadius) < Math.abs(minPointSize)) {
        var _delta = mathSign(deltaRadius || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaRadius));
        outerRadius += _delta;
      }
    }
    return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, entry), backgroundSector), {}, {
      payload: entry,
      value: stackedData ? value : value[1],
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    }, cells && cells[index] && cells[index].props), {}, {
      tooltipPayload: [getTooltipItem(item, entry)],
      tooltipPosition: polarToCartesian(cx, cy, (innerRadius + outerRadius) / 2, (startAngle + endAngle) / 2)
    });
  });
  return {
    data: sectors,
    layout
  };
});
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
var PieChart = generateCategoricalChart({
  chartName: "PieChart",
  GraphicalChild: Pie,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: PolarAngleAxis
  }, {
    axisType: "radiusAxis",
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap: formatAxisMap$1,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
var RadialBarChart = generateCategoricalChart({
  chartName: "RadialBarChart",
  GraphicalChild: RadialBar,
  legendContent: "children",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: PolarAngleAxis
  }, {
    axisType: "radiusAxis",
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap: formatAxisMap$1,
  defaultProps: {
    layout: "radial",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
const RISK_CONFIG = {
  [Variant_Low_High_Medium_Critical.Low]: {
    label: "Safe",
    color: "var(--color-chart-3)",
    pulse: false
  },
  [Variant_Low_High_Medium_Critical.Medium]: {
    label: "Warning",
    color: "var(--color-chart-5)",
    pulse: false
  },
  [Variant_Low_High_Medium_Critical.High]: {
    label: "High Risk",
    color: "oklch(0.65 0.15 30)",
    pulse: false
  },
  [Variant_Low_High_Medium_Critical.Critical]: {
    label: "Critical",
    color: "hsl(var(--destructive))",
    pulse: true
  }
};
const CATEGORY_TOOLTIPS = {
  visa: "Visa validity — tracks expired/expiring visas (weight: 30%)",
  payroll: "Payroll/WPS compliance — on-time salary runs and file submission (weight: 30%)",
  documents: "Document completeness — passports, contracts, labour cards (weight: 20%)",
  attendance: "Attendance tracking — monthly check-in/out records (weight: 10%)",
  employee: "Employee data — all required profile fields filled (weight: 10%)"
};
function useCountUp$1(target, duration = 900) {
  const [display, setDisplay] = reactExports.useState(0);
  const prev = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const start = prev.current;
    const delta = target - start;
    const startTime = performance.now();
    let raf;
    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(start + delta * eased));
      if (t < 1) raf = requestAnimationFrame(step);
      else prev.current = target;
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return display;
}
function InfoTooltip({ text }) {
  const [show, setShow] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "relative inline-flex items-center",
      onMouseEnter: () => setShow(true),
      onMouseLeave: () => setShow(false),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3 h-3 text-muted-foreground cursor-help flex-shrink-0" }),
        show && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 w-56 rounded-lg bg-foreground text-background text-[11px] px-2.5 py-1.5 shadow-lg leading-snug pointer-events-none", children: text })
      ]
    }
  );
}
function CategoryBar({ cat }) {
  const colorBar = cat.score >= 80 ? "bg-chart-3" : cat.score >= 50 ? "bg-chart-5" : "bg-destructive";
  const colorText = cat.score >= 80 ? "text-chart-3" : cat.score >= 50 ? "text-chart-5" : "text-destructive";
  const statusLabel = cat.score >= 80 ? "Safe" : cat.score >= 50 ? "Warning" : "Critical";
  const badgeCls = cat.score >= 80 ? "border-chart-3/40 bg-chart-3/10 text-chart-3" : cat.score >= 50 ? "border-chart-5/40 bg-chart-5/10 text-chart-5" : "border-destructive/40 bg-destructive/10 text-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground font-medium truncate", children: cat.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTooltip, { text: cat.tooltip })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "text-[10px] font-semibold px-1.5 py-0.5 rounded-full border",
              badgeCls
            ),
            children: statusLabel
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: cn(
              "text-xs font-bold tabular-nums w-8 text-right",
              colorText
            ),
            children: [
              cat.score,
              "%"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "h-full rounded-full transition-all duration-700",
          colorBar
        ),
        style: { width: `${cat.score}%` }
      }
    ) })
  ] });
}
function getRoute(factorType) {
  switch (factorType) {
    case Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.VisaExpiry:
      return "/visa-alerts?filter=expired";
    case Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.PayrollDelay:
      return "/payroll";
    case Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.MissingDocument:
      return "/employees?filter=missing-passport";
    case Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.WpsError:
      return "/employees?filter=missing-iban";
    default:
      return "/visa-alerts";
  }
}
function ComplianceRiskWidget() {
  const { data: risk, isLoading } = useGetComplianceRiskScore();
  const navigate = useNavigate();
  const score = risk ? Number(risk.score) : 42;
  const riskLevel = (risk == null ? void 0 : risk.riskLevel) ?? Variant_Low_High_Medium_Critical.High;
  const config = RISK_CONFIG[riskLevel];
  const penaltyExposure = (risk == null ? void 0 : risk.penaltyExposure) ?? 42500n;
  const currency = (risk == null ? void 0 : risk.currency) ?? "AED";
  const riskFactors = (risk == null ? void 0 : risk.riskFactors) ?? [];
  const animatedScore = useCountUp$1(score);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { className: "h-full" });
  const chartData = [{ name: "score", value: score, fill: config.color }];
  const visaFactors = riskFactors.filter(
    (f) => f.factorType === Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.VisaExpiry
  );
  const payrollFactors = riskFactors.filter(
    (f) => f.factorType === Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.PayrollDelay || f.factorType === Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.WpsError
  );
  const docFactors = riskFactors.filter(
    (f) => f.factorType === Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.MissingDocument
  );
  const visaImpact = visaFactors.reduce(
    (s, f) => s + Number(f.employeeCount) * 3,
    0
  );
  const payrollImpact = payrollFactors.reduce(
    (s, f) => s + (f.severity === "Critical" ? 20 : f.severity === "High" ? 12 : 6),
    0
  );
  const docImpact = docFactors.reduce(
    (s, f) => s + Number(f.employeeCount) * 2,
    0
  );
  const categories = [
    {
      key: "visa",
      label: "Visa Validity",
      score: Math.max(0, Math.min(100, 100 - visaImpact)),
      tooltip: CATEGORY_TOOLTIPS.visa
    },
    {
      key: "payroll",
      label: "Payroll / WPS",
      score: Math.max(0, Math.min(100, 100 - payrollImpact)),
      tooltip: CATEGORY_TOOLTIPS.payroll
    },
    {
      key: "documents",
      label: "Document Completeness",
      score: Math.max(0, Math.min(100, 100 - docImpact)),
      tooltip: CATEGORY_TOOLTIPS.documents
    },
    {
      key: "attendance",
      label: "Attendance Tracking",
      score: score >= 60 ? 85 : 60,
      tooltip: CATEGORY_TOOLTIPS.attendance
    },
    {
      key: "employee",
      label: "Employee Data",
      score: score >= 50 ? 80 : 55,
      tooltip: CATEGORY_TOOLTIPS.employee
    }
  ];
  const fixActions = riskFactors.filter((f) => f.severity === "Critical" || f.severity === "High").slice(0, 3).map((f) => ({
    issue: f.description,
    affectedCount: Number(f.employeeCount),
    estimatedFine: f.estimatedFine,
    route: getRoute(f.factorType),
    severity: f.severity
  }));
  const isCritical = riskLevel === Variant_Low_High_Medium_Critical.Critical;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm",
      "data-ocid": "dashboard.compliance_risk.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Compliance Risk Score" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "px-2.5 py-1 text-xs font-semibold rounded-full border",
                isCritical && "animate-pulse",
                riskLevel === Variant_Low_High_Medium_Critical.Low ? "border-chart-3/40 bg-chart-3/10 text-chart-3" : riskLevel === Variant_Low_High_Medium_Critical.Medium ? "border-chart-5/40 bg-chart-5/10 text-chart-5" : riskLevel === Variant_Low_High_Medium_Critical.High ? "border-orange-400/40 bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400" : "border-destructive/40 bg-destructive/10 text-destructive"
              ),
              "data-ocid": "dashboard.compliance_risk.level_badge",
              children: [
                isCritical && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: "⚠" }),
                config.label
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0 w-24 h-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              RadialBarChart,
              {
                cx: "50%",
                cy: "50%",
                innerRadius: "65%",
                outerRadius: "100%",
                barSize: 10,
                startAngle: 90,
                endAngle: -270,
                data: chartData,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RadialBar,
                  {
                    dataKey: "value",
                    cornerRadius: 6,
                    background: { fill: "hsl(var(--muted))" }
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold font-display text-foreground leading-none tabular-nums", children: animatedScore }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "/ 100" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Monthly risk exposure" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold tabular-nums text-destructive", children: [
              currency,
              " ",
              Number(penaltyExposure).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              riskFactors.length,
              " active risk",
              " ",
              riskFactors.length === 1 ? "factor" : "factors"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBar, { cat }, cat.key)) }),
        fixActions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold text-foreground uppercase tracking-wide", children: "⚡ Top Issues — Fix Now" }),
          fixActions.map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate(action.route),
              className: "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 transition-colors text-left group",
              "data-ocid": `dashboard.compliance_risk.fix_action.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TriangleAlert,
                    {
                      className: cn(
                        "w-3.5 h-3.5 flex-shrink-0",
                        action.severity === "Critical" ? "text-destructive" : "text-chart-5"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground font-medium truncate", children: action.issue }),
                    action.affectedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                      action.affectedCount,
                      " ",
                      action.affectedCount === 1 ? "employee" : "employees",
                      " ",
                      "affected"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-destructive tabular-nums", children: [
                    currency,
                    " ",
                    Number(action.estimatedFine).toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" })
                ] })
              ]
            },
            i.toString()
          ))
        ] }),
        Number(penaltyExposure) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-medium", children: "Estimated monthly exposure" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-destructive tabular-nums", children: [
            currency,
            " ",
            Number(penaltyExposure).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "destructive",
            size: "sm",
            className: "w-full gap-1.5 font-semibold",
            onClick: () => navigate("/visa-alerts"),
            "data-ocid": "dashboard.compliance_risk.fix_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
              "Reduce Risk to Zero",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-auto" })
            ]
          }
        )
      ]
    }
  );
}
function HRAssistantWidget() {
  const alertsQuery = useListUnreadAlerts();
  const payrollQuery = useListPayrollRuns();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = reactExports.useState(/* @__PURE__ */ new Set());
  const suggestions = reactExports.useMemo(() => {
    const list = [];
    const draftPayrolls = (payrollQuery.data ?? []).filter(
      (r) => r.status === PayrollStatus.Draft
    );
    if (draftPayrolls.length > 0) {
      list.push({
        id: "payroll-pending",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
        title: "Run Payroll Now",
        description: `${draftPayrolls.length} payroll run${draftPayrolls.length > 1 ? "s" : ""} pending approval — employees are waiting.`,
        actionLabel: "Run Payroll",
        route: "/payroll",
        urgency: "critical"
      });
    }
    const visaAlerts = (alertsQuery.data ?? []).filter(
      (a) => a.alertType === AlertType.VisaExpiring && a.severity === AlertSeverity.High
    );
    if (visaAlerts.length > 0) {
      list.push({
        id: "visa-expiry",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-4 h-4" }),
        title: `${visaAlerts.length} Visa${visaAlerts.length > 1 ? "s" : ""} Expiring This Week`,
        description: "Expired visas can result in government fines. Renew immediately.",
        actionLabel: "View Visas",
        route: "/visa-alerts",
        urgency: "critical"
      });
    }
    const docAlerts = (alertsQuery.data ?? []).filter(
      (a) => a.alertType === AlertType.DocumentExpiring
    );
    if (docAlerts.length > 0) {
      list.push({
        id: "doc-expiry",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
        title: `${docAlerts.length} Documents Expiring Soon`,
        description: "Passports or labor cards need renewal before they lapse.",
        actionLabel: "Fix Documents",
        route: "/documents",
        urgency: "high"
      });
    }
    list.push({
      id: "salary-reminders",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
      title: "Send Salary Reminders",
      description: "Notify employees their salary has been processed via WhatsApp.",
      actionLabel: "Send Now",
      route: "/settings",
      urgency: "medium"
    });
    return list;
  }, [alertsQuery.data, payrollQuery.data]);
  const visible = suggestions.filter((s) => !dismissed.has(s.id));
  const urgencyStyles = {
    critical: "border-destructive/30 bg-destructive/5",
    high: "border-chart-5/30 bg-chart-5/5",
    medium: "border-accent/20 bg-accent/5"
  };
  const urgencyIconStyles = {
    critical: "bg-destructive/15 text-destructive",
    high: "bg-chart-5/15 text-chart-5",
    medium: "bg-accent/15 text-accent"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 space-y-3 shadow-sm",
      "data-ocid": "dashboard.hr_assistant.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3 h-3 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "HR Assistant Suggestions" }),
          visible.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold bg-accent/20 text-accent rounded-full px-1.5 py-0.5 ml-auto", children: [
            visible.length,
            " action",
            visible.length > 1 ? "s" : ""
          ] })
        ] }),
        visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-4 text-muted-foreground",
            "data-ocid": "dashboard.hr_assistant.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "✅ All caught up! No urgent actions needed." })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: visible.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `suggestion-card relative border ${urgencyStyles[s.urgency]} p-3 rounded-lg`,
            "data-ocid": `dashboard.hr_assistant.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute top-2.5 right-2.5 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors",
                  onClick: () => setDismissed((prev) => /* @__PURE__ */ new Set([...prev, s.id])),
                  "aria-label": "Dismiss suggestion",
                  "data-ocid": `dashboard.hr_assistant.dismiss.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 pr-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${urgencyIconStyles[s.urgency]}`,
                    children: s.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground leading-snug", children: s.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 leading-relaxed", children: s.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "mt-2 h-6 text-[11px] px-2.5 gap-1",
                      onClick: () => navigate(s.route),
                      "data-ocid": `dashboard.hr_assistant.action.${i + 1}`,
                      children: s.actionLabel
                    }
                  )
                ] })
              ] })
            ]
          },
          s.id
        )) })
      ]
    }
  );
}
const CATEGORY_CONFIG = {
  VisaExpiry: {
    label: "Visa Penalties",
    route: "/visa-alerts?filter=expired",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
    description: "Expired visas × AED 3,000 fine"
  },
  PayrollDelay: {
    label: "Payroll / WPS Delay Risk",
    route: "/payroll",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" }),
    description: "Employees × AED 500 WPS delay fee"
  },
  MissingDocument: {
    label: "Missing Documents Risk",
    route: "/employees?filter=missing-docs",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileWarning, { className: "w-4 h-4" }),
    description: "Missing files × AED 200 per gap"
  }
};
const LEGACY_CATEGORY_MAP = {
  "Expired Visa Fines": "VisaExpiry",
  "WPS Delay Penalties": "PayrollDelay",
  "Missing Documents": "MissingDocument",
  "Labour Law Violations": "MissingDocument"
};
const CURRENCIES = ["AED", "SAR", "OMR", "QAR"];
const RATE = {
  AED: 1,
  SAR: 1.02,
  OMR: 0.1,
  QAR: 1.03
};
function useCountUp(target, duration = 900) {
  const [value, setValue] = reactExports.useState(target);
  const prevRef = reactExports.useRef(target);
  reactExports.useEffect(() => {
    const start = prevRef.current;
    const diff = target - start;
    if (diff === 0) return;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(start + diff * eased));
      if (step >= steps) {
        clearInterval(timer);
        prevRef.current = target;
      }
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}
function CategoryRow({
  label,
  route,
  icon,
  description,
  amount,
  count,
  currency,
  pct,
  index
}) {
  const navigate = useNavigate();
  const animatedAmount = useCountUp(amount);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border border-border bg-card p-3 space-y-2",
      "data-ocid": `dashboard.penalty_exposure.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-7 h-7 rounded-md bg-destructive/10 text-destructive flex items-center justify-center mt-0.5", children: icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground leading-tight", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                description,
                " · ",
                count,
                " affected"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-sm font-bold tabular-nums text-destructive",
                "data-ocid": `dashboard.penalty_exposure.amount.${index}`,
                children: [
                  currency,
                  " ",
                  animatedAmount.toLocaleString()
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "h-6 px-2 text-[10px] font-semibold border-destructive/40 text-destructive hover:bg-destructive/10 gap-1",
                onClick: () => navigate(route),
                "data-ocid": `dashboard.penalty_exposure.fix_button.${index}`,
                children: [
                  "Fix Now",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-2.5 h-2.5" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full transition-all duration-700 ease-out",
            style: {
              width: `${pct}%`,
              background: pct > 60 ? "hsl(var(--destructive) / 0.85)" : pct > 30 ? "hsl(var(--chart-5) / 0.85)" : "hsl(var(--chart-4) / 0.85)"
            }
          }
        ) })
      ]
    }
  );
}
function PenaltyExposureCard({
  cardRef
}) {
  var _a, _b;
  const { data: exposure, isLoading } = useGetPenaltyExposure();
  const navigate = useNavigate();
  const [currency, setCurrency] = reactExports.useState("AED");
  const baseCurrency = (exposure == null ? void 0 : exposure.currency) ?? "AED";
  const baseTotal = exposure ? Number(exposure.total) : 71e3;
  const convRate = (RATE[currency] ?? 1) / (RATE[baseCurrency] ?? 1);
  const total = Math.round(baseTotal * convRate);
  const animatedTotal = useCountUp(total);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { className: "h-full" });
  const rawBreakdown = (exposure == null ? void 0 : exposure.breakdown) ?? [
    { category: "VisaExpiry", amount: BigInt(6e4), count: BigInt(20) },
    { category: "PayrollDelay", amount: BigInt(1e4), count: BigInt(20) },
    { category: "MissingDocument", amount: BigInt(1e3), count: BigInt(5) }
  ];
  const hasExposure = total > 0;
  const merged = {};
  for (const item of rawBreakdown) {
    const key = CATEGORY_CONFIG[item.category] ? item.category : LEGACY_CATEGORY_MAP[item.category] ?? item.category;
    if (CATEGORY_CONFIG[key]) {
      merged[key] = {
        amount: (((_a = merged[key]) == null ? void 0 : _a.amount) ?? 0) + Math.round(Number(item.amount) * convRate),
        count: (((_b = merged[key]) == null ? void 0 : _b.count) ?? 0) + Number(item.count)
      };
    }
  }
  const CANONICAL_ORDER = ["VisaExpiry", "PayrollDelay", "MissingDocument"];
  const finalRows = CANONICAL_ORDER.map((key) => {
    var _a2, _b2;
    return {
      key,
      config: CATEGORY_CONFIG[key],
      amount: ((_a2 = merged[key]) == null ? void 0 : _a2.amount) ?? 0,
      count: ((_b2 = merged[key]) == null ? void 0 : _b2.count) ?? 0
    };
  }).filter((r) => r.config);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: cardRef,
      className: "penalty-card flex flex-col gap-4",
      "data-ocid": "dashboard.penalty_exposure.card",
      id: "penalty-exposure-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4 text-destructive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Penalty Exposure" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Potential fines this month" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "h-7 px-2 text-xs rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
              value: currency,
              onChange: (e) => setCurrency(e.target.value),
              "aria-label": "Currency",
              "data-ocid": "dashboard.penalty_exposure.currency_select",
              children: CURRENCIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
            }
          )
        ] }),
        hasExposure ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl bg-destructive/8 border border-destructive/20 p-4 text-center",
            "data-ocid": "dashboard.penalty_exposure.total_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest font-semibold text-destructive/70 mb-1", children: "Total Monthly Loss Risk" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "penalty-amount text-3xl",
                  "data-ocid": "dashboard.penalty_exposure.total_amount",
                  children: [
                    currency,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: animatedTotal.toLocaleString() })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-destructive/60 mt-1", children: "Estimated fines if issues remain unresolved" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border p-4 text-center",
            style: {
              background: "hsl(var(--chart-3) / 0.06)",
              borderColor: "hsl(var(--chart-3) / 0.25)"
            },
            "data-ocid": "dashboard.penalty_exposure.safe_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheckBig,
                {
                  className: "w-8 h-8 mx-auto mb-2",
                  style: { color: "hsl(var(--chart-3))" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Zero Penalty Exposure" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "All compliance areas are in good standing" })
            ]
          }
        ),
        hasExposure && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: finalRows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategoryRow,
          {
            index: i + 1,
            label: r.config.label,
            route: r.config.route,
            icon: r.config.icon,
            description: r.config.description,
            amount: r.amount,
            count: r.count,
            currency,
            pct: total > 0 ? Math.round(r.amount / total * 100) : 0
          },
          r.key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "w-full border-destructive/40 text-destructive hover:bg-destructive/10 gap-1.5",
            onClick: () => navigate("/reports"),
            "data-ocid": "dashboard.penalty_exposure.view_report_button",
            children: [
              "View Full Compliance Report",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
            ]
          }
        )
      ]
    }
  );
}
const ACTION_LABELS = {
  [AuditActionType.PayrollApproved]: "Payroll approved",
  [AuditActionType.EmployeeAdded]: "Employee added",
  [AuditActionType.DocumentUploaded]: "Document uploaded",
  [AuditActionType.DocumentDownloaded]: "Document downloaded",
  [AuditActionType.SalaryChanged]: "Salary updated",
  [AuditActionType.WPSExported]: "WPS file exported",
  [AuditActionType.UserLogin]: "User logged in",
  [AuditActionType.RoleChanged]: "Role changed",
  [AuditActionType.CompanyProfileUpdated]: "Company profile updated",
  [AuditActionType.EmployeeDeleted]: "Employee removed"
};
function timeAgo$1(ts) {
  const ms = Number(ts / 1000000n);
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
const SECURITY_BADGES = [
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }), label: "Bank-Grade Encryption" },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3.5 h-3.5" }),
    label: "Data Encrypted at Rest"
  },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }), label: "Role-Based Access" },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }), label: "Full Audit Trail" }
];
function TrustLayerWidget() {
  const { data: logs, isLoading } = useListAuditLogs();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { className: "h-full" });
  const recentLogs = (logs ?? []).slice(0, 5);
  const displayLogs = recentLogs.length > 0 ? recentLogs : [
    {
      id: 1n,
      actionType: AuditActionType.PayrollApproved,
      affectedResourceName: "May 2026 Payroll",
      createdAt: BigInt(Date.now() - 2 * 60 * 60 * 1e3) * 1000000n,
      userId: 1n
    },
    {
      id: 2n,
      actionType: AuditActionType.EmployeeAdded,
      affectedResourceName: "Mohammed Al-Farsi",
      createdAt: BigInt(Date.now() - 5 * 60 * 60 * 1e3) * 1000000n,
      userId: 2n
    },
    {
      id: 3n,
      actionType: AuditActionType.DocumentUploaded,
      affectedResourceName: "Passport Copy",
      createdAt: BigInt(Date.now() - 24 * 60 * 60 * 1e3) * 1000000n,
      userId: 1n
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "trust-section", "data-ocid": "dashboard.trust_layer.card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-4 h-4 text-chart-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Trust & Security" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SECURITY_BADGES.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "trust-badge text-xs",
        "data-ocid": "dashboard.trust_layer.security_badge",
        children: [
          badge.icon,
          badge.label
        ]
      },
      badge.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Recent Activity" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: displayLogs.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "activity-log-item",
          "data-ocid": `dashboard.trust_layer.activity.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-chart-3/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3 text-chart-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: ACTION_LABELS[log.actionType] ?? log.actionType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: "affectedResourceName" in log ? log.affectedResourceName : "System" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground tabular-nums shrink-0", children: timeAgo$1(log.createdAt) })
          ]
        },
        log.id.toString()
      )) })
    ] })
  ] });
}
function ChartContainer({
  title,
  subtitle,
  action,
  children,
  height = 280,
  className,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("bg-card border border-border rounded-xl p-5", className),
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: title }),
            subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle })
          ] }),
          action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: action })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height }, children })
      ]
    }
  );
}
const accentClasses = {
  primary: "border-l-4 border-l-primary",
  accent: "border-l-4 border-l-chart-2",
  destructive: "border-l-4 border-l-destructive",
  success: "border-l-4 border-l-chart-3",
  warning: "border-l-4 border-l-chart-5"
};
function KPICard({
  label,
  value,
  change,
  changeType = "neutral",
  icon,
  accent = "primary",
  className,
  "data-ocid": ocid
}) {
  const ChangeIcon = changeType === "positive" ? TrendingUp : changeType === "negative" ? TrendingDown : Minus;
  const changeColor = changeType === "positive" ? "text-chart-3" : changeType === "negative" ? "text-destructive" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("kpi-card", accentClasses[accent], className),
      "data-ocid": ocid,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display font-bold text-foreground leading-none", children: value }),
          change && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: cn(
                "flex items-center gap-1 text-xs mt-2",
                changeColor
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChangeIcon, { className: "w-3 h-3" }),
                change
              ]
            }
          )
        ] }),
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0", children: icon })
      ] })
    }
  );
}
const NATIONALITY_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-1)"
];
const PAYROLL_TREND_DATA = [
  { month: "Jan", amount: 285e3 },
  { month: "Feb", amount: 294500 },
  { month: "Mar", amount: 278e3 },
  { month: "Apr", amount: 312e3 },
  { month: "May", amount: 326500 },
  { month: "Jun", amount: 341200 }
];
const VISA_STATUS_COLORS = {
  Valid: "var(--color-chart-3)",
  ExpiringSoon: "var(--color-chart-5)",
  Expired: "var(--color-destructive)"
};
const SEVERITY_ORDER = {
  [AlertSeverity.High]: 0,
  [AlertSeverity.Medium]: 1,
  [AlertSeverity.Low]: 2
};
function severityClass(severity) {
  if (severity === AlertSeverity.High) return "expired";
  if (severity === AlertSeverity.Medium) return "expiring";
  return "info";
}
function AlertIcon({ severity }) {
  if (severity === AlertSeverity.High)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 mt-0.5 shrink-0 text-destructive" });
  if (severity === AlertSeverity.Medium)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 mt-0.5 shrink-0 text-chart-5" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 mt-0.5 shrink-0 text-chart-1" });
}
function timeAgo(ts) {
  const ms = Number(ts / 1000000n);
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 6e4);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
function trialDaysRemaining(trialEndDate) {
  if (!trialEndDate) return null;
  const end = timestampToDate(trialEndDate);
  const days = Math.ceil((end.getTime() - Date.now()) / 864e5);
  return days > 0 ? days : 0;
}
function buildNationalityData(employees) {
  const counts = {};
  for (const e of employees) {
    counts[e.nationality] = (counts[e.nationality] ?? 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top5 = sorted.slice(0, 5);
  const othersCount = sorted.slice(5).reduce((s, [, v]) => s + v, 0);
  const result = top5.map(([name, value], i) => ({
    name,
    value,
    color: NATIONALITY_COLORS[i] ?? NATIONALITY_COLORS[0]
  }));
  if (othersCount > 0) {
    result.push({
      name: "Others",
      value: othersCount,
      color: NATIONALITY_COLORS[5]
    });
  }
  return result;
}
function buildVisaStatusData(validCount, expiringCount, expiredCount) {
  return [
    { name: "Valid", value: validCount, color: VISA_STATUS_COLORS.Valid },
    {
      name: "Expiring Soon",
      value: expiringCount,
      color: VISA_STATUS_COLORS.ExpiringSoon
    },
    {
      name: "Expired",
      value: expiredCount,
      color: VISA_STATUS_COLORS.Expired
    }
  ].filter((d) => d.value > 0);
}
const DEMO_SNAPSHOT_ROWS = [
  {
    name: "Ahmed Al-Rashidi",
    nationality: "UAE",
    visaExpiry: "12/07/2026",
    department: "Operations",
    status: "expiring"
  },
  {
    name: "Sara Mohammed",
    nationality: "Egypt",
    visaExpiry: "19/02/2027",
    department: "HR",
    status: "valid"
  },
  {
    name: "Raj Kumar",
    nationality: "India",
    visaExpiry: "21/01/2026",
    department: "Finance",
    status: "expired"
  },
  {
    name: "Maria Santos",
    nationality: "Philippines",
    visaExpiry: "08/11/2026",
    department: "Admin",
    status: "valid"
  },
  {
    name: "Fatima Al-Zaabi",
    nationality: "UAE",
    visaExpiry: "03/06/2026",
    department: "Operations",
    status: "expiring"
  }
];
function TrialBadge({ days }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-xs font-semibold text-accent",
      "data-ocid": "dashboard.trial_badge",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" }),
        "Trial ends in ",
        days,
        " day",
        days !== 1 ? "s" : ""
      ]
    }
  );
}
const TOOLTIP_STYLE = {
  background: "hsl(var(--card) / 1)",
  border: "1px solid hsl(var(--border) / 1)",
  borderRadius: 8,
  fontSize: 12,
  color: "hsl(var(--foreground) / 1)"
};
function DashboardContent() {
  var _a;
  const statsQuery = useGetCompanyStats();
  const companyQuery = useGetMyCompany();
  const subscriptionQuery = useGetSubscription();
  const alertsQuery = useListUnreadAlerts();
  const employeesQuery = useListEmployees();
  const payrollQuery = useListPayrollRuns();
  useListAllVisaRecords();
  const now = /* @__PURE__ */ new Date();
  const { mutate: markAllRead, isPending: markingAllRead } = useMarkAllAlertsRead();
  const attendanceQuery = useListAttendanceByMonth(
    BigInt(now.getMonth() + 1),
    BigInt(now.getFullYear())
  );
  const stats = statsQuery.data;
  const company = companyQuery.data;
  const subscription = subscriptionQuery.data;
  const trialDays = reactExports.useMemo(
    () => trialDaysRemaining(company == null ? void 0 : company.trialEndDate),
    [company == null ? void 0 : company.trialEndDate]
  );
  const sortedAlerts = reactExports.useMemo(() => {
    const list = alertsQuery.data ?? [];
    return [...list].sort(
      (a, b) => (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9)
    );
  }, [alertsQuery.data]);
  const nationalityData = reactExports.useMemo(
    () => buildNationalityData(employeesQuery.data ?? []),
    [employeesQuery.data]
  );
  const visaStatusData = reactExports.useMemo(() => {
    var _a2;
    const expiredCount = Number((stats == null ? void 0 : stats.expiredVisaCount) ?? 2n);
    const expiringCount = Number((stats == null ? void 0 : stats.expiringDocumentCount) ?? 4n);
    const totalVisas = ((_a2 = employeesQuery.data) == null ? void 0 : _a2.length) ?? 20;
    const validCount = Math.max(0, totalVisas - expiredCount - expiringCount);
    return buildVisaStatusData(validCount, expiringCount, expiredCount);
  }, [stats, employeesQuery.data]);
  const visaDonutTotal = visaStatusData.reduce((s, d) => s + d.value, 0);
  const payrollTrendData = reactExports.useMemo(() => {
    const runs = payrollQuery.data ?? [];
    if (runs.length < 3) return PAYROLL_TREND_DATA;
    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return runs.slice(-6).map((r) => ({
      month: MONTHS[Number(r.payPeriodMonth) - 1] ?? "?",
      amount: Number(r.totalNetSalary) / 100
    }));
  }, [payrollQuery.data]);
  const attendancePct = reactExports.useMemo(() => {
    var _a2;
    const logs = attendanceQuery.data ?? [];
    const totalEmp = ((_a2 = employeesQuery.data) == null ? void 0 : _a2.length) ?? 20;
    if (totalEmp === 0) return 85;
    const uniqueEmpIds = new Set(logs.map((l) => l.employeeId.toString()));
    const pct = Math.round(uniqueEmpIds.size / totalEmp * 100);
    return Math.min(100, pct || 85);
  }, [attendanceQuery.data, employeesQuery.data]);
  const pendingPayroll = reactExports.useMemo(() => {
    if ((stats == null ? void 0 : stats.pendingPayrollCount) !== void 0)
      return Number(stats.pendingPayrollCount);
    return (payrollQuery.data ?? []).filter(
      (r) => r.status === PayrollStatus.Draft
    ).length;
  }, [stats, payrollQuery.data]);
  const navigate = useNavigate();
  const { data: exposure } = useGetPenaltyExposure();
  const penaltyTotal = exposure ? Number(exposure.total) : 71e3;
  const penaltyCurrency = (exposure == null ? void 0 : exposure.currency) ?? "AED";
  const atRiskCount = (exposure == null ? void 0 : exposure.breakdown) ? exposure.breakdown.filter((b) => Number(b.amount) > 0).length : 3;
  const [bannerDismissed, setBannerDismissed] = reactExports.useState(
    () => sessionStorage.getItem("penalty_banner_dismissed") === "1"
  );
  const dismissBanner = reactExports.useCallback(() => {
    sessionStorage.setItem("penalty_banner_dismissed", "1");
    setBannerDismissed(true);
  }, []);
  const penaltyCardRef = reactExports.useRef(null);
  const scrollToPenaltyCard = reactExports.useCallback(() => {
    var _a2;
    (_a2 = penaltyCardRef.current) == null ? void 0 : _a2.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, []);
  const isLoading = statsQuery.isLoading && employeesQuery.isLoading;
  const totalEmployees = stats ? Number(stats.totalEmployees) : ((_a = employeesQuery.data) == null ? void 0 : _a.length) ?? 20;
  const expiredVisas = stats ? Number(stats.expiredVisaCount) : 2;
  const expiringDocs = stats ? Number(stats.expiringDocumentCount) : 4;
  const complianceScore = stats ? Number(stats.complianceScore) : 92;
  const showFab = complianceScore < 80 || penaltyTotal > 0;
  const openIssueCount = atRiskCount + (complianceScore < 80 ? 1 : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "dashboard.section", children: [
    penaltyTotal > 0 && !bannerDismissed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-white shadow-lg",
        style: { background: "hsl(var(--destructive))" },
        role: "alert",
        "aria-live": "assertive",
        "data-ocid": "dashboard.penalty_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 shrink-0 opacity-90" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold leading-tight", children: [
              "⚠️ ",
              penaltyCurrency,
              " ",
              penaltyTotal.toLocaleString(),
              " at risk —",
              " ",
              atRiskCount,
              " compliance area",
              atRiskCount !== 1 ? "s" : "",
              " need attention"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-80 mt-0.5", children: "Resolve open issues now to avoid regulatory fines this month." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold border-2 border-white/70 hover:bg-white/20 transition-colors whitespace-nowrap",
              onClick: scrollToPenaltyCard,
              "data-ocid": "dashboard.penalty_banner.reduce_risk_button",
              children: "Reduce Risk to 0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors",
              onClick: dismissBanner,
              "aria-label": "Dismiss alert",
              "data-ocid": "dashboard.penalty_banner.dismiss_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Compliance Dashboard" }),
        company && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          company.name,
          " · ",
          company.country
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        trialDays !== null && (subscription == null ? void 0 : subscription.isTrialActive) && /* @__PURE__ */ jsxRuntimeExports.jsx(TrialBadge, { days: trialDays }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "default",
            className: "gap-1.5",
            onClick: () => navigate("/payroll"),
            "data-ocid": "dashboard.header.run_payroll_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
              "Run Payroll"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5",
            onClick: () => navigate("/wps"),
            "data-ocid": "dashboard.header.wps_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Download WPS File"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4",
        "data-ocid": "dashboard.kpi.section",
        children: isLoading ? Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: stable skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonKPI, {}, i)
        )) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Total Employees",
              value: totalEmployees,
              change: "+2 this month",
              changeType: "positive",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
              accent: "primary",
              "data-ocid": "dashboard.kpi.employees"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Expired Visas",
              value: expiredVisas,
              change: expiredVisas > 0 ? "Action Required" : "All Clear",
              changeType: expiredVisas > 0 ? "negative" : "positive",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
              accent: expiredVisas > 0 ? "destructive" : "success",
              "data-ocid": "dashboard.kpi.expired_visas"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Docs Expiring Soon",
              value: expiringDocs,
              change: "Next 60 days",
              changeType: expiringDocs > 0 ? "negative" : "neutral",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
              accent: "warning",
              "data-ocid": "dashboard.kpi.expiring_docs"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Payroll Pending",
              value: pendingPayroll,
              change: pendingPayroll > 0 ? "Run Payroll Now" : "All Approved",
              changeType: pendingPayroll > 0 ? "negative" : "positive",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
              accent: "accent",
              "data-ocid": "dashboard.kpi.payroll"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Attendance (30d)",
              value: `${attendancePct}%`,
              change: attendancePct >= 90 ? "↑ On Target" : "↓ Below Target",
              changeType: attendancePct >= 90 ? "positive" : "negative",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
              accent: attendancePct >= 90 ? "success" : "warning",
              "data-ocid": "dashboard.kpi.attendance"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Compliance Score",
              value: `${complianceScore}%`,
              change: complianceScore >= 80 ? "Good Standing" : "Needs Review",
              changeType: complianceScore >= 80 ? "positive" : "negative",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5" }),
              accent: complianceScore >= 80 ? "success" : "warning",
              "data-ocid": "dashboard.kpi.compliance"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComplianceRiskWidget, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PenaltyExposureCard, { cardRef: penaltyCardRef }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HRAssistantWidget, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChartContainer,
          {
            title: "Nationality Breakdown",
            subtitle: "Employee distribution",
            height: 240,
            "data-ocid": "dashboard.chart.nationality",
            children: nationalityData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-sm text-muted-foreground", children: "No data yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: nationalityData,
                  dataKey: "value",
                  nameKey: "name",
                  cx: "38%",
                  cy: "50%",
                  outerRadius: 68,
                  strokeWidth: 2,
                  stroke: "transparent",
                  children: nationalityData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Legend,
                {
                  layout: "vertical",
                  align: "right",
                  verticalAlign: "middle",
                  iconType: "circle",
                  iconSize: 8,
                  formatter: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, color: "inherit" }, children: v })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TOOLTIP_STYLE })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChartContainer,
          {
            title: "Payroll Net Salary Trend",
            subtitle: "Last 6 months (AED)",
            height: 240,
            "data-ocid": "dashboard.chart.payroll",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              BarChart,
              {
                data: payrollTrendData,
                barSize: 18,
                margin: { top: 4, right: 4, left: 0, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    XAxis,
                    {
                      dataKey: "month",
                      tick: { fontSize: 11 },
                      axisLine: false,
                      tickLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      tick: { fontSize: 11 },
                      axisLine: false,
                      tickLine: false,
                      tickFormatter: (v) => `${(Number(v) / 1e3).toFixed(0)}k`,
                      width: 36
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      formatter: (v) => [
                        `AED ${v.toLocaleString()}`,
                        "Net Salary"
                      ],
                      contentStyle: TOOLTIP_STYLE
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Bar,
                    {
                      dataKey: "amount",
                      fill: "hsl(var(--primary) / 1)",
                      radius: [4, 4, 0, 0]
                    }
                  )
                ]
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChartContainer,
          {
            title: "Visa Status Overview",
            subtitle: `${visaDonutTotal} total records`,
            height: 240,
            "data-ocid": "dashboard.chart.visa",
            children: visaStatusData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-sm text-muted-foreground", children: "No visa records" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Pie,
                {
                  data: visaStatusData,
                  dataKey: "value",
                  nameKey: "name",
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 52,
                  outerRadius: 78,
                  strokeWidth: 2,
                  stroke: "transparent",
                  children: [
                    visaStatusData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name)),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        value: `${visaDonutTotal}`,
                        position: "center",
                        style: {
                          fontSize: 22,
                          fontWeight: 700,
                          fill: "hsl(var(--foreground) / 1)"
                        }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Legend,
                {
                  iconType: "circle",
                  iconSize: 8,
                  formatter: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, color: "inherit" }, children: v })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TOOLTIP_STYLE })
            ] }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CardContainer,
        {
          className: "lg:col-span-1",
          padding: "none",
          "data-ocid": "dashboard.alert_timeline",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 flex items-center justify-between gap-2 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Alert Timeline" }),
                sortedAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold bg-destructive/15 text-destructive rounded-full px-1.5 py-0.5", children: sortedAlerts.length })
              ] }),
              sortedAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => markAllRead(),
                  disabled: markingAllRead,
                  className: "h-7 text-xs text-muted-foreground hover:text-foreground",
                  "data-ocid": "dashboard.alert_timeline.mark_all_read",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 mr-1" }),
                    "Mark all"
                  ]
                }
              )
            ] }),
            alertsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) }) : sortedAlerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center gap-2 py-8 text-center px-4",
                "data-ocid": "dashboard.alert_timeline.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-chart-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "All clear" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No unread alerts" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "alert-timeline p-3 pr-2 space-y-2", children: sortedAlerts.map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `alert-item ${severityClass(alert.severity)}`,
                "data-ocid": `dashboard.alert_timeline.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertIcon, { severity: alert.severity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-xs leading-relaxed", children: alert.message }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px] mt-0.5", children: timeAgo(alert.createdAt) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatusBadge,
                    {
                      status: alert.severity === AlertSeverity.High ? "expired" : alert.severity === AlertSeverity.Medium ? "expiring" : "info",
                      label: alert.severity === AlertSeverity.High ? "High" : alert.severity === AlertSeverity.Medium ? "Med" : "Low",
                      size: "sm"
                    }
                  )
                ] })
              },
              alert.id.toString()
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustLayerWidget, {}),
    showFab && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full pl-4 pr-5 py-3 text-sm font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95",
        style: { background: "hsl(var(--destructive))" },
        onClick: scrollToPenaltyCard,
        "aria-label": `Fix ${openIssueCount} open compliance issues`,
        "data-ocid": "dashboard.sticky_fix_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4" }),
          "Fix Issues",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-extrabold",
              style: { color: "hsl(var(--destructive))" },
              children: openIssueCount
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "dashboard.employee_table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CardHeader,
        {
          title: "Compliance Snapshot",
          subtitle: "Visa expiry and compliance status by employee"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-4 sm:mx-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table min-w-[600px] w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Nationality" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Visa Expiry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Department" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (employeesQuery.data && employeesQuery.data.length > 0 ? employeesQuery.data.slice(0, 8).map((emp) => ({
          name: emp.fullName,
          nationality: emp.nationality,
          visaExpiry: emp.contractEndDate ? formatDate(emp.contractEndDate) : "—",
          department: emp.department,
          status: "active"
        })) : DEMO_SNAPSHOT_ROWS).map((emp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `dashboard.employee_table.row.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0", children: emp.name.split(" ").map((n) => n[0]).slice(0, 2).join("") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: emp.name })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-muted-foreground", children: emp.nationality }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-muted-foreground tabular-nums", children: emp.visaExpiry }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-muted-foreground", children: emp.department }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  status: emp.status,
                  label: emp.status === "valid" ? "Valid" : emp.status === "expiring" ? "Expiring Soon" : emp.status === "expired" ? "Expired" : "Active"
                }
              ) })
            ]
          },
          emp.name
        )) })
      ] }) })
    ] })
  ] });
}
export {
  DashboardContent as default
};
