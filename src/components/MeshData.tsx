import { BufferGeometry } from "three";

export class MeshData{
    showConnect: boolean = false;
    connectOn: boolean = false;
    conStart: boolean = false;
    conWid: number = 2.0;
    conHei: number = 4.0;
    conAngle: number = 4;
    conRotation: number = 0;
    conDis: number = 0;
    conCut: number = 50;
    offset: number = 5;
    planeY: number = 5;
    pos:string;
    file: BufferGeometry | BufferGeometry[] | null;
    fileName: string;
    type: string;
    dirState:boolean;
    dirPoint : [number, number, number];
    caculating: boolean;    

    constructor(
        showConnect:boolean,
        connectOn: boolean,
        conStart: boolean,
        conWid: number,
        conHei: number,
        conAngle: number,
        conRotation: number,
        conDis: number,
        conCut: number,
        offset: number,
        planeY: number,
        pos:string,
        file: BufferGeometry | BufferGeometry[] | null,
        fileName: string,
        type: string,
        dirState:boolean,
        dirPoint : [number, number, number], 
        caculating: boolean
    ){
        this.showConnect = showConnect;
        this.connectOn = connectOn;
        this.conStart = conStart;
        this.conWid = conWid;
        this.conHei = conHei;
        this.conAngle = conAngle;
        this.conRotation = conRotation;
        this.conDis = conDis;
        this.conCut = conCut;
        this.offset = offset;
        this.planeY = planeY;
        this.pos = pos;
        this.file = file;
        this.fileName = fileName;        
        this.type = type;
        this.dirState = dirState;
        this.dirPoint = dirPoint;
        this.caculating = caculating;
    }
    set Caculating(v:boolean){
        this.caculating = v;
    }

    get Caculating(){
        return this.caculating;
    }

    set DirState(v:boolean){
        this.dirState = v;
    }
    set DirPoint(v: [number,number,number]){
        this.dirPoint = v;
    }
    get DirState(){
        return this.dirState;
    }
    get DirPoint(){
        return this.dirPoint;
    }

    set Pos(v:string){
        this.pos = v;
    }
    set FileName(v:string){
        this.fileName = v;
    }
    set File(v: BufferGeometry | BufferGeometry[] |null){
        this.file = v;
    }
    get Pos():string{
        return this.pos;
    }
    get FileName():string{
        return this.fileName;
    }
    get File():BufferGeometry | BufferGeometry[] | null{
        return this.file;
    }

    set Type(v: string){
        this.type = v;
    }

    get Type():string{
        return this.type;
    }

    set ConWid(v:number){
        this.conWid = v;
    }
    set ConHei(v:number){
        this.conHei = v;
    }
    set ConAngle(v:number){
        this.conAngle = v;
    }
    set ConRotation(v:number){
        this.conRotation = v;
    }
    set ConDis(v:number){
        this.conDis = v;
    }
    set ConCut(v:number){
        this.conCut = v;
    }
    set Offset(v:number){
        this.offset = v;
    }
    set PlaneY(v:number){
        this.planeY = v;
    }

    get ConWid():number{
        return this.conWid;
    }
    get ConHei():number{
        return this.conHei;
    }
    get ConAngle():number{
        return this.conAngle;
    }
    get ConRotation():number{
        return this.conRotation;
    }
    get ConDis():number{
        return this.conDis;
    }
    get ConCut():number{
        return this.conCut;
    }
    get Offset():number{
        return this.offset;
    }
    get Plane():number{
        return this.planeY;
    }

    set ShowConnect(v: boolean){
        this.showConnect = v;
    }
    set ConnectOn(v: boolean){
        this.connectOn = v;
    }
    set ConStart(v: boolean){
        this.conStart = v;
    }
    get ShowConnect():boolean{
        return this.showConnect;
    }
    get ConnectOn():boolean{
        return this.connectOn;
    }
    get ConStart():boolean{
        return this.conStart;
    }

}