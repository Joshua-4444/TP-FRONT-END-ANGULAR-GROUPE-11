angular.module('contactApp').factory('ContactService', function($http) {
    const baseUrl = 'http://localhost:3000/contacts';
    
    return {
        getContacts: function() {
            return $http.get(baseUrl);
        },
        
        searchContacts: function(query) {
            return $http.get(`${baseUrl}/search?q=${query}`);
        },

        createContact: function(contact) {
            return $http.post(baseUrl, contact);
        },

        updateContact: function(id, contact) {
            return $http.put(`${baseUrl}/${id}`, contact);
        },

        deleteContact: function(id) {
            return $http.delete(`${baseUrl}/${id}`);
        }
    };
});