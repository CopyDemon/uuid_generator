"use client";
import { v1, v4, v7 } from "uuid";
import { JSX, useRef, useState } from "react";
export default function UuidGenerator() {
    const [uuidList, setUuidList] = useState<JSX.Element[]>([]);
    const howManyUuidToGenerateRef = useRef<HTMLInputElement>(null);
    const whichVersionUuidToGenerateRef = useRef<HTMLSelectElement>(null);
    const generateBtnRef = useRef<HTMLButtonElement>(null);
    const uuidDisplayUlRef = useRef<HTMLUListElement>(null);
    const copyAllBtnRef = useRef<HTMLButtonElement>(null);

    function generateUuidHandler(event: React.FormEvent) {
        event.preventDefault();
        const generateAmount: number = parseInt(howManyUuidToGenerateRef.current?.value || "1");
        const version: string = whichVersionUuidToGenerateRef.current?.value || "v1";

        // get uuid generator function
        let uuidGeneratrFunction: (() => string) | undefined;
        switch (version) {
            case "v1":
                console.log(version);
                uuidGeneratrFunction = v1;
                break;
            case "v4":
                console.log(version);
                uuidGeneratrFunction = v4;
                break;
            case "v7":
                console.log(version);
                uuidGeneratrFunction = v7;
                break;
            default:
                console.log(version);
                uuidGeneratrFunction = v4;
                break;
        }

        const uuids = [];

        // generate uuids
        for (let i = 0; i < generateAmount; i++) {
            uuids.push(uuidGeneratrFunction());
        }

        const uuidDisplayList = uuids.map((el, index) => {
            return <li className="uuid-item" key={index}>
                <span className="uuid">{el}</span>
                <button className="copy_uuid_btn" onClick={() => alert("copy")}>Copy</button>
            </li>;
        })

        setUuidList(uuidDisplayList)
    }
    return (
        <>
            <section>
                <form id="uuid_generator_form">
                    <div className="input-group">
                        <label htmlFor="uuid_count">How many UUIDs do you want to generate?</label>
                        <input type="number" id="uuid_count" min="1" max="50" defaultValue="1" ref={howManyUuidToGenerateRef} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="uuid_type">Select UUID Version:</label>
                        <select id="uuid_type" defaultValue="v4" ref={whichVersionUuidToGenerateRef}>
                            <option value="v1">v1</option>
                            <option value="v4">v4</option>
                            <option value="v7">v7</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <button id="generate_btn" ref={generateBtnRef} onClick={generateUuidHandler}>Click to Generate UUID</button>
                    </div>
                </form>
                {/* uuid results display */}
                {/* <div id="result-section" className="result-section"> */}
                <div>
                    <h2>Your Generated UUID Results:</h2>
                    <p>Feel free to copy and use these freshly generated UUIDs for whatever project you want.</p>
                    <button id="copy_all_btn" ref={copyAllBtnRef}>Copy All</button>
                    <ul id="uuidDisplayUl" ref={uuidDisplayUlRef}>
                        {uuidList}
                    </ul>
                </div>
            </section>
        </>
    );
}