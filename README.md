# Basic Telegram Bot

A simple Telegram bot built with TypeScript that demonstrates basic bot functionality, button menus, and API interactions.  

## Files Overview

The project consists of **4 main files**, each handling a specific functionality:

### 1. `bot.ts`
- Handles basic roles:
  - Determines who is the **admin** and who is the **user** based on the Telegram user ID.  

### 2. `button.ts`
- Contains logic for creating basic buttons that redirect users to a URL.
- **Usage:**
  - `/menu` → Shows a single link button.
  - `/buttonMenu` → Displays multiple buttons.

### 3. `botLayout.ts`
- Handles the welcome message and main crypto bot menu.
- **Menu Options Include:**
  - Create Wallet
  - Get Balance
  - View Address
  - Export Private Key
  - Send SOL
  - Send Token
- **Usage:**
  - Start the bot with `/start`.

### 4. `botAPI.ts`
- Contains logic to perform **CRUD operations** on a free dummy public API.
- Demonstrates basic API request handling within the bot.
-   - Start the bot with `/start`.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/lu3eSkywalker/Telegram_Bot.git
   cd Telegram_Bot
