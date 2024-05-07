import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ISubCampaign, ISubCampaignsComponentsProp } from "../../type";
import SubCampaignComponent from "./private/components/sub-campaign-information";

const SubCampaignsComponent = ({
    listSubCampaigns,
    setListSubCampaigns,
    handleAddSubCampaign,
    setIndexSubCampaignSelected,
    indexSubCampaignSelected,
}: ISubCampaignsComponentsProp) => {
    const handleSelectSubCampaign = (indexSelect: number) => {
        setIndexSubCampaignSelected(indexSelect);
    };

    const handleUpdateListSubCampaigns = (itemUpdated: ISubCampaign) => {
        const listSubCampaignsUpdated = (listSubCampaigns ?? []).map((item, index) => {
            if (index === Number(indexSubCampaignSelected)) {
                return itemUpdated;
            }
            return item;
        });
        setListSubCampaigns(listSubCampaignsUpdated);
    };

    const subCampaignSelected = (listSubCampaigns ?? []).find(
        (item, index) => index === indexSubCampaignSelected
    );
    return (
        <Box>
            {/* List sub campaign cards */}
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <IconButton onClick={handleAddSubCampaign}>
                    <AddCircleIcon fontSize="large" />
                </IconButton>
                <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                        overflow: "auto",
                        paddingY: "5px",
                    }}
                >
                    {(listSubCampaigns ?? []).map((item, index) => {
                        const isSelected = Number(index) === Number(indexSubCampaignSelected);
                        const totalAds = (item?.ads ?? []).reduce((total, item) => {
                            return total + Number(item.quantity ?? 0);
                        }, 0);
                        return (
                            <Box>
                                <Card
                                    key={`${item.name} - ${index}`}
                                    variant="outlined"
                                    sx={{
                                        width: 210,
                                        height: 180,
                                        minWidth: 180,
                                        border: `${
                                            isSelected ? "1px solid blue" : "1px solid grey"
                                        }`,
                                        boxShadow: "0 4px 13px -5px grey",
                                        overflow: "auto",
                                    }}
                                    onClick={() => handleSelectSubCampaign(index)}
                                >
                                    <CardActionArea sx={{ width: "100%", height: "100%" }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.name}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    gap: "10px",
                                                }}
                                            >
                                                <Typography variant="body1" color="text.secondary">
                                                    Status:
                                                </Typography>
                                                <CheckCircleIcon
                                                    fontSize="small"
                                                    color={`${
                                                        item.status ? "success" : "disabled"
                                                    }`}
                                                />
                                            </Box>
                                            <Typography variant="body1" color="text.secondary">
                                                Total ads: {totalAds}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            {/* Sub-campaign detail cards */}
            <SubCampaignComponent
                handleUpdateListSubCampaigns={handleUpdateListSubCampaigns}
                subCampaignSelected={subCampaignSelected}
            />
        </Box>
    );
};

export default SubCampaignsComponent;
