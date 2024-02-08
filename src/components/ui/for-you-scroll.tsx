import * as React from 'react';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { faker } from '@faker-js/faker';
import { Button } from './button';
import { CalendarFold, ChevronLeft, ChevronRight, Clock1 } from 'lucide-react';
import { TagColors } from '@/types/colors';
import { ActivityType, ExtendedActivityType } from '@/models/Activity';
import { format, parseISO } from 'date-fns';
import { AspectRatio } from './aspect-ratio';

interface ForYouScrollProps {
  activities: ExtendedActivityType[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const avatarUrls = [
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export const ForYouScroll: React.FC<ForYouScrollProps> = ({
  activities,
  setPage,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null); // Create a ref for the scroll container

  const handleScroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2;
      const secondChild = scrollContainerRef.current.children[1];
      // Scroll the container by 100px to the right
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
      className="w-full whitespace-nowrap rounded-md border-none p-2 group"
      ref={scrollContainerRef}
    >
      <Button
        onClick={() => {
          handleScroll('left');
        }}
        className="absolute left-5 p-6 top-1/2 rounded-full shadow-2xl bg-gray-200 hover:bg-gray-300 hidden group-hover:sm:flex items-center justify-center"
        size={'icon'}
      >
        <div>
          <ChevronLeft className="text-gray-700" />
        </div>
      </Button>
      <div className="flex w-max space-x-4 md:space-x-6 lg:space-x-16">
        {activities.map((activity, index) => {
          const date = parseISO(activity.startTime);
          const formattedDate = format(date, 'MMMM d yyyy');
          return (
            <Link
              className="p-2"
              key={index}
              href={`/activities/${encodeURIComponent(activity._id)}`}
              passHref
            >
              <button key={index} className="border rounded-2xl shadow-md">
                <figure key={index} className="w-[280px]">
                  <div className="overflow-hidden rounded-t-md mb-2">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <Image
                        src={activity.image}
                        alt={`Image for ${activity.title}`}
                        fill
                        className="rounded-t-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <figcaption className="px-2">
                    <div className="flex my-1 space-x-2">
                      {Array.isArray(activity.tags) &&
                        activity.tags.slice(0, 3).map((tag, index) => (
                          <div
                            key={index}
                            className={`text-[0.6rem] text-black rounded-md p-1 px-2 font-semibold my-1 ${faker.helpers.enumValue(
                              TagColors,
                            )}`}
                          >
                            {tag}
                          </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-2 ">
                      <div className="text-left overflow-hidden">
                        <div className="flex justify-start items-center">
                          <CalendarFold size={15} />
                          <p className="text-xs font-semibold ml-1">
                            {formattedDate}
                          </p>
                        </div>
                        <p className="font-semibold text-foreground text-lg mt-1 overflow-hidden text-ellipsis">
                          {activity.title}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-light overflow-hidden text-ellipsis text-start">
                      {activity.description}
                    </p>
                    <div className="flex justify-between my-1">
                      <div
                        className="avatar-group -space-x-3 rtl:space-x-reverse"
                        data-theme="light"
                      >
                        {avatarUrls.map((avatar, index) => (
                          <div key={index} className="avatar">
                            <div className="w-6 border-none lg:w-8">
                              <img src={avatar} alt={`Avatar ${index + 1}`} />
                            </div>
                          </div>
                        ))}
                        <div className="avatar placeholder" data-theme="light">
                          <div className="w-6 bg-blue-100 text-black lg:w-8">
                            <span className="text-[0.6rem] lg:text-xs">
                              +{activity.attendees.length}
                            </span>
                          </div>
                        </div>
                      </div>
                      <br />
                    </div>
                  </figcaption>
                </figure>
              </button>
            </Link>
          );
        })}

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
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
