import React from "react";

interface Ipros {
	text: string;
}

export const Button = ({ text }: Ipros) => {
	return (
		<button className="bg-black text-green-300 font-bold px-4 py-2 m-2 rounded-lg">
			{text}
		</button>
	);
};
