(function(global) {
    var withScripts = function(srcList, callback) {
        var numScripts = srcList.length;
        var numLoaded = 0;
        var scriptLoaded = function() {
            numLoaded++;
            if (numLoaded === numScripts) {
                callback();
            }
        };

        for (var i=0; i<numScripts; i++) {
            var script_tag = document.createElement('script');

            script_tag.setAttribute("type","text/javascript");
            script_tag.setAttribute("src", srcList[i]);

            if (script_tag.readyState) {
                script_tag.onreadystatechange = function() { // For old versions of IE
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        scriptLoaded();
                    }
                };
            } else {
                script_tag.onload = scriptLoaded;
            }

            // Try to find the head, otherwise default to the documentElement
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
        }

        if (!numScripts) {
            callback();
        }
    };

    var withStyleSheets = function(srcList, callback) {
        for (var i=0; i<srcList.length; i++) {
            if (document.createStyleSheet) {
                document.createStyleSheet(srcList[i]);
            } else {
                var ss = document.createElement("link");
                ss.type = "text/css";
                ss.rel = "stylesheet";
                ss.href = srcList[i];
                document.getElementsByTagName("head")[0].appendChild(ss);
            }
        }
        if (callback) { callback(); }
    };

    var loadDependencies = function(scripts, styles, callback) {
        withStyleSheets(styles);
        withScripts(scripts, callback);
    };

    var Kernel = klass(function(env) {
        this.env = _.extend({
            cwd: [],
            handlers: {}
        }, env);

        this.cd(env.cwd);
    })
    .statics({
        DEFAULT: '?',
        DIRECT: ['raw'],
        API: ['api']
    })
    .methods({
        path: function(uri) {
            // assume all arrays are paths
            if (Array.isArray(uri)) {
                return uri;
            }

            var dirs = uri.split('/');
            var relative = false;

            if (dirs.length && dirs[0] == '') {
                dirs = this.env.cwd.append(dirs.slice(1));
            } 
            
            _.reduce(dirs, function(all, c) { if (c == '.') return all; if (c == '..') return all.slice(0, -1); return all.concat([c]); }, []);

            return dirs;
        },

        bind_handlers: function(handlers) {
            this.env.handlers = _.extend(this.env.handlers, handlers);
        },

        dirname: function(uri) {
            return this.path(uri).slice(0, -1);
        },

        filename: function(uri) {
            var path = this.path(uri);
            var file = path[path.length - 1];

            if (file == '.' || file == '..') {
                return { basename: file, suffix: '', special: true };
            }

            var parts = file.split('.');

            return { basename: file[0], suffix: file[1].toLowerCase(), special: false };
        },

        uri: function(path) {
            return '/' + this.path(path).join('/');
        },

        cd: function(uri, cb) {
            var path = this.path(uri);
            var cb = cb || function() {};

            this.env.cwd = path;
            this._fetch(this.API.concat(path), function(err, dir) {
                if (err) {
                    return cb(err);
                }

                var tasks = _.map(_.filter(dir.files, function(f) { return !f.search(/index\./)), function(f) {
                    return function(cb2) { this.exec(path.concat([f]), null, cb2); };
                });
                
                // TODO: install async
                return async.parallel(tasks, function(err, data) {
                    if (err) {
                        return cb(err);
                    }
                    
                    this._cd(path, cb);          
                });
            });
        },
        
        exec: function(uri, opts, cb) {
            var path = this.path(uri);
            var file = this.filename(uri);
            var opts =  opts || {};
            var cb = cb || function() {};
            var handlerPath;

            // can't execute special files like "." and ".."
            if (file.special) {
                return cb("Not executable", null); 
            }

            this.fetch(this.DIRECT.concat(path), function(err, data) {
                if (err) {
                    return cb(err);
                }

                // check for an explicit handler
                // TODO: ensure server api removes the # if it's there since it's invalid
                // note, may want to use a different pattern; if has certain extension, treat as meta file
                // and use the handler which will look for a config.json file, load that, and use it to cd into
                // the directory, exec, and leave

                // hidden files start with a "." (NOTE: index logic will need to be updated to reflect this
                // new idea: if there's a file called ".{ filename }", it's meta data for that file and it contains json
                // which may specify a handler

                var explicit = data.match(/#!\s*([^\n]*)\s*/);

                // attempt to lookup handler by extension, or default handler
                if (explicit) {
                    handlerPath = explicit[1];
                } else if (file.suffix in this.env.handlers) {
                    handlerPath = this.env.handlers[file.suffix];
                } else if (this.DEFAULT in this.env.handlers)  {
                    handlerPath = this.env.handlers[this.DEFAULT]
                } else {
                    return cb("No handler", null);
                }

                opts['data'] = data;
                
                // fetch handler via api
                this._fetch(this.DIRECT.concat(this.path(handlerPath)), function(err, src) {
                    if (err) {
                        return cb(err);
                    }
                
                    var handler = window.eval.call(window, src);
                    
                    handler(opts, function() {
                        this._exec(path, opts, cb);
                    });
                });
            });
        },

        _fetch: function(path, cb) {
            $.get(this.uri(path))
             .done(function(data) { cb(null, data); })
             .fail(function() { cb("Fetch failed", null); });
        },

        _exec: function(path, opts, cb) {
            /* invoked after a file is executed */
            if (cb) {
                cb(null, path, opts);
            }
        },

        _cd: function(path, cb) {
            /* invoked after a directory change */
            if (cb) {
                cb(null, path);
            }
        },
    });

    // NOTE: helpers should be encapsulated in the kernel somehow; .helpers?
    // should also have a .register_helper thing, work like modules

    globals.$kernel = new Kernel({
        
    });
})(window);
