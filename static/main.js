checkfortax();
refreshTax();
refreshDiscount();
displayTax();

$(function(){
    $('table.resizable').resizableColumns();
});

// function collectDate() {
    var monthes =['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug', 'Sept','Oct','Nov','Dec'];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth()).padStart(2, '0');
    var yyyy = today.getFullYear();
// console.log();
    today =monthes[Number(mm)]+ '/' + dd + '/' + yyyy;
// $('#bs_date_no_text').attr('placeholder', today);
  $('#bs_date_no_text').attr('placeholder', today);
  $('#bs_date_no_text').attr('value', today);
    console.log(today);

// }



function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        $('.blah3').hide();
        $('.blah').show();
        reader.onload = function (e) {
            $('.blah').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function editContent(){
    var rrr_colspan= $('.rrr').attr('colspan');
    $('.print_hide').fadeOut();

    $('#navb').slideUp();
    $('#returnPage').show();
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#tax_tbody_aa').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                var n = Number(rrr_colspan)-2;
                console.log(n);
                $('.print_hide2').fadeOut();
                $('.rrr').attr('colspan', n);
            }
        });
    });

}
function showContent(){
    var rrr_colspan= $('.rrr').attr('colspan');
    $('.print_hide').fadeIn();
    $('#navb').slideDown();
    $('#returnPage').fadeOut();
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#tax_tbody_aa').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                var n = Number(rrr_colspan)+2;
                console.log(n);
                $('.print_hide2').fadeIn();
                $('.rrr').attr('colspan', n);
            }
        });
    });
}

$('[data-toggle="tooltip"]').tooltip();
$('#invoice_add').click(function (e) {
    console.log('this');
    $('#clone_me div:first')
        .clone()
        .insertAfter('#clone_me > div:last')
        .find('input').attr('placeholder', '-----')
        .parent()
        .parent()
        .append(
            '<i style="margin-left: auto;" onclick="deleteRow2(this)" class="fas fa-trash text-danger print_hide" data-toggle="tooltip" data-placement="right" title="Delete top row"></i>'
        );

    $('[data-toggle="tooltip"]').tooltip();
});

// <i id="deleteinvose" style="margin-left: auto;  "  class="fas fa-trash text-danger print_hide" data-toggle="tooltip" data-placement="right" title="Delete top row"></i>
function deleteRow2(e){
    e.parentElement.style.display ='none';
    // $('.cloned:last').remove();
    // console.log($('.cloned').length);
    // if($('.cloned').length === 2){
    //     $('#delinv').hide();
    // }else {
    //     $('#delinv').show();
    // }

}
$('#addrow').click(function (e) {
    var new_id = 'deleteButton' + $('#table tbody tr:not(:nth-last-child(3))').length;
    var rows= $('#table tbody tr:not(:nth-last-child(3))').length + 1;
    var tr_id = 'trow'+ $('#table tbody tr:not(:nth-last-child(3))').length;
    var tbc = 'ckk' + ($('.table_contents').length + 1);
    // console.log(tbc);
    $('#table tbody tr:first')
        .clone()
        .insertAfter('.tab_row:last')
        .find('th:last')
        .append(
            '<button data-toggle="tooltip" data-placement="right" title="Delete this row" onclick="deleteRow(this)" id="'+ new_id +'" class="btn btn-sm btn-danger">'+
                '<i class="fas fa-trash-alt  print_hide"></i>'
            +'</button>'
        )
        .parent().attr('id', tr_id)
        .find('.table_contents').attr('id', tbc);
    $('#'+new_id).parent().parent().find('input').value= 0;
    addItems();
    add_ammounts();
    tabletax();
    vuv();
});


