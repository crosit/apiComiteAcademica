import i18n from "i18n";
import path from "path";
import { ALS } from "../shared/local-storage/internationalization.storage";

i18n.configure({
  locales: ["en", "es"],
  // register: isGlobal ? global : i18nObj,
  directory: path.join(__dirname, "locales"),
  defaultLocale: "es",
  objectNotation: true,
  updateFiles: false,
});
ALS.setI18n(i18n, "en");
export default i18n;
