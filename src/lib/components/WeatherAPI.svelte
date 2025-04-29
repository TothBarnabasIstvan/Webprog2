<!-- src/lib/components/WeatherAPI.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    let weatherData: {
        temperature?: number;
        humidity?: number;
        rainChance?: string;
        description?: string;
        city?: string;
    } = {};
    let loading = true;
    let error = '';
    onMount(async () => {
        try {
            const response = await fetch('/api/weather');
            if (!response.ok) throw new Error('Nem sikerült lekérni az időjárási adatokat');
            weatherData = await response.json();
        } catch (err) {
            error = err instanceof Error ? err.message : 'Ismeretlen hiba történt';
        } finally {
            loading = false;
        }
    });

    function getWeatherEmoji(description: string | undefined): string {
        if (!description) return '❓';

        const desc = description.toLowerCase();
        if (desc.includes('napos') || desc.includes('tiszta')) return '☀️';
        if (desc.includes('felhős') && desc.includes('részben')) return '⛅';
        if (desc.includes('felhős')) return '☁️';
        if (desc.includes('eső') || desc.includes('zápor')) return '🌧️';
        if (desc.includes('zivatar') || desc.includes('vihar')) return '⛈️';
        if (desc.includes('hó') || desc.includes('havazás')) return '❄️';
        if (desc.includes('köd')) return '🌫️';

        return '🌤️';
    }
</script>

<div class="weather-container">
    <h2 class="weather-title">Aktuális időjárás</h2>
    <div class="weather-bar">
        {#if loading}
            <div class="loading">⏳ Időjárás betöltése...</div>
        {:else if error}
            <div class="error">⚠️ {error}</div>
        {:else}
            <div class="weather-item">
                <span class="emoji">🏙️</span>
                <span class="value">{weatherData.city || 'Budapest'}</span>
            </div>
            <div class="weather-item">
                <span class="emoji">🌡️</span>
                <span class="value">{weatherData.temperature?.toFixed(1)}°C</span>
            </div>
            <div class="weather-item">
                <span class="emoji">💧</span>
                <span class="label">Páratartalom:</span>
                <span class="value">{weatherData.humidity}%</span>
            </div>
            <div class="weather-item">
                <span class="emoji">{weatherData.rainChance?.includes('várható') ? '☔' : '🌂'}</span>
                <span class="value">{weatherData.rainChance}</span>
            </div>
            <div class="weather-item">
                <span class="emoji">{getWeatherEmoji(weatherData.description)}</span>
                <span class="value">{weatherData.description || 'Nincs adat'}</span>
            </div>
        {/if}
    </div>
</div>

<style>
    .weather-container {
        margin-top: 2.5rem;
        margin-bottom: 2rem;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 1.25rem;
        background-color: #f7fafc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .weather-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 1rem;
        text-align: center;
        border-bottom: 1px dashed #cbd5e0;
        padding-bottom: 0.75rem;
    }

    .weather-bar {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: white;
        border-radius: 8px;
        padding: 0.75rem 1.25rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        flex-wrap: wrap;
        justify-content: center;
    }

    .weather-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.95rem;
        padding: 0.5rem;
    }

    .emoji {
        font-size: 1.1rem;
    }

    .label {
        color: #666;
        margin-right: 0.2rem;
        font-size: 0.9rem;
    }

    .value {
        font-weight: 500;
        color: #333;
    }

    .loading, .error {
        padding: 0.5rem 0;
        color: #666;
    }

    .error {
        color: #e53e3e;
    }

    @media (max-width: 640px) {
        .weather-container {
            margin-top: 1.5rem;
            padding: 1rem;
        }

        .weather-bar {
            gap: 1rem;
            padding: 0.75rem;
        }

        .weather-item {
            font-size: 0.85rem;
        }
    }
</style>