function deleteRow(e) {
    $('#'+ e.id).parent().parent().hide();
    add_ammounts();
}
function insertDecimal(num) {
    return (num / 100).toFixed(2);
}
function addItems() {
    $('.tab_row ').each(function (event) {
        var val_1 = $(this).find('input:eq(0)').val();
        var val_2 = $(this).find('input:eq(1)').val();
        var txt_2 = $(this).find('span:eq(1)').text(val_1 * val_2);

        $(this).find('input').on('change', function () {
            var val_1 = $(this).find('input:eq(0)').val();
            var val_2 = $(this).find('input:eq(1)').val();
            var summ=val_1 * val_2;
            var txt_2 = $(this).find('span:eq(1)').text(summ.toFixed(2));

        });

    });
    add_ammounts();

}
addItems();
function calculat() {
    addItems();
}
function add_ammounts(){
    var ammounts = [];
    $('.tab_row:visible .ammounts_total').each(function () {
       ammounts.push(this.innerText);
    });

    $('#subtotal_txt').text(eval(ammounts.join('+')));
    $( "#paid_amount_input" ).keyup();
    totalAmount();
}
add_ammounts();
function totalAmount() {
    $('#total_txt').text( $('#subtotal_txt').text());
}
function printContent(){
    var $printDoc = $('#print_doc');
    $('.print_hide').hide();
    $('#total_border').addClass('total_border');
    var headstr = "<html><head><title></title></head><body><nav></nav>";
    var footstr = "</body>";
    var newstr = $($printDoc).html();
    var oldstr = document.body.innerHTML;
    document.body.innerHTML = headstr + newstr + footstr;
    window.print();
    document.body.innerHTML = oldstr;
    setTimeout(retunObje, 5000);
    return false;
}
function generatePDF() {
    // $('#total_border').addClass('totat-print-border');

    $('#downloading-loder').fadeIn('fast');
    $('.print_hide').hide();
    $('#total_border').addClass('total_border');
    $('#exampleModalsave').modal('hide');
    var pdf_name;
    if ($('#filename').val()){
        var str = $('#filename').val();
        var regex = /[.,\s]/g;
        pdf_name = str.replace(regex, '');

    }else {
        pdf_name ='pdf';
    }


    const element =document.getElementById('print_doc');
    var opt = {
        margin:       0.12,
        filename:     pdf_name,
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 1,  },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf()
        .from(element)
        .set(opt)
        .save();

    setTimeout(retunObje, 7000);
    $('#downloading-loder').fadeOut('slow');
}
function retunObje(){
    $('.print_hide').fadeIn();
}
$('input[type="checkbox"]').on('click', function(){
    var propState = $(this).prop('checked'); // grab the checkbox checked state.
    propState === true ? propState = false : propState = true; // ternary operation. If box is checked uncheck it. if it is not checked check it.
    if(propState === false){
        $('.checkbox-click-hide').fadeIn();
        $('#labellll').text('on');
    }else if(propState === true){
        $('.checkbox-click-hide').fadeOut();
        $('#labellll').text('off');
    }
});
$('#paid_amount_input').keyup(function (e) {
    var paid_amount = $('#paid_amount_input').val();
    // console.log(paid_amount);
    // var balance_due_text = $('#balance_duee');
    var total_text = $('#total_txt').text();
    var answer =total_text-paid_amount;
    $('#balance_duee').text(answer);
});





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
    }
    displayTax();
    refreshTax();
    checkfortax();
    tabletax();
});
function deleteTax(event){
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    console.log();
    var db_id = $('#'+ event.id).parent().parent().find('td:first').text();
    console.log(db_id);
    // var dbid = $('#'+ event.id).attr('data-rowid');
    // var iii = String(event.id);
    // var dbid = document.getElementById(String(event.id)).dataset.rowid;
    // console.log(dbi, iii);
    db.transaction(function(tx) {
        tx.executeSql('delete from taxvalues where name=?', [db_id], function(transaction, result) {
            console.log(result);
            console.info('Record Deleted Successfully!');
        }, function(transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);

    function transError() {}
    function transSuccess() {

    }
    displayTax();
    refreshTax();
    tabletax();
    checkfortax();

}
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
                            '<i id="'+"t_delete" + i +'" data-rowid="'+ results.rows.item(i).rowid +'" style="margin-left: auto;" onclick="deleteTax(this)" class="fas fa-trash text-danger " data-toggle="tooltip" data-placement="right" title="Delete top row"></i>'
                            +'</td>'+
                        '</tr>')
                }
            }
        });
    });

}
function displayTax() {
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#tax_tbody_aa').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                var myid;
                for(var i = 0; i < results.rows.length; i++) {
                    // console.log("Result -> " + results.rows.item(i).firstname + " " + results.rows.item(i).lastname);
                    var id_row = i + 1;
                    myid = "t_delete_aa" + i;
                    $('#tax_tbody_aa').append(
                        ' <tr id="'+"tax_aa"+ i +'">'+
                            '<th scope="row">'+ id_row +'</th>'+
                            '<td>'+ results.rows.item(i).name +'</td>'+
                            '<td>'+ results.rows.item(i).value +'</td>'+
                            '<td>'+
                                '<i onclick="taxTotal(this)" data-name="'+results.rows.item(i).name+ '" data-value="'+results.rows.item(i).value+'"  id="'+"t_delete_aa" + i +'" style="margin-left: auto; cursor: pointer" class="btn btn-success" data-toggle="tooltip" data-placement="right" title="Use Tax">Use This Tax</i>' +
                                '<i onclick="undotaxTotal(this)" data-name="'+results.rows.item(i).name+ '" data-value="'+results.rows.item(i).value+'" id="'+"t_delete_ud" + i +'" style="margin-left: auto; cursor: pointer; display: none; "  class="btn btn-info ml-2" data-toggle="tooltip" data-placement="right" title="Use Tax">Undo</i>' +
                            '</td>'+
                        '</tr>'
                    )
                }
            }
        });
    });
}
function tabletax() {
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#tax_tbody_aa').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                var id = $('.tax-dropdown').length;
                // console.log(id);
                var myid = "table_tax_id_" + id ;
                $('.tax-dropdown:last').html(' ');
                $('.tax-dropdown:last').each(function () {
                    $(this).append(
                        ' <option class="op1" selected value="default">Choose</option>'
                    );
                    for(var i = 0; i < results.rows.length; i++) {

                        $(this).append(
                            '<option value="'+ results.rows.item(i).value +'">'+ results.rows.item(i).name +'</option>'
                        )

                    }
                    $('.tax-dropdown:last').attr('id', myid);
                    id++;
                })
                var id2 = $('.extra-tax-select').length;
                // console.log(id2);
                var myid2 = "table_extratax_id_" + id2 ;
                $('.extra-tax-select:last').html(' ');
                $('.extra-tax-select:last').each(function () {
                    $(this).append(
                        ' <option class="op1" selected value="0">Choose</option>'
                    );
                    for(var i = 0; i < results.rows.length; i++) {

                        $(this).append(
                            '<option value="'+ results.rows.item(i).value +'">'+ results.rows.item(i).name +'</option>'
                        )
                    }
                    $('.extra-tax-select:last').attr('id', myid2);
                    id++;
                })

            }
        });
    });
}
function taxTotal(e) {
    var oldTotal =  $('#total_txt').text();
    localStorage.setItem('oldTotal', oldTotal);
    var tottal_v = oldTotal;
    var value_name = e.dataset.value;
    console.log(value_name, oldTotal);
    $('#'+ e.id).parent().find('i:last').show();
    var new_value = Number(oldTotal)+Number(((value_name/100)*(oldTotal)));
    $('#total_txt').text(new_value);
    $('#paid_amount_input').keyup();
}
function undotaxTotal(e) {
    $('#total_txt').text(localStorage.getItem('oldTotal'));
    $('#'+ e.id).hide();
    $('#paid_amount_input').keyup();
}
function checkfortax() {
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#tax_tbody_aa').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                $('.no-tax-hide').show();
                $('.no-extra-hide').show();
                $('.rrr').attr('colspan', 4);
                $('#subtotal_row').show();
                $('.disco').attr('colspan', 4);

            }
            else {
                $('.no-tax-hide').hide();
                $('.no-extra-hide').hide();
                $('.rrr').attr('colspan', 2);
                $('#subtotal_row').hide();
                $('.disco').attr('colspan', 2);
                if($('.discountclass').length > 0){
                    $('#subtotal_row').show();
                }
            }
        });
    });
}
// var last_text;
// var last_val;
function calculateTaxTwo(e) {
    var tax_name = [];
    $('.calcit').each(function () {
        if(this.options[this.selectedIndex].text !== 'Choose'){
            tax_name.push(this.options[this.selectedIndex].text)
        }
    });
    var hist = {};
    tax_name.map( function (a) { if (a in hist) hist[a] ++; else hist[a] = 1; } );
    // console.log( JSON.parse(JSON.stringify(hist)));
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);

    for (const [name, instance] of Object.entries(hist)){
       // console.log(name, instance);
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM taxvalues WHERE name=?", [name], function(tx, results) {
                // console.log(results.rows.item(0).value);
                $('.tax_txt_'+name).text((results.rows.item(0).value)*instance);
            });
        });



    }
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                for(var i = 0; i < results.rows.length; i++) {
                    if( ! tax_name.includes(results.rows.item(i).name)){
                        $('.'+results.rows.item(i).name).remove();
                    }
                }
            }
        });
    });
    finalltaxdiscountmath();
}
function calculateTaxOne(e) {
    // console.log(e.id);
    // console.log(e.value);
    var kkk =e.options[e.selectedIndex].text;
    // console.log(kkkk);
    if(($('.tax-sub').length !== 0)){
        if($('.'+kkk).length === 0){
            var valuee=$('.'+kkk).find('input:first').val();
            // console.log(valuee);
            if(e.options[e.selectedIndex].text  !== valuee ){
                // console.log('if');
                if(! $('.'+ kkk).length !== 0 ) {
                    if (e.options[e.selectedIndex].text !== 'Choose') {
                        var html = '<tr data-taxsub="'+ kkk +'" class="tax-sub ' +kkk+ '">' +
                            '<td style="border-bottom-color: #ffffff;border-left-color: #ffffff" class="py-0 rrr" colspan="4"></td>' +
                            '<td class="py-0">' +
                            '<label for="bs_subTotal" class="no-label"></label>' +
                            '<input type="text" value="' + kkk.toUpperCase() + ':" class="form-control no-border tax-input input_title_smn text-bold-placehoder" id="bs_subTotal" placeholder="' + kkk.toUpperCase() + ':">' +
                            '</td>' +
                            ' <td colspan="2" class="text-bold-custom">' +
                                '<span>'+
                                    '<span>Ksh </span>' +
                                    '<span data-taxx="'+ kkk +'"  class="xui tax_txt_'+ kkk +'">' + e.value + '</span>' +
                                '</span>'+

                            '</td>' +
                            '</tr>';
                        $(html).insertAfter('.tax-sub:last');

                    }
                }else {
                    console.log('exist');
                }
            }
        }
    }
    else {
        console.log('first');
        var html =  '<tr data-taxsub="'+ kkk +'" class="tax-sub ' + kkk + '">' +
            '<td style="border-bottom-color: #ffffff;border-left-color: #ffffff" class="py-0 rrr" colspan="4"></td>'+
            '<td class="py-0">'+
            ' <label for="bs_subTotal" class="no-label"></label>'+
            '<input type="text" value="'+ kkk.toUpperCase() +':" class="form-control no-border tax-input input_title_smn text-bold-placehoder" id="bs_subTotal" placeholder="'+ kkk.toUpperCase() +':">'+
            '</td>'+
            ' <td colspan="2" class="text-bold-custom">' +
                '<span>'+
                    '<span>Ksh </span>' +
                    '<span data-taxx="'+ kkk +'"  class="xui tax_txt_'+ kkk +'">' + e.value + '</span>' +
                '</span>'+

            '</td>'+
            '</tr>';
        $(html).insertAfter('.tax-sub:last');
        finalltaxdiscountmath()
    }
    // recalculatetax(kkk);
}
checkfortax();
tabletax();



