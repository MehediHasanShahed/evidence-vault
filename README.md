# SentryLink Comply - Evidence Vault UI

A modern, responsive React/Next.js application demonstrating the "Phase A" factory user experience for SentryLink Comply. This project showcases a compliance evidence management system featuring an evidence vault, detailed version tracking, and a buyer request fulfillment workflow.

## Features

- **Evidence Vault**: Comprehensive list view of compliance documents with sorting, filtering (Doc Type, Status, Expiry), and bulk actions.
- **Evidence Detail**: Dedicated view for document metadata and version history.
- **Buyer Request Workflow**: Manage and fulfill incoming requests from buyers, either by selecting existing evidence or uploading new versions.
- **Part B - API Thin Slice**: A functional backend implementation (Next.js API Routes + In-memory Store) that handles the full request lifecycle: Buyer Creates → Factory Fulfills → Buyer Checks Status.
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

| SentryLink Comply - Evidence Vault UI                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------- |
| <div align="center"><strong>Evidence Vault</strong></div>                                                                           |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/984a0883-7755-4842-86f0-9bcf4840af1b" /> |
| <img width="1879" height="995" alt="image" src="https://github.com/user-attachments/assets/0e01f4fe-dd4a-454b-a011-d151ddc44a74" /> |
| <img width="1879" height="992" alt="image" src="https://github.com/user-attachments/assets/80e19211-2b15-48b4-9aa8-e9fb87c0245f" /> |
| <img width="1877" height="993" alt="image" src="https://github.com/user-attachments/assets/6a6a3e03-5a8d-4e3a-a8e9-6cab32ae8b24" /> |
| <div align="center"><strong>Evidence Detail</strong></div>                                                                          |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/cf88033e-1987-4fe9-a629-80a13a56fb74" /> |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/ecfb5bcd-adfd-451d-bbd2-c1edc39e1078" /> |
| <div align="center"><strong>Buyer Requests</strong></div>                                                                           |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/cd9852ff-2c2a-4871-8e3b-e6c2cf530d9c" /> |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/3f7b1d36-b184-4cf8-a38b-3bad2adbfcb5" /> |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/02307922-cd7f-468d-86b8-bd1024ae6d1d" /> |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/e65253af-5611-473c-8d2d-2d0a82405b5b" /> |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/ee109430-0b04-4551-b082-b93590f52597" /> |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/f96d45c8-ab26-4ebe-992d-166d9bf4c9d2" /> |
| <div align="center"><strong>After BB updates</strong></div> 
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/52ad4ccf-e619-4e42-bf68-a29fdedfd740" /> |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/ecdea09e-3e16-4ca7-81fd-9ee1c38f177a" /> |
| <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/85cb1f25-8174-4541-83d8-ae741381e20b" /> |
