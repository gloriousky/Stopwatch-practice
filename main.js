let hour, minute, second;
hour = minute = second = 0; //初始化 
let millisecond = 0; //毫秒 var int;
let hour2, minute2, second2, millisecond2;
hour2 = minute2 = second2 = millisecond2 = 0;
let millisecondCurrent = 0;
let millisecondBefore = 0;
let str = 0


function Reset() {
    millisecond = hour = minute = second = millisecondCurrent = millisecondBefore = 0;
    millisecond2 = hour2 = minute2 = second2 = 0;
    str = 0;
    window.clearInterval(int);
    document.getElementById('Stopwatch').value = '00:00:00:000';
    document.querySelector('.btn__start').style.visibility = 'visible'
    let ulValue = ''
    document.querySelector('.record__info').innerHTML = ulValue
}

function start() {
    int = setInterval(timer, 3)
    document.querySelector('.btn__start').style.visibility = 'hidden'
    document.querySelector('.btn__reset').style.visibility = 'hidden'
    document.querySelector('.btn__record').style.visibility = 'visible'
};

//碼表
function timer() {
    millisecond = millisecond + 3;
    if (millisecond >= 1000) {
        millisecond = 0;
        second = second + 1;
    }
    if (second >= 60) {
        second = 0;
        minute = minute + 1;
    }
    if (minute >= 60) {
        minute = 0;
        hour = hour + 1;
    }
    document.getElementById('Stopwatch').value = `${hour}：${minute}：${second}：${millisecond}`;
}

function stop() {
    window.clearInterval(int);
    document.querySelector('.btn__start').style.visibility = 'visible'
    document.querySelector('.btn__reset').style.visibility = 'visible'
    document.querySelector('.btn__record').style.visibility = 'hidden'
}

//分段紀錄
function record() {
    str++
    let li = document.createElement('li')
    let currentTime = new Date();

    //計時時間轉換成毫秒代入
    millisecondCurrent = millisecond + second * 1000 + minute * 60 * 1000 + hour * 60 * 60 * 1000
    timeRecord(millisecondCurrent)


    //計算兩者時間差
    function timeRecord(value) {
        millisecondCurrent = millisecondCurrent - millisecondBefore
        millisecondBefore = value
    }
    console.log(millisecondCurrent)

    millisecond2 = millisecondCurrent

    if (millisecond2 < 1000) {
        millisecond2 = millisecond2
    } else if (millisecond2 < 60000) {
        second2 = parseInt((millisecond2 / 1000))
        millisecond2 = millisecond2 - (second2 * 1000)
    } else if (millisecond2 < 3600000) {
        second2 = parseInt((millisecond2 / 1000))
        minute2 = parseInt((second2 / 60))
        second2 = second2 - (minute2 * 60)
        millisecond2 = millisecond2 - ((minute2 * 60 + second2) * 1000)
    } else if (millisecond2 < 86400000) {
        second2 = parseInt((millisecond2 / 1000))
        minute2 = parseInt((second2 / 60))
        hour2 = parseInt((minute2 / 60))
        minute2 = minute2 - (hour2 * 60)
        second2 = second2 - ((hour2 * 60) + minute2) * 60
        millisecond2 = millisecond2 - ((((hour2 * 60) + minute2) * 60 + second2) * 1000)
    }

    li.setAttribute('class', 'lap')
    li.innerHTML = `<span>${str}</span><input type="text" class="record_item" placeholder="輸入筆記"><span class="record__item1">${hour}：${minute}：${second}：${millisecond}</span> <span class="record__item2">${hour2}：${minute2}：${second2}：${millisecond2}</span><span class="record__item3">${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}</span>`
    document.querySelector('.record__info').appendChild(li)
}