import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "./api";
import { Link } from 'react-router-dom';

interface ICharacter {
	id:string,
	imageUrl:string,
	name:string
}

export default function Home() {

	const { isLoading, data } = useQuery<ICharacter>(["allCharacter"], fetchCharacter);

	return (
		<>
			{
				isLoading ? 
				<div>loading....</div> 
				: 
				<ul>
					{data?.slice(0,100).map((c)=>
						<li key={c.id}>
							<Link to={`/character/${c.id}`}>
								<img src={c.imageUrl} alt={c.name} />
								{c.name}
							</Link>
						</li>
					)}
				</ul>
			}
		</>
	)
}
