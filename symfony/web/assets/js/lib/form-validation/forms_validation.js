
var form_validation = function() {
    var initAddForm = function() {
        jQuery(".form-add").validate({
            ignore: [],
            errorClass: "invalid-feedback animated fadeInDown",
            errorElement: "div",
            errorPlacement: function(e, a) {
                jQuery(a).parents(".form-group").append(e)
            },
            highlight: function(e) {
                jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
            },
            success: function(e) {
                jQuery(e).closest(".form-group").removeClass("is-invalid");
                jQuery(e).remove();
            },
            rules: {
                "firstname": {
                    required: true,
                    minlength: 3
                },
                "lastname": {
                    required: true,
                    minlength: 3
                },
                "username": {
                    required: true,
                    minlength: 4
                },
                "email": {
                    required: true,
                    email: true
                },
                "password": {
                    required: true,
                    minlength: 6
                }

            },
            messages: {
                "firstname": {
                    required: "Please enter a firstname",
                    minlength: "Your firstname must consist of at least 3 characters"
                },
                "lastname": {
                    required: "Please enter a lastname",
                    minlength: "Your lastname must consist of at least 3 characters"
                },
                "username": {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 4 characters"
                },
                "email": "Please enter a valid email address",
                "password": {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 6 characters long"
                }
            },
            submitHandler: function(e) {
                var form = $('.form-add');
                console.log(form.serialize());
                $.ajax({
                    url: addUserUrl,
                    data : form.serialize(),
                    type:"POST",
                    success: function(result) {
                        sweetAlert("Active", "Utilisateur a ete Ajouter", "success");
                        setTimeout( function () {
                            location.reload();
                        }, 1300);
                    },
                    error: function(result){
                        sweetAlert("Oops...", "Quelque chose s'est mal passé!", "error");
                    }
                });
            }
        })
    };
    var initUpdateForm = function() {
        jQuery(".form-edit").validate({
            ignore: [],
            errorClass: "invalid-feedback animated fadeInDown",
            errorElement: "div",
            errorPlacement: function(e, a) {
                jQuery(a).parents(".form-group").append(e)
            },
            highlight: function(e) {
                jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
            },
            success: function(e) {
                jQuery(e).closest(".form-group").removeClass("is-invalid"), jQuery(e).remove()
            },
            rules: {
                "firstname": {
                    required: true,
                    minlength: 3
                },
                "lastname": {
                    required: true,
                    minlength: 3
                },
                "username": {
                    required: true,
                    minlength: 4
                },
                "email": {
                    required: true,
                    email: true
                },
                "password": {
                    required: true,
                    minlength: 6
                }

            },
            messages: {
                "firstname": {
                    required: "Please enter a firstname",
                    minlength: "Your firstname must consist of at least 3 characters"
                },
                "lastname": {
                    required: "Please enter a lastname",
                    minlength: "Your lastname must consist of at least 3 characters"
                },
                "username": {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 4 characters"
                },
                "email": "Please enter a valid email address",
                "password": {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 6 characters long"
                }
            },
            submitHandler: function(e) {
                id = $('.btn-edit').data('id');
                var form = $('.form-edit');
                console.log(form.serialize());
                $.ajax({
                    url: updateUserUrl+id,
                    data : form.serialize(),
                    type:"POST",
                    success: function(result) {
                        sweetAlert("Active", "Utilisateur a ete Modifier", "success");
                        setTimeout( function () {
                            location.reload();
                        }, 1300);
                    },
                    error: function(result){
                        sweetAlert("Oops...", "Quelque chose s'est mal passé!", "error");
                        console.log(result);
                    }
                });
            }
        })
    };
    return {
        init: function() {
            initAddForm();
            initUpdateForm();
        }
    }
}();
jQuery(function() {
    form_validation.init()
});