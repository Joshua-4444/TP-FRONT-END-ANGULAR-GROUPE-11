angular.module('contactApp').controller('ContactController', function(ContactService) {
    const vm = this;
    vm.contacts = []; // Initialise le tableau
    
    // Charge les contacts au démarrage
    vm.loadContacts = function() {
      ContactService.getContacts().then(
        function(response) {
          vm.contacts = response; // Doit recevoir les données mockées
          console.log("Contacts chargés :", vm.contacts); // Debug
        },
        function(error) {
          console.error("Erreur :", error);
        }
      );
    };
  
    vm.loadContacts(); // Appel initial
    
    // Gestion recherche
    vm.search = function() {
        if(vm.searchQuery) {
            ContactService.searchContacts(vm.searchQuery).then(
                response => vm.contacts = response.data,
                error => vm.errorMessage = 'Erreur de recherche'
            );
        } else {
            vm.loadContacts();
        }
    };
    
    // Gestion formulaire
    vm.editContact = function(contact) {
        vm.currentContact = angular.copy(contact);
        vm.mode = 'edit';
    };
    
    vm.submitForm = function() {
        vm.errorMessage = '';
        const contact = {
            name: vm.currentContact.name,
            email: vm.currentContact.email,
            phone: vm.currentContact.phone
        };
        
        const operation = vm.mode === 'create' 
            ? ContactService.createContact(contact)
            : ContactService.updateContact(vm.currentContact._id, contact);
            
        operation.then(
            () => {
                vm.loadContacts();
                vm.successMessage = `Contact ${vm.mode === 'create' ? 'ajouté' : 'modifié'} avec succès`;
                vm.resetForm();
            },
            error => vm.errorMessage = 'Erreur lors de l\'opération'
        );
    };
    
    vm.resetForm = function() {
        vm.currentContact = {};
        vm.mode = 'create';
    };
    
    // Suppression
    vm.deleteContact = function(id) {
        if(confirm('Confirmer la suppression ?')) {
            ContactService.deleteContact(id).then(
                () => {
                    vm.loadContacts();
                    vm.successMessage = 'Contact supprimé avec succès';
                },
                error => vm.errorMessage = 'Erreur de suppression'
            );
        }
    };
});