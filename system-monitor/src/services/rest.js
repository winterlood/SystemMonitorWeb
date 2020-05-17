import axios from "axios";

const DOMAIN = "https://www.22hours.online/mobile/";

const GET_PC_DATA = (pcId) => "pc/" + pcId + "/data";

const GET_TOTAL_PCS = "pc";

const GET_CLASS = "class";

const GET_CLASS_PCS = (classId) => "class/" + classId;

const POST_LOGIN = "login";
// powerStatus : "OFF" 추가 할 것

const POST_OFF_ONE_PC = "pc/power/";
// powerStatus : "OFF" 추가 할 것

const POST_DELAY_ONE_PC = "pc/power/";
// powerStatus값은 주지 말 것

const POST_OFF_ALL_PC = "class/power/";
// powerStatus : "OFF" 추가 할 것
// type :"CLASS"

const POST_DELAY_ALL_PC = "class/power/";
// powerStatus : "ON" 추가 할 것
// type :"CLASS"

const header = {
    "Content-Type": "application/json",
};

//https://www.22hours.online/
//http://13.125.208.19/

const GET = (url, data) => {
    return axios({
        method: "GET",
        url: DOMAIN + url,
        data,
        header,
    })
        .then((result) => result.data)
        .catch((result) => {
            console.log(result);
            return Error(result);
        });
};

const POST = (url, data) => {
    console.log(data);
    return axios({
        method: "POST",
        url: DOMAIN + url,
        data,
        header,
    })
        .then((result) => result.data)
        .catch((result) => {
            console.log(result);
            return data;
        });
};

export {
    GET,
    POST,
    header,
    GET_PC_DATA,
    GET_TOTAL_PCS,
    GET_CLASS,
    GET_CLASS_PCS,
    POST_LOGIN,
    POST_OFF_ONE_PC,
    POST_DELAY_ONE_PC,
    POST_OFF_ALL_PC,
    POST_DELAY_ALL_PC,
};
