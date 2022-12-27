import { StoreGPTCommandsListAtom } from "../lsState/store";
import { MineGPTCommandsListAtom } from "../lsState/mine";
import { GPTCommand } from "../model/command";
import { Typography, Box, Divider, Button } from "@mui/material";
import { useAtom } from "jotai";

const isAddedCommand = (storeCommand: GPTCommand, mineCommands: Array<GPTCommand>): boolean => {
  return mineCommands.some((mineCommand) => mineCommand.id === storeCommand.id);
};

const addCommand2Mine = (
  storeCommand: GPTCommand,
  mineCommands: Array<GPTCommand>,
  setMineCommands: (commands: Array<GPTCommand>) => void
) => {
  const newMineCommands = Object.assign([], mineCommands);
  newMineCommands.push(storeCommand);
  setMineCommands(newMineCommands);
};

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

const Store = () => {
  const [store] = useAtom<Array<GPTCommand>>(StoreGPTCommandsListAtom);
  const [mine, setMine] = useAtom<Array<GPTCommand>>(MineGPTCommandsListAtom);

  return (
    <div>
      {store.map((command: GPTCommand) => {
        return (
          <Box key={command.id} sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Typography variant="h4">
              {command.icon} {command.name}
            </Typography>
            <Typography variant="h5">- {command.description}</Typography>
            <Button color="primary" variant="contained" sx={{ m: 2 }}>
              Run
            </Button>
            {isAddedCommand(command, mine) ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deleteCommandFromMine(command, mine, setMine);
                }}
              >
                Remove from Cloud
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  addCommand2Mine(command, mine, setMine);
                }}
              >
                Get Command
              </Button>
            )}
          </Box>
        );
      })}
    </div>
  );
};

export default Store;
