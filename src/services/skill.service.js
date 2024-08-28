import { http } from "./config";

export const skillService = {
  getSkills: () => {
    return http("/skill");
  },
};
