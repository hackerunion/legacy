


var HTTPService = function($http, $q){

  return {

    http: function(method, url, data) {
      var deferred = $q.defer();
      $http({
        method: method,
        url: url,
        data: (data || {}),
      })
      .success(function(returnedData){
        deferred.resolve(returnedData);
      })
      .error(function(returnedData) { 
        console.log('API ERROR')
        console.log(returnedData);
        deferred.reject(returnedData);
      });
      return deferred.promise;
    },

    httpGET: function(url) {
      return this.http('GET', url, null);
    },
    httpPOST: function(url, data) {
      return this.http('POST', url, data);
    },
    httpPUT: function(url, data) {
      return this.http('PUT', url, data);
    },
    httpDELETE: function(url) {
      return this.http('DELETE', url, null);
    },

    getChapters: function() {
      return this.httpGET("/api/chapters");
    },
    getUsers: function(chapter) {
      return this.httpGET("/api/chapters/" + chapter + "/users");
    },
    getEvents: function(chapter) {
      return this.httpGET("/api/chapters/" + chapter + "/events");
    },

  }
};







