# SentryLink Comply - Evidence Vault UI

A modern, responsive React/Next.js application demonstrating the "Phase A" factory user experience for SentryLink Comply. This project showcases a compliance evidence management system featuring an evidence vault, detailed version tracking, and a buyer request fulfillment workflow.

---

## Features

- **Evidence Vault**: Comprehensive list view of compliance documents with sorting, filtering (Doc Type, Status, Expiry), and bulk actions.
- **Evidence Detail**: Dedicated view for document metadata and version history.
- **Buyer Request Workflow**: Manage and fulfill incoming requests from buyers, either by selecting existing evidence or uploading new versions.
- **Theme Support**: Fully integrated Dark and Light modes with persistent user preference (cookie/localStorage sync) to prevent hydration mismatches.
- **Responsive Design**: Built with Material UI (MUI) for a consistent and accessible table, modal, and layout experience across devices.

---

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Component Library**: [Material UI (MUI) v6](https://mui.com/)
- **Styling**: Emotion (MUI default) + Custom Theme Context
- **Icons**: MUI Icons Material
- **Date Handling**: date-fns

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

---

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

---

## Project Structure

- `app/vault`: Evidence Vault list screen.
- `app/vault/[id]`: Evidence Detail screen with version history.
- `app/requests`: Buyer Requests to-do list screen.
- `app/components`: Reusable UI components (Sidebar, DataTable, StatusChip, Modals).
- `app/theme.js` & `app/providers.js`: Theme configuration and context providers.


---
## Screenshots
|----------------------|
| Evidence Vault |
|   <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/984a0883-7755-4842-86f0-9bcf4840af1b" /> |
|   <img width="1879" height="995" alt="image" src="https://github.com/user-attachments/assets/0e01f4fe-dd4a-454b-a011-d151ddc44a74" /> |
|   <img width="1879" height="992" alt="image" src="https://github.com/user-attachments/assets/80e19211-2b15-48b4-9aa8-e9fb87c0245f" /> |
|   <img width="1877" height="993" alt="image" src="https://github.com/user-attachments/assets/6a6a3e03-5a8d-4e3a-a8e9-6cab32ae8b24" /> |
| Evidence Detail |
|   <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/cf88033e-1987-4fe9-a629-80a13a56fb74" /> |
|   <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/ecfb5bcd-adfd-451d-bbd2-c1edc39e1078" /> |
| Buyer Requests |
|  <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/cd9852ff-2c2a-4871-8e3b-e6c2cf530d9c" /> |
|  <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/3f7b1d36-b184-4cf8-a38b-3bad2adbfcb5" /> |
|  <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/02307922-cd7f-468d-86b8-bd1024ae6d1d" /> |
|  <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/e65253af-5611-473c-8d2d-2d0a82405b5b" /> |
|  <img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/ee109430-0b04-4551-b082-b93590f52597" /> |

## Screenshot
| Finance Tracker Interface |
|----------------------|
| Landing Page |
| <img width="1878" height="923" alt="Opera Snapshot_2025-11-25_012042_localhost" src="https://github.com/user-attachments/assets/a9f28e7e-370f-4327-854e-65d9cdf32b69" /> |
| Dashboard |
| <img width="1878" height="923" alt="Opera Snapshot_2025-11-25_012221_localhost" src="https://github.com/user-attachments/assets/80682cc1-4a62-4017-a3af-c82df7e2fc8b" /> |
| <img width="1878" height="923" alt="Opera Snapshot_2025-11-25_012233_localhost" src="https://github.com/user-attachments/assets/eb173c99-088d-4d29-bd6d-4d93b1e39807" /> |
| Create Transactions |
| <img width="1878" height="923" alt="Opera Snapshot_2025-11-25_012129_localhost" src="https://github.com/user-attachments/assets/78c67c34-0299-4b70-aa8f-22bdbb2b77d4" /> |
| Accounts |
| <img width="1878" height="923" alt="Opera Snapshot_2025-11-25_012207_localhost" src="https://github.com/user-attachments/assets/5d99367f-8bf8-4136-99b6-cf963725c0ee" /> |
| <img width="1878" height="923" alt="Opera Snapshot_2025-11-25_012153_localhost" src="https://github.com/user-attachments/assets/7774aabc-a64f-44e0-b541-82c02f0be17a" /> |
| Budget Alert Email |
| <img width="1552" height="771" alt="Opera Snapshot_2025-11-25_014432_mail google com" src="https://github.com/user-attachments/assets/18887a08-0b54-4f21-8a5c-ba4cfae38846" /> |
| Monthly Report Email |
| <img width="1566" height="805" alt="Opera Snapshot_2025-11-25_015036_mail google com" src="https://github.com/user-attachments/assets/a5ead1b3-a95d-453b-914b-12b272f9b844" /> |
| <img width="1563" height="806" alt="Opera Snapshot_2025-11-25_015051_mail google com" src="https://github.com/user-attachments/assets/4f015241-3f5b-49fb-a5f0-776392267954" /> |
| <img width="1573" height="798" alt="Opera Snapshot_2025-11-25_015111_mail google com" src="https://github.com/user-attachments/assets/1d9f02d3-242c-45a1-b2d0-2b7e398471fb" /> |

