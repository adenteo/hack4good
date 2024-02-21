'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { getAllFeedback } from '@/lib/actions/get-all-feedback';
import { FeedbackType } from '@/models/Feedback';
import React from 'react';
import Image from 'next/image';
import ExpandableText from '@/components/ui/expandable-text';
import { MessageSquareHeart } from 'lucide-react';

export default function Blogs() {
  const [feedbackList, setFeedbackList] = React.useState<FeedbackType[]>([]);
  React.useEffect(() => {
    const fetchActivities = async () => {
      const feedbacks = await getAllFeedback();
      const feedbacksJson = JSON.parse(feedbacks);
      setFeedbackList(feedbacksJson);
    };
    fetchActivities();
  }, []);
  return (
    <div className="p-6 sm:p-10 max-w-[100vw]">
      <div className="mx-auto text-center lg:mb-4">
        <h1 className="font-medium text-xl">Your Voice, Your Experiences</h1>
        <p className="mb-2">Share and Discover Together!</p>
      </div>
      <div className="flex flex-col justify-center items-center md:grid md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
        {feedbackList.map((feedbackItem, index) => (
          <div className="p-2" key={index}>
            <figure className="border h-auto rounded-2xl shadow-md md:min-h-[65vh]">
              <div className="overflow-hidden rounded-t-md mb-2">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  {feedbackItem.image && (
                    <Image
                      src={feedbackItem.image}
                      alt={`Image for ${feedbackItem.image}`}
                      fill
                      className="rounded-t-md object-cover"
                    />
                  )}
                </AspectRatio>
              </div>
              <figcaption className="px-4">
                <div className="flex justify-between items-center mt-4">
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-lg mt-1 mb-2">
                      {feedbackItem.title}
                    </p>
                  </div>
                </div>
                <div>
                  <MessageSquareHeart strokeWidth={1.4} color="#ef4444" />
                  <p className="text-gray-600 text-xs font-light overflow-hidden text-ellipsis text-start pb-4 pt-1">
                    <ExpandableText text={feedbackItem.description} />
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}
