import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./user";
import { Team } from "./team";

// JUNCTION TABLE
@Entity({ name: "user_team" })
export class UserTeam {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  teamId: number;

  @ManyToOne(() => User, (user) => user.teams)
  user: User;

  @ManyToOne(() => Team, (team) => team.users)
  team: Team;
}
