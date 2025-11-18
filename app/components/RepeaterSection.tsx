"use client";

import React from "react";
import { TextWithImage } from "@/app/locations/components/text-with-image";
import LocationsContent from "@/app/locations/components/content";
import CallToAction from "@/app/locations/components/call-to-action";

export interface RepeaterItem {
  title?: string;
  body?: string;
  image?: string;
  layout: "image_text" | "text_only" | "cta_block";
  imageAlignment?: "left" | "right";
}

interface RepeaterProps {
  items: RepeaterItem[];
  cityName: string;
  locId: string;
  price?: number;
}

export function RepeaterSection({ items, cityName, locId, price = 99 }: RepeaterProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((item, index) => {
        if (item.layout === "cta_block") {
          return <CallToAction key={`cta-${index}`} cityName={cityName} locId={locId} price={price} />;
        }

        if (item.layout === "text_only" && item.body) {
          const bodyText = item.body;
          const paragraphs = bodyText.split("\n\n");
          let firstColumn = "";
          let secondColumn = "";

          if (paragraphs.length >= 2) {
            const midPoint = Math.ceil(paragraphs.length / 2);
            firstColumn = paragraphs.slice(0, midPoint).join("\n\n").trim();
            secondColumn = paragraphs.slice(midPoint).join("\n\n").trim();
          } else {
            const sentences = bodyText.split(/\.(?=\s+[A-Z])/);
            const midPoint = Math.ceil(sentences.length / 2);
            firstColumn = sentences.slice(0, midPoint).join(". ").trim() + (sentences.length > 1 ? "." : "");
            secondColumn = sentences.slice(midPoint).join(". ").trim();
          }

          return (
            <LocationsContent
              key={`text-only-${index}`}
              heading={item.title || ""}
              description={firstColumn}
              body={secondColumn}
            />
          );
        }

        if (item.layout === "image_text" && item.title && item.body && item.image) {
          const reversed = item.imageAlignment !== "right";

          const getImageUrl = (imagePath: string) => {
            if (!imagePath) return "";
            if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
              return imagePath;
            }
            return `https://www.opusvirtualoffices.com${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
          };

          return (
            <TextWithImage
              key={`image-text-${index}`}
              title={item.title}
              body={item.body}
              image={getImageUrl(item.image)}
              reversed={reversed}
            />
          );
        }

        return null;
      })}
    </>
  );
}