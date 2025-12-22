'use client'; // 👈 必须加这一行，因为我们用了交互动画

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, Instagram, Twitter, Globe, MoveRight, ArrowDown, Linkedin, User } from 'lucide-react';

// --- 数据部分 ---

const PROFILE_DATA = {
  title: "Li Yongze",
  subtitle: "Profile & Philosophy",
  description: "私は言語学的なアプローチを用いて、情報の優先順位や導線を論理的に設計し、ユーザーの認知負荷を最小限に抑える「摩擦のないコミュニケーション」を追求しています。独学で習得したコーディングスキル（HTML/CSS/JS/Java）を活かし、実装可能性まで考慮した、手触りのある課題解決を提供します。",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  skills: {
    design: ["Photoshop", "Illustrator", "Figma"],
    engineering: ["Java", "HTML / CSS", "JavaScript"],
    research: ["Conversation Analysis", "User Interview"]
  }
};

const PROJECTS = [
  {
    id: 1,
    title: "Times Car Share",
    subtitle: "UI/UX改善案",
    category: "UI/UX Design / Research",
    year: "2024",
    description: "言語学的アプローチに基づき、ユーザーの認知負荷を低減するインターフェースの再設計提案。操作フローの「文法」を整えることで、迷いのない体験を実現しました。",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#F4F4F0",
    textColor: "#111"
  },
  {
    id: 2,
    title: "Community Re-Connect",
    subtitle: "伝統文化 × デジタル",
    category: "Web Design / Social",
    year: "2023",
    description: "地域の伝統文化をデジタルでアーカイブし、多世代間の交流を生み出すプラットフォーム。過去と現在を「リンク」させる視覚言語を構築。",
    image: "https://images.unsplash.com/photo-1536697246787-1d7c477c22f3?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#Eaeae6", 
    textColor: "#111"
  },
  {
    id: 3,
    title: "SO COFFEE",
    subtitle: "Brand Identity",
    category: "Branding / Web",
    year: "2023",
    description: "「対話が生まれる一杯」をコンセプトにした架空のコーヒーブランド。パッケージからECサイトまで、一貫したトーン＆マナーで設計。",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#F4F4F0",
    textColor: "#111"
  },
  {
    id: 4,
    title: "Experiments",
    subtitle: "Coding & Design",
    category: "Creative Coding",
    year: "2022-24",
    description: "HTML/CSS/JS/Javaを用いたコーディングの習作や、小規模なデザインの実験記録。実装の限界を探るためのサンドボックス。",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#Eaeae6",
    textColor: "#111"
  }
];

// --- 组件部分 ---

