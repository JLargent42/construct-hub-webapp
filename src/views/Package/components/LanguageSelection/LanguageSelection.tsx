import type { Assembly } from "@jsii/spec";
import type { FunctionComponent } from "react";
import { LanguageBar } from "../../../../components/LanguageBar";
import {
  Language,
  TEMP_SUPPORTED_LANGUAGES,
} from "../../../../constants/languages";
import { useLanguage } from "../../../../hooks/useLanguage";

export interface LanguageSelectionProps {
  assembly: Assembly;
}

export const LanguageSelection: FunctionComponent<LanguageSelectionProps> = ({
  assembly,
}) => {
  const [language, setLanguage] = useLanguage({
    updateSaved: true,
    updateUrl: true,
  });
  const targets = [
    ...Object.keys(assembly?.targets ?? {}),
    // typescript is the source language and hence always supported.
    // (it doesn't appear in spec.targets)
    Language.TypeScript,
  ] as Language[];

  return (
    <LanguageBar
      selectedLanguage={targets.includes(language) ? language : targets[0]}
      setSelectedLanguage={setLanguage}
      showDisabled
      targetLanguages={targets.filter((target) =>
        TEMP_SUPPORTED_LANGUAGES.has(target)
      )}
    />
  );
};