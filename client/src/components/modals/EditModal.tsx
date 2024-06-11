import React, { useState, useEffect, useRef } from "react";
import { getRoles } from "../../services/api";
import { User } from "../../models/User";
import { Role } from "../../models/Role";

import styles from "./editModal.module.scss";

interface EditFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const EditModal = ({ user, onSave, onCancel }: EditFormProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<number>(user.role.id);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await getRoles();
      setRoles(response.data);
    };
    fetchRoles();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      handleSelectClick();
    }
  };

  useEffect(() => {
    if (selectOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectOpen]);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      role: roles.find((r) => r.id === role) || user.role,
    };
    onSave(updatedUser);
  };

  const handleSelectClick = () => {
    setSelectOpen(!selectOpen);
  };

  const handleRoleChange = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setRole(e.target?.value || role);
    setSelectOpen(false);
  };

  return (
    <div className={`flex flex-col gap-5 ${styles.root}`}>
      <h2 className="text-lg font-medium">Edit User Details</h2>
      <div>
        <label className="block text-sm font-medium text-slate-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded-md py-2.5 px-3.5"
        />
      </div>
      <div className="relative">
        <label className="block text-sm text-sm font-medium text-slate-700">
          User Role
        </label>
        <div
          className={`mt-1 block w-full border rounded-md py-2.5 px-3.5 relative ${
            styles.root__select
          } ${selectOpen ? styles.root__selectOpen : ""}`}
          onClick={handleSelectClick}
          ref={selectRef}
        >
          <li value={user.role.id} className={`text-md !block`}>
            {roles.find((r) => r.id === role)?.name || user.role.name}
          </li>
          <div className="absolute list-none bg-white w-full z-10 left-0 top-12 overflow-y-auto max-h-56">
            {selectOpen &&
              roles.map((r, idx) => (
                <li
                  key={idx}
                  value={r.id}
                  className={`py-2.5 px-3.5 text-md !list-item ${
                    role === r.id
                      ? `cursor-default bg-gray-50 ${styles.root__selected}`
                      : "cursor-pointer"
                  }`}
                  onClick={role !== r.id ? handleRoleChange : () => {}}
                >
                  {r.name}
                </li>
              ))}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm text-sm font-medium text-slate-700">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border rounded-md py-2.5 px-3.5"
        />
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded-md flex-1 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-900 text-white rounded-md flex-1 hover:bg-violet-900"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default EditModal;
