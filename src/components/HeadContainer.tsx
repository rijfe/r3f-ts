import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getUserInfo } from "../store/UserInfo";

function HeadContainer(props:any){
    const navigate = useNavigate();
    const userId = useRecoilValue(getUserInfo);
    

    useEffect(()=>{
 
    },[]);

    return(
        <Header>
            <Content>
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
            </Content>
            <UserContent>
                <UserInfo>
                    {userId}님
                    
                </UserInfo>
                <LogoutBtn
                    onClick={()=>{
                        navigate(-1);
                    }}
                >
                    Log Out
                </LogoutBtn>
            </UserContent>
        </Header>
    );
}

export default HeadContainer;

const Header = styled.div`
    display: flex;
    width: 100%;
    height: 5%;
    border-bottom: 1px solid;
    align-items: center;
    justify-content:space-between;
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

const Content = styled.div`
    height:100%;
    width:auto;
    display:flex;
    flex-direction:row;
`;

const UserContent = styled.div`
    height: 100%;
    width:auto;
    display: flex;
    align-items:center;
`;

const UserInfo = styled.p`
    font-size: 2rem;
    margin-right:1rem;
    display:flex;
    flex-direction:row;
`;

const LogoutBtn = styled.div`
    width: 8rem;
    height: 70%;
    display:flex;
    justify-content: center;
    align-items:center;
    background-color: #0000aa;
    border-radius:1rem;
    color:white;
    font-size:1.5rem;
    margin-right: 2rem;
`;