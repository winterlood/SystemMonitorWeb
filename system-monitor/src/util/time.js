export const getFilteredDate = (nowTime) => {
    let year = nowTime.getFullYear(); // 년도

    let month = new String(nowTime.getMonth() + 1); // 월
    month = month >= 10 ? month : "0" + month;

    let day = new String(nowTime.getDate()); // 일
    day = day >= 10 ? day : "0" + day;

    let hour = new String(nowTime.getHours()); // 시간
    hour = hour >= 10 ? hour : "0" + hour;

    let minute = new String(nowTime.getMinutes());
    minute = minute >= 10 ? minute : "0" + minute;

    var sendTime = year + "-" + month + "-" + day + "-" + hour + "-" + minute;

    return sendTime;
};

export const getSelectedTime = (date, nowTime, selectedTime) => {
    let year = nowTime.getFullYear(); // 년도

    let month = new String(nowTime.getMonth() + 1); // 월
    month = month >= 10 ? month : "0" + month;

    let day = new String(nowTime.getDate());
    if (date === "tommorow") {
        day = new String(nowTime.getDate() + 1); // 일
    }
    day = day >= 10 ? day : "0" + day;

    // let hour = new String(nowTime.getHours()); // 시간
    // hour = hour >= 10 ? hour : "0" + hour;

    // let minute = new String(nowTime.getMinutes());
    // minute = minute >= 10 ? minute : "0" + minute;

    var sendTime = year + "-" + month + "-" + day + "-" + selectedTime;

    return sendTime;
};

export const plus30minute = () => {
    let today = new Date();
    today.setMinutes(today.getMinutes() + 30);
    return today;
};

export const getFilteredTime = (time) => {
    const nowTime = new String(time);
    const nowSplitedTime = nowTime.split("-");
    if (nowSplitedTime.length < 4) return "정보가 없습니다";
    return (
        nowSplitedTime[0] +
        "년 " +
        nowSplitedTime[1] +
        "월 " +
        nowSplitedTime[2] +
        "일 " +
        nowSplitedTime[3] +
        "시" +
        nowSplitedTime[4] +
        "분 "
    );
};
