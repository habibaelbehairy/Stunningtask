import React, { useState } from "react";
import { HeroContentProps } from "../types/HeroContent";
import { initialContent, generateRandomContent } from "../data/data";
import EditableText from "./EditableText";
import Button from "./Button";

const HeroSection: React.FC = () => {
  const [content, setContent] = useState<HeroContentProps>(initialContent);

  const handleRegenerateContent = () => {
    setContent(generateRandomContent());
  };

  const updateContent = (field: keyof HeroContentProps, value: string) => {
    setContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };

  return (
    <div className="relative overflow-hidden bg-white w-full h-full">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Main container */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Left column - Text content (always displays first on mobile) */}
          <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0 order-1">
            <div className="mb-6">
              <EditableText
                initialValue={content.headline}
                onChange={(value) => updateContent("headline", value)}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight"
                as="h1"
              />
            </div>

            <div className="mb-8">
              <EditableText
                initialValue={content.subheadline}
                onChange={(value) => updateContent("subheadline", value)}
                className="text-lg sm:text-xl text-slate-600 leading-relaxed"
                as="p"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-auto">
                <Button
                  onClick={() => window.open("#", "_blank")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center w-full sm:w-auto min-w-[160px] h-[46px]"
                >
                  <EditableText
                    initialValue={content.ctaButton}
                    onChange={(value) => updateContent("ctaButton", value)}
                    className="inline-block"
                    as="span"
                  />
                </Button>
              </div>

              <div className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  onClick={handleRegenerateContent}
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center w-full sm:w-auto min-w-[180px] h-[46px] whitespace-nowrap"
                >
                  Regenerate with AI
                </Button>
              </div>
            </div>
          </div>

          {/* Right column - Image (displays second on mobile) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end order-2 md:order-2">
            <div className="relative w-full max-w-[280px] md:max-w-[350px] aspect-square">
              <img
                src={content.image || "/robot.svg"}
                alt="AI Robot"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
