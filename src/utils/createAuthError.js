export function generateAuthError(error) {
    switch (error) {
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует"
        case "INVALID_PASSWORD":
            return "Пароль введен неверно"
        case "EMAIL_NOT_FOUND":
            return "Пользователь с таким email не найден"
    }
}