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

export default async function ceilingSaving() {
    // read from temp data (my expense)
    const spend: Array<DailySpend> = JSON.parse(
        await fetch("http://localhost:3000/api/expenseTracker")
            .then((res) => res.json())
    )

    console.log(spend)

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
        // console.log(res);
    }).then((data) => {
        // console.log(data);
    })

    // test post to db
    fetch("http://localhost:3000/api/expenseTracker", {
        method: "POST",
        body: JSON.stringify({ spend: spend, post: true }),
    }).then((res) => {
        // console.log(res);
    }).then((data) => {
        // console.log(data);
    })
}