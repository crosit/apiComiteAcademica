import { I18n } from "i18n";
import { AsyncLocalStorage } from "async_hooks";
import { StorageI } from "./local-storage.types";

export const ALS = {
  storage: new AsyncLocalStorage<StorageI>(),
  getI18n(): I18n {
    const i18nLocale: I18n | undefined = this.storage.getStore()?.i18nStorage;
    return i18nLocale!;
  },
  setI18n(i18nVar: I18n, locale: string = "es") {
    i18nVar.setLocale(locale);
    const storageCopy: StorageI | undefined = this.storage.getStore();
    this.storage.enterWith({ ...storageCopy, i18nStorage: i18nVar });
  },
};
