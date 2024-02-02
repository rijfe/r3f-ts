import { atom, selector } from "recoil";

const pointState = atom({
    key:"pointState",
    default:[0,0,0],
});

const getPointState = selector({
    key: "getPointState",
    get: ({get})=>{
        const state = get(pointState);
        return state;
    }
});

export {pointState, getPointState};