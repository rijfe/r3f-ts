import styled from "styled-components";

import saveLogo from "../img/free-icon-save-4743125.png";
import folderLogo from "../img/free-icon-folder-73581.png"

function ListItem(){
    return(
        <ListItemContainer>
            <ListItemBox>
                <img src={saveLogo}/>
            </ListItemBox>
            <ListItemBox>
                <img src={folderLogo}/>
            </ListItemBox>
        </ListItemContainer>
    );
}

export default ListItem;

const ListItemContainer = styled.div`
    height:100%;
    width: 5rem;
    border-right: 1px solid;
`;

const ListItemBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 5rem;
`;