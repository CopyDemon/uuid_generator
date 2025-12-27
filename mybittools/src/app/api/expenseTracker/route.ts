console.log("hello world");
import { Client } from "pg";
import * as path from "path";
import * as dotenv from "dotenv";

// 加载父目录的共享 .env 文件
// process.cwd() = /mybittools, 所以 ../.env = /uuid_generator/.env
dotenv.config({
    path: path.resolve(process.cwd(), '../.env')
});

const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.PG_PORT),
});

client.connect();


export async function GET(request: Request, response: Response) {
    try {
        // validate user
        const isUserValid = validateUser(request.headers.get("user") || "");
        if (!isUserValid) {
            return new Response("Unauthorized", { status: 401 });
        }

        const query = "SELECT * FROM expense.daily_expense";
        const result = await client.query(query);
        // console.log(result.rows);

        return new Response(JSON.stringify(result.rows));
    } catch (e: unknown) {
        console.error(e);
        return new Response("Internal Server Error", { status: 500 }); // TODO dont know how to handle error how to respone error message need to check typescript error handling
    }
}

// TODO: add Transaction?
export async function POST(request: Request, response: Response) {
    try {
        console.log("Post data: update expense db")
        // validate user
        const isUserValid = validateUser(request.headers.get("user") || "");
        if (!isUserValid) {
            return new Response("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const spendData = body.spend;
        const isPost = body.post;

        if (!isPost) {
            return new Response("message: post set to false, wont update db", { status: 200 });
        }

        // 不需要存入数据库的计算字段
        const excludeFields = ["总计", "向上取整总计花费", "向上取整总计应存入"];
        let insertCount = 0;

        // 遍历每一天的数据
        for (const day of spendData) {
            const date = day.date;

            // 使用 Object.entries() 遍历 items 对象（因为 items 是对象不是数组）
            for (const [itemName, amount] of Object.entries(day.items)) {
                // 跳过计算字段
                if (excludeFields.includes(itemName)) {
                    continue;
                }

                // 使用参数化查询 ($1, $2, $3) 防止 SQL 注入
                // ON CONFLICT 处理：如果 (date, item) 已存在，更新 amount
                const query = `
                    INSERT INTO expense.daily_expense (date, item, amount) 
                    VALUES ($1, $2, $3)
                    ON CONFLICT (date, item) 
                    DO UPDATE SET amount = $3
                `;
                await client.query(query, [date, itemName, amount]);
                insertCount++;
            }
        }

        console.log(`成功处理 ${insertCount} 条记录`);
        return new Response(JSON.stringify({ success: true, count: insertCount }));
    } catch (e: unknown) {
        console.error(e);
        return new Response("Internal Server Error", { status: 500 });
    }
}

function validateUser(user: string) {
    return true // future here should check user and return user id
}