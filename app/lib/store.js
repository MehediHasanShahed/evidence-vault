// Simple in-memory store for the demo
// In a real app, this would be a database connection

let requests = [
    {
        id: 'req-1',
        docType: 'ISO 27001 Certificate',
        dueDate: '2026-01-20',
        status: 'pending',
        requiredEvidence: 'Certificate',
        notes: 'Client requires current ISO certification for contract renewal',
        createdAt: '2025-10-01T10:00:00Z',
        buyerId: 'buyer-acme', // Added buyerId for access control
    },
    {
        id: 'req-2',
        docType: 'SOC 2 Type II Report',
        dueDate: '2026-01-25',
        status: 'pending',
        requiredEvidence: 'Audit Report',
        notes: 'Annual compliance verification',
        createdAt: '2025-10-05T14:30:00Z',
        buyerId: 'buyer-acme',
    },
    {
        id: 'req-3',
        docType: 'GDPR Compliance Documentation',
        dueDate: '2026-01-15',
        status: 'overdue',
        requiredEvidence: 'Policy',
        notes: 'EU data processing requirements',
        createdAt: '2025-09-15T09:00:00Z',
        buyerId: 'buyer-globex',
    },
    {
        id: 'req-4',
        docType: 'Penetration Test Results',
        dueDate: '2026-02-01',
        status: 'pending',
        requiredEvidence: 'Audit Report',
        notes: 'Security assessment for enterprise tier',
        createdAt: '2025-10-10T11:20:00Z',
        buyerId: 'buyer-globex',
    },
    {
        id: 'req-5',
        docType: 'Business Continuity Plan',
        dueDate: '2025-12-15',
        status: 'fulfilled',
        requiredEvidence: 'Policy',
        notes: 'Completed and sent to client',
        fulfilledWith: '5',
        fulfilledDate: '2025-12-10',
        createdAt: '2025-08-20T16:45:00Z',
        buyerId: 'buyer-acme',
    },
];

// Part C: Track which evidence has been shared with which buyer
let sharedEvidence = [
    // Pre-populated: req-5 was fulfilled with evidence '5' for buyer-acme
    {
        buyerId: 'buyer-acme',
        evidenceId: '5',
        sharedVia: 'fulfill',
        requestId: 'req-5',
        sharedAt: '2025-12-10T10:00:00Z',
    },
];

export const store = {
    // === Request Methods ===
    getRequests: () => requests,

    getRequestById: (id) => requests.find(r => r.id === id),

    addRequest: (request) => {
        const newRequest = {
            id: `req-${Date.now()}`,
            status: 'pending',
            createdAt: new Date().toISOString(),
            buyerId: request.buyerId || 'buyer-default', // Default buyer for demo
            ...request,
        };
        requests = [newRequest, ...requests];
        return newRequest;
    },

    updateRequest: (id, updates) => {
        const index = requests.findIndex(r => r.id === id);
        if (index === -1) return null;

        requests[index] = { ...requests[index], ...updates };
        return requests[index];
    },

    // === Part C: Evidence Sharing Methods ===

    // Share evidence with a buyer (called on fulfill or pack inclusion)
    shareEvidence: (buyerId, evidenceId, sharedVia, requestId = null) => {
        const sharing = {
            buyerId,
            evidenceId,
            sharedVia, // 'fulfill' or 'pack'
            requestId,
            sharedAt: new Date().toISOString(),
        };
        sharedEvidence.push(sharing);
        return sharing;
    },

    // Get all evidence IDs that a buyer can access
    getBuyerEvidenceIds: (buyerId) => {
        return [...new Set(
            sharedEvidence
                .filter(s => s.buyerId === buyerId)
                .map(s => s.evidenceId)
        )];
    },

    // Get sharing records for a buyer (with details)
    getBuyerSharings: (buyerId) => {
        return sharedEvidence.filter(s => s.buyerId === buyerId);
    },

    // Check if buyer has access to specific evidence
    canBuyerAccessEvidence: (buyerId, evidenceId) => {
        return sharedEvidence.some(
            s => s.buyerId === buyerId && s.evidenceId === evidenceId
        );
    },
};
