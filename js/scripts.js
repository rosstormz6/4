// anchor
jQuery(function($){
	$('a[href^="#"]').click(function(e){
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top}, 1000);
		return false;
	});
});
// end anchor
// anchor
jQuery(function($){
	$('.ever-popup-btn').click(function(e){
		e.preventDefault();
		return false;
	});
});
// end anchor

// popup
jQuery(function($){
	var OpenPopupLink = $('a.open-popup-link');
	var ClosePopupLink = $('a.close-popup-link');
	var PopupWrapper = $('.popup-wrapper');
	OpenPopupLink.click(function() {
		var clickId = this.id;
		$('#popup-' + clickId).fadeIn(300);
		PopupWrapper.fadeIn(300);
		$('body').css('overflow','hidden').css('height','100%');
	});
	ClosePopupLink.click(function() {
		$(this).parents('.popup').fadeOut(300);
		PopupWrapper.fadeOut(300);
		$('body').css('overflow','auto').css('height','auto');
	});
	$(document).keydown(function(eventObject) {
		if ($('[id^="popup-"]').is(":visible")){
			if (eventObject.which == '27') {
				$('[id^="popup-"]').fadeOut(300);
				PopupWrapper.fadeOut(300);
				$('body').css('overflow','auto').css('height','auto');
			}
		}
	});

});
// end popup

//date
jQuery(function($){
    var mydate = new Date();
    var montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $('.date-container').text(" " + montharray[mydate.getMonth()] + " "
        + mydate.getDate() + ", " + mydate.getFullYear() );
});

document.addEventListener("DOMContentLoaded", function () {

  // Вивід дати (+ час).
  postDate();

});

