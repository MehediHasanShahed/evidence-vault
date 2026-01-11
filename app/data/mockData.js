// Mock data for SentryLink Comply Phase A Demo

export const evidenceItems = [
    {
        id: '1',
        name: 'ISO 27001 Certificate',
        docType: 'Certificate',
        status: 'active',
        expiry: '2026-06-15',
        lastUpdated: '2025-12-01',
        versions: [
            { version: 'v3', date: '2025-12-01', uploader: 'Sarah Chen', notes: 'Annual renewal - updated scope', fileSize: '2.4 MB' },
            { version: 'v2', date: '2024-12-01', uploader: 'Sarah Chen', notes: 'Updated certification body', fileSize: '2.1 MB' },
            { version: 'v1', date: '2023-12-01', uploader: 'John Smith', notes: 'Initial certification', fileSize: '1.8 MB' },
        ],
    },
    {
        id: '2',
        name: 'SOC 2 Type II Report',
        docType: 'Audit Report',
        status: 'active',
        expiry: '2026-03-20',
        lastUpdated: '2025-09-15',
        versions: [
            { version: 'v2', date: '2025-09-15', uploader: 'Mike Johnson', notes: 'Type II audit completed', fileSize: '5.2 MB' },
            { version: 'v1', date: '2024-09-10', uploader: 'Mike Johnson', notes: 'Type I audit', fileSize: '4.8 MB' },
        ],
    },
    {
        id: '3',
        name: 'GDPR Data Processing Agreement',
        docType: 'Policy',
        status: 'pending',
        expiry: '2026-01-31',
        lastUpdated: '2025-11-20',
        versions: [
            { version: 'v1', date: '2025-11-20', uploader: 'Emma Wilson', notes: 'Draft for legal review', fileSize: '890 KB' },
        ],
    },
    {
        id: '4',
        name: 'SSL Certificate',
        docType: 'Certificate',
        status: 'expired',
        expiry: '2025-12-01',
        lastUpdated: '2024-12-01',
        versions: [
            { version: 'v1', date: '2024-12-01', uploader: 'Dev Team', notes: 'Wildcard certificate', fileSize: '12 KB' },
        ],
    },
    {
        id: '5',
        name: 'Business Continuity Plan',
        docType: 'Policy',
        status: 'active',
        expiry: '2027-01-01',
        lastUpdated: '2025-10-05',
        versions: [
            { version: 'v4', date: '2025-10-05', uploader: 'Lisa Park', notes: 'Added remote work scenarios', fileSize: '3.1 MB' },
            { version: 'v3', date: '2024-10-01', uploader: 'Lisa Park', notes: 'Annual review update', fileSize: '2.9 MB' },
            { version: 'v2', date: '2023-10-01', uploader: 'Tom Brown', notes: 'Added pandemic response', fileSize: '2.5 MB' },
            { version: 'v1', date: '2022-10-01', uploader: 'Tom Brown', notes: 'Initial BCP document', fileSize: '2.0 MB' },
        ],
    },
    {
        id: '6',
        name: 'Penetration Test Report Q4 2025',
        docType: 'Audit Report',
        status: 'active',
        expiry: '2026-04-15',
        lastUpdated: '2025-10-20',
        versions: [
            { version: 'v1', date: '2025-10-20', uploader: 'SecOps Team', notes: 'External pentest by CyberGuard', fileSize: '8.7 MB' },
        ],
    },
    {
        id: '7',
        name: 'Employee NDA Template',
        docType: 'Policy',
        status: 'active',
        expiry: null,
        lastUpdated: '2025-08-12',
        versions: [
            { version: 'v2', date: '2025-08-12', uploader: 'HR Team', notes: 'Updated legal language', fileSize: '156 KB' },
            { version: 'v1', date: '2023-01-15', uploader: 'HR Team', notes: 'Initial template', fileSize: '142 KB' },
        ],
    },
    {
        id: '8',
        name: 'Vendor Security Assessment',
        docType: 'Assessment',
        status: 'pending',
        expiry: '2026-02-28',
        lastUpdated: '2025-12-08',
        versions: [
            { version: 'v1', date: '2025-12-08', uploader: 'Sarah Chen', notes: 'Awaiting vendor response', fileSize: '1.2 MB' },
        ],
    },
];

export const buyerRequests = [
    {
        id: 'req-1',
        docType: 'ISO 27001 Certificate',
        dueDate: '2026-01-20',
        status: 'pending',
        requiredEvidence: 'Certificate',
        notes: 'Client requires current ISO certification for contract renewal',
    },
    {
        id: 'req-2',
        docType: 'SOC 2 Type II Report',
        dueDate: '2026-01-25',
        status: 'pending',
        requiredEvidence: 'Audit Report',
        notes: 'Annual compliance verification',
    },
    {
        id: 'req-3',
        docType: 'GDPR Compliance Documentation',
        dueDate: '2026-01-15',
        status: 'overdue',
        requiredEvidence: 'Policy',
        notes: 'EU data processing requirements',
    },
    {
        id: 'req-4',
        docType: 'Penetration Test Results',
        dueDate: '2026-02-01',
        status: 'pending',
        requiredEvidence: 'Audit Report',
        notes: 'Security assessment for enterprise tier',
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
    },
];

export const docTypes = ['Certificate', 'Audit Report', 'Policy', 'Assessment'];
export const statuses = ['active', 'pending', 'expired'];
export const expiryFilters = ['all', 'expired', 'expiring-soon'];
