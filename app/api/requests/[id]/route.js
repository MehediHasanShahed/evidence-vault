import { NextResponse } from 'next/server';
import { store } from '../../../lib/store';

// GET /api/requests/[id] - Get single request status (Buyer check)
export async function GET(request, { params }) {
    const { id } = await params;
    const requestItem = store.getRequestById(id);

    if (!requestItem) {
        return NextResponse.json(
            { error: 'Request not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ data: requestItem });
}
