(function() {

  function decode(json) {
    var obj = JSON.parse(json);
    return toHTML(obj);
  }

  function toHTML(obj) {
    if (Array.isArray(obj))
      return toUL(obj);
    else if (typeof(obj) == 'object')
      return toDL(obj);
    else
      return obj;
  }

  function toUL(obj) {
    var string = "<ul>\n";
    for(var el in obj) {
      string += "<li>" + toHTML(obj[el]) + "</li>\n";
    }
    return string + "</ul>\n";
  }

  function toDL(obj) {
    var string = "<dl>\n";
    for(var el in obj) {
      string += "<dt>" + el + "</dt>\n";
      string += "<dd>" + toHTML(obj[el]) + "</dd>\n";
    }
    return string + "</dl>\n";
  }

})();
