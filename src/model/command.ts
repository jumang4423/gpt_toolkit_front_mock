import { Ok, Err, Result } from "ts-results";
import { GenRandomId } from "../util/genRandomId";
import { GenRandomEmoji } from "../util/genRandomEmoji";
// sharalbe GPT command type
export enum InputEnum {
  NoSideEffect = "GPT Prompt", // No Side Effect Static Text Form
  UserInput = "User Input", // user input
  Select = "Static Selection", // user static selection
}
export type FormInputType = {
  id: string;
  description: string;
  inputType: InputEnum;
  example?: string;
  selectOptions?: Array<string>;
};

export type GPTCommand = {
  id: string;
  name: string;
  description: string;
  formArr: Array<FormInputType>;
  ownerUserId: string;
  downloadCount: number;
  isDeleted: boolean;
  isPublic: boolean;
  icon: string;
};

export const InitGPTCommand = (userId: string): GPTCommand => {
  return {
    id: GenRandomId(64),
    name: "",
    description: "",
    formArr: [],
    ownerUserId: userId,
    downloadCount: 0,
    isDeleted: false,
    isPublic: true,
    icon: GenRandomEmoji(),
  };
};

// object validation for GPTCommand
export const NewGPTCommand = (argObj: GPTCommand): Result<GPTCommand, string> => {
  if (!argObj) {
    return Err("argObj is null");
  }

  if (argObj.icon.length !== 1) {
    return Err("icon is not a emoji");
  }

  return Ok(argObj);
};
