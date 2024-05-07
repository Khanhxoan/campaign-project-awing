import { Add, Delete } from "@mui/icons-material";
import {
    Button,
    FormHelperText,
    IconButton,
    Input,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IAdvertisementForm, ISubCampaignComponentProp } from "../../../../type";
import { useState } from "react";

const SubCampaignComponent = ({
    subCampaignSelected,
    handleUpdateListSubCampaigns,
}: ISubCampaignComponentProp) => {
    // const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
    const isHaveItemSelected =
        (subCampaignSelected?.ads ?? []).filter((item) => !!item.isSelected).length > 0;
    const isSelectedAll =
        (subCampaignSelected?.ads ?? []).filter((item) => !!item.isSelected).length ===
        (subCampaignSelected?.ads ?? []).length;

    const handleAddNewAds = () => {
        const newAds = {
            name: `Advertisement ${(subCampaignSelected?.ads ?? []).length + 1}`,
            quantity: 0,
        };
        const subCampaignSelectedUpdated = {
            ...subCampaignSelected,
            ads: [...(subCampaignSelected?.ads ?? []), newAds],
        };
        handleUpdateListSubCampaigns(subCampaignSelectedUpdated);
    };

    const handleDeleteAds = (indexDeleted: number) => {
        const listAdsUpdated = (subCampaignSelected?.ads ?? []).filter(
            (_item, index) => index !== indexDeleted
        );
        const subCampaignSelectedUpdated = { ...subCampaignSelected, ads: listAdsUpdated };
        handleUpdateListSubCampaigns(subCampaignSelectedUpdated);
    };
    const handleUpdateAds = (adsUpdated: IAdvertisementForm, indexUpdated: number) => {
        const listAdsUpdated = (subCampaignSelected?.ads ?? []).map((item, index) => {
            if (index === indexUpdated) return adsUpdated;
            return item;
        });
        const subCampaignSelectedUpdated = { ...subCampaignSelected, ads: listAdsUpdated };
        handleUpdateListSubCampaigns(subCampaignSelectedUpdated);
    };

    const handleSelectedAll = (checked: boolean) => {
        let listAdsUpdated: IAdvertisementForm[];
        if (isHaveItemSelected) {
            listAdsUpdated = (subCampaignSelected?.ads ?? []).map((item, index) => {
                return { ...item, isSelected: false };
            });
        } else {
            if (checked) {
                listAdsUpdated = (subCampaignSelected?.ads ?? []).map((item, index) => {
                    return { ...item, isSelected: true };
                });
            } else {
                listAdsUpdated = (subCampaignSelected?.ads ?? []).map((item, index) => {
                    return { ...item, isSelected: false };
                });
            }
        }
        handleUpdateListSubCampaigns({ ...subCampaignSelected, ads: listAdsUpdated });
    };

    return (
        <Box marginTop={"20px"}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <TextField
                        variant="standard"
                        value={subCampaignSelected?.name ?? ""}
                        error={subCampaignSelected?.isErrorName}
                        label="Name"
                        onChange={(event) => {
                            const value = event.target.value;
                            const itemUpdated = { ...subCampaignSelected, name: value };
                            if (!!value) {
                                itemUpdated.isErrorName = false;
                            }
                            handleUpdateListSubCampaigns(itemUpdated);
                        }}
                        required
                        fullWidth
                    />
                    {subCampaignSelected?.isErrorName && (
                        <FormHelperText id="my-helper-text" sx={{ margin: 0 }} error={true}>
                            Missing required field.
                        </FormHelperText>
                    )}
                </Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={subCampaignSelected?.status}
                            onChange={(event, checked) => {
                                const itemUpdated = { ...subCampaignSelected, status: checked };
                                handleUpdateListSubCampaigns(itemUpdated);
                            }}
                        />
                    }
                    label="Active"
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20",
                    alignItems: "start",
                    marginTop: "20px",
                }}
            >
                <Typography variant="h5" color="text.secondary">
                    List advertisements
                </Typography>
                <Box sx={{ width: "100%" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        checked={isSelectedAll}
                                        indeterminate={isHaveItemSelected && !isSelectedAll}
                                        onChange={(event, checked) => {
                                            handleSelectedAll(checked);
                                        }}
                                        color={`${
                                            isHaveItemSelected && !isSelectedAll
                                                ? "warning"
                                                : "primary"
                                        }`}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        Name <span style={{ color: "red" }}>*</span>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        Quantity <span style={{ color: "red" }}>*</span>
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" onClick={handleAddNewAds}>
                                        <Add /> Add new
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(subCampaignSelected?.ads ?? []).map((item, index) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <Checkbox
                                                checked={!!item?.isSelected}
                                                onChange={(event, checked) => {
                                                    const adsUpdated = {
                                                        ...item,
                                                        isSelected: checked,
                                                    };
                                                    handleUpdateAds(adsUpdated, index);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={item.name}
                                                variant="standard"
                                                fullWidth
                                                onChange={(event) => {
                                                    const value = event.target.value ?? "";
                                                    const adsUpdated = { ...item, name: value };
                                                    if (!!value) {
                                                        adsUpdated.isErrorName = false;
                                                    }
                                                    handleUpdateAds(adsUpdated, index);
                                                }}
                                                error={item?.isErrorName}
                                                placeholder="Enter"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="number"
                                                value={item.quantity}
                                                variant="standard"
                                                error={item?.isErrorQuantity}
                                                InputProps={{ inputProps: { min: 0 } }}
                                                placeholder="Enter"
                                                fullWidth
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    if (Number(value) < 0) {
                                                        return;
                                                    }
                                                    const adsUpdated = {
                                                        ...item,
                                                        quantity: value,
                                                    };
                                                    if (Number(value) > 0 && !!value) {
                                                        adsUpdated.isErrorQuantity = false;
                                                    }
                                                    handleUpdateAds(adsUpdated, index);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleDeleteAds(index)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </Box>
    );
};

export default SubCampaignComponent;
