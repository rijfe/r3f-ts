import styled from "styled-components";

interface ListCardProps{
    title: string,
    material: string,
    w: number,
    h: number,
    d: number
}

function ListCard(props:ListCardProps){
    return (
        <ListBox>
            <ListTitle>
                <p style={{fontSize:"2rem", fontWeight:500, marginLeft:4}}>{props.title}</p>
            </ListTitle>
            <ListDetail>
                <ListImg>img</ListImg>
                <ListInfo>
                    <Info>{props.material}</Info>
                    <Info>{`W : ${props.w}, H : ${props.h}, D : ${props.d}`}</Info>
                </ListInfo>
            </ListDetail>
        </ListBox>
    );
}

export default ListCard;

const ListBox = styled.div`
    width: 90%;
    height: 10rem;
    margin-bottom:2rem;
    display:fixed;
`;

const ListTitle = styled.div`
    width: 100%;
    height: 33%;
    background: #a7a7a7;
    display:flex;
    align-items: center;
`;

const ListDetail = styled.div`
    width: 100%;
    height: 67%;
    background: #f8f8f8;
    display:flex;
    flex-direction: row;
`;

const ListImg = styled.div`
    width: 20%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const ListInfo = styled.div`
    width: 80%;
    height:100%;
    display:flex;
    flex-direction: column;
`;

const Info = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    font-size:1.5rem;
`;
