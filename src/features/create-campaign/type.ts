import { SetStateAction } from "react";

export interface ICampaignInformation {
    name: string;
    describe?: string;
}

export interface ICampaignInformationForm extends ICampaignInformation {
    isErrorName?: boolean;
}
export interface IAdvertisement {
    name: string;
    quantity: number;
}

export interface IAdvertisementForm {
    name?: string;
    quantity?: number | string;
    isSelected?: boolean;
    isErrorName?: boolean;
    isErrorQuantity?: boolean;
}

export interface ISubCampaign {
    name: string;
    isErrorName?: boolean;
    status: boolean;
    ads: IAdvertisementForm[];
}
export interface ISubCampaignForm extends ISubCampaign {
    isErrorName?: boolean;
}

export interface ICampaignInformationComponentProps {
    campaignInformationForm: ICampaignInformationForm;
    setCampaignInformationForm: React.Dispatch<SetStateAction<ICampaignInformationForm>>;
}

export interface ISubCampaignsComponentsProp {
    listSubCampaigns?: ISubCampaign[];
    setListSubCampaigns: React.Dispatch<SetStateAction<ISubCampaign[]>>;
    handleAddSubCampaign: any;
    indexSubCampaignSelected?: number;
    setIndexSubCampaignSelected: React.Dispatch<SetStateAction<number>>;
}

export interface ISubCampaignComponentProp {
    subCampaignSelected?: ISubCampaign;
    handleUpdateListSubCampaigns: any;
}

export interface ICreateCampaign {
    information: ICampaignInformation;
    subCampaigns: ISubCampaign[];
}
