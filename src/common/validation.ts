export const validationRules = {
    requiredField: (fieldName: string = 'Поле') => ({
        required: `Поле ${fieldName} обязательно`,
    }),

    email: {
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Некорректный email',
        },
    },
    password: {
        required: 'Пароль обязателен',
        minLength: {
            value: 8,
            message: 'Минимум 8 символов',
        },
    },
    phone: {
        pattern: {
            value: /^(\+375|80)[0-9]{9}$/,
            message: 'Формат: +375291234567 или 80291234567',
        },
    },
    url: {
        required: 'Ссылка обязательна',
        pattern: {
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            message: 'Некорректный URL',
        },
    },
    maxLength500: {
        maxLength: {
            value: 500,
            message: 'Максимум 500 символов',
        },
    },

    minTwoItems: (fieldName: string = 'Элементы') => ({
        required: `Необходимо от 2 ${fieldName}`,
        validate: (value: unknown[]) => {
            if (value.length < 2) return `Необходимо от 2 ${fieldName}`;
        },
    }),

    aboutMe: {
        maxLength: {
            value: 500,
            message: 'Максимум 500 символов',
        },
    },
};
