import { NextResponse } from 'next/server';
import { store } from '../../../../lib/store';
import { evidenceItems } from '../../../../data/mockData';

// GET /api/buyer/[buyerId]/evidence - Get evidence accessible by this buyer
// Part C: Buyer can only access evidence that was explicitly shared
export async function GET(request, { params }) {
    const { buyerId } = await params;

    // Get list of evidence IDs this buyer can access
    const accessibleIds = store.getBuyerEvidenceIds(buyerId);

    if (accessibleIds.length === 0) {
        return NextResponse.json({
            message: 'No evidence has been shared with this buyer yet',
            data: [],
            accessibleIds: [],
        });
    }

    // Filter the full evidence items to only those shared with this buyer
    const accessibleEvidence = evidenceItems.filter(
        (e) => accessibleIds.includes(e.id)
    );

    // Get sharing details for context
    const sharings = store.getBuyerSharings(buyerId);

    return NextResponse.json({
        data: accessibleEvidence,
        accessibleIds,
        sharings,
        message: `Buyer has access to ${accessibleEvidence.length} evidence item(s)`,
    });
}
