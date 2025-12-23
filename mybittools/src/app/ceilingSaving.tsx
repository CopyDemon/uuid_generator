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
                "芬达菠萝": 1.5,
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
    });
}