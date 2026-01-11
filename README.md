# SentryLink Comply - Evidence Vault UI

A modern, responsive React/Next.js application demonstrating the "Phase A" factory user experience for SentryLink Comply. This project showcases a compliance evidence management system featuring an evidence vault, detailed version tracking, and a buyer request fulfillment workflow.

## Features

- **Evidence Vault**: Comprehensive list view of compliance documents with sorting, filtering (Doc Type, Status, Expiry), and bulk actions.
- **Evidence Detail**: Dedicated view for document metadata and version history.
- **Buyer Request Workflow**: Manage and fulfill incoming requests from buyers, either by selecting existing evidence or uploading new versions.
- **Theme Support**: Fully integrated Dark and Light modes with persistent user preference (cookie/localStorage sync) to prevent hydration mismatches.
- **Responsive Design**: Built with Material UI (MUI) for a consistent and accessible table, modal, and layout experience across devices.

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Component Library**: [Material UI (MUI) v6](https://mui.com/)
- **Styling**: Emotion (MUI default) + Custom Theme Context
- **Icons**: MUI Icons Material
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/evidence-vault.git
   cd evidence-vault
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `app/vault`: Evidence Vault list screen.
- `app/vault/[id]`: Evidence Detail screen with version history.
- `app/requests`: Buyer Requests to-do list screen.
- `app/components`: Reusable UI components (Sidebar, DataTable, StatusChip, Modals).
- `app/theme.js` & `app/providers.js`: Theme configuration and context providers.

## Screenshots

<!-- Add screenshots here later -->

### Evidence Vault (Dark Mode)

<!-- ![Evidence Vault Dark](path/to/screenshot1.png) -->

### Evidence Detail (Light Mode)

<!-- ![Evidence Detail Light](path/to/screenshot2.png) -->

### Buyer Requests

<!-- ![Buyer Requests](path/to/screenshot3.png) -->
