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
    ctx.reply(
        "Welcome! Choose an option: ",
        Markup.inlineKeyboard([
            [Markup.button.callback("Get Users", "get_users")],
            [Markup.button.callback("Create Post", "create_post")],
            [Markup.button.callback("Update Post", "update_post")],
            [Markup.button.callback("Delete Post", "delete_post")],
        ])
    );
});

// Get Request

bot.action("get_users", async (ctx) => {
    await ctx.answerCbQuery();
    try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        const users = res.data.slice(0, 5);
        const msg = users.map((u: any) => `${u.name} (${u.email})`).join("\n");
        await ctx.reply(`Here are some users:\n\n${msg}`);
    } catch (err) {
        console.error(err);
        await ctx.reply("❌ Failed to fetch users.");
    }
});

// Post Request

bot.action("create_post", async (ctx) => {
    await ctx.answerCbQuery();
    try {
        const res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
            title: "My Telegram Bot Post",
            body: "This is created via API request from Telegraf bot.",
            userId: ctx.from?.id || 1,
        });
        await ctx.reply(`✅ Post created!\nID: ${res.data.id}\nTitle: ${res.data.title}`);
    } catch (err) {
        console.error(err);
        await ctx.reply("❌ Failed to create post.");
    }
});


// Update Request

bot.action("update_post", async(ctx) => {
    await ctx.answerCbQuery();
    try {
        const res = await axios.put("https://jsonplaceholder.typicode.com/posts/1", {
            id: 1,
            title: "Title Update",
            body: "This is the updated title.",
            userId: ctx.from?.id || 1,
        });
        await ctx.reply(`✅ Post updated!\nID: ${res.data.id}\nTitle: ${res.data.title}`);
    } catch(err) {
        console.error(err);
        await ctx.reply("❌ Failed to update post ")
    }
});

// Delete Request

bot.action("delete_post", async(ctx) => {
    await ctx.answerCbQuery();
    try {
        await axios.delete("https://jsonplaceholder.typicode.com/posts/1")
        await ctx.reply(`🗑️ Post deleted successfully!`);
    } catch(err) {
        console.error(err);
        await ctx.reply("❌ Failed to delete post.");
    }
})

async function startBot(): Promise<void> {
    try {
        await bot.launch({
            allowedUpdates: ['message', 'callback_query']
        });
    } catch (error) {
        console.log('Failed to start bot: ', error);
        process.exit(1);
    }
}

startBot();

console.log("Bot is running...");