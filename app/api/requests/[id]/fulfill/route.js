import { NextResponse } from 'next/server';
import { store } from '../../../../lib/store';

// POST /api/requests/[id]/fulfill - Fulfill a request (Factory action)
export async function POST(request, { params }) {
    const { id } = await params;
    const requestItem = store.getRequestById(id);

    if (!requestItem) {
        return NextResponse.json(
            { error: 'Request not found' },
            { status: 404 }
        );
    }

    if (requestItem.status === 'fulfilled') {
        return NextResponse.json(
            { error: 'Request is already fulfilled' },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();

        // Validate fulfillment data
        if (!body.evidenceId && !body.newEvidence) {
            return NextResponse.json(
                { error: 'Must provide either evidenceId or newEvidence details' },
                { status: 400 }
            );
        }

        const evidenceId = body.evidenceId || 'new-evidence-id';

        const updatedRequest = store.updateRequest(id, {
            status: 'fulfilled',
            fulfilledWith: evidenceId,
            fulfilledDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            fulfillmentNotes: body.notes || '',
        });

        // Part C: Record that this evidence was shared with the buyer
        // This enforces the rule: "Buyer can only access evidence versions
        // that were explicitly shared via fulfill or included in a pack."
        const buyerId = requestItem.buyerId || 'buyer-default';
        store.shareEvidence(buyerId, evidenceId, 'fulfill', id);

        return NextResponse.json({
            message: 'Request fulfilled successfully',
            data: updatedRequest,
            shared: { buyerId, evidenceId, sharedVia: 'fulfill' }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

