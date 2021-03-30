// console.clear();

let list = [{
        id: 0,
        ticketTitle: "綠島自由行套裝行程",
        ticketUrl: "https://github.com/rickdiable/jsprac5_addtickets/blob/main/img/ticket-img/photo-1477894387642-00a731c511b3.png?raw=true",
        ticketRegion: "台北",
        ticketPrice: "$1,280",
        ticketNum: 8,
        ticketScore: 8.6,
        ticketDescription: "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。"
    },
    {
        id: 1,
        ticketTitle: "清境高空觀景步道二日遊",
        ticketUrl: "https://github.com/rickdiable/jsprac5_addtickets/blob/main/img/ticket-img/photo-1526772662000-3f88f10405ff.png?raw=true",
        ticketRegion: "台北",
        ticketPrice: "$2,580",
        ticketNum: 12,
        ticketScore: 8.2,
        ticketDescription: "清境農場青青草原數十公頃碧草，餵食著數以百計的綿羊和牛群，中央山脈最高的北三段群峰形成一堵如帶的高牆，攔住清晨的薄霧山嵐，成就了從花蓮翻山而來的雲瀑在濁水溪谷積成雲海，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。"
    },
    {
        id: 2,
        ticketTitle: "熊森公園親子二日遊套票",
        ticketUrl: "https://github.com/rickdiable/jsprac5_addtickets/blob/main/img/ticket-img/photo-1598954467835-3b0b6fe3be70.png?raw=true",
        ticketRegion: "高雄",
        ticketPrice: "$2,480",
        ticketNum: 3,
        ticketScore: 8.6,
        ticketDescription: "來自日本最受歡迎的兒童遊樂園《 BearSon Park 熊森公園》於全世界有800多家據點，在全世界、日本及台灣，很多小孩的童年都在遊戲愛樂園裡一同成長，提供兒童一個最富教育性及娛樂性的休憩遊樂天地！"
    }
];

// 將輸入價格轉換為需要格式
function thousands(num) {
    var str = num.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return ("$" + str.replace(reg, "$1,"));
}

function thousands_origin(num) {
    return ("$" + num.toLocaleString());
}

// 初始化
const ticketCards = document.querySelector('.ticket-cards');

function init() {
    let ticketCard = "";
    list.forEach(function (item) {
        let content = `<li class="ticket-card">
        <div class="ticket-img">
            <a href="#">
                <img src=${item.ticketUrl} alt="">
            </a>
            <div class="ticket-region">${item.ticketRegion}</div>
            <div class="ticket-score">${item.ticketScore}</div>
        </div>
        <div class="ticket-content d-flex-column">
                        <div>
                        <h3 class="ticket-title">${item.ticketTitle}</h3>
                        <p class="ticket-intro">${item.ticketDescription}</p>
                        </div>
                        <div class="ticket-status d-flex jc-between ai-center">
                            <p class="ticket-num"><span><i class="fas fa-exclamation-circle"></i></span> 剩下最後<span id="ticketCard-num"> ${item.ticketNum} </span> 組</p>
                            <p class="ticket-currency d-flex ai-center">TWD <span class="ticket-price" id=ticket-price> ${item.ticketPrice}</span></p>
                        </div>
                    </div>
                </li>`;
        ticketCard += content;
    })
    ticketCards.innerHTML = ticketCard;
}

init();

// 新增套票
const ticketTitle = document.querySelector('#ticketTitle');
const ticketUrl = document.querySelector('#ticketUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketScore = document.querySelector('#ticketScore');
const ticketDescription = document.querySelector('#ticketDescription');
const btn = document.querySelector('.form-btn');
const formList = document.querySelector('.form-list');

btn.addEventListener('click', function (e) {
    let obj = {
        id: list.length,
        ticketTitle: ticketTitle.value,
        ticketUrl: ticketUrl.value,
        ticketRegion: ticketRegion.value,
        ticketPrice: thousands(ticketPrice.value),
        ticketNum: ticketNum.value,
        ticketScore: ticketScore.value,
        ticketDescription: ticketDescription.value
    };
    // 檢核欄位填寫是否正確
    if (ticketScore.value > 10 || ticketScore.value < 1) {
        alert('套票星級區間請輸入1-10');
        return;
    } else if (ticketDescription.value.length > 100) {
        alert('套票描述限100字');
        return;
    }
    formList.reset();
    list.push(obj);
    init();
})


// 地區篩選
function selectRegion(region) {
    ticketCards.innerHTML = "";
    region.forEach(function (item, index) {
        ticketCards.innerHTML += `<li class="ticket-card">
        <div class="ticket-img">
            <a href="#">
                <img src=${item.ticketUrl} alt="">
            </a>
            <div class="ticket-region">${item.ticketRegion}</div>
            <div class="ticket-score">${item.ticketScore}</div>
        </div>
        <div class="ticket-content d-flex-column">
                        <div>
                        <h3 class="ticket-title">${item.ticketTitle}</h3>
                        <p class="ticket-intro">${item.ticketDescription}</p>
                        </div>
                        <div class="ticket-status d-flex jc-between ai-center">
                            <p class="ticket-num"><span><i class="fas fa-exclamation-circle"></i></span> 剩下最後<span id="ticketCard-num"> ${item.ticketNum} </span> 組</p>
                            <p class="ticket-currency d-flex ai-center">TWD <span class="ticket-price" id=ticket-price> ${item.ticketPrice}</span></p>
                        </div>
                    </div>
                </li>`;
    })
}

//本次搜尋幾筆資料
const regionFilter = document.querySelector('#regionSearch');
const searchResult = document.querySelector('#searchResult');

regionFilter.addEventListener("change", function (e) {
    if (e.target.value == "所有地區") {
        init();
        searchResult.textContent = `本次搜尋共 ${list.length} 筆資料`;
    } else {
        let finalData = list.filter(function (item) {
            return item.ticketRegion == e.target.value;

        })
        console.log(finalData);
        selectRegion(finalData);
        searchResult.textContent = `本次搜尋共 ${finalData.length} 筆資料`;
    }
})