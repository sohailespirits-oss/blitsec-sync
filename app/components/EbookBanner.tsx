'use client';
import { MailIcon } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { motion } from "framer-motion";

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

const bgCtaPromoImg = "/bg-cta-promo_1761591480531.webp";
const man_holding_tablet = "/man-holding-tablet.webp";

export function EbookBanner() {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-8 sm:gap-12 md:gap-16 px-0 py-10 sm:py-12 md:py-[60px] bg-basewhite">
      <motion.div
        className="items-center justify-center flex max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8 p-6 sm:p-8 md:px-10 lg:px-16 md:py-5 flex-1 rounded-2xl overflow-hidden shadow-shadows-shadow-md bg-cover bg-center relative" style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.67), rgba(255, 255, 255, 0.67)), url(${bgCtaPromoImg})` }}>
          <div className="flex flex-col items-start justify-center gap-4 sm:gap-5 flex-1 w-full lg:w-auto max-w-[730px]">
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              <Badge
                variant="secondary"
                className="text-[#0086C9] font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)] bg-transparent border-0 p-0 h-auto w-fit"
              >
                Get your Free Ebook
              </Badge>

              <h2 className="font-semibold text-[#3d455a] text-2xl sm:text-3xl md:text-4xl tracking-[-0.72px] leading-tight lg:leading-[44px] [font-family:'Inter',Helvetica]">
                6-Steps for Starting a Business
              </h2>

              <p className="[font-family:'Inter',Helvetica] font-[20px] leading-[30px]  text-gray-900 text-base sm:text-lg md:text-xl tracking-normal lg:leading-[30px]">
                Your Complete Guide to Building a Successful Business<br></br>
                Foundation with Confidence
              </p>
            </div>

            <div className="flex flex-col sm:flex-row max-w-[600px] w-full items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-start gap-1.5 flex-1 w-full">
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <div className="flex items-center gap-2 px-3.5 py-3 w-full bg-[#ffffff] rounded-lg border border-solid shadow-[0px_1px_2px_#0a0c120d] h-[48px]">
                    <MailIcon className="w-5 h-5 text-gray-500" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 border-0 shadow-none p-0 h-auto [font-family:'Inter',Helvetica] font-normal text-[#717680] text-base tracking-[0] leading-normal focus-visible:ring-0 focus-visible:ring-offset-0"
                      data-testid="input-email-ebook"
                    />
                  </div>
                </div>

                <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-gray-600 text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>

              <Button className="h-[48px] inline-flex items-center justify-center gap-1.5 px-[18px] py-3 w-full sm:w-auto bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)]" data-testid="button-get-ebook">
                Get your Ebook
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 relative overflow-hidden -mb-5 -mr-16 items-center justify-center">
            <img
              className="w-[304px] h-full object-cover object-center"
              alt="Asian man portrait"
              src={man_holding_tablet}
              width="304"
              height="324"
              loading="lazy"
              style={{ display: 'block', minHeight: '324px' }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
