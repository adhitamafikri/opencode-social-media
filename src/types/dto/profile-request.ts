export type GetProfileByUsernameParams = {
  username: string;
};

export type UpdateProfileRequest = {
  bio?: string;
  countryCode?: string;
  dob?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  phoneNumber?: string;
};
