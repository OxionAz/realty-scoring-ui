(function( $ ){
	
	//// ---> �������� �� ������������� �������� �� ��������
	jQuery.fn.exists = function() {
	   return jQuery(this).length;
	}

	$(function() {
		
		$('.enter').submit(function(){ // �e�e��a���ae� ��e ��� �o����� o���a���				
			
			var form = $(this);	
			var exep = $('.exeption.ent');
			var exep_1 = exep.find('#exep_1');
			var exep_2 = exep.find('#exep_2');
			var data = form.serialize(); // �o��o�a����ae� �a���e
			
			$.ajax({ // �����a������e� ajax �a��o�
			   type: 'POST', // o���a���e� � POST �o��a�e, �o��o GET
			   url: 'assets/php/mysql-form-check.php', // ���� �o o��a�o����a, � �a� o� �e��� � �o� �e �a��e
			   dataType: 'json', // o��e� ��e� � json �o��a�e
			   data: data, // �a���e ��� o���a���
		       beforeSend: function(data) { // �o����e �o o���a���
		            form.find('.button_log').attr('disabled', 'disabled'); // �a����e�, o������� ��o���, ��o�� �e �a�� �o 100 �a�
		          },
		       success: function(data){ // �o����e �o��e ��a��o�o o��a�e��� � �e��e�� � �o���e��� o��e�a
		       		switch(data){
						case true: $(location).attr('href','menu.php'); break;
						case false: break;
						case 1: {
							exep.fadeIn('slow');
							exep_1.fadeIn('slow');
							exep_2.hide();
						} break;
						case 2: {
							exep.fadeIn('slow');
							exep_2.fadeIn('slow');
							exep_1.hide();
						} break;
					}
		         },
		       error: function (xhr, ajaxOptions, thrownError) { // � ����ae �e��a��o�o �a�e��e��� �a��o�a � �e��e��
		            //alert(xhr.status); // �o�a�e� o��e� �e��e�a
		            //alert(thrownError); // � �e��� o�����
		         },
		       complete: function(data) { // �o����e �o��e ���o�o ���o�a
		            form.find('.button_log').prop('disabled', false); // � ���o� ����ae ������� ��o��� o��a��o
		         }     
			});
		
		return false; // �����ae� ��a��a����� o���a��� �o���
		});

		$('.enter').each(function(){
			
			var form = $(this),	btn = form.find('.button_log');			
			
			// ������� �������� ����� �����
			function checkInput(){				
				form.find('.input').each(function(){
					if($(this).val() == ''){
						$(this).addClass('empty');
					} else {
						$(this).removeClass('empty');
					}
				});
			}
			
			// ������� ��������� ������������� �����
			function lightEmpty(){
				form.find('.empty').css({'background-color':'#FFC4C2', 'border-color': '#ff7496'});
				setTimeout(function(){
					form.find('.empty').removeAttr('style');
				},800);
			}
			
			// ������� ��������� ������������� �����
			function checkButton(){
				checkInput();
				var sizeEmpty = form.find('.empty').size();
				if(sizeEmpty > 0){
					if(!btn.hasClass('bad')){						
						btn.addClass('bad')
					}
				} else {
					btn.removeClass('bad')
				}
			}

			btn.click(function(){
				checkButton();
				if($(this).hasClass('bad')){
					lightEmpty();
					return false
				} else {
					form.submit();
				}
			});
			
		});
		
		$('.button_reg').click(function(){
			$(':input','.enter').not(':button, :submit, :hidden').val('');
			$('.exeption.ent').hide();
			$('#log_in').hide();
			$('#log_up').fadeIn('slow');
		});
		
	});

})( jQuery );