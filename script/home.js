const loadIssue = async() => {
    const url =  "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();

    displayIssue(data.data);
};

const labelsMapper = (labels) => {
    const  styles = {
        "bug": {
            class: "bg-[#FEECEC] text-[#EF4444]",
            icon: "fa-solid fa-bug"
        },
        "help wanted": {
            class: "bg-[#FFF8DB] text-[#D97706]",
            icon: "fa-solid fa-helicopter-symbol"
        },
        "enhancement": {
            class: "bg-[#BBF7D0] text-[#00A96E]",
            icon: "fa-solid fa-wand-magic-sparkles"
        },
        "others": {
            class: "bg-[#f4d352] text-[#EF4444]",
            icon: "fa-regular fa-star"
        }
    }
    const html = labels.map(label => {

        const style = styles[label] || styles["others"];
        // console.log(style.class);
        const span = `<span class="px-2 py-1 rounded-3xl border ${style.class}"><i class="${style.icon}"></i>${label.toUpperCase()}</span>`

        return span;
    }).join("");

    return html;
}

/* 
<span class="bg-[#FEECEC] px-2 py-1 rounded-3xl text-[#EF4444] border"><i class="fa-solid fa-bug"></i>BUG</span>

                        <span class="bg-[#FFF8DB] px-2 py-1 rounded-3xl text-[#D97706] border "><i class="fa-solid fa-helicopter-symbol"></i>HELP WANTED</span>

                        <span class="bg-[#BBF7D0] px-2 py-1 rounded-3xl text-[#00A96E] border "><i class="fa-solid fa-wand-magic-sparkles"></i>ENHANCEMENT</span>

                        `<span class="bg-[#f4d352] px-2 py-1 rounded-3xl text-[#EF4444] border "><i class="fa-regular fa-star"></i>ENHANCEMENT</span>`
*/

const details = async(id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
};

const displayIssue = (issues) => {
    const allIssueContainer = document.getElementById("all-issue-container");
    const openIssueContainer = document.getElementById("open-issue-container");
    const closedIssueContainer = document.getElementById("closed-issue-container");
    allIssueContainer.innerHTML = "";
    issues.forEach(issue => {
        const div = document.createElement('div');
        div.innerHTML = `
                <div onclick="details(${issue.id});" class="p-4 bg-base-200 shadow space-y-3 cursor-pointer">
                    <div class="flex justify-between">
                        ${issue.priority === 'low' ? `<img class="w-7 h-7" src="./assets/Closed- Status .png" alt="">` : `<img class="w-7 h-7" src="./assets/Open-Status.png" alt="">`}

                        ${issue.priority === 'low' ? `<span class="bg-[#ece4e4] px-6 py-1 rounded-3xl text-[#828080]">${issue.priority.toUpperCase()}</span>` : `<span class="bg-[#FEECEC] px-6 py-1 rounded-3xl text-[#EF4444]">${issue.priority.toUpperCase()}</span>`}
                        
                        
                    </div>
                    <h2 class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</h2>
                    <p class="text-[#64748B] text-xs line-clamp-2">${issue.description}</p>
                    <div class="flex flex-wrap gap-1">${labelsMapper(issue.labels)}</div>
                </div>
                <div class="p-4 bg-base-200 shadow">
                    <p class="text-xs text-[#64748B]">#1
by john_doe</p>
                    <p class="text-xs text-[#64748B]">1/15/2024</p>
                </div>
        `;
        allIssueContainer.appendChild(div);
        if((issue.priority) === 'low'){
            const copyClosedCard = div.cloneNode(true);
            closedIssueContainer.appendChild(copyClosedCard);
        }
        else{
            const copyOpenCard = div.cloneNode(true);
            openIssueContainer.appendChild(copyOpenCard);
        }    
    });
    
};

// get buttons
const allBtn = document.getElementById("btn-all");
const openBtn = document.getElementById("btn-open");
const closedBtn = document.getElementById("btn-closed");
const IssueCounter = document.getElementById("issue-counter");
const open = document.getElementById("open");
const all = document.getElementById("all");
const closed = document.getElementById("closed");
const openDot = document.getElementById("open-dot");
const closedDot = document.getElementById("closed-dot");

allBtn.addEventListener('click', function(){
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
    allBtn.classList.add("btn-primary");

    const allIssueContainer = document.getElementById("all-issue-container");
    const allCardNumber = allIssueContainer.children.length;
    IssueCounter.innerText = allCardNumber;

    all.classList.remove("hidden");
    open.classList.add("hidden");
    closed.classList.add("hidden");

    openDot.classList.remove("bg-[#4A00FF]");
    closedDot.classList.remove("bg-[#4A00FF]");
});

openBtn.addEventListener('click', function(){
    allBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
    openBtn.classList.add("btn-primary");

    const openIssueContainer = document.getElementById("open-issue-container");
    const openCardNumber = openIssueContainer.children.length;
    IssueCounter.innerText = openCardNumber;

    all.classList.add("hidden");
    open.classList.remove("hidden");
    closed.classList.add("hidden");

    openDot.classList.add("bg-[#4A00FF]");
    closedDot.classList.remove("bg-[#4A00FF]");
});

closedBtn.addEventListener('click', function(){
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.add("btn-primary");

    const closedIssueContainer = document.getElementById("closed-issue-container");
    const closedCardNumber = closedIssueContainer.children.length;
    IssueCounter.innerText = closedCardNumber;

    all.classList.add("hidden");
    open.classList.add("hidden");
    closed.classList.remove("hidden");

    openDot.classList.remove("bg-[#4A00FF]");
    closedDot.classList.add("bg-[#4A00FF]");
});


loadIssue();