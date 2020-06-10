(function( $ ){
	
	//// ---> �������� �� ������������� �������� �� ��������
	jQuery.fn.exists = function() {
	   return jQuery(this).length;
	}

	$(function() {
		
		$('.account').submit(function(){
			
			var form = $(this);
			var exep = $('.exeption.reg');
			var data = form.serialize(); // �o��o�a����ae� �a���e
			
			$.ajax({ // �����a������e� ajax �a��o�
			   type: 'POST', // o���a���e� � POST �o��a�e, �o��o GET
			   url: 'assets/php/mysql-form-check.php', // ���� �o o��a�o����a, � �a� o� �e��� � �o� �e �a��e
			   dataType: 'json', // o��e� ��e� � json �o��a�e
			   data: data, // �a���e ��� o���a���
		       beforeSend: function(data) { // �o����e �o o���a���
		            form.find('.button_add').attr('disabled', 'disabled'); // �a����e�, o������� ��o���, ��o�� �e �a�� �o 100 �a�
		          },
		       success: function(data){ // �o����e �o��e ��a��o�o o��a�e��� � �e��e�� � �o���e��� o��e�a
		       		switch(data){
						case true: $(location).attr('href','account.php'); break;
						case false: break;
						case 1: {
							exep.fadeIn('slow');
							$('.error', exep).hide();
							$('#exep_1', exep).fadeIn('slow');
						} break;
						case 2: {
							exep.fadeIn('slow');
							$('.error', exep).hide();
							$('#exep_2', exep).fadeIn('slow');
						} break;
						case 3: {
							exep.fadeIn('slow');
							$('.error', exep).hide();
							$('#exep_3', exep).fadeIn('slow');
						} break;
					}
		         },
		       error: function (xhr, ajaxOptions, thrownError) { // � ����ae �e��a��o�o �a�e��e��� �a��o�a � �e��e��
		            //alert(xhr.status); // �o�a�e� o��e� �e��e�a
		            //alert(thrownError); // � �e��� o�����
		         },
		       complete: function(data) { // �o����e �o��e ���o�o ���o�a
		            form.find('.button_add').prop('disabled', false); // � ���o� ����ae ������� ��o��� o��a��o
		         }
			});
			
			return false;
		});		

		$('.account').each(function(){
			
			var form = $(this),	btn = form.find('.button_add');	
			
			// ������� �������� ����� �����
			function checkInput(){				
				form.find('.input').each(function(){
					if($(this).val().length < 3 || $(this).val() == ''){
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
			
			form.find('.input').each(function(){
				$(this).focus(function(){					
					$(this).next().fadeIn('slow');					
				});
				
				$(this).blur(function(){
					$('.hint').fadeOut('fast');
				});
			});
			
		});
		
		$('.button_cancel').click(function(){
			$(location).attr('href','account.php');
		});
		
	});

})( jQuery );