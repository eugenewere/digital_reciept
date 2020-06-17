function vuv() {
    var tab_contents = document.getElementsByClassName('table_contents');
    for(var x of tab_contents){
        var id = '#' + x.id;
        InlineEditor
            .create( document.querySelector( id ),{
                removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
                toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList', ]
            } )
            .catch( error => {
                console.error( error );
            });  }  }
vuv();
// import Font from '@ckeditor/ckeditor5-font/src/font';
// import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
// var Font = require('@ckeditor/ckeditor5-font/src/font');
// var FontFamily = require('@ckeditor/ckeditor5-font/src/fontfamily');
// import fontfamily from  '/@ckeditor/ckeditor5-font/src/fontfamily'
// var fontfamily = require('@ckeditor/ckeditor5-font/src/fontfamily');
InlineEditor
    .create( document.querySelector( '#ck1' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
            toolbar: [ 'heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'fontFamily', 'undo', 'redo',],

        }  )

    .catch( error => {1
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck2' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
            toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList','font' ]
        }  )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck3' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
            toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList','font' ]
        }  )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck4' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
            toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList', ]
        }  )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck5' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
            toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList', ]
        }  )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck6' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
            toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList', ]
        }  )
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


