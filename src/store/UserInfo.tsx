import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist({
    key:"userInfo",
    storage:localStorage
});

const userInfo = atom({
    key:"userInfo",
    default:"",
    effects_UNSTABLE: [persistAtom],
});

const getUserInfo = selector({
    key: "getUserInfo",
    get: ({get})=>{
        const state = get(userInfo);
        return state;
    }
});

export {userInfo, getUserInfo};