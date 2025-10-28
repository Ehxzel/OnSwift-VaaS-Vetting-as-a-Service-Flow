import BackendAssessment from "./backend-dev";
import ContentWritingAssessment from "./content-writing";
import CopywritingAssessment from "./copywriting";
import FrontendAssessment from "./frontend-dev"
import GraphicsDesignAssessment from "./graphics-design";
import ProductDesignAssessment from "./product-design";
import SocialMediaMgntAssessment from "./social-media-mgnt";
import VideoEditingAssessment from "./video-editing";
import VirtualAssistantAssessment from "./virtual-assistant";

const assessments: Record<string, any> = {
    // attaching the key value Pair, between the key for calling vetting questions from niche and export name
  "backend-dev": BackendAssessment,
  "contentwriting": ContentWritingAssessment,
  "copywriting": CopywritingAssessment,
  "frontend-dev": FrontendAssessment,
  "graphics-design": GraphicsDesignAssessment,
  "product-design": ProductDesignAssessment,
  "social-media-mgnt": SocialMediaMgntAssessment,
  "video-editing": VideoEditingAssessment,
  "virtual-assistant": VirtualAssistantAssessment
};

export default assessments;