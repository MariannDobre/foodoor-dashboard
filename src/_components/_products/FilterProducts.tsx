interface ComponentProps {
  filterValue: string;
  restaurantId: string;
}

const dummyFilters = [
  { id: 0, label: 'All Products (A-Z)', value: 'all' },
  { id: 1, label: 'Vegetarian', value: 'vegetarian' },
  { id: 2, label: 'Carnivore', value: 'carnivore' },
  { id: 3, label: 'Salad', value: 'salad' },
  { id: 4, label: 'Desserts', value: 'dessert' },
  { id: 5, label: 'Spicy', value: 'spicy' },
];

export default function FilterProducts({ filterValue }: ComponentProps) {
  return (
    <div className='w-full flex items-center flex-wrap xl:flex-nowrap gap-1.5 xl:gap-3 2xl:gap-4.5'>
      {dummyFilters.map((button) => (
        <form
          key={button.id}
          method='GET'
        >
          {/* Preserve other search params if any */}
          {button.value !== 'all' && (
            <input
              type='hidden'
              name='productType'
              value={button.value}
            />
          )}
          <button
            type='submit'
            className={`${
              button.value === filterValue
                ? 'bg-orange-400 text-white dark:text-white border-orange-400'
                : 'bg-transparent text-black dark:text-white/50'
            } outline-none border border-neutral-400 dark:border-neutral-700 rounded-sm 2xl:rounded-lg shadow-sm cursor-pointer flex items-center justify-center py-1 px-3 2xl:py-1.5 2xl:px-4.5 text-xs xl:text-sm font-medium tracking-wider hover:bg-orange-500 focus-visible:bg-orange-500 hover:border-orange-500 focus-visible:border-orange-500 hover:shadow-lg focus-visible:shadow-lg hover:text-white focus-visible:text-white transition-all duration-500`}
          >
            {button.label}
          </button>
        </form>
      ))}

      {/* Clear filter button */}
      <form method='GET'>
        <button
          type='submit'
          disabled={filterValue === 'all'}
          className='outline-none border border-transparent rounded-sm 2xl:rounded-lg shadow-sm flex items-center justify-center py-1 px-3 2xl:py-1.5 2xl:px-4.5 bg-red-400 dark:bg-red-500 text-white text-xs xl:text-sm font-medium tracking-wider cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 not-disabled:hover:bg-red-700 not-disabled:focus-visible:bg-red-700 not-disabled:hover:shadow-lg not-disabled:focus-visible:shadow-lg transition-all duration-500'
        >
          Remove Filter
        </button>
      </form>
    </div>
  );
}
