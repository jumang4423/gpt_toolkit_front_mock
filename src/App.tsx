import { Typography, Box, Divider, Tabs, Tab } from "@mui/material";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import Store from "./apps/Store";
import Mine from "./apps/Mine";
import NewCommand from "./apps/NewCommand";
import { OpenAIKeyAtom } from "./lsState/mine";
import { useAtom } from "jotai";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tabN, setTabN] = useState(0);
  const [openAIKey, setOpenAIKey] = useAtom(OpenAIKeyAtom);
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", m: 4 }}>
      <Typography variant="h4">💫 GPT Toolkit Customizer</Typography>
      <FormControl sx={{ m: 2, width: "50%" }}>
        <InputLabel htmlFor="component-simple">OpenAI API Key</InputLabel>
        <Input id="component-simple" type="password" value={openAIKey} onChange={(e) => setOpenAIKey(e.target.value)} />
      </FormControl>
      <Divider />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabN} onChange={(_: any, v: number) => setTabN(v)}>
          <Tab label="Store" {...a11yProps(0)} />
          <Tab label="Mine" {...a11yProps(1)} />
          <Tab label="New Command" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabN} index={0}>
        <Store />
      </TabPanel>
      <TabPanel value={tabN} index={1}>
        <Mine />
      </TabPanel>
      <TabPanel value={tabN} index={2}>
        <NewCommand />
      </TabPanel>
    </Box>
  );
}
export default App;
