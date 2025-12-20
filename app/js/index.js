import { v1 as uuidv1, v4 as uuidv4, v7 as uuidv7 } from "uuid";

const uuidType = document.getElementById("uuid_type");
const uuidCount = document.getElementById("uuid_count");
const generateBtn = document.getElementById("generate_btn");
const uuidDisplayUl = document.getElementById("uuidDisplayUl");
const uuids = [];

generateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // clean previous uuids list
    uuidDisplayUl.innerHTML = "";
    uuids.length = 0;

    // get how many uuids
    const count = uuidCount.value;
    if (typeof parseInt(count) !== "number" || count > 50 || count < 1) {
        alert("Max generate number is 50 Please enter a number between 1 and 50");
        return;
    }

    // get version
    const version = uuidType.value;
    const avilableVersions = ["v1", "v4", "v7"];
    if (!avilableVersions.includes(version)) {
        return;
    }

    // get uuid generator function
    let uuidGeneratrFunction = undefined;
    switch (version) {
        case "v1":
            console.log(version);
            uuidGeneratrFunction = uuidv1;
            break;
        case "v4":
            console.log(version);
            uuidGeneratrFunction = uuidv4;
            break;
        case "v7":
            console.log(version);
            uuidGeneratrFunction = uuidv7;
            break;
        default:
            console.log(version);
            uuidGeneratrFunction = uuidv4;
            break;
    }

    // generate uuids
    for (let i = 0; i < count; i++) {
        uuids.push(uuidGeneratrFunction());
    }

    // display uuids
    const uuidList = uuids.map((el) => {
        return `<li class="uuid-item">
            <span class="uuid">${el}</span>
            <button class="copy_uuid_btn">Copy</button>
        </li>`;
    });

    uuidDisplayUl.innerHTML = uuidList.join("\n");

    //
    const resultSection = document.getElementById("result-section");

    if (uuids.length > 0) {
        resultSection.style.display = "block";
    } else {
        alert("fail to generate uuids, sorry");
    }
});

const copyAllBtn = document.getElementById("copy_all_btn");
copyAllBtn.addEventListener("click", (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(uuids.join(",\n"));
    showCopiedMessage("All UUIDs copied!");
});

// Event delegation for dynamically created copy buttons
uuidDisplayUl.addEventListener("click", (event) => {
    if (event.target.classList.contains("copy_uuid_btn")) {
        event.preventDefault();
        // Find the index of the clicked button's parent li
        const li = event.target.closest(".uuid-item");
        const allItems = uuidDisplayUl.querySelectorAll(".uuid-item");
        const index = Array.from(allItems).indexOf(li);
        navigator.clipboard.writeText(uuids[index]);
        showCopiedMessage("UUID copied!");
    }
});

/**
 * show copied message
 * @param {string} message
 */
function showCopiedMessage(message) {
    const copiedMessage = document.getElementById("copied");
    copiedMessage.style.display = "inline-block";
    copiedMessage.textContent = message;
    const timeoutId = setTimeout(() => {
        copiedMessage.style.display = "none";
        clearTimeout(timeoutId);
    }, 2000);
}
