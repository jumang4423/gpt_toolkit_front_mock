import { GPTCommand, InitGPTCommand, InputEnum } from "../model/command";
import Editor from "./Editor";
import { MineUserIdAtom, MineGPTCommandsListAtom } from "../lsState/mine";
import { StoreGPTCommandsListAtom } from "../lsState/store";
import { useAtom } from "jotai";
import { useState } from "react";
import { Button, Typography, Box, FormControl, Input, InputLabel } from "@mui/material";

type MetaFormProps = {
  command: GPTCommand;
  setCommand: (command: GPTCommand) => void;
};

const MetaForm = ({ command, setCommand }: MetaFormProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid #ccc", width: "600px", padding: "1rem" }}>
      <Typography variant="h5">Meta</Typography>
      <FormControl sx={{ mb: 3 }}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          sx={{ width: 300 }}
          value={command.name}
          onChange={(e) => setCommand({ ...command, name: e.target.value })}
        />
      </FormControl>
      <FormControl sx={{ mb: 3 }}>
        <InputLabel htmlFor="desc">Description</InputLabel>
        <Input
          id="desc"
          sx={{ width: 500 }}
          value={command.description}
          onChange={(e) => setCommand({ ...command, description: e.target.value })}
        />
      </FormControl>
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="checkbox"
          checked={command.isPublic}
          onChange={(e) => setCommand({ ...command, isPublic: e.target.checked })}
        />
        <label style={{ marginLeft: "0.5rem" }}>Public</label>
      </div>
    </Box>
  );
};

type PreviewerProps = {
  command: GPTCommand;
  setCommand: (command: GPTCommand) => void;
};

const Previewer = (props: PreviewerProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid #ccc", width: "600px", padding: "1rem" }}>
      <Typography variant="h5">Preview</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {props.command.formArr
          .map((form, i) => {
            if (form.inputType === InputEnum.NoSideEffect) {
              return form.description;
            }
            if (form.inputType === InputEnum.UserInput) {
              return "<" + (form.example ?? "!! no example") + ">";
            }

            return "<" + (form.selectOptions ? form.selectOptions.join(", ") : "!! no selection") + ">";
          })
          .join(" ")}
      </Box>
    </Box>
  );
};

const ne_fun = {
  validateCommand: (command: GPTCommand) => {
    if (command.name === "") {
      return "Name is required";
    }
    if (command.description === "") {
      return "Description is required";
    }
    if (command.formArr.length === 0) {
      return "Command is empty";
    }
    return null;
  },
};

const NewCommand = () => {
  const [mineUserId] = useAtom(MineUserIdAtom);
  const [command, setCommand] = useState<GPTCommand>(InitGPTCommand(mineUserId));
  const [, setMine] = useAtom<Array<GPTCommand>>(MineGPTCommandsListAtom);
  const [, setStore] = useAtom<Array<GPTCommand>>(StoreGPTCommandsListAtom);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
        <Button color="primary" variant="contained" sx={{ mr: 2 }}>
          Run
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            const validate_str = ne_fun.validateCommand(command);
            if (validate_str) {
              alert(validate_str);
              return;
            }
            // @ts-ignore
            setMine((ar) => {
              const new_ar = [...ar];
              new_ar.push(command);
              return new_ar;
            });
            if (command.isPublic) {
              // @ts-ignore
              setStore((ar) => {
                const new_ar = [...ar];
                new_ar.push(command);
                return new_ar;
              });
            }
            setCommand(InitGPTCommand(mineUserId));
          }}
        >
          Save
        </Button>
      </Box>
      <MetaForm command={command} setCommand={setCommand} />
      <Editor command={command} setCommand={setCommand} />
      <Previewer command={command} setCommand={setCommand} />
    </Box>
  );
};

export default NewCommand;
