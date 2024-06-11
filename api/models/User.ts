import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { UserTeam } from "./UserTeam";
import { Role } from "./Role";

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

  @Column({ unique: true })
  email: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => UserTeam, (userTeam) => userTeam.user)
  teams: UserTeam[];

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: "roleId" })
  role: Role;
}
