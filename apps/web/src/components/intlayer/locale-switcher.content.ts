import { type Dictionary, t } from "intlayer";

const localeSwitcherContent = {
  content: {
    languageListLabel: t({
      en: "Language list",
      zh: "语言列表",
      ko: "언어 목록",
      de: "Sprachliste",
    }),
    localeSwitcherLabel: t({
      en: "Select language",
      zh: "选择语言",
      ko: "언어 선택",
      de: "Sprache wählen",
    }),
  },
  key: "locale-switcher",
} satisfies Dictionary;

export default localeSwitcherContent;
