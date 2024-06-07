import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfo } from "../store/UserInfo";

interface UserInfoProps{
    userID: string
}

function UserDropDown(props: UserInfoProps){
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userInfo);
    
    return(
        <DropDownContainer>
            <ImgContainer>
                <ImgBox>
                    IMG
                </ImgBox>
                <UserInfoContainer>
                    <UserInfoBox>
                        <p style={{fontSize:"2rem", fontWeight:"bold"}}>{props.userID}님</p>
                        <p style={{fontSize:"1.5rem", fontWeight:"bold"}}>기타 정보</p>
                    </UserInfoBox>
                </UserInfoContainer>
            </ImgContainer>
            <ButtonContainer>
                <Button 
                    style={{width:"80%"}}
                    onClick={()=>{
                        navigate(-1);
                        setUser("");
                    }}
                >
                    <p style={{fontSize:"1.5rem", color:"#ffffff"}}>
                        Sign Out
                    </p>
                </Button>
            </ButtonContainer>
        </DropDownContainer>
    );
}

export default UserDropDown;

const DropDownContainer = styled.div`
    position: absolute;
    background: #ffffff;
    width: 20rem;
    height: 20rem;
    z-index: 65;
    border: solid 2px;
    top: 4.5rem;
    right: 5rem;
`;

const ImgContainer = styled.div`
    width: 100%;
    height:55%;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const ImgBox = styled.div`
    width: 30%;
    height: 50%;
    border: solid;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const UserInfoContainer = styled.div`
    width:50%;
    height: 50%;
    display:flex;
    align-items:end;
`;

const UserInfoBox = styled.div`
    width:100%;
    height: 80%;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    margin-left: 8px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    height:45%;
    display:flex;
    flex-direction: column;
    justify-content:space-around;
    align-items: center;
`;

const Button = styled.div`
    height: 30%;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 6px;
    background: #5488ff;
`;