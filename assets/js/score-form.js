(function( $ ) {

	const SCORE_SERVICE_URL = "http://ec2-3-121-99-186.eu-central-1.compute.amazonaws.com";
	const CITY_DISTRICTS = {
		'Брест': ['Московский район', 'Ленинский район'],
		'Гродно': ['Ленинский район', 'Октябрьский район'],
		'Витебск': ['Железнодорожный район', 'Октябрьский район', 'Первомайский район'],
		'Могилев': ['Ленинский район', 'Октябрьский район'],
		'Гомель': ['Центральный район', 'Советский район', 'Железнодорожный район', 'Новобелицкий район'],
		'Минск': ['Центральный район', 'Советский район', 'Первомайский район', 'Партизанский район',
			'Заводской район', 'Ленинский район', 'Октябрьский район', 'Московский район', 'Фрунзенский район']
	};
	
	//// ---> Проверка на существование элемента на странице
	jQuery.fn.exists = function() {
	   return jQuery(this).length;
	};

	$(function() {

		let form = $('.enter');
		let btn = $('#sub');
		let cityF = $('#city_field');
		let districtF = $('#district_field');
		let pTitle = $('#prediction_result');

		// Функция обновления поля формы
		function updateDistricts() {
			if (cityF.val() === 'default') {
				districtF.prop('disabled', true);
			} else {
				districtF.empty();
				districtF.append('<option value="default">Район</option>');
				CITY_DISTRICTS[cityF.val()].forEach(function (item, index) {
					districtF.append('<option value="' + item + '">' + item + '</option>');
				});
				districtF.prop('disabled', false);
			}
		}

		// Функция проверки полей формы
		function checkInput(){
			form.find('.input').each(function(){
				const value = $(this).val();
				if(value === '' || value === 'default'){
					$(this).addClass('empty');
				} else {
					$(this).removeClass('empty');
				}
			});
		}

		// Функция подсветки незаполненных полей
		function lightEmpty(){
			form.find('.empty').css({'background-color':'#FFC4C2', 'border-color': '#ff7496'});
			setTimeout(function(){
				form.find('.empty').removeAttr('style');
			},800);
		}

		// Функция подсветки незаполненных полей
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

		// пeрeхвaтывaeм всe при сoбытии oтпрaвки
		form.submit(function() {
			let data = form.serialize(); // пoдгoтaвливaeм дaнныe
			let queryString = SCORE_SERVICE_URL + '/api/v1/realty-scorer/score/sale?' + data;

			$.get(queryString).done(function(data) {
				pTitle.text(data + " $");
			});

			return false; // вырубaeм стaндaртную oтпрaвку фoрмы
		});

		form.find('.input').each(function(){
			$(this).focus(function(){
				$(this).next().fadeIn('slow');
			});

			$(this).blur(function(){
				$('.hint').fadeOut('fast');
			});
		});

		btn.click(function() {
			checkButton();
			if($(this).hasClass('bad')){
				lightEmpty();
				return false
			} else {
				form.submit();
			}
		});

		// пeрeхвaтывaeм оновление списка
		cityF.change(updateDistricts);
		updateDistricts();
		
	});

})( jQuery );