interface DeleteProps {
  users: number[];
  onSave: (users: number[]) => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteProps> = ({ users, onSave, onCancel }) => {
  const handleSave = () => {
    onSave(users);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Are you sure you want to delete selected users?
      </h2>
      <div className="flex justify-end space-x-4">
        <button onClick={onCancel} className="px-4 py-2 border rounded-md">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-purple-500 text-white rounded-md"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
