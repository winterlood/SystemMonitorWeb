const GET_PC_DATA = (pcId) => "https://www.22hours.online/mobile/pc/" + pcId + "/data";

const GET_TOTAL_PCS = "https://www.22hours.online/mobile/pc";

const GET_CLASS = "https://www.22hours.online/mobile/class";

const GET_CLASS_PCS = (classId) => "https://www.22hours.online/mobile/class/" + classId;

const POST_LOGIN = "https://www.22hours.online/mobile/login";
// powerStatus : "OFF" 추가 할 것

const POST_OFF_ONE_PC = "https://www.22hours.online/mobile/pc/power/";
// powerStatus : "OFF" 추가 할 것

const POST_DELAY_ONE_PC = "https://www.22hours.online/mobile/pc/power/";
// powerStatus값은 주지 말 것

const POST_OFF_ALL_PC = "https://www.22hours.online/mobile/class/power/";
// powerStatus : "OFF" 추가 할 것
// type :"CLASS"

const POST_DELAY_ALL_PC = "https://www.22hours.online/mobile/class/power/";
// powerStatus : "ON" 추가 할 것
// type :"CLASS"

const header = {
    "Content-Type": "application/json",
};

//https://www.22hours.online/
//http://13.125.208.19/
export {
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
