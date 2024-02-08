import * as React from 'react';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { getAllActivitiesPagination } from '@/lib/actions/get-all-activities-pagination';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ActivityType, ExtendedActivityType } from '@/models/Activity';
import { AspectRatio } from './aspect-ratio';

interface ScrollAreaHorizontalDemoProps {
  activities: ExtendedActivityType[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const avatarUrls = [
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
];

export const FeaturedScroll: React.FC<ScrollAreaHorizontalDemoProps> = ({
  activities,
  setPage,
}: ScrollAreaHorizontalDemoProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null); // Create a ref for the scroll container
  const handleScroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2;
      const secondChild = scrollContainerRef.current.children[1];
      secondChild.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleEndOfScroll = () => {
    setPage((prev) => prev + 1);
  };

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current?.children[1];
    const checkIfScrolledToEnd = () => {
      if (!scrollContainer) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      if (scrollLeft + clientWidth >= scrollWidth) {
        handleEndOfScroll();
      }
    };

    scrollContainer?.addEventListener('scroll', checkIfScrolledToEnd);

    return () => {
      scrollContainer?.removeEventListener('scroll', checkIfScrolledToEnd);
    };
  }, []);

  return (
    <ScrollArea
      className="w-full whitespace-nowrap rounded-md border-none p-4 group"
      ref={scrollContainerRef}
    >
      <Button
        onClick={() => {
          handleScroll('left');
        }}
        className="z-50 absolute left-5 p-6 top-1/2 rounded-full shadow-2xl bg-gray-200 hover:bg-gray-300 hidden group-hover:sm:flex items-center justify-center"
        size={'icon'}
      >
        <div>
          <ChevronLeft className="text-gray-700" />
        </div>
      </Button>
      <div className="flex w-max space-x-4 md:space-x-6 lg:space-x-16">
        {activities.map((activity, index) => (
          <Link
            key={index}
            href={`/activities/${encodeURIComponent(activity._id)}`}
            passHref
          >
            <button key={index} className="rounded-xl relative shadow-md">
              <figure key={index} className="shrink-0">
                <div className="overflow-hidden lg:rounded-md">
                  <div className="relative shadow-lg">
                    <Image
                      src={activity.image}
                      alt={`Image for ${activity.title}`}
                      className="w-full h-72 md:h-80 lg:h-96 rounded-md filter brightness-75"
                      width={300}
                      height={600}
                    />
                    <div className="absolute top-[9.7rem] left-4 right-0 bottom-0 md:top-48 lg:top-60">
                      <div className="flex mb-1">
                        {Array.isArray(activity.tags) &&
                          activity.tags.slice(0, 3).map((tag, index) => (
                            <div
                              key={index}
                              className="text-[0.6rem] text-white border border-white rounded-md p-1 px-2 mr-2"
                            >
                              {tag}
                            </div>
                          ))}
                      </div>
                      <p className="text-white text-lg font-medium text-left">
                        {activity.title}
                      </p>
                      <p className="text-white text-xs font-light text-left overflow-hidden text-ellipsis mr-4">
                        {activity.description}
                      </p>
                      <div className="mt-2">
                        <div
                          className="avatar-group bg-transparent -space-x-3"
                          data-theme="light"
                        >
                          {avatarUrls.map((avatar, index) => (
                            <div key={index} className="avatar">
                              <div className="w-5 border-none lg:w-8">
                                <img src={avatar} alt={`Avatar ${index + 1}`} />
                              </div>
                            </div>
                          ))}
                          <div
                            className="avatar placeholder"
                            data-theme="light"
                          >
                            <div className="w-5 text-black lg:w-8">
                              <span className="text-[0.65rem] lg:text-xs">
                                +{activity.attendees.length}
                              </span>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </figure>
            </button>
          </Link>
        ))}
      </div>
      <Button
        onClick={() => {
          handleScroll('right');
        }}
        className="absolute right-5 p-6 top-1/2 rounded-full shadow-2xl bg-gray-200 hover:bg-gray-300 hidden group-hover:sm:flex items-center justify-center"
        size={'icon'}
      >
        <div>
          <ChevronRight className="text-gray-700" />
        </div>
      </Button>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
