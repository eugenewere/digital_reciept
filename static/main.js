function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blah')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$('[data-toggle="tooltip"]').tooltip();

$('#invoice_add').click(function (e) {
    // console.log('this');
    $('#clone_me div:first')
        .clone()
        .insertAfter('#clone_me > div:last')
        .find('input').attr('placeholder', '-----');
    $('#invoice_delete').show();
});

$('#addrow').click(function (e) {
    var new_id = 'deleteButton' + $('#table tbody tr:not(:nth-last-child(3))').length;
    var rows= $('#table tbody tr:not(:nth-last-child(3))').length + 1;
    var tr_id = 'trow'+ $('#table tbody tr:not(:nth-last-child(3))').length;
    // console.log(tr_id);
    $('#table tbody tr:first')
        .clone()
        .insertBefore('#table tbody tr:nth-last-child(3)')
        .find('th:last')
        .append(
           ' <button onclick="deleteRow(this)" id="'+ new_id +'" class="btn btn-danger">'+
               ' <i class="fas fa-trash-alt"></i>'+
           ' </button>'
        )
        .parent().attr('id', tr_id)
    ;

    $('#'+new_id).parent().parent().find('input').value=0;
    // $('#'+new_id).parent().parent().find('th span:first').hide();
    // $('#'+new_id).parent().parent().find('th span').text('_____');
    addItems();

});

function deleteRow(e) {
    $('#'+ e.id).parent().parent().hide()
}

function insertDecimal(num) {
    return (num / 100).toFixed(2);
}
function addItems() {
    $('.tab_row').each(function (event) {
        var val_1 = $(this).find('input:eq(1)').val();
        var val_2 = $(this).find('input:eq(2)').val();
        var txt_2 = $(this).find('span:eq(1)').text(val_1 * val_2);
        $(this).find('input').on('change', function () {
            var val_1 = $(this).find('input:eq(1)').val();
            var val_2 = $(this).find('input:eq(2)').val();
            var summ=val_1 * val_2;
            var txt_2 = $(this).find('span:eq(1)').text(summ.toFixed(2));
            console.log(val_1, val_2);
        });

    });
}
addItems();
setInterval(addItems, 1000);











