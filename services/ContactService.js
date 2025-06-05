angular.module('contactApp').factory('ContactService', function($q) {
    // Données mockées (simulées)
    const mockContacts = [
        { _id: 1, name: "Jean Dupont", email: "jean@example.com", phone: "01 23 45 67 89" },
        { _id: 2, name: "Marie Martin", email: "marie@example.com", phone: "07 89 01 23 45" },
        { _id: 3, name: "Pierre Durand", email: "pierre@example.com", phone: "06 12 34 56 78" }
    ];

    return {
        getContacts: function() {
            return $q.resolve(mockContacts); // Renvoie les données mockées
        },

        searchContacts: function(query) {
            const filtered = mockContacts.filter(contact => 
                contact.name.toLowerCase().includes(query.toLowerCase()) || 
                contact.email.toLowerCase().includes(query.toLowerCase())
            );
            return $q.resolve(filtered);
        },

        createContact: function(contact) {
            contact._id = mockContacts.length + 1;
            mockContacts.push(contact);
            return $q.resolve(contact);
        },

        updateContact: function(id, updatedContact) {
            const index = mockContacts.findIndex(c => c._id === id);
            if (index !== -1) {
                mockContacts[index] = { ...mockContacts[index], ...updatedContact };
                return $q.resolve(mockContacts[index]);
            }
            return $q.reject("Contact non trouvé");
        },

        deleteContact: function(id) {
            const index = mockContacts.findIndex(c => c._id === id);
            if (index !== -1) {
                mockContacts.splice(index, 1);
                return $q.resolve({ success: true });
            }
            return $q.reject("Contact non trouvé");
        }
    };
});