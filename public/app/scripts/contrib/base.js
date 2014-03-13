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

    var Contrib = klass(function(scripts, styles) {
        var scripts = scripts || [];
        var styles = styles || [];
        var args = Array.prototype.slice.call(arguments, 2);

        loadDependencies(scripts, styles, function() {
            this.main.apply(this, args);
        });
    })
    .statics({
    })
    .methods({
        main: function() {
        },
        getResourceUri: function(rs) {
            var cwd = global.kernelCwd || []; // TODO: ensure that kernelCwd is updated
            
            // access raw data, bypassing the kernel
            cwd.push('raw');
            
            return '/' + cwd.join('/');
        }
    });

    var ContribFrame = Contrib.extend(function(scripts, styles) {
    })
    .statics({
    })
    .methods({
        getFrameElement: function() {
            //
        }
    });

    globals.ContribBase = Contrib;
    globals.ContribFrame = ContribFrame;
})(window);
