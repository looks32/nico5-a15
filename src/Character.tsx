import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { fetchDetail } from "./api";
import styled, {keyframes} from "styled-components";

interface IDetail {
	films:string[],
	id:number,
	imageUrl:string,
	name:string,
	sourceUrl:string
}

const PopWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  span {
    color: #fff;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: -40px;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.5s;
  &:hover {
    color: #88e4f0;
  }
`;

const ani1 = keyframes`
    0% {
      opacity: 0;
      top: 50px;
    }
    100% {
      opacity: 1;
      top: 0;
    }
`

const PopInner = styled.div`
  position: relative;
  width: 350px;
  margin: 100px auto 0;
  padding: 50px 30px;
  text-align: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 10px 10px 20px rgba(255, 255, 255, 0.2);
  animation: ${ani1} 0.5s;

  p {
    margin-top: 60px;
    color: #000;
    font-size: 20px;
  }

  ul {
    margin-top: 30px;
  }

  ul li {
    color: #000;
	font-size: 16px;
    ~ li {
      margin-top: 10px;
    }
  }

  @media (max-width: 600px){
	  width: 100%;
  }
`;



const ImgWrap = styled.div`
  width: 200px;
  max-height: 300px;
  overflow: hidden;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px;
  img {
    width: 100%;
  }
`;

const Tit = styled.h1`
  color: #000;
  font-size: 30px;
  margin-top: 50px;
`;

export default function Character() {

	const {characterId} = useParams();

	const navigate = useNavigate();

	const { isLoading, data } = useQuery({
		queryKey: ["charDetail", characterId],
		queryFn: () => fetchDetail(characterId),
    staleTime: 300000,
	});

	return (
	<PopWrap>
		{
			isLoading ? <span>loading...</span> : 
			
			<div>
				<PopInner>
					<ImgWrap>
						<img src={
              data.imageUrl === undefined
              ? "https://cdn-images-1.medium.com/max/1600/1*Z_J0TYccherWHqCJanQD1A.jpeg"
              : data.imageUrl
            } alt={data.name} />
					</ImgWrap>
					<Tit>{data.name}</Tit>
					<p>
						{data.name}'s Films
						<ul>
							{data.films.map((f)=><li key={f}>{`- ${f}`}</li>)}
						</ul>
					</p>
					<CloseBtn
						onClick={() => {
							navigate("/");
						}}
						>
						Close
					</CloseBtn>
				</PopInner>
			</div>
		}
		
	</PopWrap>
	)
}
