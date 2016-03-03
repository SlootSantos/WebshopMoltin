$(function() {

    // Breaks on required fields!
    //$('textarea#description').summernote({
    //    toolbar: [
    //      ['style', ['style']],
    //      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'fontsize']],
    //      ['color', ['color']],
    //      ['para', ['ul', 'ol', 'paragraph']],
    //      ['table', ['table']],
    //      ['insert', ['link', 'picture', 'video']],
    //      ['extra', ['codeview']],
    //      ['help', ['help']]
    //    ]
    //});

	$('input[name=sku]').focus().keypress(function(e){if(e.which==13){e.preventDefault();}});
	moltin.bind_barcode(function(b) {
		var t = $('input[name=sku]');
		var p = t.parent().parent(); p.removeClass('has-error');
		t.val(b); $('input[name=title],input[name=slug],textarea[name=description]').val('');
		$.ajax({dataType: "json", url: '/ajax/barcode/'+b,
			error: function() { noty({type:'error',layout:'topRight',text:b+" was not found."}); },
			success: function(d) {
				noty({type:'success',layout:'topRight',text:"Available data for "+d.title+" added."});
				$('input[name=title]').val(d.title+' ('+d.weight+')').keyup();
				$('textarea[name=description]').val(d.title+' - '+d.weight).keyup();
			}
		});
	});

    $('#createVariation, #editVariation').on('shown.bs.modal', function(ev) {
        $.get($(ev.relatedTarget).data('href'), function(data) {
            $(ev.target).html(data); var f = $('#mod_price'); var v = ( f.val().length > 0 ? f.val() : '+0.00' ); var m = v.substring(0, 1), n = v.substring(1, v.length); var c = ( m == '+' ? 'plus' : ( m == '-' ? 'minus' : 'equals' ) );
            f.parent().html('<div class="input-group"><input type="hidden" name="mod_switch" value="'+m+'" /><span class="input-group-addon mod-switch" style="cursor:pointer"><i class="fa '+c+'">'+m+'</i></span>'+f.parent().html()+'</div>');
            $('#mod_price').val(n);
            $('.mod-switch').on('click', function(ev) {
                var i = $(this).find('i'), f = $('input[name=mod_switch]');
                if ( i.hasClass('plus') ) { i.removeClass('plus').addClass('minus').html('-'); f.val('-'); }
                else if ( i.hasClass('minus') ) { i.removeClass('minus').addClass('equals').html('='); f.val('='); }
                else { i.removeClass('equals').addClass('plus').html('+'); f.val('+'); }
            });
        });
    });

  	$('#createModifier, #editModifier').on('shown.bs.modal', function(ev) {
  		$.get($(ev.relatedTarget).data('href'), function(data) {
        	renderSelect();
        });
  	});

});
