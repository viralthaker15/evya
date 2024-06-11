import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

interface DeleteProps {
  users: number[];
  onSave: (users: number[]) => void;
  onCancel: () => void;
}

const DeleteModal = ({ users, onSave, onCancel }: DeleteProps) => {
  const {
    modalSettings: { userMetaData },
  } = useContext(AppContext);
  const deleteUserArray = userMetaData.id !== -1 ? [userMetaData.id] : users;
  const handleSave = () => {
    onSave(deleteUserArray);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">
        {`Are you sure you want to delete selected ${
          deleteUserArray.length === 1 ? "user" : "users"
        }?`}
      </h2>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded-md flex-1 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-900 text-white rounded-md flex-1"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
