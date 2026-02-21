import type { HeroNode, NodeExtent, AIModel, Tool, WorkflowCard, FooterColumn, SocialLink, NavLink, ParallaxImage, ChipPosition } from '../components/sections/types';

// Hero nodes (desktop)
// https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd65ba87c69df161752e5_3d_card.avif
export const NODES_DESKTOP: HeroNode[] = [
        {
        id: '1',
        type: 'imageNode',
        position: { x: 50, y: 550 },
        data: {
            label: 'RODIN 2.0',
            image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd65ba87c69df161752e5_3d_card.avif',
            width: 180,
            height: 220,
        },
    },
    {
        id: '2',
        type: 'imageNode',
        position: { x: 50, y: 950 },
        data: {
            label: 'COLOR REFERENCE',
            image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd77722078ff43fe428f3_hcard-color%20reference.avif',
            width: 180,
            height: 110,
        },
    },
    {
        id: '3',
        type: 'imageNode',
        position: { x: 380, y: 700 },
        data: {
            label: 'STABLE DIFFUSION',
            sublabel: 'IMAGE',
            image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd7cbc22419b32bb9d8d8_hcard%20-%20STABLE%20DIFFUSION.avif',
            width: 300,
            height: 420,
        },
    },
    {
        id: '4',
        type: 'textNode',
        position: { x: 850, y: 720 },
        data: {
            label: 'TEXT',
            text: "a Great-Tailed Grackle bird is flying from the background and seating on the model's shoulder slowly and barely moves. the model looks at the camera. then bird flies away. cinematic.",
            width: 220,
            opacity: 0.2,
        },
    },
    {
        id: '5',
        type: 'imageNode',
        position: { x: 850, y: 920 },
        data: {
            label: 'FLUX PRO 1.1',
            sublabel: 'IMAGE',
            image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6837510acbe777269734b387_bird_desktop.avif',
            width: 150,
            height: 220,
        },
    },
    {
        id: '6',
        type: 'videoNode',
        position: { x: 1200, y: 680 },
        data: {
            label: 'MINIMAX VIDEO',
            sublabel: 'VIDEO',
            video: 'https://assets.weavy.ai/homepage/hero/hero_video.mp4',
            width: 280,
            height: 420,
        },
    },
];

// Hero nodes (mobile)
export const NODES_MOBILE: HeroNode[] = [
    {
        id: '2',
        type: 'imageNode',
        position: { x: 20, y: 50 },
        data: {
            label: 'COLOR REFERENCE',
            image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd77722078ff43fe428f3_hcard-color%20reference.avif',
            width: 140,
            height: 80,
        },
    },
    {
        id: '3',
        type: 'imageNode',
        position: { x: 20, y: 400 },
        data: {
            label: 'STABLE DIFFUSION',
            sublabel: 'IMAGE',
            image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd7cbc22419b32bb9d8d8_hcard%20-%20STABLE%20DIFFUSION.avif',
            width: 150,
            height: 200,
        },
    },
    {
        id: '5',
        type: 'imageNode',
        position: { x: 200, y: 650 },
        data: {
            label: 'FLUX PRO 1.1',
            sublabel: 'IMAGE',
            image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6837510acbe777269734b387_bird_desktop.avif',
            width: 120,
            height: 160,
        },
    },
    {
        id: '6',
        type: 'videoNode',
        position: { x: 20, y: 900 },
        data: {
            label: 'MINIMAX VIDEO',
            sublabel: 'VIDEO',
            video: 'https://assets.weavy.ai/homepage/hero/hero_video.mp4',
            width: 250,
            height: 320,
        },
    },
];

// Hero edges
export const EDGES = [
    { id: 'e1-2', source: '1', target: '3', animated: false, style: { stroke: '#c5c5c0', strokeWidth: 1.5 } },
    { id: 'e2-3', source: '2', target: '3', animated: false, style: { stroke: '#c5c5c0', strokeWidth: 1.5 } },
    { id: 'e3-4', source: '3', target: '4', animated: false, style: { stroke: '#c5c5c0', strokeWidth: 1.5 } },
    { id: 'e3-5', source: '3', target: '5', animated: false, style: { stroke: '#c5c5c0', strokeWidth: 1.5 } },
    { id: 'e4-6', source: '4', target: '6', animated: false, style: { stroke: '#c5c5c0', strokeWidth: 1.5 } },
    { id: 'e5-6', source: '5', target: '6', animated: false, style: { stroke: '#c5c5c0', strokeWidth: 1.5 } },
];

