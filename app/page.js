'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Mail, Instagram, Twitter, Globe, MoveRight, ArrowDown, Linkedin, User } from 'lucide-react';
// 引入 Lenis
import Lenis from 'lenis';

// --- 常量配置 ---
const NAV_HEIGHT = 54; 
const OVERLAP_HEIGHT = "70vh"; 
const SCROLL_BUFFER = "50vh"; 

// --- 数据部分 ---
const PROFILE_DATA = {
  title: "LI YONGZE", 
  subtitle: "Profile & Philosophy",
  description: "私は言語学的なアプローチを用いて、情報の優先順位や導線を論理的に設計し、ユーザーの認知負荷を最小限に抑える「摩擦のないコミュニケーション」を追求しています。独学で習得したコーディングスキルを活かし、実装可能性まで考慮した、手触りのある課題解決を提供します。",
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
    year: "2025",
    description: "言語学的アプローチに基づき、ユーザーの認知負荷を低減するインターフェースの再設計提案。操作フローの「文法」を整えることで、迷いのない体験を実現しました。",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#F4F4F0",
    textColor: "#111"
  },
  {
    id: 2,
    title: "SUMOME",
    subtitle: "伝統文化 × デジタル",
    category: "Web Design / Social",
    year: "2025",
    description: "地域の伝統文化をデジタルでアーカイブし、多世代間の交流を生み出すプラットフォーム。過去と现在を「リンク」させる視覚言語を構築。",
    image: "https://images.unsplash.com/photo-1590499865287-8a79fdfa3f05?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "#Eaeae6", 
    textColor: "#111"
  },
  {
    id: 3,
    title: "SO COFFEE",
    subtitle: "Brand Identity",
    category: "Branding / Web",
    year: "2025",
    description: "「対話が生まれる一杯」をコンセプトにした架空のコーヒーブランド。パッケージからECサイトまで、一貫したトーン＆マナーで設計。",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#F4F4F0",
    textColor: "#111"
  },
  {
    id: 4,
    title: "Practice",
    subtitle: "Coding & Design",
    category: "Creative Coding",
    year: "2024-25",
    description: "UI習作や、小規模なデザインの実験記録。実装の限界を探るためのサンドボックス。",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#Eaeae6",
    textColor: "#111"
  }
];

// --- 组件定义 ---

