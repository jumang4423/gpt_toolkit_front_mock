import { atomWithStorage } from "jotai/utils";
import { GPTCommand, InputEnum } from "../model/command";

const initStoreList: Array<GPTCommand> = [
  {
    id: "hoge",
    name: "Translation",
    description: "translation with GPT3",
    formArr: [
      {
        id: "vkalort099",
        description: "translate ",
        inputType: InputEnum.NoSideEffect,
      },
      {
        id: "laksdfjalskdjf",
        description: "Prompt",
        inputType: InputEnum.UserInput,
        example: "Hello, world!",
      },
      {
        id: "98fls",
        description: "to",
        inputType: InputEnum.NoSideEffect,
      },
      {
        id: "1",
        description: "Language",
        inputType: InputEnum.Select,
        selectOptions: ["Japanese", "English"],
      },
    ],
    ownerUserId: "hoge_id",
    downloadCount: 99999,
    isDeleted: false,
    isPublic: true,
    icon: "đ",
  },
  {
    id: "nani",
    name: "ć€§ćć©",
    description: "ć€§ćć©ăçæăăăłăăłă",
    formArr: [
      {
        id: "alskdjfalskdjf",
        description: "ć€§ćć©ăźćć",
        inputType: InputEnum.UserInput,
        example: "ăăăŁă»ăŒăăšć±±ă«ćăăŁăŠć«ăă ăäœăšăăăŁăŠăăïŒ",
      },
      {
        id: "alskdjfallksdjfskdjf",
        description: "ă«ç¶ăć€§ćć©ăäœăŁăŠăă ăăăă­ăŒăŻăŒăăŻ",
        inputType: InputEnum.NoSideEffect,
      },
      {
        id: "lksdjfa1lgk",
        description: "ă­ăŒăŻăŒă",
        inputType: InputEnum.UserInput,
        example: "ć±±, ăăăăĄăă",
      },
      {
        id: "lksdjlaksdjfvvvfa2lgk",
        description: "ă§ăă",
        inputType: InputEnum.NoSideEffect,
      },
    ],
    ownerUserId: "nani_id",
    downloadCount: 99999,
    isDeleted: false,
    isPublic: true,
    icon: "đ€Ł",
  },

  {
    id: "fuga",
    name: "Grammar Check",
    description: "grammar check with GPT3",
    formArr: [
      {
        id: "vkalolaksdjfalksjdfrt099",
        description: "check grammar of ",
        inputType: InputEnum.NoSideEffect,
      },
      {
        id: "0",
        description: "Prompt",
        inputType: InputEnum.UserInput,
        example: "hy gogle, how r u?",
      },
    ],
    ownerUserId: "fuga_id",
    downloadCount: 99999,
    isDeleted: false,
    isPublic: true,
    icon: "đ",
  },
  {
    id: "piyo",
    name: "What to Eat",
    description: "suggest what to eat with GPT3",
    formArr: [
      {
        id: "kla90809fklajsdf",
        description: "suggest what to eat. options are ",
        inputType: InputEnum.NoSideEffect,
      },
      {
        id: "slkadfaslkdjg87so8g",
        description: "Options",
        inputType: InputEnum.UserInput,
        example: "tuna sushi, salmon sushi, roll sushi",
      },
      {
        id: "laksdjfalsklkjasdfdjflkasdjf",
        description: ". i feel like ",
        inputType: InputEnum.NoSideEffect,
      },
      {
        id: "slakdjfaslkdfjs",
        description: "Mood",
        inputType: InputEnum.Select,
        selectOptions: ["hungry", "tired", "happy"],
      },
    ],
    ownerUserId: "piyo_id",
    downloadCount: 99999,
    isDeleted: false,
    isPublic: true,
    icon: "đ",
  },
];

// cloud uploaded gpt commands.
// TODO: this also fetch everytume the page is loaded
export const StoreGPTCommandsListAtom = atomWithStorage("StoreGPTCommandsListAtom", initStoreList);
