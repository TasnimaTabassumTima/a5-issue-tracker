// get buttons
const allBtn = document.getElementById("btn-all");
const openBtn = document.getElementById("btn-open");
const closedBtn = document.getElementById("btn-closed");
const issueCounter = document.getElementById("issue-counter");
const open = document.getElementById("open");
const all = document.getElementById("all");
const closed = document.getElementById("closed");
const openDot = document.getElementById("open-dot");
const closedDot = document.getElementById("closed-dot");

const manageSpinner = (status) =>
{
    const spinner = document.getElementById("spinner");
    if(status === true){
        spinner.classList.remove("hidden");
        all.classList.add("hidden");
        open.classList.add("hidden");
        closed.classList.add("hidden");
    }
    else{
        spinner.classList.add("hidden");
        all.classList.remove("hidden");
        open.classList.remove("hidden");
        closed.classList.remove("hidden");
    }
};

const loadIssue = async() => {
    manageSpinner(true);
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

const displayDetails = (data) => {
    const details = document.getElementById("card_details");
    details.innerHTML = `
    <div class="modal-box space-y-6">
            <div class="space-y-2">
                <h2 class="font-bold text-2xl text-[#1F2937]">${data.title}</h2>
                <div class="flex flex-wrap items-center space-x-2">
                    <button class="btn btn-success rounded-full text-[12px] text-[#FFFF]">${data.status === "open" ? "Opened" : "Closed"}</button>
                    <p class="text-[#64748B] text-[12px]"><div id="closed-dot" class="w-2 h-2 bg-[#585559] rounded-full"></div> Opened by ${data.assignee}</p>
                    <p class="text-[#64748B] text-[12px]"><div id="closed-dot" class="w-2 h-2 bg-[#585559] rounded-full"></div> ${data.createdAt[5]}${data.createdAt[6]}/${data.createdAt[8]}${data.createdAt[9]}/${data.createdAt[0]}${data.createdAt[1]}${data.createdAt[2]}${data.createdAt[3]}</p>
                </div>
            </div>
            <div class="flex flex-wrap gap-1">${labelsMapper(data.labels)}</div>
            <p class="text-[#64748B] text-[16px]">${data.description}</p>
            <div class="flex items-center bg-[#F8FAFC] p-4 space-x-3">
                <div class="w-[50%]">
                    <p class="text-[#64748B]">Assignee:</p>
                    <h2 class="font-bold">${data.assignee}</h2>
                </div>
                <div class="w-[50%]">
                    <p class="text-[#64748B]">Priority:</p>
                    <button class="btn btn-error rounded-full text-[#FFFF] px-4 py-[6px]">${data.priority.toUpperCase()}</button>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-primary">Close</button>
                </form>
            </div>
        </div>
    `;

    manageSpinner(false);
};

const details = async(id) => {
    manageSpinner(true);
    document.getElementById("card_details").showModal();
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
};

const displayIssue = (issues) => {
    const allIssueContainer = document.getElementById("all-issue-container");
    const openIssueContainer = document.getElementById("open-issue-container");
    const closedIssueContainer = document.getElementById("closed-issue-container");
    allIssueContainer.innerHTML = "";

    issues.forEach(issue => {
        const div = document.createElement('div');
        div.innerHTML = `
                <div onclick="details(${issue.id});" class="p-4 bg-base-200 shadow space-y-3 cursor-pointer h-[230px]">
                    <div class="flex justify-between">
                        ${issue.priority === 'low' ? `<img class="w-7 h-7" src="./assets/Closed- Status .png" alt="">` : `<img class="w-7 h-7" src="./assets/Open-Status.png" alt="">`}

                        ${issue.priority === 'low' ? `<span class="bg-[#ece4e4] px-6 py-1 rounded-3xl text-[#828080]">${issue.priority.toUpperCase()}</span>` : `<span class="bg-[#FEECEC] px-6 py-1 rounded-3xl text-[#EF4444]">${issue.priority.toUpperCase()}</span>`}
                        
                        
                    </div>
                    <h2 class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</h2>
                    <p class="text-[#64748B] text-xs line-clamp-2">${issue.description}</p>
                    <div class="flex flex-wrap gap-1">${labelsMapper(issue.labels)}</div>
                </div>
                <div onclick="details(${issue.id});" class="p-4 bg-base-200 shadow">
                    <p class="text-xs text-[#64748B]">#${issue.id} by ${issue.author}</p>
                    <p class="text-xs text-[#64748B]">${issue.createdAt[5]}${issue.createdAt[6]}/${issue.createdAt[8]}${issue.createdAt[9]}/${issue.createdAt[0]}${issue.createdAt[1]}${issue.createdAt[2]}${issue.createdAt[3]}</p>
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
    manageSpinner(false);
};

allBtn.addEventListener('click', function(){
    manageSpinner(true);
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
    allBtn.classList.add("btn-primary");

    const allIssueContainer = document.getElementById("all-issue-container");
    const allCardNumber = allIssueContainer.children.length;
    issueCounter.innerText = allCardNumber;

    all.classList.remove("hidden");
    open.classList.add("hidden");
    closed.classList.add("hidden");

    openDot.classList.remove("bg-[#4A00FF]");
    closedDot.classList.remove("bg-[#4A00FF]");
    manageSpinner(false);
});

openBtn.addEventListener('click', function(){
    manageSpinner(true);
    allBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
    openBtn.classList.add("btn-primary");

    const openIssueContainer = document.getElementById("open-issue-container");
    const openCardNumber = openIssueContainer.children.length;
    issueCounter.innerText = openCardNumber;

    all.classList.add("hidden");
    open.classList.remove("hidden");
    closed.classList.add("hidden");

    openDot.classList.add("bg-[#4A00FF]");
    closedDot.classList.remove("bg-[#4A00FF]");
    manageSpinner(false);
});

closedBtn.addEventListener('click', function(){
    manageSpinner(true);
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.add("btn-primary");

    const closedIssueContainer = document.getElementById("closed-issue-container");
    const closedCardNumber = closedIssueContainer.children.length;
    issueCounter.innerText = closedCardNumber;

    all.classList.add("hidden");
    open.classList.add("hidden");
    closed.classList.remove("hidden");

    openDot.classList.remove("bg-[#4A00FF]");
    closedDot.classList.add("bg-[#4A00FF]");
    manageSpinner(false);
});

loadIssue();

document.getElementById("search").addEventListener('click',() => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
        const allCards = data.data;
        const filterCards = allCards.filter(card => card.title.toLowerCase().includes(searchValue));

        displayIssue(filterCards);

        openBtn.classList.remove("btn-primary");
        closedBtn.classList.remove("btn-primary");
        allBtn.classList.remove("btn-primary");

        issueCounter.innerText = filterCards.length;

    });
});