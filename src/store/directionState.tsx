import { atom, selector } from "recoil";

const directionState = atom({
    key:"directionState",
    default:"no",
});

const getDirectionState = selector({
    key: "getDirectionState",
    get: ({get})=>{
        const state = get(directionState);
        return state;
    }
});

const directionPoint = atom({
    key:"directionPoint",
    default:[0,0,0],
});

const getDirectionPoint = selector({
    key: "getDirectionPoint",
    get: ({get})=>{
        const state = get(directionPoint);
        return state;
    }
});

const directionSet = atom({
    key:"directionSet",
    default:false,
});

const getDirectionSet = selector({
    key: "getDirectionSet",
    get: ({get})=>{
        const state = get(directionSet);
        return state;
    }
});

export {directionState, getDirectionState, directionPoint, getDirectionPoint, directionSet, getDirectionSet};