import { GPTCommand, InputEnum } from "../model/command";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// jotai states
import { OpenAIKeyAtom } from "../lsState/mine";
import { useAtom } from "jotai";
import { Configuration, OpenAIApi } from "openai";
type RunnerModalType = {
  command: GPTCommand | null;
  setCommand: (command: GPTCommand | null) => void;
};

type UserInputType = Array<{ id: string; str: string }>;

const ru_fun = {
  runCommand: async (
    command: GPTCommand,
    userInputs: UserInputType,
    openAIKey: string,
    setIsLoading: any,
    setResponse: any
  ): Promise<void> => {
    // validate input
    console.log(userInputs);
    userInputs.forEach((input) => {
      if (input.str.length === 0) {
        const inputDescription = command.formArr.find((input2) => input2.id === input.id)?.description;
        throw new Error(`Input ${inputDescription} is empty`);
      }
    });
    setIsLoading(true);
    const prompt = command.formArr
      .map((form) => {
        if (form.inputType === InputEnum.NoSideEffect) {
          return form.description;
        }
        if (form.inputType === InputEnum.UserInput) {
          return `"${userInputs.find((input) => input.id === form.id)?.str}"`;
        }
        if (form.inputType === InputEnum.Select) {
          return `"${userInputs.find((input) => input.id === form.id)?.str}"`;
        }
        return "";
      })
      .join(" ");
    console.log(prompt);
    const configuration = new Configuration({
      apiKey: openAIKey,
    });
    const openAIApi = new OpenAIApi(configuration);
    const response = await openAIApi.createCompletion({
      prompt: prompt,
      max_tokens: 512,
      temperature: 0.9,
      model: "text-davinci-003",
    });
    setResponse(response.data.choices[0].text!);
    setIsLoading(false);
    return void 0;
  },
};

const RunnerModal = ({ command, setCommand }: RunnerModalType) => {
  const [openAIKey] = useAtom(OpenAIKeyAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [userInputs, setUserInputs] = useState<UserInputType>([]);
  const [Response, setResponse] = useState<string>("");

  useEffect(() => {
    if (command) {
      setUserInputs(
        command.formArr
          .filter((form) => form.inputType === InputEnum.UserInput || form.inputType === InputEnum.Select)
          .map((form) => {
            const str = form.inputType === InputEnum.UserInput ? "" : form ? form.selectOptions?.[0] : "";
            return { id: form.id, str: "" };
          })
      );
    } else {
      setUserInputs([]);
    }
    setResponse("");
    setIsLoading(false);
  }, [command]);

  if (!command) {
    return null;
  }

  return (
    <Modal open={command !== null} onClose={() => setCommand(null)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {command?.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {command?.description}
        </Typography>

        <Box>
          {userInputs.map((input) => {
            const id = input.id;
            const formIndex = command?.formArr.findIndex((form) => form.id === id);
            const form = command?.formArr[formIndex!]!;
            if (form.inputType === InputEnum.UserInput) {
              return (
                <FormControl fullWidth key={id} sx={{ mb: 2 }}>
                  <InputLabel htmlFor="component-simple">{form.description}</InputLabel>
                  <Input
                    id="component-simple"
                    value={input.str}
                    onChange={(e) => {
                      setUserInputs((prev) => {
                        return prev.map((input) => {
                          if (input.id === id) {
                            return { ...input, str: e.target.value };
                          }
                          return input;
                        });
                      });
                    }}
                  />
                </FormControl>
              );
            }
            if (form.inputType === InputEnum.Select) {
              return (
                <FormControl fullWidth key={id} sx={{ mb: 2 }}>
                  <InputLabel htmlFor="component-simple">{form.description}</InputLabel>
                  <Select
                    native
                    sx={{ mt: 3 }}
                    value={input.str}
                    onChange={(e) => {
                      setUserInputs((prev) => {
                        return prev.map((input) => {
                          if (input.id === id) {
                            console.log(e.target.value);
                            return { ...input, str: e.target.value };
                          } else return input;
                        });
                      });
                    }}
                  >
                    <option aria-label="None" value="" />

                    {form.selectOptions?.map((option) => {
                      return (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }

            return <>unexpected</>;
          })}
        </Box>

        <Button
          sx={{ mr: 2 }}
          variant="contained"
          onClick={() => {
            ru_fun.runCommand(command!, userInputs, openAIKey, setIsLoading, setResponse);
          }}
        >
          {isLoading ? "Loading..." : "Run"}
        </Button>
        <Button variant="contained" onClick={() => setCommand(null)}>
          Close
        </Button>

        <Typography variant="h4" gutterBottom>
          {Response}
        </Typography>
      </Box>
    </Modal>
  );
};

export default RunnerModal;
