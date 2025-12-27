"use client";
import { useState, useEffect } from "react";
import ceilingSaving from "@/app/ceilingSaving";

// API 返回的数据结构
interface ExpenseRow {
    id: number;
    date: string;
    item: string;
    amount: string;
}

// 按日期分组后的数据结构
interface GroupedExpenses {
    [date: string]: ExpenseRow[];
}

export default function ExpensePage() {
    const [spendData, setSpendData] = useState<ExpenseRow[]>([]);

    // 按日期分组
    const groupedByDate: GroupedExpenses = spendData.reduce((acc, row) => {
        // 只取日期部分 (去掉时间)
        const dateOnly = row.date.split('T')[0];
        if (!acc[dateOnly]) {
            acc[dateOnly] = [];
        }
        acc[dateOnly].push(row);
        return acc;
    }, {} as GroupedExpenses);

    // 渲染分组后的数据
    const spendingDisplay = Object.entries(groupedByDate).map(([date, items]) => {
        let totalSpending = 0
        return (
            <div key={date} style={{ marginBottom: '20px' }}>
                <h3>{date}</h3>
                <ul>
                    {
                        items.map((row) => {
                            totalSpending += Number(row.amount);
                            return <li key={row.id}>
                                {row.item} | ${row.amount}
                            </li>
                        })
                    }
                    <li>总计: ${totalSpending}</li>
                </ul>
            </div>
        )
    });

    useEffect(() => {
        fetch("http://localhost:3000/api/expenseTracker")
            .then((res) => res.json())
            .then((data) => setSpendData(data.reverse())); // reverse the data in db new record is last record, in ui is first record
    }, []);

    return (
        <div>
            <h1>Expense Tracker</h1>
            <button onClick={ceilingSaving}>Update saving</button>
            <div>{spendingDisplay}</div>
        </div>
    );
}
