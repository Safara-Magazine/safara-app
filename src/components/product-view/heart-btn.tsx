// 'use client';

// import { useFavoritesStore } from '@/store/favoritesStore';
// import { Heart } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface HeartButtonProps {
//   productId: string;
//   className?: string;
//   size?: number;
// }

// export default function HeartButton({ productId, className, size = 20 }: HeartButtonProps) {
//   const { toggleFavorite, isFavorite } = useFavoritesStore();
//   const active = isFavorite(productId);

//   return (
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         toggleFavorite(productId);
//       }}
//       aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
//       className={cn(
//         'transition-transform duration-150 hover:scale-110 active:scale-95',
//         className
//       )}
//     >
//       <Heart
//         size={size}
//         className={cn(
//           'transition-colors duration-200',
//           active ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400 fill-transparent'
//         )}
//       />
//     </button>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeartButtonProps {
  productId: string;
  size?: number;
  className?: string;
}

export default function HeartButton({ productId, size = 24 }: HeartButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Run ONLY on client, AFTER hydration
  useEffect(() => {
    setMounted(true);

    const favorites = JSON.parse(
      localStorage.getItem('favorites') ?? '[]'
    );

    setIsFavorite(favorites.includes(productId));
  }, [productId]);

  // 🔒 Prevent mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Add to favorites"
        className="transition-transform duration-150"
      >
        <Heart
          size={size}
          className="stroke-gray-400 transition-colors duration-200"
        />
      </button>
    );
  }

  return (
    <button
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => {
        const favorites = JSON.parse(
          localStorage.getItem('favorites') ?? '[]'
        );

        const updated = isFavorite
          ? favorites.filter((id: string) => id !== productId)
          : [...favorites, productId];

        localStorage.setItem('favorites', JSON.stringify(updated));
        setIsFavorite(!isFavorite);
      }}
      className="transition-transform duration-150 hover:scale-110 active:scale-95"
    >
      <Heart
        size={size}
        className={cn(
          'transition-colors duration-200',
          isFavorite
            ? 'fill-red-500 stroke-red-500'
            : 'stroke-gray-400'
        )}
      />
    </button>
  );
}
