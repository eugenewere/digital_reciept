checkfortax();
refreshTax();
refreshDiscount();
displayTax();


// $(function(){
//     $("table.resizable").colResizable();
// });

var monthes =['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug', 'Sept','Oct','Nov','Dec'];
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()).padStart(2, '0');
var yyyy = today.getFullYear();
today =monthes[Number(mm)]+ '/' + dd + '/' + yyyy;
$('#bs_date_no_text').attr('placeholder', today);
$('#bs_date_no_text').attr('value', today);
// console.log(today);
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
        .find('.table_contents').attr('id', tbc)
        .parent().parent().find('th:first p').text('New Product')
        .parent().parent().parent().find('th:nth-child(2) input').val(1)
        .parent().parent().find('th:nth-child(3) input').val(100);



    $('#'+new_id).parent().parent().find('.seltx').text(0);
    $('#'+new_id).parent().parent().find('.seltx').attr('data-seltax', '');
    addItems();
    add_ammounts();
    tabletax();
    vuv();
    finalltaxdiscountmath();
});


function deleteRow(e) {
    var $idd = '#'+ e.id;
    $($idd).parent().parent().remove();
    add_ammounts();
    $('#table tbody').find('select').trigger("change");
    $( "#paid_amount_input" ).keyup();
}
function insertDecimal(num) {
    return (num / 100).toFixed(2);
}
function addItems() {
    $('.tab_row ').each(function (event) {
        var val_1 = $(this).find('input:eq(0)').val();
        var val_2 = $(this).find('input:eq(1)').val();
        $(this).find('span:eq(2)').text(Number(val_1) * Number(val_2));

    });
    add_ammounts();
    finalltaxdiscountmath();

}
addItems();
function calculat(e) {
    var $idd = $(e).parent().parent().attr('id');
    var $selectform = $('#'+$idd).find('select')
    // console.log($idd);

        $('#'+$idd).find('input').blur(function () {
            console.log(this);
            var val_1 = $('#'+$idd).find('input:eq(0)').val();
            var val_2 = $('#'+$idd).find('input:eq(1)').val();
            var summ = Number(val_1) * Number(val_2);
            console.log(summ);
            $('#'+$idd).find('span.ammounts_total').text(summ.toFixed(0));
            $($selectform).trigger("change");
            add_ammounts();
            finalltaxdiscountmath();

        });


}
function add_ammounts(){
    var ammounts = [];
    $('.tab_row:visible .ammounts_total').each(function () {
       ammounts.push(Number(this.innerText));
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


function editContent(){
    var rrr_colspan= $('.rrr').attr('colspan');
    $('.print_hide').fadeOut();

    $('#navb').slideUp();
    $('.returnPage').show();
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#tax_tbody_aa').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                var n = Number(rrr_colspan)-1;
                console.log(n);
                $('.disco').attr('colspan', 2);
                $('.print_hide2').fadeOut();
                $('.rrr').attr('colspan', n);
                $('.ccd').attr('colspan', 2);
            }
        });
    });

}
function showContent(){
    var rrr_colspan= $('.rrr').attr('colspan');
    $('.print_hide').fadeIn();
    $('#navb').slideDown();
    $('.returnPage').fadeOut();

    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    $('#tax_tbody_aa').html(' ');
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                var n = Number(rrr_colspan)+1;
                // console.log(n);
                $('.print_hide2').fadeIn();
                $('.rrr').attr('colspan', n);
                $('.ccd').attr('colspan', 1);
            }
        });
    });

    checkfortax();
    checkImage();
}
function checkImage(){
    if($('#image').css('display') === 'block'){
        $('#image22').hide();
    }else {
        $('#image').hide();
        // $('#image').attr('src','static/No-Image-Available.jpg')
        $('#image22').show();
        $('img#image22').css('display','block');
    }
}
function retunObje(){
    $('#downloading-loder').fadeOut('slow');
    $('.returnPage').fadeOut();
    $('#navb').slideDown();
    $('.print_hide').fadeIn();
    $('.print_hide2').fadeIn();
    $('.ccd').attr('colspan', 1);
    // $('#image').attr('src','static/No-Image-Available.jpg')
    // $('.paidamm').hide(function () {
    //     $('#paid_amount_input').show();
    // });
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                $('.rrr').attr('colspan', 4);
                $('.disco').attr('colspan', 4);

            }
            else {
                $('.rrr').attr('colspan', 2);
                $('.disco').attr('colspan', 2);

            }
        });
    });
    checkfortax();
    checkImage();
}
function generatePDF() {
    $('#exampleModalsave').modal('hide');
    $('#downloading-loder').fadeIn('fast');
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
        margin:       0.21,
        filename:     pdf_name,
        image:        {type: 'jpeg', quality: 1},
        html2canvas:  {
            scale: 13,
            quality: 4,
            imageTimeout:0,
            logging: true,
            letterRendering: true,
            useCORS: true
        },
        jsPDF:  { unit: 'in', format: [8.5, 16.6], orientation: 'portrait', floatPrecision:'smart' }
    };


    html2pdf()
        .set(opt)
        .from(element)
        .toContainer()
        .toCanvas()
        .toImg()
        .toPdf()
        .save();

    setTimeout(retunObje, 7000);

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
    let paid_amount = $(this).val();
    $('.paidamm').text(paid_amount);
    // console.log(paid_amount);
    // var balance_due_text = $('#balance_duee');
    let total_text = $('#total_txt').text();
    let answer =Number(total_text) - paid_amount;
    $('#balance_duee').text(answer.toFixed(0));
});
function removSpaces(k){
    return k.replace(/ /g,"_");
}
$('#tax_form_submit').click(function (e) {
    var tax_value = $("#tax_input").val();
    var tax_name = removSpaces($("#tax_name").val())
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    // console.log(tax);
    if(tax_value.length === 0 && tax_name.length === 0){
        $('#alert_dangerr').fadeIn()
    }else {
        $('#alert_dangerr').fadeOut();
        $('#spinner').show();
        // setTimeout(localStorage.setItem(tax_name, tax),3000);
        $('.tax-dropdown').each(function (){
            $(this).append(
                '<option value="'+ tax_value +'">'+ tax_name +'</option>'
            )
        })
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM taxvalues WHERE name=?", [tax_name], function(tx, results) {
                if(results.rows.length === 0 ){
                    tx.executeSql("INSERT INTO taxvalues (name, value) VALUES (?,?)", [tax_name, tax_value]);
                    $('#alert_success').fadeIn();
                    $('#spinner').fadeOut();
                }else {
                    $('#alert_exists').show();
                    $('#spinner').fadeOut();

                }
            });

        });

    }
    displayTax();
    refreshTax();
    checkfortax();
    // tabletax();
});
function deleteTax(event){
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    console.log();
    var db_id = $('#'+ event.id).parent().parent().find('td:first').text();
    console.log(db_id);


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
        jQuery(".calcit option").filter(function(){
            return $.trim($(this).text()) ===  db_id;
        }).remove();
        $('[data-taxsub='+ db_id +']').remove();
        // $('.calcit select').each(function () {
        //     $(this).trigger("change");
        // });
    }
    displayTax();
    refreshTax();
    // tabletax();
    checkfortax();
    finalltaxdiscountmath();


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
                $('.tax-dropdown:last').each(function (){
                    var vallue = $(this).val();
                    $(this).append(
                        ' <option class="op1" selected value="0">Choose</option>'
                    );
                    for(var i = 0; i < results.rows.length; i++) {
                        $(this).append(
                            '<option value="'+ results.rows.item(i).value +'">'+ results.rows.item(i).name +'</option>'
                        )}
                    $('.tax-dropdown:last').attr('id', myid);
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
    // var new_value = Number(oldTotal)+Number(((value_name/100)*(oldTotal)));
    // $('#total_txt').text(new_value);
    $('#paid_amount_input').keyup();
}
function undotaxTotal(e) {
    $('#total_txt').text(localStorage.getItem('oldTotal'));
    $('#'+ e.id).hide();
    $('#paid_amount_input').keyup();
}
function checkfortax() {
    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            if(results.rows.length > 0) {
                $('.no-tax-hide').show();
                $('.no-extra-hide').show();
                $('.rrr').attr('colspan', 3);
                $('#subtotal_row').show();
                $('.disco').attr('colspan', 3);

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
    // checkImage();
}
function calculateTaxTwo(e) {
    var $spn = $(e).parent().find('span');
    var $selval =$(e).val();
    // if (e.options[e.selectedIndex].text !== 'Choose'){
        var $seltotal =  $(e).parent().parent().parent().find('span:last').text();
        var $seltxt = e.options[e.selectedIndex].text;
        $spn.attr('data-seltax', $seltxt);
        $spn.text((Number($selval))/100 * Number($seltotal));
    // }
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
    db.transaction(function (tx) {
        tx.executeSql("SELECT name, value FROM taxvalues", [], function(tx, results) {
            // console.log(results.rows.item(0).value);
            for(var i = 0; i < results.rows.length; i++) {
                var fff = [];
                $('[data-seltax=' + results.rows.item(i).name + ']').each(function () {
                    fff.push($(this).text());
                })
                $('.tax_txt_' + results.rows.item(i).name).text(eval(fff.join('+')));
            }
            console.log(fff);
            fff.length = 0;
        });
    });

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
                                        '<td style="border-bottom-color: #ffffff !important;border-left-color: #ffffff !important; border-top-color: #ffffff !important;" class="py-0 rrr" colspan="3"></td>' +
                                        '<td class="" style="padding: 6px 6px !important;">' +
                                        '<label for="bs_subTotal" class="no-label"></label>' +
                                        '<input style="width: 85px;" type="text" value="' + kkk.toUpperCase().replace(/_/g," ") + ':" class="no-border tax-input input_title_smn text-bold-placehoder" id="bs_subTotal" placeholder="' + kkk.toUpperCase() + ':">' +
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
                    else {
                        console.log('Choosen');
                        setTimeout(cvui,1000)
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
            '<td style="border-bottom-color: #ffffff !important; border-left-color: #ffffff !important;  border-top-color: #ffffff !important; " class="py-0 rrr" colspan="4"></td>'+
            '<td class="" style="padding: 6px 6px !important;">'+
            ' <label for="bs_subTotal" class="no-label"></label>'+
            '<input style="width: 85px;" type="text" value="'+ kkk.toUpperCase() +':" class=" no-border tax-input input_title_smn text-bold-placehoder" id="bs_subTotal" placeholder="'+ kkk.toUpperCase() +':">'+
            '</td>'+
            ' <td colspan="2" class="text-bold-custom">' +
                '<span>'+
                    '<span>Ksh </span>' +
                    '<span data-taxx="'+ kkk +'"  class="xui tax_txt_'+ kkk +'">' + e.value + '</span>' +
                '</span>'+

            '</td>'+
            '</tr>';
        $(html).insertAfter('.tax-sub:last');
    }
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
        if(discount_value <= 0){
            $('.discountclass').remove();
        }else {
            $('.discountclass').find('.doit').text(summ);
        }

    }else {
        // console.log('else');
        if(discount_value > 0) {
            var htmll = '<tr class="discountclass tax_sub">' +
                '<td style="border-bottom-color: #ffffff !important; border-left-color: #ffffff !important; border-top-color: #ffffff !important;" class="py-0 disco" colspan="4"></td>' +
                '<td class="" style="padding: 6px 6px !important;">' +
                '<label for="bs_subTotall" class="no-label"></label>' +
                '<input style="width: 85px;" type="text" value="Discount:" class=" no-border tax-input input_title_smn text-bold-placehoder" id="bs_subTotall" placeholder="Discount:">' +
                '</td>' +
                '<td colspan="2" class="text-bold-custom">' +
                '<span>Ksh </span>' +
                '<span class="xui doit">' + summ + '</span>' +
                '</td>' +
                '</tr>';
            // $('#usediscount').modal('hide');
            $(htmll).insertAfter('#subtotal_row');
        }else {

        }

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
        $( "#paid_amount_input" ).keyup();
    }
    else if(name === 'Cash'){
        console.log(name);
        total = Number(oldTotalnew) - Number(value);
        console.log(total);
        $('#total_txt').text(total);
        $( "#paid_amount_input" ).keyup();
    }


}
function undoDiscount(e) {
    $('#total_txt').text(localStorage.getItem('oldTotalnew'));
    // var t = document.getElementById('total_txt').innerText
    $('#'+ e.id).hide();
    $('#paid_amount_input').keyup();
}
displayDiscounts();
function finalltaxdiscountmath(){
    setTimeout(cvui,1000);
}
function cvui() {
    var itma =[];
    var xui = document.getElementsByClassName('xui');
    for( v of xui ){
        itma.push(Number(v.innerText));
    }
    // console.log(xui);
    if(xui.length > 0){
        $('#total_txt').text(
            Number($('#subtotal_txt').text())+eval(itma.join('+'))
        );
        itma.length = 0;
    }else{
        itma.push(0);
        $('#total_txt').text(
            Number($('#subtotal_txt').text())+eval(itma.join('+'))
        );
    }
    $( "#paid_amount_input" ).keyup();
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

$("#image").draggable();

$('#img_label22>#mydropdown')
$('.dropdown-keep-open').on('hide.bs.dropdown', function (e) {
    if (!e.clickEvent) {
        // There is no `clickEvent` property in the `e` object when the `button` (or any other trigger) is clicked.
        // What we usually want to happen in such situations is to hide the dropdown so we let it hide.
        return true;
    }

    var target = $(e.clickEvent.target);

    return !(target.hasClass('dropdown-keep-open') || target.parents('.dropdown-keep-open').length);
});























