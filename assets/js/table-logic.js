$(document).ready(function() { // ��� �a��� �o��e �a������ ���a����

	$('.delete').submit(function(){
			
			var form = $(this);
			var data = form.serialize(); // �o��o�a����ae� �a���e
			
			form.parent().parent().parent().fadeOut('400', function() { $(this).remove(); });
			
			$.ajax({ // �����a������e� ajax �a��o�
			   type: 'POST', // o���a���e� � POST �o��a�e, �o��o GET
			   url: 'assets/php/mysql-form-check.php', // ���� �o o��a�o����a, � �a� o� �e��� � �o� �e �a��e
			   dataType: 'json', // o��e� ��e� � json �o��a�e
			   data: data, // �a���e ��� o���a���
		       beforeSend: function(data) { // �o����e �o o���a���
		            form.find('.button_add').attr('disabled', 'disabled'); // �a����e�, o������� ��o���, ��o�� �e �a�� �o 100 �a�
		          },
		       success: function(data){ // �o����e �o��e ��a��o�o o��a�e��� � �e��e�� � �o���e��� o��e�a
		       		
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
	
	$('.show').each(function(){
		$(this).parent().mouseenter(function(){
			$(this).find('.action').fadeTo(0, 1) 
		});
		
		$(this).parent().mouseleave(function(){
			$(this).find('.action').fadeTo(0, 0)
		});
	});
	
});