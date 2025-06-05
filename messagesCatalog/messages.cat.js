const ALREADY_REGISTERED = {
    rus: "Вы уже зарегистрированы! Попробуйте выполнить команду /unregister (если ранее пробовали авторизоваться), после чего /register",
    eng: "You are already registered with Zulip credentials. Try unregister (if you tried to register before) and register again!"
}

const NOT_REGISTERED = {
    rus: "Вы еще не зарегистрированы! Попробуйте выполнить команду /unregister (если ранее пробовали авторизоваться), после чего /register",
    eng: "You are not registered with Zulip credentials. Try unregister (if you tried to register before) and register again!"
}

const WRONG_API_KEY = {
    rus: "Что-то не так с вашим ключом API. Попробуйте позже или измените ваши данные с помощью /changeapikey",
    eng: "Something is wrong with your api key. Try again later with another credentials"
}

const SUCCESS_UPDATE_API_KEY = {
    rus: "Ваш ключ API был успешно обновлен!",
    eng: "Your api key for Zulip successfully updated!"
}

const SUCCESS_UPDATE_TIMEOUT = {
    rus: "Ваш таймаут до уведомления был успешно обновлен!",
    eng: "Your notification timeout has been upgraded!"
}

const SMTHNG_WENT_WRONG = {
    rus: "Что-то пошло не так при последней операции!",
    eng: "Something went wrong in processing of last task!"
}

const WRONG_SEC_INPUT = {
    rus: "Вы ввели невалидные данные. Введите время в секундах. Попробуйте вновь!",
    eng: "You entered wrong value. Enter value in seconds. Try again!"
}

const UNKNOWN_CONTEXT = {
    rus: "Неизвестный контекст исполнения - попробуйте другую команду",
    eng: "UNKNOWN CONTEXT OF EXECUTION"
}

const ENTER_EMAIL = {
    rus: "Введите ваш email - доменный адрес",
    eng: "Enter your email - domain address"
}

const ENTER_ZULIP_URL = {
    rus: "Введите адрес URL вашего Zulip сервера. Обязательно в конце должен быть висящий слэш /",
    eng: "Enter your zulip server url WITH A CLOSING SLASH IN THE END OF THE URL"
}

const WRONG_CREDENTIALS = {
    rus: "Произошла ошибка при попытке верификации ваших учетных данных Zulip. Попробуйте с другими данными",
    eng: "There was an error while verifying your Zulip credentials. Try again with another credentials"
}

const GOOD_CREDENTIALS = {
    rus: "Ваши учетные данные валидны! Пытаюсь сохранить данные о Вас в свою БД",
    eng: "Your credentials is OK! Trying to save your data in my DB"
}

const USER_CREATED = {
    rus: "Учетная запись успешно создана. Сохраняю ваши учетные данные Zulip в свою базу",
    eng: "User successfully created. Trying to save your Zulip credentials in my DB"
}

const REGISTER_SUCCESS = {
    rus: "Ваши учетные данные Zulip успешно сохранены. Процесс регистрации завершен",
    eng: "Your Zulip credentials saved successfully. Registration process is finished!"
}

const CHANGEAPIKEY_MODE = {
    rus: "Вы уже в режиме смены API ключа. Следуйте предыдущей инструкции.",
    eng: "You are now in changeapikey mode, follow previous step"
}

const ASK_NEWAPIKEY ={
    rus: "Введите новый API ключ от приложения Zulip",
    eng: "Enter your NEW API KEY from Zulip application"
}

const CHANGETIMEOUT_MODE = {
    rus: "Вы уже в режиме смены таймаута уведолмения. Следуйте предыдущей инструкции.",
    eng: "You are now in changetimeout mode, follow previous step"
}

const ASK_NEWTIMEOUT ={
    rus: "Введите новое значение таймаута уведомления в секундах",
    eng: "Enter your new notification timeout in seconds"
}

const REGISTER_MODE = {
    rus: "Вы уже в режиме регистрации. Следуйте предыдущей инструкции.",
    eng: "You are now in register mode, follow previous step"
}

const ASK_APIKEY ={
    rus: "Введите Ваш API ключ из приложения Zulip",
    eng: "Enter your API key from Zulip application"
}

const ACC_IS_FROZEN = {
    rus: "Ваш аккаунт заморожен. Выполните /unfreeze и повторите запрос",
    eng: "Your account is frozen. Unfreeze it first and try again!"
}

const CORRUPTED_ACC = {
    rus: "Ваше учетные данные Zulip перестали быть валидными. Выполните /changeapikey и попытайтесь снова",
    eng: "Your zulip credentials was corrupted. Exec /changeapikey and try again!"
}

const OLD_APIKEY = {
    rus: "Что-то не так с Вашим ключом API. Кажется, он был изменен в приложении Zulip. Обновите его в моей БД с помощью /changeapikey",
    eng: "Something is wrong with your api key. Seems like you changed it in the app. Renew it in my DB"
}

const ALL_IS_GOOD = {
    rus: "Все прошло отлично!",
    eng: "Everything works fine!",
}

const ALREADY_FROZEN = {
    rus: "Ваш аккаунт уже заморожен или не существует",
    eng: "You are already frozen or you dont exist"
}

const FREEZE_FAILED = {
    rus: "Произошла ошибка при попытке заморозить Ваш аккаунт",
    eng: "There was an error while trying to freeze you"
}

const FREEZE_SUCCESS = {
    rus: "Ваш аккаунт успешно заморожен",
    eng: "You are frozen successfully"
}

const ALREADY_UNFROZEN = {
    rus: "Ваш аккаунт уже разморожен или не существует",
    eng: "You are already unfrozen or you dont exist"
}

const UNFREEZE_FAILED = {
    rus: "Произошла ошибка при попытке разморозить Ваш аккаунт",
    eng: "There was an error while trying to unfreeze you"
}

const UNFREEZE_SUCCESS = {
    rus: "Ваш аккаунт успешно разморожен",
    eng: "You are unfrozen successfully"
}

const UNREGISTER_SUCCESS = {
    rus: "Удаление учетной записи прошло успешно",
    eng: "Your account successfully unregistered!"
}

const CHOOSE_ACTION = {
    rus: "Выберите действие: ",
    eng: "Choose action: "
}

module.exports = {
    CHANGEAPIKEY_MODE,
    ASK_NEWAPIKEY,
    NOT_REGISTERED,
    WRONG_API_KEY,
    SUCCESS_UPDATE_API_KEY,
    SMTHNG_WENT_WRONG,
    WRONG_SEC_INPUT,
    SUCCESS_UPDATE_TIMEOUT,
    UNKNOWN_CONTEXT,
    ENTER_ZULIP_URL,
    ENTER_EMAIL,
    WRONG_CREDENTIALS,
    USER_CREATED,
    REGISTER_SUCCESS,
    GOOD_CREDENTIALS,
    ACC_IS_FROZEN,
    CORRUPTED_ACC,
    OLD_APIKEY,
    ALL_IS_GOOD,
    CHANGETIMEOUT_MODE,
    ASK_NEWTIMEOUT,
    ALREADY_FROZEN,
    FREEZE_FAILED,
    FREEZE_SUCCESS,
    REGISTER_MODE,
    ASK_APIKEY,
    UNFREEZE_SUCCESS,
    UNFREEZE_FAILED,
    ALREADY_UNFROZEN,
    UNREGISTER_SUCCESS,
    CHOOSE_ACTION,
    ALREADY_REGISTERED
}