$('#discount_form_submit').click(function (e) {
    checkfortax();

    var discount_value = $("#discount_value").val();
    var discount_name = $("#discount_name").val();
    var ddd = $('#subtotal_txt').text();
    var summ = 0;
    if(discount_name === 'Percentage'){
        summ = '-' + Number(discount_value/100)*Number(ddd);
    }else if (discount_name === "Cash") {
        summ= '-' + discount_value;

    }
    if($('.discountclass').length !== 0) {
        // $('#usediscount').modal('hide');
        // console.log('if');
        $('.discountclass').find('.doit').text(summ);
    }else {
        // console.log('else');

        var htmll = '<tr  class="discountclass">' +
            '<td style="border-bottom-color: #ffffff;border-left-color: #ffffff" class="py-0 disco" colspan="4"></td>' +
            '<td class="py-0">' +
            '<label for="bs_subTotall" class="no-label"></label>' +
            '<input type="text" value="Discount:" class="form-control no-border tax-input input_title_smn text-bold-placehoder" id="bs_subTotall" placeholder="Discount:">' +
            '</td>' +
            '<td colspan="2" class="text-bold-custom">' +
            '<span>Ksh </span>' +
            '<span class="xui doit">' + summ + '</span>' +
            '</td>' +
            '</tr>';
        // $('#usediscount').modal('hide');
        $(htmll).insertAfter('#subtotal_row');

    }

    finalltaxdiscountmath();
    // displayDiscounts();
    // refreshDiscount();
});
function refreshDiscount(){
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#discount_tbody').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM discount", [], function(tx, results) {
            if(results.rows.length > 0) {
                for(var i = 0; i < results.rows.length; i++) {
                    // console.log("Result -> " + results.rows.item(i).firstname + " " + results.rows.item(i).lastname);
                    var id_row = i + 1;
                    $('#discount_tbody').append(
                        ' <tr id="'+"discount"+ i +'">'+
                        '<th scope="row">'+ id_row +'</th>'+
                        '<td>'+ results.rows.item(i).name +'</td>'+
                        '<td>'+ results.rows.item(i).value +'</td>'+
                        '<td>'+
                        '<i id="'+"discount_delete" + i +'" style="margin-left: auto;" onclick="deleteDiscount(this)" class="fas fa-trash text-danger " data-toggle="tooltip" data-placement="right" title="Delete discount"></i>'
                        +'</td>'+
                        '</tr>')
                }
            }
        });
    });
}
function deleteDiscount(event){
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    console.log();
    var db_id = $('#'+ event.id).parent().parent().find('th:first').text();
    console.log(db_id);
    db.transaction(function(tx) {
        tx.executeSql('delete from discount where rowid=?', [db_id], function(transaction, result) {
            console.log(result);
            console.info('Record Deleted Successfully!');
        }, function(transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);

    function transError() {

    }function transSuccess() {

    }
    refreshDiscount();
    displayDiscounts();
}
function displayDiscounts() {
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#tax_tbody_bb').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM discount", [], function(tx, results) {
            if(results.rows.length > 0) {
                for(var i = 0; i < results.rows.length; i++) {
                    var id_row = i + 1;
                    $('#tax_tbody_bb').append(
                        ' <tr id="'+"discount_bb"+ i +'">'+
                            '<th scope="row">'+ id_row +'</th>'+
                            '<td>'+ results.rows.item(i).name +'</td>'+
                            '<td>'+ results.rows.item(i).value +'</td>'+
                            '<td>'+
                                '<i onclick="makeDiscount(this)" data-name="'+results.rows.item(i).name+ '" data-value="'+results.rows.item(i).value+'"  id="'+"discount_delete_bb" + i +'" style="margin-left: auto; cursor: pointer" class="btn btn-success" data-toggle="tooltip" data-placement="right" title="Use Tax">Use This Discount</i>' +
                                '<i onclick="undoDiscount(this)" data-name="'+results.rows.item(i).name+ '" data-value="'+results.rows.item(i).value+'"  id="'+"discount_delete_ud" + i +'" style="margin-left: auto; cursor: pointer; display: none;" class="btn btn-warning" data-toggle="tooltip" data-placement="right" title="Undo">Undo</i>' +

                            '</td>'+
                        '</tr>')
                }
            }
        });
    });
}
function makeDiscount(e) {
    var oldTotalnew =  $('#total_txt').text();
    localStorage.setItem('oldTotalnew', oldTotalnew);
    var value = e.dataset.value;
    var name = e.dataset.name;
    var total =0 ;
    console.log(name);
    $('#'+ e.id).parent().find('i:last').show();
    if(name === 'Percentage'){

        total =((100-Number(value))/100) * Number(oldTotalnew);
        console.log(total);
        $('#total_txt').text(total);
    }
    else if(name === 'Cash'){
        console.log(name);
        total = Number(oldTotalnew) - Number(value);
        console.log(total);
        $('#total_txt').text(total);
    }
    $('#paid_amount_input').keyup();

}
function undoDiscount(e) {
    $('#total_txt').text(localStorage.getItem('oldTotalnew'));
    $('#'+ e.id).hide();
    $('#paid_amount_input').keyup();
}
displayDiscounts();



