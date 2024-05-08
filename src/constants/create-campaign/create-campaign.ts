export enum CREATE_CAMPAIGN_TAB_INDEX {
    CAMPAIGN_INFORMATION = 0,
    SUB_CAMPAIGN = 1,
}

export enum CREATE_CAMPAIGN_TAB_NAME {
    CAMPAIGN_INFORMATION = "Campaign Information",
    SUB_CAMPAIGN = "Sub Campaign",
}

export const TABS_INFORMATION = [
    { tabName: "Campaign Information", tabIndex: 1 },
    { tabName: "Sub Campaign", tabIndex: 2 },
];

export const defaultCampaignItem = {
    name: "Sub campaign 1",
    status: true,
    ads: [
        {
            name: "Advertisement 1",
            quantity: 0,
        },
    ],
};

export const defaultCampaignInformation = { name: "", describe: "", isErrorName: false };
