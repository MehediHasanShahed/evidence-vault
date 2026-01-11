import { NextResponse } from 'next/server';
import { store } from '../../lib/store';

// GET /api/requests - Get all requests (Factory view)
export async function GET() {
    const requests = store.getRequests();
    return NextResponse.json({ data: requests });
}

// POST /api/requests - Create a new request (Buyer action)
export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.docType || !body.dueDate) {
            return NextResponse.json(
                { error: 'Missing required fields: docType, dueDate' },
                { status: 400 }
            );
        }

        const newRequest = store.addRequest({
            docType: body.docType,
            dueDate: body.dueDate,
            notes: body.notes || '',
            requiredEvidence: body.requiredEvidence || 'Certificate', // Default
        });

        return NextResponse.json({
            message: 'Request created successfully',
            data: newRequest
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
