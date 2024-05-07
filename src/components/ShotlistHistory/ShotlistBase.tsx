import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShotlistBase = () => {
	const [screenplays, setScreenplays] = useState([]);
	const navigate = useNavigate();

	const redirect = (screenplayId) => {
		navigate(`/shotlist/${screenplayId}`);
	};

	useEffect(() => {
		async function fetchScreenplays() {
			const baseUrl = import.meta.env.VITE_BASE_URL;
			const workspaceId = import.meta.env.VITE_WORKSPACEID;
			const url = `${baseUrl}/workspaces/${workspaceId}/screenplays`;

			try {
				const response = await fetch(url);
				if (!response.ok) throw new Error("Network response was not ok");
				const data = await response.json();
				const screenplaysArray = Object.keys(data).map((key) => ({
					id: data[key].id,
					savedAt: new Date(data[key].saved_at).toLocaleString(),
				}));
				setScreenplays(screenplaysArray);
			} catch (error) {
				console.error("Failed to fetch screenplays:", error);
			}
		}

		fetchScreenplays();
	}, []);

	return (
		<div className="mx-20 mt-10">
			<h1 className="text-3xl">Shotlist History</h1>
			<Table className="mt-8">
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Saved At</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{screenplays.map((screenplay) => (
						<TableRow key={screenplay.id}>
							<TableCell className="font-medium">{screenplay.id}</TableCell>
							<TableCell>{screenplay.savedAt}</TableCell>
							<TableCell className="text-right">
								<button
									className="bg-[#ff6000] px-5 py-3 rounded-xl"
									onClick={() => redirect(screenplay.id)}
								>
									Edit
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default ShotlistBase;
