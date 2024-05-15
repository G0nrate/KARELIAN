document.querySelector('.burger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.navigation').classList.toggle('open');
})
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('subscription-form');
    var successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        // Ваш код для обработки подписки
        // Здесь можно отправить данные формы на сервер или выполнить другие действия

        // Показываем сообщение о успешной подписке
        successMessage.textContent = 'Вы успешно подписаны на нашу рассылку!';
        successMessage.style.display = 'block';

        // Очищаем поле ввода email
        document.getElementById('email-input').value = '';
    });
});
// JavaScript код для отображения подтверждающего сообщения
const callForm = document.getElementById('call-form');
const confirmationMessage = document.getElementById('confirmation-message');

callForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Здесь может быть ваша логика отправки формы на сервер или другие действия

    // Отображаем подтверждающее сообщение
    confirmationMessage.style.display = 'block';

    // Очищаем поле ввода номера телефона (если не нужно, это можно убрать)
    document.getElementById('phone-input').value = '';
});
