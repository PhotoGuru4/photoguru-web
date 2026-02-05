import { Sparkles } from 'lucide-react';
import { Heading, Text, Button } from '@shared/components/common';
import logo from '@assets/logo.png';
import React from 'react';

interface BrandingPanelProps {
  title: React.ReactNode;
  description: string;
  ctaText: string;
  onCtaClick?: () => void;
  badgeText?: string;
}

export const BrandingPanel = ({
  title,
  description,
  ctaText,
  onCtaClick,
}: BrandingPanelProps) => {
  return (
    <div className="hidden lg:flex relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-linear-to-b from-pink-300 via-pink-400 to-pink-300" />

      <div className="relative z-10 flex flex-col w-full p-8">
        <div className="flex items-center gap-3">
          <div className="bg-white/30 rounded-full p-2">
            <img src={logo} className="w-12 h-12" />
          </div>
          <div>
            <Heading level={3} color="white" className="font-semibold">
              PhotoGuru
            </Heading>
            <Text variant="small" color="white" className="opacity-80">
              Professional Platform
            </Text>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-1.5 mb-10">
            <Sparkles className="w-4 h-4 text-white" />
            <Text variant="small" color="white">
              Trusted by 10,000+ Photographers
            </Text>
          </div>

          <Heading
            level={2}
            color="white"
            className="text-5xl font-serif italic mb-6 leading-tight"
          >
            {title}
          </Heading>

          <Text
            variant="small"
            color="white"
            align="center"
            className="opacity-90 mb-10"
            maxWidth="22rem"
          >
            {description}
          </Text>

          <Button
            unstyled
            onClick={onCtaClick}
            className="px-10 py-1.5 rounded-full border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
};

