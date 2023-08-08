const form = document.getElementById('card-form');
const cardThumbnail = document.getElementById('card-thumbnail');

form.bank.addEventListener('change', function () {
    document.getElementById('bank-logo').src = `images/${this.value}.png`;
});

form['payment-system'].addEventListener('change', function () {
    document.getElementById('payment-system-logo').src = `images/${this.value}.png`;
});

form['card-number'].addEventListener('input', function () {
    const value = this.value.replace(/\D/g, '').slice(0, 16); // Удаляем все нецифровые символы и ограничиваем длину 16 символами
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim(); // Группируем по 4 символа и удаляем лишние пробелы
    this.value = formattedValue; // Обновляем значение в поле ввода
    document.getElementById('actual-card-number').value = value; // Сохраняем значение без пробелов в скрытом поле
    formattedValue ? document.getElementById('card-number-thumbnail').innerText = formattedValue : document.getElementById('card-number-thumbnail').innerText = `XXXX XXXX XXXX XXXX`; // Обновляем миниатюру
});

form['cardholder-name'].addEventListener('input', function () {
    const value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Удаляем все символы, кроме букв и пробелов
    this.value = value; // Обновляем значение в поле ввода
    this.value ? document.getElementById('cardholder-name-thumbnail').innerText = value : document.getElementById('cardholder-name-thumbnail').innerText = `ИМЯ ДЕРЖАТЕЛЯ`; // Обновляем миниатюру
});


form['expiry-date'].addEventListener('input', function () {
    let value = this.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    const formattedValue = value.slice(0, 5); // Ограничиваем длину до 5 символов (MM/YY)
    this.value = formattedValue; // Обновляем значение в поле ввода

    document.getElementById('expiry-date-thumbnail').innerText = formattedValue; // Обновляем миниатюру
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const bank = event.target.bank.value;
    const paymentSystem = event.target['payment-system'].value;
    const cardNumber = document.getElementById('actual-card-number').value;
    const cardholderName = event.target['cardholder-name'].value;
    const expiryDate = event.target['expiry-date'].value;

    if (cardNumber.length < 16) {
        alert('Номер карты должен содержать 16 цифр.');
        event.preventDefault(); // Останавливаем отправку формы
        return;
    }

    // Добавление данных в таблицу
    const table = document.getElementById('card-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    row.insertCell(0).innerHTML = bank;
    row.insertCell(1).innerHTML = paymentSystem;
    row.insertCell(2).innerHTML = cardNumber;
    row.insertCell(3).innerHTML = cardholderName;
    row.insertCell(4).innerHTML = expiryDate;

    // Очистка формы и миниатюры
    event.target.reset();
    document.getElementById('bank-logo').src = 'images/sber.png';
    document.getElementById('payment-system-logo').src = 'images/visa.png';
    document.getElementById('card-number-thumbnail').innerText = 'XXXX XXXX XXXX XXXX';
    document.getElementById('cardholder-name-thumbnail').innerText = 'ИМЯ ДЕРЖАТЕЛЯ';
    document.getElementById('expiry-date-thumbnail').innerText = 'ММ/ГГ';
});