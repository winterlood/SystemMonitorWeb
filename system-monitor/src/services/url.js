const GET_PC_DATA = (pcId) => "http://13.125.208.19/mobile/pc/" + pcId + "/data";

const GET_TOTAL_PCS = "http://13.125.208.19/mobile/pc";

const GET_CLASS = "http://13.125.208.19/mobile/class";

const GET_CLASS_PCS = (classId) => "http://13.125.208.19/mobile/class/" + classId;

const POST_OFF_ONE_PC = "http://13.125.208.19/mobile/pc/power/";
// powerStatus : "OFF" 추가 할 것

const POST_DELAY_ONE_PC = "http://13.125.208.19/mobile/pc/power/";
// powerStatus값은 주지 말 것

const POST_OFF_ALL_PC = "http://13.125.208.19/mobile/class/power/";
// powerStatus : "OFF" 추가 할 것
// type :"CLASS"

const POST_DELAY_ALL_PC = "http://13.125.208.19/mobile/class/power/";
// powerStatus : "ON" 추가 할 것
// type :"CLASS"

const header = {
    "Content-Type": "application/json",
};

export {
    header,
    GET_PC_DATA,
    GET_TOTAL_PCS,
    GET_CLASS,
    GET_CLASS_PCS,
    POST_OFF_ONE_PC,
    POST_DELAY_ONE_PC,
    POST_OFF_ALL_PC,
    POST_DELAY_ALL_PC,
};
