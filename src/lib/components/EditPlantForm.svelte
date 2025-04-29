<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

    let id = get(page).params.id;

    let name = '';
    let species = '';
    let location = '';
    let lastWatered = '';
    let wateringInterval: number | null = null;
    let notes = '';

    let loading = false;

    onMount(async () => {
        loading = true;
        const res = await fetch(`/api/plants/${id}`);
        if (res.ok) {
            const plant = await res.json();
            name = plant.name;
            species = plant.species;
            location = plant.location ?? '';
            lastWatered = plant.lastWatered ?? '';
            wateringInterval = plant.wateringInterval ?? null;
            notes = plant.notes ?? '';
        }
        loading = false;
    });

    async function updatePlant() {
        loading = true;
        const res = await fetch(`/api/plants/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, species, location, lastWatered, wateringInterval, notes })
        });

        if (res.ok) {
            goto('/dashboard'); // sikeres mentés után vissza a dashboardra
        }
        loading = false;
    }
</script>

{#if loading}
    <LoadingSpinner />
{:else}
<form on:submit|preventDefault={updatePlant} class="form-container">
    <div class="input-container">
        <label for="name">Név</label>
        <input id="name" bind:value={name} placeholder="Név" required />
    </div>
    <div class="input-container">
        <label for="species">Faj</label>
        <input id="species" bind:value={species} placeholder="Faj" required />
    </div>
    <div class="input-container">
        <label for="location">Helyszín</label>
        <input id="location" bind:value={location} placeholder="Helyszín" />
    </div>
    <div class="input-container">
        <label for="lastWatered">Utoljára öntözve</label>
        <input id="lastWatered" type="date" bind:value={lastWatered} placeholder="Utoljára öntözve" />
    </div>
    <div class="input-container">
        <label for="wateringInterval">Öntözési időköz (napokban)</label>
        <input id="wateringInterval" type="number" bind:value={wateringInterval} placeholder="Öntözési időköz" />
    </div>
    <div class="input-container">
        <label for="notes">Megjegyzések</label>
        <textarea id="notes" bind:value={notes} placeholder="Megjegyzések"></textarea>
    </div>
    <button type="submit" class="submit-button">Mentés</button>
</form>
{/if}

<style>
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden; /* Biztosítja, hogy a form tartalma ne lógjon ki */
    }

    .input-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-weight: bold;
        font-size: 1rem;
        color: #333;
    }

    input, textarea {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        font-size: 1rem;
        width: 100%; /* Biztosítja, hogy a mezők teljes szélességűek legyenek */
        box-sizing: border-box; /* A padding ne okozzon kilógást a mezőkből */
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    textarea {
        resize: vertical;
        min-height: 100px;
    }

    .submit-button {
        background-color: #4CAF50;
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.25rem;
        font-size: 1rem;
        cursor: pointer;
        align-self: flex-start;
    }

    .submit-button:hover {
        background-color: #45a049;
    }
</style>
