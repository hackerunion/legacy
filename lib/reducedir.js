var fs = require('fs'),
    path = require('path'),
    async = require('async');

module.exports = function reduceDir(dir, mem, callback) {
    if (!callback && typeof mem === 'function') {
        callback = mem;
        mem = null;
    }
    var base;
    if (mem) {
        base = path.basename(dir);
    } else {
        mem = mem || {};
    }

    fs.readdir(dir, function(err, files) {
        if (err) {
            return callback(err);
        }
        async.reduce(files, mem, function(memo, file, next) {
            var fullpath = path.join(dir, file);
            fs.stat(fullpath, function(err, stat) {
                if (err) {
                    return err.code !== 'ENOENT' ? next(err) : next();
                }
                if (base) {
                    mem[base] = mem[base] || {};
                    if (stat.isDirectory()) {
                        return reduceDir(fullpath, mem[base], function(err, subtree) {
                            return next(null, mem);
                        });
                    } else {
                        mem[base][file] = null;
                    }
                } else {
                    if (stat.isDirectory()) {
                        mem[file] = {};
                        return reduceDir(fullpath, mem[file], function(err, subtree) {
                            return next(null, mem);
                        });
                    } else {
                        mem[file] = null;
                    }
                }
                next(null, mem);
            });
        }, function(err, result) {
            return err ? callback(err) : callback(null, result);
        });
    });
}
