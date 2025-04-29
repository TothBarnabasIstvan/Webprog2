<script>
    import AddPlantForm from '$lib/components/AddPlantForm.svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<Header />

<main class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Új növény hozzáadása</h1>
    <AddPlantForm />
</main>

<Footer />

<style>
    main {
        background-color: #f9f9f9;
        border-radius: 8px;
        padding: 2rem;
        margin-top: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
</style>
