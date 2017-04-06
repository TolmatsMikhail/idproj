var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];

var years = [2018, 2017, 2016, 2015, 2014, 2013];

var monthChoose = document.querySelector('.payments__form__safe-info__month');
var yearChoose = document.querySelector('.payments__form__safe-info__year')

function createValuesToChoose(e) {
	this.querySelector('.values').classList.toggle('show');
	if(e.target.classList.contains('values__item')) {
		this.innerHTML = e.target.classList.contains('values__item').innerHTML;
	}
}

monthChoose.addEventListener('click', createValuesToChoose)