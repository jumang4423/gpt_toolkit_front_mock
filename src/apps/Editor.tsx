import { GPTCommand, InputEnum } from "../model/command";
import { Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import { GenRandomId } from "../util/genRandomId";
import { NoSideEffect, UserInput, UserSelect } from "./ResolveForm";

type FormTypeResolverProps = {
  command: GPTCommand;
  setCommand: (command: GPTCommand) => void;
  index: number;
};

const FormTypeResolver = ({ command, setCommand, index }: FormTypeResolverProps) => {
  const form = command.formArr[index];
  return (
    <Box>
      <Divider />
      {form.inputType === InputEnum.NoSideEffect && (
        <NoSideEffect command={command} setCommand={setCommand} index={index} />
      )}
      {form.inputType === InputEnum.UserInput && <UserInput command={command} setCommand={setCommand} index={index} />}
      {form.inputType === InputEnum.Select && <UserSelect command={command} setCommand={setCommand} index={index} />}
    </Box>
  );
};

type FormProps = {
  command: GPTCommand;
  setCommand: (command: GPTCommand) => void;
  index: number;
};

const fo_fun = {};

const Form = ({ command, setCommand, index }: FormProps) => {
  const form = command.formArr[index];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid green", padding: "10px", mb: 2 }}>
      <Typography>id: {form.id}</Typography>
      <Divider sx={{ m: 1 }} />
      /* gpt3 command type */
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="form-type">Form Type</InputLabel>
        <Select
          labelId="form-type"
          value={form.inputType}
          label="Form Type"
          onChange={(e) =>
            setCommand({
              ...command,
              formArr: command.formArr.map((f, i) =>
                i === index ? { ...f, inputType: e.target.value as InputEnum } : f
              ),
            })
          }
        >
          <MenuItem value={InputEnum.NoSideEffect}>{InputEnum.NoSideEffect}</MenuItem>
          <MenuItem value={InputEnum.UserInput}>{InputEnum.UserInput}</MenuItem>
          <MenuItem value={InputEnum.Select}>{InputEnum.Select}</MenuItem>
        </Select>
      </FormControl>
      <FormTypeResolver command={command} setCommand={setCommand} index={index} />
      <Button
        color="error"
        onClick={() => setCommand({ ...command, formArr: command.formArr.filter((_, i) => i !== index) })}
      >
        Delete This Form
      </Button>
      <Button
        onClick={() =>
          setCommand({
            ...command,
            formArr: [
              ...command.formArr.slice(0, index + 1),
              {
                id: GenRandomId(64),
                inputType: InputEnum.NoSideEffect,
                description: "",
              },
              ...command.formArr.slice(index + 1),
            ],
          })
        }
      >
        Add This Bottom
      </Button>
    </Box>
  );
};

type EditorProps = {
  command: GPTCommand;
  setCommand: (command: GPTCommand) => void;
};

const ed_fun = {
  addNewFormBottom: (command: GPTCommand, setCommand: (command: GPTCommand) => void) => {
    setCommand({
      ...command,
      formArr: [...command.formArr, { id: GenRandomId(32), description: "", inputType: InputEnum.NoSideEffect }],
    });
  },
};

const Editor = ({ command, setCommand }: EditorProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "900px", padding: "1rem", border: "1px solid #ccc" }}>
      <Typography variant="h5">Command Editor</Typography>
      {command.formArr.map((form, index) => {
        return <Form command={command} setCommand={setCommand} index={index} />;
      })}
      {command.formArr.length === 0 && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => ed_fun.addNewFormBottom(command, setCommand)}
          sx={{ m: 3 }}
        >
          + add a new form bottom here
        </Button>
      )}
    </Box>
  );
};

export default Editor;
