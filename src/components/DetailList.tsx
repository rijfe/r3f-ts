import styled from "styled-components";
import { useState } from "react";

interface DetailListProps {
    isOpen: boolean
}

function DetailList({isOpen}:DetailListProps){
    const [chapter, setChapter] = useState<number>(1);
    return (
        <DetailListContainer className={isOpen ? "detail" : ""}>
            <ChapterContainer></ChapterContainer>
            <BlankContainer></BlankContainer>
            <ListContainer></ListContainer>
        </DetailListContainer>
    );
}

export default DetailList;

const DetailListContainer = styled.div`
    width: 30rem;
    height:100%;
    position: fixed;
    left: -50%;
    transition: 0.5s ease;
    z-index:-1;
    &.detail{
        left: 8rem;
        transition: 0.5s ease;
        z-index:1;
    }
`;

const ChapterContainer  = styled.div`
    width:100%;
    height: 6%;
    background: #D8D8D8;
`;

const BlankContainer = styled.div`
    width:100%;
    height: 1%;
`;

const ListContainer = styled.div`
    width:100%;
    height: 93%;
    background: #D8D8D8;
`;