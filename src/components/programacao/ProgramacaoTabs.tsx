"use client";

import { useState } from "react";

function ScheduleText({ text }: { text: string }) {
  const phrase = "locus theologicus";

  if (!text.includes(phrase)) return <>{text}</>;

  const [before, after] = text.split(phrase);

  return (
    <>
      {before}
      <em>{phrase}</em>
      {after}
    </>
  );
}

type ProgramacaoTabsProps = {
  days: Array<{ label: string; day: string; month: string }>;
  schedule: Array<{ day: string; items: string[][] }>;
};

export function ProgramacaoTabs({ days, schedule }: ProgramacaoTabsProps) {
  const [scheduleDay, setScheduleDay] = useState(1);
  const selectedDay = schedule[scheduleDay] ?? schedule[0];

  return (
    <>
      <div className="schedule-tabs" aria-label="Dias da programação">
        {schedule.map((day, index) => (
          <button
            aria-pressed={scheduleDay === index}
            key={day.day}
            onClick={() => setScheduleDay(index)}
            type="button"
          >
            <span>{days[index]?.label ?? day.day}</span>
            <strong>{days[index]?.day ?? ""}</strong>
            <small>{days[index]?.month ?? ""}</small>
          </button>
        ))}
      </div>
      <article className="schedule-focus" key={selectedDay.day}>
        {selectedDay.items.map(([time, text]) => (
          <div className="schedule-row" key={`${selectedDay.day}-${time}-${text}`}>
            <time>{time}</time>
            <p>
              <ScheduleText text={text} />
            </p>
          </div>
        ))}
      </article>
    </>
  );
}

