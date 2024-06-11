import { getInitials } from "./helpers/avatarUtils";

interface DefaultAvatarProps {
  name: string;
}

const DefaultAvatar = ({ name }: DefaultAvatarProps) => {
  const initials = getInitials(name);
  const backgroundColor = "#F9F5FF";

  return (
    <div
      className="flex items-center justify-center rounded-full w-10 h-10 mr-2"
      style={{ backgroundColor }}
    >
      <span className="text-violet-500 font-medium text-base">{initials}</span>
    </div>
  );
};

export default DefaultAvatar;
