import { ReactElement } from "react";

interface MatCapButtonProps {
  name: string;
  onClick: () => void;
}

export const MatCapButton = ({
  name,
  onClick,
}: MatCapButtonProps): ReactElement => {
  return (
    <button className="bg-blue-500 p-2 text-white" onClick={onClick}>
      {name}
    </button>
  );
};
