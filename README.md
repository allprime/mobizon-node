[Русский](#Библиотека-для-работы-с-АПИ-mobizon) | [English](#library-for-communicating-with-mobizon-sms-http-api)

# Библиотека для работы с АПИ Mobizon

В версиях Node.js < 6.3.0 необходимо запускать с флагом `--harmony-proxies`. Например,
`node --harmony-proxies script.js`

Для начала работы с API Вам необходимо сделать три простых шага:

1. [Зарегистрироваться](https://mobizon.kz/registration) в системе [Mobizon](https://mobizon.kz/)
2. [Включить](https://mobizon.kz/bulk-sms/gateway/api#1) в своем аккаунте доступ к API
3. Получить ключ API - после включения доступа к API Вам будет сгенерирован и показан ключ доступа.

Подробнее процесс подключения к API описан [на нашем сайте](https://mobizon.kz/bulk-sms/gateway/api)

# Установка через npm

`npm install --save mobizon`

# Документация по методам API

Документация с описанием всех доступных на данный момент [методов API](http://docs.mobizon.com/api/),
их входных параметров, формата возвращаемых данных, списка возможных
[кодов ответа API](http://docs.mobizon.com/api/class-codes.ApiCodes.html) доступна по адресу [http://docs.mobizon.com/api/](http://docs.mobizon.com/api/).

# Примеры реализации типичных сценариев
    mobizon = require(mobizon)("Ваш ключ API");
    // Получение состояния баланса
    mobizon.User.GetOwnBalance()
    // Отправка SMS сообщения
    mobizon.Message.SendSMSMessage({recipient: '+77778227450', text: 'Success'})

---

# Library for communicating with Mobizon SMS HTTP API

For Node.js < 6.3.0 you need run node with `--harmony-proxies` flag. Example,
`node --harmony-proxies script.js`

To start sending SMS messages through Mobizon API you should do three simple steps:

1. [Register account](https://mobizon.kz/registration) on [Mobizon](https://mobizon.kz/) website
2. [Enable API](https://mobizon.kz/bulk-sms/gateway/api#1) in your Mobizon account settings
3. Copy API key - when you enable API access in your account, system provides you with API key, which you use then in your software.

Details of connection your software to API is described at  [Mobizon website](https://mobizon.kz/bulk-sms/gateway/api)

# Install throw npm

`npm install --save mobizon`

# API methods documentation

You could review online documentation for detailed description of all currently available [API methods](http://docs.mobizon.com/api/),
input parameters, result formats, [API result codes](http://docs.mobizon.com/api/class-codes.ApiCodes.html) at [http://docs.mobizon.com/api/](http://docs.mobizon.com/api/).

# Typical scenarios code

We have started development of typical usage scenarios in [docs/examples](https://github.com/mobizon/mobizon-php/tree/master/docs/examples).
If you have own examples of integration, please help us improve our code base - just send us some code examples to support@mobizon.com and we will glad to put your code to our repo.

    mobizon = require(mobizon)("YOUR API KEY");
    // Get balance amount
    mobizon.User.GetOwnBalance()
    // Send SMS message
    mobizon.Message.SendSMSMessage({recipient: '+77778227450', text: 'Success'})
