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
import myExpense from "@/app/expense/tempData/myExpense.json";
interface DailySpend {
    date: string;
    items: Array<
        {
            category: string;
            name: string;
            price: number;
        }
    >
}

export default async function ceilingSaving() {
    const spend: Array<DailySpend> = myExpense;

    const keyWontCount: Array<string> = ["date", "总计", "向上取整总计花费", "向上取整总计应存入"];

    spend.forEach((eachDay) => {
        let currentCeilingTotalCost: number = 0;
        let currentTotalCost: number = 0;

        // calculate ceiling cost and total cost of one day
        eachDay.items.forEach((eachSpend) => {
            const ceilingCost = Math.ceil(eachSpend.price);
            currentCeilingTotalCost += ceilingCost;
            currentTotalCost += eachSpend.price;
        })

        // update ceiling cost and total cost of one day
        let totalSpendNumber: number | undefined = undefined;
        let ceilingTotalNumber: number | undefined = undefined;
        let ceilingSavingNumber: number | undefined = undefined;
        eachDay.items.forEach((eachSpend) => {
            if (eachSpend.category == "total") {
                eachSpend.price = currentTotalCost;
                totalSpendNumber = currentTotalCost;
            }
            if (eachSpend.category == "ceiling_total") {
                eachSpend.price = currentCeilingTotalCost;
                ceilingTotalNumber = currentCeilingTotalCost;
            }
            if (eachSpend.category == "ceiling_saving") {
                eachSpend.price = Math.ceil(currentCeilingTotalCost - currentTotalCost);
                ceilingSavingNumber = Math.ceil(currentCeilingTotalCost - currentTotalCost);
            }
        })

        console.log(`今天是${eachDay.date}, 总计花费${totalSpendNumber}, 向上取整应该存: ${ceilingSavingNumber}`);
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