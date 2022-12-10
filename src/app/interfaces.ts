export interface User {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  gdprConsent: boolean;
}

export interface TranslatorStatus {
  numberOfTranslations: number;
  registeredUser: User | null;
}
