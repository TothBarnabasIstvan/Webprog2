import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
    const plant = await db.get('SELECT * FROM plants WHERE id = ?', params.id);

    if (!plant) {
        return new Response(JSON.stringify({ error: 'Plant not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return json(plant);
};

export const PUT: RequestHandler = async ({ request, params }) => {
    const { name, species, location, lastWatered, wateringInterval, notes } = await request.json();

    await db.run(
        `UPDATE plants
         SET name = ?, species = ?, location = ?, lastWatered = ?, wateringInterval = ?, notes = ?
         WHERE id = ?`,
        name, species, location, lastWatered, wateringInterval, notes, params.id
    );

    return json({ success: true });
};

export const DELETE: RequestHandler = async ({ params }) => {
    await db.run('DELETE FROM plants WHERE id = ?', params.id);

    return json({ success: true });
};
