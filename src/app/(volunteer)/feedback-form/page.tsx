'use client';

import { FeedbackForm } from '@/components/feedback-form';
import { MessageCircleHeart } from 'lucide-react';

export default function SignUpFormPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-center items-center mb-14 text-center">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-semibold">
            Share your experience with us
          </h1>
          <p className="text-base">Your feedback is extremely valuable to us</p>
        </div>

        <div className="ml-4">
          <MessageCircleHeart size={32} />
        </div>
      </div>

      <FeedbackForm />
    </div>
  );
}
