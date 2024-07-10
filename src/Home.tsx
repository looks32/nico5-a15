import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "./api";
import { Link, Outlet } from 'react-router-dom';
import styled from "styled-components";

interface ICharacter {
	id:string,
	imageUrl:string,
	name:string
}

const ListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px 50px;
`;

const List = styled.li`
  position: relative;
  width: 200px;
  margin-right: 20px;
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 20px;
  opacity: 0;
  transition: box-shadow 0.5s, color 0.5s;
  animation: list 0.8s forwards;
  animation-delay: 0.4s;
  @keyframes list {
    0% {
      top: 40px;
      opacity: 0;
    }
    100% {
      top: 0;
      opacity: 1;
    }
  }

  &:hover {
    box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.3);
    a {
      color: #88e4f0;
    }
  }

  a {
    display: block;
    color: #fff;
  }
`;

const ImgWrap = styled.div`
  display: block;
  width: 130px;
  height: 130px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CharName = styled.p`
  margin-top: 20px;
  line-height: 1.4;
`;

export default function Home() {

	const { isLoading, data } = useQuery<ICharacter>(["allCharacter"], fetchCharacter);

  const Character = data ? data.sort(() => Math.random() - 0.5) : [];

	return (
		<>
			{
				isLoading ? 
				<div>loading....</div> 
				: 
				<ListWrap>
					{Character?.slice(0,100).map((c)=>
						<List key={c.id}>
							<Link to={`/character/${c.id}`}>
								<ImgWrap>
									<img src={
                    c.imageUrl === undefined
                    ? "https://cdn-images-1.medium.com/max/1600/1*Z_J0TYccherWHqCJanQD1A.jpeg"
                    : c.imageUrl ===
                      "https://static.wikia.nocookie.net/disney/images/7/7c/Noimage.png"
                    ? "https://cdn-images-1.medium.com/max/1600/1*Z_J0TYccherWHqCJanQD1A.jpeg"
                    : c.imageUrl
                  } alt={c.name} />
								</ImgWrap>
								<CharName>{c.name}</CharName>
							</Link>
						</List>
					)}
				</ListWrap>
			}
			<Outlet/>
		</>
	)
}
