"use client";
import { AboutHead, SocialLinks } from "@/components";
import { LinkService } from "@/services/link.service";
import React from "react";

const About = () => {
  
  return (
    <div className="space-y-2">
      <AboutHead />
      <SocialLinks />
    </div>
  );
};

export default About;
