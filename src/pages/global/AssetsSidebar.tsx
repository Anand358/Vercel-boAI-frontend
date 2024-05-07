import Assets from "@/components/AssetPage/Assets";
import TemplateWithoutSummary from "@/components/TemplateWithoutSummary";

const AssetsSidebar = () => {
  return (
    <div>
      <TemplateWithoutSummary>
        <Assets />
      </TemplateWithoutSummary>
    </div>
  );
};

export default AssetsSidebar;
