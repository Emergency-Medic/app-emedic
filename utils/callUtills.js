import call from "react-native-phone-call";

export const makePhoneCall = () => {
  const args = {
    number: "112",
    prompt: false,
    skipCanOpen: true,
  };

  call(args).catch(console.error);
};
