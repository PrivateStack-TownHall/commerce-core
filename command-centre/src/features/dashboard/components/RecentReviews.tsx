import { MessageSquareText, Star } from "lucide-react";

interface RecentReview {
  id: string;
  customer: string;
  product: string;
  application: string;
  rating: number;
  comment: string;
}

interface RecentReviewsProps {
  reviews: RecentReview[];
}

function RecentReviews({ reviews }: RecentReviewsProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-lg font-semibold">Recent Reviews</h2>

          <p className="text-sm text-slate-500">Latest customer feedback.</p>
        </div>

        <MessageSquareText className="h-5 w-5 text-primary" />
      </div>

      <div className="divide-y divide-slate-100">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 hover:bg-slate-50">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{review.customer}</h3>

                <p className="text-xs text-slate-500">
                  {review.product} • {review.application}
                </p>
              </div>

              <div className="flex">
                {Array.from({
                  length: review.rating,
                }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>

            <p className="line-clamp-2 text-sm text-slate-600">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentReviews;
