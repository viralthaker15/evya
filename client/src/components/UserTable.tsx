import React, { useState, useEffect, useContext, useMemo } from "react";
import { getUsers, updateUser } from "../services/api";
import { User } from "../models/User";
import UserRow from "./UserRow";
import styles from "./userTable.module.scss";
import { AppContext } from "../contexts/AppContext";
import TableFooter from "./TableFooter";
import Modal from "./modals/modal";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const {
    selectedUsers,
    clearSelection,
    selectAll,
    modalSettings: { open, modalType, userMetaData },
    handleChangeModalSettings,
  } = useContext(AppContext);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isSelectedAll = useMemo(
    () =>
      JSON.stringify(users.map((user) => user.id)) ===
      JSON.stringify(selectedUsers),
    [users, selectedUsers]
  );

  const fetchUsers = async (page: number) => {
    try {
      const response = await getUsers(page);
      setUsers(response.data.items);
      setTotalCount(response.data.count);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    /* --- Ideally this code should not rely here 
        - This API call should be extracted from the rendering logic
        - Ideally as saga, thunk or maybe a middleware(React query)
        - for timely purpose I am directly calling API in useEffect
    */
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
    /* === Reset previous pages selected users === */
    clearSelection();
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLElement>) => {
    e.stopPropagation();
    isSelectedAll
      ? clearSelection()
      : selectAll([...users.map((user) => user.id)]);
  };

  const handleRenderModal = () => {
    switch (modalType) {
      case "EDIT":
        return (
          <EditModal
            user={userMetaData}
            onCancel={() => handleChangeModalSettings({ open: false })}
            onSave={async (updatedUser: User) => {
              await updateUser(updatedUser.id, updatedUser);
              await fetchUsers(currentPage);
              handleChangeModalSettings({ open: false });
            }}
          />
        );
      case "DELETE":
        return (
          <DeleteModal
            users={selectedUsers}
            onSave={() => {}}
            onCancel={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 ${styles.root}`}>
      {/* ==== HEADER: start ==== */}
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <h1 className="text-lg font-medium">Team members</h1>
          {typeof totalCount === "number" ? (
            <p
              className={`mt-1 ml-4 text-xs bg-gray-100 py-1 px-2 rounded-xl font-medium ${styles.root__count}`}
            >{`${totalCount} users`}</p>
          ) : null}
        </div>
        <button
          className={`${
            selectedUsers.length > 0
              ? "bg-violet-500 cursor-pointer"
              : "bg-violet-400 cursor-default"
          } text-white px-4 py-2 rounded-lg text-sm font-medium`}
          disabled={selectedUsers.length === 0}
        >
          Delete Selected
        </button>
      </div>
      {/* ==== HEADER: END ==== */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-2 text-left">
              <label className={`checkbox`}>
                <input
                  type="checkbox"
                  className={`mr-2`}
                  onChange={handleSelectAll}
                  checked={users.length > 0 && isSelectedAll}
                />
                <div className="checkbox__checkmark"></div>
              </label>
            </th>
            <th className="py-2 px-2 text-left font-medium text-xs">Name</th>
            <th className="py-2 px-2 text-left font-medium text-xs">Status</th>
            <th className="py-2 px-2 text-left font-medium text-xs">Role</th>
            <th className="py-2 px-2 text-left font-medium text-xs">
              Email address
            </th>
            <th className="py-2 px-2 text-left font-medium text-xs">Teams</th>
            <th className="py-2 px-2 text-left font-medium text-xs"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
      <TableFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Modal
        isOpen={open}
        onClose={() => handleChangeModalSettings({ open: false })}
      >
        {handleRenderModal()}
      </Modal>
    </div>
  );
};

export default UserTable;