const Marquee = ({ text, direction = 'left' }) => {
  return (
    <div className="w-full overflow-hidden border-b border-[#111] bg-[#F4F4F0] text-[#111] py-3 flex relative z-50 font-mono">
      {/* Next.js 支持 style jsx 写法，非常方便 */}
      <style jsx>{`
          @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .animate-marquee-left { animation: marquee-left 30s linear infinite; }
          .animate-marquee-right { animation: marquee-right 30s linear infinite; }
          .stroke-text { -webkit-text-stroke: 0.5px #111; }
      `}</style>
      <div className={`whitespace-nowrap flex ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        {[...Array(8)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-sm md:text-base font-bold uppercase tracking-widest mx-6">{text}</span>
            <span className="text-sm md:text-base font-bold uppercase tracking-widest mx-6 text-transparent stroke-text">{text}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const StickyProfileCard = ({ index }) => {
  return (
    <div 
      id="about"
      className="sticky top-0 w-full min-h-screen flex flex-col lg:flex-row border-t border-[#111] overflow-hidden bg-[#111] text-[#F4F4F0]"
      style={{ zIndex: index + 10 }}
    >
      <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#333] relative">
         <div>
            <div className="flex items-center gap-4 mb-12">
               <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
               <h2 className="font-mono text-sm uppercase tracking-wider opacity-60">Introduction</h2>
            </div>
            
            <div className="w-48 h-48 md:w-64 md:h-64 mb-8 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border-2 border-[#F4F4F0] rounded-sm">
                <img src={PROFILE_DATA.image} alt={PROFILE_DATA.title} className="w-full h-full object-cover" />
            </div>
            
            <h3 className="font-serif text-4xl md:text-5xl font-black mb-2 tracking-tight">{PROFILE_DATA.title}</h3>
            <p className="font-mono text-lg uppercase tracking-widest opacity-80">Based in Aichi</p>
        </div>
        
        <div className="mt-8 font-mono text-sm opacity-60">
          <p>Available for freelance projects <br/> & full-time opportunities.</p>
        </div>
      </div>

      <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#111]">
         <div className="max-w-2xl">
            <h2 className="font-mono text-xs uppercase tracking-widest mb-8 text-[#F4F4F0]/50 border-b border-[#333] pb-4">Philosophy</h2>
            <p className="text-lg md:text-xl leading-loose font-medium font-serif mb-16 text-[#F4F4F0]/90">
              {PROFILE_DATA.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-sm">
              <div>
                <h4 className="font-bold mb-4 uppercase text-green-500 pb-2 inline-block tracking-wider">Design</h4>
                <ul className="space-y-3 mt-2 opacity-80">
                  {PROFILE_DATA.skills.design.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 uppercase text-green-500 pb-2 inline-block tracking-wider">Engineering</h4>
                <ul className="space-y-3 mt-2 opacity-80">
                  {PROFILE_DATA.skills.engineering.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div>
                  <h4 className="font-bold mb-4 uppercase text-green-500 pb-2 inline-block tracking-wider">Research</h4>
                <ul className="space-y-3 mt-2 opacity-80">
                  {PROFILE_DATA.skills.research.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const StickyProjectCard = ({ project, index, total, baseIndex }) => {
  return (
    <div 
      className="sticky top-0 w-full h-screen flex flex-col md:flex-row border-t border-[#111] overflow-hidden"
      style={{ 
        backgroundColor: project.bgColor, 
        color: project.textColor,
        zIndex: baseIndex + index
      }}
    >
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between h-[45vh] md:h-full relative border-b md:border-b-0 md:border-r border-[#111]">
        
        <div className="flex justify-between items-start font-mono text-sm opacity-60">
          <span>Case Study {String(project.id).padStart(2, '0')}</span>
          <span className="border border-current px-2 py-0.5 rounded-full">{project.year}</span>
        </div>

        <div className="flex flex-col justify-center flex-grow py-6 md:py-0">
          <h3 className="font-serif text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter">
            {project.title}
          </h3>
          <p className="font-mono text-lg md:text-xl uppercase tracking-widest opacity-70 mb-8 border-l-2 border-[#111] pl-4">
            {project.subtitle}
          </p>
          <div className="max-w-md">
             <p className="font-serif text-base md:text-lg leading-loose font-medium opacity-90">
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="font-mono text-xs uppercase tracking-wider opacity-60">
            {project.category}
          </div>
          <div className="group flex items-center gap-2 cursor-pointer font-bold font-mono text-sm uppercase tracking-wide bg-[#111] text-[#F4F4F0] px-6 py-3 rounded-full hover:scale-105 transition-transform">
            View Case <ArrowUpRight size={18} />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-[55vh] md:h-full relative overflow-hidden group">
         <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
         <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 filter grayscale group-hover:grayscale-0"
         />
      </div>
    </div>
  );
};

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F4F4F0] text-[#111] selection:bg-[#111] selection:text-[#F4F4F0] font-serif min-h-screen">
      
      {/* 顶部跑马灯 */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Marquee text="STRUCTURING DIALOGUE • LINGUISTIC INSIGHTS TO UI LOGIC • DESIGNING FOR CLARITY • " direction="left" />
      </div>

      {/* 导航栏 */}
      <nav className="fixed top-[53px] w-full z-40 bg-[#F4F4F0]/90 backdrop-blur-sm border-b border-[#111] flex justify-between items-center px-4 py-4 md:px-8 font-mono tracking-tight">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
          <span className="font-bold uppercase text-sm md:text-base">Li Yongze</span>
        </div>
        <div className="hidden md:flex gap-12 text-xs md:text-sm font-medium uppercase">
          <a href="#about" className="hover:opacity-50 transition-opacity">Profile</a>
          <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
        <div className="text-xs md:text-sm tabular-nums">
          {currentTime} JST
        </div>
      </nav>

      {/* --- HERO SECTION (Sticky Base) --- */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-start px-6 md:px-12 border-b border-[#111] z-0 overflow-hidden bg-[#F4F4F0]">
         {/* 背景网格装饰 */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
              style={{
                backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', 
                backgroundSize: '40px 40px'
              }}>
         </div>

         <div className="relative z-10 select-none mt-10 md:mt-0 w-full max-w-7xl mx-auto">
            {/* 标题 */}
            <h1 className="font-serif font-black leading-none tracking-tighter mb-12 group cursor-default">
              
              <div className="relative w-fit mb-4 md:mb-6 hover:z-30 transition-all duration-300">
                <span className="block bg-[#111] text-[#F4F4F0] px-4 py-3 text-[4.5vw] md:text-[5vw] shadow-[10px_10px_0px_rgba(0,0,0,0.2)] transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-1">
                   言語学の知見を、UIの論理へ。
                </span>
              </div>
              
              <div className="relative w-fit ml-[5vw] -mt-6 md:-mt-10 hover:z-30 transition-all duration-300">
                <span className="block bg-[#111] text-[#F4F4F0] px-4 py-3 text-[5.5vw] md:text-[6.5vw] shadow-[10px_10px_0px_rgba(0,0,0,0.2)] border-2 border-[#F4F4F0] transform transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-1">
                  「対話」の構造をデザインする
                </span>
              </div>

            </h1>

            <div className="flex flex-col md:flex-row justify-between items-end w-full gap-12 mt-20 pl-[2vw]">
              <div className="max-w-lg border-l-4 border-[#111] pl-6 py-2">
                <p className="text-base md:text-lg leading-loose font-medium font-serif text-[#111]">
                  愛知教育大学大学院で専攻している「日本語教育・会話分析」の視点を、デジタル領域のUI/UXデザインに応用しています。
                </p>
              </div>
              
              <div className="flex flex-col items-end gap-2 animate-bounce cursor-pointer">
                <span className="font-mono text-xs uppercase tracking-widest bg-[#111] text-[#F4F4F0] px-2 py-1">Scroll to Explore Profile</span>
                <ArrowDown size={32} />
              </div>
            </div>
         </div>
      </div>

      {/* --- CONTENT STACK --- */}
      <div className="relative w-full">
        
        <StickyProfileCard index={1} />

        <div id="work">
          {PROJECTS.map((project, index) => (
            <StickyProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              total={PROJECTS.length}
              baseIndex={20}
            />
          ))}
        </div>

        {/* --- FOOTER --- */}
        <div className="relative bg-[#F4F4F0] border-t border-[#111]" style={{ zIndex: 100 }}>
          
          <Marquee text="THANK YOU FOR VISITING • CONTACT ME FOR COLLABORATION • ありがとうございました • " direction="right" />

          <footer id="contact" className="grid grid-cols-1 md:grid-cols-4 border-t border-[#111] divide-y md:divide-y-0 md:divide-x divide-[#111] bg-[#F4F4F0] font-mono">
            <a href="#" className="p-8 flex flex-col justify-between h-48 hover:bg-[#111] hover:text-[#F4F4F0] transition-colors group">
              <Linkedin size={32} />
              <span className="text-sm flex justify-between items-center uppercase tracking-wider font-bold">
                LinkedIn 
                <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity"/>
              </span>
            </a>
            <a href="#" className="p-8 flex flex-col justify-between h-48 hover:bg-[#111] hover:text-[#F4F4F0] transition-colors group">
              <Twitter size={32} />
              <span className="text-sm flex justify-between items-center uppercase tracking-wider font-bold">
                X (Twitter)
                <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity"/>
              </span>
            </a>
            <div className="p-8 flex flex-col justify-between h-48 bg-[#F4F4F0] opacity-50 cursor-not-allowed">
              <Globe size={32} />
              <span className="text-sm flex justify-between items-center uppercase tracking-wider font-bold">
                (More coming soon)
              </span>
            </div>
            <a href="mailto:your.email@example.com" className="p-8 flex flex-col justify-between h-48 transition-colors group bg-[#111] text-[#F4F4F0] hover:bg-[#333]">
              <Mail size={32} />
              <div>
                <span className="text-sm flex justify-between items-center font-bold uppercase tracking-wider mb-2">
                  Get in touch
                  <MoveRight size={18} />
                </span>
                <p className="text-xs opacity-70">お気軽にご連絡ください</p>
              </div>
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}