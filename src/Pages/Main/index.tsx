import React, { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { Item } from "../../Components/Item";
import { Modal } from "../../Components/Modal";
import defaultData from "../../data/data.json";
import { item } from "../../data/type";
import { Close } from "../../icon/icons";

const Main = () => {
	const [data, setData] = useState<item[]>();
	const [itemClick, isItemClick] = useState(false);
	const [addClick, isAddClick] = useState(false);
	const [options, setOptions] = useState<string[]>();

	const [clickItemData, setClickItemData] = useState<item>();

	const onClick = (index: number) => {
		isItemClick(true);
		if (data) setClickItemData(data[index]);
	};

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === "모두") setData(defaultData);
		else setData(defaultData.filter((ele) => ele.tag === e.target.value));
	};

	const itemonChange = (changeValue: item) => {
		setData(
			defaultData.map((ele) => {
				if (ele.id === changeValue.id) {
					return changeValue;
				}
				return ele;
			})
		);
	};

	useEffect(() => {
		setData(defaultData);
		let filter = defaultData.map((ele) => ele.tag);

		setOptions(Array.from(new Set(["모두", ...filter])));
	}, []);

	return (
		<div className="p-4 h-full w-full   flex flex-col">
			{addClick ? <Modal value={addClick} onClick={isAddClick} /> : null}
			{itemClick ? (
				<Modal value={itemClick} onClick={isItemClick}>
					{clickItemData && (
						<Item item={clickItemData} onChange={itemonChange} />
					)}
				</Modal>
			) : null}
			<div className="w-full flex justify-center">
				<div className="font-bold text-2xl">Enough Salad</div>
			</div>
			<div className=" w-full grid grid-cols-2">
				<div className="">
					<select
						className="hover:cursor-pointer outline-none rounded-lg font-bold px-4 py-2 m-2 bg-black text-green-300"
						onChange={onChange}
					>
						{options?.map((ele, index) => (
							<option key={index}>{ele}</option>
						))}
					</select>
				</div>
				<div className="flex justify-end">
					<Button text="추가" />
				</div>
			</div>
			<div className="h-full overflow-y-auto  w-full">
				<table className="w-full   ">
					<thead className=" sticky top-0">
						<tr className="bg-green-300 font-bold text-lg h-12 ">
							<th>태그</th>
							<th>목록</th>
							<th>수량</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{data &&
							data.map((ele, index) => (
								<tr
									key={index}
									onClick={() => onClick(index)}
									className=" h-12 hover:bg-slate-100 hover:cursor-pointer border-b-2"
								>
									<td>{ele.tag}</td>
									<td>{ele.name}</td>
									<td>
										{ele.cur_amount}
										{ele.unit}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Main;
