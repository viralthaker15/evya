import { Team } from "../models/Team";
import styles from "./teamTag.module.scss";
import Tooltip from "./Tooltip";

type PropTypes = {
  teams: Team[];
  maxTagsToShow?: number;
};

const TeamTag = ({ teams, maxTagsToShow = 4 }: PropTypes) => {
  const showTooltip = teams.length - maxTagsToShow > 0;

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
      {showTooltip ? (
        <Tooltip
          content={teams.slice(maxTagsToShow).map((tag, index) => (
            <div key={index} className="p-1">
              {tag.name}
            </div>
          ))}
        >
          <span
            className={`px-2 py-0.5 pb-1 rounded-xl mr-1 text-xs font-medium text-center`}
          >
            {`+${teams.length - maxTagsToShow}`}
          </span>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default TeamTag;
