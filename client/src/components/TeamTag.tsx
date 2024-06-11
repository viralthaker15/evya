import { Team } from "../models/Team";
import styles from "./teamTag.module.scss";

type PropTypes = {
  teams: Team[];
  maxTagsToShow?: number;
};

const TeamTag = ({ teams, maxTagsToShow = 4 }: PropTypes) => {
  return (
    <div className={`${styles.root}`}>
      {teams.slice(0, maxTagsToShow).map((team, idx) => (
        <span
          key={idx}
          className={`px-2 py-0.5 pb-1 rounded-xl mr-1 text-xs font-medium text-center ${
            styles[`root__teamColor-${team.id}`]
          }`}
        >
          {team.name}
        </span>
      ))}
      {teams.length - maxTagsToShow > 0 ? (
        <span
          className={`px-2 py-0.5 pb-1 rounded-xl mr-1 text-xs font-medium text-center`}
        >
          {`+${teams.length - maxTagsToShow}`}
        </span>
      ) : null}
    </div>
  );
};

export default TeamTag;
