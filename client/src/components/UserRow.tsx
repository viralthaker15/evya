import React, { useContext } from "react";
import { User } from "../models/User";

import styles from "./userRow.module.scss";
import { AppContext } from "../contexts/AppContext";
import TeamTag from "./TeamTag";
/// <reference types="vite-plugin-svgr/client" />
import EditIcon from "../assets/edit.svg?react";
import TrashIcon from "../assets/bin.svg?react";
import DefaultAvatar from "./DefaultAvatar";

interface UserRowProps {
  user: User;
}

const UserRow = ({ user }: UserRowProps) => {
  const { selectedUsers, toggleUserSelection, handleChangeModalSettings } =
    useContext(AppContext);

  const handleSelectUser = (e: React.ChangeEvent<HTMLElement>) => {
    e.stopPropagation();

    toggleUserSelection(user.id);
  };

  const handleEditClick = () => {
    handleChangeModalSettings({
      open: true,
      modalType: "EDIT",
      userMetaData: user,
    });
  };

  const handleDeleteClick = () => {
    handleChangeModalSettings({
      open: true,
      modalType: "DELETE",
      userMetaData: user,
    });
  };

  return (
    <tr className={`border-b ${styles.root}`}>
      <td className="py-2 px-2">
        <label className={`checkbox`}>
          <input
            type="checkbox"
            className={`mr-2`}
            onChange={handleSelectUser}
            checked={selectedUsers.includes(user.id)}
          />
          <div className="checkbox__checkmark"></div>
        </label>
      </td>
      <td className="py-2 px-2 flex items-center">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full mr-2"
          />
        ) : (
          <DefaultAvatar name={user.name} />
        )}
        <div className="flex flex-col">
          <span className={`font-medium ${styles.root__userTitle}`}>
            {user.name}
          </span>
          <span className={`font-medium ${styles.root__userName}`}>
            {user.userName}
          </span>
        </div>
      </td>
      <td className="py-2 px-2">
        <span
          className={`px-2 py-1 rounded-full font-medium ${
            user.isActive
              ? `bg-emerald-50 ${styles.root__activeText}`
              : `${styles.root__inActiveText}`
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="py-2 px-2 text--500">{user.role.name}</td>
      <td className="py-2 px-2">{user.email}</td>
      <td className="py-2 px-2">
        {user.teams.length > 0 ? <TeamTag teams={user.teams} /> : "-"}
      </td>
      <td className="py-2 px-2 flex items-center">
        <EditIcon
          className="mr-2 cursor-pointer"
          onClick={handleEditClick}
          onMouseOver={(e) => {
            (e.target as HTMLElement).querySelector("path").style.stroke =
              "#9747FF";
          }}
          onMouseOut={(e) => {
            e.target.querySelector("path").style.stroke = "#667085";
          }}
        />
        <TrashIcon
          className="mr-2 cursor-pointer"
          onClick={handleDeleteClick}
          onMouseOver={(e) => {
            e.target.querySelector("path").style.stroke = "#9747FF";
          }}
          onMouseOut={(e) => {
            e.target.querySelector("path").style.stroke = "#667085";
          }}
        />
      </td>
    </tr>
  );
};

export default UserRow;
