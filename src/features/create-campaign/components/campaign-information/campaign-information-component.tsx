import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { ICampaignInformationComponentProps } from "../../type";

const CampaignInformationComponent = ({
    campaignInformationForm,
    setCampaignInformationForm,
}: ICampaignInformationComponentProps) => {
    return (
        <FormControl sx={{ width: "100%" }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
                <TextField
                    variant="standard"
                    value={campaignInformationForm.name ?? ""}
                    label="Name"
                    onChange={(event) => {
                        const value = event.target.value;
                        const campaignInformationUpdated = {
                            ...campaignInformationForm,
                            name: value,
                        };
                        if (!!value) campaignInformationUpdated.isErrorName = false;
                        setCampaignInformationForm(campaignInformationUpdated);
                    }}
                    required
                    error={!!campaignInformationForm?.isErrorName}
                />
                {!!campaignInformationForm?.isErrorName && (
                    <FormHelperText id="my-helper-text" sx={{ margin: 0 }} error>
                        Missing required field.
                    </FormHelperText>
                )}
                <TextField
                    variant="standard"
                    value={campaignInformationForm.describe ?? ""}
                    label="Description"
                    onChange={(event) => {
                        const value = event.target.value;
                        setCampaignInformationForm({ ...campaignInformationForm, describe: value });
                    }}
                />
            </Box>
        </FormControl>
    );
};

export default CampaignInformationComponent;
