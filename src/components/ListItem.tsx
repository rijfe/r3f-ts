import styled from "styled-components";

import saveLogo from "../img/free-icon-save-4743125.png";
import saveProLogo from "../img/free-icon-storage-1836018.png";
import folderLogo from "../img/free-icon-folder-73581.png"
import docLogo from "../img/free-icon-new-document-2476546.png";

interface listItemProps{
    handleUpload : any,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
}

function ListItem({handleUpload, isOpen,setIsOpen}:listItemProps){
    return(
        <ListItemContainer>
            <ProjectContainer>
                <ListItemBox>
                    <img src={saveLogo}/>
                </ListItemBox>
                <ListItemBox>
                    <img src={saveProLogo}/>
                </ListItemBox>
                <ListItemBox onClick={()=>{
                    document.getElementById("file")?.click();
                }}>
                    <img src={folderLogo}/>
                    <FileInput type="file" id="file" onChange={handleUpload}/>
                </ListItemBox>
                <ListItemBox onClick={()=>{
                    setIsOpen(!isOpen);
                }}>
                    <img src={docLogo}/>
                </ListItemBox>
            </ProjectContainer>
            <BlankContainer></BlankContainer>
            <ProjectDetailContainer></ProjectDetailContainer>
        </ListItemContainer>
    );
}

export default ListItem;

const ListItemContainer = styled.div`
    height:100%;
    width: 7rem;
    z-index: 3;
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
    height: 5rem;
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