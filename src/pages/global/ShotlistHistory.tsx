import ShotlistBase from "@/components/ShotlistHistory/ShotlistBase";
import TemplateWithSummary from "@/components/TemplateWithSummary";
import TemplateWithoutSummary from "@/components/TemplateWithoutSummary";

const ShotlistHistory = () => {
	return (
		<div>
			<TemplateWithoutSummary>
				<ShotlistBase />
			</TemplateWithoutSummary>
		</div>
	);
};

export default ShotlistHistory;
