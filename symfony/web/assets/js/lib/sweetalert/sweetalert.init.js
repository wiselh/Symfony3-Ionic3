$('.btn-active').click(function (e) {
    id = $(e.currentTarget).data('id');
    $.ajax({
        url: activeUserUrl+id,
        type:"GET",
        success: function(result) {
            swal("Active", "Utilisateur a ete active", "success");
            setTimeout( function () {
                location.reload();
            }, 1000);
        },
        error: function(data){
            swal("Oops...", "Quelque chose s'est mal passé!", "error");
        }
    });

});
$('.btn-delete').click(function (e) {
    swal({
            title: "Vous Êtes Sûr ?",
            text: "Vous ne pourrez pas récupérer ce utilisateur !!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, Supprimer !!",
            cancelButtonText: "Annuler",
            closeOnConfirm: false
        },
        function(){
            id = $(e.currentTarget).data('id');
            $.ajax({
                url: deleteUserUrl+id,
                type:"GET",
                success: function(result) {
                    swal("Supprimer !!", "Ce utilisateur a ete supprimer !!", "success");
                    setTimeout( function () {
                        location.reload();
                    }, 1000);

                },
                error: function(data){
                    swal("Oops...", "Quelque chose s'est mal passé! !!", "error");
                }
            });
        });
});
