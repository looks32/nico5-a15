import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { fetchDetail } from "./api";

interface IDetail {
	films:string[],
	id:number,
	imageUrl:string,
	name:string,
	sourceUrl:string
}

export default function Character() {

	const {characterId} = useParams();

	const { isLoading, data } = useQuery({
		queryKey: ["charDetail", characterId],
		queryFn: () => fetchDetail(characterId),
	});

	return (
	<>	
		{
			isLoading ? <div>loading...</div> : 
			
			<div>
				<Link to='/'>뒤로</Link>
				<div>
					<img src={data.imageUrl} alt={data.name} />
				</div>
				<strong>{data.name}</strong>
				<div>
					{data.name}'s Films
					<ul>
						{data.films.map((f)=><li key={f}>{f}</li>)}
					</ul>
				</div>
			</div>
		}
		
	</>
	)
}
