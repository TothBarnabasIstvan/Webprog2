import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const rows = await db.all('SELECT * FROM plants');
    return json(rows);
};

export const POST: RequestHandler = async ({ request }) => {
    const { name, species, location, lastWatered, wateringInterval, notes } = await request.json();

    if (!name || !species) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    await db.run(
        `INSERT INTO plants (name, species, location, lastWatered, wateringInterval, notes) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        name, species, location, lastWatered, wateringInterval, notes
    );

    return new Response(JSON.stringify({ success: true }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
};

export const DELETE: RequestHandler = async ({ url }) => {
    const id = url.searchParams.get('id');

    if (!id) {
        return json({ error: 'Missing id' }, { status: 400 });
    }

    await db.run('DELETE FROM plants WHERE id = ?', id);

    return json({ success: true });
};