const RollingTitle = ({ title, className = "", disableHover = false }) => {
  const characters = title.split('');

  return (
    // 修改点：在 className 中增加了 'select-none'
    <div className={`relative overflow-hidden select-none ${disableHover ? '' : 'cursor-pointer group'} py-1 leading-tight ${className}`}>
      <span className="invisible block">{title}</span>
      <div className="absolute inset-0 flex py-1">
        {characters.map((char, i) => (
          <span
            key={i}
            className="relative h-full flex flex-col justify-start"
            style={{ 
              width: char === ' ' ? '0.3em' : 'auto', 
              transitionDelay: `${i * 0.03}s` 
            }} 
          >
            <span 
              className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${disableHover ? '' : 'group-hover:-translate-y-full'} will-change-transform`}
              style={{ transitionDelay: `${i * 0.025}s` }} 
            >
              <span className="h-full flex items-center justify-center">{char}</span>
              <span className="h-full flex items-center justify-center absolute top-full left-0">{char}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Marquee = ({ text, direction = 'left' }) => {
  return (
    <div className="w-full h-[60px] border-y border-[#111] bg-[#F4F4F0] text-[#111] flex items-center overflow-hidden font-mono">
      <style jsx>{`
          @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .animate-marquee-left { 
            animation: marquee-left 60s linear infinite; 
            transform: translate3d(0, 0, 0); 
            will-change: transform;
          }
          .animate-marquee-right { 
            animation: marquee-right 60s linear infinite; 
            transform: translate3d(0, 0, 0); 
            will-change: transform;
          }
          .stroke-text { -webkit-text-stroke: 0.5px #111; }
      `}</style>
      <div className={`whitespace-nowrap flex ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        {[...Array(12)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-lg md:text-xl font-bold uppercase tracking-widest mx-8">{text}</span>
            <span className="text-lg md:text-xl font-bold uppercase tracking-widest mx-8 text-transparent stroke-text">{text}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const IntroSection = () => {
  return (
    <div 
      className="relative w-full"
      style={{ 
        height: `calc(100vh - ${NAV_HEIGHT}px + ${OVERLAP_HEIGHT} + ${SCROLL_BUFFER})`, 
        zIndex: 0, 
        marginBottom: `-${OVERLAP_HEIGHT}` 
      }}
    >
      <div 
        className="sticky w-full border-b border-[#111] overflow-hidden bg-[#F4F4F0] text-[#111] flex flex-col justify-center items-start px-6 md:px-12"
        style={{ 
          top: `${NAV_HEIGHT}px`,
          height: `calc(100vh - ${NAV_HEIGHT}px)`
        }}
      >
        <div className="flex flex-col items-start select-none w-full h-full justify-center pb-20">
          <div className="leading-none z-10">
            <span className="font-serif font-black text-[3vw] leading-none tracking-tighter text-[#111]">2024-2025</span>
          </div>
          <div className="leading-none z-10">
            <span className="font-serif font-black text-[6vw] leading-none tracking-tighter text-[#111]">PORTFOLIO</span>
          </div>
          <div className="leading-none -mt-[1vw] origin-center transform scale-y-[-1] opacity-10">
             <span className="font-serif font-black text-[6vw] leading-none tracking-tighter">
               PORTFOLIO
             </span>
          </div>
        </div>
        <div className="absolute bottom-12 left-0 w-full flex justify-center font-mono text-xs uppercase opacity-60">
          <span className="animate-bounce">Scroll to Begin</span>
        </div>
      </div>
    </div>
  );
};

const StickyHero = ({ baseIndex, onScrollClick }) => {
  return (
    <div 
      className="relative w-full"
      style={{ 
        height: `calc(100vh - ${NAV_HEIGHT}px + ${OVERLAP_HEIGHT} + ${SCROLL_BUFFER})`, 
        zIndex: baseIndex, 
        marginBottom: `-${OVERLAP_HEIGHT}` 
      }}
    >
      <div 
        className="sticky w-full border-t border-b border-[#111] overflow-hidden bg-[#F4F4F0] text-[#111] flex flex-col justify-center items-start px-6 md:px-12"
        style={{ 
          top: `${NAV_HEIGHT}px`,
          height: `calc(100vh - ${NAV_HEIGHT}px)`
        }}
      >
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
              style={{
                backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', 
                backgroundSize: '40px 40px'
              }}>
         </div>

         <div className="relative z-10 select-none mt-10 md:mt-0 w-full max-w-7xl mx-auto">
            <h1 className="font-serif font-black leading-none tracking-tighter mb-12 group cursor-default">
              <div className="relative w-fit mb-4 md:mb-6 transition-all duration-300">
                <span className="block bg-[#111] text-[#F4F4F0] px-4 py-3 text-[4vw] md:text-[4vw] shadow-[10px_10px_0px_rgba(0,0,0,0.2)] transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-1">
                   言語学の知見を、UIの論理へ。
                </span>
              </div>
              <div className="relative w-fit ml-[5vw] -mt-6 md:-mt-10 transition-all duration-300">
                <span className="block bg-[#111] text-[#F4F4F0] px-4 py-3 text-[4vw] md:text-[4vw] shadow-[10px_10px_0px_rgba(0,0,0,0.2)] border-2 border-[#F4F4F0] transform transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-1">
                  「対話」の構造をデザインする。
                </span>
              </div>
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-end w-full gap-12 mt-20 pl-[2vw]">
              <div className="max-w-lg border-l-4 border-[#111] pl-6 py-2">
                <p className="text-base md:text-lg leading-loose font-medium font-serif text-[#111]">
                  大学院で専攻している「日本語教育・会話分析」の視点を、デジタル領域のUI/UXデザインに応用しています。
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 animate-bounce cursor-pointer" onClick={() => onScrollClick('about')}>
                <span className="font-mono text-xs uppercase tracking-widest bg-[#111] text-[#F4F4F0] px-2 py-1">Scroll to Explore Profile</span>
                <ArrowDown size={32} />
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const StickyProfileCard = ({ index }) => {
  return (
    <div 
      id="about"
      className="relative w-full"
      style={{ 
        height: `calc(100vh - ${NAV_HEIGHT}px + ${OVERLAP_HEIGHT} + ${SCROLL_BUFFER})`, 
        zIndex: index + 10,
        marginBottom: `-${OVERLAP_HEIGHT}` 
      }}
    >
      <div 
        className="sticky w-full border-t border-[#111] overflow-hidden bg-[#111] text-[#F4F4F0] flex flex-col lg:flex-row"
        style={{ 
          top: `${NAV_HEIGHT}px`,
          height: `calc(100vh - ${NAV_HEIGHT}px)`
        }}
      >
        {/* 左侧栏 */}
        {/* 修改点：在这里添加 selection 样式 */}
        <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#333] relative selection:bg-[#F4F4F0] selection:text-black">
           <div>
              <div className="flex items-center gap-4 mb-12">
                 <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                 <h2 className="font-mono text-sm uppercase tracking-wider opacity-60">ABOUT ME</h2>
              </div>
              
              <div className="w-48 h-48 md:w-64 md:h-64 mb-8 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border-2 border-[#F4F4F0] rounded-sm">
                  <img src={PROFILE_DATA.image} alt={PROFILE_DATA.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="font-serif text-4xl md:text-5xl font-black mb-2 tracking-tight">
                <RollingTitle title={PROFILE_DATA.title} />
              </div>
              <p className="font-mono text-lg uppercase tracking-widest opacity-80">Based in Aichi</p>
          </div>
          
          <div className="mt-8 font-mono text-sm opacity-60">
            <p>Available for freelance projects <br/> & full-time opportunities.</p>
          </div>
        </div>

        {/* 右侧栏 */}
        {/* 修改点：在这里也添加 selection 样式，确保右侧文字也被覆盖 */}
        <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#111] selection:bg-[#F4F4F0] selection:text-black">
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
    </div>
  );
};

const StickyProjectCard = ({ project, index, total, baseIndex, isLast }) => {
  return (
    <div 
      className="relative w-full"
      style={{ 
        height: isLast 
          ? `calc(100vh - ${NAV_HEIGHT}px + ${SCROLL_BUFFER})` 
          : `calc(100vh - ${NAV_HEIGHT}px + ${OVERLAP_HEIGHT} + ${SCROLL_BUFFER})`, 
        zIndex: baseIndex + index,
        marginBottom: isLast ? 0 : `-${OVERLAP_HEIGHT}`
      }}
    >
      <div 
        className="sticky flex flex-col md:flex-row border-t border-[#111] overflow-hidden"
        style={{ 
          top: `${NAV_HEIGHT}px`,
          height: `calc(100vh - ${NAV_HEIGHT}px)`,
          backgroundColor: project.bgColor, 
          color: project.textColor,
        }}
      >
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between h-[45vh] md:h-full relative border-b md:border-b-0 md:border-r border-[#111]">
          
          <div className="flex justify-between items-start font-mono text-sm opacity-60">
            <span>Case  {String(project.id).padStart(2, '0')}</span>
            <span className="border border-current px-2 py-0.5 rounded-full">{project.year}</span>
          </div>

          <div className="flex flex-col justify-center flex-grow py-6 md:py-0">
            <div className="font-serif text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter">
              <RollingTitle title={project.title} />
            </div>
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
    </div>
  );
};

// --- 主页面 ---

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  // 使用 ref 来存储 lenis 实例，以便在导航点击时调用
  const lenisRef = useRef(null);

  // 初始化 Lenis 平滑滚动
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // 滚动持续时间，数值越大越丝滑（默认1.2）
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 类似 iOS 的缓动曲线
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // 移动端通常建议保留原生滚动，除非追求极致效果
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

// --- 动态时长计算 ---
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target && lenisRef.current) {
      // 1. 计算目标位置的绝对坐标
      // getBoundingClientRect().top 是相对于视口的，加上 window.scrollY 就是绝对坐标
      const targetTop = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      
      // 2. 计算当前位置
      const currentTop = window.scrollY;
      
      // 3. 计算滚动的物理距离（绝对值）
      const distance = Math.abs(targetTop - currentTop);

      // 4. 核心算法：动态计算时长
      // 逻辑：基础启动时间 1秒 + 每 1000px 的距离多给 0.6秒的时间
      // 这里的参数你可以微调：
      // distance / 1000 * 0.6 : 代表每滚动 1000像素，增加 0.6秒
      // Math.min(..., 4) : 设置一个上限，最慢不超过 4秒，防止页面太长导致滚动太久
      const dynamicDuration = Math.min(1.0 + (distance / 1000) * 0.7, 4);

      lenisRef.current.scrollTo(target, {
        offset: -NAV_HEIGHT, 
        duration: dynamicDuration, // 使用计算出来的动态时长
        // 这里的 easing 可以单独为点击跳转设置，让它起步更慢，更优雅
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), 
      });
    }
  };

  return (
    <div className="bg-[#F4F4F0] text-[#111] selection:bg-[#111] selection:text-[#F4F4F0] font-serif min-h-screen flex flex-col relative">
      
      <nav 
        className="sticky top-0 w-full z-50 bg-[#F4F4F0] border-b border-[#111] flex justify-between items-center px-4 py-4 md:px-8 font-mono tracking-tight" 
        style={{ height: `${NAV_HEIGHT}px` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
          <span className="font-bold uppercase text-sm md:text-base">PROTFOLIO</span>
        </div>
        <div className="hidden md:flex gap-14 text-xs md:text-sm font-medium uppercase">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:opacity-50 transition-opacity cursor-pointer">Profile</a>
          <a href="#work" onClick={(e) => handleNavClick(e, 'work')} className="hover:opacity-50 transition-opacity cursor-pointer">Work</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:opacity-50 transition-opacity cursor-pointer">Contact</a>
        </div>
        <div className="text-xs md:text-sm tabular-nums">
          {currentTime} JST
        </div>
      </nav>

      <IntroSection />

      {/* 将滚动点击事件传递给 Hero 组件中的按钮 */}
      <StickyHero baseIndex={10} onScrollClick={(id) => handleNavClick({ preventDefault: () => {} }, id)} />

      <div className="relative w-full z-20">
        
        <StickyProfileCard index={1} />

        <div id="work">
          {PROJECTS.map((project, index) => (
            <StickyProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              total={PROJECTS.length}
              baseIndex={20}
              isLast={index === PROJECTS.length - 1}
            />
          ))}
        </div>

        <div 
          className="relative bg-[#F4F4F0] border-t border-[#111]" 
          style={{ zIndex: 100 }}
        >
          <Marquee text="THANK YOU FOR VISITING • CONTACT ME FOR COLLABORATION • ありがとうございました • " direction="right" />

          <footer id="contact" className="border-t border-[#111] bg-[#F4F4F0] text-[#111]">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#111]">
              <a href="mailto:lieitaku@gmail.com" className="group p-8 md:p-16 flex flex-col justify-between min-h-[300px] hover:bg-[#111] hover:text-[#F4F4F0] transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Mail size={24} />
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60">Get in Touch</span>
                  </div>
                  <div className="font-serif text-3xl md:text-5xl font-black leading-tight break-words">
                    <RollingTitle title="lieitaku@" disableHover={true} />
                    <RollingTitle title="gmail.com" disableHover={true} />
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-12">
                  <span className="font-mono text-sm font-bold uppercase tracking-wider">Send Message</span>
                  <MoveRight size={20} className="transition-transform group-hover:translate-x-2"/>
                </div>
              </a>

              <div className="flex flex-col divide-y divide-[#111]">
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center hover:bg-[#111] hover:text-[#F4F4F0] transition-colors">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Location</span>
                  <p className="font-serif text-xl md:text-2xl">Aichi, Japan</p>
                </div>
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center hover:bg-[#111] hover:text-[#F4F4F0] transition-colors">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Status</span>
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <p className="font-serif text-xl md:text-2xl">Open for Opportunities</p>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center hover:bg-[#111] hover:text-[#F4F4F0] transition-colors">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Version</span>
                      <p className="font-serif text-lg">2025 Edition</p>
                    </div>
                    <p className="font-mono text-xs opacity-60">© LIYONGZE</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}