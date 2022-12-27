import { StoreGPTCommandsListAtom } from "../lsState/store";
import { useState } from "react";
import { MineGPTCommandsListAtom } from "../lsState/mine";
import { GPTCommand } from "../model/command";
import { Typography, Box, Divider, Button } from "@mui/material";
import { useAtom } from "jotai";
import RunnerModal from "./RunnerModal";

const deleteCommandFromMine = (
  storeCommand: GPTCommand,
  mineCommands: Array<GPTCommand>,
  setMineCommands: (commands: Array<GPTCommand>) => void
) => {
  const newMineCommands = Object.assign([], mineCommands);
  const index = newMineCommands.findIndex((mineCommand: GPTCommand) => mineCommand.id === storeCommand.id);
  newMineCommands.splice(index, 1);
  setMineCommands(newMineCommands);
};

const Mine = () => {
  const [mine, setMine] = useAtom<Array<GPTCommand>>(MineGPTCommandsListAtom);
  const [selectedCommand, setSelectedCommand] = useState<GPTCommand | null>(null);

  return (
    <div>
      {mine.map((command: GPTCommand) => {
        return (
          <Box key={command.id} sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Typography variant="h4">
              {command.icon} {command.name} ({command.isPublic ? "public" : "private"})
            </Typography>
            <Typography variant="h5">- {command.description}</Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setSelectedCommand(command);
              }}
              sx={{ m: 2 }}
            >
              Run
            </Button>
            <>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  deleteCommandFromMine(command, mine, setMine);
                }}
                sx={{ m: 2 }}
              >
                Remove
              </Button>
            </>
          </Box>
        );
      })}
      <RunnerModal command={selectedCommand} setCommand={setSelectedCommand} />
    </div>
  );
};

export default Mine;
