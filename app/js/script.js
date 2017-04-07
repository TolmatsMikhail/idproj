// Ячейки номера карты для ввода
var cardNumbers = document.querySelectorAll('.payments__form__card-number-item');
// Поле ввода кода безопасности
var cvvCode = document.querySelector('.payments__form__safe-info__inputcvv');
// Имя держателя карты
var holderName = document.querySelector('.payments__form__holder');
// Все инпуты формы
var formInputs = document.querySelectorAll('.payments__form input');
// Кнопка отправки формы
var paymentsFormButton = document.querySelector('.payments__form__button');
// Кнопка задизейблена?
var sendErrorNumbers =false;
var sendErrorCVV = false;
var sendErrorHolder = false;
// Скро жизни карты
var cardLifeLength = 5;
// Диапазон времени жизни карты
var cardLifeLengthDiapason = cardLifeLength*2;

// Обработчик ввода номера карты (*4 поля)
for( var i = 0; i < cardNumbers.length; i++) {
	cardNumbers[i].addEventListener('keyup', testInputsOnFill);
}
// Обработчик ввода CVV2 / CVC2
cvvCode.addEventListener('keyup', testInputsOnFill);
// Обработчик ввода имени
holderName.addEventListener('keyup', testInputsOnFill);

window.addEventListener('load', function() {
	// Сегодняшний год.
	var nowYear = (new Date()).getFullYear();

	// Установка текущей даты в соответствующее поле
	document.querySelector('.payments__form__safe-info__year__value').innerHTML = nowYear;

	// Контейнер списка годов
	var yearsValuesBlock = document.querySelector('.payments__form__safe-info__year__value').nextElementSibling;

	// С учетом срока жизни карты обозначим год самой старой даты 
	var startDiapasonYears = nowYear - cardLifeLength;
	// 
	for(var i = 0; i < cardLifeLengthDiapason; i++) {
		var div = document.createElement('div');
		div.classList.add('payments__form__safe-info__list__values__item');
		div.innerHTML = startDiapasonYears;
		startDiapasonYears = startDiapasonYears + 1;
		yearsValuesBlock.appendChild(div);
	}
})
// Обработчик полей ввода
function testInputsOnFill(e) {
	// Ловим класс цели
	switch (e.target.className) {
		case 'payments__form__card-number-item':
			// Любая буква меняется на пустую строку
			e.target.value = e.target.value.replace(/[^0-9]/g,"");
			// Перепрыгнуть на следующий инпут, если предыдущий заполнен. 4 символа.
			if (e.target.value.length == 4 && e.target.nextElementSibling.nodeName == 'INPUT') {
				var nextInput = e.target.nextElementSibling;
				nextInput.focus();
			}
			// Установим значение true/false. Понадобится для disabled кнопки.
			for (var i = 0; i < cardNumbers.length; i++) {
				if (cardNumbers[i].value.length != 4) {
					sendErrorNumbers = false;
				} else {
					sendErrorNumbers = true;
				}
			}

			break;

		case 'payments__form__safe-info__inputcvv':
			// Любая буква меняется на пустую строку
			e.target.value = e.target.value.replace(/[^0-9]/g,"");
			// Длина кода 3 символа
			if (e.target.value.length == 3) {
				sendErrorCVV = true;
			} else {
				sendErrorCVV = false;
			}

			break;
		// Класс поля ввода меняется, поэтому два варианта в case
		case 'payments__form__holder': 
		case 'payments__form__holder payments__form__safe-info_input_error': 
			e.target.value = e.target.value.replace(/[^A-Z\s]/g,"");
			// Длина имени не менее 4 символов. 
			if (e.target.value.length < 4 && e.target.value.length > -1) {
				e.target.classList.add('payments__form__safe-info_input_error');
				sendErrorHolder = false;
			} else {
				e.target.classList.remove('payments__form__safe-info_input_error');
				sendErrorHolder = true;
			}
			
			break;

	}
}
// Обработчик кнопки (нажатие)
paymentsFormButton.addEventListener('click', function(e) {
	if ((!sendErrorHolder) || (!sendErrorCVV) || (!sendErrorNumbers)) {
		e.preventDefault();
	}
})

document.querySelectorAll('.payments__form__safe-info_input').forEach(
	function(item) {
		item.addEventListener('click', dropList)
	}
);

function dropList() {
	this.querySelector('.payments__form__safe-info__list__values').classList.toggle('hidden');
}

document.querySelectorAll('.payments__form__safe-info__list__values').forEach(function(item) {
	item.addEventListener('click', chooseListValue);
})

function chooseListValue(e) {
	var value = e.target.innerHTML;
	var inputThisValue = e.target.parentNode.nextElementSibling;
	var valueForLook = e.target.parentNode.previousElementSibling;
	inputThisValue.value = value;
	valueForLook.innerHTML = value;
}

var burgerMenuButton = document.querySelector('.menu__burger');
var leftMenu = document.querySelector('.menu')
var backgroundLayout = document.querySelector('.background-layout');

burgerMenuButton.addEventListener('click', function(e) {
	this.style.display = 'none';
	leftMenu.style.display = 'block';
	backgroundLayout.classList.remove('hidden');
})

backgroundLayout.addEventListener('click', function(e) {
	this.classList.add('hidden');
	leftMenu.style.display = 'none';
	burgerMenuButton.style.display = 'block';
})