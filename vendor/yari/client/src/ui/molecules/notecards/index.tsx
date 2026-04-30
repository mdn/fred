export default function NoteCard({
  children,
  type = "info",
  extraClasses,
}: {
  children: JSX.Element | JSX.Element[];
  type?: string;
  extraClasses?: string | null;
}) {
  const classes = `notecard ${type !== "info" ? type : ""} ${
    extraClasses || ""
  }`.trim();

  return <div className={classes}>{children}</div>;
}
