<script lang="ts">
    import Header from '$lib/components/Header.svelte';

    const tips = [
        {
            title: 'Fényigény',
            description: 'A legtöbb szobanövény szereti a közvetett napfényt. Kerüld a tűző napot, mert megégetheti a leveleket!'
        },
        {
            title: 'Öntözés',
            description: 'Ne öntözd túl a növényeket! Általában jobb, ha kissé kiszárad a föld két öntözés között.'
        },
        {
            title: 'Páratartalom',
            description: 'Sok trópusi növény szereti a magas páratartalmat. Ha száraz a levegő, párásíts, vagy permetezd a leveleket!'
        },
        {
            title: 'Tápanyag',
            description: 'A növények a növekedési időszakban (tavasz-nyár) hálásak a rendszeres tápoldatozásért.'
        },
        {
            title: 'Átültetés',
            description: 'Évente egyszer ellenőrizd a gyökereket, és ha kinőtte a cserepét, ültesd át nagyobba!'
        },
        {
            title: 'Levéltisztítás',
            description: 'Időnként töröld le a leveleket nedves ruhával, hogy a por ne gátolja a fotoszintézist.'
        },
        {
            title: 'Hőmérséklet',
            description: 'A legtöbb szobanövény 18-24°C közötti hőmérsékleten érzi jól magát. Kerüld a huzatot!'
        },
        {
            title: 'Földtípus',
            description: 'Használj megfelelő földkeveréket: pl. kaktuszokhoz jó vízelvezetésű, páfrányokhoz tápdús talaj kell.'
        },
        {
            title: 'Kártevők',
            description: 'Rendszeresen ellenőrizd a levelek alját is, és ha kell, használj természetes rovarölő szerekkel.'
        },
        {
            title: 'Világítás mesterségesen',
            description: 'Télen hasznos lehet növénylámpa használata, hogy pótold a kevés természetes fényt.'
        },
        {
            title: 'Nyugalmi időszak',
            description: 'Télen sok növény pihen, ilyenkor kevesebb öntözésre és tápoldatozásra van szükségük.'
        },
        {
            title: 'Megfelelő cserepek',
            description: 'Mindig legyen a cserép alján vízelvezető lyuk, hogy elkerüld a gyökérrothadást.'
        }
    ];
</script>

<div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1 flex flex-col p-6">
        <div class="flex-1 max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold mb-8 text-center">Növénygondozási Tippek</h1>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each tips as { title, description }, index}
                    <div class="bg-green-100 rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
                        <h2 class="text-lg font-semibold mb-2">{index + 1}. {title}</h2>
                        <p class="text-gray-700">{description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </main>
</div>
