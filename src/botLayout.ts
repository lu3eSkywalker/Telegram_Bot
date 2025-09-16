import { Telegraf, Context, Markup } from "telegraf";
import { message } from "telegraf/filters";
import axios from "axios"

interface MyContext extends Context {
    state: {
        role?: string;
    }
}

const bot = new Telegraf<MyContext>("");

bot.start((ctx) => {
    console.log('User Clicked START button!');

    const userId = ctx.from?.id;
    if (!userId) return;

    const payload = ctx.startPayload;

    let welcomeMessage = `
    🤖 **Welcome to Solana Wallet Bot!**

    Your secure, easy-to-use Solana wallet manager.

    **Features:**
    • Generate new Wallets
    • Import existing wallets
    • Check balances
    • Send SOL and SPL tokens
    • View transaction history
    • Secure private key storage
    `

    // You control the response
    const welcomeKeyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback('Create Wallet', 'create_wallet'),
            Markup.button.callback('Get balance', 'get_balance')
        ],
        [
            Markup.button.callback('View Address', 'view_address'),
            Markup.button.callback('Export Private Key', 'export_private_key')
        ],
        [
            Markup.button.callback('Send SOL', 'send_sol_menu'),
            Markup.button.callback('Send Token', 'send_token_menu')
        ]
    ]
);

    ctx.reply(welcomeMessage, {
        parse_mode: "Markdown",
        ...welcomeKeyboard,
    });
});

bot.action("create_wallet", async(ctx) => {
    await ctx.answerCbQuery();
    return ctx.reply("Creating Wallet...");
});

bot.action("get_balance", async(ctx) => {
    await ctx.answerCbQuery();
    return ctx.reply("Fetching Balance: ");
});

bot.action("view_address", async(ctx) => {
    await ctx.answerCbQuery();
    return ctx.reply("Fetching address");
})

async function startBot(): Promise<void> {
    try {
        await bot.launch({
            allowedUpdates: ['message', 'callback_query']
        });
    } catch(error) {
        console.log('Failed to start bot: ', error);
        process.exit(1);
    }
}

startBot();

console.log("Bot is running...");