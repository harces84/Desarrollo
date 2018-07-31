'use strict';

$(document).ready(function () {

    function validarFormularioCampo(campo){
        var formFieldId = $('#' + campo),
            formFieldIdError = $('#error_' + campo),
            formFieldIdContainer = formFieldId.closest('.form-field-container'),
            errorMessage;

        formFieldIdContainer.toggleClass('field-form-error', formFieldId.val() === '');

        errorMessage = formFieldIdContainer.is('.field-form-error') ? 'El campo es necesario.' : '';
        formFieldIdError.html(errorMessage);

        return !formFieldIdContainer.is('.field-form-error');
    }

    function validarFormularioEmail(campo){
        var formFieldId = $('#' + campo),
            formFieldIdError = $('#error_' + campo),
            formFieldIdContainer = formFieldId.closest('.form-field-container'),
            re_mail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/,
            errorMessage;

        if (formFieldId.val() === '' || !re_mail.exec(formFieldId.val())) {
            formFieldIdContainer.addClass('field-form-error');

            if (formFieldId.val() === '') {
                errorMessage = 'El campo es necesario.';

            } else {
                errorMessage = 'No es un <strong>email</strong> v&aacute;lido.';
            }

        } else {
            formFieldIdContainer.removeClass('field-form-error');
            errorMessage = '';
        }

        formFieldIdError.html(errorMessage);

        return !formFieldIdContainer.is('.field-form-error');
    }

    function validarFormularioPhone(campo){
        var formFieldId = $('#' + campo),
            formFieldIdError = $('#error_' + campo),
            formFieldIdContainer = formFieldId.closest('.form-field-container'),
            re_phone = /^(\+34|0034|34)?[6|7|9][0-9]{8}$/,
            errorMessage;

        if (formFieldId.val() === '' || !re_phone.exec(formFieldId.val())) {
            formFieldIdContainer.addClass('field-form-error');

            if (formFieldId.val() === '') {
                errorMessage = 'El campo es necesario.';

            } else {
                errorMessage = 'No es un <strong>telÃ©fono</strong> v&aacute;lido.';
            }

        } else {
            formFieldIdContainer.removeClass('field-form-error');
            errorMessage = '';
        }

        formFieldIdError.html(errorMessage);

        return !formFieldIdContainer.is('.field-form-error');
    }

    function validarFormularioCheck(campo){
        var formFieldId = $('#' + campo),
            formFieldIdError = $('#error_' + campo),
            formFieldIdContainer = formFieldId.closest('.form-field-container'),
            re_phone=/^(\+34|0034|34)?[6|7|9][0-9]{8}$/,
            errorMessage;

        if (!formFieldId.is(':checked')) {
            formFieldIdContainer.addClass('field-form-error');
            errorMessage = 'Debes aceptar los <strong>t&eacute;rminos y condiciones de uso</strong>.';

        } else {
            formFieldIdContainer.removeClass('field-form-error');
            errorMessage = '';
        }

        formFieldIdError.html(errorMessage);

        return !formFieldIdContainer.is('.field-form-error');
    }


    function showLengthError(e){
        var el=$(e.target);
        var sInput2 = $('#error_' + el.attr('id'));
        if(el.val().length>=3500){
            el.css({border : "1px solid #d12f19",background :"#f7cbc2"});

            sInput2.show();
            sInput2.css({color : "#d12f19",marginBottom :"10px"});
            sInput2.text("Ha llegado al nÃºmero mÃ¡ximo de caracteres permitidos");
        }
        else{
            el.css({border : "0",background :"#ffffff"});
            sInput2.hide();
            $('#error_' + el.attr('id')).val("");
        }
    }


    $('#first_name').on('blur', function(e) {
        validarFormularioCampo('first_name');
    });

    $('#email').on('blur', function(e) {
        validarFormularioEmail('email');
    });

    $('#phone').on('blur', function(e) {
        validarFormularioPhone('phone');
    });

    $('#00ND0000003lovg').on('click', function(e) {
        validarFormularioCheck('00ND0000003lovg');
    });

    $('.btn-submit').on('click', function(e) {
        var errorFirstName,
            validFieldFirstName,
            validFieldEmail,
            validFieldPhone,
            validFieldCheck;

        e.preventDefault();

        validFieldFirstName = validarFormularioCampo('first_name');
        validFieldEmail = validarFormularioEmail('email');
        validFieldPhone = validarFormularioPhone('phone');
        validFieldCheck = validarFormularioCheck('00ND0000003lovg');

        if (validFieldFirstName && validFieldEmail && validFieldPhone && validFieldCheck) {
            $('#contact-form').submit();
        }
    });

});