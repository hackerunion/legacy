var jansport = new function() {

    var self = this;

    this.init = function() {
        console.log('Hello, world!');
    };

};
jQuery(document).ready(function($){
    jansport.init();
});