'use strict';

var _models = require('./models');

var _config = require('./config/config.json');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log('Application name is: ', config.appName);

var Bob = new _models.User();
var Bread = new _models.Product();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _product = require('./product');

Object.defineProperty(exports, 'Product', {
  enumerable: true,
  get: function get() {
    return _product.Product;
  }
});

var _user = require('./user');

Object.defineProperty(exports, 'User', {
  enumerable: true,
  get: function get() {
    return _user.User;
  }
});
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = exports.Product = function Product() {
    _classCallCheck(this, Product);

    console.log('Product module');
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = exports.User = function User() {
    _classCallCheck(this, User);

    console.log('User module');
};
