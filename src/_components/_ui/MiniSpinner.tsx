import { CgSpinnerTwo } from 'react-icons/cg';

interface MiniSpinnerProps {
  width?: string;
  height?: string;
  color?: string;
  size?: string;
}

export default function MiniSpinner({
  width = 'w-full',
  height = 'h-full',
  color = 'text-white',
  size = 'text-base',
}: MiniSpinnerProps) {
  return (
    <div
      className={`${width} ${height} flex items-center justify-center bg-transparent`}
    >
      <span className={`${color} ${size} animate-spin`}>
        <CgSpinnerTwo />
      </span>
    </div>
  );
}
