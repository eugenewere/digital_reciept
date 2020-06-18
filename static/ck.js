// import Font from '@ckeditor/ckeditor5-font/src/font';
// import Font from '@ckeditor/ckeditor5-font/src/fontfamily'
// import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
// const Font = import('fontfamily');
// var FontFamily = require('@ckeditor/ckeditor5-font/src/fontfamily');
// import fontfamily from  '/@ckeditor/ckeditor5-font/src/fontfamily'
// const FontFamily = import('fontfamily/fontfamily')
// const path = require( '@ckeditor/ckeditor5-font/src/fontfamily' );




InlineEditor
    .create( document.querySelector( '#ck1' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
            toolbar: ['enter', '|', 'heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'fontFamily','undo', 'redo','link'],

        }  )


    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck2' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
             toolbar: ['enter', '|', 'heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'fontFamily','undo', 'redo','link'],
        }  )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck3' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
            toolbar: ['enter', '|', 'heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'fontFamily','undo', 'redo','link'],
        }  )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck4' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
             toolbar: ['enter', '|', 'heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'fontFamily','undo', 'redo','link'],
        }  )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck5' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
             toolbar: ['enter', '|', 'heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'fontFamily','undo', 'redo','link'],
        }  )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#ck6' ),{
            removePlugins: [ 'Insert image', 'Insert table', 'blockQuote', 'numberedList' ],
             toolbar: ['enter', '|', 'heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'fontFamily','undo', 'redo','link'],
        }  )
    .catch( error => {
        console.error( error );
    } );
InlineEditor
    .create( document.querySelector( '#validationTextarea' ))
    .catch( error => {
        console.error( error );
    } );
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
