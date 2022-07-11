import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { QRCodeForm } from "../../components";

export default function ManageCode() {
    const breadcrumbs = [{ content: "NFT campaign", url: "/" }];

    return (
        <Page>
            <TitleBar
                title="Create new NFT campaign"
                breadcrumbs={breadcrumbs}
                primaryAction={null}
            />
            <QRCodeForm />
        </Page>
    );
}
