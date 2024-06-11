import { User } from "src/models";

export const getFormattedUser = (user: User) => ({
  ...user,
  teams: user.teams.map((userTeam) => ({
    id: userTeam.team.id,
    name: userTeam.team.name,
  })),
});
