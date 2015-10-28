// Generated by CoffeeScript 1.8.0
var Account, Contact, DataPoint, Helper, async, cozydb, log,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

cozydb = require('cozydb');

async = require('async');

Helper = require('../utils/contact_helper');

log = require('printit')({
  prefix: 'Contact Model'
});

DataPoint = (function(_super) {
  __extends(DataPoint, _super);

  function DataPoint() {
    return DataPoint.__super__.constructor.apply(this, arguments);
  }

  DataPoint.schema = {
    name: String,
    value: cozydb.NoSchema,
    pref: Boolean,
    type: String
  };

  return DataPoint;

})(cozydb.Model);

Account = (function(_super) {
  __extends(Account, _super);

  function Account() {
    return Account.__super__.constructor.apply(this, arguments);
  }

  Account.schema = {
    type: String,
    name: String,
    id: String,
    lastUpdate: String
  };

  return Account;

})(cozydb.Model);

module.exports = Contact = (function(_super) {
  __extends(Contact, _super);

  function Contact() {
    return Contact.__super__.constructor.apply(this, arguments);
  }

  Contact.docType = 'contact';

  Contact.schema = {
    id: String,
    fn: String,
    n: String,
    org: String,
    title: String,
    department: String,
    bday: String,
    nickname: String,
    url: String,
    revision: String,
    datapoints: [DataPoint],
    note: String,
    tags: [String],
    binary: Object,
    _attachments: Object,
    accounts: [Account]
  };

  Contact.cast = function(attributes, target) {
    target = Contact.__super__.constructor.cast.call(this, attributes, target);
    return target;
  };

  return Contact;

})(cozydb.CozyModel);

Contact.prototype.updateAttributes = function(changes, callback) {
  changes.revision = new Date().toISOString();
  return Contact.__super__.updateAttributes.apply(this, arguments);
};

Contact.prototype.save = function(callback) {
  this.revision = new Date().toISOString();
  return Contact.__super__.save.apply(this, arguments);
};

Contact.prototype.getName = function() {
  var dp, name, _i, _len, _ref;
  name = '';
  if ((this.fn != null) && this.fn.length > 0) {
    name = this.fn;
  } else if (this.n && this.n.length > 0) {
    name = this.n.split(';').join(' ').trim();
  } else {
    _ref = this.datapoints;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      dp = _ref[_i];
      if (dp.name === 'email') {
        name = dp.value;
      }
    }
  }
  return name;
};

Contact.prototype.getAccount = function(accountType, accountName) {
  return Helper.getAccount(this, accountType, accountName);
};

Contact.prototype.setAccount = function(account) {
  return Helper.setAccount(this, account);
};

Contact.prototype.deleteAccount = function(account) {
  return Helper.deleteAccount(this, account);
};

Contact.all = function(callback) {
  return Contact.request('all', callback);
};
