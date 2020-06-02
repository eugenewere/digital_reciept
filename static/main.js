
// function taxSet(){
//     localStorage.getItem('tax_value') ?  $('#modal_tax, #tax').text(localStorage.getItem('tax_value')):  $('#modal_tax, #tax').text(0);
// }
// taxSet();

// $('#modal_tax, #tax').text();
refreshTax();

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
        .find('input').attr('placeholder', '-----')
        .parent()
        .parent()
        .append(
              '<i style="margin-left: auto;" onclick="deleteRow2(this)" class="fas fa-trash text-danger " data-toggle="tooltip" data-placement="right" title="Delete top row"></i>'
        );


});
function deleteRow2(e){
    e.parentElement.style.display ='none';

}

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
    $('#'+ e.id).parent().parent().fadeOut();
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



function add_ammounts(){
    var ammounts = [];
    $('.ammounts_total').each(function () {
       ammounts.push(this.innerText) ;

    });
    $('#total_txt').text(eval(ammounts.join('+')));
}

setInterval(add_ammounts,1000);

// $('#print').click(function () {
//     $("#print_doc").printElement();
// });
function printContent(printpage){
    var headstr = "<html><head><title></title></head><body><nav></nav>";
    var footstr = "</body>";
    var newstr = $(printpage).html();
    var oldstr = document.body.innerHTML;
    document.body.innerHTML = headstr + newstr + footstr;
    window.print();
    document.body.innerHTML = oldstr;
    return false;
}


$('#tax_form_submit').click(function (e) {
   var tax_value = $("#tax_input").val();
   var tax_name = $("#tax_name").val();
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
   // console.log(tax);
   if(tax_value.length === 0 && tax_name.length === 0){
       $('#alert_dangerr').fadeIn()
   }else {
       $('#alert_dangerr').fadeOut();
       $('#spinner').show();
       // setTimeout(localStorage.setItem(tax_name, tax),3000);
       db.transaction(function (tx) {
           tx.executeSql("INSERT INTO taxvalues (name, value) VALUES (?,?)", [tax_name, tax_value]);
       });
       $('#spinner').fadeOut();
       $('#alert_success').fadeIn();

       refreshTax();

   }
});

function refreshTax(){
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#tax_tbody').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                for(var i = 0; i < results.rows.length; i++) {
                    // console.log("Result -> " + results.rows.item(i).firstname + " " + results.rows.item(i).lastname);
                    var id_row = i + 1;
                    $('#tax_tbody').append(
                        ' <tr id="'+"tax"+ i +'">'+
                            '<th scope="row">'+ id_row +'</th>'+
                            '<td>'+ results.rows.item(i).name +'</td>'+
                            '<td>'+ results.rows.item(i).value +'</td>'+
                            '<td>'+
                                '<i id="'+"t_delete" + i +'" style="margin-left: auto;" onclick="deleteTax(this)" class="fas fa-trash text-danger " data-toggle="tooltip" data-placement="right" title="Delete top row"></i>'
                            +'</td>'+
                        '</tr>')
                }
            }
        });
    });
}

function deleteTax(event){
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    console.log();
    var db_id = $('#'+ event.id).parent().parent().find('th:first').text();
    console.log(db_id);
    db.transaction(function(tx) {
        tx.executeSql('delete from taxvalues where rowid=?', [db_id], function(transaction, result) {
            console.log(result);
            console.info('Record Deleted Successfully!');
        }, function(transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);

    function transError() {

    }function transSuccess() {

    }
    refreshTax();
}





