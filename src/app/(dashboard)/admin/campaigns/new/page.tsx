import NewCampaignWizard from "@/features/campaign-wizard/NewCampaignWizard";

/**
 * trinQ işletme paneli — çok adımlı kampanya sihirbazı.
 * Route: /admin/campaigns/new (route group (dashboard) URL’yi değiştirmez)
 */
export default function NewCampaignPage() {
  return <NewCampaignWizard />;
}