function finalltaxdiscountmath(){
    var itma =[];
    for( v of $('.xui')){
        // console.log(v.innerText);
        itma.push(Number(v.innerText));

    }
    console.log(itma);
    $('#total_txt').text(
        Number($('#subtotal_txt').text())+eval(itma.join('+'))
    );
    // $('#subtotal_row').show();


}















var $right = $('#right');
var $left = $('#left');
var $workTitle = $('#work-title');
$('#Right-Logo').click(function () {
    $left.fadeOut(function () {
        $right.fadeIn();
        $workTitle.fadeIn();
    });

});
$('#Left-logo').click(function () {
    $right.fadeOut(function () {
        $workTitle.fadeOut();
        $left.fadeIn();
    });
});


$(".modal-header").on("mousedown", function(mousedownEvt) {
    var $draggable = $(this);
    var x = mousedownEvt.pageX - $draggable.offset().left,
        y = mousedownEvt.pageY - $draggable.offset().top;
    $("body").on("mousemove.draggable", function(mousemoveEvt) {
        $draggable.closest(".modal-dialog").offset({
            "left": mousemoveEvt.pageX - x,
            "top": mousemoveEvt.pageY - y
        });
    });
    $("body").one("mouseup", function() {
        $("body").off("mousemove.draggable");
    });
    $draggable.closest(".modal").one("bs.modal.hide", function() {
        $("body").off("mousemove.draggable");
    });
});























