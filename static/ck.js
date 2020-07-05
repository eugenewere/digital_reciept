InlineEditor
    .create( document.querySelector( '#ck1' ),{
            removePlugins: [ 'Insert image', 'Insert table' ],
            toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],

        })
    .catch( error => {

    } );
InlineEditor
    .create( document.querySelector( '#ck2' ),{
            removePlugins: [ 'Insert image', 'Insert table' ],
            toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
        }  )
    .catch( error => {

    } );
InlineEditor
    .create( document.querySelector( '#ck3' ),{
            removePlugins: [ 'Insert image', 'Insert table' ],
            toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
        }  )
    .catch( error => {

    } );
InlineEditor
    .create( document.querySelector( '#ck4' ),{
            removePlugins: [ 'Insert image', 'Insert table' ],
            toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
        }  )
    .catch( error => {

    } );
InlineEditor
    .create( document.querySelector( '#ck5' ),{
            removePlugins: [ 'Insert image', 'Insert table' ],
            toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
        }  )
    .catch( error => {

    } );
InlineEditor
    .create( document.querySelector( '#ck6' ),{
            removePlugins: [ 'Insert image', 'Insert table' ],
            toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
        }  )
    .catch( error => {

    } );
InlineEditor
    .create( document.querySelector( '#validationTextarea' ),{
        removePlugins: [ 'Insert image', 'Insert table' ],
        toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
    })
    .catch( error => {

    } );
InlineEditor
    .create( document.querySelector( '#cknotes' ),{
        removePlugins: [ 'Insert image', 'Insert table' ],
        toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
    })
    .catch( error => {

    } );
InlineEditor
    .create( document.querySelector( '#ckdes' ),{
        removePlugins: [ 'Insert image', 'Insert table' ],
        toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
    })
    .catch( error => {

    } );InlineEditor
    .create( document.querySelector( '#ckqty' ),{
        removePlugins: [ 'Insert image', 'Insert table' ],
        toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
    })
    .catch( error => {

    } );InlineEditor
    .create( document.querySelector( '#ckunt' ),{
        removePlugins: [ 'Insert image', 'Insert table' ],
        toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
    })
    .catch( error => {

    } );InlineEditor
    .create( document.querySelector( '#cktax' ),{
        removePlugins: [ 'Insert image', 'Insert table' ],
        toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
    })
    .catch( error => {

    } );InlineEditor
    .create( document.querySelector( '#ckamtt' ),{
        removePlugins: [ 'Insert image', 'Insert table' ],
        toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
    })
    .catch( error => {

    } );

function vuv() {
    var tab_contents = document.getElementsByClassName('table_contents');
    for(var x of tab_contents){
        var id = '#' + x.id;
        InlineEditor
            .create( document.querySelector( id ),{
                removePlugins: [ 'Insert image', 'Insert table' ],
                toolbar: ['heading','Paragraph', 'Highlight', 'bold', 'italic', 'FontFamily','FontSize','FontColor','FontBackgroundColor','Indent','IndentBlock','TextTransformation','blockQuote','Essentials','Autoformat', 'undo', 'redo','link','bulletedList', 'numberedList'],
            } )
            .catch( error => {

            });  }  }
vuv();
