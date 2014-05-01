/*jshint -W020, -W079 */
"use strict";

var Npm,
    Deps,
    Package,
    Random,
    Session,
    Template,
    Handlebars,
    Accounts,
    Meteor,
    __meteor_bootstrap__,
    share;

var emptyFunction = function () {
};

var colFun = function (collectionName) {
    Meteor.instantiationCounts[collectionName] = Meteor.instantiationCounts[collectionName] ? Meteor.instantiationCounts[collectionName] + 1 : 1;
};

Meteor = {
    isClient: true, // these two properties expect that a user does not use a !Metoer.isClient and !Meteor.isServer
    isServer: true, // If the above are used, when the source code is loaded, it will not
    instantiationCounts: {},
    startupFunctions: [],
    publishFunctions: {},
    subscribeFunctions: {},
    methodMap: {},
    startup: function (newStartupFunction) {
        this.startupFunctions.push(newStartupFunction);
    },
    Collection: colFun,
    SmartCollection: colFun,
    publish: function (modelName, publishFunction) {
        this.publishFunctions[modelName] = publishFunction;
    },
    subscribe: function (modelName, subscribeFunction) {
        this.subscribeFunctions[modelName] = subscribeFunction;
        return {
            ready: function () {
                return true;
            }
        };
    },
    settings: {
        public: {}
    },
    methods: function (map) {
        for (var name in map) {
            //noinspection JSUnfilteredForInLoop
            this.methodMap[name] = map[name];
        }
    },
    runStartupMethods: function () {
        for (var i = 0; i < this.startupFunctions.length; i += 1) {
            this.startupFunctions[i]();
        }
    }
};

Meteor.Error = function (httpCode, message) {
};

Meteor.Collection.prototype = {
    insert: emptyFunction,
    find: function () {
        return {
            count: emptyFunction,
            fetch: emptyFunction,
            observe: emptyFunction,
            observeChanges: emptyFunction
        };
    },
    findOne: emptyFunction,
    update: emptyFunction,
    remove: emptyFunction,
    allow: emptyFunction,
    deny: emptyFunction,
    _ensureIndex: emptyFunction,

    // collection hooks
    before: {
        insert: emptyFunction,
        update: emptyFunction,
        remove: emptyFunction
    },
    after: {
        insert: emptyFunction,
        update: emptyFunction,
        remove: emptyFunction
    }
};

Meteor.Collection.ObjectID = function () {
    return {
        _str: ''
    };
};

// instantiate the users collection, which is just a collection but always created in the Meteor object
Meteor.users = new Meteor.Collection('users');

Meteor.autorun = function (func) {
    func();
};

Meteor.autosubscribe = function (func) {
    func();
};

Meteor.call = emptyFunction;

Meteor.loggingIn = emptyFunction;

Meteor.setInterval = emptyFunction;

Meteor.user = function () {
    return {
        emails: []
    };
};

Meteor.userId = function () {
    return null;
};

Meteor.loginWithGoogle = emptyFunction;
Meteor.logout = emptyFunction;

Meteor.require = emptyFunction;

var TemplateClass = function () {
};
TemplateClass.prototype = {
    stub: function (templateName) {
        TemplateClass.prototype[templateName] = {
            eventMap: {},
            events: function (eventMap) {
                for (var event in eventMap) {
                    //noinspection JSUnfilteredForInLoop
                    TemplateClass.prototype[templateName].eventMap[event] = eventMap[event];
                }
            },
            helpers: function (helperMap) {
                for (var helper in helperMap) {
                    //noinspection JSUnfilteredForInLoop
                    TemplateClass.prototype[templateName][helper] = helperMap[helper];
                }
            },
            fireEvent: function (key) {
                if (arguments.length > 1) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    TemplateClass.prototype[templateName].eventMap[key].apply(null, args);
                } else {
                    TemplateClass.prototype[templateName].eventMap[key]();
                }
            },
            // Allows you to set an attribute in the event 'this' context
            addContextAttribute: function (key, value) {
                TemplateClass.prototype[templateName].eventMap[key] = value;
            }
        };
    }
};

Template = new TemplateClass();

Session = {
    store: {},
    get: function (key) {
        return this.store[key];
    },
    set: function (key, value) {
        this.store[key] = value;
    },
    equals: function (key, value) {
        return this.store[key] === value;
    },
    setDefault: function (key, value) {
        if (typeof this.get(key) === 'undefined') {
            this.set(key, value);
        }
    }
};

Random = {
    fraction: emptyFunction
};

Package = {
    describe: function (description) {
    }
};

Npm = {
    depends: function (on) {
    },
    require: function () {
    }
};

Deps = {
    autorun: function (func) {
        func();
    },
    autosubscribe: function (func) {
        func();
    },
    afterFlush: emptyFunction
};

var HandlebarsClass = function () {
};

Accounts = {
    emailTemplates: {
        enrollAccount: emptyFunction
    },
    config: emptyFunction,
    urls: {},
    registerLoginHandler: emptyFunction,
    onCreateUser: emptyFunction,
    loginServiceConfiguration: new Meteor.Collection('loginserviceconfiguration'),
    validateNewUser: emptyFunction
};

HandlebarsClass.prototype = {
    helpers: {},
    registerHelper: function (name, method) {
        this.helpers[name] = method;
    }
};
Handlebars = new HandlebarsClass();

__meteor_bootstrap__ = {
    deployConfig: {
        packages: {
            'mongo-livedata': {
                url: ''
            }
        }
    }
};

share = {};

global.Meteor = Meteor;
global.Npm = Npm;
global.Deps = Deps;
global.Package = Package;
global.Random = Random;
global.Session = Session;
global.Template = Template;
global.Handlebars = Handlebars;
global.Accounts = Accounts;
global.__meteor_bootstrap__ = __meteor_bootstrap__;
global.share = share;