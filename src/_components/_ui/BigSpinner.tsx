import { CgSpinnerTwo } from 'react-icons/cg';

interface BigSpinnerProps {
  width?: string;
  height?: string;
}

export default function BigSpinner({
  width = 'w-full',
  height = 'h-full',
}: BigSpinnerProps) {
  return (
    <div
      className={`${width} ${height} flex items-center justify-center border border-orange-500 bg-orange-50 rounded-lg shadow-sm`}
    >
      <span className='text-orange-500 text-6xl animate-spin'>
        <CgSpinnerTwo />
      </span>
    </div>
  );
}
