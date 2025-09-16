import { Telegraf, Context, Markup } from "telegraf";
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

bot.command('menu', (ctx, next) => {
    return ctx.reply(
        "Choose an option: ",
        Markup.inlineKeyboard([
            [Markup.button.callback("Github", "github")],
            [Markup.button.url("Visit Website", "https://github.com/lu3eSkywalker")]
        ])
    );

    return next();
})

bot.command('buttonMenu', async (ctx, next) => {
    return ctx.reply(
        "Choose an option: ",
        Markup.inlineKeyboard([
            [
                Markup.button.callback("Button 1", "btn1"),
                Markup.button.callback("Button 2", "btn2"),
            ],
            [
                Markup.button.callback("Button 3", "btn3"),
                Markup.button.callback("Button 4", "btn4"),
            ],
            [
                Markup.button.callback("Button 5", "btn5"),
            ],
        ])
    );
});

bot.action("github", async (ctx) => {
    await ctx.answerCbQuery();
    ctx.reply("Click on Visit Github by clicking on Visit Website")
});
bot.action("btn1", (ctx) => ctx.reply("You clicked Button 1!"));
bot.action("btn2", (ctx) => ctx.reply("You clicked Button 2!"));
bot.action("btn3", (ctx) => ctx.reply("You clicked Button 3!"));
bot.action("btn4", (ctx) => ctx.reply("You clicked Button 4!"));

bot.launch();

console.log("Buttons Menu Bot is running...");