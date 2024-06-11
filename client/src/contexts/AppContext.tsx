import React, { createContext, useState, ReactNode } from "react";
import { User } from "../models/User";

interface AppContextState {
  selectedUsers: number[];
  toggleUserSelection: (userId: number) => void;
  clearSelection: () => void;
  selectAll: (userIds: number[]) => void;
  handleChangeModalSettings: (settings: {
    open?: boolean;
    modalType?: "EDIT" | "DELETE";
    userMetaData?: User;
  }) => void;
  modalSettings: ModalSettings;
}

interface ModalSettings {
  open: boolean;
  modalType: "EDIT" | "DELETE";
  userMetaData: User;
}

const defaultUserObj = {
  avatar: "",
  createdAt: "",
  email: "",
  id: Math.random(),
  isActive: false,
  name: "",
  role: {
    id: Math.random(),
    name: "",
  },
  updatedAt: "",
  userName: "",
  teams: [],
};

export const AppContext = createContext<AppContextState>({
  selectedUsers: [],
  toggleUserSelection: () => {},
  clearSelection: () => {},
  selectAll: () => {},
  handleChangeModalSettings: () => {},
  modalSettings: {
    open: false,
    modalType: "EDIT",
    userMetaData: defaultUserObj,
  },
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [modalSettings, setModalSettings] = useState<ModalSettings>({
    open: false,
    modalType: "EDIT",
    userMetaData: defaultUserObj,
  });

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const selectAll = (userIds: number[]) => {
    setSelectedUsers(userIds);
  };

  const handleChangeModalSettings = (settings: {
    open?: boolean;
    modalType?: "EDIT" | "DELETE";
    userMetaData?: User;
  }) => {
    let newSettings = { ...modalSettings };

    if ("open" in settings)
      newSettings = {
        ...newSettings,
        open: Boolean(settings.open),
      };
    if ("modalType" in settings)
      newSettings = {
        ...newSettings,
        modalType: settings.modalType || newSettings.modalType,
      };
    if ("userMetaData" in settings)
      newSettings = {
        ...newSettings,
        userMetaData: settings.userMetaData || newSettings.userMetaData,
      };

    setModalSettings(newSettings);
  };

  return (
    <AppContext.Provider
      value={{
        selectedUsers,
        toggleUserSelection,
        clearSelection,
        selectAll,
        modalSettings,
        handleChangeModalSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
