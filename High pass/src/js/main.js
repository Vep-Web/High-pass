let burger = document.querySelector('.burger-btn')
let burgerMenu = document.querySelector(".burger-menu")
let menuLinks = burgerMenu.querySelectorAll('.header__link')

burger.addEventListener('click',

function() {

  burger.classList.toggle('burger--active')

  burgerMenu.classList.toggle('burger-menu--active')

  document.body.classList.toggle('stop-scroll')


})

menuLinks.forEach(function(el) {
  el.addEventListener('click', function() {

    burger.classList.remove('burger--active')

    burgerMenu.classList.remove('burger-menu--active')

    document.body.classList.remove('stop-scroll')
  })
})


let search = document.querySelector('.header__search')
let searchMenu = document.querySelector(".header__menu_search")

search.addEventListener('click',

function() {

  search.classList.toggle('search--active')

  searchMenu.classList.toggle('header__menu_search--active')
})


ymaps.ready(init_map);


const validate = new window.JustValidate('#form',{
  errorLabelStyle: {
    color: '#FF5C00'
  }
})

validate.addField("#name", [
  {
    rule: 'required',
    errorMessage : 'Вы не ввели имя'
  },
  {
    rule: 'minLength',
    value: 2,
    errorMessage : 'Минимум 2 символа'
  },
])
.addField("#email", [
  {
    rule: 'required',
    errorMessage : 'Вы не ввели e-mail'
  },
  {
    rule: 'email',
    errorMessage : 'Ошибка в почте'
  },
])


const validate_2 = new window.JustValidate('#form2',{
  errorLabelStyle: {
    color: '#FF5C00'
  }
})

validate_2.addField("#email2", [
  {
    rule: 'required',
    errorMessage : 'Вы не ввели e-mail'
  },
  {
    rule: 'email',
    errorMessage : 'Ошибка в почте'
  },
])


function init_map() {
  var myMap = new ymaps.Map("ymaps", {
      center: [55.76953456898229,37.63998549999998],
      zoom: 15,
  },
      { suppressMapOpenBlock: true }

  );

  var placemark = new ymaps.Placemark([55.76953456898229,37.63998549999998], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/svg/map.svg',
      iconImageSize: [12, 12],
  });

  myMap.geoObjects.add(placemark);
}

