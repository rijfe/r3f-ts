import styled from "styled-components";

import saveLogo from "../img/free-icon-save-4743125.png";
import saveProLogo from "../img/free-icon-storage-1836018.png";
import folderLogo from "../img/free-icon-folder-73581.png"
import docLogo from "../img/free-icon-new-document-2476546.png";

interface listItemProps{
    handleUpload : any,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsPartOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
    isPartOpen: boolean,
    isSetOpen: boolean,
    setIsSetOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function ListItem({handleUpload,setIsOpen, setIsPartOpen, isOpen, isPartOpen, isSetOpen, setIsSetOpen }:listItemProps){
    return(
        <ListItemContainer>
            <ProjectContainer>
                <ListItemBox style={{height: "25%"}}>
                    <img style={{width:"60%", height:"60%"}} src={saveLogo}/>
                    <FileInput/>
                </ListItemBox>
                <ListItemBox style={{height: "25%"}}>
                    <img style={{width:"60%", height:"60%"}} src={saveProLogo}/>
                </ListItemBox >
                <ListItemBox style={{height: "25%"}} onClick={()=>{
                    document.getElementById("file")?.click();
                }}>
                    <img style={{width:"60%", height:"60%"}} src={folderLogo}/>
                    <FileInput type="file" id="file" onChange={handleUpload}/>
                </ListItemBox >
                <ListItemBox style={{height: "25%"}} onClick={()=>{
                    setIsOpen(!isOpen);
                    setIsPartOpen(false);
                    setIsSetOpen(false);
                }}>
                    <img style={{width:"60%", height:"60%"}} src={docLogo}/>
                    <FileInput/>
                </ListItemBox>
            </ProjectContainer>
            <BlankContainer></BlankContainer>
            <ProjectDetailContainer>
                <ListItemBox style={{height: "5rem"}}
                    onClick={()=>{
                        setIsOpen(false);
                        setIsPartOpen(!isPartOpen);
                        setIsSetOpen(false);
                    }}
                >
                    B
                </ListItemBox>
                <ListItemBox style={{height: "5rem"}}
                    onClick={()=>{
                        setIsOpen(false);
                        setIsPartOpen(false);
                        setIsSetOpen(!isSetOpen);
                    }}
                >
                    S
                </ListItemBox>
            </ProjectDetailContainer>
        </ListItemContainer>
    );
}

export default ListItem;

const ListItemContainer = styled.div`
    height:100%;
    width: 7rem;
    z-index: 60;
`;

const ProjectContainer = styled.div`
    width:100%;
    height: 16%;
    background: #D8D8D8;
`;

const ListItemBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    &:hover{
        background-color:#8D8D8D;
    }
    &:focus-within{
        background-color:#ff0500;
    }
`;
const FileInput = styled.input`
    display:none;
`;

const BlankContainer = styled.div`
    width:100%;
    height: 1%;
`;

const ProjectDetailContainer = styled.div`
    width:100%;
    height: 83%;
    background: #D8D8D8;
`;