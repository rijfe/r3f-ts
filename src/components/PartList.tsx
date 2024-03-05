import styled from "styled-components";

interface PartListProps {
    isPartOpen : boolean,
    lineNum: number,
}

function PartList({isPartOpen, lineNum} : PartListProps){
    return (
        <PartListContainer className = {isPartOpen ? "part":""}>
            <PartContainer
                style={{height:`${lineNum*4.5}%`}}
            >
                <PartBox style={{height:`${100/lineNum}%`}}>
                    <Part onClick={(e)=>{console.log(e.target);}}>pos1</Part>
                </PartBox>
            </PartContainer>
            <BlankContainer></BlankContainer>
            <ListContainer></ListContainer>
        </PartListContainer>
    );
}

export default PartList;

const PartListContainer = styled.div`
    width: 35rem;
    height: 100%;
    position: fixed;
    left: -50%;
    transition: 0.5s ease;
    z-index:-1;
    &.part{
        left: 8rem;
        transition: 0.5s ease;
        z-index:1;
    }
`

const PartContainer = styled.div`
    width:100%;
    background: #D8D8D8;
    display: flex;
    flex-direction: column;
`;

const BlankContainer = styled.div`
    width:100%;
    height: 1%;
`;

const ListContainer = styled.div`
    width:100%;
    height:90%;
    background: #D8D8D8;
`;

const PartBox = styled.div`
    width:100%;
`;

const Part = styled.div`
    width:20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:1.5rem;

    &:hover{
        border-bottom: 0.2rem solid #ff0000;
    }
`;