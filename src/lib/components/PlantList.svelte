<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    export let refresh: boolean;
    import PlantCard from '$lib/components/PlantCard.svelte';
    import { goto } from '$app/navigation';


    let plants: {
        id: number;
        name: string;
        species: string;
        location?: string;
        lastWatered?: string;
        wateringInterval?: number;
        notes?: string;
    }[] = [];

    async function fetchPlants() {
        const res = await fetch('/api/plants');
        if (res.ok) {
            plants = await res.json();
        }
    }

    onMount(fetchPlants);
    afterUpdate(() => {
        fetchPlants();
    });

    async function deletePlant(id: number) {
        const res = await fetch(`/api/plants?id=${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            plants = plants.filter(plant => plant.id !== id);
        }
    }

    function editPlant(id: number) {
        goto(`/dashboard/edit/${id}`);
    }
</script>


{#if plants.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each plants as plant}
            <div class="relative border rounded p-4 shadow hover:shadow-lg transition">
                <PlantCard {plant} />
            </div>
        {/each}
    </div>
{:else}
    <p>Nincs még egyetlen növény sem.</p>
{/if}

<style>
    button {
        background: none;
        border: none;
        cursor: pointer;
        font-weight: bold;
    }
    button:hover {
        text-decoration: underline;
    }
</style>
