import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Textarea,
} from "@material-tailwind/react";

export function DialogCustomAnimation({
	open,
	handleOpen,
	handleConfirm,
	feedback,
	setFeedback,
}: {
	open: boolean;
	handleOpen: () => void;
	handleConfirm: () => void;
	feedback: string;
	setFeedback: (value: string) => void;
}) {
	return (
		<>
			<Dialog
				open={open}
				handler={handleOpen}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
				placeholder={undefined}
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
				className="bg-[#242424] text-white"
			>
				<DialogHeader
					placeholder={undefined}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					className="text-white"
				>
					Feedback for refining options
				</DialogHeader>
				<DialogBody
					placeholder={undefined}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
					className="text-white border-white"
				>
					<Textarea
						label="Feedback"
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
						value={feedback}
						onChange={(e) => setFeedback(e.target.value)}
						className="text-white border-white"
						color="orange"
					/>
				</DialogBody>
				<DialogFooter
					placeholder={undefined}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
				>
					<Button
						variant="text"
						color="white"
						onClick={handleOpen}
						className="mr-1"
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					>
						<span>Cancel</span>
					</Button>
					<Button
						variant="gradient"
						color="orange"
						onClick={handleConfirm}
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
}
