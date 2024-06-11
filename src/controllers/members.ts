import express from "express";
import { dataSource } from "../db";
import { Role, Team, User, UserTeam } from "../models";
import { getFormattedUser } from "./utils";
import { In } from "typeorm";

const router = express.Router();

/* === Repositories === */
const userRepository = dataSource.getRepository(User);
const teamRepository = dataSource.getRepository(Team);
const userTeamRepository = dataSource.getRepository(UserTeam);
const roleRepository = dataSource.getRepository(Role);

/* === Routes === */
router.get("", async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const order = (req.query.order as "ASC" | "DESC") || "ASC";

    // Searching & Filtering
    const search = req.query.search as string;

    const queryBuilder = userRepository.createQueryBuilder("user");

    if (search) {
      queryBuilder.where("user.name ILIKE :search", { search: `%${search}%` });
    }

    queryBuilder.skip(skip).take(limit).orderBy(`user.${sortBy}`, order);

    /* --- Return only relevant data --- */
    queryBuilder
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("user.teams", "userTeam")
      .leftJoinAndSelect("userTeam.team", "teams");

    const [users, total] = await queryBuilder.getManyAndCount();

    const result = users.map((user) => getFormattedUser(user));

    res.status(200).json({
      items: result,
      count: total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (e) {
    // ofcourse on production level code error handling is handled more gracefully and with more info
    // but for this project purpose we can handle in simple try catch block
    console.error("Error deleting user:", e);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

// get All Roles
router.get("/roles", async (req, res, next) => {
  try {
    const roles = await roleRepository.find({});
    res.status(200).send(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// GET member by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const queryBuilder = userRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("user.teams", "userTeam")
      .leftJoinAndSelect("userTeam.team", "teams");

    const user = await queryBuilder.getOne();
    if (user) {
      res.status(200).json(getFormattedUser(user));
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    // ofcourse on production level code error handling is handled more gracefully and with more info
    // but for this project purpose we can handle in simple try catch block
    console.error("Error fetching user:", e);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

// add members
router.post("", async (req, res, next) => {
  try {
    const {
      userDetails: { name, email, username, avatar, roleId },
      teamName,
    } = req.body;

    const user = new User();
    user.name = name;
    user.email = email;
    user.avatar = avatar;
    user.userName = username;

    const role = await roleRepository.findOne({ where: { id: roleId } });

    if (!role) {
      throw new Error(`Role with id ${roleId} not found`);
    }

    user.role = role;

    let team = await teamRepository.findOne({ where: { name: teamName } });
    if (!team) {
      /* --- if no team matches create a new team and attach to the current user --- */
      team = new Team();
      team.name = teamName;
      await teamRepository.save(team);
    }

    await userRepository.save(user);

    const userTeam = new UserTeam();
    userTeam.user = user;
    userTeam.team = team;

    await userTeamRepository.save(userTeam);

    res.status(201).json({
      ...user,
      team,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// update members
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      role: { id: roleId },
    } = req.body;
    const user = await userRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (roleId) {
      /* --- Update Role --- */
      const role = await roleRepository.findOne({
        where: { id: roleId },
      });

      if (!role) {
        return res.status(400).json({ message: "Invalid Role" });
      }
      user.role = role;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await userRepository.save(user);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.post("/delete-many", async (req, res) => {
  try {
    const { deletedUserIds } = req.body;

    await userTeamRepository.delete({ userId: In(deletedUserIds) });
    const deletedUsers = await userRepository.delete({
      id: In(deletedUserIds),
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// delete member
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await userTeamRepository.delete({ userId: parseInt(id) });
    const user = await userRepository.findOneBy({ id: parseInt(id) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRepository.remove(user);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
