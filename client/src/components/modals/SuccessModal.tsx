/// <reference types="vite-plugin-svgr/client" />
import { useContext } from "react";
import SuccessIcon from "../../assets/success.svg?react";
import { AppContext } from "../../contexts/AppContext";

const SuccessModal = () => {
  const {
    modalSettings: { modalType, userMetaData },
    selectedUsers,
  } = useContext(AppContext);

  const content = () => {
    const deleteUserArray =
      userMetaData.id !== -1 ? [userMetaData.id] : selectedUsers;
    switch (modalType) {
      case "DELETE":
        return `${
          deleteUserArray.length === 1 ? "User" : "Users"
        } Successfully deleted!`;

      case "EDIT":
        return "User Details changed!";
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <SuccessIcon />
      {content()}
    </div>
  );
};

export default SuccessModal;
