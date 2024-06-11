import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserTeam } from "./userTeam";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  avatar: string;

  @Column()
  isActive: boolean;

  @Column()
  role: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => UserTeam, (userTeam) => userTeam.user)
  teams: UserTeam[];
}
