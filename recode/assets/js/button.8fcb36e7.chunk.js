(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0], {

    "LUCB":
        (function (module, exports, __webpack_require__) {


            var content = __webpack_require__("uc89");

            if (typeof content === 'string') content = [[module.i, content, '']];

            var transform;
            var insertInto;



            var options = { "hmr": true }

            options.transform = transform
            options.insertInto = undefined;

            var update = __webpack_require__("YbWx")(content, options);

            if (content.locals) module.exports = content.locals;

            if (false) { }

        }),

    "uc89":
        (function (module, exports, __webpack_require__) {

            exports = module.exports = __webpack_require__("TEV/")(false);
            // imports

            // module
            exports.push([module.i, ".button {\n  font: 20px Arial; }\n", ""])

        }),

    "ww3E":
        (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("EHUi");
            var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
            var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("LUCB");
            var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




            var Button = function (_React$Component) {
                _inherits(Button, _React$Component);

                function Button(props) {
                    _classCallCheck(this, Button);

                    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

                    _this.state = {
                        count: 0
                    };

                    _this.handleIncrement = _this.handleIncrement.bind(_this);
                    return _this;
                }

                _createClass(Button, [{
                    key: 'handleIncrement',
                    value: function handleIncrement() {
                        this.setState({ count: this.state.count + 1 });
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('button', {
                            onClick: this.handleIncrement,
                            className: 'button'
                        }, 'Count: ' + this.state.count);
                    }
                }]);

                return Button;
            }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

            __webpack_exports__["default"] = (Button);

        })

}]);
//# sourceMappingURL=button.8fcb36e7.chunk.js.map