'use client';
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { motion } from "framer-motion";
import { useTestimonials } from "@/app/lib/api/useTestimonials";

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Reviews() {
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const { data: reviews = [], isLoading: reviewsLoading } = useTestimonials(4);

  const toggleReview = (reviewId: number) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  return (
    <section className="w-full items-center gap-6 sm:gap-8 px-0 py-8 sm:py-10 bg-[#ffffff] flex flex-col">
      <motion.div
        className="flex flex-col items-start gap-6 sm:gap-8 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="flex flex-col items-start gap-6 sm:gap-8 w-full">
          <div className="max-w-[800px] items-start flex flex-col gap-4 sm:gap-5 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <Badge
                variant="secondary"
                className="text-[#016aa2] font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)] bg-transparent border-0 p-0 h-auto"
              >
                Customer Reviews
              </Badge>

              <h2 className="font-[number:var(--display-md-semibold-font-weight)] text-gray-900 text-[length:var(--display-md-semibold-font-size)] tracking-[var(--display-md-semibold-letter-spacing)] leading-[var(--display-md-semibold-line-height)] font-display-md-semibold [font-style:var(--display-md-semibold-font-style)] text-2xl sm:text-3xl md:text-4xl">
                Opus Virtual Office Reviews
              </h2>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex max-w-screen-xl items-center gap-[60px] px-4 sm:px-6 md:px-8 py-0 w-full"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {reviewsLoading ? (
            // Loading skeleton
            [...Array(4)].map((_, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="items-start justify-center gap-3 p-3 bg-gray-50 rounded-lg border-[1.5px] border-solid border-[#eaecf0] h-[200px] animate-pulse">
                  <CardContent className="flex flex-col gap-3 p-0 w-full">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-full"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            reviews.map((review) => {
              const isExpanded = expandedReviews.has(review.id);

              return (
                <motion.div key={review.id} variants={fadeInUp}>
                  <Card
                    className="items-start justify-center gap-3 p-3 bg-gray-50 rounded-lg border-[1.5px] border-solid border-[#eaecf0]"
                    data-testid={`review-${review.id}`}
                  >
                    <CardContent className="flex flex-col gap-3 p-0 w-full">
                      <div className="flex items-start gap-1 w-full">
                        <img
                          className="w-[52px] h-[52px]"
                          alt="Google"
                          src="/figmaAssets/google.svg"
                          width="52"
                          height="52"
                          loading="lazy"
                        />

                        <div className="flex flex-col items-start flex-1">
                          <p className="font-text-lg-semibold font-[number:var(--text-lg-semibold-font-weight)] text-gray-900 text-[length:var(--text-lg-semibold-font-size)] tracking-[var(--text-lg-semibold-letter-spacing)] leading-[var(--text-lg-semibold-line-height)] [font-style:var(--text-lg-semibold-font-style)]">
                            Google Review
                          </p>

                          <div className="inline-flex items-start gap-1">
                            {[...Array(5)].map((_, starIndex) => (
                              <div
                                key={starIndex}
                                className="w-[18px] h-[18px] overflow-hidden"
                              >
                                <img
                                  className="w-full h-full"
                                  alt="Star"
                                  src={starIndex < review.rating ? "/figmaAssets/star-filled.svg" : "/figmaAssets/star-background.svg"}
                                  width="18"
                                  height="18"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="inline-flex items-end justify-center gap-2">
                          <span className="font-display-sm-display-md-semibold font-[number:var(--display-sm-display-md-semibold-font-weight)] text-gray-600 text-[length:var(--display-sm-display-md-semibold-font-size)] tracking-[var(--display-sm-display-md-semibold-letter-spacing)] leading-[var(--display-sm-display-md-semibold-line-height)] whitespace-nowrap [font-style:var(--display-sm-display-md-semibold-font-style)]">
                            {review.rating}
                          </span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-col items-center justify-center gap-2 w-full">
                        <p className="font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-[#3d455a] text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] w-full [font-style:var(--text-sm-text-md-semibold-font-style)]">
                          {review.reviewerName}
                        </p>

                        <p
                          className={`font-text-sm-text-md-regular font-[number:var(--text-sm-text-md-regular-font-weight)] text-[#3d455a] text-[length:var(--text-sm-text-md-regular-font-size)] tracking-[var(--text-sm-text-md-regular-letter-spacing)] leading-[var(--text-sm-text-md-regular-line-height)] w-full [font-style:var(--text-sm-text-md-regular-font-style)] ${!isExpanded ? 'line-clamp-3' : ''}`}
                        >
                          {review.reviewText}
                        </p>

                        <button
                          onClick={() => toggleReview(review.id)}
                          className="font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-[#016aa2] text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] w-full [font-style:var(--text-sm-text-md-semibold-font-style)] text-left hover:underline"
                        >
                          {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col max-w-screen-xl items-start justify-center gap-2 px-4 sm:px-6 md:px-8 py-0 w-full"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Link href="/reviews/" prefetch={false}>
          <Button
            variant="ghost"
            className="h-auto gap-1 pl-0 pr-3 py-0 rounded-lg overflow-hidden"
            data-testid="button-more-reviews"
          >
            <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-gray-600 text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] whitespace-nowrap [font-style:var(--text-sm-semibold-font-style)]">
              Read More Reviews
            </span>
            <img
              className="w-5 h-5"
              alt="Arrow narrow right"
              src="/figmaAssets/arrow-narrow-right.svg"
              width="20"
              height="20"
              loading="lazy"
            />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