function postDate() {
  // Додаємо клас "date-N", де N - кількість "відмотаних" днів.
  // Наприклад, span class="date-0"></span> - мотає 0 днів назад (сьогодні).
  // Наприклад, span class="date-5"></span> - мотає 5 днів назад.

  // Вивід дати (+ години + хвилини), додаємо клас "time". Наприклад, <span class="date-1 time"></span>.
  // Виводить у форматі на зразок "14.02.2018 14:22"
  // Працює як в порядку зростання, так і в порядку спадання (міняємо флажок нижче)
  var body = document.body,
    postLang = body.getAttribute('data-post-lang');

  var sa = body.getAttribute('data-post-format') || 'dd.mm.yyyy',
    msInDay = 86400000,
    counterLength = 90,  // Максимальна кількість вімотаних днів. Змінюємо за необхідності.
    months,
    countryName = postLang ? postLang
      : window.country_code ? window.country_code.toLowerCase()
        : 'ru',  // Мова для місяців.
    isAbbreviated = body.getAttribute('data-post-abbreviated') ? true : false, // Скорочений варіант місяців до трьох букв
    localDate = new Date();

  var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

  switch (countryName) {
    case 'it':  // Italy
      days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
      break;
    case 'es':  // Spain
      days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      break;
    case 'fr':  // France
      days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
      break;
    case 'pt':  // Portugal
      days = ['Segund-feira', 'Terç-feira', 'Quart-feira', 'Quint-feira', 'Sext-feira', 'Sábado', 'Domingo'];
      break;
    case 'de':  // Germany
      days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
      break;
    case 'bg':  // Bulgaria
      days = ['Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота', 'Неделя']
      break;
    case 'pl':  // Poland
      days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
      break;
    case 'ro':  // Romania
      days = ['Luni', 'Marţi', 'Miercuri', 'Joi', 'Vineri', 'Sîmbătă', 'Duminică'];
      break;
    case 'hu':  // Hungary (Угорщина)
      days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
      break;
    case 'gr':  // Greece
    case 'cy':  // Cyprus (Кіпр)
      days = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή']
      break;
    case 'en':  // English
      days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      break;
    case 'ru':  // Russia
    default:
      days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
      break;
  }

  switch (countryName) {
    case 'pl':  // Poland
    default:
      months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
      break;
  }

  if (isAbbreviated) {
    for (var i = 0; i < months.length; i++) {
      months[i] = months[i].slice(0, 3).toLowerCase();  // Прибираємо ".toLowerCase()", якщо перша буква повинна бути великою.
    }
  }

  for (var counter = 0; counter < counterLength; counter++) {
    var dateClass = "date-" + counter,
      nodeList = document.getElementsByClassName(dateClass),
      date = new Date(localDate.getTime() - counter * msInDay),
      timeCounter = 0,
      timeArray = time(nodeList/*, true*/); // Розкоментувати, якщо необхідне сортування в порядку спадання.

    timeArray = timeFormat(timeArray);

    for (var i = 0; i < nodeList.length; i++) {
      var data = nodeList[i].dataset;

      if (data.format) {
        nodeList[i].innerHTML = format(date, data.format);
        // format: особливий формать для окремої дати. Додаємo як data-format="фомарт".
        /// Формати дивитись в switch нижче. dd - числом, day - прописом.

        // Наприклад, <span class="date-1" data-format="dd month yyyy"></span>
        // мотає на 1 день назад і виводить цей span у вигляді "14 Лютого 2018".
      } else {
        // Загальний формат виводу дати змінювати ТУТ!
        nodeList[i].innerHTML = format(date, sa); // Default: dd.mm.yyyy
      }
      if (/\btime\b/.test(nodeList[i].className)) {
        nodeList[i].innerHTML += " " + timeArray[timeCounter]; // Рядок для формату виводу часу.
        timeCounter++;
      }
    }
  }

  // <span clas="date-N"></span> - мотає час назад на N днів. Наприклад, <span className="date-5"></span>
  // <span clas="dateN"></span> - мотає час вперед на N днів. Наприклад, <span className="date5"></span>

  for (var counter = 0; counter < counterLength; counter++) {
    var dateClass = "date" + counter,
      nodeList = document.getElementsByClassName(dateClass),
      date = new Date(localDate.getTime() + counter * msInDay),
      timeCounter = 0;

    for (var i = 0; i < nodeList.length; i++) {
      var data = nodeList[i].dataset;

      if (data.format) {
        nodeList[i].innerHTML = format(date, data.format);
      } else {
        nodeList[i].innerHTML = format(date, sa);
      }
    }
  }

  function time(nodeList, reverse) {
    var timeArray = [], timeStatement = false;

    for (var i = 0; i < nodeList.length; i++) {
      if (nodeList[i].className.match(/\btime\b/)) {
        if (nodeList[i].className.match(/\bdate-0\b/)) {
          timeStatement = true;
        }
        timeArray.push(timeRandom(timeStatement));
      }
    }

    if (reverse) timeArray.sort(function (a, b) {
      return b - a;
    });
    else timeArray.sort(function (a, b) {
      return a - b;
    });

    return timeArray;
  }

  function timeRandom(statement) {
    if (statement) {
      var date = new Date(),
        timeLimit = date.getHours() * 60 + date.getMinutes();

      return Math.round(0 + Math.random() * timeLimit);
    }
    return Math.round(0 + Math.random() * 1440);
  }

  function timeFormat(timearray) {
    var array = [];

    for (var i = 0; i < timearray.length; i++) {
      var htemp = Math.floor(timearray[i] / 60), mtemp = timearray[i] % 60,
        hours = htemp < 10 ? "0" + htemp : htemp,
        minutes = mtemp < 10 ? "0" + mtemp : mtemp;
      array.push(hours + ":" + minutes);
    }

    return array;
  }

  function notLastIteration(index, array) {
    return index !== array.length - 1;
  }

  function format(date, format) {
    var testFormat = ['dd', 'day', 'mm', 'month', 'yyyy', 'year'];
    var innerDate = format;

    var dd = date.getDate(),
      mm = date.getMonth() + 1,
      year = date.getFullYear(),
      month = months[mm - 1],
      day = days[new Date(year, mm - 1, dd).getDay()];

    dd = (dd < 10) ? ("0" + dd) : dd;
    mm = (mm < 10) ? ('0' + mm) : mm;

    var dateFormat = {
      day: day,
      dd: dd,
      year: year,
      yyyy: year,
      mm: mm,
      month: month
    };

    for (var i = 0; i < testFormat.length; i++) {
      var string = testFormat[i];
      var regExp = new RegExp(string);
      innerDate = innerDate.replace(regExp, dateFormat[string]);
    }

    return innerDate;
  }
}