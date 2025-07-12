import { Popover, Statistic } from "keep-react";
import React from "react";
import { Info } from "phosphor-react";

const SkillScoreStatistic = ({ skill }) => {
    return (
        <div
            className="border border-metal-50 bg-metal-100 rounded p-4"
            key={skill.skill_name}
        >
            <Statistic>
                <Popover
                    trigger="hover"
                    className="shadow-2x bg-slate-500"
                    icon={<></>}
                >
                    <Popover.Description>
                        {skill.explanation}
                    </Popover.Description>
                    <Popover.Action>
                        <Statistic.Title className="flex items-center gap-2">
                            {skill.skill_name}

                            <Info size={20} />
                        </Statistic.Title>
                    </Popover.Action>
                </Popover>
                <Statistic.Amount>{skill.score}</Statistic.Amount>
            </Statistic>
        </div>
    );
};

export default SkillScoreStatistic;
