import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./quiz.css";
import { fitEmails } from "../../utils/fitEmails";

export type EmailCellProps = {
  emails: string[];
};

export const EmailCellUnsolved: React.FC<EmailCellProps> = ({ emails }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [fitCount, setFitCount] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!emails?.length) return;

    const avgCharWidth = 8;
    const maxChars = Math.floor(width / avgCharWidth);

    const { fitCount } = fitEmails(emails, maxChars);
    setFitCount(fitCount);
  }, [emails, width]);

  if (!emails?.length || emails[0].trim() === "") {
    return (
      <div className="email-cell" ref={containerRef}>
        –
      </div>
    );
  }

  const remaining = emails.length - fitCount;

  if (fitCount <= 1) {
    const firstEmail = emails[0];

    return (
      <div className="email-cell" ref={containerRef}>
        <span className="truncate-one-email" style={{ maxWidth: width - 24 }}>
          {firstEmail}
        </span>

        {remaining > 0 && (
          <span
            className="badge"
            title={emails.join(", ")}
            aria-label={`More ${remaining} emails`}
          >
            +{remaining}
            <span className="tooltip">{emails.join(", ")}</span>
          </span>
        )}
      </div>
    );
  }

  const visible = emails.slice(0, fitCount).join(", ");

  return (
    <div className="email-cell" ref={containerRef}>
      <span>{visible}</span>

      {remaining > 0 && (
        <span
          className="badge"
          aria-label={`More ${remaining} emails`}
          title={emails.join(", ")}
        >
          +{remaining}
          <div className="tooltip">{emails.join(", ")}</div>
        </span>
      )}
    </div>
  );
};
