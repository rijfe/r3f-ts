import { atom, selector } from "recoil";

const userInfo = atom({
    key:"userInfo",
    default:"",
});

const getUserInfo = selector({
    key: "getUserInfo",
    get: ({get})=>{
        const state = get(userInfo);
        return state;
    }
});

export {userInfo, getUserInfo};