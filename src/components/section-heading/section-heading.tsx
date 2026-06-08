interface SectionHeadingProps {
  command: string;
}

function SectionHeading({ command }: SectionHeadingProps) {
  return (
    <p className="section__heading">
      <span className="section__heading-prompt">$</span> {command}
    </p>
  );
}

export default SectionHeading;
