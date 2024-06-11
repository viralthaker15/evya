import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserTeam } from "./UserTeam";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserTeam, (userTeam) => userTeam.team)
  users: UserTeam[];
}
