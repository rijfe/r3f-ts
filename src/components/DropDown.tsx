import styled from "styled-components";

interface DropDownProps{
    delete: ()=> {}
}

function DropDown(props:DropDownProps){
    return(
        <DropdownContainer>
            <Menu>
                Scale Factor
            </Menu>
            <Menu 
                onClick={props.delete}
            >
                DELETE
            </Menu>
        </DropdownContainer>
    );
}

export default DropDown;

const DropdownContainer = styled.div`
    width: 15rem;
    height: 6rem;
    background: white;
    position: absolute;
    top:3.5rem;
    left: 4rem;
    border: solid 2px black;
    z-index:51;
`;

const Menu = styled.div`
    width: 100%;
    height: 50%;
    display:flex;
    justify-content:center;
    align-items:center;
    &:hover{
        background:#dadada;
    } 
`;