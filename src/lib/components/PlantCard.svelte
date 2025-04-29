<script lang="ts">
    export let plant: {
        id: number;
        name: string;
        species: string;
        location?: string;
        lastWatered?: string;
        wateringInterval?: number;
        notes?: string;
    };

    async function deletePlant(id: number) {
        if (!confirm('Biztosan törölni szeretnéd ezt a növényt?')) {
            return;
        }

        const res = await fetch(`/api/plants?id=${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            window.location.reload();
        }
    }
</script>

<div class="card">
    <h3 class="name">{plant.name}</h3>
    <p><strong>Faj:</strong> {plant.species}</p>
    {#if plant.location}
        <p><strong>Helyszín:</strong> {plant.location}</p>
    {/if}
    {#if plant.lastWatered}
        <p><strong>Utoljára öntözve:</strong> {plant.lastWatered}</p>
    {/if}
    {#if plant.wateringInterval}
        <p><strong>Öntözési gyakoriság:</strong> {plant.wateringInterval} nap</p>
    {/if}
    {#if plant.notes}
        <p><strong>Megjegyzések:</strong> {plant.notes}</p>
    {/if}

    <div class="actions">
        <button class="delete" on:click={() => deletePlant(plant.id)}>🗑️ Törlés</button>
        <a class="edit" href={`/dashboard/edit/${plant.id}`}>✏️ Szerkesztés</a>
    </div>
</div>

<style>
    .card {
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .name {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .actions {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
    }

    .edit, .delete {
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;
    }

    .edit {
        background-color: #3b82f6;
        color: white;
    }

    .edit:hover {
        background-color: #2563eb;
    }

    .delete {
        background-color: #ef4444;
        color: white;
        border: none;
        cursor: pointer;
    }

    .delete:hover {
        background-color: #dc2626;
    }
</style>
