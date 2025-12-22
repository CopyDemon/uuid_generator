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
export default function ceilingSaving() {
    const spend: Array<{ date: string;[key: string]: string | number }> = [
        {
            date: "2025-12-21",
            "胃药 cvs": 20.94,
            "可乐，小饼干 shell 加油站": 6.02,
            "水煮鱼 san mateo": 49.78,
            "充电": 18.93,
            "总计": 0,
            "向上取整总计花费": 0,
            "向上取整总计应存入": 0
        }
    ]

    const keyWontCount: Array<string> = ["date", "总计", "向上取整总计花费", "向上取整总计应存入"];
    spend.forEach((item) => {
        let currentCeilingTotalCost: number = 0;
        let currentTotalCost: number = 0;
        Object.keys(item).forEach((key) => {
            if (!keyWontCount.includes(key) && typeof (item[key]) == "number") {
                const ceilingCost = Math.ceil(item[key]);
                currentCeilingTotalCost += ceilingCost;
                currentTotalCost += item[key];
            }
        })
        item["总计"] = currentTotalCost;
        item["向上取整总计花费"] = currentCeilingTotalCost;
        item["向上取整总计应存入"] = Math.ceil(item["向上取整总计花费"] - item["总计"]);
        console.log(`今天是${item.date}, 总计花费${item["总计"]}, 向上取整应该存: ${item["向上取整总计应存入"]}`);
    });
}