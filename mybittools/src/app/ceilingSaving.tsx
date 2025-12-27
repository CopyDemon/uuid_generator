/**
 * ceilingSaving is a simple ceiling saving calculator
 * 
 * Description:
 * Saving money is important, and every spending matters. User can input their daily spending, and calculator can let user know how much they should save.
 * 
 * How it works:
 * ceiling cost: it will calculate the ceiling cost by add one day's every item ceiling cost
 * total cost: it will calculate the total cost of each day spending
 * should saving: it will calculate the should saving by substracting the total cost from the ceiling cost
 * 
 */
interface DailySpend {
    date: string;
    items: {
        [key: string]: number;
    }
}

export default function ceilingSaving() {
    const spend: Array<DailySpend> = [
        {
            date: "2025-12-21",
            items: {
                "胃药 cvs": 20.94,
                "可乐，小饼干 shell 加油站": 6.02,
                "水煮鱼 san mateo": 49.78,
                "充电": 18.93,
                "总计": 0,
                "向上取整总计花费": 0,
                "向上取整总计应存入": 0
            }
        },
        {
            date: "2025-12-22",
            items: {
                "fastrack": 120,
                "日定存": 34,
                "过桥": 8,
                "彩票 power fantasy": 3,
                "总计": 0,
                "向上取整总计花费": 0,
                "向上取整总计应存入": 0
            }
        },
        {
            date: "2025-12-23",
            items: {
                "google one": 1.99,
                "收到支票 Transunion": +124.75,
                "日定存": 35,
                "假装过桥存": 8,
                "总计": 0,
                "向上取整总计花费": 0,
                "向上取整总计应存入": 0
            }
        },
        {
            date: "2025-12-24",
            items: {
                "power fantasy": 3,
                "寿司 橙子": 138,
                "假装过桥存 （8块钱银行decilined）": 20,
                "日定存": 36,
                "总计": 0,
                "向上取整总计花费": 0,
                "向上取整总计应存入": 0
            }
        },
        {
            date: "2025-12-25",
            items: {
                "泰诺 小熊 红牛": 28.92,
                "假装过桥存": 8,
                "日定存": 37,
                "总计": 0,
                "向上取整总计花费": 0,
                "向上取整总计应存入": 0
            }
        },
        {
            date: "2025-12-26",
            items: {
                "充电": 13.85,
                "兰州牛肉面": 85.77,
                "* 问自己借": 500,
                "日定存": 38,
                "总计": 0,
                "向上取整总计花费": 0,
                "向上取整总计应存入": 0
            }
        },

    ]

    const keyWontCount: Array<string> = ["date", "总计", "向上取整总计花费", "向上取整总计应存入"];
    spend.forEach((eachDay) => {
        let currentCeilingTotalCost: number = 0;
        let currentTotalCost: number = 0;
        Object.keys(eachDay.items).forEach((key) => {
            if (!keyWontCount.includes(key) && typeof (eachDay.items[key]) == "number") {
                const ceilingCost = Math.ceil(eachDay.items[key]);
                currentCeilingTotalCost += ceilingCost;
                currentTotalCost += eachDay.items[key];
            }
        })
        eachDay.items["总计"] = currentTotalCost;
        eachDay.items["向上取整总计花费"] = currentCeilingTotalCost;
        eachDay.items["向上取整总计应存入"] = Math.ceil(eachDay.items["向上取整总计花费"] - eachDay.items["总计"]);
        console.log(`今天是${eachDay.date}, 总计花费${eachDay.items["总计"]}, 向上取整应该存: ${eachDay.items["向上取整总计应存入"]}`);
        return eachDay;
    });

    fetch("http://localhost:3000/api/expenseTracker", {
        method: "GET",
    }).then((res) => {
        console.log(res);
    }).then((data) => {
        console.log(data);
    })

    // test post to db
    fetch("http://localhost:3000/api/expenseTracker", {
        method: "POST",
        body: JSON.stringify({ spend: spend, post: true }),
    }).then((res) => {
        console.log(res);
    }).then((data) => {
        console.log(data);
    })
}