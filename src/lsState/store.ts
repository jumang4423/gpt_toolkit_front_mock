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
    icon: "🌏",
  },
  {
    id: "nani",
    name: "大喜利",
    description: "大喜利を生成するコマンド",
    formArr: [
      {
        id: "alskdjfalskdjf",
        description: "大喜利の前半",
        inputType: InputEnum.UserInput,
        example: "「やっほー」と山に向かって叫んだら何とかえってきた？",
      },
      {
        id: "alskdjfallksdjfskdjf",
        description: "に続く大喜利を作ってください。キーワードは",
        inputType: InputEnum.NoSideEffect,
      },
      {
        id: "lksdjfa1lgk",
        description: "キーワード",
        inputType: InputEnum.UserInput,
        example: "山, おじいちゃん",
      },
      {
        id: "lksdjlaksdjfvvvfa2lgk",
        description: "です。",
        inputType: InputEnum.NoSideEffect,
      },
    ],
    ownerUserId: "nani_id",
    downloadCount: 99999,
    isDeleted: false,
    isPublic: true,
    icon: "🤣",
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
    icon: "📝",
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
    icon: "🍔",
  },
];

// cloud uploaded gpt commands.
// TODO: this also fetch everytume the page is loaded
export const StoreGPTCommandsListAtom = atomWithStorage("StoreGPTCommandsListAtom", initStoreList);
