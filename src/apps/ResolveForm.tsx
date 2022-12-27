import { GPTCommand, InputEnum } from "../model/command";
import { MineUserIdAtom } from "../lsState/mine";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  FormControl,
  Input,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  Divider,
} from "@mui/material";
type formProps = { command: GPTCommand; setCommand: (command: GPTCommand) => void; index: number };

export const NoSideEffect = (props: formProps) => {
  const form = props.command.formArr[props.index];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormControl fullWidth>
        <InputLabel id={`input_${form.id}`}>GPT Command</InputLabel>
        <Input
          multiline
          value={form.description}
          onChange={(e) => {
            props.setCommand({
              ...props.command,
              formArr: props.command.formArr.map((form, i) => {
                if (i === props.index) {
                  return { ...form, description: e.target.value as InputEnum };
                } else {
                  return form;
                }
              }),
            });
          }}
        />
      </FormControl>
    </Box>
  );
};

export const UserInput = (props: formProps) => {
  const form = props.command.formArr[props.index];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormControl fullWidth>
        <InputLabel id={`input_${form.id}`}>Description</InputLabel>
        <Input
          value={form.description}
          placeholder={form.example ?? ""}
          onChange={(e) => {
            props.setCommand({
              ...props.command,
              formArr: props.command.formArr.map((form, i) => {
                if (i === props.index) {
                  return { ...form, description: e.target.value };
                } else {
                  return form;
                }
              }),
            });
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id={`input_${form.id}`}>Example</InputLabel>
        <Input
          value={form.example}
          placeholder={form.example ?? ""}
          onChange={(e) => {
            props.setCommand({
              ...props.command,
              formArr: props.command.formArr.map((form, i) => {
                if (i === props.index) {
                  return { ...form, example: e.target.value };
                } else {
                  return form;
                }
              }),
            });
          }}
        />
      </FormControl>
    </Box>
  );
};

// user static selection.
// show example tags bottom, from form.example
export const UserSelect = (props: formProps) => {
  const form = props.command.formArr[props.index];

  return (
    <Box>
      <FormControl fullWidth>
        {form.selectOptions?.map((option, index) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id={`input_selection_${form.id}${index}`}>Option {index + 1}</InputLabel>
            <Input
              value={option}
              onChange={(e) => {
                props.setCommand({
                  ...props.command,
                  formArr: props.command.formArr.map((form, i) => {
                    if (i === props.index) {
                      return {
                        ...form,
                        selectOptions: form.selectOptions?.map((option, i) => {
                          if (i === index) {
                            return e.target.value;
                          } else {
                            return option;
                          }
                        }),
                      };
                    } else {
                      return form;
                    }
                  }),
                });
              }}
            />
          </FormControl>
        ))}

        <Button
          color="primary"
          onClick={() => {
            const newSelectOptions = Object.assign([], form.selectOptions);
            newSelectOptions.push("");
            props.setCommand({
              ...props.command,
              formArr: props.command.formArr.map((form, i) => {
                if (i === props.index) {
                  return { ...form, selectOptions: newSelectOptions };
                } else {
                  return form;
                }
              }),
            });
          }}
        >
          + Add Option
        </Button>
      </FormControl>
    </Box>
  );
};
