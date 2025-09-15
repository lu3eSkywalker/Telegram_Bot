import { Telegraf, Context } from "telegraf";
import { message } from "telegraf/filters";

interface MyContext extends Context {
    state: {
        role?: string;
    }
}

const bot = new Telegraf<MyContext>("");

bot.use((ctx, next) => {

    if (ctx.from?.id === 7514475673) {
        ctx.state.role = "Admin";
    } else {
        ctx.state.role = "User";
    }
    return next();
})

bot.on(message("text"), async(ctx, next) => {

    await ctx.telegram.sendMessage(
        ctx.message.chat.id,
        `Hello ${ctx.state.role}`
    );

    return next();
});

bot.on("text", (ctx, next) => {
    if (ctx.state.role === "Admin") {
        ctx.reply("Welcome, mighty Admin!");
        console.log("Admin Pinged Telegram Bot");
    } else {
        ctx.reply("Hello, User!");
        console.log("User Pinged Telegram Bot");
    }

    return next();
});

bot.on("text", (ctx) => {
    console.log("Your Telegram ID is: ", ctx.from?.id);
    ctx.reply(`Your Telegram ID is: ${ctx.from?.id}`);
})

// Start the bot
bot.launch();

console.log("Bot is running...");