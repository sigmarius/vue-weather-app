// API погоды
// Личный кабинет: https://www.weatherapi.com/my/
export const API_ENDPOINT = 'https://api.weatherapi.com/v1';
export const API_KEY = import.meta.env.VITE_API_KEY;

// ошибки API
export const errorMap = new Map([
    [1006, "Указанный город не найден"]
]);

export const cityProvide = Symbol('city');