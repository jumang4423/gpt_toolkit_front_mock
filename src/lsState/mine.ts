import { atomWithStorage } from "jotai/utils";

// chat state
// TODO: fetch everytime you open the site
export const MineGPTCommandsListAtom = atomWithStorage("MineGPTCommandListAtom", []);

// userID State
export const MineUserIdAtom = atomWithStorage("MineUserIdAtom", "jumang4423");
export const OpenAIKeyAtom = atomWithStorage("OpenAIKeyAtom", "");
