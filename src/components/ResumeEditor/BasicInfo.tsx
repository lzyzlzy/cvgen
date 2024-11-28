import { memo, useCallback } from "react";
import { BlockTitle } from "./BlockTitle";
import * as CV from "@/core/CV";
import { UseCvDispatch } from "@/hooks/CvContext";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { InputWithLabel } from "../ui/InputWithLabel";

export const BasicInfo = memo(function BasicInfo({
  basicInfo,
}: {
  basicInfo?: CV.Basic;
}) {
  const cvDispatch = UseCvDispatch();
  const localization = UseLocalization();
  const textKeyStore = localization?.textKeyStore;

  const onInputValueChange = useCallback(
    (actionType: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      cvDispatch({ type: actionType, data: e.target.value }),
    [cvDispatch]
  );

  const renderInputTextField = useCallback(
    (label: string, id: keyof CV.Basic, type: string = "text") => (
      <div className="w-full items-center">
        <InputWithLabel
          labelName={label}
          className=""
          type={type}
          id={id}
          key={id}
          placeholder={label}
          value={(basicInfo?.[id] as string) ?? ""}
          onChange={onInputValueChange(
            `set${id.charAt(0).toUpperCase() + id.slice(1)}`
          )}
        />
      </div>
    ),
    [basicInfo, onInputValueChange]
  );
  return (
    <div id="basicInfoBlock">
      <BlockTitle title={textKeyStore.basic} />
      {renderInputTextField(textKeyStore.name, "name")}
      {renderInputTextField(textKeyStore.job_title, "jobTitle")}
      {renderInputTextField(textKeyStore.day_of_birth, "birthday")}
      {renderInputTextField(textKeyStore.email, "email", "email")}
      {renderInputTextField(textKeyStore.phone_number, "phoneNumber")}
      {renderInputTextField(textKeyStore.website, "website")}
      {renderInputTextField(textKeyStore.github, "github")}
    </div>
  );
});