// Node extent (desktop)
export const EXTENT_DESKTOP: NodeExtent = [
    [0, 600],
    [1600, 1200],
];

// Node extent (mobile)
export const EXTENT_MOBILE: NodeExtent = [
    [0, 0],
    [400, 1300],
];

// AI models
export const MODELS: AIModel[] = [
    { name: 'GPT img 1', type: 'image', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887e82ac8a8bb8139ebd_GPT_20img_201-12.avif' },
    { name: 'Wan', type: 'video', src: 'https://assets.weavy.ai/homepage/videos/wan.mp4' },
    { name: 'SD 3.5', type: 'image', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887d618a9071dd147d5f_SD_203_5-13.avif' },
    { name: 'Runway Gen-4', type: 'video', src: 'https://assets.weavy.ai/homepage/videos/runway_gen-4.mp4' },
    { name: 'Imagen 3', type: 'image', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887d65bf65cc5194ac05_Imagen_203-14.avif' },
    { name: 'Veo 3', type: 'video', src: 'https://assets.weavy.ai/homepage/videos/Veo2.mp4' },
    { name: 'Recraft V3', type: 'image', src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887eda73c12eaa4c3ed8_Recraft%20V3.avif' },
    { name: 'Kling', type: 'video', src: 'https://assets.weavy.ai/homepage/videos/kling.mp4' },
    { name: 'Flux Pro 1.1 Ultra', type: 'image', src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d8a7b4e937a86ea6a_Flux%20Pro%201.1%20Ultra.avif' },
    { name: 'Minimax video', type: 'video', src: 'https://assets.weavy.ai/homepage/videos/minimax_video.mp4' },
    { name: 'Ideogram V3', type: 'image', src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d9b7eb0abc91263b6_Ideogram%20V2.avif' },
    { name: 'Luma ray 2', type: 'video', src: 'https://assets.weavy.ai/homepage/videos/luma_ray_2.mp4' },
    { name: 'Minimax image 01', type: 'image', src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68258880f266d11a0748ab63_Minimax%20image%2001.avif' },
    { name: 'Hunyuan', type: 'video', src: 'https://assets.weavy.ai/homepage/videos/hunyuan.mp4' },
    { name: 'Bria', type: 'image', src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d59ff2f86b8fba523_Bria.avif' },
];

// Professional tools
export const TOOLS: Tool[] = [
    { id: 'invert', label: 'Invert', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563d93b3ce65b54f07b_Invert%402x.avif' },
    { id: 'outpaint', label: 'Outpaint', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6822456436dd3ce4b39b6372_Outpaint@2x.avif' },
    { id: 'crop', label: 'Crop', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563af147b5d7c2496ff_Crop@2x.avif' },
    { id: 'inpaint', label: 'Inpaint', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245634dee7dac1dc3ac42_Painter@2x.avif' },
    { id: 'mask', label: 'Mask Extractor', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563d5cb54c747f189ae_Mask@2x.avif' },
    { id: 'upscale', label: 'Upscale', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563290cc77eba8f086a_z%20depth%402x.avif' },
    { id: 'zdepth', label: 'Z Depth Extractor', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563290cc77eba8f086a_z%20depth@2x.avif' },
    { id: 'describer', label: 'Image Describer', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825ab42a8f361a9518d5a7f_Image%20describer@2x.avif' },
    { id: 'channels', label: 'Channels', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245646909d06ed8a17f4d_Channels@2x.avif' },
    { id: 'painter', label: 'Painter', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245634dee7dac1dc3ac42_Painter@2x.avif' },
    { id: 'relight', label: 'Relight', asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245638e6550c59d0bce8f_Upscale%402x.avif' },
];

// Default tool asset
export const TOOL_DEFAULT = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/68223c9e9705b88c35e76dec_Default_402x-20.avif';

// Workflow cards
export const WORKFLOWS: WorkflowCard[] = [
    { id: 'camera-angle', title: 'Camera Angle Control', image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681f925d9ecbfaf69c5dc170_Workflow%2004.avif' },
    { id: 'Wjnj', title: 'Weaave Logo', image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825b0ac314fefe464791808_Relight%202.0%20human.avif' },
    { id: 'relight-2-human', title: 'Relight 2.0 human', image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825b0acdb693fa2102f0af2_Weavy%20Logo.avif' },
    { id: 'wan-lora-rotate', title: 'Wan Lora – Rotate', image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825b0acc901ee5c718efc90_Wan%20Lora%20-%20Rotate.avif' },
    { id: 'multiple-models', title: 'Multiple Models', image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681f925d9ecbfaf69c5dc16a_Workflow%2002.avif' },
    { id: 'wan-lora-inflate', title: 'Wan LoRa Inflate', image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681f925d9ecbfaf69c5dc15e_Workflow%2001.avif' },
    { id: 'controlnet-structure', title: 'ControlNet – Structure', image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681f925d9ecbfaf69c5dc164_Workflow%2003.avif' },
    { id: 'relight-2-human', title: 'Relight Product', image: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825b0ac04c55a803826a6e5_Relight%20-%20Product.avif' },
];

// Footer navigation
export const FOOTER_NAV: FooterColumn[] = [
    {
        title: 'Get Started',
        links: [
            { label: 'REQUEST A DEMO', href: '/demo' },
            { label: 'PRICING', href: '/pricing' },
            { label: 'ENTERPRISE', href: '/enterprise' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'ABOUT', href: '/' },
            { label: 'CAREERS', href: '/' },
            { label: 'TRUST', href: '/' },
            { label: 'TERMS', href: '/' },
            { label: 'PRIVACY', href: '/' },
        ],
    },
    {
        title: 'Connect',
        links: [{ label: 'COLLECTIVE', href: '/' }],
    },
    {
        title: 'Resources',
        links: [{ label: 'KNOWLEDGE CENTER', href: '#' }],
    },
];

// Social links
export const SOCIALS: SocialLink[] = [
    { platform: 'LinkedIn', href: 'https://www.linkedin.com/company/weavy-ai', icon: 'linkedin' },
    { platform: 'Instagram', href: 'https://www.instagram.com/weavy_ai/', icon: 'instagram' },
    { platform: 'Twitter', href: 'https://x.com/Weaave_ai', icon: 'twitter' },
    { platform: 'Discord', href: 'https://discord.gg/jB6vn2ewxW', icon: 'discord' },
    { platform: 'YouTube', href: 'https://www.youtube.com/@Weaave-ai', icon: 'youtube' },
];

// Footer images
// Artist Collective Types and Data
export type Artist = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  heroImage: string;
  website?: string;
  linkedin?: string;
  bio?: string;
  highlight?: boolean; // yellow bio card
};

export const ARTISTS: Artist[] = [
  {
    id: 'yohan-wadia',
    name: 'Yohan Wadia',
    role: 'Gen AI Director & Innovation Strategist',
    bio: 'With 17+ years leading creative innovation at top agencies, Yohan has shaped campaigns for global brands like Nestlé, Philips, and Michelin. A regional leader in GenAI adoption, his Chupa Chups "AI World of Lollipops" was shortlisted at Cannes 2024 - setting a new standard for AI-powered brand storytelling.',
    avatar: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6834c90ff52bacda41499add_artist_avatar%2006.avif',
    heroImage: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683f4192a2d6323598cdc2fd_bira_sm_500.gif',
    website: 'https://linkedin.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'jovardi',
    name: 'Jovardi',
    role: 'Visual Storyteller & AI Explorer',
    bio: 'A cross-media artist blending live action, 2D, and 3D with kinetic energy. Jovardi\'s immersive aesthetic spans commercials and cinematic shorts — now evolving through generative AI at the edge of organic and digital craft.',
    avatar: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6834c90f3eaa511838092f30_artist_avatar%2005.avif',
    heroImage: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6834ce72fa6591cd656c404e_collective%20-%20main%20image%20%2005.avif',
    website: 'https://linkedin.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'edvard-toth',
    name: 'Edvard Toth',
    role: 'Creative Technologist & AI Workflow Architect',
    bio: 'With roots in game dev and interactive media, Edvard brings decades of experience leading creative tech at scale. Today, he pioneers artist-centric AI workflows for animation, gaming, and the next generation of creative tools.',
    avatar: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68360a79dd6bd55094b1700e_toth.avif',
    heroImage: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68590fe8522886627e3ae0db_Edvard_Weavy_DA.GIF',
    website: 'https://linkedin.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'arminas-valunas',
    name: 'Arminas Valunas',
    role: 'AI Creative Director & Educator',
    bio: 'Creative director and AI motion design expert with 10+ years in high-end animation and branding. Leads Armada Studio, where he pioneers workflows combining most advanced GenAI tools. Also teaches AI-powered storytelling to thousands of creators worldwide.',
    avatar: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683e93d2cd9549cb044f43de_arminas_profile_pic.avif',
    heroImage: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683e943a13355f4a0fce52f3_arminas_work.avif',
    website: 'https://linkedin.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'luka-tisler',
    name: 'Luka Tisler',
    role: 'Visual AI Specialist & Educator',
    bio: 'Founder of 6 Fingers and co-creator of Lighthouse Academy, Luka is a recognized expert in creative AI workflows. He trains top teams, advises leading studios, and builds advanced systems for image, video, and LoRA-based production at scale',
    avatar: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683f33529511918153ee32c8_luka.avif',
    heroImage: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683f3f1a0a7264d3480726ec_luka.avif',
    highlight: true,
    website: 'https://systematiq.ai',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'billy-boman',
    name: 'Billy Boman',
    role: 'Visual AI Artist & Creator',
    bio: 'Billy fuses high-end commercial work with creative AI education. He\'s created AI visuals for brands like Intel and Ballantine\'s, music artists from Lil Uzi to the Black Eyed Peas, and leads Sweden\'s top course on visual AI tools at Berghs.',
    avatar: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6834c90ff52bacda41499ac3_artist_avatar%2008.avif',
    heroImage: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683f42429c13731e76d777db_billy.avif',
    website: 'https://linkedin.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'rory-flynn',
    name: 'Rory Flynn',
    role: 'AI Strategist & Creative',
    bio: 'Founder of Systematiq.ai, Rory helps creative teams embed AI into real workflows - from scaling content to automating performance. Former Head of Client Acquisition at Tetra, where he helped clients increase marketing production to the tune of $100M+ in sales',
    avatar: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683ea068e7d18f6eef93c786_rory_prof_pic.avif',
    heroImage: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683f43f6d53670425a46a698_Rory_sq.avif',
    website: 'https://linkedin.com',
    linkedin: 'https://linkedin.com',
  },
];

export const FOOTER_IMAGES = {
    logo: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68222dc898cffdbd87733f23_footer-logo%2Btagline%20DESKTOP.svg',
    soc2Badge: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/69398e51b66cfd37e959fee4_image-SOC2_weavy.avif',
};

// Navigation items
export const NAV_ITEMS: NavLink[] = [
    { label: 'COLLECTIVE', href: '/collective' },
    { label: 'ENTERPRISE', href: '/enterprise' },
    { label: 'PRICING', href: '/pricing' },
    { label: 'REQUEST A DEMO', href: '/demo' },
    { label: 'SIGN IN', href: '/sign-in' },
];

// Navigation images
export const NAV_IMAGES = {
    logoDesktop: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/682350d42a7c97b440a58480_Nav_20left_20item_20-_20D-1.svg',
    logoMobile: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/682b76283538127bf3907ded_Frame_20427321089-2.svg',
    figmaIcon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/69032e91ec29a8f27508fa9c_Image-Figma_acc-1.avif',
};

// Parallax images
export const PARALLAX: ParallaxImage[] = [
    {
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e4018d126165811a7b_Astro.avif',
        alt: 'Astronaut',
        className: 'absolute w-[70%] h-auto object-contain translate-y-[-20%]',
        left: '18%',
        top: '-5%',
        baseX: -3,
        baseY: 1.3,
        scrollMultiplier: [-5, -2],
        mouseMultiplier: 30,
        additionalTransform: 'rotateZ(-1deg)',
    },
    {
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e3553ccb7b1eac8758_text%20-%20in%20astro.svg',
        alt: 'Text Layer',
        className: 'z-20 absolute w-[30%] h-auto object-contain translate-y-[-20%]',
        left: '40%',
        top: '50%',
        baseX: -11,
        baseY: 20,
        scrollMultiplier: [-15, -10],
        mouseMultiplier: 50,
        zIndex: 60,
    },
    {
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682eecb4b45672741cafa0f6_phone.avif',
        alt: 'Phone Interface',
        className: ' z-20 absolute w-[22%] h-auto object-contain blur-[2px] translate-x-[100%] translate-y-[-30%]',
        left: '65%',
        top: '30%',
        baseX: -19,
        baseY: 5.7,
        scrollMultiplier: [-25, -8],
        mouseMultiplier: -80,
        zIndex: 70,
    },
];

// Chip positions
export const CHIP_POSITIONS: ChipPosition[] = [
    { toolId: 'invert', top: '25%', left: '25%' },
    { toolId: 'outpaint', top: '35%', left: '15%' },
    { toolId: 'inpaint', top: '50%', left: '26%' },
    { toolId: 'mask extractor', top: '44%', left: '5%' },
    { toolId: 'painter', top: '25%', right: '25%' },
    { toolId: 'channels', top: '35%', right: '15%' },
    { toolId: 'relight', top: '50%', right: '26%' },
];
