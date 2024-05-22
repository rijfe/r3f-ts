import { atom, selector } from "recoil";

const posNum = atom({
    key:"posNum",
    default:0,
});

const getPosNum = selector({
    key: "getPosNum",
    get: ({get})=>{
        const state = get(posNum);
        return state;
    }
});

export {posNum, getPosNum};