/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Layout, 
  CheckCircle2, 
  Search, 
  PenTool, 
  Code2, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Slide {
  id: number;
  type: 'cover' | 'toc' | 'section' | 'content' | 'summary';
  title: string;
  subtitle?: string;
  content?: string[];
  items?: { title: string; desc: string; icon?: React.ReactNode }[];
  footer?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Bluevent GEO 수행계획',
    subtitle: 'AI 기반 검색 엔진 최적화 및 사용자 경험 고도화 전략',
    footer: '2026. 02. 24 | 전략기획팀'
  },
  {
    id: 2,
    type: 'toc',
    title: 'Table of Contents',
    items: [
      { title: '01. 분석 및 진단', desc: '현황 파악 및 경쟁사 분석' },
      { title: '02. 설계', desc: 'GEO 기반 정보 구조 및 메시지 전략' },
      { title: '03. 구현', desc: '콘텐츠 등록 및 구조화 데이터 적용' },
      { title: '04. 테스트 및 검증', desc: 'QA 및 운영 안정화' },
      { title: '05. 필요사항', desc: '프로젝트 수행을 위한 필수 리소스' }
    ]
  },
  {
    id: 3,
    type: 'section',
    title: '01. 분석 및 진단',
    subtitle: 'Analysis & Diagnosis'
  },
  {
    id: 4,
    type: 'content',
    title: '1단계: 분석 및 진단',
    items: [
      { 
        title: '1-1. 현황 진단', 
        desc: '주요 AI 플랫폼(ChatGPT, Perplexity 등) 언급 여부, 순위, 감성 분석',
        icon: <Search className="w-5 h-5" />
      },
      { 
        title: '1-2. 경쟁사 분석', 
        desc: '경쟁사 AI 언급률 및 점유율(SOV) 비교, 주요 프롬프트 수집 [1W]',
        icon: <Layout className="w-5 h-5" />
      },
      { 
        title: '1-3. 인텐트 마이닝', 
        desc: '고객 자연어 질문(추천, 정의, 비교 등) 수집 및 FAQ 소스 도출 [0.5W]',
        icon: <AlertCircle className="w-5 h-5" />
      }
    ]
  },
  {
    id: 5,
    type: 'section',
    title: '02. 설계',
    subtitle: 'Design'
  },
  {
    id: 6,
    type: 'content',
    title: '2단계: 설계',
    items: [
      { 
        title: '2-1. GEO 기반 IA 재정의', 
        desc: '사용환경 솔루션, 가이드 등 신규 메뉴 기획 및 정보 구조 재구성',
        icon: <Layout className="w-5 h-5" />
      },
      { 
        title: '2-2. 메시지 하우스 전략', 
        desc: '브랜드 정의, 이중 글쓰기 전략 템플릿 및 와이어프레임 도출 [1W]',
        icon: <PenTool className="w-5 h-5" />
      },
      { 
        title: '2-3. 테크니컬 요구사항', 
        desc: '스키마 마크업, llms.txt, 이미지 Alt 태그 등 멀티모달 최적화 설계',
        icon: <Code2 className="w-5 h-5" />
      }
    ]
  },
  {
    id: 7,
    type: 'section',
    title: '03. 구현',
    subtitle: 'Implementation'
  },
  {
    id: 8,
    type: 'content',
    title: '3단계: 구현',
    items: [
      { 
        title: '3-1. 콘텐츠 페이지 등록', 
        desc: '상세페이지 템플릿 수정, FAQ/HowTo 블록 삽입 및 신규 콘텐츠 등록',
        icon: <PenTool className="w-5 h-5" />
      },
      { 
        title: '3-2. 구조화 데이터 적용', 
        desc: 'Schema(JSON-LD), 메타/OG, Canonical 태그 실제 상품 적용 [1W]',
        icon: <Code2 className="w-5 h-5" />
      }
    ]
  },
  {
    id: 9,
    type: 'section',
    title: '04. 테스트 및 검증',
    subtitle: 'Testing & Validation'
  },
  {
    id: 10,
    type: 'content',
    title: '4단계: 테스트 및 검증',
    items: [
      { 
        title: '4-1. QA 진행', 
        desc: '오탈자, 톤앤매너, AI 가독성 테스트 및 테크니컬 체크',
        icon: <ShieldCheck className="w-5 h-5" />
      },
      { 
        title: '4-2. 모니터링 시스템', 
        desc: 'AI 언급률, 평균 순위 파악용 대시보드 세팅 및 주간/월간 리포팅',
        icon: <Search className="w-5 h-5" />
      },
      { 
        title: '4-3. 초기 운영 안정화', 
        desc: '리포트 기반 PDCA 사이클 운영 및 초기 운영 안정화 [1.5W~2W]',
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ]
  },
  {
    id: 11,
    type: 'content',
    title: '필요사항',
    items: [
      { 
        title: '시스템 권한', 
        desc: '고도몰 계정 및 편집 접근 권한 확보',
        icon: <ShieldCheck className="w-5 h-5" />
      },
      { 
        title: '원본 데이터', 
        desc: '제품 스펙표, 매뉴얼 PDF, FAQ 원문 등 Raw Data 제공',
        icon: <AlertCircle className="w-5 h-5" />
      },
      { 
        title: '디자인 리소스', 
        desc: '상세페이지 리디자인을 위한 Figma/PSD 소스',
        icon: <PenTool className="w-5 h-5" />
      }
    ]
  },
  {
    id: 12,
    type: 'summary',
    title: 'Summary',
    content: [
      'AI 플랫폼 내 브랜드 가시성 확보를 위한 GEO 최적화',
      '사용자 인텐트 기반의 정보 구조(IA) 및 콘텐츠 재설계',
      '구조화 데이터 적용을 통한 검색 엔진 신뢰도 향상',
      '지속적인 모니터링을 통한 데이터 기반의 성과 최적화'
    ],
    footer: 'Q&A 및 다음 단계 논의'
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E5E7EB] font-sans selection:bg-[#2563EB]/30 overflow-hidden flex flex-col">
      {/* Header / Progress */}
      <div className="h-1 bg-white/10 w-full relative z-50">
        <motion.div 
          className="h-full bg-[#2563EB]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Slide Area */}
      <main className="flex-1 relative flex items-center justify-center p-8 md:p-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[1760px] aspect-[16/9] bg-[#161B22] border border-white/5 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col p-12 md:p-24"
          >
            {/* Slide Content */}
            {slide.type === 'cover' && (
              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <span className="text-[#2563EB] font-mono text-sm tracking-widest uppercase">Project Execution Plan</span>
                  <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-tight">
                    {slide.title}
                  </h1>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-gray-400 font-light max-w-3xl"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            )}

            {slide.type === 'toc' && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-4xl font-bold text-white mb-16 border-b border-white/10 pb-6">
                  {slide.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {slide.items?.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="group flex items-start space-x-6 p-6 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => {
                        const target = slides.findIndex(s => s.title.includes(item.title.split('. ')[1]));
                        if (target !== -1) setCurrentSlide(target);
                      }}
                    >
                      <span className="text-3xl font-mono text-[#2563EB]/50 group-hover:text-[#2563EB] transition-colors">
                        {item.title.split('. ')[0]}
                      </span>
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-white">{item.title.split('. ')[1]}</h3>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'section' && (
              <div className="flex-1 flex flex-col justify-center items-start">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="h-1 w-24 bg-[#2563EB] mb-8 origin-left"
                />
                <h1 className="text-7xl font-bold text-white mb-4">{slide.title}</h1>
                <p className="text-3xl text-[#2563EB] font-mono uppercase tracking-widest">{slide.subtitle}</p>
              </div>
            )}

            {slide.type === 'content' && (
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
                  <h2 className="text-4xl font-bold text-white">{slide.title}</h2>
                  <span className="text-[#2563EB] font-mono text-sm uppercase tracking-widest">Phase {slide.id - 2}</span>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {slide.items?.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-start space-x-6 bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-[#2563EB]/30 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] shrink-0">
                        {item.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        <p className="text-xl text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'summary' && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-4xl font-bold text-white mb-16 border-b border-white/10 pb-6">
                  {slide.title}
                </h2>
                <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto space-y-8">
                  {slide.content?.map((text, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-center space-x-6"
                    >
                      <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
                      <p className="text-3xl font-medium text-gray-200">{text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide Footer */}
            <div className="mt-auto pt-8 flex justify-between items-center text-gray-500 font-mono text-sm border-t border-white/5">
              <span>{slide.footer || 'Bluevent GEO Project'}</span>
              <span>{currentSlide + 1} / {slides.length}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Controls */}
      <div className="p-6 flex justify-between items-center bg-[#161B22] border-t border-white/5">
        <div className="flex items-center space-x-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full hover:bg-white/5 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-mono text-sm text-gray-400">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-3 rounded-full hover:bg-white/5 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2 text-xs text-gray-500 font-mono uppercase tracking-widest">
            <span className="px-2 py-1 bg-white/5 rounded">Arrows</span>
            <span>to navigate</span>
            <span className="px-2 py-1 bg-white/5 rounded ml-2">F</span>
            <span>for full</span>
          </div>
          <button 
            onClick={toggleFullscreen}
            className="p-3 rounded-full hover:bg-white/5 transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
