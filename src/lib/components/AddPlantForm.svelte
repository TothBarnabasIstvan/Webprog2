<script lang="ts">
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { format } from 'date-fns';
    let name = '';
    let species = '';
    let plantLocation = '';
    let lastWatered = '';
    let wateringInterval = 0;
    let notes = '';
    let showCalendar = false;
    let loading = false;

    async function addPlant() {
        if (!name.trim() || !species.trim()) return;

        loading = true;

        const res = await fetch('/api/plants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                species,
                location: plantLocation,
                lastWatered,
                wateringInterval,
                notes
            })
        });

        loading = false;

        if (res.ok) {
            name = '';
            species = '';
            plantLocation = '';
            lastWatered = '';
            wateringInterval = 0;
            notes = '';
            window.location.reload();
        }
    }

    function handleDateSelect(event: Event) {
        const selectedDate = (event.target as HTMLInputElement).value;
        lastWatered = format(new Date(selectedDate), 'yyyy-MM-dd');
        showCalendar = false;
    }
</script>

{#if loading}
    <LoadingSpinner />
{:else}
    <form on:submit|preventDefault={addPlant} class="form-container">
        <div class="input-container">
            <label for="name">Név</label>
            <input id="name" bind:value={name} placeholder="Növény neve" required />
        </div>
        <div class="input-container">
            <label for="species">Faj</label>
            <input id="species" bind:value={species} placeholder="Fajta" required />
        </div>
        <div class="input-container">
            <label for="plantLocation">Hely</label>
            <input id="plantLocation" bind:value={plantLocation} placeholder="Hely" />
        </div>
        <div class="input-container">
            <label for="lastWatered">Utoljára locsolva</label>
            <input
                    id="lastWatered"
                    type="date"
                    bind:value={lastWatered}
                    placeholder="Utoljára locsolva"
            />
            {#if showCalendar}
                <input type="date" on:change={handleDateSelect} />
            {/if}
        </div>
        <div class="input-container">
            <label for="wateringInterval">Locsolási intervallum (napokban)</label>
            <input id="wateringInterval" type="number" bind:value={wateringInterval} placeholder="Locsolási intervallum" />
        </div>
        <div class="input-container">
            <label for="notes">Jegyzetek</label>
            <textarea id="notes" bind:value={notes} placeholder="Jegyzetek"></textarea>
        </div>
        <button type="submit" class="submit-button">Hozzáadás</button>
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
        overflow: hidden;
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
        width: 100%;
        box-sizing: border-box;
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

    /* plusz kiegészítés: ha naptár nyílik meg */
    .input-container input[type="date"] {
        margin-top: 0.5rem;
    }
</style>
