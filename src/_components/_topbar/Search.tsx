'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

import Image from 'next/image';
import MiniSpinner from '../_ui/MiniSpinner';

import { BsSearch } from 'react-icons/bs';

interface RestaurantResult {
  id: string;
  name: string;
  poster: string;
  location: string;
  type: 'restaurant';
}

interface ProductResult {
  id: string;
  name: string;
  image: string;
  restaurant_id: string;
  restaurants: {
    name: string;
  };
  type: 'product';
}

type ResultItem = RestaurantResult | ProductResult;
type SearchState = 'idle' | 'loading' | 'success' | 'error' | 'no-results';

export default function Search() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [isNavigating, setIsNavigating] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const showResults = isFocused && query.length >= 3 && searchState !== 'idle';

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 3) {
        setResults([]);
        setSearchState('idle');
        return;
      }

      setSearchState('loading');

      try {
        const restaurantResponse = await fetch('/api/restaurants');
        const productResponse = await fetch('/api/products');

        if (!restaurantResponse.ok || !productResponse.ok) {
          throw new Error('Failed to fetch the restaurants and the products.');
        }

        const restaurantData: RestaurantResult[] =
          await restaurantResponse.json();
        const productData: ProductResult[] = await productResponse.json();

        const filteredRestaurants: RestaurantResult[] = restaurantData
          .filter((item) =>
            item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
          .map((item) => ({ ...item, type: 'restaurant' }));

        const filteredProducts: ProductResult[] = productData
          .filter((item) =>
            item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
          .map((item) => ({ ...item, type: 'product' }));

        const combinedResults = [...filteredRestaurants, ...filteredProducts];

        setResults(combinedResults);
        setSearchState(combinedResults.length > 0 ? 'success' : 'no-results');
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setResults([]);
        setSearchState('error');
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setTimeout(() => setIsFocused(false), 200);

  const handleClick = (item: ResultItem) => {
    setIsNavigating(true);

    setTimeout(() => {
      const destination =
        item.type === 'restaurant'
          ? `/restaurants/${item.id}`
          : `/restaurants/${item.restaurant_id}`;
      router.push(destination);

      // Reset UI state
      setQuery('');
      setResults([]);
      setSearchState('idle');
      setIsFocused(false);
      setIsNavigating(false);
    }, 100);
  };

  //  const clearSearch = () => {
  //   setQuery('');
  //   setResults([]);
  //   setSearchState('idle');
  //   setIsNavigating(false);
  //   inputRef.current?.focus();
  // };

  const renderSearchResults = () => {
    if (isNavigating) {
      return (
        <div className='w-full flex items-center gap-3'>
          <div className='w-auto h-auto'>
            <MiniSpinner
              size='text-xl'
              color='text-orange-500'
            />
          </div>

          <p className='w-full text-sm text-gray-500 font-normal tracking-wider'>
            Opening restaurant...
          </p>
        </div>
      );
    }

    if (searchState === 'loading') {
      return (
        <div className='w-full flex items-center gap-3'>
          <div className='w-auto h-auto'>
            <MiniSpinner
              size='text-xl'
              color='text-orange-500'
            />
          </div>

          <p className='w-full text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wider'>
            Searching for query match...
          </p>
        </div>
      );
    }

    if (searchState === 'error') {
      return (
        <p className='text-sm text-red-500 font-normal tracking-wider'>
          Something went wrong. Please try again.
        </p>
      );
    }

    if (searchState === 'no-results') {
      return (
        <p className='text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wider'>
          No restaurant or product was found with this name
        </p>
      );
    }

    if (searchState === 'success' && results.length > 0) {
      return results.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item)}
          className='w-full h-16 flex items-center gap-2 lg:gap-3 cursor-pointer bg-gray-100/75 dark:bg-neutral-900/75 p-1.5 rounded-sm lg:rounded-md xl:rounded-lg shadow-sm hover:bg-gray-50/75 dark:hover:bg-neutral-800/75 focus-visible:bg-gray-50/75 dark:focus-visible:bg-neutral-800/75 transition-all duration-300 mb-2 last:mb-0'
        >
          <div className='w-8 lg:w-12 h-[52px] rounded-lg relative flex-shrink-0'>
            <Image
              src={item.type === 'restaurant' ? item.poster : item.image}
              alt={`Poster of ${item.name}.`}
              priority
              fill
              placeholder='blur'
              blurDataURL={
                item.type === 'restaurant' ? item.poster : item.image
              }
              className='object-cover w-full h-full rounded-sm lg:rounded-md xl:rounded-lg drop-shadow-sm'
            />
          </div>

          <div className='flex flex-col min-w-0 flex-1'>
            <h6 className='text-sm lg:text-base xl:text-lg text-orange-500 font-medium tracking-wider lg:tracking-wide truncate'>
              {item.name}
            </h6>

            <p className='text-xs lg:text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wider truncate'>
              {item.type === 'restaurant'
                ? item.location
                : `From ${item.restaurants?.name ?? 'unknown restaurant'}`}
            </p>
          </div>
        </div>
      ));
    }

    return null;
  };

  return (
    <div className='flex items-center relative'>
      <span className='absolute top-1/2 left-2 lg:left-3 -translate-y-1/2 text-neutral-500 dark:text-white text-sm lg:text-base z-10'>
        <BsSearch />
      </span>

      <input
        ref={inputRef}
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className='outline-none border-l-0 lg:border-l-2 lg:border-l-neutral-500 dark:border-white bg-gray-200/75 dark:bg-stone-500/75 text-neutral-800 text-xs lg:text-sm xl:text-base dark:text-white tracking-wider placeholder:tracking-wider lg:tracking-wide lg:placeholder:tracking-wide placeholder:text-neutral-500/50 dark:placeholder:text-white/50 caret-orange-500 w-40 xl:w-92 rounded-sm lg:rounded-md xl:rounded-lg py-1.5 pl-6 lg:pl-9 pr-2 lg:pr-4 xl:pr-6 shadow hover:w-56 focus-visible:w-56 xl:hover:w-lg xl:focus-visible:w-lg hover:shadow-lg focus-visible:shadow-lg hover:border-l-orange-500 focus-visible:border-l-orange-500 hover:placeholder:text-neutral-500 dark:hover:placeholder:text-white/75 focus-visible:placeholder:text-neutral-500 dark:focus-visible:placeholder:text-white/75 selection:bg-orange-500 selection:text-white placeholder:transition-colors placeholder:duration-500 transition-all duration-500'
        placeholder='Search foodoor...'
        title='Search restaurants or products...'
      />

      {/* Results dropdown */}
      {showResults && (
        <div className='absolute top-full left-0 mt-3 w-full bg-gray-200/75 dark:bg-stone-500/75 border border-neutral-400 dark:border-neutral-700 backdrop-blur-md rounded-sm lg:rounded-md xl:rounded-lg shadow-sm z-[75] max-h-80 overflow-y-auto'>
          <div className='p-1.5 xl:p-3'>{renderSearchResults()}</div>
        </div>
      )}
    </div>
  );
}
