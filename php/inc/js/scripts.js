'use strict';

var hostaliaApp = {},
  moduloCookies = {},
  moduloTabsCloud = {},
  moduloSliderCloud = {},
  dynamicTableCloud = {},
  osSelectorHosting = {},
  moduloModal = {},
  moduloSectionMenu = {},
  moduloCarouselGenerico = {},
  moduloCssTransition = {},
  moduloMobile = {},
  moduloVideo = {},
  moduloSectionMenuPartners = {},
  moduloCarouselPartners = {},
  moduloFormulario = {},
  moduloSlidersCorreoFlexible = {},
  screenXsMax = 767,
  screenSmMax = 991,
  screenMdMax = 1199,
  inputName = $('#clickToCall .click-to-call-name input[type="text"]'),
  inputPhone = $('#clickToCall .click-to-call-phone input[type="text"]'),
  inputProduct = $('#clickToCall .click-to-call-product input[type="text"]'),
  inputDate = $('#clickToCall .click-to-call-date input[type="text"]'),
  inputTime = $('#clickToCall .click-to-call-time input[type="text"]'),
  clickToCall = $('#clickToCall'),
  clickToCallContent = $('#clickToCall .content');

$(document).ready(function () {

  hostaliaApp = (function (window, undefined) {

    var okContainer = $('.ok-container'),
    koContainer = $('.ko-container'),
    spinnerContainer = $('.spinner-container'),
    datepicker = $('#datepicker'),
    iconDatepicker = $('.icon-datepicker'),
    timepicker = $('#timepicker'),
    iconTimepicker = $('.icon-timepicker'),
    datepickerVisible = false,
    timepickerVisible = false,
    nationalHolidays = {
      '1' : ['1','6'],
      '4' : ['18'],
      '5' : ['1'],
      '8' : ['15'],
      '11' : ['1'],
      '12' : ['6','8','25']
    };

    function getMinTime() {
    var actualDate = new Date(),
      actualDay = actualDate.getDate(),
      actualMonth = actualDate.getMonth() + 1,
      actualYear = actualDate.getFullYear(),
      actualDateFormatted  = twoDigitsNumber(actualDay) + '/' + twoDigitsNumber(actualMonth)  + '/' + actualYear,
      actualHour = actualDate.getHours(),
      actualMinute = actualDate.getMinutes(),
      firstTime,
      dateInputValue = $('.click-to-call-date input[type="text"]').val();

    // Si no hay fecha seleccionada o la fecha seleccionada es hoy
    if (!dateInputValue || dateInputValue  ===  actualDateFormatted) {
      firstTime = (actualMinute >= 30) ? twoDigitsNumber(actualHour + 1) + ':00' : twoDigitsNumber(actualHour) + ':30';

    // Si la fecha seleccionada no es hoy
    } else {
      firstTime = '09:00';
    }

    return firstTime;
    }

    function getAllowedTimes() {
    var splittedMinTime = getMinTime().split(':'),
      minTimeInMinutes = (+splittedMinTime[0]) * 60 + (+splittedMinTime[1]),
      maxTimeInMinutes = 19 * 60,
      numberOfGroups = (maxTimeInMinutes - minTimeInMinutes) / 30,
      allowedTimes = [],
      allowedTime,
      i,
      minTimeInMinutesItem;

      for (i = 0; i < numberOfGroups; i += 1) {
      minTimeInMinutesItem = minTimeInMinutes + 30 * i;
      allowedTime = parseInt(minTimeInMinutesItem / 60, 10) + ':' + twoDigitsNumber(minTimeInMinutesItem % 60);
      allowedTimes.push(allowedTime);
      }

    return allowedTimes;
    }


    function twoDigitsNumber(number) {
    return ('0' + number).slice(-2);
    }

    // Date picker
    if (typeof(datepicker.datetimepicker) === 'function') {
    datepicker.datetimepicker({
      onGenerate: function () {
      var i,
        date,
        month,
        year,
        actualMonthHolidays,
        actualMonth;

      // Deshabilitamos los fines de semana
      $(this).find('.xdsoft_day_of_week6').addClass('xdsoft_disabled');

      $(this).find('.xdsoft_day_of_week0').addClass('xdsoft_disabled');

      // Obtenemos el mes actual
      actualMonth = $(this).find('[data-month]').attr('data-month');

      // Obtenemos los festivos nacionales del mes actual
      actualMonthHolidays = nationalHolidays[(+actualMonth + 1) + ''] || [];

      // Deshabilitamos los festivos nacionales del mes actual
      for (i = 0; i < actualMonthHolidays.length; i += 1) {
        $(this).find('[data-date="' + actualMonthHolidays[i] + '"]').addClass('xdsoft_disabled');
      }
      },

      onChangeDateTime: function () {
      if ($('html').is('#ie8')) {
        hostaliaApp.removePlaceholderIE($('#datepicker'));
      }

      hostaliaApp.validateField('date');

      if (hostaliaApp.validFields['date']) {
        hostaliaApp.updateTimePicker();
        hostaliaApp.validateField('time');
      }
      },

      timepicker: false,
      format: 'd/m/Y',
      lang: 'es',
      dayOfWeekStart: 1,
      minDate: '0',
      closeOnDateSelect: true
    });

    datepicker.on('blur', function () {
      timepickerVisible = false;
    });

    iconDatepicker.on('click', function () {
      if (!datepickerVisible) {
      datepicker.datetimepicker('show');
      }

      datepickerVisible = !datepickerVisible;
      timepickerVisible = false;

    });

    $('.datepicker-container').on('mouseleave', function () {
      datepickerVisible = false;
    });
    }

    if (typeof(timepicker.datetimepicker) === 'function') {
    // Time picker
    timepicker.datetimepicker({
      onGenerate: function () {
      $(this).find('.xdsoft_current').removeClass('xdsoft_current');
      $(this).find('.xdsoft_today').addClass('xdsoft_current');
      },

      onChangeDateTime: function () {
      if ($('html').is('#ie8')) {
        hostaliaApp.removePlaceholderIE($('#timepicker'));
      }

      hostaliaApp.validateField('time');
      },

      datepicker: false,
      format: 'H:i',
      defaultTime: getMinTime(),
      allowTimes: getAllowedTimes()
    });



    timepicker.on('blur', function () {
      datepickerVisible = false;
    });

    iconTimepicker.on('click', function () {
      if (!timepickerVisible) {
        timepicker.datetimepicker('show');
      }

      timepickerVisible = !timepickerVisible;
      datepickerVisible = false;
    });

    iconTimepicker.on('mouseout', function () {
      timepickerVisible = false;
    });
    }
    return {
    validFields: {
      'name': true,
      'phone': true,
      'product': true,
      'date': true,
      'time': true
    },

    // COMIENZO: METODOS PARA EL CLICK TO CALL
    addPlaceholderIE: function (inputItem, text) {
      var placeholder = '<span class="placeholder">' + text + '</span>';

      inputItem.closest('div').prepend(placeholder);
    },

    removePlaceholderIE: function (inputItem) {
      inputItem.closest('div').find('.placeholder').remove();
    },

    addOkResult: function () {
      okContainer.show();
    },

    removeOkResult: function () {
      okContainer.hide();
    },

    addKoResult: function () {
      koContainer.show();
    },

    removeKoResult: function () {
      koContainer.hide();
    },

    addSpinner: function () {
      spinnerContainer.show();
    },

    removeSpinner: function () {
      spinnerContainer.hide();
    },

    cleanAllFields: function () {
      inputName.val('');
      inputPhone.val('');
      inputDate.val('');
      inputTime.val('');
      $('#clickToCall .error').removeClass('error');
    },

    isValidField: function (field, data) {
      var regexValidPhone = /^([6|7]\d{8})|(8[1-8]\d{7})|(9[1-3,5-8]\d{7})|((94)[1-9]\d{6})$/,
      regexPhoneOnlyNumbers = /^\D.*$/,
      regexNineDigits = /^\d{9}$/,
      regexValidName = /^[a-zA-ZÃ¡Ã©Ã­Ã³ÃºÃ±\- ]+$/,
      regexValidDate = /^\d{2}\/\d{2}\/\d{4}$/,
      regexValidTime = /^\d{2}:\d{2}$/,
      dateInsertedFormatted = $('.click-to-call-date input[type="text"]').val(),
      dateInserted = new Date(dateInsertedFormatted.split('/')[2], dateInsertedFormatted.split('/')[1] - 1, dateInsertedFormatted.split('/')[0]),
      dateTimeInserted,
      actualDate = new Date(),
      actualDateFormatted = twoDigitsNumber(actualDate.getDate()) + '/' + twoDigitsNumber((actualDate.getMonth() + 1)) + '/' + actualDate.getFullYear(),
      actualTimeFormatted = twoDigitsNumber(actualDate.getHours()) + ':' + twoDigitsNumber((actualDate.getMinutes())),
      valid,
      errorMessage,
      splittedMinTime = getMinTime().split(':'),
      minTimeInMinutes = (+splittedMinTime[0]) * 60 + (+splittedMinTime[1]),
      maxTimeInMinutes = 19 * 60,
      dateTimeInsertedinMinutes;

      // VALIDACIONES CAMPO NAME
      if (field === 'name') {

      // Error: Campo name vacio
      if (!data.length) {
        valid = false;
        errorMessage = 'Debe escribir su nombre';

      // Error: Campo name no debe admitir numeros
      } else if (!regexValidName.test(data)) {
        valid = false;
        errorMessage = 'El nombre sÃ³lo puede contener letras, tildes y guiones';

      // Campo name correcto
      } else {
        valid = true;
        errorMessage = null;
      }

      return {valid: valid, errorMessage: errorMessage};

      // VALIDACIONES CAMPO PHONE
      } else if (field === 'phone') {

      if (!data.length) {
        valid = false;
        errorMessage = 'Este campo es obligatorio';

      // Error: Campo number de menos de 9 digitos
      } else if (!regexNineDigits.test(data)) {
        valid = false;
        errorMessage = 'El telÃ©fono debe tener 9 dÃ­gitos';

      // Error: Campo number incorrecto
      } else if (!regexValidPhone.test(data)) {
        valid = false;
        errorMessage = 'El telÃ©fono introducido no es vÃ¡lido';

      // Campo number correcto
      } else {
        valid = true;
        errorMessage = null;
      }

      return {valid: valid, errorMessage: errorMessage};

      // VALIDACIONES CAMPO DATE
      } else if (field === 'date') {

      // Error: campo vacio
      if (!data.length) {
        valid = false;
        errorMessage = 'Elige una fecha';

      // Error: formato de fecha incorrecto
      } else if (!regexValidDate.test(data)) {
        $('#datepicker').val('');
        $('#timepicker').val('');
        valid = false;
        errorMessage = 'Fecha incorrecta';

      //  Formato de fecha correcto
      } else {
        actualDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate());

        // Error: fecha introducida por teclado menor que la actual
        if (dateInserted < actualDate) {
        $('#datepicker').val('');
        $('#timepicker').val('');
        valid = false;
        errorMessage = 'Fecha incorrecta';

        // Fecha valida
        } else {
        valid = true;
        errorMessage = null;
        }
      }

      return {valid: valid, errorMessage: errorMessage};


      // VALIDACIONES CAMPO TIME
      } else if (field === 'time') {
      dateTimeInserted = new Date(dateInsertedFormatted.split('/')[2], dateInsertedFormatted.split('/')[1] - 1, dateInsertedFormatted.split('/')[0], data.split(':')[0], data.split(':')[1]);

      // Error: campo vacio
      if (!data.length) {
        valid = false;
        errorMessage = 'Elige una hora';

      // Error: formato de hora incorrecto
      } else if (!regexValidTime.test(data)) {
        valid = false;
        errorMessage = 'Hora incorrecta';

      // Error: formato de fecha correcto
      } else {
        dateTimeInsertedinMinutes = dateTimeInserted.getHours() * 60 + dateTimeInserted.getMinutes();

        // Error: hora introducida por teclado no esta en el rango permitido
        if (dateTimeInsertedinMinutes < minTimeInMinutes || dateTimeInsertedinMinutes > maxTimeInMinutes) {
        $('#timepicker').val('');
        valid = false;
        errorMessage = 'Hora incorrecta';

        // Hora valida
        } else {
        valid = true;
        errorMessage = null;
        }
      }

      return {valid: valid, errorMessage: errorMessage};

      }
    },

    validateField: function (field) {
      var validationFieldResult = hostaliaApp.isValidField(field, $('.click-to-call-' + field + ' input[type="text"]').val());

      hostaliaApp.validFields[field] = (validationFieldResult.valid) ? true : false;

      datepicker.datetimepicker('hide');
      timepicker.datetimepicker('hide');

      if (validationFieldResult.valid) {
      $('#clickToCall .click-to-call-' + field).removeClass('error');

      } else {
      $('#clickToCall .click-to-call-' + field).addClass('error');
      $('#clickToCall .click-to-call-' + field + ' p').text(validationFieldResult.errorMessage);
      }
    },

    updateTimePicker: function () {
      timepicker.datetimepicker({
      datepicker: false,
      format: 'H:i',
      defaultTime: getMinTime(),
      allowTimes: getAllowedTimes()
      });
    },
    // FIN: METODOS PARA EL CLICK TO CALL
    };

  })(window);

  moduloCookies = (function (window, $, undefined) {
    return {
      closeCookieMessage: function () {
        // si variable no existe se crea (al clicar en Aceptar)
        localStorage.controlcookie = (localStorage.controlcookie || 0);

        localStorage.controlcookie++; // incrementamos cuenta de la cookie
        $('.cookie-box').hide(); // Esconde la polÃ­tica de cookies
      }
    };
  })(window, jQuery);

  // Modulo para el selector de sistema operativo de de hosting
  osSelectorHosting = (function (window, $, undefined) {
    return {
      changeTableContent: function (thisObject) {
        var osType = thisObject.data('os-type');

        sessionStorage.setItem('selectedOS', osType);

        // Seleccionamos el sistema operativo clickado
        $('.hosting-os-selector li').addClass('disabled');
        thisObject.removeClass('disabled');

        // Mostramos la tabla que se corresponde con la opcion clickada
        $('.tabla-hosting-container').hide();
        $('.tabla-hosting-container[data-tabla-hosting="' + osType + '"]').show();
      }
    };
  })(window, jQuery);

  // Modulo para la tabla dinamica de servidor cloud
  dynamicTableCloud = (function (window, $, undefined) {
    return {
      changeTableContent: function (thisObject) {
        var country = thisObject.data('id'),
          notVisibleEs = $('.not-visible-es'),
          visibleEs = $('.visible-es');

        // Seleccionamos la bandera clickada
        $('.server-location li').addClass('disabled');
        thisObject.removeClass('disabled');

        // Ocultamos/mostramos la fila de los vCPU o la de Intel
        if (country === 'es') {
          notVisibleEs.hide();
          visibleEs.show();

        } else {
          visibleEs.hide();
          notVisibleEs.show();
        }

        // Cambiamos dinamicamente el precio en funcion de la ubicacion seleccionada
        $('.server-cloud-table .price').each(function(index) {
          $(this).text($(this).data(country));
        });

        // Cambiamos dinamicamente el resto de campos de la tabla
        $('.server-cloud-table tbody tr').each(function(index) {
          $(this).find('td').each(function() {
            var sprite;

            sprite = $(this).data(country);

            if (sprite === 'ok' || sprite === 'ko') {
              $(this).html('<span class="sprite ' + sprite +'"></span>');

            } else {
              $(this).text($(this).data(country));
            }
          });
        });

        // Cambiamos dinamicamente el id de producto en funcion del pais elegido
        $('thead a, tfoot a').each(function(index) {
          $(this).attr('href', 'https://panel.acens.net/cart/#/contratar/' + $(this).data(country));

        });

      }
    };
  })(window, jQuery);

  // Modulo para los tabs de Servidor Cloud
  moduloTabsCloud = (function (window, $, undefined) {
    return {
      updateTabsContent: function (thisObject) {
        var that = thisObject,
          tabHeaderClass = that.attr('class'),
          tabIndex = tabHeaderClass.match(/\d/),
          tabContainer = that.closest('.tabs-container'),
          tabContent = tabContainer.find('.tab-content-' + tabIndex),
          tabDescription = tabContainer.find('.tab-content-description-' + tabIndex);

        if (!that.hasClass('active')) {
          // Actualizamos el estado de las pestanyas
          $('.tab-header').removeClass('active');
          that.addClass('active');

          // Actualizamos el estado del contenido de las pestanyas
          tabContainer.find('.tab-content').hide();
          tabContent.show();

          // Actualizamos el estado de la descripcion del contenido de las pestanyas
          tabDescription.find('p').hide();
          tabDescription.find('p:first-child').show();
          tabContainer.find('.tab-content-description').hide();
          tabDescription.show();

          // Actualizamos la flecha
          tabContainer.find('.tab-content li').removeClass('active');
          tabContainer.find('.tab-content li:first-child').addClass('active');
        }
      },

      updateTabsDescription: function (thisObject) {
        var that = thisObject,
          tabContent = that.closest('.tab-content'),
          selectedProduct = that.attr('class').split('-')[1],
          tabContentClass = that.closest('div').attr('class'),
          groupIndex = tabContentClass.match(/\d/),
          tabDescription;

        tabDescription = tabContent.find('.tab-content-description-' + groupIndex);

        // Actualizamos la flecha
        tabContent.find('li').removeClass('active');
        that.closest('li').addClass('active');

        // Actualizamos el estado de la descripcion del contenido de las pestanyas
        tabContent.find('.tab-content-description').hide();
        tabDescription.show();

        // Actualizamos el estado de la descripcion del producto clickado
        tabContent.find('.tab-content-description-' + groupIndex + ' .description').hide();
        tabContent.find('.tab-content-description-' + groupIndex + ' .description-' + selectedProduct).show();
      }
    };
  })(window, jQuery);

  // Modulo para el slider de Servidor Cloud
  moduloSliderCloud = (function (window, $, undefined) {
    return {
      config: {
        position: 1,
        testimonial: $('.testimonial').not($('.no-slider')),
        iconPrevContent: $('.slider-container-type-02 .icon-prev-content'),
        iconNextContent: $('.slider-container-type-02 .icon-next-content'),
        sliderVisibleContent: $('.slider-container-type-02 .slider-visible-content-type-02'),
        serverLocationLi: $('.server-location li'),
        tabHeader: $('.tab-header'),
        tabContentIcon: $('.tab-content .icon')
      },

      setContent: function () {
        var i;

        moduloSliderCloud.config.sliderVisibleContent.empty();

        for (i = 0; i < moduloSliderCloud.config.testimonial.length; i += 1) {
          moduloSliderCloud.config.sliderVisibleContent.append(moduloSliderCloud.config.testimonial.eq(i));
        }

        moduloSliderCloud.config.sliderVisibleContent.show();

      },

      setRandomContent: function () {
        var i,
          shuffledTestimonials = [];

        function shuffleArray(array) {
          var i,
            j,
            temp;

            for (i = array.length - 1; i > 0; i--) {
              j = Math.floor(Math.random() * (i + 1));
              temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
            return array;
        }

        shuffledTestimonials = shuffleArray(moduloSliderCloud.config.testimonial);

        moduloSliderCloud.config.sliderVisibleContent.empty();

        for (i = 0; i < moduloSliderCloud.config.testimonial.length; i += 1) {
          moduloSliderCloud.config.sliderVisibleContent.append(shuffledTestimonials.eq(i));
        }

        moduloSliderCloud.config.sliderVisibleContent.show();

      },

      getContent: function (thisObject, type) {
        var position,
          animateLeftValue,
          sign;

        if (type === 'prev') {
          sign = '-';
          position = moduloSliderCloud.config.position - 1;
          animateLeftValue = "+=" + moduloSliderCloud.config.testimonial.width();

        } else if (type === 'next') {
          sign = '+';
          position = moduloSliderCloud.config.position + 1;
          animateLeftValue = "-=" + moduloSliderCloud.config.testimonial.width();

        } else if (type === 'first') {
          sign = '+';
          position = 1;
          animateLeftValue = "+=" + ((moduloSliderCloud.config.testimonial.length - 1) * moduloSliderCloud.config.testimonial.width());
        }

        moduloSliderCloud.config.position = position;
        moduloSliderCloud.config.iconPrevContent.toggle(moduloSliderCloud.config.position !== 1);
        moduloSliderCloud.config.iconNextContent.toggle(moduloSliderCloud.config.position !== moduloSliderCloud.config.testimonial.length);

        moduloSliderCloud.config.sliderVisibleContent.animate({
            left: animateLeftValue
          }, 500, function() {
          });

      }
    };
  })(window, jQuery);

  // Modulo para modales
  moduloModal = (function (window, $, undefined) {
    return {
      openModal: function (e, type, contentWidth, contentHeight) {
        $('.modal-container')
          .show()
          .height($('body').height());

        $('html').addClass('no-scrollbar');

        // Si tenemos slider con auto-rotate y modal para cada slide, pausamos el movimiento mientras este abierta la modal
        moduloCarouselGenerico.config.pausedCarousel = true;
      },

      placeCloseButton: function (modalContent) {
        var modalContentWidth = modalContent.width();

        // Colocamos el boton de cerrar respecto al contenido
        $('.btn-close')
          .offset({top: (modalContent.offset().top - 26),left: (modalContent.offset().left + modalContentWidth - 25)})
          .show();
      },

      closeModal: function () {
        $('.modal-container').children().eq(0).remove();
        $('.modal-container').hide();

        $('html').removeClass('no-scrollbar');

        // Si tenemos slider con auto-rotate y modal para cada slide, volvemos a aplicar el movimiento al cerrar la modal
        moduloCarouselGenerico.config.pausedCarousel = false;
      }

    };
  })(window, jQuery);

  // Modulo para el menu de seccion de datacenter
  moduloSectionMenu = (function (window, $, undefined) {
    function _getSectionsOffsets() {
      var i,
        totalSections,
        offsetArray = [];

      totalSections = $('section').length;

      for (i = 0; i < totalSections; i += 1) {

        // Es gestionado
        if ($('.group-selector li.selected').data('option') === 'gestionado') {
          offsetArray.push(Math.floor($('section').eq(i).offset().top));

        // Es autogestionado
        } else {
          if (!$('section').eq(i).is('.gestionado')) {
            offsetArray.push(Math.floor($('section').eq(i).offset().top));
          }
        }
      }

      return offsetArray;
    }

    return {
      config: {
        sectionMenuClicked: false,
        timeout: null,
        currentSectionMenuIndex: 0,
        sectionsOffsets: _getSectionsOffsets()
      },

      getSectionsOffsets: function () {
        return _getSectionsOffsets();
      },

      getCurrentSectionMenuIndex: function () {
        var offsetArray = [],
          currentOffset = $(window).scrollTop(),
          i = 0,
          menuIndex = 0;

        offsetArray = ($('#branding').is(':visible')) ? moduloSectionMenu.config.sectionsOffsets : moduloSectionMenu.getSectionsOffsets();

        for (i = 0; i <= offsetArray.length - 1; i += 1) {
          if (currentOffset < (offsetArray[i] - 81)) {
            if (i > 0) {
              menuIndex = i - 1;
            }
            break;

          } else {
            if (i === offsetArray.length - 1) {
              menuIndex = offsetArray.length - 1;
            }
          }
        }

        return menuIndex;
      },

      gotoSelectedSection: function (e) {
        var sectionMenu = $('.section-menu'),
          menuItemFrom = sectionMenu.find('a.active'),
          menuItemTo = $(e.currentTarget),
          allMenuLinks = sectionMenu.find('a'),
          href = menuItemTo.data('url'),
          currentSection = $('section').filter('#' + href),
          offset;

        e.preventDefault();
        e.stopPropagation();

        offset = (sectionMenu.is('.fixed-menu')) ? 81 : 161;

        $('html, body').animate({scrollTop: currentSection.offset().top - offset}, 300);

        menuItemFrom.removeClass('active');
        menuItemTo.addClass('active');
      },

      updateLinkCurrentSection: function (e, index) {
        var sectionMenu = $('.section-menu'),
          currentMenuItem;


        if ($('.group-selector').length) {

          // Es gestionado
          if ($('.group-selector li.selected').data('option') === 'gestionado') {
            currentMenuItem = sectionMenu.find('li').eq(index);

          // Es autogestionado
          } else {
            if (!$('section').eq(index).is('.gestionado')) {
              currentMenuItem = sectionMenu.find('li').eq(index + 1);
            } else {
              currentMenuItem = sectionMenu.find('li').eq(1);
            }
          }
        } else {
          currentMenuItem = sectionMenu.find('li').eq(index);
        }


        // currentMenuItem = sectionMenu.find('li').eq(index);
        sectionMenu.find('a').removeClass('active');
        currentMenuItem.find('a').addClass('active');
      }
    }
  })(window, jQuery);

  // Modulo para carruseles
  moduloCarouselGenerico = (function (window, $, undefined) {
    /*
      Clases que podemos incluir en el contenedor con clase "slider-container":
      - "auto-rotation". Permite que el paso entre slides sea automatico.
      - "no-swipe". Desactiva el swipe.
      - "dot-counter-xs". Para que en XS, el counter sea con puntos (por defecto es numerico).

      Atributos que podemos incluir en el contenedor con clase "slider-container":
      - "data-interval-time". Permite ajustar el tiempo, en ms, que cada slide esta visible (por defecto 5000).
    */

    return {
      config: {
        intervalIdsArray: [],
        intervalTimes: [],
        pausedCarousel: false,
        totalPagesArray: []
      },

      initAllSliders: function () {
        var sliderContainer = $('.slider-container');

        function initSlider(sliderContainer) {
          var
            isSlider = sliderContainer.parent().is('.slider'),
            item = sliderContainer.find('.item'),
            totalItemsNoEmpty = item.not('.empty').length,
            btnPrevContent = sliderContainer.find('.btn-prev-content'),
            btnNextContent = sliderContainer.find('.btn-next-content'),
            sliderVisibleContent = sliderContainer.find('.slider-visible-content'),
            sliderContent = sliderContainer.find('.slider-content'),
            sliderContentItem = sliderContent.find('.item'),
            sliderCounter = sliderContainer.find('.slider-counter'),
            sliderCounterText = sliderContainer.find('.slider-counter-text'),
            sliderContainerIndex = $('.slider-container').index(sliderContainer),
            itemsPerRow,
            itemsPerColumn,
            sliderContentItemWidth,
            sliderContentItemHeight,
            i;

          function initCounter(sliderContainer) {

            // Generamos counter con puntos y marcamos el que debe estar seleccionado inicialmente
            sliderCounter.html('<li class="selected">');

            for (i = 2; i <= moduloCarouselGenerico.config.totalPagesArray[sliderContainerIndex]; i += 1) {
              sliderCounter.append('<li>');
            }
          }

          // Calculamos el numero de items que habra en cada fila y en cada columna
          itemsPerRow = Math.floor(sliderVisibleContent.width() / sliderContentItemWidth) || 1;
          itemsPerColumn = Math.floor(sliderVisibleContent.height() / sliderContentItemHeight) || 1;

          // Calculamos el numero total de paginas que tendra el carrusel
          moduloCarouselGenerico.config.totalPagesArray[sliderContainerIndex] =  Math.ceil(totalItemsNoEmpty / (itemsPerRow * itemsPerColumn));

          // Calculamos el ancho de sliderVisibleContent
          sliderVisibleContent.width(itemsPerRow * sliderContentItem.outerWidth(true));

          // Reseteamos posicion del counter
          sliderContainer.data('position', 1);

          // Generamos los items de sliderCounter y marcamos el que debe estar seleccionado inicialmente
          initCounter(sliderContainer);

          // Comprobamos que botones deben mostrarse
          btnPrevContent.toggle(sliderContainer.data('position') !== 1);
          btnNextContent.toggle(sliderContainer.data('position') !== moduloCarouselGenerico.config.totalPagesArray[sliderContainerIndex]);

          sliderContent.css({left: 0});

        }

        sliderContainer.each(function (index, element) {
          // Desvinculamos el evento click en el boton para evitar que se acumulen en el resize
          $(element).find('.btn-prev-content').off('click');
          $(element).find('.btn-next-content').off('click');

          // Si hemos indicado que los slides del slider pasen automaticamente
          if ($(element).is('.auto-rotation')) {
            moduloCarouselGenerico.config.intervalTimes[index] = $(element).data('interval-time');
          }

          initSlider($(element));

          // Incluimos el movimiento automatico si tiene la clase auto-rotation
          if ($(element).is('.auto-rotation')) {
            moduloCarouselGenerico.initTimer($(element), index);
          }

          // Ir a contenido anterior
          $(element).find('.btn-prev-content').on('click', function (e) {

            moduloCarouselGenerico.moveToSlide(e, 'prev');

            if ($(element).is('.auto-rotation')) {
              moduloCarouselGenerico.deleteTimer(index);
              moduloCarouselGenerico.initTimer($(element), index);
            }

          });

          // Ir a contenido siguiente
          $(element).find('.btn-next-content').on('click', function (e) {

            moduloCarouselGenerico.moveToSlide(e, 'next');

            if ($(element).is('.auto-rotation')) {
              moduloCarouselGenerico.deleteTimer(index);
              moduloCarouselGenerico.initTimer($(element), index);
            }

          });
        });
      },

      moveToSlide: function (e, type) {
        var sliderContainer = (typeof(e.type) === 'undefined') ? e : $(e.currentTarget).closest('.slider-container'),
          item = sliderContainer.find('.item'),
          totalItemsNoEmpty = item.not('.empty').length,
          btnPrevContent = sliderContainer.find('.btn-prev-content'),
          btnNextContent = sliderContainer.find('.btn-next-content'),
          sliderVisibleContent = sliderContainer.find('.slider-visible-content'),
          sliderContent = sliderContainer.find('.slider-content'),
          sliderContentItem = sliderContent.find('.item'),
          sliderCounterText = sliderContainer.find('.slider-counter-text'),
          sliderContainerIndex = $('.slider-container').index(sliderContainer),
          animateLeftValue,
          itemsPerRow,
          itemsPerColumn,
          amountToMove,
          sliderContentItemWidth,
          sliderContentItemHeight;


        function updateCounter(sliderContainer) {
          sliderContainer
            .find('.slider-counter li')
            .removeClass('selected')
            .eq(sliderContainer.data('position') - 1)
            .addClass('selected');
        }

        sliderContentItemWidth = sliderContentItem.outerWidth(true);
        sliderContentItemHeight = sliderContentItem.outerHeight(true);

        itemsPerRow = Math.floor(sliderVisibleContent.width() / sliderContentItemWidth) || 1;
        itemsPerColumn = Math.floor(sliderVisibleContent.height() / sliderContentItemHeight) || 1;

        // Calculamos el numero total de paginas que tendra el carrusel
        moduloCarouselGenerico.config.totalPagesArray[sliderContainerIndex] =  Math.ceil(totalItemsNoEmpty / (itemsPerRow * itemsPerColumn));

        amountToMove = (item.outerWidth(true) * itemsPerRow);

        if (!moduloCarouselGenerico.config.pausedCarousel) {
          if (type === 'prev') {
            if (sliderContainer.data('position') > 1) {
              sliderContainer.data('position', +sliderContainer.data('position') - 1);
              animateLeftValue = '+=' + amountToMove;
            }

          } else if (type === 'next') {
            if (sliderContainer.data('position') < moduloCarouselGenerico.config.totalPagesArray[sliderContainerIndex]) {
              sliderContainer.data('position', sliderContainer.data('position') + 1);
              animateLeftValue = '-=' + amountToMove;
            }

          } else if (type === 'first') {
            sliderContainer.data('position', 1);
            animateLeftValue = ((sliderContainer.data('position') > 1) ?  '+=' : '')  + (sliderContainer.data('position') - 1) * amountToMove;
          }

          // Comprobamos si debemos mostrar u ocultar los botones
          btnPrevContent.toggle(sliderContainer.data('position') !== 1);
          btnNextContent.toggle(sliderContainer.data('position') !== moduloCarouselGenerico.config.totalPagesArray[sliderContainerIndex]);

          sliderContent.animate({ left: animateLeftValue }, 500, function() {
            var sliderContainer = $(this).closest('.slider-container');

            updateCounter(sliderContainer);
          });
        }

      },

      initTimer: function (sliderContainer, index) {
        var intervalId;

        function callback() {
          if (sliderContainer.data('position') !== moduloCarouselGenerico.config.totalPagesArray[index]) {
            moduloCarouselGenerico.moveToSlide(sliderContainer, 'next');

          } else {
            moduloCarouselGenerico.moveToSlide(sliderContainer, 'first');
          }
        }

        intervalId = window.setInterval(callback, moduloCarouselGenerico.config.intervalTimes[index], sliderContainer);
        moduloCarouselGenerico.config.intervalIdsArray.splice(index, 0, intervalId);

      },

      deleteTimer: function (index) {
        var intervalIdsArray = moduloCarouselGenerico.config.intervalIdsArray;

        window.clearInterval(intervalIdsArray[index]);

        intervalIdsArray.splice(index, 1);
      }
    };
  })(window, jQuery);

  // Modulo para las transiciones css
  moduloCssTransition = (function (window, $, undefined) {
    function _getItemsOffsets() {
      var i,
        totalItems = $('[data-animate="true"]').length,
        offsetArray = [];

      for (i = 0; i < totalItems; i += 1) {
        offsetArray.push(Math.floor($('[data-animate="true"]').eq(i).offset().top));
      }

      return offsetArray;
    }

    function _getItemsAnimatedState() {
      var i,
        totalItems = $('[data-animate="true"]').length,
        animatedStateArray = [];

      for (i = 0; i < totalItems; i += 1) {
        animatedStateArray.push(false);
      }

      return animatedStateArray;
    }

    return {
      config: {
        // animatedItemsIndex : _getCurrentAnimatedItemIndex(),
        animatedItemsOffsets : _getItemsOffsets(),
        animatedItemsState: _getItemsAnimatedState()
      },

      initAnimatedItems : function () {
        var i,
          dataAnimateTrue = $('[data-animate="true"]'),
          animatedItemsIndex = moduloCssTransition.getCurrentAnimatedItemIndex();

        for (i = 0; i < animatedItemsIndex; i += 1) {
          dataAnimateTrue.eq(i).addClass('animated');
        }
      },

      resetAnimatedItems: function () {
        var dataAnimateTrue = $('[data-animate="true"]');

        dataAnimateTrue.removeClass('animated');
      },

      getItemsOffsets: function () {
        return _getItemsOffsets();
      },

      getCurrentAnimatedItemIndex: function () {
        var offsetArray = _getItemsOffsets(),
          currentOffset = $(window).scrollTop(),
          i = 0,
          animatedItemIndex = 0;

        for (i = 0; i <= offsetArray.length - 1; i += 1) {
          if (offsetArray[i] - currentOffset > ($(window).height() * 0.9)) {
            if (i > 0) {
              animatedItemIndex = i - 1;
            }
            break;

          } else {
            if (i === offsetArray.length - 1) {
              animatedItemIndex = offsetArray.length - 1;
            }
          }
        }

        return animatedItemIndex;
      }



    };
  })(window, jQuery);

  // Modulo para temas relacionados con movil
  moduloMobile = (function (window, $, undefined) {
    return {

      setMenuHeight: function () {
        var deviceHeight = document.documentElement.clientHeight,
          navbarNav = $('.navbar-nav'),
          navbarToggle = $('.navbar-toggle');

        navbarNav.css('height','auto');
        navbarNav.css('height', navbarNav.outerHeight() < (deviceHeight - navbarToggle.outerHeight() - 18) ? navbarNav.outerHeight() : (deviceHeight - navbarToggle.outerHeight() - 18));

      },

      openResponsiveMenu: function () {
        var body = $('body'),
          navbarNav = $('.navbar-nav'),
          deviceHeight = document.documentElement.clientHeight;

        body.addClass('fixed');

        setTimeout( function () {
          moduloMobile.setMenuHeight();
        }, 500);
      },

      closeResponsiveMenu: function () {
        var body = $('body'),
          navbarNav = $('.navbar-nav');

        body.removeClass('fixed');
        navbarNav.css('height','auto');
      },

      toggleResponsiveMenu: function () {
        var navbarCollapse = $('#navbarCollapse'),
          body = $('body'),
          navbarNav = $('.navbar-nav'),
          deviceHeight = document.documentElement.clientHeight;

        if (navbarCollapse.is('.in')) {
          moduloMobile.closeResponsiveMenu();

        } else {
          moduloMobile.openResponsiveMenu();
        }
      },

      detectDeviceOrientation: function () {
        var deviceHeight = document.documentElement.clientHeight;


        $('body')
          .removeClass('landscape portrait')
          .addClass(Math.abs(this.orientation) === 90 ? 'landscape' : 'portrait');

        moduloMobile.setMenuHeight();

      }
    };
  })(window, jQuery);


  /* Modulos partners */
  /* ---------------- */

  // Modulo para la carga del video
    moduloVideo = (function (window, $, undefined) {
      return {
        loadVideo: function () {
          var sources = document.querySelectorAll('.video-container video source'),
            video = document.querySelector('.video-container video');

          for(var i = 0; i < sources.length; i += 1) {
            sources[i].setAttribute('src', sources[i].getAttribute('data-src'));
          }

          video.load();
        },


        unloadVideo: function () {
          var sources = document.querySelectorAll('.video-container video source'),
            video = document.querySelector('.video-container video');

          video.pause();

          for(var i = 0; i < sources.length; i += 1) {
            sources[i].removeAttribute('src');
          }

          video.load();
        }
      };
    })(window, jQuery);


  // Modulo para el menu de seccion
  moduloSectionMenuPartners = (function (window, $, undefined) {
    function _getSectionsOffsets() {
      var i,
        sectionMenuClicked = $('.bloque'),
        totalSections,
        offsetArray = [];

      totalSections = sectionMenuClicked.length;

      for (i = 0; i < totalSections; i += 1) {
        offsetArray.push(Math.floor(sectionMenuClicked.eq(i).offset().top));
      }

      return offsetArray;
    }

    return {
      config: {
        sectionMenuClicked: false,
        timeout: null,
        currentSectionMenuIndex: 0,
        sectionsOffsets: _getSectionsOffsets()
      },

      getSectionsOffsets: function () {
        return _getSectionsOffsets();
      },

      getCurrentSectionMenuIndex: function () {
        var offsetArray = [],
          currentOffset = $(window).scrollTop(),
          menuIndex = 0;

        offsetArray = moduloSectionMenuPartners.config.sectionsOffsets;
        // offsetArray = moduloSectionMenu.getSectionsOffsets();

        for (var i = 0; i <= offsetArray.length - 1; i += 1) {
          if (currentOffset < (offsetArray[i] - 81)) {
            if (i > 0) {
              menuIndex = i - 1;
            }
            break;

          } else {
            if (i === offsetArray.length - 1) {
              menuIndex = offsetArray.length - 1;
            }
          }
        }

        return menuIndex;
      },

      gotoSelectedSection: function (e) {
        var sectionMenu = $('.section-menu'),
          menuItemFrom = sectionMenu.find('a.active'),
          menuItemTo = $('.navbar-nav a[data-url="' + $(e.currentTarget).data('url') + '"]'),
          href = menuItemTo.data('url'),
          currentSection = $('.bloque').filter('#' + href);

        e.preventDefault();
        e.stopPropagation();

        $('html, body').animate({scrollTop: currentSection.offset().top - 123}, 300);

        menuItemFrom.removeClass('active');
        menuItemTo.addClass('active');
      },

      updateLinkCurrentSection: function (e, index) {
        var sectionMenu = $('.section-menu'),
          currentMenuItem = sectionMenu.find('li').eq(index);

        sectionMenu.find('a').removeClass('active');
        currentMenuItem.find('a').addClass('active');
      }
    };
  })(window, jQuery);

  // Modulo para carrusel partners
  moduloCarouselPartners = (function (window, $, undefined) {
    /*
      Clases que podemos incluir en el contenedor con clase "slider-container":
      - "auto-rotation". Permite que el paso entre slides sea automatico.
      - "no-swipe". Desactiva el swipe.
      - "dot-counter-xs". Para que en XS, el counter sea con puntos (por defecto es numerico).

      Atributos que podemos incluir en el contenedor con clase "slider-container":
      - "data-interval-time". Permite ajustar el tiempo, en ms, que cada slide esta visible (por defecto 5000).
    */

    return {
      config: {
        intervalIdsArray: [],
        intervalTimes: [],
        pausedCarousel: false,
        totalPagesArray: []
      },

      initAllSliders: function () {
        var sliderContainer = $('.slider-container');

        function initSlider(sliderContainer) {
          var
            isSlider = sliderContainer.parent().is('.slider'),
            item = sliderContainer.find('.item'),
            totalItemsNoEmpty = item.not('.empty').length,
            btnPrevContent = sliderContainer.find('.btn-prev-content'),
            btnNextContent = sliderContainer.find('.btn-next-content'),
            sliderVisibleContent = sliderContainer.find('.slider-visible-content'),
            sliderContent = sliderContainer.find('.slider-content'),
            sliderContentItem = sliderContent.find('.item'),
            sliderCounter = sliderContainer.find('.slider-counter'),
            sliderCounterText = sliderContainer.find('.slider-counter-text'),
            sliderContainerIndex = $('.slider-container').index(sliderContainer),
            itemsPerRow,
            itemsPerColumn,
            sliderContentItemWidth,
            sliderContentItemHeight,
            i;

          function initCounter(sliderContainer) {

            // Generamos counter con puntos y marcamos el que debe estar seleccionado inicialmente
            if ( ($(window).width() > screenXsMax) || ( ($(window).width() <= screenXsMax) && (sliderContainer.is('.dot-counter-xs')) ) ) {

              sliderCounter.html('<li class="selected">');

              for (i = 2; i <= moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex]; i += 1) {
                sliderCounter.append('<li>');
              }

            // Usamos counter numerico, indicando el item actual y el total de items
            } else {
              sliderCounterText.remove();
              btnNextContent.before('<p class="slider-counter-text">' + sliderContainer.data('position') + '/' + moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex] + '</p>');
            }
          }

          // if ( ($(window).width() > screenXsMax) ) {
          //   sliderContainer.css('visibility', 'visible') ;

          // } else {
          //   sliderContainer.css('visibility', 'hidden') ;
          // }

          // Reseteamos la anchura de sliderVisibleContent
          sliderVisibleContent.css('width', '');

          // Calculamos la anchura y altura de los items incluyendo margin
          sliderContentItemWidth = sliderContentItem.outerWidth(true);
          sliderContentItemHeight = sliderContentItem.outerHeight(true);

          // Calculamos el numero de items que habra en cada fila y en cada columna
          itemsPerRow = Math.floor(sliderVisibleContent.width() / sliderContentItemWidth) || 1;
          itemsPerColumn = Math.floor(sliderVisibleContent.height() / sliderContentItemHeight);

          // Calculamos el numero total de paginas que tendra el carrusel
          moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex] =  Math.ceil(totalItemsNoEmpty / (itemsPerRow * itemsPerColumn));

          // Si es carousel de banners calculamos la anchura del contenedor y de cada item para que ocupe todo el ancho de pantalla
          if (isSlider) {
            sliderContent.css({width: (moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex] * 100) + '%' });
            sliderContentItem.css({width: (100 / moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex]) + '%' });
          }

          // Calculamos el ancho de sliderVisibleContent
          sliderVisibleContent.width(itemsPerRow * sliderContentItem.outerWidth(true));

          // Reseteamos posicion del counter
          sliderContainer.data('position', 1);

          // Generamos los items de sliderCounter y marcamos el que debe estar seleccionado inicialmente
          initCounter(sliderContainer);

          // Comprobamos que botones deben mostrarse
          btnPrevContent.toggle(sliderContainer.data('position') !== 1);
          btnNextContent.toggle(sliderContainer.data('position') !== moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex]);

          sliderContent.css({left: 0});

        }

        function initSwipe(sliderContainer, index) {
          var startTouchPosX,
            endMoveTouchPosX,
            endTouchPosX;

          sliderContainer.on('touchstart', function (e) {
            startTouchPosX = e.originalEvent.touches[0].pageX;

            if (sliderContainer.is('.auto-rotation')) {
              moduloCarouselPartners.deleteTimer(index);
              moduloCarouselPartners.initTimer(sliderContainer, index);
            }
          });

          sliderContainer.on('touchmove', function (e) {
            endMoveTouchPosX = e.originalEvent.touches[0].pageX;
          });

          sliderContainer.on('touchend', function (e) {

            if (typeof(endMoveTouchPosX) === 'undefined') {
              endTouchPosX = startTouchPosX;

            } else {
              endTouchPosX = endMoveTouchPosX;
            }

            if (endTouchPosX > startTouchPosX) {
              moduloCarouselPartners.moveToSlide(e, 'prev');

            } else if (endTouchPosX < startTouchPosX) {
              moduloCarouselPartners.moveToSlide(e, 'next');
            }

            endMoveTouchPosX = undefined;
          });
        }


        sliderContainer.each(function (index, element) {
          // Desvinculamos el evento click en el boton para evitar que se acumulen en el resize
          $(element).find('.btn-prev-content').off('click');
          $(element).find('.btn-next-content').off('click');

          // Desvinculamos los eventos de touch en swipe para evitar que se acumulen en el resize
          if (!$(element).is('.no-swipe')) {
            $(element).off('touchstart');
            $(element).off('touchmove');
            $(element).off('touchend');
          }

          // Si hemos indicado que los slides del slider pasen automaticamente
          if ($(element).is('.auto-rotation')) {
            moduloCarouselPartners.config.intervalTimes[index] = $(element).data('interval-time');
          }

          initSlider($(element));

          // Incluimos el movimiento automatico si tiene la clase auto-rotation
          if ($(element).is('.auto-rotation')) {
            moduloCarouselPartners.initTimer($(element), index);
          }

          // Inicializamos funcionalidad de swipe salvo que se incluya la clase no-swipe
          if (!$(element).is('.no-swipe')) {
            initSwipe($(element), index);
          }

          // Ir a contenido anterior
          $(element).find('.btn-prev-content').on('click', function (e) {

            moduloCarouselPartners.moveToSlide(e, 'prev');

            if ($(element).is('.auto-rotation')) {
              moduloCarouselPartners.deleteTimer(index);
              moduloCarouselPartners.initTimer($(element), index);
            }

          });

          // Ir a contenido siguiente
          $(element).find('.btn-next-content').on('click', function (e) {

            moduloCarouselPartners.moveToSlide(e, 'next');

            if ($(element).is('.auto-rotation')) {
              moduloCarouselPartners.deleteTimer(index);
              moduloCarouselPartners.initTimer($(element), index);
            }

          });
        });
      },

      moveToSlide: function (e, type) {
        var sliderContainer = (typeof(e.type) === 'undefined') ? e : $(e.currentTarget).closest('.slider-container'),
          item = sliderContainer.find('.item'),
          totalItemsNoEmpty = item.not('.empty').length,
          btnPrevContent = sliderContainer.find('.btn-prev-content'),
          btnNextContent = sliderContainer.find('.btn-next-content'),
          sliderVisibleContent = sliderContainer.find('.slider-visible-content'),
          sliderContent = sliderContainer.find('.slider-content'),
          sliderContentItem = sliderContent.find('.item'),
          sliderCounterText = sliderContainer.find('.slider-counter-text'),
          sliderContainerIndex = $('.slider-container').index(sliderContainer),
          animateLeftValue,
          itemsPerRow,
          itemsPerColumn,
          amountToMove,
          sliderContentItemWidth,
          sliderContentItemHeight;


        function updateCounter(sliderContainer) {
          // Usamos counter con puntos y marcamos como seleccionado el item de slideCounter que corresponde
          if ( ($(window).width() > screenXsMax) || ( ($(window).width() <= screenXsMax) && (sliderContainer.is('.dot-counter-xs')) ) ) {

            sliderContainer
              .find('.slider-counter li')
              .removeClass('selected')
              .eq(sliderContainer.data('position') - 1)
              .addClass('selected');

          // Usamos counter numerico, indicando el item actual y el total de items
          } else {
            sliderCounterText.html(sliderContainer.data('position') + '/' + moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex]);

          }
        }

        sliderContentItemWidth = sliderContentItem.outerWidth(true);
        sliderContentItemHeight = sliderContentItem.outerHeight(true);

        itemsPerRow = Math.floor(sliderVisibleContent.width() / sliderContentItemWidth);
        itemsPerColumn = Math.floor(sliderVisibleContent.height() / sliderContentItemHeight);

        // Calculamos el numero total de paginas que tendra el carrusel
        moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex] =  Math.ceil(totalItemsNoEmpty / (itemsPerRow * itemsPerColumn));

        amountToMove = (item.outerWidth(true) * itemsPerRow);

        if (!moduloCarouselPartners.config.pausedCarousel) {
          if (type === 'prev') {
            if (sliderContainer.data('position') > 1) {
              sliderContainer.data('position', +sliderContainer.data('position') - 1);
              animateLeftValue = '+=' + amountToMove;
            }

          } else if (type === 'next') {
            if (sliderContainer.data('position') < moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex]) {
              sliderContainer.data('position', sliderContainer.data('position') + 1);
              animateLeftValue = '-=' + amountToMove;
            }

          } else if (type === 'first') {
            sliderContainer.data('position', 1);
            animateLeftValue = ((sliderContainer.data('position') > 1) ?  '+=' : '')  + (sliderContainer.data('position') - 1) * amountToMove;
          }

          // Comprobamos si debemos mostrar u ocultar los botones
          btnPrevContent.toggle(sliderContainer.data('position') !== 1);
          btnNextContent.toggle(sliderContainer.data('position') !== moduloCarouselPartners.config.totalPagesArray[sliderContainerIndex]);

          sliderContent.animate({ left: animateLeftValue }, 500, function() {
            var sliderContainer = $(this).closest('.slider-container');

            updateCounter(sliderContainer);
          });
        }

      },

      initTimer: function (sliderContainer, index) {
        var intervalId;

        function callback() {
          if (sliderContainer.data('position') !== moduloCarouselPartners.config.totalPagesArray[index]) {
            moduloCarouselPartners.moveToSlide(sliderContainer, 'next');

          } else {
            moduloCarouselPartners.moveToSlide(sliderContainer, 'first');
          }
        }

        // if ($(window).width() > screenXsMax) {
          intervalId = window.setInterval(callback, moduloCarouselPartners.config.intervalTimes[index], sliderContainer);
          moduloCarouselPartners.config.intervalIdsArray.splice(index, 0, intervalId);
        // }
      },

      deleteTimer: function (index) {
        var intervalIdsArray = moduloCarouselPartners.config.intervalIdsArray;

        window.clearInterval(intervalIdsArray[index]);

        intervalIdsArray.splice(index, 1);
      }
    };
  })(window, jQuery);


  // Modulo para la gestion del formulario de contacto
  moduloFormulario = (function (window, $, undefined) {
    return {
      validateEmptyField: function (e) {
        var field = $(e.currentTarget),
          errorContainer = field.closest('div'),
          errorText,
          emptyField = (field.val() === '');

        errorContainer.toggleClass('error', emptyField);
        errorText = (emptyField) ? 'Campo obligatorio.' : '';
        errorContainer.find('.error-description').text(errorText);
      },

      validateMailField: function (e) {
        var field = $(e.currentTarget),
          errorContainer = field.closest('div'),
          errorText,
          emptyField = (field.val() === ''),
          mailRegex=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/,
          notValidMail = !emptyField && !mailRegex.exec(field.val());

        if (emptyField) {
          errorText = 'Campo obligatorio.';
          errorContainer.addClass('error');

        } else if (notValidMail) {
          errorText = 'No es un email vÃ¡lido.';
          errorContainer.addClass('error');

        } else {
          errorText = '';
          errorContainer.removeClass('error');
        }

        errorContainer.find('.error-description').text(errorText);
      },

      validatePhoneField: function (e) {
        var field = $(e.currentTarget),
          errorContainer = field.closest('div'),
          errorText,
          emptyField = (field.val() === ''),
          phoneRegex =/^[0-9]{9}$/,
          notValidPhone = !emptyField && !phoneRegex.exec(field.val());

        if (emptyField) {
          errorText = 'Campo obligatorio.';
          errorContainer.addClass('error');

        } else if (notValidPhone) {
          errorText = 'Debe introducir un nÃºmero de 9 cifras.';
          errorContainer.addClass('error');

        } else {
          errorText = '';
          errorContainer.removeClass('error');
        }

        errorContainer.find('.error-description').text(errorText);
      },

      validateCheckField: function (e) {
        var field = $(e.currentTarget),
          errorContainer = field.closest('div'),
          errorText,
          notCheckedField = !$(e.currentTarget).is(':checked');

        errorContainer.toggleClass('error', notCheckedField);
        errorText = (notCheckedField) ? 'Debes aceptar los tÃ©rminos y condiciones de uso.' : '';
        errorContainer.find('.error-description').text(errorText);
      },

      validateForm: function (e) {
        var errorContainer,
          errorText,
          mailRegex = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/,
          phoneRegex = /^[0-9]{9}$/,
          companyNameField = $('#company_name'),
          emptyCompanyNameField = companyNameField.val() === '',
          emailField = $('#email'),
          emptyEmailField = emailField.val() === '',
          notValidEmailField =  !mailRegex.exec(emailField.val()),
          phoneField = $('#phone_contact'),
          emptyPhoneField = phoneField.val() === '',
          notValidPhoneField = !phoneRegex.exec(phoneField.val()),
          TermsAcceptField = $('#00ND0000003lovg'),
          notCheckedField = !TermsAcceptField.is(':checked'),
          errors = false,
          thisForm = e.currentTarget;

        if (emptyCompanyNameField) {
          errorText = 'Campo obligatorio.';
          errorContainer = companyNameField.closest('div');
          errorContainer.find('.error-description').text(errorText);
          errorContainer.addClass('error');
          errors = true;
        }

        if (emptyPhoneField) {
          errorText = 'Campo obligatorio.';
          errorContainer = phoneField.closest('div');
          errorContainer.find('.error-description').text(errorText);
          errorContainer.addClass('error');
          errors = true;

        } else if  (notValidPhoneField){
          errorText = 'Debe introducir un nÃºmero de 9 cifras.';
          errorContainer = phoneField.closest('div');
          errorContainer.find('.error-description').text(errorText);
          errorContainer.addClass('error');
          errors = true;
        }

        if (emptyEmailField) {
          errorText = 'Campo obligatorio.';
          errorContainer = emailField.closest('div');
          errorContainer.find('.error-description').text(errorText);
          errorContainer.addClass('error');
          errors = true;

        } else if (notValidEmailField) {
          errorText = 'No es un email vÃ¡lido.';
          errorContainer = emailField.closest('div');
          errorContainer.find('.error-description').text(errorText);
          errorContainer.addClass('error');
          errors = true;
        }

        if (notCheckedField) {
          errorText = 'Debes aceptar los tÃ©rminos y condiciones de uso.';
          errorContainer = TermsAcceptField.closest('div');
          errorContainer.find('.error-description').text(errorText);
          errorContainer.addClass('error');
          errors = true;
        }

        if (errors) {
          moduloSectionMenu.gotoSelectedSection(e);

        } else {
          thisForm.submit();
        }
      }
    };
  })(window, jQuery);


  // Modulo para los sliders de correo flexible
  moduloSlidersCorreoFlexible = (function (window, undefined) {
    return {
      maxValue:  50,

      oldSliderValue: 0,

      oldTotalSelected: 0,

      updateCapacities: function (event, ui) {
        var totalCapacitySelected = 0,
          flexibleMailContainer = $('.flexible-mail-container');

        // Escribimos el valor del selector en el cuadro del slider correspondiente
        $(ui.handle).closest('.flexible-mail-container').find('.capacity span').text(ui.value);

        // Calculamos la suma de las capacidades seleccionadas en los sliders
        flexibleMailContainer.each(function () {
          totalCapacitySelected += +($(this).find('.capacity span').text());
        });

        // Escribimos la suma de las capacidades en el cuadro de espacio total
        $('.total-capacity .capacity-used').text(totalCapacitySelected);
      },

      updateMaxCapacities: function () {
        var capacities = $('.flexible-mail-container .capacity span');

        // Actualizamos el valor mÃ¡ximo de los sliders
        capacities.each(function (index) {
          var maxCapacity = moduloSlidersCorreoFlexible.maxValue - (capacities.eq((index + 1) % 3).text()) - (capacities.eq((index + 2) % 3).text());

          $('#flexible-mail-slider-' + (index + 1)).slider('option', 'max', maxCapacity);

        });
      },

      getOldSliderValue: function (event, ui) {
        moduloSlidersCorreoFlexible.oldSliderValue = ui.value;
      },

      setSliderValue: function (event, ui) {
        var totalCapacitySelected = 0,
          flexibleMailContainer = $('.flexible-mail-container'),
          maxAvailableValue,
          sliderTextBox = $(ui.handle).closest('.flexible-mail-container').find('.capacity span');

        function getTotalCapacitySelected() {
          flexibleMailContainer.each(function () {
            totalCapacitySelected += $(this).find('.slider').slider('value');
          });
        }

        // Calculamos la suma de las capacidades seleccionadas en los sliders
        getTotalCapacitySelected();

        // El valor del slider supera el maximo, por lo que dejamos el valor en el maximo posible
        if (totalCapacitySelected > moduloSlidersCorreoFlexible.maxValue) {
          maxAvailableValue = moduloSlidersCorreoFlexible.oldSliderValue + (moduloSlidersCorreoFlexible.maxValue - moduloSlidersCorreoFlexible.oldTotalSelected);

          $(event.target).slider('option', 'value', maxAvailableValue);

          // Escribimos el valor del selector en el cuadro del slider correspondiente
          sliderTextBox.text(maxAvailableValue);

          // Calculamos la suma de las capacidades seleccionadas en los sliders
          totalCapacitySelected = 0;
          getTotalCapacitySelected();


        } else {
          // Escribimos el valor del selector en el cuadro del slider correspondiente
          sliderTextBox.text(ui.value);
        }

        moduloSlidersCorreoFlexible.oldTotalSelected = totalCapacitySelected;

        // Escribimos la suma de las capacidades en el cuadro de espacio total
        $('.total-capacity .capacity-used')
          .text(totalCapacitySelected)
          .toggleClass('max-warning', totalCapacitySelected === moduloSlidersCorreoFlexible.maxValue);
      }
    };
  })(window);

  // FUNCIONALIDAD PARA MENSAJE DE COOKIES
  // --------------------------------------------------
  if ($('#closeCookie').length) {
    if (localStorage.controlcookie > 0) {
      $('#cookie1').hide();
    } else {
      $('#cookie1').show();
    }

    $('#closeCookie').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      moduloCookies.closeCookieMessage();
    });
  }


  if ($('.hosting-web').length || $('.comparativa-hosting').length) {

    // FUNCIONALIDAD PARA EL SELECTOR DE SISTEMA OPERATIVO DE HOSTING
    // --------------------------------------------------------------
    if ($('.comparativa-hosting').length) {
      if (!sessionStorage.getItem('selectedOS') ) {
        sessionStorage.setItem('selectedOS', 'linux');
      }

      osSelectorHosting.changeTableContent($('li[data-os-type=' + sessionStorage.getItem('selectedOS') + ']'));
    }

    $('.hosting-os-selector li').on('click', function() {
      osSelectorHosting.changeTableContent($(this));
    });

    if ($('.hosting-web').length) {

      // FUNCIONALIDAD PARA EL SLIDER
      // ----------------------------
        // Orden del contenido aleatorio
        moduloSliderCloud.setContent();

        // Ir a contenido anterior
        moduloSliderCloud.config.iconPrevContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'prev');
        });

        // Ir a contenido siguiente
        moduloSliderCloud.config.iconNextContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'next');
        });
    }



    // FUNCIONALIDAD PARA SLIDER DE TIENDAS, CLOUD HIBRIDO Y COLOCATION
  // ------------------------------------------------------------------
  } else if ($('.old-section-slider').length) {

      // Orden del contenido aleatorio
      moduloSliderCloud.setContent();

      // Ir a contenido anterior
      moduloSliderCloud.config.iconPrevContent.on('click', function () {
        moduloSliderCloud.getContent($(this), 'prev');
      });

      // Ir a contenido siguiente
      moduloSliderCloud.config.iconNextContent.on('click', function () {
        moduloSliderCloud.getContent($(this), 'next');
      });

  // FUNCIONALIDADES NUEVAS SECCIONES
  // ------------------------------------------------------------
  } else if ( !$('.home').length && $('.new-section').length ) {
    // Detectamos los items que deben mostrarse animados inicialmente
    moduloCssTransition.initAnimatedItems();

    // Evitamos el auto scroll al refrescar la pagina
      $(window).on('beforeunload', function() {
          $(window).scrollTop(0);
      });

    // FUNCIONALIDADES DEL SCROLL PARA EL MENU DE SECCION
    // --------------------------------------------------
      $(window).on('scroll', function(e) {
        var sectionMenu = $('.section-menu'),
          currentSectionMenuIndex,
          elemOffsetTop = sectionMenu.offset().top,
          sectionMenuPosition,
          animatedItems = $('[data-animate="true"]'),
          currentAnimatedItem,
          windowHeight = $( window ).height(),
          animatedItemsOffsets = moduloCssTransition.config.animatedItemsOffsets,
          animatedItemsState = moduloCssTransition.config.animatedItemsState,
          header = $('#branding'),
          section = $('section'),
          animatedItemsIndex = moduloCssTransition.getCurrentAnimatedItemIndex();



        // Elementos animados
        if (animatedItemsOffsets[animatedItemsIndex] - $(window).scrollTop() <= ($( window ).height() * 0.9)) {
          if (!animatedItemsState[animatedItemsIndex]) {
            animatedItemsState[animatedItemsIndex] = true;

            currentAnimatedItem = animatedItems.eq(animatedItemsIndex);

            if (currentAnimatedItem.data('type') === 'google-web-designer') {
              currentAnimatedItem.attr('src', currentAnimatedItem.data('src'));

              currentAnimatedItem.on('load', function () {
                currentAnimatedItem.addClass('animated');
              });

            } else {
              currentAnimatedItem.addClass('animated');
            }



            // Si esta visible el carrusel quitamos le quitamos la pausa
            if (currentAnimatedItem.is('.slider-container') && currentAnimatedItem.is('.animated')) {
              moduloCarouselGenerico.config.pausedCarousel = false;
            }
          }


          // animatedItemsIndex += 1;
        }

        // El menu esta fijo
        if (sectionMenu.is('.fixed-menu')) {

          // Si hay selector
          if ($('.group-selector').length) {

            // Es gestionado
            if ($('.group-selector li.selected').data('option') === 'gestionado') {
              sectionMenuPosition = section.eq(0).offset().top;

            // Es autogestionado
            } else {
              sectionMenuPosition = section.not('.gestionado').eq(0).offset().top;
            }

          } else {
            sectionMenuPosition = section.eq(0).offset().top;
          }



          if (sectionMenuPosition - $(window).scrollTop() >= 110) {
            sectionMenu.removeClass('fixed-menu');
            header.show();
          }

          // Para evitar que se lance el evento scroll dos veces
          clearTimeout(moduloSectionMenu.config.timeout);
          moduloSectionMenu.config.timeout = setTimeout(function() {
            if (moduloSectionMenu.config.sectionMenuClicked) {
              moduloSectionMenu.config.sectionMenuClicked = false;
              return;

            } else {
              currentSectionMenuIndex =  moduloSectionMenu.getCurrentSectionMenuIndex();
              moduloSectionMenu.updateLinkCurrentSection(e, currentSectionMenuIndex);
            }
          }, 50);

        // El menu no esta fijo
        } else {
          if (elemOffsetTop - $(window).scrollTop() <= 110) {
            sectionMenu.addClass('fixed-menu');
            header.hide();

            // Para evitar que se lance el evento scroll dos veces
            clearTimeout(moduloSectionMenu.config.timeout);
            moduloSectionMenu.config.timeout = setTimeout(function() {
              currentSectionMenuIndex = moduloSectionMenu.getCurrentSectionMenuIndex();
              moduloSectionMenu.updateLinkCurrentSection(e, currentSectionMenuIndex);
            }, 50);
          }
        }
      });

    // FUNCIONALIDAD AL HACER CLICK EN UN ELEMENTO DEL MENU DE SECCION
    // ---------------------------------------------------------------
      $('.section-menu a').on('click', function(e) {
        moduloSectionMenu.config.sectionMenuClicked = true;
        moduloSectionMenu.gotoSelectedSection(e);
      });

    // FUNCIONALIDAD PARA MOSTRAR CARACTERISTICAS DETALLADAS EN TABLAS CON TOGGLE-FEATURES
    // -----------------------------------------------------------------------------------
      if ($('.table-block .toggle-features').length) {
        $('.table-block thead').on('click', function(e) {
          var currentTable = $(e.currentTarget).parent(),
              currentTableIcon = currentTable.find('.acens-icon');

          currentTable.toggleClass('visible');
          currentTableIcon.toggleClass('icon-chevron-down2 icon-chevron-up2');
        })

        $('.table-block .toggle-features').on('click', function(e) {
          var toggleFeatures = $(e.currentTarget),
            toggleFeaturesIcon = toggleFeatures.find('.acens-icon'),
            toggleFeaturesDescription = toggleFeatures.find('.description'),
            descriptionText,
            featureTables = $('.toggle-features ~ table');

          toggleFeatures.toggleClass('visible');
          featureTables.removeClass('visible');
          toggleFeaturesIcon.toggleClass('icon-plus icon-minus');

          descriptionText = ($(e.currentTarget).hasClass('visible')) ? 'Ocultar caracterÃ­sticas detalladas' : 'Mostrar caracterÃ­sticas detalladas';
          toggleFeaturesDescription.text(descriptionText);

        })
      }


    // FUNCIONALIDADES TU WEB
    // ------------------------------------------------------------
      if ($('.new-tu-web').length) {

      // FUNCIONALIDAD PARA MOSTRAR TEMAS EN MODAL
      // ------------------------------------------------------
      $('.section-02 li').on('click', function(e) {
        var modalContainer = $('.modal-container'),
          img = new Image(),
          dataUrl,
          modalContent;

        moduloModal.openModal(e);

        dataUrl = $(e.currentTarget).data('url');

        img.onload = function () {
          modalContainer.prepend(img);
          modalContent = $(img);
          moduloModal.placeCloseButton(modalContent);
        };

        img.src = '/wp-content/themes/acens/images/tu-web/' + dataUrl;
        img.id = 'modal-content';
      });

      // Si hacemos click en el boton
      $('.bg-overlay').on('click', function () {
        moduloModal.closeModal();
      });

      $('a[data-url]').on('click', function(e) {
        moduloSectionMenu.config.sectionMenuClicked = true;
        moduloSectionMenu.gotoSelectedSection(e);
      });

    // FUNCIONALIDADES CLOUD SERVERS
    // ------------------------------------------------------------
    } else if ($('.new-cloud-servers').length) {


      // CAMPO ACUERDO
      //--------------
      $('.cloud-server-xs').closest('.product').find('.product-description a.btn').on('click', function (e) {
        var url ="https://panel.acens.net/cart/#/contratar/11558/",
          extraField = 'eyJhIjoiQUMtT05FQ0xPVUQtMzBEIn0=';

        e.preventDefault();
        window.open(url + extraField, '_blank');
      });

      $('.cloud-server-s').closest('.product').find('.product-description a.btn').on('click', function (e) {
        var url ="https://panel.acens.net/cart/#/contratar/11547/",
          extraField = 'eyJhIjoiQUMtT05FQ0xPVUQtMzBEIn0=';

        e.preventDefault();
        window.open(url + extraField, '_blank');

      });

      $('.cloud-server-m').closest('.product').find('.product-description a.btn').on('click', function (e) {
        var url ="https://panel.acens.net/cart/#/contratar/11545/",
          extraField = 'eyJhIjoiQUMtT05FQ0xPVUQtMzBEIn0=';

        e.preventDefault();
        window.open(url + extraField, '_blank');

      });

      $('.cloud-server-l').closest('.product').find('.product-description a.btn').on('click', function (e) {
        var url ="https://panel.acens.net/cart/#/contratar/11554/",
          extraField = 'eyJhIjoiQUMtT05FQ0xPVUQtMzBEIn0=';

        e.preventDefault();
        window.open(url + extraField, '_blank');

      });


      // FUNCIONALIDAD PARA LA TABLA DINAMICA DE SERVIDOR CLOUD
      // ------------------------------------------------------
        moduloSliderCloud.config.serverLocationLi.on('click', function () {
          dynamicTableCloud.changeTableContent($(this));
        });

      // FUNCIONALIDAD PARA EL SLIDER DE SERVIDOR CLOUD
      // ----------------------------------------------
        // Orden del contenido aleatorio
        moduloSliderCloud.setRandomContent();

        // Ir a contenido anterior
        moduloSliderCloud.config.iconPrevContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'prev');
        });

        // Ir a contenido siguiente
        moduloSliderCloud.config.iconNextContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'next');
        });

        /*
              //Modo automatico
              if (moduloSliderCloud.config.sliderVisibleContent) {
                (function () {
                  var callback = function() {
                    if (moduloSliderCloud.config.position !== moduloSliderCloud.config.testimonial.length) {
                      moduloSliderCloud.getContent($(this), 'next');

                    } else {
                      moduloSliderCloud.getContent($(this), 'first');
                    }
                  };

                  window.setInterval(callback, 5000);
                })();
              }
        */

      // FUNCIONALIDAD PARA LOS TABS DE SERVIDOR CLOUD
      // ---------------------------------------------

        // Click de los tabs
        moduloSliderCloud.config.tabHeader.on('click', function () {
          moduloTabsCloud.updateTabsContent($(this));
        });

        // Click de los productos dentro de un tab
        moduloSliderCloud.config.tabContentIcon.on('click', function () {
          moduloTabsCloud.updateTabsDescription($(this));
        });

    // FUNCIONALIDADES CLOUD GESTIONADO
    // ------------------------------------------------------------
    } else if ($('.new-cloud-gestionado').length) {

      // FUNCIONALIDAD PARA EL SLIDER
      // ----------------------------
        // Orden del contenido aleatorio
        moduloSliderCloud.setContent();

        // Ir a contenido anterior
        moduloSliderCloud.config.iconPrevContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'prev');
        });

        // Ir a contenido siguiente
        moduloSliderCloud.config.iconNextContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'next');
        });


    // FUNCIONALIDADES CLOUD DATACENTER
    // ------------------------------------------------------------
    } else if ($('.new-cloud-datacenter').length) {

      // Pausamos el movimiento hasta que estÃ© visible el carrusel
      moduloCarouselGenerico.config.pausedCarousel = true;


      // FUNCIONALIDAD PARA EL SELECTOR GESTIONADO/AUTOGESTIONADO
      // --------------------------------------------------------
        $('.group-selector li').on('click', function(e) {
          var currentTarget = $(e.currentTarget),
            currentSectionMenuIndex,
            groupSelectorLi = $('.group-selector li'),
            sectionMenu = $('.section-menu'),
            datacenterType = $('.datacenter-type');

          groupSelectorLi.removeClass('selected');
          currentTarget.addClass('selected');

          datacenterType.hide();
          $('.' + currentTarget.data('option')).show();

          sectionMenu.find('a').removeClass('active');

          // Seleccionamos gestionado
          if (currentTarget.data('option') === 'gestionado') {
            sectionMenu.find('.' + currentTarget.data('option')).css('display', 'inline-block').find('a').addClass('active');

          // Seleccionamos autogestionado
          } else {
            sectionMenu.find('li').not('.gestionado').find('a').eq(0).addClass('active');
          }

          // Reseteamos los elementos animables
          moduloCssTransition.resetAnimatedItems();
          moduloCssTransition.initAnimatedItems();
          moduloCssTransition.config.animatedItemsOffsets = moduloCssTransition.getItemsOffsets();
        });

      // FUNCIONALIDAD PARA EL SELECT DE LA TABLA
      // ----------------------------------------
        $('.product select').on('change', function(e) {
          var selectedProduct = $('.' + e.currentTarget.value),
            products = $(e.currentTarget).closest('.product').find('.product-description');

          products.hide();
          selectedProduct.show();
        });


      // FUNCIONALIDAD CAROUSEL GENERICO
      // --------------------------------
        if ($('.slider-container').length) {
          moduloCarouselGenerico.initAllSliders();
        }


      // FUNCIONALIDAD PARA MOSTRAR CONTENIDO EN MODAL
      // ------------------------------------------------------

        // Pausamos el movimiento del carrusel mientras hacemos hover
        $('.slider-overlay').on('mouseenter', function(e) {
          moduloCarouselGenerico.config.pausedCarousel = true;
          $(this).on('mouseleave').off('mouseenter');
        });

        // Volvemos a aplicar el movimiento del carrusel cuando dejamos de hacer hover
        $('.slider-overlay').on('mouseleave', function(e) {
          if ($('.modal-container').is(":visible")) {
            $(this).off('mouseleave').on('mouseenter');

          } else {
            moduloCarouselGenerico.config.pausedCarousel = false;
          }
        });

        $('.slider-overlay, .slider-content').on('click', function(e) {
          var modalContainer = $('.modal-container'),
            img = new Image(),
            dataUrl,
            modalContent,
            currentImageIndex;

          moduloModal.openModal(e);

          currentImageIndex = $('.slider-controls li.selected').index();

          dataUrl = $('.slider-content li').eq(currentImageIndex).data('url');

          img.onload = function () {
            modalContainer.prepend(img);
            modalContent = $(img);
            moduloModal.placeCloseButton(modalContent);
          };

          img.src = '/wp-content/themes/acens/images/cloud-datacenter/' + dataUrl;
          img.id = 'modal-content';
        });

        // Si hacemos click en cualquier sitio cerramos la modal
        $('.bg-overlay').on('click', function () {
          moduloModal.closeModal();
        });

      // FUNCIONALIDAD PARA EL SLIDER
      // ----------------------------
        // Orden del contenido aleatorio
        moduloSliderCloud.setContent();

        // Ir a contenido anterior
        moduloSliderCloud.config.iconPrevContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'prev');
        });

        // Ir a contenido siguiente
        moduloSliderCloud.config.iconNextContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'next');
        });



    // FUNCIONALIDADES CLOUD OFFICE
    // ------------------------------------------------------------
    } else if ($('.new-cloud-office').length) {

      $(function () {
        $('.slider').each(function (index) {
          $('#flexible-mail-slider-' + (index + 1)).slider({
            range: 'min',
            min: 0,
            max: moduloSlidersCorreoFlexible.maxValue,
            value: 0,

            // FUNCIONALIDAD CON CAMBIO DE MAXIMO
            /*
                      slide: function (event, ui) {
                        moduloSlidersCorreoFlexible.updateCapacities(event, ui);
                      },
                      change: function (event, ui) {
                        moduloSlidersCorreoFlexible.updateMaxCapacities(event, ui);
                      },
            */

            // FUNCIONALIDAD MOVIENDO A POSICION ANTERIOR SLIDER SI LA SUMA SUPERA EL MAXIMO
            start: function (event, ui) {
              moduloSlidersCorreoFlexible.getOldSliderValue(event, ui);
            },
            stop: function (event, ui) {
              moduloSlidersCorreoFlexible.setSliderValue(event, ui);
            }
          });
        });
      });

    // FUNCIONALIDADES CLOUD BACKUP PC
    // ------------------------------------------------------------
    } else if ($('.new-cloud-backup-pc').length) {
      // FUNCIONALIDAD PARA EL SLIDER
      // ----------------------------
        // Orden del contenido aleatorio
        moduloSliderCloud.setContent();

        // Ir a contenido anterior
        moduloSliderCloud.config.iconPrevContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'prev');
        });

        // Ir a contenido siguiente
        moduloSliderCloud.config.iconNextContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'next');
        });

    // FUNCIONALIDADES CLOUD BACKUP SERVIDOR
    // ------------------------------------------------------------
    } else if ($('.new-cloud-backup-servidor').length) {
      $('.product select').on('change', function(e) {
        var selectedProduct = $(e.currentTarget),
          selectedProductPrice = $(e.currentTarget).find(':selected').data('price'),
          selectedProductDuration = $(e.currentTarget).find(':selected').val(),
          closestProduct = selectedProduct.closest('.product'),
          retentionText;

          closestProduct.find('.price .integer').text(selectedProductPrice);

          if (selectedProduct.find(':selected').data().btnText) {
            closestProduct.find('.btn span:first-child').text(selectedProduct.find(':selected').data().btnText);
            closestProduct.addClass('special-offer');
          } else {
            closestProduct.find('.btn span:first-child').text('Continuar');
            closestProduct.removeClass('special-offer');
          }

          if (selectedProductDuration === '1 aÃ±o') {
            retentionText = 'del Ãºltimo ';
            selectedProductDuration = 'aÃ±o';

          } else {
            retentionText = 'de los Ãºltimos ';
          }

          closestProduct.find('.retention-text .last-text').text(retentionText);
          closestProduct.find('.retention-text strong').text(selectedProductDuration);
      });

      $('.product-description .continue-link').on('click', function(e) {
        var query = $(e.currentTarget).closest('.product').find(':selected').data('query');

        e.preventDefault();

        window.open('https://panel.acens.net/cart/#/contratar/11358/' + query, '_blank');

      });

      // FUNCIONALIDAD PARA EL SLIDER
      // ----------------------------
        // Orden del contenido aleatorio
        moduloSliderCloud.setContent();

        // Ir a contenido anterior
        moduloSliderCloud.config.iconPrevContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'prev');
        });

        // Ir a contenido siguiente
        moduloSliderCloud.config.iconNextContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'next');
        });

    // FUNCIONALIDADES CERTIFICADOS SSL
    // ------------------------------------------------------------
    } else if ($('.new-certificados-ssl').length) {
      $('.product select').on('change', function(e) {
        var selectedProduct = $(e.currentTarget),
          selectedProductPrice = $(e.currentTarget).find(':selected').data('price'),
          selectedProductInsurance = $(e.currentTarget).find(':selected').data('insurance'),
          closestProduct = selectedProduct.closest('.product'),
          selectedProductName = $(e.currentTarget).find(':selected').data('name'),
          selectedProductWildcard = $(e.currentTarget).find(':selected').data('wildcard');

          closestProduct.find('.price .integer').text(selectedProductPrice);
          closestProduct.find('.insurance-coverage span').text(selectedProductInsurance);

          closestProduct.removeClass (function (index, className) {
              return (className.match (/\logo-\S+/g) || []).join(' ');
          });

          closestProduct.addClass('logo-' + selectedProductName);

          closestProduct.find('.wildcard .acens-icon').removeClass (function (index, className) {
              return (className.match (/\icon-\S+/g) || []).join(' ');
          });

          closestProduct.find('.wildcard .acens-icon').addClass(selectedProductWildcard);
      });

      $('.product .product-description a.btn').on('click', function(e) {
        var url  = 'https://panel.acens.net/cart/#/contratar/',
          currentTarget = $(e.currentTarget),
          id = currentTarget.closest('.product').find('select option:selected').data('id');

        e.preventDefault();

        window.open(url + id, '_blank');

      });


      // FUNCIONALIDAD PARA EL SLIDER
      // ----------------------------
        // Orden del contenido aleatorio
        moduloSliderCloud.setContent();

        // Ir a contenido anterior
        moduloSliderCloud.config.iconPrevContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'prev');
        });

        // Ir a contenido siguiente
        moduloSliderCloud.config.iconNextContent.on('click', function () {
          moduloSliderCloud.getContent($(this), 'next');
        });
    }


  } else if ($('.partners-page').length) {

    // BOTON PARA VOLVER ARRIBA
    // ------------------------
    if ($('.go-top-btn').length) {

      $(window).scroll(function () {
        var goTopBtn = $('.go-top-btn');

        if ($(this).scrollTop() > 300) {
          goTopBtn.fadeIn(300);

        } else {
          goTopBtn.fadeOut(300);
        }
      });

      $('.go-top-btn').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
      });
    }

    // FUNCIONALIDAD AL HACER CLICK EN UN ELEMENTO DEL MENU DE SECCION
    // ---------------------------------------------------------------
      $('.dropdown-toggle, .animated-text .button').on('click', function(e) {
        if ($(e.currentTarget).attr("data-url")) {
          moduloSectionMenuPartners.config.sectionMenuClicked = true;
          moduloSectionMenuPartners.gotoSelectedSection(e);
        }
      });

    // FUNCIONALIDADES DEL SCROLL PARA EL MENU DE SECCION
    // --------------------------------------------------
    $(window).on('scroll', function(e) {
      var sectionMenu = $('.section-menu'),
        currentSectionMenuIndex,
        elemOffsetTop = sectionMenu.offset().top,
        sectionMenuPosition,
        windowHeight = $( window ).height(),
        bloque = $('.bloque');


        if ( ($(window).width() > screenSmMax) ) {
          sectionMenuPosition = bloque.eq(0).offset().top;

          // Para evitar que se lance el evento scroll dos veces
          clearTimeout(moduloSectionMenuPartners.config.timeout);
          moduloSectionMenuPartners.config.timeout = setTimeout(function() {
            if (moduloSectionMenuPartners.config.sectionMenuClicked) {
              moduloSectionMenuPartners.config.sectionMenuClicked = false;
              return;

            } else {
              currentSectionMenuIndex =  moduloSectionMenuPartners.getCurrentSectionMenuIndex();
              moduloSectionMenuPartners.updateLinkCurrentSection(e, currentSectionMenuIndex);
            }
          }, 50);

        }
    });

    // FUNCIONALIDAD CAROUSEL PARTNERS
    // --------------------------------
    if ($('.slider-container').length) {
      moduloCarouselPartners.initAllSliders();

      if ($('.clickable').length) {
        $('.clickable').on('click', function(e) {
          var dataHref = $(e.currentTarget).data('href');
          window.location = dataHref;
        });
      }

      // Inicializamos el carrusel al cambiar el tamanyo de pantalla
      $(window).on('resize', function () {
        var sliderContent = $('.slider-container .slider-content'),
          intervalIdsArrayCopy = moduloCarouselPartners.config.intervalIdsArray.slice(),
          i;

        if ($('html').is('.ie8')) {
          $(window).off('resize');

        } else {
          // Hacemos clear de todos los setInterval
          // Usamos una copia de moduloCarouselPartners.config.intervalIdsArray para que no le afecte la eliminacion
          // de elementos que hacemos en el original
          for (i = intervalIdsArrayCopy.length - 1; i >= 0 ; i -= 1) {
            moduloCarouselPartners.deleteTimer(i);

            // Si hacemos resize cuando se esta moviendo slide, cancelamos sliderContent.animate del moveToSlide
            sliderContent.eq(i).finish();
          }

          moduloCarouselPartners.initAllSliders();
        }
      });
    }

    // CARGA INICIAL DEL VIDEO
    // -----------------------
    if ( ($(window).width() > screenSmMax) ) {
      moduloVideo.loadVideo();
    }


    // CARGA/ELIMINA VIDEO EN RESIZE
    // -----------------------------
      $(window).on('resize', function () {
        var video;

        if ( ($(window).width() > screenSmMax) ) {
          video = document.querySelector('.video-container video');

          if (video.readyState === 0) {
            moduloVideo.loadVideo();
          }
        } else {
          moduloVideo.unloadVideo();
        }

      });

  // addsearch
  } else if ($('.category-pressroom').length) {

    $('#searchform').on('submit', function(e) {
      var search = $(e.currentTarget).find('input').val();
        e.preventDefault();
        e.stopPropagation();

        window.location.href = 'https://www.acens.com/buscar/?addsearch=' + search;

    });


  }

  $('#searchsubmit').on('click', function() {
    $('#searchform').submit();
  });


});

