<script>
    import PlantList from '$lib/components/PlantList.svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WeatherAPI from '$lib/components/WeatherAPI.svelte';

    let refresh = false;
</script>

<Header />

<WeatherAPI />

<main class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Növényeid</h1>
    <PlantList {refresh} />
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
