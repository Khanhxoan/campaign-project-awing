import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import {
    CREATE_CAMPAIGN_TAB_INDEX,
    CREATE_CAMPAIGN_TAB_NAME,
    defaultCampaignInformation,
    defaultCampaignItem,
} from "../../constants/create-campaign/create-campaign";

import CampaignInformation from "./components/campaign-information";
import SubCampaigns from "./components/sub-campaigns";
import {
    type IAdvertisement,
    type IAdvertisementForm,
    type ICampaignInformation,
    type ICampaignInformationForm,
    type ICreateCampaign,
    type ISubCampaign,
    type ISubCampaignForm,
} from "./type";

const CreateCampaign = () => {
    const [tabSelected, setTabSelected] = useState<number>(
        CREATE_CAMPAIGN_TAB_INDEX.CAMPAIGN_INFORMATION
    );
    const [indexSubCampaignSelected, setIndexSubCampaignSelected] = useState<number>(0);
    const [campaignInformationForm, setCampaignInformationForm] =
        useState<ICampaignInformationForm>(defaultCampaignInformation);
    const [listSubCampaigns, setListSubCampaigns] = useState<ISubCampaignForm[]>([
        { ...defaultCampaignItem },
    ]);

    const handleChangeTab = (tabIndex: number) => {
        setTabSelected(tabIndex);
    };

    const handleAddSubCampaign = () => {
        const newCampaignItem = {
            name: `Sub campaign ${listSubCampaigns.length + 1}`,
            status: true,
            ads: [
                {
                    name: "Advertisement 1",
                    quantity: 0,
                },
            ],
        };
        const newListCampaigns = [...listSubCampaigns, newCampaignItem];
        setListSubCampaigns(newListCampaigns);
        setIndexSubCampaignSelected(newListCampaigns.length - 1);
    };

    const handleSubmit = () => {
        let isErrorAll: boolean = false;

        // Check Validate
        if (!campaignInformationForm.name) {
            isErrorAll = true;
            setCampaignInformationForm({ ...campaignInformationForm, isErrorName: true });
        }
        if (!(listSubCampaigns.length > 0)) {
            isErrorAll = true;
        }

        const newListSubCampaignsForm = listSubCampaigns.map((itemSubCampaignForm) => {
            let newSubCampaignForm: ISubCampaignForm = { ...itemSubCampaignForm };
            if (!itemSubCampaignForm.name) {
                isErrorAll = true;
                newSubCampaignForm.isErrorName = true;
            }
            const newListAdsForm = newSubCampaignForm.ads.map((itemAdsForm) => {
                let newItemAdsForm: IAdvertisementForm = { ...itemAdsForm };
                if (!itemAdsForm.name) {
                    isErrorAll = true;
                    newItemAdsForm.isErrorName = true;
                }
                if (!itemAdsForm.quantity || Number(itemAdsForm.quantity) <= 0) {
                    isErrorAll = true;
                    newItemAdsForm.isErrorQuantity = true;
                }
                return newItemAdsForm;
            });
            if (!(newListAdsForm.length > 0)) {
                isErrorAll = true;
            }
            newSubCampaignForm.ads = newListAdsForm;
            return newSubCampaignForm;
        });
        setListSubCampaigns(newListSubCampaignsForm);

        if (isErrorAll) {
            alert("Please fill in correct and complete information!");
        }
        if (!isErrorAll) {
            const mainCampaignInformationPayload: ICampaignInformation = {
                name: campaignInformationForm.name,
                describe: campaignInformationForm.describe,
            };
            const listSubCampaignsPayload: ISubCampaign[] = listSubCampaigns.map(
                (itemSubCampaignForm) => {
                    const listAdsPayload: IAdvertisement[] = (itemSubCampaignForm.ads ?? []).map(
                        (item) => {
                            const adsItemPayload: IAdvertisement = {
                                name: item?.name ?? "",
                                quantity: !!item?.quantity ? Number(item?.quantity) : 0,
                            };
                            return adsItemPayload;
                        }
                    );
                    const subCampaignItemPayload: ISubCampaign = {
                        name: itemSubCampaignForm.name,
                        status: itemSubCampaignForm.status,
                        ads: listAdsPayload,
                    };
                    return subCampaignItemPayload;
                }
            );
            const payloadCreateCampaign: ICreateCampaign = {
                information: mainCampaignInformationPayload,
                subCampaigns: listSubCampaignsPayload,
            };
            alert(JSON.stringify(payloadCreateCampaign));
        }
    };

    return (
        <Box sx={{ marginTop: "30px", padding: "20px", paddingTop: 0 }}>
            <Typography variant="h3">Create new campaign</Typography>
            <Box sx={{ padding: "20px", borderBottom: "2px solid grey" }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                }}
            >
                <Tabs
                    value={tabSelected}
                    onChange={(event, value) => {
                        handleChangeTab(Number(value));
                    }}
                    centered
                >
                    <Tab
                        label={CREATE_CAMPAIGN_TAB_NAME.CAMPAIGN_INFORMATION}
                        value={CREATE_CAMPAIGN_TAB_INDEX.CAMPAIGN_INFORMATION}
                    />
                    <Tab
                        label={CREATE_CAMPAIGN_TAB_NAME.SUB_CAMPAIGN}
                        value={CREATE_CAMPAIGN_TAB_INDEX.SUB_CAMPAIGN}
                    />
                </Tabs>
            </Box>
            <Box
                sx={{
                    padding: "20px",
                    boxShadow: "0 4px 13px -3px grey",
                    marginTop: "30px",
                    borderRadius: "10px",
                }}
            >
                {tabSelected === CREATE_CAMPAIGN_TAB_INDEX.CAMPAIGN_INFORMATION && (
                    <CampaignInformation
                        campaignInformationForm={campaignInformationForm}
                        setCampaignInformationForm={setCampaignInformationForm}
                    />
                )}
                {tabSelected === CREATE_CAMPAIGN_TAB_INDEX.SUB_CAMPAIGN && (
                    <SubCampaigns
                        listSubCampaigns={listSubCampaigns}
                        setListSubCampaigns={setListSubCampaigns}
                        handleAddSubCampaign={handleAddSubCampaign}
                        indexSubCampaignSelected={indexSubCampaignSelected}
                        setIndexSubCampaignSelected={setIndexSubCampaignSelected}
                    />
                )}
            </Box>
        </Box>
    );
};

export default CreateCampaign;
