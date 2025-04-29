1)Projekt célja
Ez az alkalmazás egy beltéri növénygondozást segítő webalkalmazás, amely lehetővé teszi a növények nyilvántartását, locsolás ütemezését, aktuális időjárási adatok lekérését és növényápolási tippek megjelenítését.

2)Kódbázis szerkezetének magyarázata
Komponensek:
- AddPlantForm.svelte: Növény hozzáadása
- EditPlantForm.svelte: Növény szerkesztése
- Header.svelte
- Footer.svelte
- PlantCard.svelte: Egy növény megjelenítéséért felel
- LoadingSpinner.svelte: Betöltéskor megjelenő animáció
- Plantlist.svelte: Növényeket listázza ki
- WeatherAPI: Időjárás API

- db.ts: adatbázis

Routes:
- add-plant: Új növényt lehet hozzáadni
- dashboard: főoldal
- dashboard/edit/[id]: Növény szerkesztése
- api: Időjárás és a db-vel kommunikáció
- tips: Tippek a növénygondozáshoz


3)Apik leírása
- GET /api/plants: Visszaadja az összes tárolt növényt
- POST /api/plants: Új növény létrehozása
- PUT /api/plants/[id]: Létező növény módosítása
- DELETE /api/plants/[id]: Növény törlése
- GET /api/weather: Lekéri az aktuális időjárást az OpenWeatherMap API-ról

4)Tárolt adatok leírása
CREATE TABLE plants (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			species TEXT NOT NULL,
			location TEXT,
			lastWatered TEXT,
			wateringInterval INTEGER,
			notes TEXT
		);
		
5)Kommunikáció módja
- Fetch alapú HTTP-kérések
- Szerveroldali feldolgozás (Az API endpointokat +server.ts fájlok implementálják)
- JSON formátumú adatátvitel
