import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function HeadContainer(props:any){
    const navigate = useNavigate();

    return(
    <Header>
        <HeaderTitle>
            R3F
        </HeaderTitle>

        <PageBox onClick={()=>{navigate('/main', {replace:true});}}>
            Main
        </PageBox>

        <PageBox onClick={()=>{navigate('/falling', {replace:true});}}>
            Fall
        </PageBox>

        <PageBox onClick={()=>{navigate('/load', {replace:true});}}>
            Load
        </PageBox>
    </Header>);
}

export default HeadContainer;

const Header = styled.div`
    display: flex;
    width: 100%;
    height: 5rem;
    border-bottom: 1px solid;
    align-items: center;
`;

const HeaderTitle = styled.h1`
    font-weight: 900;
    font-size: 3rem;
    margin-right: 5rem;
`;

const PageBox = styled.div`
    width: 5rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 3rem;
    margin-right: 5rem;

    &:hover{
        font-weight: 900;
    }
`;