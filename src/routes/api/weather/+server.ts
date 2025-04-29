// src/routes/api/weather/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { OPENWEATHER_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async () => {
    const city = 'Budapest';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hu`;

    const res = await fetch(url);
    if (!res.ok) {
        return new Response('Nem sikerült lekérni az időjárást', { status: 500 });
    }

    const data = await res.json();

    const weather = {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        rainChance: data.weather[0]?.main === 'Rain' ? 'Eső várható' : 'Nem várható eső',
        description: data.weather[0]?.description  
    };

    return new Response(JSON.stringify(weather), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
