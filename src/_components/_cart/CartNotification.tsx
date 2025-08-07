interface CartNotificationProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CartNotification({
  searchParams,
}: CartNotificationProps) {
  const params = await searchParams;
  const status = params.status as string;
  const message = params.message as string;

  if (!status || !message) return null;

  const isSuccess = status === 'success';
  const isError = status === 'error';

  if (!isSuccess && !isError) return null;

  return (
    <div
      className={`
      w-full border-2-4 p-3 lg:p-4.5 rounded-sm lg:rounded-md xl:rounded-lg shadow-sm
      ${
        isSuccess
          ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200'
          : 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
      }
    `}
    >
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          {isSuccess ? (
            <svg
              className='h-5 w-5 text-green-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
          ) : (
            <svg
              className='h-5 w-5 text-red-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>

        <div className='ml-3'>
          <p className='text-sm font-medium tracking-wide'>
            {decodeURIComponent(message)}
          </p>
        </div>
      </div>
    </div>
  );
}
