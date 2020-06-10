// collectDate();
InlineEditor
    .create( document.querySelector( '#ck1' ) )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck2' ) )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck3' ) )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck4' ) )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck5' ) )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck6' ) )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#validationTextarea' ) )
    .catch( error => {
        console.error( error );
    } );
// InlineEditor
//     .create( document.querySelector( '#cdate1' ) )
//     .catch( error => {
//         console.error( error );
//     } );
// InlineEditor
//     .create( document.querySelector( '#bs_date_no_text' ) )
//     .catch( error => {
//         console.error( error );
//     } );

// InlineEditor
//     .create( document.querySelector( '#ck11' ) )
//     .catch( error => {
//         console.error( error );
//     } );
// InlineEditor
//     .create( document.querySelector( '#ck12' ) )
//     .catch( error => {
//         console.error( error );
//     } );

// function kkk() {
//     // var cloned_contents = document.getElementsByClassName('mybad');
//     // for(x of cloned_contents){
//     //     var id = '#' + x.id;
//     //    InlineEditor
//     //         .create( document.querySelector( id ) )
//     //         .catch( error => {
//     //             console.error( error );
//     //         } );
//     //
//     //
//     // }
// }
// kkk();


function vuv() {
    var tab_contents = document.getElementsByClassName('table_contents');
    for(x of tab_contents){
        var id = '#' + x.id;
        InlineEditor
        .create( document.querySelector( id ) )
        .catch( error => {
            console.error( error );
        } );
    }
}
vuv();